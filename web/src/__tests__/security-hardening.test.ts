import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
  ADMIN_SESSION_COOKIE_NAME,
  createSessionToken,
  SESSION_COOKIE_NAME,
  getJwtSecretKey,
  sanitizeRedirectUrl,
} from "@/lib/auth";
import {
  hashPassword,
  verifyPassword,
  authenticateAdmin,
  seedAdminUser,
} from "@/lib/admin-auth";
import { resetRateLimitStore } from "@/lib/rate-limit";
import { POST as adminLoginRoute } from "@/app/api/admin/auth/login/route";
import { POST as adminLogoutRoute } from "@/app/api/admin/auth/logout/route";
import { POST as magicLinkCreateRoute } from "@/app/api/auth/magic-link/create/route";
import { POST as otpSendRoute } from "@/app/api/auth/otp/send/route";
import { requestOtp, verifyOtp, MASTER_TEST_OTP, clearOtpStore } from "@/lib/otp";
import { validateAndConsumeMagicLink, createMagicLink } from "@/lib/magic-link";
import { resolveMagicLinkDestination, GET as magicLinkRoute } from "@/app/m/[code]/route";
import { GET as prefillRoute } from "@/app/api/applications/prefill/route";
import nextConfig from "../../next.config";
import { AdminRole, PersonCategory } from "@prisma/client";

// =========================================================================
// 1. Admin Authentication, Password Hashing & Middleware Protection
// =========================================================================
describe("Security Hardening: Admin Authentication & Middleware Guard", () => {
  let sampleAdminToken: string;

  beforeEach(async () => {
    seedAdminUser("super@assunnah.local", "ValidAdminPass#2026", "Master Admin", AdminRole.SUPER_ADMIN);
    sampleAdminToken = await createAdminSessionToken({
      adminId: "admin-test-01",
      email: "super@assunnah.local",
      name: "Master Admin",
      role: AdminRole.SUPER_ADMIN,
    });
  });

  test("scrypt password hashing and constant-time verification", () => {
    const rawPass = "SecretSecurePass123!";
    const hash = hashPassword(rawPass);

    assert.ok(hash.includes(":"), "Hash must contain salt and hash separated by colon");
    assert.equal(verifyPassword(rawPass, hash), true, "Correct password must verify successfully");
    assert.equal(verifyPassword("WrongPass456!", hash), false, "Wrong password must be rejected");
    assert.equal(verifyPassword("", hash), false, "Empty password must be rejected");
  });

  test("authenticateAdmin validates correct credentials and rejects incorrect credentials", async () => {
    const success = await authenticateAdmin("super@assunnah.local", "ValidAdminPass#2026");
    assert.equal(success.success, true);
    assert.equal(success.admin?.email, "super@assunnah.local");
    assert.equal(success.admin?.role, AdminRole.SUPER_ADMIN);

    const failPass = await authenticateAdmin("super@assunnah.local", "IncorrectPassword");
    assert.equal(failPass.success, false);
    assert.match(failPass.error || "", /ভুল ইমেইল বা পাসওয়ার্ড/);

    const failEmail = await authenticateAdmin("nonexistent@assunnah.local", "ValidAdminPass#2026");
    assert.equal(failEmail.success, false);
  });

  test("API: POST /api/admin/auth/login succeeds with valid credentials and sets session cookie", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "super@assunnah.local",
        password: "ValidAdminPass#2026",
      }),
    });

    const res = await adminLoginRoute(req);
    assert.equal(res.status, 200);

    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.token, "Response must include admin JWT token");
    assert.equal(data.admin.email, "super@assunnah.local");

    const setCookie = res.headers.get("set-cookie");
    assert.ok(setCookie?.includes(ADMIN_SESSION_COOKIE_NAME), "Must set admin session cookie");
    assert.ok(setCookie?.includes("HttpOnly"), "Must be HttpOnly cookie");
  });

  test("API: POST /api/admin/auth/login rejects invalid password with 401", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "super@assunnah.local",
        password: "WrongPassword!",
      }),
    });

    const res = await adminLoginRoute(req);
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test("API: POST /api/admin/auth/logout clears admin session cookie", async () => {
    const res = await adminLogoutRoute();
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);

    const setCookie = res.headers.get("set-cookie");
    assert.ok(setCookie?.includes(ADMIN_SESSION_COOKIE_NAME));
    assert.ok(setCookie?.includes("Max-Age=0") || setCookie?.includes("expires="));
  });

  test("Middleware: redirects unauthorized page visit to /admin/login", async () => {
    const req = new NextRequest("http://localhost:3000/admin/applications");
    const res = await middleware(req);

    assert.equal(res.status, 307);
    const location = res.headers.get("location");
    assert.ok(location?.includes("/admin/login"), "Must redirect to /admin/login");
    assert.ok(location?.includes("from=%2Fadmin%2Fapplications"), "Must preserve from parameter");
  });

  test("Middleware: returns 401 for unauthorized API call to /api/admin/*", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/trainees");
    const res = await middleware(req);

    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /অননুমোদিত অ্যাক্সেস/);
  });

  test("Middleware: permits admin page access when valid session cookie is provided", async () => {
    const req = new NextRequest("http://localhost:3000/admin/monitoring", {
      headers: {
        cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sampleAdminToken}`,
      },
    });

    const res = await middleware(req);
    assert.equal(res.status, 200);
  });

  test("Middleware: permits admin API access when Bearer token is provided", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/trainees", {
      headers: {
        authorization: `Bearer ${sampleAdminToken}`,
      },
    });

    const res = await middleware(req);
    assert.equal(res.status, 200);
  });

  test("Middleware: redirects already logged-in admin away from /admin/login to dashboard", async () => {
    const req = new NextRequest("http://localhost:3000/admin/login?from=/admin/relief", {
      headers: {
        cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sampleAdminToken}`,
      },
    });

    const res = await middleware(req);
    assert.equal(res.status, 307);
    const location = res.headers.get("location");
    assert.ok(location?.includes("/admin/relief"));
  });

  test("Middleware: allows unauthenticated visit to /admin/login", async () => {
    const req = new NextRequest("http://localhost:3000/admin/login");
    const res = await middleware(req);
    assert.equal(res.status, 200);
  });

  test("Middleware: prevents Open Redirect on /admin/login?from=//evil.com", async () => {
    const maliciousCases = [
      "//evil.com",
      "/\\evil.com",
      "https://phishing.org",
      "javascript:alert(1)",
      "//evil.com/fake-login",
    ];

    for (const badUrl of maliciousCases) {
      const req = new NextRequest(`http://localhost:3000/admin/login?from=${encodeURIComponent(badUrl)}`, {
        headers: {
          cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sampleAdminToken}`,
        },
      });
      const res = await middleware(req);
      assert.equal(res.status, 307);
      const location = res.headers.get("location") || "";
      assert.ok(
        !location.includes("evil.com") && !location.includes("phishing.org"),
        `Open redirect detected for ${badUrl} -> ${location}`
      );
      assert.ok(
        location.endsWith("/admin/applications"),
        `Expected safe fallback /admin/applications, got ${location}`
      );
    }
  });

  test("Middleware: handles trailing slash /admin/login/ without infinite loop", async () => {
    const req = new NextRequest("http://localhost:3000/admin/login/");
    const res = await middleware(req);
    assert.equal(res.status, 200, "Unauthenticated /admin/login/ must return 200 instead of looping");
  });

  test("Middleware: redirects /admin to /admin/applications for authenticated admin", async () => {
    const req = new NextRequest("http://localhost:3000/admin", {
      headers: {
        cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sampleAdminToken}`,
      },
    });
    const res = await middleware(req);
    assert.equal(res.status, 307);
    const location = res.headers.get("location");
    assert.ok(location?.endsWith("/admin/applications"));
  });

  test("Middleware: accepts case-insensitive lowercase 'bearer' authorization header", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/trainees", {
      headers: {
        authorization: `bearer ${sampleAdminToken}`,
      },
    });
    const res = await middleware(req);
    assert.equal(res.status, 200);
  });

  test("Rate Limiting: POST /api/admin/auth/login throttles brute force attempts", async () => {
    resetRateLimitStore();

    for (let i = 0; i < 10; i++) {
      const req = new NextRequest("http://localhost:3000/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-real-ip": "10.0.0.99" },
        body: JSON.stringify({ email: "attacker@bad.org", password: `guess_${i}` }),
      });
      const res = await adminLoginRoute(req);
      assert.equal(res.status, 401);
    }

    // 11th request should be rate limited with 429
    const blockedReq = new NextRequest("http://localhost:3000/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "10.0.0.99" },
      body: JSON.stringify({ email: "attacker@bad.org", password: "guess_overflow" }),
    });
    const blockedRes = await adminLoginRoute(blockedReq);
    assert.equal(blockedRes.status, 429);
    const data = await blockedRes.json();
    assert.equal(data.success, false);
    assert.match(data.error, /অতিরিক্ত অ্যাডমিন লগইন চেষ্টা/);
  });
});

// =========================================================================
// 2. Eliminate Public Magic Link Creation Hazard
// =========================================================================
describe("Security Hardening: Public Magic Link Creation Guard", () => {
  let validAdminToken: string;

  beforeEach(async () => {
    validAdminToken = await createAdminSessionToken({
      adminId: "admin-ml-test",
      email: "officer@assunnah.foundation",
      name: "Field Officer",
      role: AdminRole.OFFICER,
    });
  });

  test("Middleware blocks public unauthenticated access to /api/auth/magic-link/create with 401", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/magic-link/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "01711223344" }),
    });

    const res = await middleware(req);
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /অননুমোদিত অ্যাক্সেস/);
  });

  test("Route handler blocks unauthenticated caller directly with 401", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/magic-link/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "01711223344" }),
    });

    const res = await magicLinkCreateRoute(req);
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test("Authenticated admin CAN generate magic links through /api/auth/magic-link/create", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/magic-link/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${validAdminToken}`,
      },
      body: JSON.stringify({
        mobile: "01711223344",
        purpose: "KHUTBAH",
        expiresInMinutes: 60,
      }),
    });

    const res = await magicLinkCreateRoute(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.magicLink.url);
    assert.ok(data.magicLink.rawToken);
  });
});

// =========================================================================
// 3. Prevent OTP Code Leakage in API Response & Cryptographic Randomness
// =========================================================================
describe("Security Hardening: OTP API Privacy & Cryptographic Security", () => {
  beforeEach(() => {
    clearOtpStore();
  });

  test("POST /api/auth/otp/send NEVER leaks simulatedOtp in JSON response", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "01711998877" }),
    });

    const res = await otpSendRoute(req);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.mobile, "01711998877");
    assert.ok(body.expiresInSeconds);

    // CRITICAL SECURITY ASSERTION:
    assert.equal(body.simulatedOtp, undefined, "simulatedOtp MUST NEVER be present in API response");
    assert.equal("simulatedOtp" in body, false, "simulatedOtp key MUST NOT exist in JSON");
  });

  test("requestOtp produces 6-digit numeric codes with cryptographic randomness", () => {
    for (let i = 0; i < 20; i++) {
      const mobile = `0171${Math.floor(1000000 + Math.random() * 9000000)}`;
      const res = requestOtp(mobile);
      assert.equal(res.success, true);
      assert.ok(res.simulatedOtp);
      assert.match(res.simulatedOtp!, /^\d{6}$/);
      const num = parseInt(res.simulatedOtp!, 10);
      assert.ok(num >= 100000 && num <= 999999);
    }
  });
});

// =========================================================================
// 4. Production Lockdown for Test OTP & Demo Magic Link
// =========================================================================
describe("Security Hardening: Production Lockdown for Demo Credentials", () => {
  const originalEnv = process.env.NODE_ENV;
  const setNodeEnv = (val: string | undefined) => {
    (process.env as Record<string, string | undefined>).NODE_ENV = val;
  };

  afterEach(() => {
    setNodeEnv(originalEnv);
  });

  test("Master test OTP (123456) is accepted in development / test mode", () => {
    setNodeEnv("test");
    clearOtpStore();
    requestOtp("01711000001");
    const verify = verifyOtp("01711000001", MASTER_TEST_OTP);
    assert.equal(verify.success, true, "Master test OTP should work in test/dev");
  });

  test("Master test OTP (123456) is STRICTLY REJECTED in production mode", () => {
    setNodeEnv("production");
    clearOtpStore();
    // Request an OTP, which generates a random 6-digit number
    requestOtp("01711000002");

    // Attempting to bypass with 123456 MUST FAIL in production
    const verify = verifyOtp("01711000002", "123456");
    assert.equal(verify.success, false, "Master test OTP MUST NOT bypass verification in production");
    assert.match(verify.error || "", /ভুল ওটিপি কোড/);
  });

  test("Demo magic link /m/demo is STRICTLY REJECTED in production mode", async () => {
    setNodeEnv("production");
    const res = await validateAndConsumeMagicLink("demo");
    assert.equal(res.valid, false, "Demo magic link must be invalid in production");
    assert.equal(res.error, "not_found");

    const req = new NextRequest("http://localhost:3000/m/demo");
    const routeRes = await magicLinkRoute(req, {
      params: Promise.resolve({ code: "demo" }),
    });
    assert.equal(routeRes.status, 302);
    const location = routeRes.headers.get("location");
    assert.ok(location?.includes("error=invalid"));
  });

  test("Demo magic link with uppercase /m/DEMO is STRICTLY REJECTED in production mode", async () => {
    setNodeEnv("production");
    const res = await validateAndConsumeMagicLink("DEMO");
    assert.equal(res.valid, false, "Uppercase DEMO must also be rejected in production");

    const req = new NextRequest("http://localhost:3000/m/DEMO");
    const routeRes = await magicLinkRoute(req, {
      params: Promise.resolve({ code: "DEMO" }),
    });
    assert.equal(routeRes.status, 302);
    const location = routeRes.headers.get("location");
    assert.ok(location?.includes("error=invalid"));
  });
});

// =========================================================================
// 5. JWT Secret Key Synchronization
// =========================================================================
describe("Security Hardening: JWT Secret Key Synchronization", () => {
  test("getJwtSecretKey returns non-empty byte buffer", () => {
    const key = getJwtSecretKey();
    assert.ok(key instanceof Uint8Array);
    assert.ok(key.length >= 32, "Secret key must be at least 32 bytes for HS256 security");
  });

  test("creates and verifies admin session tokens consistently", async () => {
    const payload = {
      adminId: "adm-test-token",
      email: "testadmin@assunnah.foundation",
      name: "Token Admin",
      role: AdminRole.SUPER_ADMIN,
    };

    const token = await createAdminSessionToken(payload, "1h");
    assert.ok(typeof token === "string");

    const verified = await verifyAdminSessionToken(token);
    assert.ok(verified);
    assert.equal(verified?.adminId, payload.adminId);
    assert.equal(verified?.email, payload.email);
    assert.equal(verified?.role, payload.role);
  });
});

// =========================================================================
// 6. Prefill Privacy Protection & Anti-Enumeration
// =========================================================================
describe("Security Hardening: Prefill Privacy Protection", () => {
  test("Unauthenticated public caller receives MASKED demographic details", async () => {
    const req = new NextRequest("http://localhost:3000/api/applications/prefill?mobile=01711223344");
    const res = await prefillRoute(req);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.found, true);
    assert.equal(body.isMasked, true, "Public response must be flagged as masked");

    // Check name masking (e.g. contains *** and not full original name)
    assert.ok(body.person.name.includes("***"), `Name should be masked: ${body.person.name}`);
    assert.notEqual(body.person.name, "মুফতি আব্দুর রহমান", "Full name must not be leaked to public");

    // Check phone masking
    assert.ok(body.person.mobile.includes("****"), `Mobile should be masked: ${body.person.mobile}`);

    // Check mosque masking
    if (body.person.mosqueName) {
      assert.ok(body.person.mosqueName.includes("***"), "Mosque name must be masked");
    }
  });

  test("Authenticated owner caller receives FULL UNMASKED demographic details", async () => {
    const ownerToken = await createSessionToken({
      personId: "person-mock-1",
      mobile: "01711223344",
      name: "মুফতি আব্দুর রহমান",
      category: PersonCategory.IMAM,
    });

    const req = new NextRequest("http://localhost:3000/api/applications/prefill?mobile=01711223344", {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=${ownerToken}`,
      },
    });

    const res = await prefillRoute(req);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.found, true);
    assert.equal(body.isMasked, false, "Owner response must be unmasked");
    assert.equal(body.person.name, "মুফতি আব্দুর রহমান");
    assert.equal(body.person.mobile, "01711223344");
  });

  test("Authenticated admin caller receives FULL UNMASKED demographic details", async () => {
    const adminToken = await createAdminSessionToken({
      adminId: "admin-prefill",
      email: "admin@assunnah.foundation",
      name: "Admin User",
      role: AdminRole.SUPER_ADMIN,
    });

    const req = new NextRequest("http://localhost:3000/api/applications/prefill?mobile=01711223344", {
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    const res = await prefillRoute(req);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.found, true);
    assert.equal(body.isMasked, false, "Admin response must be unmasked");
    assert.equal(body.person.name, "মুফতি আব্দুর রহমান");
  });

  test("Rate Limiting: GET /api/applications/prefill throttles excessive phone enumeration", async () => {
    resetRateLimitStore();

    for (let i = 0; i < 30; i++) {
      const req = new NextRequest(`http://localhost:3000/api/applications/prefill?mobile=01711223344`, {
        headers: { "x-real-ip": "10.0.0.88" },
      });
      const res = await prefillRoute(req);
      assert.equal(res.status, 200);
    }

    // 31st request from same IP is blocked
    const blockedReq = new NextRequest(`http://localhost:3000/api/applications/prefill?mobile=01711223344`, {
      headers: { "x-real-ip": "10.0.0.88" },
    });
    const blockedRes = await prefillRoute(blockedReq);
    assert.equal(blockedRes.status, 429);
    const data = await blockedRes.json();
    assert.equal(data.success, false);
    assert.match(data.error, /অতিরিক্ত অনুরোধ/);
  });
});

// =========================================================================
// 7. Magic Link Purpose Redirection
// =========================================================================
describe("Security Hardening: Magic Link Purpose Smart Redirection", () => {
  test("resolveMagicLinkDestination maps purposes accurately", () => {
    assert.equal(resolveMagicLinkDestination("khutbah"), "/portal?tab=khutbah");
    assert.equal(resolveMagicLinkDestination("KHUTBAH_PUSH"), "/portal?tab=khutbah");
    assert.equal(resolveMagicLinkDestination("class"), "/portal?tab=classes");
    assert.equal(resolveMagicLinkDestination("classes"), "/portal?tab=classes");
    assert.equal(resolveMagicLinkDestination("report"), "/portal/submissions/new");
    assert.equal(resolveMagicLinkDestination("submission"), "/portal/submissions/new");
    assert.equal(resolveMagicLinkDestination("relief"), "/portal?tab=relief");
    assert.equal(resolveMagicLinkDestination("materials"), "/portal?tab=materials");
    assert.equal(resolveMagicLinkDestination("certificate"), "/portal/certificates");
    assert.equal(resolveMagicLinkDestination("PORTAL_LOGIN"), "/portal");
    assert.equal(resolveMagicLinkDestination(undefined), "/portal");
  });

  test("resolveMagicLinkDestination respects custom payload redirectUrl", () => {
    const dest = resolveMagicLinkDestination("khutbah", { redirectUrl: "/portal/custom-page" });
    assert.equal(dest, "/portal/custom-page");
  });

  test("resolveMagicLinkDestination blocks open-redirect payloads", () => {
    assert.equal(
      resolveMagicLinkDestination("khutbah", { redirectUrl: "//evil.com" }),
      "/portal?tab=khutbah"
    );
    assert.equal(
      resolveMagicLinkDestination("khutbah", { redirectUrl: "/\\evil.com" }),
      "/portal?tab=khutbah"
    );
    assert.equal(
      resolveMagicLinkDestination("khutbah", { redirectUrl: "https://evil.com" }),
      "/portal?tab=khutbah"
    );
  });

  test("sanitizeRedirectUrl strictly isolates relative paths and rejects protocol-relative bypasses", () => {
    assert.equal(sanitizeRedirectUrl("//evil.com"), "/admin/applications");
    assert.equal(sanitizeRedirectUrl("/\\evil.com"), "/admin/applications");
    assert.equal(sanitizeRedirectUrl("http://phishing.org"), "/admin/applications");
    assert.equal(sanitizeRedirectUrl("javascript:void(0)"), "/admin/applications");
    assert.equal(sanitizeRedirectUrl("/admin/relief?status=ACTIVE"), "/admin/relief?status=ACTIVE");
    assert.equal(sanitizeRedirectUrl("/portal/submissions"), "/portal/submissions");
    assert.equal(sanitizeRedirectUrl(null), "/admin/applications");
    assert.equal(sanitizeRedirectUrl(""), "/admin/applications");
  });

  test("GET /m/[code] consumes link and redirects to purpose-specific route", async () => {
    const created = await createMagicLink({
      personId: "person-mock-1",
      purpose: "khutbah",
      expiresInMinutes: 30,
    });

    const req = new NextRequest(`http://localhost:3000/m/${created.shortCode}?token=${created.rawToken}`);
    const res = await magicLinkRoute(req, {
      params: Promise.resolve({ code: created.shortCode }),
    });

    assert.equal(res.status, 302);
    const location = res.headers.get("location");
    assert.ok(location?.includes("/portal?tab=khutbah"), `Location must direct to khutbah tab, got ${location}`);

    const cookie = res.headers.get("set-cookie");
    assert.ok(cookie?.includes(SESSION_COOKIE_NAME), "Must set authenticated trainee session");
  });
});

// =========================================================================
// 8. SSR Image Security in next.config.ts
// =========================================================================
describe("Security Hardening: SSR Image Remote Patterns", () => {
  test("nextConfig.images contains no open wildcard hostnames (**)", () => {
    const remotePatterns = nextConfig.images?.remotePatterns || [];
    assert.ok(remotePatterns.length > 0, "remotePatterns must be configured");

    for (const pattern of remotePatterns) {
      assert.notEqual(
        pattern.hostname,
        "**",
        `Wildcard hostname '**' is forbidden for SSR image security, found: ${JSON.stringify(pattern)}`
      );
    }
  });

  test("nextConfig.images includes trusted As-Sunnah and CDN domains", () => {
    const remotePatterns = nextConfig.images?.remotePatterns || [];
    const hostnames = remotePatterns.map(p => p.hostname);

    assert.ok(hostnames.includes("images.unsplash.com"));
    assert.ok(hostnames.includes("assunnah.foundation"));
    assert.ok(hostnames.includes("*.assunnah.foundation"));
    assert.ok(hostnames.includes("*.r2.cloudflarestorage.com"));
  });
});
