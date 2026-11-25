import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PersonCategory, ApplicationStatus } from "@prisma/client";
import {
  evaluateApplication,
  generateApplicationNumber,
  generateQrToken,
  PRIORITY_DISTRICTS,
} from "@/lib/screening";
import { generateQrCodeSvg, generateQrCodeDataUrl, buildPassVerificationUrl } from "@/lib/qr";
import {
  ApplicationSubmissionSchema,
  lookupPersonByMobile,
  createApplication,
  getApplicationByNumber,
  getApplicationByQrToken,
  checkInApplicant,
  listAdminApplications,
  updateApplicationStatus,
  bulkUpdateApplications,
  getSmsDispatchLogs,
  extractQrToken,
} from "@/lib/applications";
import { getEventBySlug } from "@/lib/events-data";

describe("Sprint 3: Smart Auto-Screening Engine (src/lib/screening.ts)", () => {
  it("generates application number matching 'ASF-YYYY-XXXXXX' format", () => {
    const appNum = generateApplicationNumber(2027);
    assert.match(appNum, /^ASF-2027-[2-9A-Z]{6}$/);
    const suffix = appNum.split("-")[2];
    assert.doesNotMatch(suffix, /[0O1I]/, "Suffix should not contain ambiguous characters 0, O, 1, I");
  });

  it("generates unique QR venue tokens with secure prefix", () => {
    const token1 = generateQrToken();
    const token2 = generateQrToken();
    assert.ok(token1.startsWith("asf_pass_"));
    assert.ok(token2.startsWith("asf_pass_"));
    assert.notEqual(token1, token2);
  });

  it("evaluates Imam candidate with Dawra-e-Hadith, 5+ yrs experience and remote district quota to SHORTLISTED", () => {
    const result = evaluateApplication(
      {
        category: PersonCategory.IMAM,
        district: "কুড়িগ্রাম",
        division: "রংপুর",
        answers: {
          qualification: "দাওরায়ে হাদিস",
          experienceYears: "৭ বছর",
          age: 35,
          motivation: "চর এলাকার মানুষকে দ্বীনি বিষয়ে সচেতন করা",
        },
      },
      {
        title: "ইমাম প্রশিক্ষণ কোর্স (ঢাকা)",
        type: "প্রশিক্ষণ",
        eligibility: [
          "ন্যূনতম ২ বছর যেকোনো জামে মসজিদে ইমামতি বা খতিব হিসেবে দায়িত্ব পালনের অভিজ্ঞতা।",
          "দাওরায়ে হাদিস বা সমমানের ইসলামী শিক্ষাগত যোগ্যতা।",
          "স্মার্টফোন ব্যবহারে প্রাথমিক দক্ষতা এবং প্ল্যাটফর্মের নিয়মিত ফলো-আপ কার্যক্রমে অংশগ্রহণের মানসিকতা।",
          "বয়সসীমা: ২৫ থেকে ৫০ বছর।"
        ],
      }
    );

    assert.equal(result.breakdown.categoryScore, 35, "Imam in Imam course should receive 35/35");
    assert.equal(result.breakdown.qualificationScore, 30, "Dawra-e-Hadith should receive 30/30");
    assert.equal(result.breakdown.experienceScore, 20, "5+ years experience should receive 20/20");
    assert.equal(result.breakdown.districtScore, 15, "Priority district Kurigram should receive 15/15");
    assert.equal(result.score, 100, "Total score should be 100");
    assert.equal(result.recommendation, "SHORTLISTED");
    assert.ok(result.reasons.length >= 5);
    assert.ok(result.reasons.some(r => r.includes("২৫-৫০")));
  });

  it("correctly evaluates candidates from non-Dhaka regular districts and mid experience to PENDING/SHORTLISTED", () => {
    const result = evaluateApplication(
      {
        category: PersonCategory.MADRASA_TEACHER,
        district: "বগুড়া",
        division: "রাজশাহী",
        answers: {
          qualification: "ফাজিল / স্নাতক",
          experienceYears: "৩ বছর",
        },
      },
      { title: "মাদরাসা পরিচালনা কর্মশালা" }
    );

    assert.equal(result.breakdown.categoryScore, 30);
    assert.equal(result.breakdown.qualificationScore, 25);
    assert.equal(result.breakdown.experienceScore, 15);
    assert.equal(result.breakdown.districtScore, 12, "Non-Dhaka regular district gets 12");
    assert.equal(result.score, 82);
    assert.equal(result.recommendation, "SHORTLISTED");
  });

  it("evaluates beginner candidates with minimal qualifications to WAITLIST", () => {
    const result = evaluateApplication(
      {
        category: PersonCategory.OTHER,
        district: "ঢাকা",
        division: "ঢাকা",
        answers: {
          qualification: "অন্যান্য",
          experienceYears: "১ বছরের কম",
        },
      },
      { title: "ইমাম প্রশিক্ষণ কোর্স" }
    );

    assert.ok(result.score < 50, `Score should be below 50, got ${result.score}`);
    assert.equal(result.recommendation, "WAITLIST");
  });

  it("includes remote and coastal priority districts in PRIORITY_DISTRICTS set", () => {
    assert.ok(PRIORITY_DISTRICTS.has("কুড়িগ্রাম"));
    assert.ok(PRIORITY_DISTRICTS.has("সুনামগঞ্জ"));
    assert.ok(PRIORITY_DISTRICTS.has("বান্দরবান"));
    assert.ok(PRIORITY_DISTRICTS.has("সাতক্ষীরা"));
    assert.ok(PRIORITY_DISTRICTS.has("পটুয়াখালী"));
  });
});

describe("Sprint 3: Digital Venue Pass & QR Engine (src/lib/qr.ts)", () => {
  it("generates high-contrast valid SVG QR code markup", async () => {
    const token = "asf_pass_test_token_12345";
    const verificationUrl = buildPassVerificationUrl(token, "https://assunnah.foundation");

    const svg = await generateQrCodeSvg(verificationUrl);
    assert.ok(svg.includes("<svg"), "Should output valid SVG tag");
    assert.ok(svg.includes("</svg>"), "Should close SVG tag");
    assert.ok(svg.includes('viewBox="0 0'), "SVG should contain viewBox");
  });

  it("generates base64 data URL for canvas/image display", async () => {
    const dataUrl = await generateQrCodeDataUrl("asf_pass_mock_test");
    assert.ok(dataUrl.startsWith("data:image/png;base64,"));
  });

  it("constructs canonical checkin verification URL with encoded token", () => {
    const url = buildPassVerificationUrl("asf_pass_demo_1", "https://events.assunnah.foundation");
    assert.equal(url, "https://events.assunnah.foundation/checkin?token=asf_pass_demo_1");
  });
});

describe("Sprint 3: Application Zod Validation & Phone Normalization", () => {
  it("validates application payload with Bengali phone number and normalizes to 11 digits", () => {
    const rawInput = {
      eventSlug: "imam-training-dhaka-2027",
      name: "মুহাম্মদ আব্দুল্লাহ",
      mobile: "০১৭১১২২৩৩৪৪", // Bengali digits
      category: PersonCategory.IMAM,
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "সাভার",
      unionName: "বিরুলিয়া",
      mosqueName: "বায়তুস সুন্নাহ জামে মসজিদ",
      answers: {
        qualification: "দাওরায়ে হাদিস",
        experienceYears: "৪ বছর",
        motivation: "সমাজে সংস্কারমূলক কাজ",
        hasSmartphone: true,
      },
    };

    const validated = ApplicationSubmissionSchema.parse(rawInput);
    assert.equal(validated.mobile, "01711223344", "Should normalize Bengali numerals to ASCII digits");
    assert.equal(validated.name, "মুহাম্মদ আব্দুল্লাহ");
    assert.equal(validated.category, PersonCategory.IMAM);
  });

  it("accepts phone numbers with +88 prefix and spaces/dashes", () => {
    const rawInput = {
      eventSlug: "imam-training-dhaka-2027",
      name: "কারী আব্দুর রহমান",
      mobile: "+88 018-22334455",
      category: PersonCategory.MADRASA_TEACHER,
      division: "চট্টগ্রাম",
      district: "কক্সবাজার",
      mosqueName: "দারুল কুরআন মাদরাসা",
      answers: {
        qualification: "কামিল",
      },
    };

    const validated = ApplicationSubmissionSchema.parse(rawInput);
    assert.equal(validated.mobile, "01822334455");
  });

  it("normalizes phone numbers formatted with Bengali prefix '+৮৮' and spaces", () => {
    const rawInput = {
      eventSlug: "imam-training-dhaka-2027",
      name: "মুফতি তারেক",
      mobile: "+৮৮ ০১৭০০ ০০০০০০",
      category: PersonCategory.IMAM,
      division: "ঢাকা",
      district: "ঢাকা",
      mosqueName: "কেন্দ্রীয় মসজিদ",
      answers: {
        qualification: "দাওরায়ে হাদিস",
        age: "৩৫",
      },
    };

    const validated = ApplicationSubmissionSchema.parse(rawInput);
    assert.equal(validated.mobile, "01700000000");
    assert.equal(validated.answers.age, "৩৫");
  });

  it("rejects invalid phone numbers", () => {
    const invalidInput = {
      eventSlug: "imam-training-dhaka-2027",
      name: "আহমদ উল্লাহ",
      mobile: "012345678", // too short, invalid operator
      category: PersonCategory.IMAM,
      division: "ঢাকা",
      district: "ঢাকা",
      mosqueName: "মসজিদ",
      answers: { qualification: "দাওরায়ে হাদিস" },
    };

    assert.throws(() => ApplicationSubmissionSchema.parse(invalidInput));
  });
});

describe("Sprint 3: 1-Click Demographic Pre-fill & Security Isolation", () => {
  it("looks up previous applicant demographic details accurately", async () => {
    // 01711223344 is in seeded demo data
    const res = await lookupPersonByMobile("01711223344");
    assert.equal(res.found, true);
    assert.ok(res.person);
    assert.equal(res.person.name, "মুফতি আব্দুর রহমান");
    assert.equal(res.person.category, PersonCategory.IMAM);
    assert.equal(res.person.district, "কুড়িগ্রাম");
  });

  it("works with Bengali numerals during mobile lookup", async () => {
    const res = await lookupPersonByMobile("০১৭১১২২৩৩৪৪");
    assert.equal(res.found, true);
    assert.equal(res.person?.name, "মুফতি আব্দুর রহমান");
  });

  it("STRICT SECURITY: never leaks internalStars, redFlag, or callLogs in demographic prefill response", async () => {
    const res = await lookupPersonByMobile("01711223344");
    assert.equal(res.found, true);
    const personObj = res.person as unknown as Record<string, unknown>;
    assert.equal(personObj.internalStars, undefined, "internalStars must NEVER be exposed to public");
    assert.equal(personObj.redFlag, undefined, "redFlag must NEVER be exposed to public");
    assert.equal(personObj.callLogs, undefined, "callLogs must NEVER be exposed to public");
  });
});

describe("Sprint 3: Application Creation, Querying & Simulated SMS Dispatch", () => {
  it("creates application, calculates auto-screen score, generates pass and logs SMS", async () => {
    const uniqueMobile = `017${Math.floor(10000000 + Math.random() * 90000000)}`;

    const result = await createApplication({
      eventSlug: "imam-training-dhaka-2027",
      name: "মাওলানা সাইদুর রহমান",
      mobile: uniqueMobile,
      category: PersonCategory.IMAM,
      division: "সিলেট",
      district: "সুনামগঞ্জ",
      upazila: "ছাতক",
      unionName: "কালারুকা",
      mosqueName: "ছাতক বাজার জামে মসজিদ",
      answers: {
        qualification: "দাওরায়ে হাদিস",
        experienceYears: "৬ বছর",
        motivation: "দ্বীনি শিক্ষার প্রসার",
        hasSmartphone: true,
      },
    });

    assert.equal(result.success, true);
    assert.ok(result.application.number.startsWith("ASF-2027-"));
    assert.ok(result.application.qrToken.startsWith("asf_pass_"));
    assert.equal(result.application.autoScreenResult.score, 100);
    assert.equal(result.application.status, ApplicationStatus.SHORTLISTED);

    // Verify application retrieval by human-readable number
    const fetchedByNum = await getApplicationByNumber(result.application.number);
    assert.ok(fetchedByNum);
    assert.equal(fetchedByNum.applicant.name, "মাওলানা সাইদুর রহমান");

    // Verify application retrieval by QR Token
    const fetchedByToken = await getApplicationByQrToken(result.application.qrToken);
    assert.ok(fetchedByToken);
    assert.equal(fetchedByToken.number, result.application.number);

    // Verify SMS logs include the new dispatch
    const smsLogs = getSmsDispatchLogs();
    const foundSms = smsLogs.find(s => s.recipientMobile === uniqueMobile);
    assert.ok(foundSms, "SMS dispatch must be logged for applicant");
    assert.ok(foundSms.body.includes(result.application.number));
    assert.ok(foundSms.body.includes(result.application.qrToken));
  });
});

describe("Sprint 3: Auditorium Check-in & Gatekeeper Verification", () => {
  it("approves entry for valid pass and locks checkedInAt timestamp", async () => {
    // Create an applicant first
    const uniqueMobile = `018${Math.floor(10000000 + Math.random() * 90000000)}`;
    const created = await createApplication({
      eventSlug: "imam-training-dhaka-2027",
      name: "মাওলানা আব্দুল বাতেন",
      mobile: uniqueMobile,
      category: PersonCategory.IMAM,
      division: "চট্টগ্রাম",
      district: "কুমিল্লা",
      mosqueName: "কুমিল্লা কেন্দ্রীয় জামে মসজিদ",
      answers: { qualification: "কামিল" },
    });

    const qrToken = created.application.qrToken;

    // First scan: should be APPROVED
    const checkin1 = await checkInApplicant(qrToken);
    assert.equal(checkin1.success, true);
    assert.equal(checkin1.status, "APPROVED");
    assert.ok(checkin1.checkedInAt, "Timestamp must be saved");

    // Re-scan: DUPLICATE ENTRY PROTECTION!
    const checkin2 = await checkInApplicant(qrToken);
    assert.equal(checkin2.success, false);
    assert.equal(checkin2.status, "ALREADY_CHECKED_IN");
    assert.equal(checkin2.firstCheckedInAt, checkin1.checkedInAt);
  });

  it("rejects check-in for invalid or forged QR token", async () => {
    const invalidCheckin = await checkInApplicant("forged_fake_token_9999");
    assert.equal(invalidCheckin.success, false);
    assert.equal(invalidCheckin.status, "INVALID_TOKEN");
  });
});

describe("Sprint 3: Admin Application Management & Bulk Status Updates", () => {
  it("filters applications by minimum auto-screen score and status", async () => {
    const all = await listAdminApplications();
    assert.ok(all.length >= 6, "Should contain seeded applications");

    const highScorers = await listAdminApplications({ minScore: 70 });
    highScorers.forEach(app => {
      assert.ok((app.autoScreenResult?.score ?? 0) >= 70);
    });

    const shortlisted = await listAdminApplications({ status: ApplicationStatus.SHORTLISTED });
    shortlisted.forEach(app => {
      assert.equal(app.status, ApplicationStatus.SHORTLISTED);
    });
  });

  it("searches applications by applicant name or mobile", async () => {
    const searchedByName = await listAdminApplications({ query: "রহমান" });
    assert.ok(searchedByName.length > 0);
    assert.ok(searchedByName.some(a => a.applicant.name.includes("রহমান")));

    const searchedByMobile = await listAdminApplications({ query: "01711223344" });
    assert.ok(searchedByMobile.length > 0);
    assert.equal(searchedByMobile[0].applicant.mobile, "01711223344");
  });

  it("bulk updates applicant statuses and dispatches selection SMS", async () => {
    const apps = await listAdminApplications();
    const targetIds = [apps[0].id, apps[1].id];

    const bulkResult = await bulkUpdateApplications(targetIds, ApplicationStatus.SELECTED);
    assert.equal(bulkResult.updatedCount, 2);
    assert.equal(bulkResult.smsSentCount, 2);

    // Verify updated status
    const refreshed = await listAdminApplications();
    const app0 = refreshed.find(a => a.id === targetIds[0]);
    const app1 = refreshed.find(a => a.id === targetIds[1]);
    assert.equal(app0?.status, ApplicationStatus.SELECTED);
    assert.equal(app1?.status, ApplicationStatus.SELECTED);
  });

  it("STRICT DEDUPLICATION: status update never creates duplicate SMS dispatch logs for the same selection", async () => {
    // Pick an application that is not yet SELECTED
    const apps = await listAdminApplications();
    const pendingApp = apps.find(a => a.status !== ApplicationStatus.SELECTED);
    assert.ok(pendingApp, "Should have a non-selected application");

    const logsBefore = getSmsDispatchLogs().filter(l => l.recipientMobile === pendingApp.applicant.mobile).length;

    // Update to SELECTED
    await updateApplicationStatus(pendingApp.id, ApplicationStatus.SELECTED);

    const logsAfter = getSmsDispatchLogs().filter(l => l.recipientMobile === pendingApp.applicant.mobile).length;
    assert.equal(logsAfter - logsBefore, 1, "Must append exactly 1 SMS dispatch log, never 2");
  });

  it("filters applications strictly by eventSlug in in-memory fallback", async () => {
    const existingSlug = "imam-training-dhaka-2027";
    const matching = await listAdminApplications({ eventSlug: existingSlug });
    assert.ok(matching.length > 0);
    matching.forEach(a => assert.equal(a.eventSlug, existingSlug));

    const nonExistent = await listAdminApplications({ eventSlug: "non-existent-random-event" });
    assert.equal(nonExistent.length, 0, "Non-existent eventSlug must return 0 records");
  });
});

describe("Sprint 3: Scanner Hardware Compatibility & Token Extraction (extractQrToken)", () => {
  it("extracts clean token from plain token string", () => {
    assert.equal(extractQrToken("asf_pass_mock_1_3344"), "asf_pass_mock_1_3344");
  });

  it("extracts token from canonical full URL typed by 2D barcode scanner gun", () => {
    const fullUrl = "https://assunnah.foundation/checkin?token=asf_pass_mock_1_3344";
    assert.equal(extractQrToken(fullUrl), "asf_pass_mock_1_3344");
  });

  it("extracts token from relative URL or query string", () => {
    assert.equal(extractQrToken("/checkin?token=asf_pass_xyz_9988"), "asf_pass_xyz_9988");
  });

  it("allows hardware barcode scanner gun URL to successfully check in applicant", async () => {
    // Create new applicant
    const uniqueMobile = `019${Math.floor(10000000 + Math.random() * 90000000)}`;
    const created = await createApplication({
      eventSlug: "imam-training-dhaka-2027",
      name: "হাফেজ মোস্তফা কামাল",
      mobile: uniqueMobile,
      category: PersonCategory.IMAM,
      division: "ঢাকা",
      district: "গাজীপুর",
      mosqueName: "টঙ্গী কেন্দ্রীয় জামে মসজিদ",
      answers: { qualification: "দাওরায়ে হাদিস" },
    });

    const fullScannerGunUrl = `https://assunnah.foundation/checkin?token=${created.application.qrToken}`;

    // Scan with full URL as typed by barcode scanner gun
    const checkin = await checkInApplicant(fullScannerGunUrl);
    assert.equal(checkin.success, true);
    assert.equal(checkin.status, "APPROVED");
    assert.equal(checkin.application?.applicant.name, "হাফেজ মোস্তফা কামাল");
  });
});

describe("Sprint 3: Dynamic FormSchema Rendering Support", () => {
  it("loads event with structured formSchema", async () => {
    const event = await getEventBySlug("imam-training-dhaka-2027");
    assert.ok(event);
    assert.ok(Array.isArray(event.formSchema), "Event must have structured formSchema array");
    assert.ok(event.formSchema.length >= 4);

    const qualField = event.formSchema.find(f => f.id === "qualification");
    assert.ok(qualField);
    assert.equal(qualField.type, "select");
    assert.ok(qualField.options && qualField.options.length >= 4);

    const expField = event.formSchema.find(f => f.id === "experienceYears");
    assert.ok(expField);
    assert.equal(expField.type, "select");

    const ageField = event.formSchema.find(f => f.id === "age");
    assert.ok(ageField);
    assert.equal(ageField.type, "number");
  });
});
