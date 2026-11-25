/**
 * Admin Trainee Directory & Secret Rating Engine
 * As-Sunnah Foundation Event Management Platform
 * Timezone: Asia/Dhaka (UTC+6)
 *
 * STRICT SECURITY INVARIANT:
 * Admin fields (internalStars, redFlag, callLogs) must NEVER be exposed
 * to trainee or public API endpoints or frontend components.
 */

import { db } from "@/lib/db";
import { toEnglishDigits } from "@/lib/format";
import {
  getAllTraineeRecords,
  getTraineeRecordById,
  updateTraineeRecord,
  TraineeRecord,
} from "@/lib/trainee";
import { getAllSubmissions } from "@/lib/submissions";

export interface AdminCallLogRecord {
  id: string;
  personId: string;
  callerName: string;
  outcome: string;
  notes: string;
  createdAt: string; // ISO string
}

export interface AdminTraineeFilter {
  district?: string;
  search?: string;
  starRating?: number;
  hasRedFlag?: boolean;
}

export interface AdminTraineeItem {
  id: string;
  name: string;
  mobile: string;
  category: string;
  categoryLabelBn: string;
  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  unionName?: string | null;
  mosqueName?: string | null;
  totalPoints: number;
  internalStars: number; // 1 to 5 (secret admin rating)
  redFlag: boolean;
  callLogs: AdminCallLogRecord[];
  lastActiveAt?: string | null;
  submissionCount: number;
}

// In-memory call log storage fallback
const inMemoryCallLogs = new Map<string, AdminCallLogRecord[]>();

function seedAdminCallLogs() {
  if (inMemoryCallLogs.size > 0) return;

  inMemoryCallLogs.set("person-mock-4", [
    {
      id: "CALL-2026-001",
      personId: "person-mock-4",
      callerName: "মুহাম্মদ আব্দুল্লাহ (অফিসার)",
      outcome: "FOLLOW_UP_NEEDED",
      notes: "বিগত ৬০ দিনে কোনো কার্যক্রমের রেকর্ড পাওয়া যায়নি। ফোন নম্বরে যোগাযোগ করা হয়েছিল, পুনরায় ফলো-আপ আবশ্যক।",
      createdAt: "2026-11-12T10:30:00.000Z",
    },
  ]);

  inMemoryCallLogs.set("person-mock-1", [
    {
      id: "CALL-2026-002",
      personId: "person-mock-1",
      callerName: "মাওলানা মাহফুজুর রহমান",
      outcome: "REACHED",
      notes: "মাঠপর্যায়ে খুতবা ও পরিচ্ছন্নতা কার্যক্রম অত্যন্ত নিষ্ঠার সাথে পরিচালনা করছেন। ৫ স্টার সক্রিয় ইমাম।",
      createdAt: "2026-11-08T15:00:00.000Z",
    },
  ]);
}

seedAdminCallLogs();

/**
 * Maps category enum code to human-readable Bengali label
 */
function getCategoryLabelBn(category: string): string {
  switch (category) {
    case "IMAM":
      return "ইমাম ও খতিব";
    case "MADRASA_TEACHER":
      return "মাদরাসা শিক্ষক";
    case "MADRASA_MANAGER":
      return "মাদরাসা পরিচালক";
    case "VOLUNTEER":
      return "স্বেচ্ছাসেবী / সমাজকর্মী";
    default:
      return "অন্যান্য";
  }
}

/**
 * Retrieves administrative trainees list WITH their internal secret ratings,
 * redFlag status, and call logs history.
 */
export async function getAdminTraineesList(
  filter?: AdminTraineeFilter
): Promise<AdminTraineeItem[]> {
  seedAdminCallLogs();
  const rawTrainees = getAllTraineeRecords();
  const submissions = await getAllSubmissions();

  // Try fetching additional trainees from database if available
  const traineeMap = new Map<string, TraineeRecord>();
  rawTrainees.forEach(t => traineeMap.set(t.id, t));

  try {
    const dbPersons = await db.person.findMany({
      include: {
        callLogs: {
          orderBy: { at: "desc" },
        },
      },
    });

    for (const p of dbPersons) {
      const existing = traineeMap.get(p.id);
      const callLogs: AdminCallLogRecord[] = p.callLogs.map(cl => ({
        id: cl.id,
        personId: cl.personId,
        callerName: cl.byAdminId,
        outcome: cl.result,
        notes: cl.note || "",
        createdAt: cl.at.toISOString(),
      }));

      if (callLogs.length > 0) {
        const memLogs = inMemoryCallLogs.get(p.id) || [];
        // Deduplicate call logs by unique ID to prevent unbounded duplication on multiple requests
        const logMap = new Map<string, AdminCallLogRecord>();
        for (const log of memLogs) logMap.set(log.id, log);
        for (const log of callLogs) logMap.set(log.id, log);
        inMemoryCallLogs.set(
          p.id,
          Array.from(logMap.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      }

      traineeMap.set(p.id, {
        id: p.id,
        name: p.name,
        mobile: p.mobile,
        category: p.category,
        division: p.division || existing?.division,
        district: p.district || existing?.district,
        upazila: p.upazila || existing?.upazila,
        unionName: p.unionName || existing?.unionName,
        mosqueName: p.mosqueName || existing?.mosqueName,
        totalPoints: p.totalPoints,
        internalStars: p.internalStars ?? existing?.internalStars ?? 3,
        redFlag: p.redFlag,
        attendedClassIds: existing?.attendedClassIds || new Set(),
      });
    }
  } catch {
    // Database offline fallback
  }

  const trainees = Array.from(traineeMap.values());
  const items: AdminTraineeItem[] = trainees.map(t => {
    const callLogs = inMemoryCallLogs.get(t.id) || [];
    const traineeSubs = submissions.filter(s => s.personId === t.id);
    traineeSubs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const lastActiveAt =
      traineeSubs.length > 0
        ? traineeSubs[0].createdAt
        : null;

    return {
      id: t.id,
      name: t.name,
      mobile: t.mobile,
      category: t.category,
      categoryLabelBn: getCategoryLabelBn(t.category),
      division: t.division,
      district: t.district,
      upazila: t.upazila,
      unionName: t.unionName,
      mosqueName: t.mosqueName,
      totalPoints: t.totalPoints,
      internalStars: t.internalStars ?? 3,
      redFlag: Boolean(t.redFlag),
      callLogs,
      lastActiveAt,
      submissionCount: traineeSubs.length,
    };
  });

  // Apply filters
  let filtered = items;

  if (filter?.district && filter.district !== "ALL") {
    const qDistrict = filter.district.trim().toLowerCase();
    filtered = filtered.filter(
      t => t.district && t.district.toLowerCase().includes(qDistrict)
    );
  }

  if (filter?.starRating !== undefined && filter.starRating > 0) {
    filtered = filtered.filter(t => t.internalStars === filter.starRating);
  }

  if (filter?.hasRedFlag !== undefined) {
    filtered = filtered.filter(t => t.redFlag === filter.hasRedFlag);
  }

  if (filter?.search) {
    const rawQ = filter.search.trim().toLowerCase();
    const enQ = toEnglishDigits(rawQ);
    filtered = filtered.filter(
      t =>
        t.name.toLowerCase().includes(rawQ) ||
        t.mobile.includes(enQ) ||
        t.mobile.includes(rawQ) ||
        (t.district && t.district.toLowerCase().includes(rawQ)) ||
        (t.upazila && t.upazila.toLowerCase().includes(rawQ)) ||
        (t.mosqueName && t.mosqueName.toLowerCase().includes(rawQ))
    );
  }

  // Sort: RedFlagged first, then star rating desc, then points desc
  return filtered.sort((a, b) => {
    if (a.redFlag !== b.redFlag) return a.redFlag ? -1 : 1;
    if (a.internalStars !== b.internalStars) return b.internalStars - a.internalStars;
    return b.totalPoints - a.totalPoints;
  });
}

/**
 * Updates a trainee's secret 1-5 star internal rating.
 * Strictly validated between 1 and 5.
 */
export async function updateTraineeInternalRating(
  personId: string,
  rating: number
): Promise<{ success: boolean; personId: string; internalStars: number }> {
  if (
    typeof rating !== "number" ||
    isNaN(rating) ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    throw new Error("গোপন রেটিং অবশ্যই ১ থেকে ৫ এর মধ্যে পূর্ণসংখ্যা হতে হবে।");
  }

  let trainee = await getTraineeRecordById(personId);
  if (!trainee) {
    try {
      const p = await db.person.findFirst({
        where: { OR: [{ id: personId }, { mobile: personId }] },
      });
      if (p) {
        trainee = {
          id: p.id,
          name: p.name,
          mobile: p.mobile,
          category: p.category,
          division: p.division || undefined,
          district: p.district || undefined,
          upazila: p.upazila || undefined,
          unionName: p.unionName || undefined,
          mosqueName: p.mosqueName || undefined,
          totalPoints: p.totalPoints,
          internalStars: p.internalStars ?? 3,
          redFlag: p.redFlag,
          attendedClassIds: new Set(),
        };
      }
    } catch {
      // offline
    }
  }

  if (!trainee) {
    throw new Error(`প্রশিক্ষণার্থী আইডি পাওয়া যায়নি: ${personId}`);
  }

  // Update in-memory record
  updateTraineeRecord(trainee.id, { internalStars: rating });

  // Sync to database if available
  try {
    await db.person.update({
      where: { id: trainee.id },
      data: { internalStars: rating },
    });
  } catch {
    // Database offline fallback
  }

  return {
    success: true,
    personId: trainee.id,
    internalStars: rating,
  };
}

/**
 * Records an admin call log for a trainee and optionally resolves redFlag.
 */
export async function recordTraineeCallLog(
  personId: string,
  input: {
    callerName?: string;
    notes: string;
    outcome?: string;
    clearRedFlag?: boolean;
  }
): Promise<{
  success: boolean;
  log: AdminCallLogRecord;
  redFlagCleared: boolean;
  traineeId: string;
}> {
  seedAdminCallLogs();

  let trainee = await getTraineeRecordById(personId);
  if (!trainee) {
    try {
      const p = await db.person.findFirst({
        where: { OR: [{ id: personId }, { mobile: personId }] },
      });
      if (p) {
        trainee = {
          id: p.id,
          name: p.name,
          mobile: p.mobile,
          category: p.category,
          division: p.division || undefined,
          district: p.district || undefined,
          upazila: p.upazila || undefined,
          unionName: p.unionName || undefined,
          mosqueName: p.mosqueName || undefined,
          totalPoints: p.totalPoints,
          internalStars: p.internalStars ?? 3,
          redFlag: p.redFlag,
          attendedClassIds: new Set(),
        };
      }
    } catch {
      // offline
    }
  }

  if (!trainee) {
    throw new Error(`প্রশিক্ষণার্থী আইডি পাওয়া যায়নি: ${personId}`);
  }

  const callerName = input.callerName?.trim() || "অ্যাডমিন কর্মকর্তা";
  const notes = input.notes?.trim() || "প্রশাসনিক যোগাযোগ সম্পন্ন হয়েছে।";
  const outcome = input.outcome?.trim() || "CALL_COMPLETED";
  const clearRedFlag = Boolean(input.clearRedFlag);

  const newLog: AdminCallLogRecord = {
    id: `CALL-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    personId: trainee.id,
    callerName,
    outcome,
    notes,
    createdAt: new Date().toISOString(),
  };

  // Add to in-memory call logs
  const logs = inMemoryCallLogs.get(trainee.id) || [];
  inMemoryCallLogs.set(trainee.id, [newLog, ...logs]);

  // If clearRedFlag requested, update trainee's redFlag to false
  if (clearRedFlag) {
    updateTraineeRecord(trainee.id, { redFlag: false });
  }

  // Sync to database if available
  try {
    await db.callLog.create({
      data: {
        id: newLog.id,
        personId: trainee.id,
        byAdminId: callerName,
        result: outcome,
        note: notes,
        at: new Date(newLog.createdAt),
      },
    });

    if (clearRedFlag) {
      await db.person.update({
        where: { id: trainee.id },
        data: { redFlag: false },
      });
    }
  } catch {
    // Database offline fallback
  }

  return {
    success: true,
    log: newLog,
    redFlagCleared: clearRedFlag,
    traineeId: trainee.id,
  };
}
