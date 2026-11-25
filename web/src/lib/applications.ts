import { z } from "zod";
import { PersonCategory, ApplicationStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { normalizeBdPhone } from "@/lib/format";
import { evaluateApplication, generateApplicationNumber, generateQrToken, AutoScreenResult } from "@/lib/screening";
import { getEventBySlug } from "@/lib/events-data";
import { SAMPLE_EVENTS } from "@/lib/sample-data";

/**
 * Public sanitized applicant demographic profile
 * Strictly excludes admin-only internal fields (internalStars, redFlag, callLogs)
 */
export interface DemographicProfile {
  id?: string;
  name: string;
  mobile: string;
  category: PersonCategory;
  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  unionName?: string | null;
  mosqueName?: string | null;
}

export interface ApplicationRecord {
  id: string;
  number: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  personId: string;
  applicant: DemographicProfile;
  answers: Record<string, unknown>;
  status: ApplicationStatus;
  autoScreenResult: AutoScreenResult;
  qrToken: string;
  checkedInAt: string | null;
  createdAt: string;
}

export interface SmsDispatchLog {
  id: string;
  recipientMobile: string;
  recipientName: string;
  body: string;
  status: "DELIVERED" | "SENT" | "FAILED";
  sentAt: string;
}

/**
 * Zod validation schema for open application submission
 */
export const ApplicationSubmissionSchema = z.object({
  eventSlug: z.string().min(1, "ইভেন্ট নির্বাচন করা আবশ্যক"),
  name: z.string().trim().min(2, "পূর্ণ নাম ন্যূনতম ২ অক্ষরের হতে হবে"),
  mobile: z.string().trim().transform(normalizeBdPhone).refine(
    val => /^01[3-9]\d{8}$/.test(val),
    "সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678 বা ০১৭১২৩৪৫৬৭৮)"
  ),
  category: z.nativeEnum(PersonCategory, {
    message: "সঠিক ক্যাটাগরি বা পদবি নির্বাচন করুন",
  }),
  division: z.string().min(1, "বিভাগ নির্বাচন করুন"),
  district: z.string().min(1, "জেলা নির্বাচন করুন"),
  upazila: z.string().optional().default(""),
  unionName: z.string().optional().default(""),
  mosqueName: z.string().min(2, "মসজিদ বা প্রতিষ্ঠানের নাম প্রদান করুন"),
  answers: z.object({
    qualification: z.string().min(1, "শিক্ষাগত যোগ্যতা নির্বাচন করুন"),
    experienceYears: z.union([z.string(), z.number()]).optional().default("২ থেকে ৫ বছর"),
    age: z.union([z.string(), z.number()]).optional(),
    motivation: z.string().optional().default(""),
    hasSmartphone: z.union([z.boolean(), z.string()]).optional().default(true),
  }).catchall(z.unknown()),
});

export type ApplicationSubmissionInput = z.input<typeof ApplicationSubmissionSchema>;

/**
 * Extracts raw QR token from URL, query parameter, or plain token string.
 * Supports hardware 2D barcode scanner gun inputs that type the full verification URL.
 */
export function extractQrToken(input: string): string {
  const trimmed = input.trim();
  if (trimmed.includes("token=")) {
    try {
      const url = new URL(trimmed.startsWith("http") ? trimmed : `https://assunnah.foundation/${trimmed.replace(/^\/+/, "")}`);
      const t = url.searchParams.get("token");
      if (t) return t.trim();
    } catch {
      const match = trimmed.match(/[?&]token=([^&#\s]+)/);
      if (match && match[1]) return decodeURIComponent(match[1]).trim();
    }
  }
  return trimmed;
}

// =========================================================================
// IN-MEMORY STORE FALLBACK (when PostgreSQL is disconnected/offline)
// =========================================================================
const inMemoryPersons: Map<string, DemographicProfile & { id: string; internalStars?: number; redFlag?: boolean }> = new Map();
const inMemoryApplications: Map<string, ApplicationRecord> = new Map();
const inMemorySmsLogs: SmsDispatchLog[] = [];

// Seed authentic demo applications into memory store (STRICT SECURITY: locked down in production)
export function seedInitialStore() {
  if (process.env.NODE_ENV === "production") return;
  if (inMemoryApplications.size > 0) return;

  const mockApplicants: Array<{
    name: string;
    mobile: string;
    category: PersonCategory;
    division: string;
    district: string;
    upazila: string;
    unionName: string;
    mosqueName: string;
    qualification: string;
    experienceYears: string;
    motivation: string;
    status: ApplicationStatus;
  }> = [
    {
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
      category: PersonCategory.IMAM,
      division: "রংপুর",
      district: "কুড়িগ্রাম",
      upazila: "চিলমারী",
      unionName: "রানীগঞ্জ",
      mosqueName: "বায়তুল মামুর জামে মসজিদ",
      qualification: "দাওরায়ে হাদিস",
      experienceYears: "৭ বছর",
      motivation: "চরের সাধারণ মানুষের মাঝে বিশুদ্ধ আকিদা ও সুন্নাহর সঠিক দাওয়াহ পৌঁছে দেওয়ার লক্ষ্যে।",
      status: ApplicationStatus.SHORTLISTED,
    },
    {
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
      category: PersonCategory.IMAM,
      division: "সিলেট",
      district: "সুনামগঞ্জ",
      upazila: "তাহিরপুর",
      unionName: "উত্তর বড়দল",
      mosqueName: "হাওর কেন্দ্রীয় জামে মসজিদ",
      qualification: "দাওরায়ে হাদিস ও তাফসির",
      experienceYears: "৪ বছর",
      motivation: "জুমার খুতবায় সামাজিক সংস্কার ও দুর্যোগ প্রস্তুতি বিষয়ে মানুষকে সচেতন করতে চাই।",
      status: ApplicationStatus.SHORTLISTED,
    },
    {
      name: "মাওলানা আব্দুল কুদ্দুস",
      mobile: "01933445566",
      category: PersonCategory.MADRASA_TEACHER,
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "সাভার",
      unionName: "বিরুলিয়া",
      mosqueName: "দারুল উলুম মাদরাসা",
      qualification: "কামিল (হাদিস)",
      experienceYears: "৫ বছর",
      motivation: "ছাত্রদের মাঝে আধুনিক দাওয়াহ কর্মশালা পরিচালনার দক্ষতা অর্জনের জন্য।",
      status: ApplicationStatus.SELECTED,
    },
    {
      name: "মুহাম্মদ রফিকুল ইসলাম",
      mobile: "01644556677",
      category: PersonCategory.VOLUNTEER,
      division: "চট্টগ্রাম",
      district: "কক্সবাজার",
      upazila: "চকোরিয়া",
      unionName: "চিরিঙ্গা",
      mosqueName: "আস-সুন্নাহ স্থানীয় সমাজকল্যাণ কেন্দ্র",
      qualification: "স্নাতক (ডিগ্রি)",
      experienceYears: "৩ বছর",
      motivation: "দুর্যোগকালীন জরুরি ত্রাণ বিতরণ ও মানবিক কার্যক্রমে সক্রিয় অংশগ্রহণের অভিজ্ঞতা।",
      status: ApplicationStatus.PENDING,
    },
    {
      name: "মাওলানা তারিকুল ইসলাম",
      mobile: "01555667788",
      category: PersonCategory.MADRASA_MANAGER,
      division: "খুলনা",
      district: "সাতক্ষীরা",
      upazila: "শ্যামনগর",
      unionName: "বুড়িগোয়ালিনী",
      mosqueName: "আল-হেরা ইসলামিয়া মাদরাসা",
      qualification: "দাওরায়ে হাদিস",
      experienceYears: "৬ বছর",
      motivation: "উপকূলীয় চরাঞ্চলে মাদরাসার শিক্ষা ও প্রাতিষ্ঠানিক ব্যবস্থাপনা আধুনিকায়ন।",
      status: ApplicationStatus.SHORTLISTED,
    },
    {
      name: "জনাব আব্দুল করিম",
      mobile: "01788990011",
      category: PersonCategory.OTHER,
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "মিরপুর",
      unionName: "মিরপুর-১",
      mosqueName: "স্থানীয় যুব সমাজকল্যাণ সংঘ",
      qualification: "এইচএসসি",
      experienceYears: "১ বছর",
      motivation: "দ্বীনি শিক্ষার প্রতি ভালোবাসা ও খেদমতের আগ্রহ।",
      status: ApplicationStatus.WAITLIST,
    },
  ];

  const targetEvent = SAMPLE_EVENTS[0];
  const year = 2027;

  mockApplicants.forEach((item, idx) => {
    const personId = `person-mock-${idx + 1}`;
    const pProfile: DemographicProfile & { id: string } = {
      id: personId,
      name: item.name,
      mobile: item.mobile,
      category: item.category,
      division: item.division,
      district: item.district,
      upazila: item.upazila,
      unionName: item.unionName,
      mosqueName: item.mosqueName,
    };
    inMemoryPersons.set(item.mobile, pProfile);

    const answers = {
      qualification: item.qualification,
      experienceYears: item.experienceYears,
      motivation: item.motivation,
      hasSmartphone: true,
    };

    const screening = evaluateApplication(
      {
        category: item.category,
        district: item.district,
        division: item.division,
        answers,
      },
      { title: targetEvent.title, type: targetEvent.type }
    );

    const appNumber = `ASF-${year}-00${idx + 1}0${idx + 4}`;
    const qrToken = `asf_pass_mock_${idx + 1}_${item.mobile.slice(-4)}`;

    const appRecord: ApplicationRecord = {
      id: `app-mock-${idx + 1}`,
      number: appNumber,
      eventId: targetEvent.id,
      eventSlug: targetEvent.slug,
      eventTitle: targetEvent.title,
      personId,
      applicant: pProfile,
      answers,
      status: item.status,
      autoScreenResult: screening,
      qrToken,
      checkedInAt: idx === 2 ? new Date(Date.now() - 3600000).toISOString() : null, // idx 2 is checked in
      createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
    };

    inMemoryApplications.set(appNumber, appRecord);
    inMemoryApplications.set(qrToken, appRecord); // index by token too

    // Add initial SMS logs for SELECTED or SHORTLISTED
    if (item.status === ApplicationStatus.SELECTED || item.status === ApplicationStatus.SHORTLISTED) {
      inMemorySmsLogs.push({
        id: `sms-init-${idx + 1}`,
        recipientMobile: item.mobile,
        recipientName: item.name,
        body: `অভিনন্দন ${item.name}! আস-সুন্নাহ ফাউন্ডেশনের '${targetEvent.title}' কোর্সে আপনার আবেদন গৃহীত হয়েছে। ডিজিটাল প্রবেশপত্র: https://assunnah.foundation/checkin?token=${qrToken}`,
        status: "DELIVERED",
        sentAt: new Date(Date.now() - idx * 3600000).toISOString(),
      });
    }
  });
}

if (process.env.NODE_ENV !== "production") {
  seedInitialStore();
}

/**
 * Resets application memory store (useful for tests to verify production lockdown)
 */
export function resetApplicationStoreForTest(): void {
  inMemoryPersons.clear();
  inMemoryApplications.clear();
  inMemorySmsLogs.length = 0;
  if (process.env.NODE_ENV !== "production") {
    seedInitialStore();
  }
}

/**
 * 1-Click Demographic Pre-fill Lookup
 * Looks up existing applicant by mobile number.
 * Returns only safe public demographic fields (name, mobile, category, location, mosque).
 * Strictly guarantees internalStars, redFlag, and admin logs are never leaked.
 */
export async function lookupPersonByMobile(rawMobile: string): Promise<{
  found: boolean;
  person?: DemographicProfile;
}> {
  const mobile = normalizeBdPhone(rawMobile);
  if (!mobile || mobile.length < 11) {
    return { found: false };
  }

  // 1. Try PostgreSQL Database
  try {
    const p = await db.person.findUnique({
      where: { mobile },
      select: {
        id: true,
        name: true,
        mobile: true,
        category: true,
        division: true,
        district: true,
        upazila: true,
        unionName: true,
        mosqueName: true,
      },
    });

    if (p) {
      return {
        found: true,
        person: {
          id: p.id,
          name: p.name,
          mobile: p.mobile,
          category: p.category,
          division: p.division,
          district: p.district,
          upazila: p.upazila,
          unionName: p.unionName,
          mosqueName: p.mosqueName,
        },
      };
    }
  } catch {
    // Database offline, use memory fallback
  }

  // 2. Try In-Memory Store
  const mem = inMemoryPersons.get(mobile);
  if (mem) {
    return {
      found: true,
      person: {
        id: mem.id,
        name: mem.name,
        mobile: mem.mobile,
        category: mem.category,
        division: mem.division,
        district: mem.district,
        upazila: mem.upazila,
        unionName: mem.unionName,
        mosqueName: mem.mosqueName,
      },
    };
  }

  return { found: false };
}

/**
 * Creates and evaluates a new Application
 */
export async function createApplication(input: ApplicationSubmissionInput): Promise<{
  success: boolean;
  application: ApplicationRecord;
}> {
  // Validate input
  const validated = ApplicationSubmissionSchema.parse(input);

  // Fetch event
  const event = await getEventBySlug(validated.eventSlug);
  const eventTitle = event?.title || "আস-সুন্নাহ প্রশিক্ষণ কোর্স";
  const eventId = event?.id || `ev-${validated.eventSlug}`;

  // Evaluate candidate with auto-screening engine
  const autoScreenResult = evaluateApplication(
    {
      category: validated.category,
      district: validated.district,
      division: validated.division,
      answers: validated.answers,
    },
    { title: eventTitle, type: event?.type, eligibility: event?.eligibility }
  );

  const applicationNumber = generateApplicationNumber(2027);
  const qrToken = generateQrToken();

  // Create or update demographic profile
  const personProfile: DemographicProfile & { id: string } = {
    id: `person-${Date.now()}`,
    name: validated.name,
    mobile: validated.mobile,
    category: validated.category,
    division: validated.division,
    district: validated.district,
    upazila: validated.upazila || "",
    unionName: validated.unionName || "",
    mosqueName: validated.mosqueName,
  };

  // Determine initial application status based on screening recommendation
  let initialStatus: ApplicationStatus = ApplicationStatus.PENDING;
  if (autoScreenResult.recommendation === "SHORTLISTED") {
    initialStatus = ApplicationStatus.SHORTLISTED;
  } else if (autoScreenResult.recommendation === "WAITLIST") {
    initialStatus = ApplicationStatus.WAITLIST;
  }

  const appRecord: ApplicationRecord = {
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    number: applicationNumber,
    eventId,
    eventSlug: validated.eventSlug,
    eventTitle,
    personId: personProfile.id,
    applicant: personProfile,
    answers: validated.answers,
    status: initialStatus,
    autoScreenResult,
    qrToken,
    checkedInAt: null,
    createdAt: new Date().toISOString(),
  };

  // Try saving to Prisma DB
  try {
    const person = await db.person.upsert({
      where: { mobile: validated.mobile },
      update: {
        name: validated.name,
        category: validated.category,
        division: validated.division,
        district: validated.district,
        upazila: validated.upazila,
        unionName: validated.unionName,
        mosqueName: validated.mosqueName,
      },
      create: {
        name: validated.name,
        mobile: validated.mobile,
        category: validated.category,
        division: validated.division,
        district: validated.district,
        upazila: validated.upazila,
        unionName: validated.unionName,
        mosqueName: validated.mosqueName,
      },
    });

    const app = await db.application.create({
      data: {
        number: applicationNumber,
        eventId: event?.id || eventId,
        personId: person.id,
        answers: validated.answers as object,
        status: initialStatus,
        autoScreenResult: autoScreenResult as object,
        qrToken,
      },
    });

    appRecord.id = app.id;
    appRecord.personId = person.id;
    personProfile.id = person.id;

    // Save SMS log to DB
    await db.messageLog.create({
      data: {
        personId: person.id,
        channel: "SMS_SSL_WIRELESS",
        body: `আস-সুন্নাহ ফাউন্ডেশন: আপনার আবেদন গৃহীত হয়েছে। আবেদন নম্বর: ${applicationNumber}, প্রবেশপত্র: https://assunnah.foundation/checkin?token=${qrToken}`,
        status: "DELIVERED",
      },
    });
  } catch {
    // Database offline, persist to memory store
  }

  // Always store in memory store for immediate consistency and fast fallback
  inMemoryPersons.set(validated.mobile, personProfile);
  inMemoryApplications.set(applicationNumber, appRecord);
  inMemoryApplications.set(qrToken, appRecord);

  // Dispatch simulated SSL Wireless SMS
  inMemorySmsLogs.unshift({
    id: `sms-${Date.now()}`,
    recipientMobile: validated.mobile,
    recipientName: validated.name,
    body: `আস-সুন্নাহ ফাউন্ডেশন: আপনার আবেদন গৃহীত হয়েছে। আবেদন নম্বর: ${applicationNumber}, ডিজিটাল ভেন্যু পাস: https://assunnah.foundation/checkin?token=${qrToken}`,
    status: "DELIVERED",
    sentAt: new Date().toISOString(),
  });

  return {
    success: true,
    application: appRecord,
  };
}

/**
 * Retrieves application details by human-readable application number
 */
export async function getApplicationByNumber(
  applicationNumber: string
): Promise<ApplicationRecord | null> {
  const cleanNumber = applicationNumber.trim().toUpperCase();

  // 1. Try DB
  try {
    const app = await db.application.findUnique({
      where: { number: cleanNumber },
      include: {
        person: true,
        event: true,
      },
    });

    if (app) {
      return {
        id: app.id,
        number: app.number,
        eventId: app.eventId,
        eventSlug: app.event.slug,
        eventTitle: app.event.title,
        personId: app.personId,
        applicant: {
          id: app.person.id,
          name: app.person.name,
          mobile: app.person.mobile,
          category: app.person.category,
          division: app.person.division,
          district: app.person.district,
          upazila: app.person.upazila,
          unionName: app.person.unionName,
          mosqueName: app.person.mosqueName,
        },
        answers: (app.answers as Record<string, unknown>) || {},
        status: app.status,
        autoScreenResult: (app.autoScreenResult as unknown as AutoScreenResult) || {
          score: 75,
          maxScore: 100,
          recommendation: "SHORTLISTED",
          reasons: ["আবেদন গৃহীত"],
          breakdown: { categoryScore: 30, qualificationScore: 25, experienceScore: 10, districtScore: 10 },
          evaluatedAt: app.createdAt.toISOString(),
        },
        qrToken: app.qrToken || "",
        checkedInAt: app.checkedInAt ? app.checkedInAt.toISOString() : null,
        createdAt: app.createdAt.toISOString(),
      };
    }
  } catch {
    // Database offline
  }

  // 2. Memory store
  const mem = inMemoryApplications.get(cleanNumber);
  return mem ?? null;
}

/**
 * Retrieves application details by QR Token (supports raw token or full scan URL)
 */
export async function getApplicationByQrToken(
  qrToken: string
): Promise<ApplicationRecord | null> {
  const cleanToken = extractQrToken(qrToken);

  // 1. Try DB
  try {
    const app = await db.application.findUnique({
      where: { qrToken: cleanToken },
      include: {
        person: true,
        event: true,
      },
    });

    if (app) {
      return {
        id: app.id,
        number: app.number,
        eventId: app.eventId,
        eventSlug: app.event.slug,
        eventTitle: app.event.title,
        personId: app.personId,
        applicant: {
          id: app.person.id,
          name: app.person.name,
          mobile: app.person.mobile,
          category: app.person.category,
          division: app.person.division,
          district: app.person.district,
          upazila: app.person.upazila,
          unionName: app.person.unionName,
          mosqueName: app.person.mosqueName,
        },
        answers: (app.answers as Record<string, unknown>) || {},
        status: app.status,
        autoScreenResult: app.autoScreenResult as unknown as AutoScreenResult,
        qrToken: app.qrToken || "",
        checkedInAt: app.checkedInAt ? app.checkedInAt.toISOString() : null,
        createdAt: app.createdAt.toISOString(),
      };
    }
  } catch {
    // Database offline
  }

  // 2. Memory store
  return inMemoryApplications.get(cleanToken) ?? null;
}

/**
 * Digital Venue Pass Gatekeeper Check-in
 * Locks checkedInAt timestamp to strictly prevent duplicate entry!
 */
export async function checkInApplicant(qrToken: string): Promise<{
  success: boolean;
  status: "APPROVED" | "ALREADY_CHECKED_IN" | "INVALID_TOKEN";
  checkedInAt?: string;
  firstCheckedInAt?: string;
  application?: ApplicationRecord;
  message: string;
}> {
  const app = await getApplicationByQrToken(qrToken);

  if (!app) {
    return {
      success: false,
      status: "INVALID_TOKEN",
      message: "অকার্যকর বা জাল টিকিট! ডাটাবেজে কোনো রেকর্ড পাওয়া যায়নি।",
    };
  }

  // Duplicate entry check
  if (app.checkedInAt) {
    return {
      success: false,
      status: "ALREADY_CHECKED_IN",
      firstCheckedInAt: app.checkedInAt,
      application: app,
      message: "সতর্কতা: এই টিকিটটি ইতিমধ্যে ব্যবহার করা হয়েছে!",
    };
  }

  // Lock check-in timestamp
  const now = new Date();
  const nowIso = now.toISOString();

  try {
    await db.application.update({
      where: { id: app.id },
      data: { checkedInAt: now },
    });
  } catch {
    // Database offline
  }

  // Update in memory
  app.checkedInAt = nowIso;
  inMemoryApplications.set(app.number, app);
  inMemoryApplications.set(app.qrToken, app);

  return {
    success: true,
    status: "APPROVED",
    checkedInAt: nowIso,
    application: app,
    message: "প্রবেশ সফল ও অনুমোদিত! স্বাগতম।",
  };
}

/**
 * Lists all applications for Admin Management Console
 */
export async function listAdminApplications(filters?: {
  status?: string;
  minScore?: number;
  maxScore?: number;
  query?: string;
  eventSlug?: string;
}): Promise<ApplicationRecord[]> {
  let list: ApplicationRecord[] = [];

  // Try DB first
  try {
    const whereClause: Record<string, unknown> = {};
    if (filters?.status && filters.status !== "ALL") {
      whereClause.status = filters.status;
    }
    if (filters?.eventSlug) {
      whereClause.event = { slug: filters.eventSlug };
    }

    const apps = await db.application.findMany({
      where: whereClause,
      include: { person: true, event: true },
      orderBy: { createdAt: "desc" },
    });

    if (apps && apps.length > 0) {
      list = apps.map(app => ({
        id: app.id,
        number: app.number,
        eventId: app.eventId,
        eventSlug: app.event.slug,
        eventTitle: app.event.title,
        personId: app.personId,
        applicant: {
          id: app.person.id,
          name: app.person.name,
          mobile: app.person.mobile,
          category: app.person.category,
          division: app.person.division,
          district: app.person.district,
          upazila: app.person.upazila,
          unionName: app.person.unionName,
          mosqueName: app.person.mosqueName,
        },
        answers: (app.answers as Record<string, unknown>) || {},
        status: app.status,
        autoScreenResult: (app.autoScreenResult as unknown as AutoScreenResult) || {
          score: 75,
          maxScore: 100,
          recommendation: "SHORTLISTED",
          reasons: ["নিয়মিত বাছাই"],
          breakdown: { categoryScore: 30, qualificationScore: 25, experienceScore: 10, districtScore: 10 },
          evaluatedAt: app.createdAt.toISOString(),
        },
        qrToken: app.qrToken || "",
        checkedInAt: app.checkedInAt ? app.checkedInAt.toISOString() : null,
        createdAt: app.createdAt.toISOString(),
      }));
    }
  } catch {
    // Database offline
  }

  // If DB was empty or offline, use unique memory applications
  if (list.length === 0) {
    const seen = new Set<string>();
    inMemoryApplications.forEach(app => {
      if (!seen.has(app.id)) {
        seen.add(app.id);
        list.push(app);
      }
    });
  }

  // Apply filters
  if (filters?.eventSlug) {
    list = list.filter(a => a.eventSlug === filters.eventSlug);
  }

  if (filters?.status && filters.status !== "ALL") {
    list = list.filter(a => a.status === filters.status);
  }

  if (filters?.minScore !== undefined && filters.minScore > 0) {
    list = list.filter(a => (a.autoScreenResult?.score ?? 0) >= filters.minScore!);
  }

  if (filters?.maxScore !== undefined) {
    list = list.filter(a => (a.autoScreenResult?.score ?? 0) <= filters.maxScore!);
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(a => {
      return (
        a.applicant.name.toLowerCase().includes(q) ||
        a.applicant.mobile.includes(q) ||
        a.number.toLowerCase().includes(q) ||
        (a.applicant.district && a.applicant.district.toLowerCase().includes(q)) ||
        (a.applicant.mosqueName && a.applicant.mosqueName.toLowerCase().includes(q))
      );
    });
  }

  return list;
}

/**
 * Updates status of a single application
 */
export async function updateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus
): Promise<boolean> {
  try {
    await db.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    });
  } catch {
    // Database offline
  }

  // Update in memory - deduplicate applications by id
  const seenIds = new Set<string>();
  inMemoryApplications.forEach(app => {
    if (app.id === applicationId && !seenIds.has(app.id)) {
      seenIds.add(app.id);
      const previousStatus = app.status;
      app.status = newStatus;
      if (newStatus === ApplicationStatus.SELECTED && previousStatus !== ApplicationStatus.SELECTED) {
        inMemorySmsLogs.unshift({
          id: `sms-status-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          recipientMobile: app.applicant.mobile,
          recipientName: app.applicant.name,
          body: `অভিনন্দন ${app.applicant.name}! আস-সুন্নাহ ফাউন্ডেশনের কোর্সে আপনার চূড়ান্ত নির্বাচন সম্পন্ন হয়েছে। ডিজিটাল প্রবেশপত্র: https://assunnah.foundation/checkin?token=${app.qrToken}`,
          status: "DELIVERED",
          sentAt: new Date().toISOString(),
        });
      }
    }
  });

  return true;
}

/**
 * Bulk updates application statuses
 */
export async function bulkUpdateApplications(
  applicationIds: string[],
  newStatus: ApplicationStatus
): Promise<{ updatedCount: number; smsSentCount: number }> {
  let smsSentCount = 0;
  const uniqueIds = Array.from(new Set(applicationIds));

  for (const id of uniqueIds) {
    const apps = await listAdminApplications();
    const app = apps.find(a => a.id === id);
    const wasAlreadySelected = app?.status === ApplicationStatus.SELECTED;

    await updateApplicationStatus(id, newStatus);
    if (newStatus === ApplicationStatus.SELECTED && !wasAlreadySelected) {
      smsSentCount++;
    }
  }

  return {
    updatedCount: uniqueIds.length,
    smsSentCount,
  };
}

/**
 * Gets SMS dispatch logs
 */
export function getSmsDispatchLogs(): SmsDispatchLog[] {
  return [...inMemorySmsLogs].slice(0, 50);
}
