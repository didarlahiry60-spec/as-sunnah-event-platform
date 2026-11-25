import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

import {
  getAdminTraineesList,
  updateTraineeInternalRating,
  recordTraineeCallLog,
} from "@/lib/trainee-admin";
import {
  createReliefBroadcast,
  recordReliefResponse,
  getReliefBroadcastSummary,
  getAllReliefBroadcasts,
  parseReliefResponse,
} from "@/lib/relief";
import { getLivePhotoWall, getExecutiveReportSummary } from "@/lib/reporting";
import { getTraineeFullProfile, sanitizeTraineeProfile } from "@/lib/trainee";
import { getSubmissionsByPerson } from "@/lib/submissions";
import { messages } from "@/lib/messages";
import { createAdminSessionToken } from "@/lib/auth";

import { GET as getAdminTraineesRoute } from "@/app/api/admin/trainees/route";
import { PATCH as updateRatingRoute } from "@/app/api/admin/trainees/[id]/rating/route";
import { POST as recordCallLogRoute } from "@/app/api/admin/trainees/[id]/call-log/route";
import { GET as getReliefRoute } from "@/app/api/admin/relief/route";
import { POST as createReliefRoute } from "@/app/api/admin/relief/broadcast/route";
import { POST as respondReliefRoute } from "@/app/api/admin/relief/respond/route";
import { GET as getReportSummaryRoute } from "@/app/api/admin/reports/summary/route";

// =========================================================================
// 1. Admin Trainee Directory & Secret Rating Engine
// =========================================================================
describe("Sprint 7: Admin Trainee Directory & Secret Rating Engine", () => {
  test("retrieves trainees list with secret internalStars, redFlag, and callLogs", async () => {
    const trainees = await getAdminTraineesList();
    assert.ok(trainees.length > 0, "Trainees directory must not be empty");

    const imam1 = trainees.find(t => t.id === "person-mock-1");
    assert.ok(imam1, "person-mock-1 must exist in directory");
    assert.equal(typeof imam1.internalStars, "number", "internalStars must be numeric");
    assert.ok(imam1.internalStars >= 1 && imam1.internalStars <= 5, "Rating must be 1-5");
    assert.equal(typeof imam1.redFlag, "boolean", "redFlag must be boolean");
    assert.ok(Array.isArray(imam1.callLogs), "callLogs must be an array");
  });

  test("filters trainees by district, starRating, hasRedFlag, and search query", async () => {
    // District filter
    const kurigramTrainees = await getAdminTraineesList({ district: "কুড়িগ্রাম" });
    assert.ok(kurigramTrainees.length > 0);
    assert.ok(kurigramTrainees.every(t => t.district?.includes("কুড়িগ্রাম")));

    // Search filter
    const searchByName = await getAdminTraineesList({ search: "আব্দুর রহমান" });
    assert.ok(searchByName.some(t => t.id === "person-mock-1"));

    // Star rating filter
    const fiveStarTrainees = await getAdminTraineesList({ starRating: 5 });
    assert.ok(fiveStarTrainees.every(t => t.internalStars === 5));

    // Red flag filter
    const redFlagged = await getAdminTraineesList({ hasRedFlag: true });
    assert.ok(redFlagged.every(t => t.redFlag === true));
  });

  test("updates secret 1-5 star internal rating safely", async () => {
    const traineeId = "person-mock-2";

    // Set rating to 5
    const res5 = await updateTraineeInternalRating(traineeId, 5);
    assert.equal(res5.success, true);
    assert.equal(res5.internalStars, 5);

    // Verify rating in directory
    const listAfter5 = await getAdminTraineesList();
    const updated = listAfter5.find(t => t.id === traineeId);
    assert.equal(updated?.internalStars, 5);

    // Set rating to 3
    const res3 = await updateTraineeInternalRating(traineeId, 3);
    assert.equal(res3.success, true);
    assert.equal(res3.internalStars, 3);
  });

  test("strictly validates rating bounds (1 to 5) and rejects out-of-range values", async () => {
    const traineeId = "person-mock-1";

    // Rating 0
    await assert.rejects(
      async () => {
        await updateTraineeInternalRating(traineeId, 0);
      },
      /গোপন রেটিং অবশ্যই ১ থেকে ৫ এর মধ্যে/
    );

    // Rating 6
    await assert.rejects(
      async () => {
        await updateTraineeInternalRating(traineeId, 6);
      },
      /গোপন রেটিং অবশ্যই ১ থেকে ৫ এর মধ্যে/
    );

    // Float or NaN
    await assert.rejects(
      async () => {
        await updateTraineeInternalRating(traineeId, 3.5);
      },
      /গোপন রেটিং অবশ্যই ১ থেকে ৫ এর মধ্যে/
    );
  });

  test("rejects rating update for non-existent trainee ID", async () => {
    await assert.rejects(
      async () => {
        await updateTraineeInternalRating("person-ghost-999", 4);
      },
      /প্রশিক্ষণার্থী আইডি পাওয়া যায়নি/
    );
  });
});

// =========================================================================
// 2. Admin Call Log Recording & Red Flag Resolution
// =========================================================================
describe("Sprint 7: Admin Call Log Recording & Red Flag Resolution", () => {
  test("records admin call log and adds to trainee call history", async () => {
    const traineeId = "person-mock-3";
    const notes = "কোর্সের অগ্রগতি ও সমসাময়িক খুতবা বাস্তবায়ন নিয়ে দীর্ঘ আলোচনা সম্পন্ন হয়েছে।";
    const callerName = "মুহাম্মদ আব্দুল্লাহ (মনিটরিং অফিসার)";

    const res = await recordTraineeCallLog(traineeId, {
      callerName,
      notes,
      outcome: "REACHED",
      clearRedFlag: false,
    });

    assert.equal(res.success, true);
    assert.equal(res.log.personId, traineeId);
    assert.equal(res.log.callerName, callerName);
    assert.equal(res.log.notes, notes);
    assert.ok(res.log.createdAt);

    // Verify in directory
    const trainees = await getAdminTraineesList();
    const t = trainees.find(x => x.id === traineeId);
    assert.ok(t?.callLogs.some(log => log.notes === notes));
  });

  test("resolves and clears redFlag when clearRedFlag option is enabled", async () => {
    const traineeId = "person-mock-4";

    const res = await recordTraineeCallLog(traineeId, {
      callerName: "হেড অব মনিটরিং",
      notes: "প্রশিক্ষণার্থীর সাথে ফোনে যোগাযোগ করা হয়েছে, আগামী সপ্তাহ থেকে নিয়মিত আমল পাঠাবেন।",
      outcome: "CALL_COMPLETED",
      clearRedFlag: true,
    });

    assert.equal(res.success, true);
    assert.equal(res.redFlagCleared, true);

    // Trainee redFlag should now be false
    const trainees = await getAdminTraineesList();
    const t = trainees.find(x => x.id === traineeId);
    assert.equal(t?.redFlag, false, "Red flag must be cleared");
  });

  test("calling getAdminTraineesList repeatedly does not duplicate call logs", async () => {
    const list1 = await getAdminTraineesList();
    const t1 = list1.find(x => x.id === "person-mock-4");
    const count1 = t1?.callLogs.length || 0;

    const list2 = await getAdminTraineesList();
    const t2 = list2.find(x => x.id === "person-mock-4");
    const count2 = t2?.callLogs.length || 0;

    assert.equal(count1, count2, "Call logs must remain stable and deduplicated across repeated calls");
  });
});

// =========================================================================
// 3. Emergency Relief Broadcast Engine
// =========================================================================
describe("Sprint 7: Emergency Relief Broadcast Engine", () => {
  test("creates emergency relief broadcast with district targeting and default SMS", async () => {
    const broadcast = await createReliefBroadcast({
      title: "কুড়িগ্রাম ব্রহ্মপুত্র অববাহিকায় আকস্মিক বন্যা ত্রাণ সেল",
      district: "কুড়িগ্রাম",
      disasterType: "FLOOD",
    });

    assert.ok(broadcast.id.startsWith("RELIEF-2026-"));
    assert.equal(broadcast.district, "কুড়িগ্রাম");
    assert.equal(broadcast.disasterType, "FLOOD");
    assert.ok(broadcast.message.includes("আস-সুন্নাহ জরুরি ত্রাণ সেল"));
    assert.ok(broadcast.message.includes("১ চাপুন: হ্যাঁ, প্রস্তুত"));
    assert.ok(broadcast.recipients.length > 0, "Must target district trainees/volunteers");
  });

  test("getAllReliefBroadcasts returns list with live tally summaries", async () => {
    const broadcasts = await getAllReliefBroadcasts();
    assert.ok(broadcasts.length >= 2, "Seeded broadcasts must be present");

    const feniBroadcast = broadcasts.find(b => b.district === "ফেনী");
    assert.ok(feniBroadcast, "Feni relief broadcast must exist");
    assert.ok(feniBroadcast.totalSent > 0);
    assert.ok(feniBroadcast.readyCount >= 1);
    assert.equal(typeof feniBroadcast.readyRatePercent, "number");
  });

  test("getReliefBroadcastSummary returns live response breakdown", async () => {
    const broadcastId = "RELIEF-2026-001";
    const summary = await getReliefBroadcastSummary(broadcastId);

    assert.equal(summary.broadcastId, broadcastId);
    assert.equal(
      summary.totalSent,
      summary.readyCount + summary.unavailableCount + summary.pendingCount
    );
    assert.ok(Array.isArray(summary.responses));
  });
});

// =========================================================================
// 4. Relief Response Parser & Live Tally Update
// =========================================================================
describe("Sprint 7: Relief Response Parser & Live Tally Update", () => {
  test("parseReliefResponse accurately normalizes diverse Bengali and English inputs", () => {
    // READY inputs
    assert.equal(parseReliefResponse("1"), "READY");
    assert.equal(parseReliefResponse("১"), "READY");
    assert.equal(parseReliefResponse("হ্যাঁ"), "READY");
    assert.equal(parseReliefResponse("হ্যা"), "READY");
    assert.equal(parseReliefResponse("হাঁ"), "READY");
    assert.equal(parseReliefResponse("READY"), "READY");
    assert.equal(parseReliefResponse("ready"), "READY");
    assert.equal(parseReliefResponse("১: হ্যাঁ, প্রস্তুত"), "READY");
    assert.equal(parseReliefResponse("1 - yes ready"), "READY");
    assert.equal(parseReliefResponse("আমি প্রস্তুত"), "READY");
    assert.equal(parseReliefResponse("ইনশাআল্লাহ প্রস্তুত"), "READY");

    // UNAVAILABLE inputs
    assert.equal(parseReliefResponse("2"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("২"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("না"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("unavailable"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("২: না"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("no"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("না, পারব না"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("অপারগ"), "UNAVAILABLE");
    assert.equal(parseReliefResponse("পারব না"), "UNAVAILABLE");

    // Edge cases: words starting with "না" but NOT negative (must NOT be UNAVAILABLE)
    assert.notEqual(parseReliefResponse("নামাজ পড়ে রওনা হচ্ছি"), "UNAVAILABLE");

    // Edge cases: multi-digit numbers (10, 20) must NOT falsely match 1 or 2
    assert.equal(parseReliefResponse("10"), "PENDING");
    assert.equal(parseReliefResponse("20"), "PENDING");

    // Unknown inputs fallback to PENDING
    assert.equal(parseReliefResponse(""), "PENDING");
    assert.equal(parseReliefResponse("অন্য কিছু"), "PENDING");
  });

  test("recordReliefResponse updates trainee status and live tally", async () => {
    // Create new campaign
    const broadcast = await createReliefBroadcast({
      title: "সিলেট আকস্মিক পাহাড়ি ঢল জরুরি সাড়াদান",
      district: "সিলেট",
      disasterType: "FLOOD",
    });

    const recipient = broadcast.recipients[0];
    assert.ok(recipient);
    assert.equal(recipient.status, "PENDING");

    // Trainee responds with "১" (READY)
    const res = await recordReliefResponse(
      broadcast.id,
      recipient.traineeMobile,
      "১: হ্যাঁ, প্রস্তুত"
    );

    assert.equal(res.success, true);
    assert.equal(res.responseStatus, "READY");
    assert.equal(res.statusBn, "হ্যাঁ, প্রস্তুত");
    assert.ok(res.summary.readyCount >= 1);

    // Verify recipient in updated summary
    const updatedRecip = res.summary.responses.find(r => r.personId === recipient.personId);
    assert.equal(updatedRecip?.status, "READY");
    assert.ok(updatedRecip?.respondedAt);
  });

  test("recordReliefResponse rejects empty phone and handles concurrent responses without duplicates", async () => {
    const broadcast = await createReliefBroadcast({
      title: "কনকারেন্সি টেস্ট ত্রাণ সেল",
      district: "ফেনী",
      disasterType: "FLOOD",
    });

    // Empty phone throws error
    await assert.rejects(
      async () => {
        await recordReliefResponse(broadcast.id, "   ", "১");
      },
      /ফোন নম্বর আবশ্যক/
    );

    // Concurrent responses for the same recipient
    const recipientPhone = broadcast.recipients[0].traineeMobile;
    const initialCount = broadcast.recipients.length;

    await Promise.all([
      recordReliefResponse(broadcast.id, recipientPhone, "১: হ্যাঁ, প্রস্তুত"),
      recordReliefResponse(broadcast.id, recipientPhone, "১: হ্যাঁ, প্রস্তুত"),
      recordReliefResponse(broadcast.id, recipientPhone, "১: হ্যাঁ, প্রস্তুত"),
    ]);

    const summary = await getReliefBroadcastSummary(broadcast.id);
    assert.equal(summary.totalSent, initialCount, "Concurrent responses must not create duplicate recipients");
    assert.ok(summary.readyCount >= 1);
  });
});

// =========================================================================
// 5. Live Photo Wall & Executive Reporting Engine
// =========================================================================
describe("Sprint 7: Live Photo Wall & Executive Reporting Engine", () => {
  test("getLivePhotoWall aggregates recent approved field photos with Imam & mosque metadata", async () => {
    const wallItems = await getLivePhotoWall(20);
    assert.ok(wallItems.length > 0, "Photo wall should contain approved photos");

    const first = wallItems[0];
    assert.ok(first.id);
    assert.ok(first.photoUrl.startsWith("http"));
    assert.ok(first.traineeName);
    assert.ok(first.mosqueName);
    assert.ok(first.district);
    assert.ok(first.activityLabelBn);
    assert.ok(first.points > 0);
    assert.ok(first.formattedDateBn);

    // Check sorted newest first
    for (let i = 0; i < wallItems.length - 1; i++) {
      const current = new Date(wallItems[i].date).getTime();
      const next = new Date(wallItems[i + 1].date).getTime();
      assert.ok(current >= next, "Photos must be sorted descending by date");
    }
  });

  test("getExecutiveReportSummary produces institutional reporting metrics", async () => {
    const summary = await getExecutiveReportSummary();

    assert.ok(summary.totalTrainees > 0, "Total trainees must be greater than 0");
    assert.ok(summary.totalDistricts > 0, "Total districts must be greater than 0");
    assert.ok(summary.totalActivitiesApproved > 0, "Approved activities must be greater than 0");
    assert.ok(summary.totalPointsAwarded > 0, "Points awarded must be greater than 0");
    assert.ok(summary.totalPhotosCount > 0, "Photos count must be greater than 0");

    // Breakdown by all 6 activity types
    assert.equal(summary.activityBreakdown.length, 6);
    const codes = summary.activityBreakdown.map(b => b.code);
    assert.ok(codes.includes("KHUTBAH"));
    assert.ok(codes.includes("CLEANUP"));
    assert.ok(codes.includes("TREE_PLANTING"));
    assert.ok(codes.includes("ONLINE_CLASS"));
    assert.ok(codes.includes("HALAQA"));
    assert.ok(codes.includes("SOCIAL_WORK"));

    // District breakdown
    assert.ok(summary.districtBreakdown.length > 0);
    assert.ok(summary.districtBreakdown[0].district);

    // Relief summary
    assert.ok(summary.reliefSummary.totalBroadcasts >= 2);
    assert.ok(summary.reliefSummary.totalVolunteersMobilized > 0);

    // Bengali generation timestamp
    assert.ok(summary.generatedAtBn.length > 0);
  });
});

// =========================================================================
// 6. Strict Security Invariant & Public Data Isolation
// =========================================================================
describe("Sprint 7: Strict Security Invariant & Public Data Isolation", () => {
  test("getTraineeFullProfile NEVER exposes internalStars, redFlag, or callLogs", async () => {
    const profile = await getTraineeFullProfile("person-mock-1");
    assert.ok(profile);

    const raw = profile as unknown as Record<string, unknown>;
    assert.equal(raw.internalStars, undefined, "internalStars must NEVER leak to trainee profile");
    assert.equal(raw.redFlag, undefined, "redFlag must NEVER leak to trainee profile");
    assert.equal(raw.callLogs, undefined, "callLogs must NEVER leak to trainee profile");
  });

  test("sanitizeTraineeProfile strictly strips admin-only attributes", () => {
    const tainted = {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      internalStars: 5,
      redFlag: true,
      callLogs: [{ id: "c1", notes: "secret" }],
      attendedClassIds: new Set(["cls-1"]),
      totalPoints: 145,
    };

    const sanitized = sanitizeTraineeProfile(tainted);
    assert.equal((sanitized as Record<string, unknown>).internalStars, undefined);
    assert.equal((sanitized as Record<string, unknown>).redFlag, undefined);
    assert.equal((sanitized as Record<string, unknown>).callLogs, undefined);
    assert.equal((sanitized as Record<string, unknown>).attendedClassIds, undefined);
    assert.equal(sanitized.totalPoints, 145);
    assert.equal(sanitized.name, "মুফতি আব্দুর রহমান");
  });

  test("public/trainee submissions query never leaks internalStars, redFlag, or callLogs", async () => {
    const subs = await getSubmissionsByPerson("person-mock-1");
    assert.ok(subs.length > 0);

    for (const sub of subs) {
      const raw = sub as unknown as Record<string, unknown>;
      assert.equal(raw.internalStars, undefined);
      assert.equal(raw.redFlag, undefined);
      assert.equal(raw.callLogs, undefined);
    }
  });
});

// =========================================================================
// 7. API Endpoints Integration
// =========================================================================
describe("Sprint 7: Admin API Endpoints Integration", () => {
  const getAdminHeaders = async (extra: Record<string, string> = {}) => {
    const token = await createAdminSessionToken({
      adminId: "admin-test-1",
      email: "admin@assunnah.local",
      name: "Test Admin",
      role: "SUPER_ADMIN",
    });
    return { Authorization: `Bearer ${token}`, ...extra };
  };

  test("API: GET /api/admin/trainees returns directory with secret ratings", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/trainees", {
      headers: await getAdminHeaders(),
    });
    const res = await getAdminTraineesRoute(req);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.trainees));
    assert.ok(body.total > 0);
  });

  test("API: PATCH /api/admin/trainees/[id]/rating updates rating and handles invalid values", async () => {
    const reqValid = new NextRequest("http://localhost:3000/api/admin/trainees/person-mock-1/rating", {
      method: "PATCH",
      headers: await getAdminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ rating: 5 }),
    });

    const resValid = await updateRatingRoute(reqValid, {
      params: Promise.resolve({ id: "person-mock-1" }),
    });
    assert.equal(resValid.status, 200);
    const bodyValid = await resValid.json();
    assert.equal(bodyValid.success, true);
    assert.equal(bodyValid.internalStars, 5);

    // Invalid rating (7)
    const reqInvalid = new NextRequest("http://localhost:3000/api/admin/trainees/person-mock-1/rating", {
      method: "PATCH",
      headers: await getAdminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ rating: 7 }),
    });
    const resInvalid = await updateRatingRoute(reqInvalid, {
      params: Promise.resolve({ id: "person-mock-1" }),
    });
    assert.equal(resInvalid.status, 400);
  });

  test("API: POST /api/admin/trainees/[id]/call-log saves log and clears redFlag", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/trainees/person-mock-1/call-log", {
      method: "POST",
      headers: await getAdminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        callerName: "এডমিন অফিসার",
        notes: "টেস্ট ফলো-আপ সফলভাবে সম্পন্ন",
        outcome: "CALL_COMPLETED",
        clearRedFlag: true,
      }),
    });

    const res = await recordCallLogRoute(req, {
      params: Promise.resolve({ id: "person-mock-1" }),
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.log.id);
  });

  test("API: GET /api/admin/relief returns list of broadcasts", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/relief", {
      headers: await getAdminHeaders(),
    });
    const res = await getReliefRoute(req);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.broadcasts));
  });

  test("API: POST /api/admin/relief/broadcast starts new broadcast", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/relief/broadcast", {
      method: "POST",
      headers: await getAdminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        title: "নোয়াখালী জরুরি সাড়াদান ক্যাম্পেইন",
        district: "নোয়াখালী",
        disasterType: "FLOOD",
      }),
    });

    const res = await createReliefRoute(req);
    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.broadcast.id);
  });

  test("API: POST /api/admin/relief/respond records trainee response", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/relief/respond", {
      method: "POST",
      headers: await getAdminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        broadcastId: "RELIEF-2026-001",
        traineePhone: "01855667788",
        response: "১: হ্যাঁ, প্রস্তুত",
      }),
    });

    const res = await respondReliefRoute(req);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.responseStatus, "READY");
    assert.equal(body.statusBn, "হ্যাঁ, প্রস্তুত");
  });

  test("API: GET /api/admin/reports/summary returns executive stats and breakdown", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/reports/summary", {
      headers: await getAdminHeaders(),
    });
    const res = await getReportSummaryRoute(req);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.report.totalTrainees > 0);
    assert.ok(body.report.totalPointsAwarded > 0);
  });
});

// =========================================================================
// 8. Central Messages Dictionary Completeness
// =========================================================================
describe("Sprint 7: Central Messages Dictionary Completeness", () => {
  test("messages.adminRelief contains all required labels and disaster types", () => {
    assert.ok(messages.adminRelief.badge);
    assert.ok(messages.adminRelief.pageTitle);
    assert.ok(messages.adminRelief.broadcastBtn);
    assert.ok(messages.adminRelief.readyCountLabel);
    assert.ok(messages.adminRelief.unavailableCountLabel);
    assert.ok(messages.adminRelief.disasterTypes.FLOOD);
    assert.ok(messages.adminRelief.disasterTypes.CYCLONE);
    assert.ok(messages.adminRelief.disasterTypes.COLD_WAVE);
  });

  test("messages.adminMonitoring contains all tabs and metrics labels", () => {
    assert.ok(messages.adminMonitoring.badge);
    assert.ok(messages.adminMonitoring.pageTitle);
    assert.ok(messages.adminMonitoring.tabPhotoWall);
    assert.ok(messages.adminMonitoring.tabExecutiveReport);
    assert.ok(messages.adminMonitoring.tabTraineesDirectory);
    assert.ok(messages.adminMonitoring.tabReliefConsole);
    assert.ok(messages.adminMonitoring.printReportBtn);
  });

  test("messages.traineeAdmin contains secret rating and call modal strings", () => {
    assert.ok(messages.traineeAdmin.directoryTitle);
    assert.ok(messages.traineeAdmin.secretRatingLabel);
    assert.ok(messages.traineeAdmin.callModalTitle);
    assert.ok(messages.traineeAdmin.clearRedFlagCheck);
    assert.ok(messages.traineeAdmin.saveCallLogBtn);
  });
});
