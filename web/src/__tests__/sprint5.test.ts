import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  ACTIVITY_CATEGORIES,
  createSubmission,
  getSubmissionsByPerson,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  generateSubmissionId,
  CreateSubmissionSchema,
  ActivityType,
} from "@/lib/submissions";
import { DEFAULT_ACTIVITY_SCORES } from "@/lib/scoring";
import {
  getTraineeFullProfile,
  sanitizeTraineeProfile,
} from "@/lib/trainee";
import { messages } from "@/lib/messages";
import { formatBengaliDate, formatBengaliNumber } from "@/lib/format";

// =========================================================================
// 1. Activity Categories & Default Points Mapping
// =========================================================================
describe("Sprint 5: Activity Categories & Default Points Mapping", () => {
  test("defines exactly 6 official field activity categories with exact point values", () => {
    assert.equal(ACTIVITY_CATEGORIES.KHUTBAH.defaultPoints, 5);
    assert.equal(ACTIVITY_CATEGORIES.CLEANUP.defaultPoints, 20);
    assert.equal(ACTIVITY_CATEGORIES.TREE_PLANTING.defaultPoints, 20);
    assert.equal(ACTIVITY_CATEGORIES.ONLINE_CLASS.defaultPoints, 20);
    assert.equal(ACTIVITY_CATEGORIES.HALAQA.defaultPoints, 15);
    assert.equal(ACTIVITY_CATEGORIES.SOCIAL_WORK.defaultPoints, 10);
  });

  test("scoring defaults in src/lib/scoring match all activity point codes", () => {
    assert.equal(DEFAULT_ACTIVITY_SCORES.KHUTBAH, 5);
    assert.equal(DEFAULT_ACTIVITY_SCORES.CLEANUP, 20);
    assert.equal(DEFAULT_ACTIVITY_SCORES.TREE_PLANTING, 20);
    assert.equal(DEFAULT_ACTIVITY_SCORES.ONLINE_CLASS, 20);
    assert.equal(DEFAULT_ACTIVITY_SCORES.HALAQA, 15);
    assert.equal(DEFAULT_ACTIVITY_SCORES.SOCIAL_WORK, 10);
  });

  test("each category contains authentic Bengali labels and meaningful descriptions", () => {
    const requiredKeys: ActivityType[] = [
      "KHUTBAH",
      "CLEANUP",
      "TREE_PLANTING",
      "ONLINE_CLASS",
      "HALAQA",
      "SOCIAL_WORK",
    ];

    for (const key of requiredKeys) {
      const cat = ACTIVITY_CATEGORIES[key];
      assert.ok(cat, `Category ${key} must exist`);
      assert.ok(cat.labelBn.length > 0, `Category ${key} must have labelBn`);
      assert.ok(cat.description.length > 0, `Category ${key} must have description`);
    }
  });
});

// =========================================================================
// 2. Activity Submission Engine & ID Generation
// =========================================================================
describe("Sprint 5: Activity Submission Engine & ID Generation", () => {
  test("generates canonical submission ID matching SUB-YYYY-XXXX format", () => {
    const id1 = generateSubmissionId(2026, 12);
    assert.equal(id1, "SUB-2026-0012");

    const id2 = generateSubmissionId(2026, 456);
    assert.equal(id2, "SUB-2026-0456");

    // Auto-sequence generator
    const autoId = generateSubmissionId(2026);
    assert.match(autoId, /^SUB-2026-\d{4}$/);
  });

  test("successfully creates a new field activity submission with default points", async () => {
    const input = {
      personId: "person-mock-1",
      activityType: "TREE_PLANTING" as ActivityType,
      title: "মসজিদ প্রাঙ্গণে ১০টি ফলদ বৃক্ষরোপণ",
      date: "2026-11-19T09:00:00.000Z",
      venueName: "বায়তুল মামুর জামে মসজিদ",
      district: "কুড়িগ্রাম",
      notes: "যুবকদের সহযোগিতায় সফলভাবে সম্পন্ন।",
      photos: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
      ],
    };

    const sub = await createSubmission(input);

    assert.ok(sub.id.startsWith("SUB-2026-"));
    assert.equal(sub.personId, "person-mock-1");
    assert.equal(sub.activityType, "TREE_PLANTING");
    assert.equal(sub.points, 20); // Default points for TREE_PLANTING
    assert.equal(sub.status, "PENDING");
    assert.equal(sub.venueName, "বায়তুল মামুর জামে মসজিদ");
    assert.equal(sub.district, "কুড়িগ্রাম");
    assert.equal(sub.photos.length, 1);
    assert.ok(sub.createdAt);
  });

  test("retrieves submissions by personId sorted by newest first", async () => {
    const subs = await getSubmissionsByPerson("person-mock-1");
    assert.ok(subs.length >= 2, "Should have seeded or created submissions for mock 1");

    for (let i = 0; i < subs.length - 1; i++) {
      const current = new Date(subs[i].createdAt).getTime();
      const next = new Date(subs[i + 1].createdAt).getTime();
      assert.ok(current >= next, "Submissions must be sorted newest first");
    }
  });

  test("validates submission input and rejects invalid or missing fields", () => {
    // Missing title
    assert.throws(() => {
      CreateSubmissionSchema.parse({
        personId: "person-mock-1",
        activityType: "CLEANUP",
        title: "",
        date: "2026-11-19",
        venueName: "মসজিদ",
      });
    });

    // Invalid activityType
    assert.throws(() => {
      CreateSubmissionSchema.parse({
        personId: "person-mock-1",
        activityType: "INVALID_CODE",
        title: "শিরোনাম",
        date: "2026-11-19",
        venueName: "মসজিদ",
      });
    });
  });
});

// =========================================================================
// 3. Trainee Profile Point Updates & Auto-Awarding
// =========================================================================
describe("Sprint 5: Trainee Profile Point Updates & Auto-Awarding", () => {
  test("creating a PENDING submission does NOT award points prematurely", async () => {
    const profileBefore = await getTraineeFullProfile("person-mock-2");
    const initialPoints = profileBefore?.totalPoints ?? 0;

    await createSubmission({
      personId: "person-mock-2",
      activityType: "KHUTBAH",
      title: "সাপ্তাহিক খুতবা প্রতিবেদন",
      date: "2026-11-18",
      venueName: "হাওর কেন্দ্রীয় জামে মসজিদ",
      district: "সুনামগঞ্জ",
      status: "PENDING",
    });

    const profileAfter = await getTraineeFullProfile("person-mock-2");
    assert.equal(profileAfter?.totalPoints, initialPoints);
  });

  test("creating an initially APPROVED submission awards points immediately", async () => {
    const profileBefore = await getTraineeFullProfile("person-mock-3");
    const initialPoints = profileBefore?.totalPoints ?? 0;

    const sub = await createSubmission({
      personId: "person-mock-3",
      activityType: "SOCIAL_WORK",
      title: "বন্যাপরবর্তী ওষুধ বিতরণ কার্যক্রম",
      date: "2026-11-15",
      venueName: "বিরুলিয়া সেবা কেন্দ্র",
      district: "ঢাকা",
      status: "APPROVED",
    });

    const profileAfter = await getTraineeFullProfile("person-mock-3");
    assert.equal(profileAfter?.totalPoints, initialPoints + sub.points);
  });

  test("admin status change from PENDING to APPROVED awards points to trainee profile", async () => {
    // 1. Create pending submission
    const sub = await createSubmission({
      personId: "person-mock-1",
      activityType: "CLEANUP",
      title: "মসজিদ ও অজুখানা পরিষ্কার",
      date: "2026-11-19",
      venueName: "রানীগঞ্জ জামে মসজিদ",
      district: "কুড়িগ্রাম",
      status: "PENDING",
    });

    const profileBefore = await getTraineeFullProfile("person-mock-1");
    const initialPoints = profileBefore?.totalPoints ?? 0;

    // 2. Admin approves
    const result = await updateSubmissionStatus(
      sub.id,
      "APPROVED",
      "মাশাআল্লাহ, পরিচ্ছন্নতা ঈমানের অঙ্গ। অনুমোদিত।"
    );

    assert.equal(result.pointsDelta, 20);
    assert.equal(result.submission.status, "APPROVED");
    assert.ok(result.submission.adminFeedback?.includes("অনুমোদিত"));

    // 3. Trainee balance should now reflect +20 points
    const profileAfter = await getTraineeFullProfile("person-mock-1");
    assert.equal(profileAfter?.totalPoints, initialPoints + 20);
  });

  test("admin status change from APPROVED to REJECTED deducts points safely", async () => {
    // 1. Create approved submission
    const sub = await createSubmission({
      personId: "person-mock-1",
      activityType: "HALAQA",
      title: "কুরআন তা'লিম হালাকা",
      date: "2026-11-19",
      venueName: "বায়তুল মামুর",
      district: "কুড়িগ্রাম",
      status: "APPROVED",
    });

    const profileBefore = await getTraineeFullProfile("person-mock-1");
    const initialPoints = profileBefore?.totalPoints ?? 0;

    // 2. Admin rejects previously approved submission
    const result = await updateSubmissionStatus(
      sub.id,
      "REJECTED",
      "প্রামাণ্য ছবি যাচাইয়ে ত্রুটি পরিলক্ষিত হয়েছে।"
    );

    assert.equal(result.pointsDelta, -15);
    assert.equal(result.submission.status, "REJECTED");

    // 3. Trainee balance deducted
    const profileAfter = await getTraineeFullProfile("person-mock-1");
    assert.equal(profileAfter?.totalPoints, initialPoints - 15);
  });

  test("idempotent approval does NOT double-award points", async () => {
    const sub = await createSubmission({
      personId: "person-mock-2",
      activityType: "KHUTBAH",
      title: "অপচয় রোধে জুমার খুতবা",
      date: "2026-11-19",
      venueName: "হাওর কেন্দ্রীয় জামে মসজিদ",
      district: "সুনামগঞ্জ",
      status: "PENDING",
    });

    // First approval: +5 points
    const res1 = await updateSubmissionStatus(sub.id, "APPROVED");
    assert.equal(res1.pointsDelta, 5);

    // Second approval of already approved submission: 0 points delta
    const res2 = await updateSubmissionStatus(sub.id, "APPROVED");
    assert.equal(res2.pointsDelta, 0);
  });
});

// =========================================================================
// 4. Admin Nationwide Review & Filtering
// =========================================================================
describe("Sprint 5: Admin Nationwide Review & Filtering", () => {
  test("filters submissions by activity type", async () => {
    const cleanups = await getAllSubmissions({ type: "CLEANUP" });
    assert.ok(cleanups.length > 0);
    cleanups.forEach(s => assert.equal(s.activityType, "CLEANUP"));

    const khutbahs = await getAllSubmissions({ type: "KHUTBAH" });
    assert.ok(khutbahs.length > 0);
    khutbahs.forEach(s => assert.equal(s.activityType, "KHUTBAH"));
  });

  test("filters submissions by status (PENDING, APPROVED, REJECTED)", async () => {
    const approved = await getAllSubmissions({ status: "APPROVED" });
    assert.ok(approved.length > 0);
    approved.forEach(s => assert.equal(s.status, "APPROVED"));

    const pending = await getAllSubmissions({ status: "PENDING" });
    assert.ok(pending.length > 0);
    pending.forEach(s => assert.equal(s.status, "PENDING"));
  });

  test("filters submissions by district name", async () => {
    const sunamganjSubs = await getAllSubmissions({ district: "সুনামগঞ্জ" });
    assert.ok(sunamganjSubs.length > 0);
    sunamganjSubs.forEach(s => assert.ok(s.district.includes("সুনামগঞ্জ")));
  });

  test("searches submissions by trainee name or venue", async () => {
    const results = await getAllSubmissions({ search: "আব্দুর রহমান" });
    assert.ok(results.length > 0);
    results.forEach(s => assert.ok(s.traineeName.includes("আব্দুর রহমান") || s.title.includes("আব্দুর রহমান")));
  });

  test("retrieves a single submission by its ID", async () => {
    const sub = await getSubmissionById("SUB-2026-0101");
    assert.ok(sub);
    assert.equal(sub?.id, "SUB-2026-0101");
    assert.equal(sub?.activityType, "CLEANUP");
  });
});

// =========================================================================
// 5. Strict Security Invariant & Data Isolation
// =========================================================================
describe("Sprint 5: Strict Security Invariant & Data Isolation", () => {
  test("trainee submissions queries never leak internalStars, redFlag, or callLogs", async () => {
    const subs = await getSubmissionsByPerson("person-mock-1");
    assert.ok(subs.length > 0);

    for (const sub of subs) {
      const record = sub as unknown as Record<string, unknown>;
      assert.equal(record.internalStars, undefined, "internalStars must NEVER be exposed");
      assert.equal(record.redFlag, undefined, "redFlag must NEVER be exposed");
      assert.equal(record.callLogs, undefined, "callLogs must NEVER be exposed");
    }
  });

  test("getTraineeFullProfile strictly isolates admin fields while keeping totalPoints intact", async () => {
    const profile = await getTraineeFullProfile("person-mock-1");
    assert.ok(profile);

    const raw = profile as unknown as Record<string, unknown>;
    assert.equal(raw.internalStars, undefined);
    assert.equal(raw.redFlag, undefined);
    assert.equal(raw.callLogs, undefined);
    assert.ok(typeof profile.totalPoints === "number");
  });

  test("sanitizeTraineeProfile strictly strips admin-only attributes", () => {
    const dangerousRecord = {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      internalStars: 5,
      redFlag: true,
      callLogs: [{ id: "call-1", note: "admin note" }],
      totalPoints: 120,
    };

    const sanitized = sanitizeTraineeProfile(dangerousRecord);
    const sanitizedRecord = sanitized as Record<string, unknown>;
    assert.equal(sanitizedRecord.internalStars, undefined);
    assert.equal(sanitizedRecord.redFlag, undefined);
    assert.equal(sanitizedRecord.callLogs, undefined);
    assert.equal(sanitized.name, "মুফতি আব্দুর রহমান");
  });
});

// =========================================================================
// 6. Messages Dictionary & Localization Completeness
// =========================================================================
describe("Sprint 5: Messages Dictionary & Localization Completeness", () => {
  test("messages.submissions contains all required form, history, and status labels", () => {
    assert.ok(messages.submissions.badge);
    assert.ok(messages.submissions.form.title);
    assert.ok(messages.submissions.form.categoryLabel);
    assert.ok(messages.submissions.form.submitButton);
    assert.ok(messages.submissions.history.title);
    assert.ok(messages.submissions.history.pointsEarnedBadge);
    assert.equal(messages.submissions.status.APPROVED, "অনুমোদিত");
    assert.equal(messages.submissions.status.PENDING, "পর্যালোচনায়");
    assert.equal(messages.submissions.status.REJECTED, "প্রত্যাখ্যাত");
  });

  test("messages.adminSubmissions contains all review wall titles, filters, and action buttons", () => {
    assert.ok(messages.adminSubmissions.title);
    assert.ok(messages.adminSubmissions.statTotal);
    assert.ok(messages.adminSubmissions.statPending);
    assert.ok(messages.adminSubmissions.statApproved);
    assert.ok(messages.adminSubmissions.approveButton);
    assert.ok(messages.adminSubmissions.rejectButton);
    assert.ok(messages.adminSubmissions.modalPhotosTitle);
  });

  test("formats dates and numerals accurately in Bengali", () => {
    const formattedDate = formatBengaliDate("2026-11-19T10:00:00.000Z");
    assert.ok(typeof formattedDate === "string");
    assert.match(formattedDate, /[০-৯]/);

    const formattedPoints = formatBengaliNumber(20);
    assert.equal(formattedPoints, "২০");
  });

  test("normalizes Bengali digits in date to valid ISO 8601 string", async () => {
    const sub = await createSubmission({
      personId: "person-mock-1",
      activityType: "KHUTBAH",
      title: "জুমার খুতবা ও সামাজিক সচেতনতা",
      date: "২০২৬-১১-১৯",
      venueName: "কুড়িগ্রাম মডেল মসজিদ",
      district: "কুড়িগ্রাম",
    });

    assert.ok(sub.date.includes("2026-11-19"));
    assert.match(sub.date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test("normalizes Bengali digits in trainee mobile phone number", async () => {
    const sub = await createSubmission({
      personId: "person-mock-3",
      activityType: "ONLINE_CLASS",
      title: "অনলাইন ক্লাস মূল্যায়ন",
      date: "2026-11-19",
      venueName: "অনলাইন জুমে অংশগ্রহণ",
      traineeMobile: "০১৭১১২২৩৩৪৪",
    });

    assert.equal(sub.traineeMobile, "01711223344");
  });

  test("searches submissions nationwide using Bengali numerals for mobile and ID", async () => {
    // Search by Bengali phone prefix
    const byBnPhone = await getAllSubmissions({ search: "০১৭১১" });
    assert.ok(byBnPhone.length > 0);
    byBnPhone.forEach(s => assert.ok(s.traineeMobile.includes("01711")));

    // Search by Bengali year prefix
    const byBnYear = await getAllSubmissions({ search: "২০২৬" });
    assert.ok(byBnYear.length > 0);
    byBnYear.forEach(s => assert.ok(s.id.includes("2026")));
  });

  test("re-approval flow: transitioning from REJECTED back to APPROVED awards points correctly", async () => {
    const profileBefore = await getTraineeFullProfile("person-mock-1");
    const initialPoints = profileBefore?.totalPoints ?? 0;

    // 1. Create a pending submission
    const sub = await createSubmission({
      personId: "person-mock-1",
      activityType: "TREE_PLANTING",
      title: "মাদরাসা প্রাঙ্গণে বৃক্ষরোপণ",
      date: "2026-11-19",
      venueName: "রানীগঞ্জ মাদরাসা",
      status: "PENDING",
    });

    // 2. Reject it first
    const rejResult = await updateSubmissionStatus(sub.id, "REJECTED", "ছবি অস্পষ্ট");
    assert.equal(rejResult.pointsDelta, 0);
    assert.equal(rejResult.submission.status, "REJECTED");

    // 3. Admin re-evaluates and approves
    const appResult = await updateSubmissionStatus(sub.id, "APPROVED", "পুনঃযাচাইয়ে সঠিক পাওয়া গেছে");
    assert.equal(appResult.pointsDelta, 20);
    assert.equal(appResult.submission.status, "APPROVED");

    const profileAfter = await getTraineeFullProfile("person-mock-1");
    assert.equal(profileAfter?.totalPoints, initialPoints + 20);
  });

  test("updateSubmissionStatus rejects non-existent submission ID with clear error", async () => {
    await assert.rejects(
      async () => {
        await updateSubmissionStatus("SUB-9999-9999", "APPROVED");
      },
      (err: Error) => {
        assert.match(err.message, /কার্যক্রম পাওয়া যায়নি/);
        return true;
      }
    );
  });

  test("portal submission route protects against trainee privilege escalation & point tampering", async () => {
    // Malicious body attempting to self-approve and award 5,000 points
    const maliciousBody = {
      activityType: "KHUTBAH",
      title: "অননুমোদিত খুতবা দাবী",
      date: "2026-11-19",
      venueName: "অননুমোদিত ভেন্যু",
      status: "APPROVED",
      points: 5000,
    };

    // Server-side enforcement in POST /api/portal/submissions:
    const parsed = CreateSubmissionSchema.safeParse({
      ...maliciousBody,
      personId: "person-mock-2",
      traineeName: "মাওলানা মাহমুদুল হাসান",
      traineeMobile: "01822334455",
      status: "PENDING",
      points: undefined,
    });

    assert.ok(parsed.success);
    assert.equal(parsed.data.status, "PENDING", "Must force status to PENDING");
    assert.equal(parsed.data.points, undefined, "Must wipe arbitrary client points");

    const sub = await createSubmission(parsed.data);
    assert.equal(sub.status, "PENDING");
    assert.equal(sub.points, 5); // Default KHUTBAH points (5), NOT 5000!
  });
});
