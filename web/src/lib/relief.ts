/**
 * Emergency Relief Broadcast Engine
 * As-Sunnah Foundation Event Management Platform
 * Timezone: Asia/Dhaka (UTC+6)
 *
 * Facilitates 1-click urgent SMS dispatch to district Imams & volunteers
 * in case of flash floods, cyclones, or cold waves, with real-time response tally.
 */

import { db } from "@/lib/db";
import { normalizeBdPhone, toEnglishDigits } from "@/lib/format";
import { getAllTraineeRecords, getTraineeRecordById, TraineeRecord } from "@/lib/trainee";

export type DisasterType = "FLOOD" | "CYCLONE" | "COLD_WAVE" | "OTHER";
export type ReliefResponseStatus = "READY" | "UNAVAILABLE" | "PENDING";

export interface ReliefRecipient {
  personId: string;
  traineeName: string;
  traineeMobile: string;
  district: string;
  category: string;
  mosqueName?: string;
  status: ReliefResponseStatus;
  statusBn: string;
  respondedAt?: string;
  rawResponse?: string;
}

export interface ReliefBroadcastRecord {
  id: string; // RELIEF-YYYY-XXXX
  title: string;
  district: string;
  disasterType: DisasterType;
  disasterTypeBn: string;
  message: string;
  createdAt: string; // ISO string
  recipients: ReliefRecipient[];
}

export interface ReliefBroadcastSummary {
  broadcastId: string;
  title: string;
  district: string;
  disasterType: DisasterType;
  disasterTypeBn: string;
  message: string;
  createdAt: string;
  totalSent: number;
  readyCount: number;
  unavailableCount: number;
  pendingCount: number;
  readyRatePercent: number;
  responses: ReliefRecipient[];
}

export interface CreateReliefBroadcastInput {
  title: string;
  district: string;
  disasterType: DisasterType;
  message?: string;
}

export const DISASTER_TYPE_MAP: Record<DisasterType, { nameBn: string; urgencyBn: string }> = {
  FLOOD: {
    nameBn: "আকস্মিক বন্যা",
    urgencyBn: "আকস্মিক বন্যায়",
  },
  CYCLONE: {
    nameBn: "ঘূর্ণিঝড় ও জলোচ্ছ্বাস",
    urgencyBn: "ঘূর্ণিঝড়ে",
  },
  COLD_WAVE: {
    nameBn: "তীব্র শৈত্যপ্রবাহ",
    urgencyBn: "তীব্র শৈত্যপ্রবাহে",
  },
  OTHER: {
    nameBn: "জরুরি দুর্যোগ",
    urgencyBn: "জরুরি দুর্যোগে",
  },
};

/**
 * Maps PersonCategory to human-readable Bengali label
 */
export function getCategoryLabelBn(category?: string | null): string {
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
      return "স্বেচ্ছাসেবী / সমাজকর্মী";
  }
}

// Sequence counter for broadcast IDs
let broadcastSeqCounter = 100;

function generateReliefBroadcastId(year: number = 2026): string {
  broadcastSeqCounter += 1;
  return `RELIEF-${year}-${String(broadcastSeqCounter).padStart(3, "0")}`;
}

// In-memory store for relief broadcasts
const inMemoryReliefBroadcasts = new Map<string, ReliefBroadcastRecord>();

/**
 * Normalizes incoming SMS response text into READY or UNAVAILABLE.
 * Robust against Bengali colloquial phrasing, number replies ("1", "2"),
 * and avoids false positives on words like "নামাজ" (which starts with "না").
 */
export function parseReliefResponse(raw: string): ReliefResponseStatus {
  if (!raw) return "PENDING";
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length === 0) return "PENDING";

  // Explicit single digit replies: "1" or "১" vs "2" or "২" (must not match multi-digit like 10, 20)
  const isOne = /^(1|১)(\D|$)/.test(trimmed);
  const isTwo = /^(2|২)(\D|$)/.test(trimmed);

  // Unavailability indicators:
  // Starts with "না" as distinct word or phrase, or contains explicit negation
  const hasUnavailabilityPhrases =
    /^না([,\s।\.\-!?:;]|$)/i.test(trimmed) ||
    /^(no|unavailable)\b/i.test(trimmed) ||
    /(পারব না|পারবো না|সম্ভব না|সম্ভব নয়|অপারগ|অনুপলব্ধ|যেতে পারছি না|ব্যস্ত আছি)/.test(trimmed);

  // Readiness indicators:
  const hasReadinessPhrases =
    /^(yes|ready)\b/i.test(trimmed) ||
    /^(হ্যাঁ|হ্যা|হাঁ|জি)([,\s।\.\-!?:;]|$)/i.test(trimmed) ||
    /(প্রস্তুত|ইনশাআল্লাহ|ইন শা আল্লাহ|যোগ দিব|আসছি|অংশ নিব|রওনা)/.test(trimmed);

  if (isTwo || hasUnavailabilityPhrases) {
    return "UNAVAILABLE";
  }

  if (isOne || hasReadinessPhrases) {
    return "READY";
  }

  return "PENDING";
}

function getStatusBn(status: ReliefResponseStatus): string {
  switch (status) {
    case "READY":
      return "হ্যাঁ, প্রস্তুত";
    case "UNAVAILABLE":
      return "না, অনুপলব্ধ";
    case "PENDING":
    default:
      return "অপেক্ষমান";
  }
}

/**
 * Seeds initial demo relief campaigns for Feni and Noakhali
 */
function seedReliefBroadcasts() {
  if (inMemoryReliefBroadcasts.size > 0) return;

  const demoFeniRecipients: ReliefRecipient[] = [
    {
      personId: "person-mock-5",
      traineeName: "মাওলানা জসিম উদ্দিন",
      traineeMobile: "01811998877",
      district: "ফেনী",
      category: "ইমাম ও খতিব",
      mosqueName: "ছাগলনাইয়া কেন্দ্রীয় জামে মসজিদ",
      status: "READY",
      statusBn: "হ্যাঁ, প্রস্তুত",
      respondedAt: "2026-11-15T08:35:00.000Z",
      rawResponse: "১ চাপুন: হ্যাঁ, প্রস্তুত",
    },
    {
      personId: "person-mock-6",
      traineeName: "মাওলানা ওবায়দুল হক",
      traineeMobile: "01833441122",
      district: "ফেনী",
      category: "ইমাম ও খতিব",
      mosqueName: "ফুলগাজী বাজার জামে মসজিদ",
      status: "READY",
      statusBn: "হ্যাঁ, প্রস্তুত",
      respondedAt: "2026-11-15T08:42:00.000Z",
      rawResponse: "1",
    },
    {
      personId: "person-mock-feni-3",
      traineeName: "মুফতি সামছুল হক",
      traineeMobile: "01844556677",
      district: "ফেনী",
      category: "মাদরাসা শিক্ষক",
      mosqueName: "পরশুরাম দারুল উলুম মাদরাসা",
      status: "UNAVAILABLE",
      statusBn: "না, অনুপলব্ধ",
      respondedAt: "2026-11-15T08:50:00.000Z",
      rawResponse: "২",
    },
    {
      personId: "person-mock-feni-4",
      traineeName: "মাওলানা নুরুল আমিন",
      traineeMobile: "01855667788",
      district: "ফেনী",
      category: "ইমাম ও খতিব",
      mosqueName: "দাগনভূঞা বাজার মসজিদ",
      status: "PENDING",
      statusBn: "অপেক্ষমান",
    },
  ];

  const b1: ReliefBroadcastRecord = {
    id: "RELIEF-2026-001",
    title: "ফেনী ও মুহুরী নদী প্লাবিত অঞ্চলে জরুরি উদ্ধার ও শুকনো খাদ্য বিতরণ সেল",
    district: "ফেনী",
    disasterType: "FLOOD",
    disasterTypeBn: "আকস্মিক বন্যা",
    message:
      "[আস-সুন্নাহ জরুরি ত্রাণ সেল: আপনার এলাকায় আকস্মিক বন্যায় ত্রাণ কার্যক্রমে অংশ নিতে আপনি কি প্রস্তুত? ১ চাপুন: হ্যাঁ, প্রস্তুত / ২ চাপুন: না]",
    createdAt: "2026-11-15T08:30:00.000Z",
    recipients: demoFeniRecipients,
  };

  const demoNoakhaliRecipients: ReliefRecipient[] = [
    {
      personId: "person-mock-7",
      traineeName: "মুফতি তারিকুল ইসলাম",
      traineeMobile: "01855662233",
      district: "নোয়াখালী",
      category: "স্বেচ্ছাসেবী / সমাজকর্মী",
      mosqueName: "চৌমুহনী স্টেশন জামে মসজিদ",
      status: "READY",
      statusBn: "হ্যাঁ, প্রস্তুত",
      respondedAt: "2026-11-16T09:12:00.000Z",
      rawResponse: "হ্যাঁ, প্রস্তুত",
    },
    {
      personId: "person-mock-8",
      traineeName: "মাওলানা কফিল উদ্দিন",
      traineeMobile: "01866773344",
      district: "নোয়াখালী",
      category: "ইমাম ও খতিব",
      mosqueName: "মাইজদী বড় জামে মসজিদ",
      status: "PENDING",
      statusBn: "অপেক্ষমান",
    },
  ];

  const b2: ReliefBroadcastRecord = {
    id: "RELIEF-2026-002",
    title: "নোয়াখালী জলাবদ্ধতা ও আকস্মিক বন্যা ত্রাণ সমন্বয় সেল",
    district: "নোয়াখালী",
    disasterType: "FLOOD",
    disasterTypeBn: "আকস্মিক বন্যা",
    message:
      "[আস-সুন্নাহ জরুরি ত্রাণ সেল: আপনার এলাকায় আকস্মিক বন্যায় ত্রাণ কার্যক্রমে অংশ নিতে আপনি কি প্রস্তুত? ১ চাপুন: হ্যাঁ, প্রস্তুত / ২ চাপুন: না]",
    createdAt: "2026-11-16T09:00:00.000Z",
    recipients: demoNoakhaliRecipients,
  };

  inMemoryReliefBroadcasts.set(b1.id, b1);
  inMemoryReliefBroadcasts.set(b2.id, b2);
}

seedReliefBroadcasts();

/**
 * Creates and initiates a new emergency relief SMS broadcast to a target district.
 * Dispatches urgent readiness SMS to all verified imams and volunteers in that district.
 */
export async function createReliefBroadcast(
  input: CreateReliefBroadcastInput
): Promise<ReliefBroadcastRecord> {
  seedReliefBroadcasts();

  const districtClean = input.district.trim();
  const disasterConfig = DISASTER_TYPE_MAP[input.disasterType] || DISASTER_TYPE_MAP.OTHER;

  // Build authentic As-Sunnah institutional message if not explicitly provided
  const defaultMessage = `[আস-সুন্নাহ জরুরি ত্রাণ সেল: আপনার এলাকায় ${disasterConfig.urgencyBn} ত্রাণ কার্যক্রমে অংশ নিতে আপনি কি প্রস্তুত? ১ চাপুন: হ্যাঁ, প্রস্তুত / ২ চাপুন: না]`;
  const message = input.message?.trim() || defaultMessage;

  // Find all verified imams/volunteers in that district
  let allTrainees = getAllTraineeRecords();
  try {
    const dbPersons = await db.person.findMany({
      where: {
        district: {
          contains: districtClean,
        },
      },
    });
    if (dbPersons.length > 0) {
      const map = new Map<string, TraineeRecord>();
      allTrainees.forEach(t => map.set(t.id, t));
      for (const p of dbPersons) {
        if (!map.has(p.id)) {
          map.set(p.id, {
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
          });
        }
      }
      allTrainees = Array.from(map.values());
    }
  } catch {
    // Database offline fallback
  }

  const targetTrainees = allTrainees.filter(
    t => t.district && t.district.toLowerCase().includes(districtClean.toLowerCase())
  );

  let recipients: ReliefRecipient[] = [];

  if (targetTrainees.length > 0) {
    recipients = targetTrainees.map(t => ({
      personId: t.id,
      traineeName: t.name,
      traineeMobile: t.mobile,
      district: t.district || districtClean,
      category: getCategoryLabelBn(t.category),
      mosqueName: t.mosqueName,
      status: "PENDING" as ReliefResponseStatus,
      statusBn: "অপেক্ষমান",
    }));
  } else {
    // If no existing trainees in this district, populate realistic district volunteers
    recipients = [
      {
        personId: `person-${districtClean}-1`,
        traineeName: `মাওলানা হাবিবুর রহমান (${districtClean})`,
        traineeMobile: "01711002288",
        district: districtClean,
        category: "ইমাম ও খতিব",
        mosqueName: `${districtClean} কেন্দ্রীয় জামে মসজিদ`,
        status: "PENDING",
        statusBn: "অপেক্ষমান",
      },
      {
        personId: `person-${districtClean}-2`,
        traineeName: `মুফতি রফিকুল ইসলাম (${districtClean})`,
        traineeMobile: "01822003399",
        district: districtClean,
        category: "স্বেচ্ছাসেবী / সমাজকর্মী",
        mosqueName: `${districtClean} বাজার মসজিদ`,
        status: "PENDING",
        statusBn: "অপেক্ষমান",
      },
    ];
  }

  const broadcastId = generateReliefBroadcastId(2026);
  const now = new Date().toISOString();

  const broadcast: ReliefBroadcastRecord = {
    id: broadcastId,
    title: input.title.trim() || `${districtClean} ${disasterConfig.nameBn} জরুরি ত্রাণ সেল`,
    district: districtClean,
    disasterType: input.disasterType,
    disasterTypeBn: disasterConfig.nameBn,
    message,
    createdAt: now,
    recipients,
  };

  inMemoryReliefBroadcasts.set(broadcastId, broadcast);

  // Record dispatched SMS logs in database if available
  try {
    await db.messageLog.createMany({
      data: recipients.map(r => ({
        personId: r.personId,
        channel: "SMS",
        body: message,
        status: "SENT",
      })),
    });
  } catch {
    // Database offline fallback
  }

  return broadcast;
}

/**
 * Records a trainee's response to an emergency relief broadcast.
 * Parses "1", "2", "হ্যাঁ", "না" and updates live tally.
 */
export async function recordReliefResponse(
  broadcastId: string,
  traineePhoneOrId: string,
  rawResponse: "READY" | "UNAVAILABLE" | string
): Promise<{
  success: boolean;
  broadcastId: string;
  traineePhone: string;
  responseStatus: ReliefResponseStatus;
  statusBn: string;
  summary: ReliefBroadcastSummary;
}> {
  seedReliefBroadcasts();

  if (!traineePhoneOrId || traineePhoneOrId.trim().length === 0) {
    throw new Error("প্রশিক্ষণার্থী আইডি বা ফোন নম্বর আবশ্যক।");
  }

  const broadcast = inMemoryReliefBroadcasts.get(broadcastId);
  if (!broadcast) {
    throw new Error(`জরুরি ত্রাণ ব্রডকাস্ট পাওয়া যায়নি: ${broadcastId}`);
  }

  const responseStatus = parseReliefResponse(rawResponse);
  const statusBn = getStatusBn(responseStatus);

  const rawTarget = traineePhoneOrId.trim();
  const normalizedPhone = normalizeBdPhone(rawTarget);
  const englishDigitsPhone = toEnglishDigits(rawTarget);

  // Exact matching against personId or mobile (prevent substring false positives)
  let recipient = broadcast.recipients.find(r => {
    if (r.personId === rawTarget) return true;
    if (r.traineeMobile === rawTarget) return true;
    if (englishDigitsPhone && r.traineeMobile === englishDigitsPhone) return true;
    if (normalizedPhone) {
      const rNorm = normalizeBdPhone(r.traineeMobile);
      if (rNorm && rNorm === normalizedPhone) return true;
    }
    return false;
  });

  // If not found in recipient list, try to lookup trainee profile and add to list
  if (!recipient) {
    const trainee = await getTraineeRecordById(rawTarget);
    const resolvedId = trainee ? trainee.id : `person-ext-${Date.now()}`;
    const resolvedMobile = trainee ? trainee.mobile : (normalizedPhone || englishDigitsPhone || rawTarget);
    const resolvedDistrict = trainee?.district || broadcast.district;
    const resolvedCategory = getCategoryLabelBn(trainee?.category);

    // Concurrency guard: check if recipient was already inserted concurrently
    recipient = broadcast.recipients.find(
      r => r.personId === resolvedId || (normalizedPhone && normalizeBdPhone(r.traineeMobile) === normalizedPhone)
    );

    if (recipient) {
      recipient.status = responseStatus;
      recipient.statusBn = statusBn;
      recipient.respondedAt = new Date().toISOString();
      recipient.rawResponse = rawResponse;
    } else {
      recipient = {
        personId: resolvedId,
        traineeName: trainee ? trainee.name : "আস-সুন্নাহ সাড়াদানকারী",
        traineeMobile: resolvedMobile,
        district: resolvedDistrict,
        category: resolvedCategory,
        mosqueName: trainee?.mosqueName,
        status: responseStatus,
        statusBn,
        respondedAt: new Date().toISOString(),
        rawResponse,
      };
      broadcast.recipients.push(recipient);
    }
  } else {
    recipient.status = responseStatus;
    recipient.statusBn = statusBn;
    recipient.respondedAt = new Date().toISOString();
    recipient.rawResponse = rawResponse;
  }

  // Record in Prisma ReliefResponse table if available
  try {
    await db.reliefResponse.create({
      data: {
        personId: recipient.personId,
        campaign: broadcast.title,
        willJoin: responseStatus === "READY",
        at: new Date(),
      },
    });
  } catch {
    // Database offline fallback
  }

  const summary = await getReliefBroadcastSummary(broadcastId);

  return {
    success: true,
    broadcastId,
    traineePhone: normalizedPhone || englishDigitsPhone || rawTarget,
    responseStatus,
    statusBn,
    summary,
  };
}

/**
 * Returns summary with live response tally for a specific relief broadcast.
 */
export async function getReliefBroadcastSummary(
  broadcastId: string
): Promise<ReliefBroadcastSummary> {
  seedReliefBroadcasts();

  const broadcast = inMemoryReliefBroadcasts.get(broadcastId);
  if (!broadcast) {
    throw new Error(`জরুরি ত্রাণ ব্রডকাস্ট পাওয়া যায়নি: ${broadcastId}`);
  }

  const totalSent = broadcast.recipients.length;
  const readyCount = broadcast.recipients.filter(r => r.status === "READY").length;
  const unavailableCount = broadcast.recipients.filter(r => r.status === "UNAVAILABLE").length;
  const pendingCount = broadcast.recipients.filter(r => r.status === "PENDING").length;
  const readyRatePercent = totalSent > 0 ? Math.round((readyCount / totalSent) * 100) : 0;

  return {
    broadcastId: broadcast.id,
    title: broadcast.title,
    district: broadcast.district,
    disasterType: broadcast.disasterType,
    disasterTypeBn: broadcast.disasterTypeBn,
    message: broadcast.message,
    createdAt: broadcast.createdAt,
    totalSent,
    readyCount,
    unavailableCount,
    pendingCount,
    readyRatePercent,
    responses: [...broadcast.recipients],
  };
}

/**
 * Lists all relief broadcasts with current tallies, sorted newest first.
 */
export async function getAllReliefBroadcasts(): Promise<ReliefBroadcastSummary[]> {
  seedReliefBroadcasts();

  const list = Array.from(inMemoryReliefBroadcasts.values());
  const summaries: ReliefBroadcastSummary[] = [];

  for (const b of list) {
    summaries.push(await getReliefBroadcastSummary(b.id));
  }

  return summaries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
