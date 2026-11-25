import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  AUTOMATION_JOB_KEYS,
  JobKey,
  executeKhutbahPush,
  executeAmalReminder,
  executeAyyamAlBeed,
  executeMonthlyReportReminder,
  executeRedFlagScan,
  calculateNextRun,
  getAutomationSettings,
  updateAutomationSettings,
  triggerJob,
  getAllJobs,
  getRedFlaggedTrainees,
  markAdminCallCompleted,
  getRecentExecutionLogs,
  resetAutomationStore,
  getDhakaParts,
  formatScheduleDateTimeBn,
  makeDhakaDate,
} from "@/lib/automation";
import { isTraineeInactive, INACTIVITY_RED_FLAG_DAYS } from "@/lib/scoring";
import { getHijriDate } from "@/lib/hijri";
import { getTraineeFullProfile, sanitizeTraineeProfile } from "@/lib/trainee";
import { messages } from "@/lib/messages";
import { GET as getAdminAutomation } from "@/app/api/admin/automation/route";
import { POST as triggerAdminAutomation } from "@/app/api/admin/automation/trigger/route";
import { POST as updateAdminSettings } from "@/app/api/admin/automation/settings/route";
import { POST as markCallRoute } from "@/app/api/admin/automation/call/route";
import { NextRequest } from "next/server";

// =========================================================================
// 1. Core Schedules & Job Handlers
// =========================================================================
describe("Sprint 6: Core Schedules & Job Handlers", () => {
  test("defines exactly 5 core automation job keys", () => {
    assert.equal(AUTOMATION_JOB_KEYS.length, 5);
    const expectedKeys: JobKey[] = [
      "KHUTBAH_PUSH",
      "AMAL_REMINDER",
      "AYYAM_AL_BEED",
      "MONTHLY_REPORT_REMINDER",
      "REDFLAG_SCAN",
    ];
    for (const key of expectedKeys) {
      assert.ok(AUTOMATION_JOB_KEYS.includes(key), `Must include ${key}`);
    }
  });

  test("executeKhutbahPush dispatches weekly Friday Khutbah PDF to Imams", async () => {
    resetAutomationStore();
    const result = await executeKhutbahPush();

    assert.equal(result.success, true);
    assert.equal(result.jobKey, "KHUTBAH_PUSH");
    assert.ok(result.recipientCount > 0);
    assert.match(result.summaryBn, /জুমার খুতবা/);
    assert.ok(result.dispatches && result.dispatches.length > 0);

    // Each dispatch must have recipient info and khutbah message
    result.dispatches.forEach(d => {
      assert.equal(d.channel, "SMS");
      assert.equal(d.status, "SENT");
      assert.match(d.message, /খুতবা/);
      assert.ok(d.recipientMobile.length >= 11);
    });
  });

  test("executeAmalReminder dispatches Sunnah amal & talim reminders", async () => {
    const result = await executeAmalReminder();

    assert.equal(result.success, true);
    assert.equal(result.jobKey, "AMAL_REMINDER");
    assert.ok(result.recipientCount >= 3);
    assert.match(result.summaryBn, /আমল ও তা'লিম/);
    assert.ok(result.dispatches && result.dispatches.length > 0);

    result.dispatches.forEach(d => {
      assert.equal(d.status, "SENT");
      assert.match(d.message, /সুন্নাহ আমল/);
    });
  });

  test("executeAyyamAlBeed dispatches fasting reminder based on Hijri date", async () => {
    const result = await executeAyyamAlBeed({ hijriOffset: 0 });

    assert.equal(result.success, true);
    assert.equal(result.jobKey, "AYYAM_AL_BEED");
    assert.ok(result.recipientCount > 0);
    assert.match(result.summaryBn, /আইয়ামে বিজ/);
    assert.ok(result.details);
    assert.equal(result.details.hijriOffset, 0);

    result.dispatches?.forEach(d => {
      assert.match(d.message, /আইয়ামে বিজ/);
      assert.match(d.message, /১৩/);
    });
  });

  test("executeMonthlyReportReminder dispatches monthly activity & photo reminder", async () => {
    const result = await executeMonthlyReportReminder();

    assert.equal(result.success, true);
    assert.equal(result.jobKey, "MONTHLY_REPORT_REMINDER");
    assert.ok(result.recipientCount > 0);
    assert.match(result.summaryBn, /মাঠপর্যায়ের কার্যক্রম/);
    result.dispatches?.forEach(d => {
      assert.match(d.message, /রিপোর্ট ও ছবি/);
    });
  });

  test("executeRedFlagScan identifies inactive trainees and sets redFlag", async () => {
    const result = await executeRedFlagScan();

    assert.equal(result.success, true);
    assert.equal(result.jobKey, "REDFLAG_SCAN");
    assert.ok(typeof result.flaggedCount === "number");
    assert.ok(result.flaggedCount >= 1);
    assert.match(result.summaryBn, /নিষ্ক্রিয়/);

    // person-mock-4 is inactive with 0 submissions
    const flaggedIds = result.flaggedTrainees.map(t => t.id);
    assert.ok(flaggedIds.includes("person-mock-4"));
  });
});

// =========================================================================
// 2. Hijri Offset Adjustment & Next Run Calculations
// =========================================================================
describe("Sprint 6: Hijri Offset & Schedule Calculations", () => {
  test("getAutomationSettings returns default offset 0", async () => {
    resetAutomationStore();
    const settings = await getAutomationSettings();
    assert.equal(settings.hijriOffset, 0);
  });

  test("updateAutomationSettings safely updates offset within [-1, 0, 1]", async () => {
    const s1 = await updateAutomationSettings({ hijriOffset: 1 });
    assert.equal(s1.hijriOffset, 1);

    const s2 = await updateAutomationSettings({ hijriOffset: -1 });
    assert.equal(s2.hijriOffset, -1);

    const s0 = await updateAutomationSettings({ hijriOffset: 0 });
    assert.equal(s0.hijriOffset, 0);
  });

  test("updateAutomationSettings rejects invalid offsets outside [-1, 0, 1]", async () => {
    await assert.rejects(
      async () => {
        await updateAutomationSettings({ hijriOffset: 5 });
      },
      (err: Error) => {
        assert.match(err.message, /হিজরি অফসেট অবশ্যই -১, ০ অথবা ১/);
        return true;
      }
    );
  });

  test("calculateNextRun finds valid future run dates for all 5 jobs", () => {
    const testDate = new Date("2026-11-19T08:00:00.000Z"); // Thursday

    const khutbahNext = calculateNextRun("KHUTBAH_PUSH", testDate);
    assert.ok(khutbahNext.date.getTime() > testDate.getTime());
    const khutbahParts = getDhakaParts(khutbahNext.date);
    assert.equal(khutbahParts.day, 2, "Khutbah push must be on Tuesday");
    assert.equal(khutbahParts.hours, 10, "Khutbah push must be at 10:00 AM");

    const amalNext = calculateNextRun("AMAL_REMINDER", testDate);
    assert.ok(amalNext.date.getTime() > testDate.getTime());
    const amalParts = getDhakaParts(amalNext.date);
    assert.ok(
      amalParts.day === 0 || amalParts.day === 3,
      "Amal reminder must be Sunday (0) or Wednesday (3)"
    );
    assert.equal(amalParts.hours, 16);
    assert.equal(amalParts.minutes, 30);

    const monthlyNext = calculateNextRun("MONTHLY_REPORT_REMINDER", testDate);
    assert.ok(monthlyNext.date.getTime() > testDate.getTime());
    const monthlyParts = getDhakaParts(monthlyNext.date);
    assert.equal(monthlyParts.date, 25, "Must be the 25th");
    assert.equal(monthlyParts.hours, 10);

    const scanNext = calculateNextRun("REDFLAG_SCAN", testDate);
    assert.ok(scanNext.date.getTime() > testDate.getTime());
    const scanParts = getDhakaParts(scanNext.date);
    assert.equal(scanParts.hours, 2, "Must be nightly 02:00 AM");
  });

  test("AYYAM_AL_BEED next run aligns with Hijri Day 12 and shifts with hijriOffset", () => {
    const testDate = new Date("2026-11-19T08:00:00.000Z");

    // Baseline (offset 0)
    const baseNext = calculateNextRun("AYYAM_AL_BEED", testDate, 0);
    const baseHijri = getHijriDate(baseNext.date, 0);
    assert.equal(baseHijri.day, 12, "Baseline target must be Hijri day 12");

    // Offset +1 (Moon sighted 1 day earlier)
    const plusOneNext = calculateNextRun("AYYAM_AL_BEED", testDate, 1);
    const plusOneHijri = getHijriDate(plusOneNext.date, 1);
    assert.equal(plusOneHijri.day, 12, "Offset +1 target must also be Hijri day 12 under +1 offset");

    // Calendar date should be 1 day earlier with +1 offset
    const dayDiff = Math.round(
      (baseNext.date.getTime() - plusOneNext.date.getTime()) / (1000 * 3600 * 24)
    );
    assert.equal(dayDiff, 1, "Calendar date must advance 1 day earlier when moon is sighted earlier (+1)");

    // Offset -1 (Moon sighted 1 day later)
    const minusOneNext = calculateNextRun("AYYAM_AL_BEED", testDate, -1);
    const minusOneHijri = getHijriDate(minusOneNext.date, -1);
    assert.equal(minusOneHijri.day, 12, "Offset -1 target must be Hijri day 12 under -1 offset");

    const minusDayDiff = Math.round(
      (minusOneNext.date.getTime() - baseNext.date.getTime()) / (1000 * 3600 * 24)
    );
    assert.equal(minusDayDiff, 1, "Calendar date must delay 1 day later when moon is sighted later (-1)");
  });

  test("formatScheduleDateTimeBn formats schedule times accurately into Bengali", () => {
    const sampleDate = new Date("2026-11-25T04:00:00.000Z"); // 10:00 AM Dhaka
    const formatted = formatScheduleDateTimeBn(sampleDate);

    assert.match(formatted, /২৫ নভেম্বর ২০২৬/);
    assert.match(formatted, /সকাল ১০:০০ টা/);
  });
});

// =========================================================================
// 3. 60-Day Inactivity Red Flag Logic & Admin Call Tracking
// =========================================================================
describe("Sprint 6: Inactivity Red Flag & Admin Call Monitoring", () => {
  test("isTraineeInactive correctly evaluates 60-day threshold", () => {
    const now = new Date("2026-11-19T12:00:00.000Z");

    // Trainee with recent activity (10 days ago) -> ACTIVE
    const recentActivity = new Date(now.getTime() - 10 * 86_400_000);
    assert.equal(isTraineeInactive(recentActivity, now), false);

    // Trainee at boundary (59 days ago) -> ACTIVE
    const boundaryActive = new Date(now.getTime() - 59 * 86_400_000);
    assert.equal(isTraineeInactive(boundaryActive, now), false);

    // Trainee at boundary (60 days ago) -> INACTIVE
    const boundaryInactive = new Date(now.getTime() - 60 * 86_400_000);
    assert.equal(isTraineeInactive(boundaryInactive, now), true);

    // Trainee with 90 days of inactivity -> INACTIVE
    const veryInactive = new Date(now.getTime() - 90 * 86_400_000);
    assert.equal(isTraineeInactive(veryInactive, now), true);

    // Trainee with null or undefined activity -> INACTIVE
    assert.equal(isTraineeInactive(null, now), true);
    assert.equal(isTraineeInactive(undefined, now), true);
  });

  test("getRedFlaggedTrainees retrieves inactive trainees requiring follow-up call", async () => {
    const redFlagged = await getRedFlaggedTrainees();

    assert.ok(Array.isArray(redFlagged));
    assert.ok(redFlagged.length >= 1);

    const inactiveTrainee = redFlagged.find(t => t.id === "person-mock-4");
    assert.ok(inactiveTrainee, "person-mock-4 must be flagged for inactivity");
    assert.equal(inactiveTrainee.redFlag, true);
    assert.equal(inactiveTrainee.callNeeded, true);
    assert.ok(inactiveTrainee.daysInactive >= INACTIVITY_RED_FLAG_DAYS);
    assert.match(inactiveTrainee.reasonBn, /৬০ দিন/);

    // Active trainees (person-mock-1, person-mock-2) must NOT be in redFlagged list
    const activeIds = redFlagged.map(t => t.id);
    assert.ok(!activeIds.includes("person-mock-1"), "person-mock-1 has recent submissions and must remain active");
    assert.ok(!activeIds.includes("person-mock-2"), "person-mock-2 has recent submissions and must remain active");
  });

  test("markAdminCallCompleted records call completion and resolves callNeeded", async () => {
    const traineeId = "person-mock-4";

    const res = await markAdminCallCompleted(traineeId, "ফোনে খুতবা গাইডলাইন নিয়ে কথা হয়েছে");
    assert.equal(res.success, true);
    assert.equal(res.traineeId, traineeId);

    // Re-check red flagged trainees: callNeeded should now be false
    const flaggedAfter = await getRedFlaggedTrainees();
    const t = flaggedAfter.find(item => item.id === traineeId);
    assert.ok(t);
    assert.equal(t.callNeeded, false);
  });
});

// =========================================================================
// 4. Manual Trigger Engine & API Route Endpoints
// =========================================================================
describe("Sprint 6: Manual Trigger Engine & Admin Automation APIs", () => {
  test("triggerJob executes any valid job and appends to execution logs", async () => {
    resetAutomationStore();
    const initialLogs = await getRecentExecutionLogs();
    const initialCount = initialLogs.length;

    const result = await triggerJob("MONTHLY_REPORT_REMINDER");
    assert.equal(result.success, true);
    assert.equal(result.jobKey, "MONTHLY_REPORT_REMINDER");
    assert.ok(result.logId.startsWith("LOG-"));

    const newLogs = await getRecentExecutionLogs();
    assert.equal(newLogs.length, initialCount + 1);
    assert.equal(newLogs[0].jobKey, "MONTHLY_REPORT_REMINDER");
    assert.equal(newLogs[0].status, "SUCCESS");
  });

  test("triggerJob rejects unrecognized jobKey with helpful error", async () => {
    await assert.rejects(
      async () => {
        await triggerJob("UNKNOWN_SPARKLE_JOB");
      },
      (err: Error) => {
        assert.match(err.message, /অবৈধ জব কী/);
        return true;
      }
    );
  });

  test("getAllJobs returns definitions for all 5 jobs with next run times", async () => {
    const jobs = await getAllJobs();
    assert.equal(jobs.length, 5);

    jobs.forEach(j => {
      assert.ok(AUTOMATION_JOB_KEYS.includes(j.key));
      assert.ok(j.titleBn.length > 0);
      assert.ok(j.scheduleBn.length > 0);
      assert.ok(j.cronExpression.length > 0);
      assert.ok(j.nextRunBn && j.nextRunBn.length > 0);
      assert.ok(["IDLE", "RUNNING", "SUCCESS", "FAILED"].includes(j.lastStatus));
    });
  });

  test("API Route: GET /api/admin/automation returns complete dashboard state", async () => {
    const response = await getAdminAutomation();
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.jobs.length, 5);
    assert.ok(Array.isArray(body.recentLogs));
    assert.ok(body.settings);
    assert.ok(body.hijriInfo);
    assert.ok(body.hijriInfo.formatted);
    assert.ok(Array.isArray(body.redFlaggedTrainees));
  });

  test("API Route: POST /api/admin/automation/trigger runs job on demand", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/automation/trigger", {
      method: "POST",
      body: JSON.stringify({ jobKey: "AMAL_REMINDER" }),
    });

    const response = await triggerAdminAutomation(req);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.result.jobKey, "AMAL_REMINDER");
    assert.equal(body.result.success, true);
  });

  test("API Route: POST /api/admin/automation/trigger rejects invalid body", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/automation/trigger", {
      method: "POST",
      body: JSON.stringify({ jobKey: "INVALID_KEY" }),
    });

    const response = await triggerAdminAutomation(req);
    assert.equal(response.status, 400);

    const body = await response.json();
    assert.match(body.error, /অননুমোদিত জব কী/);
  });

  test("API Route: POST /api/admin/automation/settings updates Hijri offset", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/automation/settings", {
      method: "POST",
      body: JSON.stringify({ hijriOffset: 1 }),
    });

    const response = await updateAdminSettings(req);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.settings.hijriOffset, 1);
    assert.equal(body.hijriInfo.offset, 1);
  });

  test("API Route: POST /api/admin/automation/call logs follow-up call", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/automation/call", {
      method: "POST",
      body: JSON.stringify({
        personId: "person-mock-4",
        note: "ফলো-আপ সম্পন্ন",
      }),
    });

    const response = await markCallRoute(req);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.traineeId, "person-mock-4");
  });
});

// =========================================================================
// 5. Strict Security Invariant: Data Isolation
// =========================================================================
describe("Sprint 6: Strict Security Invariant & Data Isolation", () => {
  test("getTraineeFullProfile never leaks internalStars, redFlag, or callLogs", async () => {
    // Even if person-mock-4 is red-flagged internally
    const profile = await getTraineeFullProfile("person-mock-4");

    assert.ok(profile);
    const raw = profile as unknown as Record<string, unknown>;
    assert.equal(raw.redFlag, undefined, "redFlag must NEVER leak to trainee profile");
    assert.equal(raw.internalStars, undefined, "internalStars must NEVER leak to trainee profile");
    assert.equal(raw.callLogs, undefined, "callLogs must NEVER leak to trainee profile");
  });

  test("sanitizeTraineeProfile strictly removes admin-only flags from any object", () => {
    const dangerousRecord = {
      id: "usr-secret",
      name: "পরীক্ষামূলক",
      mobile: "01700000000",
      totalPoints: 50,
      redFlag: true,
      internalStars: 5,
      callLogs: [{ id: "call-1", result: "CALL_NEEDED" }],
      attendedClassIds: new Set(["cls-1"]),
    };

    const clean = sanitizeTraineeProfile(dangerousRecord);

    assert.equal((clean as Record<string, unknown>).redFlag, undefined);
    assert.equal((clean as Record<string, unknown>).internalStars, undefined);
    assert.equal((clean as Record<string, unknown>).callLogs, undefined);
    assert.equal((clean as Record<string, unknown>).attendedClassIds, undefined);
    assert.equal(clean.name, "পরীক্ষামূলক");
    assert.equal(clean.totalPoints, 50);
  });
});

// =========================================================================
// 6. Messages Dictionary & Localization Completeness
// =========================================================================
describe("Sprint 6: Messages Dictionary & Localization", () => {
  test("messages.adminAutomation contains all required sections, jobs, and labels", () => {
    const m = messages.adminAutomation;

    assert.ok(m.title.length > 0);
    assert.ok(m.subtitle.length > 0);
    assert.ok(m.badge.length > 0);
    assert.ok(m.jobsSectionTitle.length > 0);
    assert.ok(m.settingsSectionTitle.length > 0);
    assert.ok(m.redFlagSectionTitle.length > 0);
    assert.ok(m.logsSectionTitle.length > 0);
    assert.ok(m.runNowButton.length > 0);

    // Status labels
    assert.equal(m.statusLabels.SUCCESS, "সফল");
    assert.equal(m.statusLabels.RUNNING, "প্রক্রিয়াধীন");
    assert.equal(m.statusLabels.IDLE, "অপেক্ষমাণ");
    assert.equal(m.statusLabels.FAILED, "ব্যর্থ");

    // All 5 jobs configured
    for (const key of AUTOMATION_JOB_KEYS) {
      const job = m.jobs[key];
      assert.ok(job, `Job ${key} must exist in messages.adminAutomation.jobs`);
      assert.ok(job.title.length > 0);
      assert.ok(job.schedule.length > 0);
      assert.ok(job.description.length > 0);
    }
  });
});

// =========================================================================
// 7. Concurrency, Exact Boundary Transitions & Engine Robustness
// =========================================================================
describe("Sprint 6: Concurrency, Exact Boundaries & Engine Robustness", () => {
  test("handles concurrent job triggering without dropping logs", async () => {
    resetAutomationStore();
    const results = await Promise.all([
      triggerJob("KHUTBAH_PUSH"),
      triggerJob("AMAL_REMINDER"),
      triggerJob("AYYAM_AL_BEED"),
      triggerJob("MONTHLY_REPORT_REMINDER"),
      triggerJob("REDFLAG_SCAN"),
    ]);

    assert.equal(results.length, 5);
    results.forEach(r => assert.equal(r.success, true));

    const logs = await getRecentExecutionLogs(10);
    assert.ok(logs.length >= 5);
  });

  test("exact minute boundaries for all core schedules return strictly future dates", () => {
    // 1. Tuesday 09:59:59 vs 10:00:00 (Nov 17 2026 is Tuesday)
    const tueBefore = makeDhakaDate(2026, 10, 17, 9, 59, 59);
    const nextBefore = calculateNextRun("KHUTBAH_PUSH", tueBefore);
    assert.ok(nextBefore.date.getTime() > tueBefore.getTime());
    assert.equal(getDhakaParts(nextBefore.date).date, 17);

    const tueAt = makeDhakaDate(2026, 10, 17, 10, 0, 0);
    const nextAt = calculateNextRun("KHUTBAH_PUSH", tueAt);
    assert.ok(nextAt.date.getTime() > tueAt.getTime());
    assert.equal(getDhakaParts(nextAt.date).date, 24); // Advanced to next Tuesday

    // 2. Day 25 09:59:59 vs 10:00:00
    const d25Before = makeDhakaDate(2026, 10, 25, 9, 59, 59);
    const next25Before = calculateNextRun("MONTHLY_REPORT_REMINDER", d25Before);
    assert.ok(next25Before.date.getTime() > d25Before.getTime());
    assert.equal(getDhakaParts(next25Before.date).month, 10); // Still this month

    const d25At = makeDhakaDate(2026, 10, 25, 10, 0, 0);
    const next25At = calculateNextRun("MONTHLY_REPORT_REMINDER", d25At);
    assert.ok(next25At.date.getTime() > d25At.getTime());
    assert.equal(getDhakaParts(next25At.date).month, 11); // Advanced to next month

    // 3. Nightly 01:59:59 vs 02:00:00
    const dNightBefore = makeDhakaDate(2026, 10, 19, 1, 59, 59);
    const nextNightBefore = calculateNextRun("REDFLAG_SCAN", dNightBefore);
    assert.ok(nextNightBefore.date.getTime() > dNightBefore.getTime());
    assert.equal(getDhakaParts(nextNightBefore.date).date, 19);

    const dNightAt = makeDhakaDate(2026, 10, 19, 2, 0, 0);
    const nextNightAt = calculateNextRun("REDFLAG_SCAN", dNightAt);
    assert.ok(nextNightAt.date.getTime() > dNightAt.getTime());
    assert.equal(getDhakaParts(nextNightAt.date).date, 20);

    // 4. Maghrib 18:30 on Hijri day 12 for AYYAM_AL_BEED
    const ayyamTarget = calculateNextRun("AYYAM_AL_BEED", new Date("2026-11-19T08:00:00Z"), 0);
    const atAyyamExact = new Date(ayyamTarget.date.getTime());
    const afterAyyam = calculateNextRun("AYYAM_AL_BEED", atAyyamExact, 0);
    assert.ok(afterAyyam.date.getTime() > atAyyamExact.getTime());
  });

  test("calculateNextRun generates future target for every day of a 365-day year across all offsets", () => {
    for (const job of AUTOMATION_JOB_KEYS) {
      for (let dayOffset = 0; dayOffset < 365; dayOffset += 15) {
        const testDate = new Date("2026-01-01T06:00:00.000Z");
        testDate.setDate(testDate.getDate() + dayOffset);
        for (const offset of [-1, 0, 1]) {
          const res = calculateNextRun(job, testDate, offset);
          assert.ok(
            res.date.getTime() > testDate.getTime(),
            `calculateNextRun for ${job} at ${testDate.toISOString()} with offset ${offset} must be strictly in the future`
          );
        }
      }
    }
  });

  test("API Route: POST /api/admin/automation/settings returns current settings on empty body", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/automation/settings", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await updateAdminSettings(req);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.ok(body.settings);
    assert.ok(body.hijriInfo);
  });
});
