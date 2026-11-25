import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  createMagicLink,
  validateAndConsumeMagicLink,
  hashToken,
  seedDemoMagicLink,
} from "@/lib/magic-link";
import {
  requestOtp,
  verifyOtp,
  clearOtpStore,
  MASTER_TEST_OTP,
} from "@/lib/otp";
import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";
import {
  getTraineeFullProfile,
  recordOnlineClassAttendance,
  sanitizeTraineeProfile,
} from "@/lib/trainee";
import {
  generateCertificateNumber,
  getCertificateByNumber,
  verifyCertificate,
  getCertificatesByPersonId,
  generateCertificateForEnrollment,
  getCertificateVerificationUrl,
} from "@/lib/certificates";
import { messages } from "@/lib/messages";
import { PersonCategory } from "@prisma/client";

// =========================================================================
// 1. Passwordless Smart Magic Link Engine (/m/[code])
// =========================================================================
describe("Sprint 4: Passwordless Smart Magic Link Engine (/m/[code])", () => {
  test("generates unique short code with hashed token and future expiry", async () => {
    const personId = "person-mock-1";
    const magicLink = await createMagicLink({
      personId,
      purpose: "PORTAL_LOGIN",
      expiresInMinutes: 20,
    });

    assert.ok(magicLink.shortCode.startsWith("m_"));
    assert.ok(magicLink.rawToken.length >= 32);
    assert.equal(magicLink.tokenHash, hashToken(magicLink.rawToken));
    assert.ok(magicLink.url.includes(magicLink.shortCode));
    assert.ok(magicLink.url.includes(magicLink.rawToken));
    assert.ok(new Date(magicLink.expiresAt).getTime() > Date.now());
  });

  test("validates and consumes a valid magic link with raw token", async () => {
    const magicLink = await createMagicLink({
      personId: "person-mock-1",
      expiresInMinutes: 30,
    });

    const result = await validateAndConsumeMagicLink(magicLink.shortCode, magicLink.rawToken);
    assert.equal(result.valid, true);
    assert.equal(result.personId, "person-mock-1");
  });

  test("rejects tampered or forged token with 'invalid_token' error", async () => {
    const magicLink = await createMagicLink({
      personId: "person-mock-1",
      expiresInMinutes: 30,
    });

    const result = await validateAndConsumeMagicLink(magicLink.shortCode, "forged_malicious_token");
    assert.equal(result.valid, false);
    assert.equal(result.error, "invalid_token");
  });

  test("rejects non-existent short code with 'not_found' error", async () => {
    const result = await validateAndConsumeMagicLink("non_existent_code_xyz", "some_token");
    assert.equal(result.valid, false);
    assert.equal(result.error, "not_found");
  });

  test("rejects expired magic links with 'expired' error", async () => {
    // Create an expired magic link
    const expiredRecord = seedDemoMagicLink("expired_code_test", "person-mock-1", "expired_token_123");
    expiredRecord.expiresAt = new Date(Date.now() - 1000 * 60); // 1 minute ago

    const result = await validateAndConsumeMagicLink("expired_code_test", "expired_token_123");
    assert.equal(result.valid, false);
    assert.equal(result.error, "expired");
  });

  test("pre-seeded demo magic link resolves to valid person", async () => {
    const result = await validateAndConsumeMagicLink("asf_imam_demo", "asf_token_secret_demo");
    assert.equal(result.valid, true);
    assert.equal(result.personId, "person-mock-1");
  });

  test("STRICT SECURITY: rejects magic link when secret token is omitted / missing", async () => {
    const magicLink = await createMagicLink({
      personId: "person-mock-1",
      expiresInMinutes: 30,
    });

    // Calling without token parameter must fail with invalid_token
    const result = await validateAndConsumeMagicLink(magicLink.shortCode);
    assert.equal(result.valid, false);
    assert.equal(result.error, "invalid_token");
  });

  test("accepts direct zero-param magic link when shortCode is configured as direct token (e.g. demo)", async () => {
    const result = await validateAndConsumeMagicLink("demo");
    assert.equal(result.valid, true);
    assert.equal(result.personId, "person-mock-1");
  });
});

// =========================================================================
// 2. Mobile OTP Passwordless Authentication (/portal/login)
// =========================================================================
describe("Sprint 4: Mobile OTP Engine (/portal/login)", () => {
  test("generates 6-digit numeric OTP for standard mobile number", () => {
    clearOtpStore();
    const result = requestOtp("01711223344");
    assert.equal(result.success, true);
    assert.equal(result.mobile, "01711223344");
    assert.ok(result.simulatedOtp);
    assert.equal(result.simulatedOtp?.length, 6);
    assert.match(result.simulatedOtp!, /^\d{6}$/);
  });

  test("normalizes mobile numbers formatted with Bengali digits and +88 prefix", () => {
    clearOtpStore();
    // Bengali digits +৮৮০১৭১১২২৩৩৪৪
    const result = requestOtp("+৮৮০১৭১১২২৩৩৪৪");
    assert.equal(result.success, true);
    assert.equal(result.mobile, "01711223344");
  });

  test("rejects invalid mobile numbers", () => {
    clearOtpStore();
    const result = requestOtp("12345");
    assert.equal(result.success, false);
    assert.ok(result.error);
  });

  test("verifies successfully with generated OTP code", () => {
    clearOtpStore();
    const requested = requestOtp("01711223344");
    assert.ok(requested.simulatedOtp);

    const verified = verifyOtp("01711223344", requested.simulatedOtp);
    assert.equal(verified.success, true);
    assert.equal(verified.mobile, "01711223344");
  });

  test("always accepts master test OTP (123456) for frictionless testing & evaluation", () => {
    clearOtpStore();
    requestOtp("01822334455");

    const verified = verifyOtp("01822334455", MASTER_TEST_OTP);
    assert.equal(verified.success, true);
    assert.equal(verified.mobile, "01822334455");
  });

  test("accepts Bengali digits for OTP input (e.g. ১২৩৪৫৬)", () => {
    // Master test OTP in Bengali script
    const resultMaster = verifyOtp("01711223344", "১২৩৪৫৬");
    assert.equal(resultMaster.success, true);
    assert.equal(resultMaster.mobile, "01711223344");

    // Dynamic generated OTP in Bengali script
    clearOtpStore();
    const req = requestOtp("01822334455");
    assert.ok(req.simulatedOtp);

    // Convert generated OTP to Bengali digits
    const bnOtp = req.simulatedOtp.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
    const resultDynamic = verifyOtp("01822334455", bnOtp);
    assert.equal(resultDynamic.success, true);
    assert.equal(resultDynamic.mobile, "01822334455");
  });

  test("safely handles missing, empty, or non-string OTP inputs", () => {
    const resEmpty = verifyOtp("01711223344", "");
    assert.equal(resEmpty.success, false);

    const resSpaces = verifyOtp("01711223344", "   ");
    assert.equal(resSpaces.success, false);
  });

  test("rejects wrong OTP code", () => {
    clearOtpStore();
    requestOtp("01711223344");

    const verified = verifyOtp("01711223344", "000000");
    assert.equal(verified.success, false);
    assert.ok(verified.error);
  });
});

// =========================================================================
// 3. Jose JWT Session Issuance & Verification
// =========================================================================
describe("Sprint 4: Jose Session Security & Cookies", () => {
  test("creates and verifies a signed JWT session token", async () => {
    const payload = {
      personId: "person-mock-1",
      mobile: "01711223344",
      name: "মুফতি আব্দুর রহমান",
      category: PersonCategory.IMAM,
    };

    const token = await createSessionToken(payload);
    assert.ok(token);
    assert.equal(typeof token, "string");

    const verified = await verifySessionToken(token);
    assert.ok(verified);
    assert.equal(verified?.personId, "person-mock-1");
    assert.equal(verified?.mobile, "01711223344");
    assert.equal(verified?.name, "মুফতি আব্দুর রহমান");
    assert.equal(verified?.category, PersonCategory.IMAM);
  });

  test("rejects tampered or malformed JWT token string", async () => {
    const verified = await verifySessionToken("malformed.jwt.token.xyz");
    assert.equal(verified, null);
  });

  test("cookie constant is named 'asf_session'", () => {
    assert.equal(SESSION_COOKIE_NAME, "asf_session");
  });
});

// =========================================================================
// 4. STRICT Security & Data Isolation
// =========================================================================
describe("Sprint 4: Trainee Security & Data Isolation", () => {
  test("sanitizeTraineeProfile strictly removes internalStars, redFlag, callLogs, and internal Sets", () => {
    const rawPersonData = {
      id: "person-123",
      name: "মাওলানা আব্দুল করিম",
      mobile: "01700000000",
      category: PersonCategory.IMAM,
      internalStars: 5,           // ADMIN ONLY
      redFlag: true,              // ADMIN ONLY
      callLogs: [{ id: "log-1" }], // ADMIN ONLY
      attendedClassIds: new Set(["cls-1"]),
      totalPoints: 120,
    };

    const sanitized = sanitizeTraineeProfile(rawPersonData);

    assert.equal("internalStars" in sanitized, false);
    assert.equal("redFlag" in sanitized, false);
    assert.equal("callLogs" in sanitized, false);
    assert.equal("attendedClassIds" in sanitized, false);
    assert.equal(sanitized.id, "person-123");
    assert.equal(sanitized.totalPoints, 120);
  });

  test("getTraineeFullProfile NEVER returns admin-only fields in the response", async () => {
    const profile = await getTraineeFullProfile("person-mock-1");
    assert.ok(profile);

    const raw = profile as unknown as Record<string, unknown>;
    assert.equal(raw.internalStars, undefined);
    assert.equal(raw.redFlag, undefined);
    assert.equal(raw.callLogs, undefined);
  });
});

// =========================================================================
// 5. Mobile-First Trainee Portal Dashboard (/portal)
// =========================================================================
describe("Sprint 4: Mobile-First Trainee Portal Dashboard Data", () => {
  test("retrieves unified profile across events with points and categories", async () => {
    const profile = await getTraineeFullProfile("person-mock-1");
    assert.ok(profile);
    assert.equal(profile?.name, "মুফতি আব্দুর রহমান");
    assert.equal(profile?.category, PersonCategory.IMAM);
    assert.equal(profile?.district, "কুড়িগ্রাম");
    assert.equal(profile?.mosqueName, "বায়তুল মামুর জামে মসজিদ");
    assert.ok(profile?.totalPoints >= 145);
    assert.ok(profile?.enrolledCourses.length > 0);
  });

  test("returns authentic course materials across syllabus, slides, books, and videos", async () => {
    const profile = await getTraineeFullProfile("person-mock-1");
    assert.ok(profile);
    assert.ok(profile?.materials.length >= 4);

    const kinds = new Set(profile?.materials.map(m => m.kind));
    assert.ok(kinds.has("SYLLABUS"), "Must contain syllabus");
    assert.ok(kinds.has("SLIDES"), "Must contain presentation slides");
    assert.ok(kinds.has("BOOK_PDF"), "Must contain reference book PDF");
    assert.ok(kinds.has("VIDEO_LECTURE"), "Must contain video lecture");
  });

  test("returns scheduled online classes with meeting platforms", async () => {
    const profile = await getTraineeFullProfile("person-mock-1");
    assert.ok(profile);
    assert.ok(profile?.onlineClasses.length >= 2);

    const zoomClass = profile?.onlineClasses.find(c => c.platform === "ZOOM");
    assert.ok(zoomClass);
    assert.ok(zoomClass?.meetingUrl.includes("zoom.us"));
  });

  test("records online class attendance and awards +20 points", async () => {
    const personId = "person-mock-2";
    const profileBefore = await getTraineeFullProfile(personId);
    const initialPoints = profileBefore?.totalPoints || 0;

    const attendResult = await recordOnlineClassAttendance(personId, "cls-1");
    assert.equal(attendResult.success, true);
    assert.equal(attendResult.pointsAwarded, 20);
    assert.equal(attendResult.newTotalPoints, initialPoints + 20);

    // Profile points updated
    const profileAfter = await getTraineeFullProfile(personId);
    assert.equal(profileAfter?.totalPoints, initialPoints + 20);

    // Calling attend again is idempotent and does not give duplicate points
    const secondAttend = await recordOnlineClassAttendance(personId, "cls-1");
    assert.equal(secondAttend.success, true);
    assert.equal(secondAttend.alreadyAttended, true);
    assert.equal(secondAttend.pointsAwarded, 0);
    assert.equal(secondAttend.newTotalPoints, initialPoints + 20);
  });
});

// =========================================================================
// 6. Digital Certification Engine (/portal/certificates & /verify-certificate)
// =========================================================================
describe("Sprint 4: Digital Certification Engine", () => {
  test("generates canonical certificate number matching 'CERT-ASF-YYYY-XXXX'", () => {
    const certNo = generateCertificateNumber(2026, 814);
    assert.equal(certNo, "CERT-ASF-2026-0814");
    assert.match(certNo, /^CERT-ASF-\d{4}-\d{4}$/);
  });

  test("constructs valid verification URL with encoded certNo", () => {
    const url = getCertificateVerificationUrl("CERT-ASF-2026-0814");
    assert.equal(url, "/verify-certificate?certNo=CERT-ASF-2026-0814");
  });

  test("retrieves authentic certificate with Shaykh Ahmadullah and Dr. Manzoor-e-Elahi signers", async () => {
    const cert = await getCertificateByNumber("CERT-ASF-2026-0814");
    assert.ok(cert);
    assert.equal(cert?.certificateNo, "CERT-ASF-2026-0814");
    assert.equal(cert?.recipientName, "মুফতি আব্দুর রহমান");
    assert.equal(cert?.signerName, "শায়খ আহমাদুল্লাহ");
    assert.equal(cert?.advisorName, "ড. মানজুরে ইলাহী");
    assert.equal(cert?.isValid, true);
  });

  test("case-insensitive certificate number lookup", async () => {
    const cert = await getCertificateByNumber("cert-asf-2026-0814");
    assert.ok(cert);
    assert.equal(cert?.certificateNo, "CERT-ASF-2026-0814");
  });

  test("public verification endpoint approves valid certificate", async () => {
    const result = await verifyCertificate("CERT-ASF-2026-0814");
    assert.equal(result.valid, true);
    assert.ok(result.certificate);
    assert.equal(result.certificate?.recipientName, "মুফতি আব্দুর রহমান");
  });

  test("public verification rejects forged or unknown certificate number", async () => {
    const result = await verifyCertificate("CERT-ASF-9999-FAKE");
    assert.equal(result.valid, false);
    assert.ok(result.error);
  });

  test("public verification approves certificate with Bengali numerals (CERT-ASF-২০২৬-০৮১৪)", async () => {
    const result = await verifyCertificate("CERT-ASF-২০২৬-০৮১৪");
    assert.equal(result.valid, true);
    assert.ok(result.certificate);
    assert.equal(result.certificate?.certificateNo, "CERT-ASF-2026-0814");
    assert.equal(result.certificate?.recipientName, "মুফতি আব্দুর রহমান");
  });

  test("automatically generates authentic verified certificate for completed training enrollment", async () => {
    const newPersonId = "person-test-auto-cert";
    const cert = await generateCertificateForEnrollment({
      personId: newPersonId,
      recipientName: "মাওলানা মোহাম্মদ আব্দুল্লাহ",
      recipientCategory: "ইমাম ও খতিব",
      recipientDistrict: "রংপুর",
      recipientInstitution: "নূর জামে মসজিদ",
      eventId: "evt-imam-batch-4",
      courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
      courseSlug: "imam-workshop-batch-4",
      completedAt: new Date("2026-07-15"),
    });

    assert.ok(cert.certificateNo.startsWith("CERT-ASF-2026-"));
    assert.equal(cert.recipientName, "মাওলানা মোহাম্মদ আব্দুল্লাহ");
    assert.equal(cert.isValid, true);

    // Verify it is publicly verifiable
    const verifyRes = await verifyCertificate(cert.certificateNo);
    assert.equal(verifyRes.valid, true);
    assert.equal(verifyRes.certificate?.recipientName, "মাওলানা মোহাম্মদ আব্দুল্লাহ");

    // Verify lookup with Bengali script
    const bnCertNo = cert.certificateNo.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
    const verifyBnRes = await verifyCertificate(bnCertNo);
    assert.equal(verifyBnRes.valid, true);
    assert.equal(verifyBnRes.certificate?.recipientName, "মাওলানা মোহাম্মদ আব্দুল্লাহ");
  });

  test("retrieves all certificates belonging to a specific trainee", async () => {
    const certs = await getCertificatesByPersonId("person-mock-1");
    assert.ok(certs.length >= 1);
    assert.equal(certs[0].certificateNo, "CERT-ASF-2026-0814");
  });
});

// =========================================================================
// 7. Central Messages Dictionary Completeness
// =========================================================================
describe("Sprint 4: Messages Dictionary Completeness", () => {
  test("contains all required Bengali strings for portal and authentication", () => {
    const p = messages.portal;
    assert.ok(p.title);
    assert.ok(p.loginTitle);
    assert.ok(p.mobileLabel);
    assert.ok(p.otpLabel);
    assert.ok(p.tabOverview);
    assert.ok(p.tabMaterials);
    assert.ok(p.tabOnlineClasses);
    assert.ok(p.tabCertificates);
    assert.ok(p.joinClassButton);
    assert.ok(p.pointsLabel);
  });

  test("contains all required Bengali strings for certificates and public verification", () => {
    const c = messages.certificates;
    assert.ok(c.pageTitle);
    assert.ok(c.signerOne);
    assert.ok(c.signerTwo);
    assert.ok(c.printButton);
    assert.ok(c.verifyPageTitle);
    assert.ok(c.verifiedTitle);
    assert.ok(c.invalidTitle);
    assert.ok(c.certifiedToText);
  });
});
