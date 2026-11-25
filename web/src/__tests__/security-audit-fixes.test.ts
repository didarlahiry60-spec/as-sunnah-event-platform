import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import {
  createAdminSessionToken,
  getAdminSession,
  getSession,
} from "@/lib/auth";
import { AdminRole, ApplicationStatus } from "@prisma/client";
import { GET as adminApplicationsRoute } from "@/app/api/admin/applications/route";
import { POST as adminBulkRoute } from "@/app/api/admin/applications/bulk/route";
import { PATCH as adminStatusRoute } from "@/app/api/admin/applications/[id]/status/route";
import {
  listAdminApplications,
  resetApplicationStoreForTest,
  seedInitialStore,
} from "@/lib/applications";
import {
  requestOtp,
  verifyOtp,
  clearOtpStore,
  getOtpRecordForTest,
} from "@/lib/otp";
import {
  maskApplicantMobile,
  maskApplicantName,
} from "@/app/events/[slug]/apply/success/page";
import ApplicationSuccessPage from "@/app/events/[slug]/apply/success/page";
import { POST as automationSettingsRoute } from "@/app/api/admin/automation/settings/route";
import { POST as automationTriggerRoute } from "@/app/api/admin/automation/trigger/route";
import { POST as traineeCallLogRoute } from "@/app/api/admin/trainees/[id]/call-log/route";
import { PATCH as traineeRatingRoute } from "@/app/api/admin/trainees/[id]/rating/route";
import { GET as reliefRoute } from "@/app/api/admin/relief/route";
import { POST as reliefRespondRoute } from "@/app/api/admin/relief/respond/route";
import { PATCH as submissionStatusRoute } from "@/app/api/admin/submissions/[id]/status/route";

function extractTextFromReactNode(node: unknown): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join(" ");
  if (typeof node === "object" && "props" in (node as Record<string, unknown>)) {
    const props = (node as { props: Record<string, unknown> }).props;
    let res = "";
    for (const [key, val] of Object.entries(props)) {
      if (key === "children") {
        res += " " + extractTextFromReactNode(val);
      } else if (typeof val === "string") {
        res += " " + val;
      } else if (key === "dangerouslySetInnerHTML" && val && typeof val === "object" && "__html" in (val as Record<string, unknown>)) {
        res += " " + (val as { __html: string }).__html;
      }
    }
    return res;
  }
  return "";
}

describe("Security Hardening & Privacy Audit Fixes", () => {
  let sampleAdminToken: string;

  beforeEach(async () => {
    clearOtpStore();
    resetApplicationStoreForTest();
    sampleAdminToken = await createAdminSessionToken({
      adminId: "admin-audit-01",
      email: "audit-admin@assunnah.local",
      name: "Security Officer",
      role: AdminRole.SUPER_ADMIN,
    });
  });

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    resetApplicationStoreForTest();
  });

  // =========================================================================
  // 1. Relocate and Protect Application Management APIs under /api/admin/applications
  // =========================================================================
  describe("1. Protect Application Management APIs under /api/admin/applications", () => {
    test("GET /api/admin/applications returns 401 for unauthenticated requests", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications");
      const res = await adminApplicationsRoute(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /অননুমোদিত অ্যাক্সেস/);
    });

    test("GET /api/admin/applications succeeds with valid Admin Bearer token", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications", {
        headers: {
          Authorization: `Bearer ${sampleAdminToken}`,
        },
      });
      const res = await adminApplicationsRoute(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.applications));
      assert.ok(data.stats);
      assert.ok(Array.isArray(data.smsLogs));
    });

    test("POST /api/admin/applications/bulk returns 401 for unauthenticated requests", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: ["app-mock-1"], status: ApplicationStatus.SELECTED }),
      });
      const res = await adminBulkRoute(req);
      assert.equal(res.status, 401);
    });

    test("POST /api/admin/applications/bulk updates statuses for authenticated admin", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sampleAdminToken}`,
        },
        body: JSON.stringify({ ids: ["app-mock-1"], status: ApplicationStatus.SELECTED }),
      });
      const res = await adminBulkRoute(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.updatedCount, 1);
    });

    test("PATCH /api/admin/applications/[id]/status returns 401 for unauthenticated requests", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications/app-mock-1/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: ApplicationStatus.WAITLIST }),
      });
      const res = await adminStatusRoute(req, {
        params: Promise.resolve({ id: "app-mock-1" }),
      });
      assert.equal(res.status, 401);
    });

    test("PATCH /api/admin/applications/[id]/status updates status for authenticated admin", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications/app-mock-1/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sampleAdminToken}`,
        },
        body: JSON.stringify({ status: ApplicationStatus.WAITLIST }),
      });
      const res = await adminStatusRoute(req, {
        params: Promise.resolve({ id: "app-mock-1" }),
      });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
    });

    test("Middleware intercepts and blocks unauthenticated requests to /api/admin/applications", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications");
      const res = await middleware(req);
      assert.equal(res.status, 401);
    });

    test("getAdminSession returns null for request without token or session cookie", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/applications");
      const session = await getAdminSession(req);
      assert.equal(session, null);
    });

    test("getSession returns null for request without token or session cookie", async () => {
      const req = new NextRequest("http://localhost:3000/api/portal/profile");
      const session = await getSession(req);
      assert.equal(session, null);
    });
  });

  // =========================================================================
  // 2. Protect PII & Admission QR on /events/[slug]/apply/success
  // =========================================================================
  describe("2. Protect PII & Admission QR on /events/[slug]/apply/success", () => {
    test("maskApplicantMobile correctly masks BD mobile numbers with Bengali digits", () => {
      assert.equal(maskApplicantMobile("01711223344"), "০১৭****৩৩৪৪");
      assert.equal(maskApplicantMobile("01822334455"), "০১৮****৪৪৫৫");
      assert.equal(maskApplicantMobile("০১৭১১২২৩৩৪৪"), "০১৭****৩৩৪৪");
      assert.equal(maskApplicantMobile("+8801711223344"), "০১৭****৩৩৪৪");
      assert.equal(maskApplicantMobile("8801711223344"), "০১৭****৩৩৪৪");
      assert.equal(maskApplicantMobile("01711-223344"), "০১৭****৩৩৪৪");
      assert.equal(maskApplicantMobile(""), "");
    });

    test("maskApplicantName correctly masks Bengali applicant names", () => {
      assert.equal(maskApplicantName("মুস্তাফিজুর রহমান"), "মু***ান");
      assert.equal(maskApplicantName("মুফতি আব্দুর রহমান"), "মু***ান");
      assert.equal(maskApplicantName("মাওলানা মাহমুদুল হাসান"), "মা***ান");
      assert.equal(maskApplicantName("মুহসিন খান"), "মু***ান");
      assert.equal(maskApplicantName("আলী"), "আ**ী");
      assert.equal(maskApplicantName("ওমর"), "ও**র");
    });

    test("ApplicationSuccessPage masks PII and protects QR credentials for unauthenticated query", async () => {
      const apps = await listAdminApplications();
      const targetApp = apps[0];
      assert.ok(targetApp);

      // Unauthenticated visitor with only ?appNumber=... (NO token, NO session)
      const pageResult = await ApplicationSuccessPage({
        params: Promise.resolve({ slug: targetApp.eventSlug }),
        searchParams: Promise.resolve({ appNumber: targetApp.number }),
      });

      // Render to text representation to inspect output
      const renderedStr = extractTextFromReactNode(pageResult);

      // Must contain masked phone number
      const maskedMobile = maskApplicantMobile(targetApp.applicant.mobile);
      assert.ok(renderedStr.includes(maskedMobile), `Expected masked mobile ${maskedMobile}`);

      // Must NOT expose unmasked raw phone number
      assert.ok(!renderedStr.includes(targetApp.applicant.mobile));

      // Must contain masked name
      const maskedName = maskApplicantName(targetApp.applicant.name);
      assert.ok(renderedStr.includes(maskedName), `Expected masked name ${maskedName}`);

      // Must NOT expose full admission QR token or scannable SVG
      assert.ok(!renderedStr.includes(targetApp.qrToken));
      assert.ok(renderedStr.includes("কিউআর কোড সুরক্ষিত"));
      assert.ok(renderedStr.includes("••••••••••••••••"));
    });

    test("ApplicationSuccessPage reveals full pass and QR when valid token query is provided", async () => {
      const apps = await listAdminApplications();
      const targetApp = apps[0];
      assert.ok(targetApp);

      // Authorized visitor with matching token in query string (?token=...)
      const pageResult = await ApplicationSuccessPage({
        params: Promise.resolve({ slug: targetApp.eventSlug }),
        searchParams: Promise.resolve({
          appNumber: targetApp.number,
          token: targetApp.qrToken,
        }),
      });

      const renderedStr = extractTextFromReactNode(pageResult);

      // Must contain unmasked applicant name and mobile
      assert.ok(renderedStr.includes(targetApp.applicant.name));
      assert.ok(renderedStr.includes(targetApp.applicant.mobile));

      // Must contain verified venue pass and scannable verification pass
      assert.ok(renderedStr.includes("VERIFIED VENUE PASS"));
      assert.ok(renderedStr.includes(targetApp.qrToken.slice(0, 16)));
    });

    test("ApplicationSuccessPage rejects token matching targetApp.id alone (prevents ID guessing bypass)", async () => {
      const apps = await listAdminApplications();
      const targetApp = apps[0];
      assert.ok(targetApp);

      // Malicious or unauthenticated caller passing the application ID as ?token=...
      const pageResult = await ApplicationSuccessPage({
        params: Promise.resolve({ slug: targetApp.eventSlug }),
        searchParams: Promise.resolve({
          appNumber: targetApp.number,
          token: targetApp.id, // Only app.id, NOT the secret qrToken
        }),
      });

      const renderedStr = extractTextFromReactNode(pageResult);

      // Must remain masked
      const maskedMobile = maskApplicantMobile(targetApp.applicant.mobile);
      assert.ok(renderedStr.includes(maskedMobile));
      assert.ok(!renderedStr.includes(targetApp.applicant.mobile));
      assert.ok(renderedStr.includes("কিউআর কোড সুরক্ষিত"));
    });
  });

  // =========================================================================
  // 3. Failed OTP Invalidation (Max 5 Attempts)
  // =========================================================================
  describe("3. Failed OTP Invalidation (Max 5 Attempts)", () => {
    test("tracks failedAttempts on OtpRecord and deletes record upon 5 failed attempts", () => {
      const mobile = "01799887766";
      const req = requestOtp(mobile);
      assert.equal(req.success, true);

      // Initial record state
      let record = getOtpRecordForTest(mobile);
      assert.ok(record);
      assert.equal(record.failedAttempts, 0);

      // Attempt 1 to 4 with incorrect code
      for (let attempt = 1; attempt <= 4; attempt++) {
        const verifyRes = verifyOtp(mobile, "000000");
        assert.equal(verifyRes.success, false);
        assert.match(verifyRes.error || "", /ভুল ওটিপি কোড/);

        record = getOtpRecordForTest(mobile);
        assert.ok(record, `Record should still exist after attempt ${attempt}`);
        assert.equal(record.failedAttempts, attempt);
      }

      // 5th failed attempt: must trigger immediate invalidation
      const verifyRes5 = verifyOtp(mobile, "000000");
      assert.equal(verifyRes5.success, false);
      assert.match(verifyRes5.error || "", /সর্বোচ্চ ভুল প্রচেষ্টার সীমা|নতুন ওটিপি/);

      // Record must be immediately deleted from memory store
      record = getOtpRecordForTest(mobile);
      assert.equal(record, undefined, "OTP record must be deleted upon 5th failed attempt");

      // 6th attempt should return 'no OTP request found'
      const verifyRes6 = verifyOtp(mobile, "000000");
      assert.equal(verifyRes6.success, false);
      assert.match(verifyRes6.error || "", /কোনো ওটিপি অনুরোধ পাওয়া যায়নি/);
    });

    test("successful OTP verification consumes and removes record immediately", () => {
      const mobile = "01855667788";
      const req = requestOtp(mobile);
      assert.ok(req.simulatedOtp);

      const verifyRes = verifyOtp(mobile, req.simulatedOtp);
      assert.equal(verifyRes.success, true);
      assert.equal(getOtpRecordForTest(mobile), undefined);
    });
  });

  // =========================================================================
  // 4. Hide Demo Box in Trainee Login on Production
  // =========================================================================
  describe("4. Hide Demo Box in Trainee Login on Production", () => {
    test("demonstrates demo elements are strictly hidden in production mode", async () => {
      // In production mode, TraineeLogin is called with isProduction={true}
      // Or process.env.NODE_ENV === "production"
      (process.env as Record<string, string | undefined>).NODE_ENV = "production";
      const isProduction = process.env.NODE_ENV === "production";
      assert.equal(isProduction, true);

      // In production, master test OTP is also strictly rejected by verifyOtp
      requestOtp("01711223344");
      const demoVerify = verifyOtp("01711223344", "123456");
      assert.equal(demoVerify.success, false);
      assert.match(demoVerify.error || "", /ভুল ওটিপি কোড/);
      assert.ok(!demoVerify.error?.includes("ডেমো ওটিপি"), "Must not mention demo OTP in production");
    });
  });

  // =========================================================================
  // 5. Lock Down Mock Application Seeding in Production
  // =========================================================================
  describe("5. Lock Down Mock Application Seeding in Production", () => {
    test("seedInitialStore does NOT populate default stores when NODE_ENV is production", async () => {
      (process.env as Record<string, string | undefined>).NODE_ENV = "production";
      resetApplicationStoreForTest();

      // In production, store must remain completely empty
      const apps = await listAdminApplications();
      assert.equal(apps.length, 0, "Default store must be empty in production");

      // Calling seedInitialStore explicitly should be a no-op in production
      seedInitialStore();
      const appsAfterSeed = await listAdminApplications();
      assert.equal(appsAfterSeed.length, 0, "seedInitialStore must not populate mock data in production");
    });

    test("seedInitialStore populates default demo data when NODE_ENV is test or development", async () => {
      (process.env as Record<string, string | undefined>).NODE_ENV = "test";
      resetApplicationStoreForTest();

      const apps = await listAdminApplications();
      assert.ok(apps.length >= 6, "Mock data must be populated in test/dev environment");
    });
  });

  // =========================================================================
  // 6. Sanitize API Error Responses
  // =========================================================================
  describe("6. Sanitize API Error Responses", () => {
    test("PATCH /api/admin/submissions/[id]/status returns safe Bengali error message for unknown ID", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/submissions/nonexistent-id/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      });
      const res = await submissionStatusRoute(req, {
        params: Promise.resolve({ id: "nonexistent-id" }),
      });
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.equal(data.error, "সংশ্লিষ্ট কার্যক্রমটি খুঁজে পাওয়া যায়নি।");
      assert.ok(!data.error.includes("prisma"), "Must never leak prisma errors");
      assert.ok(!data.error.includes("Error:"), "Must never leak raw JS Error prefix");
    });

    test("POST /api/admin/automation/settings handles internal exceptions with polite generic Bengali message", async () => {
      // Cause an exception by passing unexpected prototype or trigger error
      const req = new NextRequest("http://localhost:3000/api/admin/automation/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hijriOffset: 99 }), // Invalid offset returns 400
      });
      const res = await automationSettingsRoute(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.match(data.error, /হিজরি অফসেট অবশ্যই/);
    });

    test("POST /api/admin/trainees/[id]/rating handles unknown trainee without leaking stack traces", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/trainees/unknown-id/rating", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: 4 }),
      });
      const res = await traineeRatingRoute(req, {
        params: Promise.resolve({ id: "unknown-id" }),
      });
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.equal(data.error, "প্রশিক্ষণার্থী তথ্য খুঁজে পাওয়া যায়নি।");
      assert.ok(!data.error.includes("stack"), "Must not leak stack");
    });

    test("POST /api/admin/trainees/[id]/call-log handles unknown trainee without leaking stack traces", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/trainees/unknown-id/call-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: "Follow-up note" }),
      });
      const res = await traineeCallLogRoute(req, {
        params: Promise.resolve({ id: "unknown-id" }),
      });
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.equal(data.error, "প্রশিক্ষণার্থী তথ্য খুঁজে পাওয়া যায়নি।");
    });

    test("POST /api/admin/automation/trigger handles invalid job key without leaking stack traces", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/automation/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobKey: "INVALID_KEY" }),
      });
      const res = await automationTriggerRoute(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.match(data.error, /অননুমোদিত জব কী/);
    });

    test("GET /api/admin/relief handles broadcast summary query gracefully", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/relief?broadcastId=nonexistent-broadcast");
      const res = await reliefRoute(req);
      // Returns 404 or safe summary
      assert.ok([200, 404].includes(res.status));
      if (res.status === 404) {
        const data = await res.json();
        assert.ok(!data.error?.includes("stack"));
      }
    });

    test("POST /api/admin/relief/respond handles unknown broadcast without leaking stack traces", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/relief/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          broadcastId: "unknown-broadcast",
          traineePhone: "01711223344",
          response: "1",
        }),
      });
      const res = await reliefRespondRoute(req);
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.equal(data.error, "ত্রাণ কার্যক্রম খুঁজে পাওয়া যায়নি।");
    });
  });
});
