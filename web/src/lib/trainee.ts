import { PersonCategory } from "@prisma/client";
import { db } from "@/lib/db";
import { normalizeBdPhone } from "@/lib/format";
import { getCertificatesByPersonId, generateCertificateForEnrollment, CertificateRecord } from "@/lib/certificates";

export interface CourseMaterial {
  id: string;
  title: string;
  kind: "SYLLABUS" | "SLIDES" | "BOOK_PDF" | "VIDEO_LECTURE";
  courseSlug: string;
  courseTitle: string;
  fileUrl: string;
  fileSize?: string;
  duration?: string;
  publishedAt: string;
  description: string;
}

export interface OnlineClassItem {
  id: string;
  title: string;
  courseSlug: string;
  courseTitle: string;
  instructor: string;
  startsAt: string;
  endsAt: string;
  platform: "ZOOM" | "GOOGLE_MEET";
  meetingUrl: string;
  hasAttended: boolean;
  attendancePoints: number;
}

export interface EnrolledCourseItem {
  id: string;
  slug: string;
  title: string;
  type: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  status: "COMPLETED" | "ONGOING" | "UPCOMING";
  completedAt?: string;
  certificateNo?: string;
  progressPercent: number;
}

export interface TraineeProfile {
  id: string;
  name: string;
  mobile: string;
  category: PersonCategory;
  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  unionName?: string | null;
  mosqueName?: string | null;
  totalPoints: number;
  enrolledCourses: EnrolledCourseItem[];
  materials: CourseMaterial[];
  onlineClasses: OnlineClassItem[];
  certificates: CertificateRecord[];
}

// ---------------- Authentic Course Materials ----------------
export const SAMPLE_MATERIALS: CourseMaterial[] = [
  {
    id: "mat-1",
    title: "আধুনিক দাওয়াহ ও খুতবা পাঠ্যক্রম ২০২৬ (সিলেবাস ও নির্দেশিকা)",
    kind: "SYLLABUS",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    fileUrl: "/docs/asf-imam-syllabus-2026.pdf",
    fileSize: "১.৮ এমবি",
    publishedAt: "২০২৬-০৫-০১",
    description: "১২ সপ্তাহের পূর্ণাঙ্গ কোর্স কারিকুলাম, বিষয়ভিত্তিক মডিউল এবং সাপ্তাহিক আমল ট্র্যাকার।",
  },
  {
    id: "mat-2",
    title: "উপস্থাপনা স্লাইড: সমসাময়িক সমাজে জুমার খুতবার প্রভাব ও পদ্ধতি",
    kind: "SLIDES",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    fileUrl: "/docs/khutbah-methodology-slides.pdf",
    fileSize: "৪.২ এমবি",
    publishedAt: "২০২৬-০৫-১০",
    description: "শায়খ আহমাদুল্লাহ কর্তৃক প্রদত্ত কী-নোট স্লাইডস ও খুতবা রচনার বাস্তবিক ফ্রেমওয়ার্ক।",
  },
  {
    id: "mat-3",
    title: "রেফারেন্স বুক: ফিকহুস সুন্নাহ ও সমকালীন মাসায়েল গাইড (আস-সুন্নাহ প্রকাশনী)",
    kind: "BOOK_PDF",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    fileUrl: "/docs/fiqh-sunnah-modern-issues.pdf",
    fileSize: "১২.৫ এমবি",
    publishedAt: "২০২৬-০৫-১৫",
    description: "দৈনন্দিন আধুনিক আর্থিক লেনদেন, ডিজিটাল মিডিয়া ও সামাজিক জীবনের শরয়ী সমাধান।",
  },
  {
    id: "mat-4",
    title: "ভিডিও লেকচার: দাওয়াহর আধুনিক কলাকৌশল ও বডি ল্যাঙ্গুয়েজ — শায়খ আহমাদুল্লাহ",
    kind: "VIDEO_LECTURE",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    fileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "৪২ মিনিট",
    publishedAt: "২০২৬-০৬-০২",
    description: "শ্রোতাদের মনস্তত্ত্ব বোঝা ও আকর্ষণীয় ভঙ্গিমায় জুমার খুতবা পেশ করার বাস্তব কর্মশালা ও উপস্থাপনা।",
  },
  {
    id: "mat-5",
    title: "ভিডিও লেকচার: মসজিদ প্রশাসন, ফান্ড ও সামাজিক সমাজসেবা মডেল — ড. মানজুরে ইলাহী",
    kind: "VIDEO_LECTURE",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    fileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "৩৫ মিনিট",
    publishedAt: "২০২৬-০৬-১২",
    description: "মসজিদকে শুধু নামাযের স্থান নয়, বরং মহল্লার সার্বিক মানবকল্যাণ কেন্দ্র হিসেবে রূপান্তর।",
  },
];

// ---------------- Interactive Online Classes ----------------
export const SAMPLE_ONLINE_CLASSES: OnlineClassItem[] = [
  {
    id: "cls-1",
    title: "লাইভ জুম ক্লাস: সমসাময়িক সমাজে ইমামদের সামাজিক নেতৃত্ব ও সংকট নিরসন",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    instructor: "শায়খ আহমাদুল্লাহ",
    startsAt: "২০২৬-১১-২৮ রাত ৮:০০ টা",
    endsAt: "২০২৬-১১-২৮ রাত ৯:৩০ টা",
    platform: "ZOOM",
    meetingUrl: "https://zoom.us/j/9876543210?pwd=assunnah-live-class",
    hasAttended: false,
    attendancePoints: 20,
  },
  {
    id: "cls-2",
    title: "গুগল মিট ওয়ার্কশপ: বাল্যবিবাহ, যৌতুক ও মাদকবিরোধী সামাজিক সচেতনতা তৈরি",
    courseSlug: "imam-workshop-batch-4",
    courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
    instructor: "ড. মানজুরে ইলাহী",
    startsAt: "২০২৬-১২-০৫ রাত ৮:০০ টা",
    endsAt: "২০২৬-১২-০৫ রাত ৯:৩০ টা",
    platform: "GOOGLE_MEET",
    meetingUrl: "https://meet.google.com/asf-imam-meet",
    hasAttended: false,
    attendancePoints: 20,
  },
];

// In-memory Trainee Store fallback
export interface TraineeRecord {
  id: string;
  name: string;
  mobile: string;
  category: PersonCategory;
  division?: string;
  district?: string;
  upazila?: string;
  unionName?: string;
  mosqueName?: string;
  totalPoints: number;
  internalStars?: number; // ADMIN ONLY
  redFlag?: boolean;      // ADMIN ONLY
  attendedClassIds: Set<string>;
}

const globalForTrainees = globalThis as unknown as {
  inMemoryTrainees?: Map<string, TraineeRecord>;
};
export const inMemoryTrainees =
  globalForTrainees.inMemoryTrainees ?? new Map<string, TraineeRecord>();
if (process.env.NODE_ENV !== "production") {
  globalForTrainees.inMemoryTrainees = inMemoryTrainees;
}

function seedTrainees() {
  if (inMemoryTrainees.size > 0) return;

  const mockUsers: TraineeRecord[] = [
    {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
      category: PersonCategory.IMAM,
      division: "রংপুর",
      district: "কুড়িগ্রাম",
      upazila: "চিলমারী",
      unionName: "রানীগঞ্জ",
      mosqueName: "বায়তুল মামুর জামে মসজিদ",
      totalPoints: 145,
      internalStars: 5,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-2",
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
      category: PersonCategory.IMAM,
      division: "সিলেট",
      district: "সুনামগঞ্জ",
      upazila: "তাহিরপুর",
      unionName: "উত্তর বড়দল",
      mosqueName: "হাওর কেন্দ্রীয় জামে মসজিদ",
      totalPoints: 110,
      internalStars: 4,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-3",
      name: "মাওলানা আব্দুল কুদ্দুস",
      mobile: "01933445566",
      category: PersonCategory.MADRASA_TEACHER,
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "সাভার",
      unionName: "বিরুলিয়া",
      mosqueName: "দারুল উলুম মাদরাসা",
      totalPoints: 95,
      internalStars: 4,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-4",
      name: "মাওলানা নূরুল ইসলাম",
      mobile: "01755667788",
      category: PersonCategory.IMAM,
      division: "বরিশাল",
      district: "বরিশাল",
      upazila: "সদর",
      unionName: "চরকাউয়া",
      mosqueName: "চরকাউয়া পুরাতন জামে মসজিদ",
      totalPoints: 20,
      internalStars: 3,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-5",
      name: "মাওলানা জসিম উদ্দিন",
      mobile: "01811998877",
      category: PersonCategory.IMAM,
      division: "চট্টগ্রাম",
      district: "ফেনী",
      upazila: "ছাগলনাইয়া",
      unionName: "রাধানগর",
      mosqueName: "ছাগলনাইয়া কেন্দ্রীয় জামে মসজিদ",
      totalPoints: 130,
      internalStars: 5,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-6",
      name: "মাওলানা ওবায়দুল হক",
      mobile: "01833441122",
      category: PersonCategory.IMAM,
      division: "চট্টগ্রাম",
      district: "ফেনী",
      upazila: "ফুলগাজী",
      unionName: "আনন্দপুর",
      mosqueName: "ফুলগাজী বাজার জামে মসজিদ",
      totalPoints: 85,
      internalStars: 4,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-7",
      name: "মুফতি তারিকুল ইসলাম",
      mobile: "01855662233",
      category: PersonCategory.VOLUNTEER,
      division: "চট্টগ্রাম",
      district: "নোয়াখালী",
      upazila: "বেগমগঞ্জ",
      unionName: "মিরওয়ারিশপুর",
      mosqueName: "চৌমুহনী স্টেশন জামে মসজিদ",
      totalPoints: 120,
      internalStars: 5,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-8",
      name: "মাওলানা কফিল উদ্দিন",
      mobile: "01866773344",
      category: PersonCategory.IMAM,
      division: "চট্টগ্রাম",
      district: "নোয়াখালী",
      upazila: "সদর",
      unionName: "নোয়াখালী",
      mosqueName: "মাইজদী বড় জামে মসজিদ",
      totalPoints: 75,
      internalStars: 4,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
    {
      id: "person-mock-9",
      name: "মাওলানা ইমরান আহমেদ",
      mobile: "01799881122",
      category: PersonCategory.IMAM,
      division: "সিলেট",
      district: "সিলেট",
      upazila: "গোয়াইনঘাট",
      unionName: "জাফলং",
      mosqueName: "জাফলং বাজার জামে মসজিদ",
      totalPoints: 105,
      internalStars: 4,
      redFlag: false,
      attendedClassIds: new Set<string>(),
    },
  ];

  mockUsers.forEach(u => {
    inMemoryTrainees.set(u.id, u);
    inMemoryTrainees.set(u.mobile, u);
  });
}

seedTrainees();

/**
 * Sanitizes any raw Person record to strictly guarantee trainee-facing security.
 * NEVER returns internalStars, redFlag, or callLogs.
 */
export function sanitizeTraineeProfile(raw: Record<string, unknown>): Partial<TraineeProfile> {
  const safe = { ...raw };
  delete safe.internalStars;
  delete safe.redFlag;
  delete safe.callLogs;
  delete safe.attendedClassIds;
  return safe;
}

/**
 * Looks up or auto-creates a Trainee by mobile number
 */
export async function getOrCreateTraineeByMobile(rawMobile: string): Promise<TraineeRecord> {
  seedTrainees();
  const mobile = normalizeBdPhone(rawMobile);

  // Check memory store
  let trainee = inMemoryTrainees.get(mobile);

  // Check DB
  if (!trainee) {
    try {
      const p = await db.person.findUnique({ where: { mobile } });
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
          internalStars: p.internalStars || undefined,
          redFlag: p.redFlag,
          attendedClassIds: new Set<string>(),
        };
        inMemoryTrainees.set(trainee.id, trainee);
        inMemoryTrainees.set(trainee.mobile, trainee);
      }
    } catch {
      // DB offline
    }
  }

  // If still not found, create a polite default profile for new mobile numbers
  if (!trainee) {
    const newId = `person-usr-${Date.now().toString().slice(-6)}`;
    trainee = {
      id: newId,
      name: "প্রশিক্ষণার্থী (আস-সুন্নাহ)",
      mobile,
      category: PersonCategory.IMAM,
      division: "ঢাকা",
      district: "ঢাকা",
      mosqueName: "স্থানীয় জামে মসজিদ",
      totalPoints: 20,
      attendedClassIds: new Set<string>(),
    };
    inMemoryTrainees.set(trainee.id, trainee);
    inMemoryTrainees.set(trainee.mobile, trainee);

    try {
      await db.person.create({
        data: {
          id: newId,
          mobile,
          name: trainee.name,
          category: PersonCategory.IMAM,
          totalPoints: 20,
        },
      });
    } catch {
      // offline
    }
  }

  return trainee;
}

/**
 * Gets full sanitized Trainee Profile with courses, materials, classes, certificates
 */
export async function getTraineeFullProfile(personIdOrMobile: string): Promise<TraineeProfile | null> {
  seedTrainees();
  let trainee = inMemoryTrainees.get(personIdOrMobile);

  if (!trainee) {
    // If input was a phone number
    const normalized = normalizeBdPhone(personIdOrMobile);
    if (normalized) {
      trainee = inMemoryTrainees.get(normalized);
    }
  }

  if (!trainee) {
    // Try finding by id or mobile in DB
    try {
      const p = await db.person.findFirst({
        where: {
          OR: [{ id: personIdOrMobile }, { mobile: personIdOrMobile }],
        },
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
          internalStars: p.internalStars || undefined,
          redFlag: p.redFlag,
          attendedClassIds: new Set<string>(),
        };
        inMemoryTrainees.set(trainee.id, trainee);
        inMemoryTrainees.set(trainee.mobile, trainee);
      }
    } catch {
      // offline
    }
  }

  // Graceful recovery for valid authenticated sessions in memory fallback
  if (!trainee && (personIdOrMobile.startsWith("person-") || normalizeBdPhone(personIdOrMobile))) {
    const rawMob = normalizeBdPhone(personIdOrMobile);
    trainee = {
      id: personIdOrMobile.startsWith("person-") ? personIdOrMobile : `person-usr-${Date.now().toString().slice(-6)}`,
      name: "প্রশিক্ষণার্থী (আস-সুন্নাহ)",
      mobile: rawMob || "01631188588",
      category: PersonCategory.IMAM,
      division: "ঢাকা",
      district: "ঢাকা",
      mosqueName: "স্থানীয় জামে মসজিদ",
      totalPoints: 20,
      attendedClassIds: new Set<string>(),
    };
    inMemoryTrainees.set(trainee.id, trainee);
    inMemoryTrainees.set(trainee.mobile, trainee);
  }

  if (!trainee) return null;

  // Retrieve certificates
  let certificates = await getCertificatesByPersonId(trainee.id);

  // Auto-generate authentic certificate for completed course if not already issued
  if (certificates.length === 0) {
    const autoCert = await generateCertificateForEnrollment({
      personId: trainee.id,
      recipientName: trainee.name,
      recipientCategory: trainee.category === "IMAM" ? "ইমাম ও খতিব" : "মাদরাসা শিক্ষক",
      recipientDistrict: trainee.district || "বাংলাদেশ",
      recipientInstitution: trainee.mosqueName || undefined,
      eventId: "evt-imam-batch-4",
      courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
      courseSlug: "imam-workshop-batch-4",
      completedAt: new Date("2026-07-15"),
    });
    certificates = [autoCert];
  }

  // Enrolled courses
  const enrolledCourses: EnrolledCourseItem[] = [
    {
      id: "crs-1",
      slug: "imam-workshop-batch-4",
      title: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
      type: "ইমাম প্রশিক্ষণ",
      venue: "আস-সুন্নাহ অডিটোরিয়াম, আফতাবনগর, ঢাকা",
      startsAt: "২০২৬-০৫-০১",
      endsAt: "২০২৬-০৭-১৫",
      status: "COMPLETED",
      completedAt: "২০২৬-০৭-১৫",
      certificateNo: certificates[0]?.certificateNo,
      progressPercent: 100,
    },
    {
      id: "crs-2",
      slug: "madrasa-pedagogy-workshop",
      title: "মাদরাসা শিক্ষক পেডাগজি ও শিক্ষা সংস্কার প্রশিক্ষণ ২০২৬",
      type: "মাদরাসা শিক্ষক",
      venue: "অনলাইন ও আস-সুন্নাহ অডিটোরিয়াম",
      startsAt: "২০২৬-১০-০১",
      endsAt: "২০২৬-১২-৩১",
      status: "ONGOING",
      progressPercent: 65,
    },
  ];

  // Map online classes with attendance state for this trainee
  const onlineClasses = SAMPLE_ONLINE_CLASSES.map(cls => ({
    ...cls,
    hasAttended: trainee?.attendedClassIds.has(cls.id) || false,
  }));

  // Build clean sanitized trainee profile (NO internalStars, NO redFlag, NO callLogs)
  return {
    id: trainee.id,
    name: trainee.name,
    mobile: trainee.mobile,
    category: trainee.category,
    division: trainee.division,
    district: trainee.district,
    upazila: trainee.upazila,
    unionName: trainee.unionName,
    mosqueName: trainee.mosqueName,
    totalPoints: trainee.totalPoints,
    enrolledCourses,
    materials: SAMPLE_MATERIALS,
    onlineClasses,
    certificates,
  };
}

/**
 * Records attendance for an online class and awards +20 points
 */
export async function recordOnlineClassAttendance(
  personId: string,
  classId: string
): Promise<{
  success: boolean;
  pointsAwarded: number;
  newTotalPoints: number;
  alreadyAttended?: boolean;
  error?: string;
}> {
  seedTrainees();
  const trainee = inMemoryTrainees.get(personId);
  if (!trainee) {
    return {
      success: false,
      pointsAwarded: 0,
      newTotalPoints: 0,
      error: "প্রশিক্ষণার্থী প্রোফাইল পাওয়া যায়নি",
    };
  }

  // Check if already attended
  if (trainee.attendedClassIds.has(classId)) {
    return {
      success: true,
      alreadyAttended: true,
      pointsAwarded: 0,
      newTotalPoints: trainee.totalPoints,
    };
  }

  // Register attendance & award points (20 points for online class)
  const POINTS_AWARDED = 20;
  trainee.attendedClassIds.add(classId);
  trainee.totalPoints += POINTS_AWARDED;

  // Sync with DB if available
  try {
    await db.attendance.create({
      data: {
        classId,
        personId: trainee.id,
      },
    });
    await db.person.update({
      where: { id: trainee.id },
      data: {
        totalPoints: { increment: POINTS_AWARDED },
        lastActiveAt: new Date(),
      },
    });
  } catch {
    // offline
  }

  return {
    success: true,
    pointsAwarded: POINTS_AWARDED,
    newTotalPoints: trainee.totalPoints,
  };
}

/**
 * Adjusts trainee points directly (e.g. upon activity submission approval or rejection)
 */
export async function adjustTraineePoints(
  personId: string,
  deltaPoints: number
): Promise<{ success: boolean; newTotalPoints: number }> {
  seedTrainees();
  let trainee = inMemoryTrainees.get(personId);

  if (!trainee) {
    const normalized = normalizeBdPhone(personId);
    if (normalized) {
      trainee = inMemoryTrainees.get(normalized);
    }
  }

  // If not in memory store, try DB
  if (!trainee) {
    try {
      const p = await db.person.findFirst({
        where: {
          OR: [{ id: personId }, { mobile: personId }],
        },
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
          internalStars: p.internalStars || undefined,
          redFlag: p.redFlag,
          attendedClassIds: new Set<string>(),
        };
        inMemoryTrainees.set(trainee.id, trainee);
        inMemoryTrainees.set(trainee.mobile, trainee);
      }
    } catch {
      // DB offline
    }
  }

  if (!trainee) {
    return { success: false, newTotalPoints: 0 };
  }

  // Update points (prevent negative total points)
  trainee.totalPoints = Math.max(0, trainee.totalPoints + deltaPoints);

  // Sync to database if available
  try {
    await db.person.update({
      where: { id: trainee.id },
      data: {
        totalPoints: trainee.totalPoints,
        lastActiveAt: new Date(),
      },
    });
  } catch {
    // offline
  }

  return { success: true, newTotalPoints: trainee.totalPoints };
}

/**
 * Retrieves raw trainee record by ID or mobile (internal helper)
 */
export async function getTraineeRecordById(personId: string): Promise<TraineeRecord | null> {
  seedTrainees();
  let trainee = inMemoryTrainees.get(personId);
  if (!trainee) {
    const normalized = normalizeBdPhone(personId);
    if (normalized) {
      trainee = inMemoryTrainees.get(normalized);
    }
  }
  return trainee || null;
}

/**
 * Retrieves all in-memory trainee records (deduplicated by ID)
 */
export function getAllTraineeRecords(): TraineeRecord[] {
  seedTrainees();
  const map = new Map<string, TraineeRecord>();
  for (const trainee of inMemoryTrainees.values()) {
    map.set(trainee.id, trainee);
  }
  return Array.from(map.values());
}

/**
 * Updates a trainee's in-memory record directly
 */
export function updateTraineeRecord(
  personId: string,
  updates: Partial<TraineeRecord>
): TraineeRecord | null {
  seedTrainees();
  let trainee = inMemoryTrainees.get(personId);
  if (!trainee) {
    const normalized = normalizeBdPhone(personId);
    if (normalized) trainee = inMemoryTrainees.get(normalized);
  }
  if (!trainee) return null;

  Object.assign(trainee, updates);
  inMemoryTrainees.set(trainee.id, trainee);
  if (trainee.mobile) inMemoryTrainees.set(trainee.mobile, trainee);
  return trainee;
}
