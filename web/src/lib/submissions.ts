import { z } from "zod";
import { db } from "@/lib/db";
import { toEnglishDigits, normalizeBdPhone } from "@/lib/format";
import { adjustTraineePoints, getTraineeRecordById } from "@/lib/trainee";

export type ActivityType =
  | "KHUTBAH"
  | "CLEANUP"
  | "TREE_PLANTING"
  | "ONLINE_CLASS"
  | "HALAQA"
  | "SOCIAL_WORK";

export type SubmissionStatus = "APPROVED" | "PENDING" | "REJECTED";

export interface ActivityMetadata {
  code: ActivityType;
  labelBn: string;
  defaultPoints: number;
  description: string;
}

export const ACTIVITY_CATEGORIES: Record<ActivityType, ActivityMetadata> = {
  KHUTBAH: {
    code: "KHUTBAH",
    labelBn: "খুতবা প্রদান",
    defaultPoints: 5,
    description: "সমসাময়িক ও সংস্কারমূলক জুমার খুতবা পেশ",
  },
  CLEANUP: {
    code: "CLEANUP",
    labelBn: "মসজিদ ও আঙিনা পরিচ্ছন্নতা",
    defaultPoints: 20,
    description: "মসজিদ, ওজুখানা ও আঙিনা পরিষ্কার-পরিচ্ছন্নকরণ কর্মসূচি",
  },
  TREE_PLANTING: {
    code: "TREE_PLANTING",
    labelBn: "বৃক্ষরোপণ কর্মসূচি",
    defaultPoints: 20,
    description: "মসজিদ প্রাঙ্গণে ও এলাকায় ফলদ ও ঔষধি গাছ রোপণ",
  },
  ONLINE_CLASS: {
    code: "ONLINE_CLASS",
    labelBn: "অনলাইন ক্লাস উপস্থিতি",
    defaultPoints: 20,
    description: "কেন্দ্রীয় লাইভ ক্লাস ও ফলো-আপ কর্মশালায় অংশগ্রহণ",
  },
  HALAQA: {
    code: "HALAQA",
    labelBn: "দ্বীনি তা'লিম ও হালাকা",
    defaultPoints: 15,
    description: "মুসাল্লি ও যুবকদের নিয়ে কুরআন-হাদিসের তা'লিম ও হালাকা",
  },
  SOCIAL_WORK: {
    code: "SOCIAL_WORK",
    labelBn: "সমাজসেবা ও ত্রাণ কার্যক্রম",
    defaultPoints: 10,
    description: "অসহায়দের সহায়তা, ত্রাণ বিতরণ ও সামাজিক খেদমত",
  },
};

export interface SubmissionRecord {
  id: string; // SUB-YYYY-XXXX
  personId: string;
  traineeName: string;
  traineeMobile: string;
  activityType: ActivityType;
  title: string;
  date: string; // ISO string
  venueName: string; // মসজিদ/স্থানের নাম
  district: string;
  points: number;
  status: SubmissionStatus;
  notes: string;
  photos: string[]; // base64 or image URLs
  createdAt: string; // ISO string
  adminFeedback?: string;
  reviewedAt?: string;
}

export const CreateSubmissionSchema = z.object({
  personId: z.string().min(1, "প্রশিক্ষণার্থী আইডি আবশ্যক"),
  activityType: z.enum([
    "KHUTBAH",
    "CLEANUP",
    "TREE_PLANTING",
    "ONLINE_CLASS",
    "HALAQA",
    "SOCIAL_WORK",
  ], {
    message: "সঠিক কার্যক্রম ক্যাটাগরি নির্বাচন করুন",
  }),
  title: z.string().trim().min(3, "কার্যক্রমের শিরোনাম ন্যূনতম ৩ অক্ষরের হতে হবে"),
  date: z.string().min(1, "কার্যক্রমের তারিখ নির্বাচন করুন"),
  venueName: z.string().trim().min(2, "মসজিদ বা ভেন্যুর নাম প্রদান করুন"),
  district: z.string().optional().default("ঢাকা"),
  points: z.number().int().positive().optional(),
  status: z.enum(["APPROVED", "PENDING", "REJECTED"]).optional().default("PENDING"),
  notes: z.string().optional().default(""),
  photos: z.array(z.string()).optional().default([]),
  traineeName: z.string().optional(),
  traineeMobile: z.string().optional(),
});

export type CreateSubmissionInput = z.input<typeof CreateSubmissionSchema>;

// Auto-increment sequence counter
let submissionSeqCounter = 100;

/**
 * Generates canonical submission ID matching SUB-YYYY-XXXX
 */
export function generateSubmissionId(
  year: number | string = 2026,
  sequence?: number | string
): string {
  const enYear = toEnglishDigits(String(year));
  if (sequence !== undefined) {
    const enSeq = toEnglishDigits(String(sequence)).padStart(4, "0");
    return `SUB-${enYear}-${enSeq}`;
  }
  submissionSeqCounter += 1;
  const enSeq = String(submissionSeqCounter).padStart(4, "0");
  return `SUB-${enYear}-${enSeq}`;
}

// In-memory submissions store
const inMemorySubmissions = new Map<string, SubmissionRecord>();

/**
 * Seeds authentic field activity submissions
 */
function seedSubmissions() {
  if (inMemorySubmissions.size > 0) return;

  const demoItems: Array<Omit<SubmissionRecord, "id"> & { idSeq: number }> = [
    {
      idSeq: 101,
      personId: "person-mock-1",
      traineeName: "মুফতি আব্দুর রহমান",
      traineeMobile: "01711223344",
      activityType: "CLEANUP",
      title: "মসজিদ ও প্রাঙ্গণ পরিচ্ছন্নতা অভিযান",
      venueName: "বায়তুল মামুর জামে মসজিদ",
      district: "কুড়িগ্রাম",
      date: "2026-11-10T10:00:00.000Z",
      points: 20,
      status: "APPROVED",
      notes: "মুসাল্লি ও যুবকদের নিয়ে মসজিদ ও ওজুখানা সার্বিক পরিষ্কার-পরিচ্ছন্ন করা হয়।",
      photos: [
        "https://assunnah.foundation/images/events/imam-training-closing-ceremony.jpg",
      ],
      createdAt: "2026-11-10T12:30:00.000Z",
      reviewedAt: "2026-11-10T15:00:00.000Z",
      adminFeedback: "মাশাআল্লাহ, চমৎকার উদ্যোগ। পরিষ্কার-পরিচ্ছন্নতা ঈমানের অঙ্গ।",
    },
    {
      idSeq: 102,
      personId: "person-mock-1",
      traineeName: "মুফতি আব্দুর রহমান",
      traineeMobile: "01711223344",
      activityType: "KHUTBAH",
      title: "সমাজে মাদক ও অপচয়ের বিরুদ্ধে সচেতনতামূলক জুমার খুতবা",
      venueName: "বায়তুল মামুর জামে মসজিদ",
      district: "কুড়িগ্রাম",
      date: "2026-11-14T07:30:00.000Z",
      points: 5,
      status: "APPROVED",
      notes: "আস-সুন্নাহ নির্দেশিত খুতবা মডিউল অনুযায়ী যুব সমাজ ও অভিভাবকদের উদ্দেশ্যে আলোচনা করা হয়।",
      photos: [],
      createdAt: "2026-11-14T09:00:00.000Z",
      reviewedAt: "2026-11-14T11:20:00.000Z",
    },
    {
      idSeq: 103,
      personId: "person-mock-1",
      traineeName: "মুফতি আব্দুর রহমান",
      traineeMobile: "01711223344",
      activityType: "TREE_PLANTING",
      title: "মসজিদ প্রাঙ্গণে ২৫টি ফলদ ও ঔষধি বৃক্ষরোপণ",
      venueName: "রানীগঞ্জ কেন্দ্রীয় ঈদগাহ ও মসজিদ মাঠ",
      district: "কুড়িগ্রাম",
      date: "2026-11-17T11:00:00.000Z",
      points: 20,
      status: "PENDING",
      notes: "স্থানীয় মাদরাসার ছাত্রদের সাথে নিয়ে নিম, আমলকি ও কৃষ্ণচূড়া গাছের চারা রোপণ ও সুরক্ষাবেষ্টনী নির্মাণ।",
      photos: [],
      createdAt: "2026-11-17T12:00:00.000Z",
    },
    {
      idSeq: 201,
      personId: "person-mock-2",
      traineeName: "মাওলানা মাহমুদুল হাসান",
      traineeMobile: "01822334455",
      activityType: "HALAQA",
      title: "যুবকদের নিয়ে সাপ্তাহিক সহমর্মিতা ও হালাল উপার্জন হালাকা",
      venueName: "হাওর কেন্দ্রীয় জামে মসজিদ",
      district: "সুনামগঞ্জ",
      date: "2026-11-12T16:00:00.000Z",
      points: 15,
      status: "APPROVED",
      notes: "রিয়াযুস সলেহীন থেকে সহমর্মিতা, হালাল রুজি ও সুদ বর্জন নিয়ে আলোচনা। ৩৫ জন যুবক উপস্থিত ছিলেন।",
      photos: [],
      createdAt: "2026-11-12T17:30:00.000Z",
      reviewedAt: "2026-11-13T08:15:00.000Z",
    },
    {
      idSeq: 202,
      personId: "person-mock-2",
      traineeName: "মাওলানা মাহমুদুল হাসান",
      traineeMobile: "01822334455",
      activityType: "SOCIAL_WORK",
      title: "হাওরাঞ্চলে বন্যাপরবর্তী দুর্গত পরিবারের মাঝে জরুরি ওষুধ ও শুকনো খাবার বিতরণ",
      venueName: "উত্তর বড়দল ইউনিয়ন পরিষদ সংলগ্ন মাঠ",
      district: "সুনামগঞ্জ",
      date: "2026-11-16T09:00:00.000Z",
      points: 10,
      status: "PENDING",
      notes: "২৫টি পরিবারের মাঝে পানি বিশুদ্ধকরণ ট্যাবলেট, ওরস্যালাইন ও প্রয়োজনীয় শুকনো খাবার পৌঁছে দেওয়া হয়েছে।",
      photos: [],
      createdAt: "2026-11-16T11:00:00.000Z",
    },
    {
      idSeq: 301,
      personId: "person-mock-3",
      traineeName: "মাওলানা আব্দুল কুদ্দুস",
      traineeMobile: "01933445566",
      activityType: "ONLINE_CLASS",
      title: "দাওয়াহ ও আধুনিক সমাজ সংস্কার অনলাইন ক্লাসে সক্রিয় অংশগ্রহণ",
      venueName: "দারুল উলুম মাদরাসা মিলনায়তন",
      district: "ঢাকা",
      date: "2026-11-05T14:00:00.000Z",
      points: 20,
      status: "APPROVED",
      notes: "শায়খ আহমাদুল্লাহর লাইভ অনলাইন কর্মশালায় অংশগ্রহণ ও নোট সংগ্রহ।",
      photos: [],
      createdAt: "2026-11-05T16:00:00.000Z",
      reviewedAt: "2026-11-05T18:00:00.000Z",
    },
    {
      idSeq: 302,
      personId: "person-mock-3",
      traineeName: "মাওলানা আব্দুল কুদ্দুস",
      traineeMobile: "01933445566",
      activityType: "CLEANUP",
      title: "মাদরাসা ও মসজিদ প্রাঙ্গণে ডেঙ্গু প্রতিরোধে পরিচ্ছন্নতা কর্মসূচি",
      venueName: "দারুল উলুম মাদরাসা",
      district: "ঢাকা",
      date: "2026-11-18T10:00:00.000Z",
      points: 20,
      status: "PENDING",
      notes: "জমে থাকা বৃষ্টির পানি নিষ্কাশন এবং আশপাশের ঝোপঝাড় পরিষ্কার করা হয়েছে।",
      photos: [],
      createdAt: "2026-11-18T11:45:00.000Z",
    },
    {
      idSeq: 501,
      personId: "person-mock-5",
      traineeName: "মাওলানা জসিম উদ্দিন",
      traineeMobile: "01811998877",
      activityType: "SOCIAL_WORK",
      title: "আকস্মিক বন্যায় পানিবন্দী পরিবারের মাঝে জরুরি শুকনো খাবার ও স্যালাইন বিতরণ",
      venueName: "ছাগলনাইয়া কেন্দ্রীয় জামে মসজিদ প্রাঙ্গণ",
      district: "ফেনী",
      date: "2026-11-15T08:30:00.000Z",
      points: 20,
      status: "APPROVED",
      notes: "স্থানীয় যুব স্বেচ্ছাসেবকদের নিয়ে ৫০টি পরিবারের কাছে নৌকাযোগে খাদ্য সামগ্রী পৌঁছে দেওয়া হয়।",
      photos: [],
      createdAt: "2026-11-15T11:00:00.000Z",
      reviewedAt: "2026-11-15T14:00:00.000Z",
      adminFeedback: "আল্লাহ আপনাদের খেদমত কবুল করুন। দুর্যোগকালীন আদর্শ উদ্যোগ।",
    },
    {
      idSeq: 901,
      personId: "person-mock-9",
      traineeName: "মাওলানা ইমরান আহমেদ",
      traineeMobile: "01799881122",
      activityType: "CLEANUP",
      title: "পাহাড়ি ঢলপরবর্তী মসজিদ ও অজুর স্থান পুনরুদ্ধার ও পরিচ্ছন্নতা",
      venueName: "জাফলং বাজার জামে মসজিদ",
      district: "সিলেট",
      date: "2026-11-14T10:00:00.000Z",
      points: 20,
      status: "APPROVED",
      notes: "প্লাবিত হওয়া মসজিদের কাদা ও বালু পরিষ্কার করে পুনরায় নামাজের উপযোগী করা হয়েছে।",
      photos: [
        "https://assunnah.foundation/images/events/sheikh-ahmadullah-dawah-training.jpg",
      ],
      createdAt: "2026-11-14T13:00:00.000Z",
      reviewedAt: "2026-11-14T16:00:00.000Z",
      adminFeedback: "মাশাআল্লাহ, দ্রুততম সময়ে ঘর আল্লাহর ঘর পরিষ্কার করায় জাযাকাল্লাহু খাইরান।",
    },
  ];

  demoItems.forEach(item => {
    const id = generateSubmissionId(2026, item.idSeq);
    const record: SubmissionRecord = {
      id,
      personId: item.personId,
      traineeName: item.traineeName,
      traineeMobile: item.traineeMobile,
      activityType: item.activityType,
      title: item.title,
      date: item.date,
      venueName: item.venueName,
      district: item.district,
      points: item.points,
      status: item.status,
      notes: item.notes,
      photos: item.photos,
      createdAt: item.createdAt,
      adminFeedback: item.adminFeedback,
      reviewedAt: item.reviewedAt,
    };
    inMemorySubmissions.set(id, record);
  });
}

seedSubmissions();

/**
 * Creates a new field activity submission.
 * Calculates points from category if not explicitly provided.
 * If status is APPROVED, auto-awards points to the trainee profile.
 */
export async function createSubmission(
  rawInput: CreateSubmissionInput
): Promise<SubmissionRecord> {
  seedSubmissions();
  const input = CreateSubmissionSchema.parse(rawInput);

  // Look up trainee info if not provided
  let traineeName = input.traineeName;
  let traineeMobile = input.traineeMobile;
  let district = input.district || "ঢাকা";

  if (!traineeName || !traineeMobile) {
    const trainee = await getTraineeRecordById(input.personId);
    if (trainee) {
      traineeName = traineeName || trainee.name;
      traineeMobile = traineeMobile || trainee.mobile;
      if (!input.district && trainee.district) {
        district = trainee.district;
      }
    }
  }

  // Normalize trainee phone to English digits
  const cleanMobile = traineeMobile
    ? normalizeBdPhone(traineeMobile) || toEnglishDigits(traineeMobile)
    : "";

  // Normalize date: support Bengali digits and convert to standard ISO string
  const cleanDateStr = toEnglishDigits(input.date.trim());
  let dateIso: string;
  const parsedDate = new Date(cleanDateStr);
  if (!isNaN(parsedDate.getTime())) {
    dateIso = parsedDate.toISOString();
  } else {
    dateIso = new Date().toISOString();
  }

  // Calculate default points for category if not specified
  const points = input.points || ACTIVITY_CATEGORIES[input.activityType]?.defaultPoints || 10;
  const id = generateSubmissionId(2026);
  const now = new Date().toISOString();

  const submission: SubmissionRecord = {
    id,
    personId: input.personId,
    traineeName: traineeName || "আস-সুন্নাহ প্রশিক্ষণার্থী",
    traineeMobile: cleanMobile,
    activityType: input.activityType,
    title: input.title,
    date: dateIso,
    venueName: input.venueName,
    district,
    points,
    status: input.status || "PENDING",
    notes: input.notes || "",
    photos: input.photos || [],
    createdAt: now,
  };

  inMemorySubmissions.set(id, submission);

  // Auto-award points if initially approved
  if (submission.status === "APPROVED") {
    await adjustTraineePoints(submission.personId, submission.points);
  }

  // Sync to database if available
  try {
    await db.submission.create({
      data: {
        id: submission.id,
        personId: submission.personId,
        activityCode: submission.activityType,
        note: `${submission.title} - ${submission.venueName}. ${submission.notes}`,
        photoUrls: submission.photos,
        pointsAwarded: submission.points,
        status: submission.status,
        month: submission.date.slice(0, 7),
        createdAt: new Date(submission.createdAt),
      },
    });
  } catch {
    // Database offline
  }

  return submission;
}

/**
 * Retrieves all submissions by a specific trainee ID, sorted newest first.
 */
export async function getSubmissionsByPerson(personId: string): Promise<SubmissionRecord[]> {
  seedSubmissions();
  const results: SubmissionRecord[] = [];

  for (const sub of inMemorySubmissions.values()) {
    if (sub.personId === personId) {
      // STRICT SECURITY INVARIANT: never leak internalStars, redFlag, or callLogs
      const cleanRecord: SubmissionRecord = {
        id: sub.id,
        personId: sub.personId,
        traineeName: sub.traineeName,
        traineeMobile: sub.traineeMobile,
        activityType: sub.activityType,
        title: sub.title,
        date: sub.date,
        venueName: sub.venueName,
        district: sub.district,
        points: sub.points,
        status: sub.status,
        notes: sub.notes,
        photos: [...sub.photos],
        createdAt: sub.createdAt,
        adminFeedback: sub.adminFeedback,
        reviewedAt: sub.reviewedAt,
      };
      results.push(cleanRecord);
    }
  }

  // Fallback / sync from DB if available
  if (results.length === 0) {
    try {
      const dbSubs = await db.submission.findMany({
        where: { personId },
        orderBy: { createdAt: "desc" },
      });

      for (const d of dbSubs) {
        const actType = (d.activityCode as ActivityType) || "CLEANUP";
        const record: SubmissionRecord = {
          id: d.id,
          personId: d.personId,
          traineeName: "আস-সুন্নাহ প্রশিক্ষণার্থী",
          traineeMobile: "",
          activityType: actType,
          title: d.note ? d.note.split(" - ")[0] : "মাঠপর্যায়ের কার্যক্রম",
          date: d.createdAt.toISOString(),
          venueName: "স্থানীয় মসজিদ",
          district: "বাংলাদেশ",
          points: d.pointsAwarded,
          status: (d.status as SubmissionStatus) || "APPROVED",
          notes: d.note || "",
          photos: d.photoUrls,
          createdAt: d.createdAt.toISOString(),
        };
        inMemorySubmissions.set(record.id, record);
        results.push(record);
      }
    } catch {
      // DB offline
    }
  }

  return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Retrieves a single submission by its ID.
 */
export async function getSubmissionById(id: string): Promise<SubmissionRecord | null> {
  seedSubmissions();
  let sub = inMemorySubmissions.get(id);

  if (!sub) {
    try {
      const d = await db.submission.findUnique({ where: { id } });
      if (d) {
        sub = {
          id: d.id,
          personId: d.personId,
          traineeName: "আস-সুন্নাহ প্রশিক্ষণার্থী",
          traineeMobile: "",
          activityType: (d.activityCode as ActivityType) || "CLEANUP",
          title: d.note ? d.note.split(" - ")[0] : "মাঠপর্যায়ের কার্যক্রম",
          date: d.createdAt.toISOString(),
          venueName: "স্থানীয় মসজিদ",
          district: "বাংলাদেশ",
          points: d.pointsAwarded,
          status: (d.status as SubmissionStatus) || "APPROVED",
          notes: d.note || "",
          photos: d.photoUrls,
          createdAt: d.createdAt.toISOString(),
        };
        inMemorySubmissions.set(sub.id, sub);
      }
    } catch {
      // DB offline
    }
  }

  return sub ? { ...sub } : null;
}

export interface SubmissionFilter {
  type?: string;
  district?: string;
  status?: string;
  search?: string;
}

/**
 * Retrieves all submissions matching optional filters (type, district, status, search).
 */
export async function getAllSubmissions(filter?: SubmissionFilter): Promise<SubmissionRecord[]> {
  seedSubmissions();
  let list = Array.from(inMemorySubmissions.values());

  if (filter?.type && filter.type !== "ALL") {
    list = list.filter(s => s.activityType === filter.type);
  }

  if (filter?.status && filter.status !== "ALL") {
    list = list.filter(s => s.status === filter.status);
  }

  if (filter?.district && filter.district !== "ALL") {
    const qDistrict = filter.district.trim().toLowerCase();
    list = list.filter(s => s.district.toLowerCase().includes(qDistrict));
  }

  if (filter?.search) {
    const rawQ = filter.search.trim().toLowerCase();
    const enQ = toEnglishDigits(rawQ);
    list = list.filter(
      s =>
        s.title.toLowerCase().includes(rawQ) ||
        s.venueName.toLowerCase().includes(rawQ) ||
        s.district.toLowerCase().includes(rawQ) ||
        s.traineeName.toLowerCase().includes(rawQ) ||
        s.notes.toLowerCase().includes(rawQ) ||
        s.traineeMobile.includes(enQ) ||
        s.traineeMobile.includes(rawQ) ||
        s.id.toLowerCase().includes(enQ) ||
        s.id.toLowerCase().includes(rawQ)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Updates submission status (APPROVED, PENDING, REJECTED) with optional feedback.
 * Auto-awards or deducts points on the trainee profile accordingly.
 */
export async function updateSubmissionStatus(
  id: string,
  newStatus: SubmissionStatus,
  adminFeedback?: string
): Promise<{
  submission: SubmissionRecord;
  pointsDelta: number;
  newTotalPoints: number;
}> {
  seedSubmissions();
  let sub = inMemorySubmissions.get(id);
  if (!sub) {
    sub = (await getSubmissionById(id)) || undefined;
  }
  if (!sub) {
    throw new Error(`কার্যক্রম পাওয়া যায়নি: ${id}`);
  }

  const oldStatus = sub.status;
  let pointsDelta = 0;

  // Calculate points delta
  if (oldStatus !== "APPROVED" && newStatus === "APPROVED") {
    pointsDelta = sub.points;
  } else if (oldStatus === "APPROVED" && newStatus !== "APPROVED") {
    pointsDelta = -sub.points;
  }

  // Update record fields
  sub.status = newStatus;
  if (adminFeedback !== undefined) {
    sub.adminFeedback = adminFeedback;
  }
  sub.reviewedAt = new Date().toISOString();

  // Update trainee points if there was a delta
  let newTotalPoints = 0;
  if (pointsDelta !== 0) {
    const adjustRes = await adjustTraineePoints(sub.personId, pointsDelta);
    newTotalPoints = adjustRes.newTotalPoints;
  } else {
    const trainee = await getTraineeRecordById(sub.personId);
    newTotalPoints = trainee ? trainee.totalPoints : 0;
  }

  // Sync to DB if available
  try {
    await db.submission.update({
      where: { id: sub.id },
      data: {
        status: newStatus,
      },
    });
  } catch {
    // DB offline
  }

  return {
    submission: { ...sub },
    pointsDelta,
    newTotalPoints,
  };
}
