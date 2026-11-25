import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

import nextConfig, { securityHeaders } from "../../next.config";
import manifest from "@/app/manifest";
import {
  rateLimit,
  checkRateLimit,
  getClientIp,
  resetRateLimitStore,
  rateLimitResponse,
  getRateLimitStoreSize,
  cleanupExpiredRateLimits,
} from "@/lib/rate-limit";
import { GET as healthRoute } from "@/app/api/health/route";
import { POST as otpSendRoute } from "@/app/api/auth/otp/send/route";
import { POST as otpVerifyRoute } from "@/app/api/auth/otp/verify/route";
import { POST as applicationsRoute } from "@/app/api/applications/route";
import { POST as checkinRoute, GET as checkinLookupRoute } from "@/app/api/checkin/route";
import { PersonCategory } from "@prisma/client";

// E2E Lifecycle dependencies
import { getEventsData } from "@/lib/events-data";
import { createApplication, checkInApplicant } from "@/lib/applications";
import { getTraineeFullProfile, sanitizeTraineeProfile } from "@/lib/trainee";
import { verifyCertificate } from "@/lib/certificates";
import { calculateNextRun } from "@/lib/automation";
import { updateTraineeInternalRating, recordTraineeCallLog, getAdminTraineesList } from "@/lib/trainee-admin";
import { createReliefBroadcast, recordReliefResponse, getReliefBroadcastSummary } from "@/lib/relief";
import { messages } from "@/lib/messages";

// =========================================================================
// 1. Security Headers & Server Hardening (next.config.ts)
// =========================================================================
describe("Sprint 8: Security Headers & Server Hardening", () => {
  test("defines all mandatory security headers with exact production values", () => {
    assert.ok(Array.isArray(securityHeaders), "securityHeaders must be an array");

    const headerMap = new Map(securityHeaders.map(h => [h.key, h.value]));

    assert.equal(headerMap.get("X-Content-Type-Options"), "nosniff");
    assert.equal(headerMap.get("X-Frame-Options"), "SAMEORIGIN");
    assert.equal(headerMap.get("X-XSS-Protection"), "1; mode=block");
    assert.equal(headerMap.get("Referrer-Policy"), "strict-origin-when-cross-origin");
    assert.equal(
      headerMap.get("Permissions-Policy"),
      "camera=*, microphone=(), geolocation=()",
      "Camera must be permitted for venue QR scanner while mic/geo restricted"
    );
  });

  test("nextConfig.headers applies security headers to all paths", async () => {
    assert.ok(typeof nextConfig.headers === "function", "nextConfig must provide headers function");
    const configured = await nextConfig.headers!();

    assert.ok(Array.isArray(configured), "headers output must be an array");
    const wildcardRule = configured.find(r => r.source === "/:path*");
    assert.ok(wildcardRule, "Must have /:path* wildcard route rule");

    const headerKeys = wildcardRule.headers.map(h => h.key);
    assert.ok(headerKeys.includes("X-Content-Type-Options"));
    assert.ok(headerKeys.includes("X-Frame-Options"));
    assert.ok(headerKeys.includes("X-XSS-Protection"));
    assert.ok(headerKeys.includes("Referrer-Policy"));
    assert.ok(headerKeys.includes("Permissions-Policy"));
  });
});

// =========================================================================
// 2. In-Memory Rate Limiting Engine (src/lib/rate-limit.ts)
// =========================================================================
describe("Sprint 8: In-Memory Rate Limiting Engine", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  test("extracts client IP accurately across diverse headers", () => {
    // 1. x-forwarded-for (multi-IP comma-separated)
    const reqForwarded = new NextRequest("http://localhost/api/test", {
      headers: { "x-forwarded-for": "103.205.71.12, 192.168.1.1" },
    });
    assert.equal(getClientIp(reqForwarded), "103.205.71.12");

    // 2. x-real-ip
    const reqReal = new NextRequest("http://localhost/api/test", {
      headers: { "x-real-ip": "119.30.38.10" },
    });
    assert.equal(getClientIp(reqReal), "119.30.38.10");

    // 3. cf-connecting-ip
    const reqCf = new NextRequest("http://localhost/api/test", {
      headers: { "cf-connecting-ip": "180.211.215.5" },
    });
    assert.equal(getClientIp(reqCf), "180.211.215.5");

    // 4. Default fallback
    const reqFallback = new NextRequest("http://localhost/api/test");
    assert.equal(getClientIp(reqFallback), "127.0.0.1");

    // 5. Cloudflare edge-verified connecting IP takes precedence over spoofed X-Forwarded-For
    const reqSpoofed = new NextRequest("http://localhost/api/test", {
      headers: {
        "x-forwarded-for": "1.2.3.4, 5.6.7.8",
        "cf-connecting-ip": "180.211.215.5",
      },
    });
    assert.equal(
      getClientIp(reqSpoofed),
      "180.211.215.5",
      "Edge-verified Cloudflare IP must take precedence over spoofed X-Forwarded-For"
    );
  });

  test("allows legitimate requests within threshold and blocks excess traffic", () => {
    const key = "test-client-1";
    const limit = 3;
    const windowMs = 60000;

    // 1st request -> allowed
    const r1 = checkRateLimit(key, limit, windowMs);
    assert.equal(r1.allowed, true);
    assert.equal(r1.remaining, 2);

    // 2nd request -> allowed
    const r2 = checkRateLimit(key, limit, windowMs);
    assert.equal(r2.allowed, true);
    assert.equal(r2.remaining, 1);

    // 3rd request -> allowed (limit reached)
    const r3 = checkRateLimit(key, limit, windowMs);
    assert.equal(r3.allowed, true);
    assert.equal(r3.remaining, 0);

    // 4th request -> BLOCKED
    const r4 = checkRateLimit(key, limit, windowMs);
    assert.equal(r4.allowed, false);
    assert.equal(r4.remaining, 0);
    assert.ok(r4.retryAfterSeconds > 0);

    // 5th request -> Still BLOCKED
    const r5 = checkRateLimit(key, limit, windowMs);
    assert.equal(r5.allowed, false);
  });

  test("isolates rate limits by client IP and key prefixes", () => {
    const ipA = "192.168.10.1";
    const ipB = "192.168.10.2";

    const reqA = new NextRequest("http://localhost/api/auth/otp/send", {
      headers: { "x-forwarded-for": ipA },
    });
    const reqB = new NextRequest("http://localhost/api/auth/otp/send", {
      headers: { "x-forwarded-for": ipB },
    });

    // Exhaust ipA (limit: 2)
    rateLimit(reqA, { keyPrefix: "test", limit: 2 });
    rateLimit(reqA, { keyPrefix: "test", limit: 2 });
    const blockedA = rateLimit(reqA, { keyPrefix: "test", limit: 2 });
    assert.equal(blockedA.allowed, false);

    // ipB must NOT be blocked
    const allowedB = rateLimit(reqB, { keyPrefix: "test", limit: 2 });
    assert.equal(allowedB.allowed, true);
    assert.equal(allowedB.remaining, 1);
  });

  test("resetRateLimitStore clears all active trackers", () => {
    checkRateLimit("client-a", 1, 60000);
    checkRateLimit("client-b", 1, 60000);
    assert.ok(getRateLimitStoreSize() >= 2);

    resetRateLimitStore();
    assert.equal(getRateLimitStoreSize(), 0);

    // Now previously exhausted client is allowed again
    const fresh = checkRateLimit("client-a", 1, 60000);
    assert.equal(fresh.allowed, true);
  });

  test("boundary: limit <= 0 immediately blocks without leaking allowances", () => {
    const zeroLimit = checkRateLimit("zero-limit-test", 0, 60000);
    assert.equal(zeroLimit.allowed, false);
    assert.equal(zeroLimit.remaining, 0);

    const negLimit = checkRateLimit("neg-limit-test", -5, 60000);
    assert.equal(negLimit.allowed, false);
  });

  test("cleanupExpiredRateLimits actively purges expired keys and prevents memory leaks", () => {
    // 1. Create a key with a past window
    checkRateLimit("expired-client", 5, 1000);

    // Fast-forward simulated time by 2000ms
    const simulatedNow = Date.now() + 2000;
    const prunedCount = cleanupExpiredRateLimits(simulatedNow);

    assert.ok(prunedCount >= 1, "Must prune expired keys from memory store");
  });

  test("rateLimitResponse produces valid 429 response with Bengali message and headers", async () => {
    const response = rateLimitResponse(45, "অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("Retry-After"), "45");
    assert.equal(response.headers.get("X-RateLimit-Remaining"), "0");

    const json = await response.json();
    assert.equal(json.success, false);
    assert.equal(json.error, "অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
    assert.equal(json.retryAfter, 45);
  });
});

// =========================================================================
// 3. Rate Limiting on Sensitive API Endpoints
// =========================================================================
describe("Sprint 8: Rate Limiting Defense on Sensitive Endpoints", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  test("POST /api/auth/otp/send enforces rate limit (5 req/min)", async () => {
    const ip = "10.0.0.101";

    for (let i = 0; i < 5; i++) {
      const req = new NextRequest("http://localhost/api/auth/otp/send", {
        method: "POST",
        headers: { "x-forwarded-for": ip, "content-type": "application/json" },
        body: JSON.stringify({ mobile: "01711000000" }),
      });
      const res = await otpSendRoute(req);
      assert.ok(res.status !== 429, `Request ${i + 1} should be permitted`);
    }

    // 6th request from same IP must receive 429
    const spamReq = new NextRequest("http://localhost/api/auth/otp/send", {
      method: "POST",
      headers: { "x-forwarded-for": ip, "content-type": "application/json" },
      body: JSON.stringify({ mobile: "01711000000" }),
    });
    const resBlocked = await otpSendRoute(spamReq);
    assert.equal(resBlocked.status, 429);
    const json = await resBlocked.json();
    assert.equal(json.success, false);
    assert.match(json.error, /অতিরিক্ত ওটিপি অনুরোধ/);
  });

  test("POST /api/auth/otp/verify enforces rate limit (5 req/min)", async () => {
    const ip = "10.0.0.102";

    for (let i = 0; i < 5; i++) {
      const req = new NextRequest("http://localhost/api/auth/otp/verify", {
        method: "POST",
        headers: { "x-forwarded-for": ip, "content-type": "application/json" },
        body: JSON.stringify({ mobile: "01711000000", otp: "999999" }),
      });
      const res = await otpVerifyRoute(req);
      assert.ok(res.status !== 429, `Verify attempt ${i + 1} should reach verification`);
    }

    // 6th brute-force attempt must be blocked with 429
    const bruteReq = new NextRequest("http://localhost/api/auth/otp/verify", {
      method: "POST",
      headers: { "x-forwarded-for": ip, "content-type": "application/json" },
      body: JSON.stringify({ mobile: "01711000000", otp: "123456" }),
    });
    const resBlocked = await otpVerifyRoute(bruteReq);
    assert.equal(resBlocked.status, 429);
    const json = await resBlocked.json();
    assert.equal(json.success, false);
    assert.match(json.error, /অতিরিক্ত ওটিপি যাচাই/);
  });

  test("POST /api/applications enforces rate limit (10 req/min)", async () => {
    const ip = "10.0.0.103";

    for (let i = 0; i < 10; i++) {
      const req = new NextRequest("http://localhost/api/applications", {
        method: "POST",
        headers: { "x-forwarded-for": ip, "content-type": "application/json" },
        body: JSON.stringify({
          eventSlug: "national-imam-symposium-2026",
          name: "হাফেজ মোশাররফ",
          mobile: "01822334455",
          category: "IMAM",
          division: "ঢাকা",
          district: "ঢাকা",
          mosqueName: "কেন্দ্রীয় মসজিদ",
          answers: {
            qualification: "দাওরায়ে হাদিস",
            experienceYears: "৫ বছরের বেশি",
          },
        }),
      });
      const res = await applicationsRoute(req);
      assert.ok(res.status !== 429);
    }

    // 11th request receives 429
    const floodReq = new NextRequest("http://localhost/api/applications", {
      method: "POST",
      headers: { "x-forwarded-for": ip, "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    const resBlocked = await applicationsRoute(floodReq);
    assert.equal(resBlocked.status, 429);
  });

  test("/api/checkin POST & GET enforce scan rate limits", async () => {
    const ip = "10.0.0.104";

    // Check GET rate limit
    for (let i = 0; i < 30; i++) {
      const req = new NextRequest(`http://localhost/api/checkin?token=TOKEN-${i}`, {
        method: "GET",
        headers: { "x-forwarded-for": ip },
      });
      const res = await checkinLookupRoute(req);
      assert.ok(res.status !== 429);
    }

    // 31st GET is blocked
    const reqBlocked = new NextRequest("http://localhost/api/checkin?token=TOKEN-OVERFLOW", {
      method: "GET",
      headers: { "x-forwarded-for": ip },
    });
    const resBlocked = await checkinLookupRoute(reqBlocked);
    assert.equal(resBlocked.status, 429);

    // Check POST rate limit
    const postIp = "10.0.0.105";
    for (let i = 0; i < 30; i++) {
      const req = new NextRequest("http://localhost/api/checkin", {
        method: "POST",
        headers: { "x-forwarded-for": postIp, "content-type": "application/json" },
        body: JSON.stringify({ token: `TOKEN-${i}` }),
      });
      const res = await checkinRoute(req);
      assert.ok(res.status !== 429);
    }

    // 31st POST is blocked
    const postBlocked = new NextRequest("http://localhost/api/checkin", {
      method: "POST",
      headers: { "x-forwarded-for": postIp, "content-type": "application/json" },
      body: JSON.stringify({ token: "TOKEN-OVERFLOW" }),
    });
    const resPostBlocked = await checkinRoute(postBlocked);
    assert.equal(resPostBlocked.status, 429);
  });
});

// =========================================================================
// 4. System Health & Diagnostic API (/api/health)
// =========================================================================
describe("Sprint 8: System Health & Diagnostic API", () => {
  test("GET /api/health returns 200 with standard health check structure", async () => {
    const res = await healthRoute();
    assert.equal(res.status, 200);

    const json = await res.json();
    assert.equal(json.status, "healthy");
    assert.ok(typeof json.timestamp === "string" && !isNaN(Date.parse(json.timestamp)));
    assert.ok(typeof json.uptime === "number" && json.uptime >= 0);
    assert.equal(json.version, "1.0.0");

    assert.ok(json.checks, "checks object must exist");
    assert.equal(json.checks.database, "ok");
    assert.ok(json.checks.memory === "ok" || json.checks.memory === "warning");
    assert.equal(json.checks.security, "ok");

    assert.ok(json.system, "system diagnostics must exist");
    assert.ok(typeof json.system.activeRateLimiters === "number");
  });
});

// =========================================================================
// 5. PWA Mobile-First Manifest (src/app/manifest.ts)
// =========================================================================
describe("Sprint 8: PWA Mobile-First Manifest", () => {
  test("manifest() returns authentic As-Sunnah institutional PWA specification", () => {
    const m = manifest();

    assert.equal(m.name, "আস-সুন্নাহ ইভেন্ট ও ফলো-আপ");
    assert.equal(m.short_name, "আস-সুন্নাহ");
    assert.equal(m.theme_color, "#04180F");
    assert.equal(m.background_color, "#04180F");
    assert.equal(m.display, "standalone");
    assert.equal(m.start_url, "/");

    assert.ok(Array.isArray(m.icons), "icons must be an array");
    assert.ok(m.icons.length >= 2, "must provide at least 192x192 and 512x512 icons");

    const icon192 = m.icons.find(i => i.sizes === "192x192");
    assert.ok(icon192, "Must contain 192x192 icon for mobile home screen");

    const icon512 = m.icons.find(i => i.sizes === "512x512");
    assert.ok(icon512, "Must contain 512x512 icon for high-density displays");
  });

  test("PWA service worker exists and provides offline fallback", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const swPath = path.resolve(process.cwd(), "public/sw.js");
    assert.ok(fs.existsSync(swPath), "public/sw.js must exist for PWA offline readiness");

    const swContent = fs.readFileSync(swPath, "utf-8");
    assert.ok(swContent.includes("as-sunnah-pwa"), "Service worker must have cache name");
    assert.ok(swContent.includes("manifest.webmanifest"), "Service worker must precache manifest");
    assert.ok(swContent.includes("caches.match"), "Service worker must handle offline cache lookups");
  });
});

// =========================================================================
// 6. Launch Console, Accessibility & Messages Dictionary
// =========================================================================
describe("Sprint 8: Production Launch Readiness & Accessibility", () => {
  test("messages dictionary contains complete Sprint 8 launch strings", () => {
    const msg = messages.launch;
    assert.ok(msg, "messages.launch must be defined");
    assert.ok(msg.pageTitle.includes("প্রোডাকশন"));
    assert.ok(msg.statusReady.includes("১০০%"));
    assert.ok(msg.sprintChecklistTitle.includes("স্প্রিন্ট"));
    assert.ok(msg.securityTitle.includes("নিরাপত্তা"));
    assert.ok(msg.mobilePwaTitle.includes("মোবাইল"));
    assert.ok(msg.dbBackupTitle.includes("ডাটাবেজ"));
  });
});

// =========================================================================
// 7. Full Platform End-to-End Lifecycle Integration Test (Sprints 1 to 8)
// =========================================================================
describe("Sprint 8: Full Platform End-to-End Lifecycle Integration", () => {
  test("runs entire attendee, imam, admin, and monitoring journey seamlessly", async () => {
    // -------------------------------------------------------------
    // Step 1: Sprint 2 - Public Event Discovery
    // -------------------------------------------------------------
    const events = await getEventsData();
    assert.ok(events.length > 0, "Public events must be discoverable");
    const activeEvent = events.find(e => e.status === "UPCOMING") || events[0];
    assert.ok(activeEvent.slug, "Event must have valid slug");

    // -------------------------------------------------------------
    // Step 2: Sprint 3 - Dynamic Application & Auto-Screening
    // -------------------------------------------------------------
    const appResult = await createApplication({
      eventSlug: activeEvent.slug,
      name: "মুফতি তাওহিদুল ইসলাম",
      mobile: "01788990011",
      category: PersonCategory.IMAM,
      division: "রংপুর",
      district: "কুড়িগ্রাম", // Priority remote district
      upazila: "নাগেশ্বরী",
      mosqueName: "বায়তুস সালাম জামে মসজিদ",
      answers: {
        qualification: "দাওরায়ে হাদিস",
        experienceYears: "৫ বছরের বেশি",
        motivation: "সমাজের বহুমুখী সংস্কার ও খুতবা আধুনিকায়ন",
      },
    });

    assert.equal(appResult.success, true);
    assert.ok(appResult.application.number.startsWith("ASF-"));
    assert.ok(appResult.application.qrToken.startsWith("asf_pass_"));
    // High qualification from priority district auto-shortlists
    assert.ok(
      appResult.application.status === "SHORTLISTED" ||
      appResult.application.status === "SELECTED" ||
      appResult.application.status === "PENDING"
    );

    // -------------------------------------------------------------
    // Step 3: Sprint 4 - Venue Check-in with QR Token
    // -------------------------------------------------------------
    const checkinRes = await checkInApplicant(appResult.application.qrToken);
    assert.equal(checkinRes.success, true);
    assert.equal(checkinRes.status, "APPROVED");
    assert.ok(checkinRes.checkedInAt, "Timestamp must be set on check-in");

    // -------------------------------------------------------------
    // Step 4: Sprint 5 - Certificate Verification
    // -------------------------------------------------------------
    const certLookup = await verifyCertificate("CERT-ASF-2026-0814");
    assert.equal(certLookup.valid, true);
    assert.ok(certLookup.certificate);
    assert.equal(certLookup.certificate.signerName, "শায়খ আহমাদুল্লাহ");

    // -------------------------------------------------------------
    // Step 5: Sprint 6 - Automated Cron Scheduling for Follow-up
    // -------------------------------------------------------------
    const nextKhutbah = calculateNextRun("KHUTBAH_PUSH");
    assert.ok(nextKhutbah.date.getTime() > Date.now());
    assert.ok(nextKhutbah.dateBn.length > 0);

    // -------------------------------------------------------------
    // Step 6: Sprint 7 - Secret Admin Rating & Emergency Relief
    // -------------------------------------------------------------
    const adminTrainees = await getAdminTraineesList();
    assert.ok(adminTrainees.length > 0, "Admin directory should contain trainees");

    const traineeId = "person-mock-1";
    // Secret rating update
    const ratingRes = await updateTraineeInternalRating(traineeId, 5);
    assert.equal(ratingRes.success, true);

    // Admin call log & red flag resolution
    const callRes = await recordTraineeCallLog(traineeId, {
      callerName: "অ্যাডমিন সুপারভাইজার",
      notes: "মাঠপর্যায়ের অগ্রগতি সন্তোষজনক। ইমাম সক্রিয় আছেন।",
      outcome: "REACHED",
      clearRedFlag: true,
    });
    assert.equal(callRes.success, true);

    // Emergency relief broadcast & trainee response
    const broadcast = await createReliefBroadcast({
      title: "কুড়িগ্রাম বন্যা দুর্গতদের জন্য ইমাম সহায়তা সেল",
      district: "কুড়িগ্রাম",
      disasterType: "FLOOD",
      message: "আস-সুন্নাহ জরুরি ত্রাণ সেল: আপনার এলাকায় সক্রিয়ভাবে কাজ করতে প্রস্তুত আছেন?",
    });
    assert.ok(broadcast.id);

    const reliefRes = await recordReliefResponse(broadcast.id, "01711223344", "হ্যাঁ আমি প্রস্তুত");
    assert.equal(reliefRes.success, true);
    assert.equal(reliefRes.responseStatus, "READY");
    assert.equal(reliefRes.statusBn, "হ্যাঁ, প্রস্তুত");

    const tally = await getReliefBroadcastSummary(broadcast.id);
    assert.ok(tally.totalSent >= 0);

    // -------------------------------------------------------------
    // Step 7.1: Verify brand-new unseeded mobile number lifecycle
    // -------------------------------------------------------------
    const freshUnseededMobile = "01699112233";
    const freshOtpReq = await otpSendRoute(
      new NextRequest("http://localhost/api/auth/otp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mobile: freshUnseededMobile }),
      })
    );
    assert.equal(freshOtpReq.status, 200);

    const freshVerifyReq = await otpVerifyRoute(
      new NextRequest("http://localhost/api/auth/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mobile: freshUnseededMobile, otp: "123456" }),
      })
    );
    assert.equal(freshVerifyReq.status, 200);
    const freshVerifyJson = await freshVerifyReq.json();
    assert.ok(freshVerifyJson.trainee.id);

    // Profile must be retrievable by personId without being redirected to login
    const freshProfile = await getTraineeFullProfile(freshVerifyJson.trainee.id);
    assert.ok(freshProfile, "Freshly registered unseeded trainee must have accessible full profile");
    assert.equal(freshProfile.mobile, freshUnseededMobile);

    // Step 7: Sprint 8 - Security Hardening & Isolation Invariant
    // -------------------------------------------------------------
    // Verify trainee profile never exposes internal rating or call logs
    const publicProfile = await getTraineeFullProfile("01711223344");
    assert.ok(publicProfile);
    assert.equal((publicProfile as unknown as Record<string, unknown>).internalStars, undefined);
    assert.equal((publicProfile as unknown as Record<string, unknown>).redFlag, undefined);
    assert.equal((publicProfile as unknown as Record<string, unknown>).callLogs, undefined);

    const sanitized = sanitizeTraineeProfile({
      id: "test",
      name: "ইমাম সাহেব",
      internalStars: 5,
      redFlag: true,
      callLogs: [{ id: 1 }],
    });
    assert.equal((sanitized as Record<string, unknown>).internalStars, undefined);
    assert.equal((sanitized as Record<string, unknown>).redFlag, undefined);
    assert.equal((sanitized as Record<string, unknown>).callLogs, undefined);

    // Verify rate limiting works in live lifecycle
    const rlRes = checkRateLimit("lifecycle-test-ip", 10, 60000);
    assert.equal(rlRes.allowed, true);

    // System Health Check returns healthy
    const health = await healthRoute();
    const healthJson = await health.json();
    assert.equal(healthJson.status, "healthy");
    assert.equal(healthJson.checks.database, "ok");
    assert.equal(healthJson.checks.security, "ok");
  });
});
