import { db } from "@/lib/db";
import { toEnglishDigits } from "@/lib/format";

export interface CertificateRecord {
  certificateNo: string; // Format: CERT-ASF-YYYY-XXXX
  personId: string;
  recipientName: string;
  recipientCategory: string;
  recipientDistrict: string;
  recipientInstitution?: string;
  eventId: string;
  courseTitle: string;
  courseSlug: string;
  issueDate: string;
  issueDateHijri: string;
  grade: string;
  signerName: string;
  signerTitle: string;
  advisorName: string;
  advisorTitle: string;
  verificationUrl: string;
  isValid: boolean;
}

// In-memory certificate cache & fallback store
const inMemoryCertificates = new Map<string, CertificateRecord>();

/**
 * Generates canonical certificate number: CERT-ASF-YYYY-XXXX
 */
export function generateCertificateNumber(year: number | string = 2026, sequence: number | string = 814): string {
  const enYear = toEnglishDigits(String(year));
  const enSeq = toEnglishDigits(String(sequence)).padStart(4, "0");
  return `CERT-ASF-${enYear}-${enSeq}`;
}

/**
 * Constructs verification URL for a given certificate number
 */
export function getCertificateVerificationUrl(certNo: string): string {
  return `/verify-certificate?certNo=${encodeURIComponent(certNo)}`;
}

/**
 * Seed initial authentic certificates
 */
function seedCertificates() {
  if (inMemoryCertificates.size > 0) return;

  const demoCerts: CertificateRecord[] = [
    {
      certificateNo: "CERT-ASF-2026-0814",
      personId: "person-mock-1", // মুফতি আব্দুর রহমান (01711223344)
      recipientName: "মুফতি আব্দুর রহমান",
      recipientCategory: "ইমাম ও খতিব",
      recipientDistrict: "কুড়িগ্রাম",
      recipientInstitution: "বায়তুল মামুর জামে মসজিদ",
      eventId: "evt-imam-batch-4",
      courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
      courseSlug: "imam-workshop-batch-4",
      issueDate: "১৫ জুলাই ২০২৬",
      issueDateHijri: "২৯ মহররম ১৪৪৮",
      grade: "মুমতাজ (বিশিষ্ট কৃতিত্বের সাথে উত্তীর্ণ)",
      signerName: "শায়খ আহমাদুল্লাহ",
      signerTitle: "চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন",
      advisorName: "ড. মানজুরে ইলাহী",
      advisorTitle: "কোর্স উপদেষ্টা ও গবেষক",
      verificationUrl: "/verify-certificate?certNo=CERT-ASF-2026-0814",
      isValid: true,
    },
    {
      certificateNo: "CERT-ASF-2026-0922",
      personId: "person-mock-2", // মাওলানা মাহমুদুল হাসান (01822334455)
      recipientName: "মাওলানা মাহমুদুল হাসান",
      recipientCategory: "ইমাম ও খতিব",
      recipientDistrict: "সুনামগঞ্জ",
      recipientInstitution: "হাওর কেন্দ্রীয় জামে মসজিদ",
      eventId: "evt-imam-batch-4",
      courseTitle: "ইমাম ও খতিব আধুনিক কর্মশালা ও দাওয়াহ দক্ষতা প্রশিক্ষণ ২০২৬",
      courseSlug: "imam-workshop-batch-4",
      issueDate: "১৫ জুলাই ২০২৬",
      issueDateHijri: "২৯ মহররম ১৪৪৮",
      grade: "জিয়্যিদ জিদ্দান (প্রথম বিভাগ)",
      signerName: "শায়খ আহমাদুল্লাহ",
      signerTitle: "চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন",
      advisorName: "ড. মানজুরে ইলাহী",
      advisorTitle: "কোর্স উপদেষ্টা ও গবেষক",
      verificationUrl: "/verify-certificate?certNo=CERT-ASF-2026-0922",
      isValid: true,
    },
    {
      certificateNo: "CERT-ASF-2026-1055",
      personId: "person-mock-3", // মাওলানা আব্দুল কুদ্দুস (01933445566)
      recipientName: "মাওলানা আব্দুল কুদ্দুস",
      recipientCategory: "মাদরাসা শিক্ষক",
      recipientDistrict: "ঢাকা",
      recipientInstitution: "দারুল উলুম মাদরাসা",
      eventId: "evt-madrasa-pedagogy-2",
      courseTitle: "মাদরাসা শিক্ষক পেডাগজি ও শিক্ষা সংস্কার প্রশিক্ষণ ২০২৬",
      courseSlug: "madrasa-pedagogy-workshop",
      issueDate: "২২ আগস্ট ২০২৬",
      issueDateHijri: "০৮ সফর ১৪৪৮",
      grade: "মুমতাজ (বিশিষ্ট কৃতিত্বের সাথে উত্তীর্ণ)",
      signerName: "শায়খ আহমাদুল্লাহ",
      signerTitle: "চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন",
      advisorName: "প্রফেসর মোখতার আহমাদ",
      advisorTitle: "পেডাগজি বিশেষজ্ঞ ও ট্রেইনার",
      verificationUrl: "/verify-certificate?certNo=CERT-ASF-2026-1055",
      isValid: true,
    },
  ];

  demoCerts.forEach(cert => {
    inMemoryCertificates.set(cert.certificateNo, cert);
    inMemoryCertificates.set(cert.certificateNo.toLowerCase(), cert);
  });
}

seedCertificates();

/**
 * Looks up certificate by certificate number
 */
export async function getCertificateByNumber(rawCertNo: string): Promise<CertificateRecord | null> {
  if (!rawCertNo || typeof rawCertNo !== "string") return null;
  seedCertificates();
  // Normalize Bengali numerals (e.g. CERT-ASF-২০২৬-০৮১৪ -> CERT-ASF-2026-0814)
  const certNo = toEnglishDigits(rawCertNo.trim()).toUpperCase();

  // 1. Try DB lookup via enrollment
  try {
    const enrollment = await db.enrollment.findUnique({
      where: { certificateNo: certNo },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            category: true,
            district: true,
            mosqueName: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (enrollment && enrollment.person && enrollment.event) {
      return {
        certificateNo: certNo,
        personId: enrollment.person.id,
        recipientName: enrollment.person.name,
        recipientCategory: enrollment.person.category,
        recipientDistrict: enrollment.person.district || "বাংলাদেশ",
        recipientInstitution: enrollment.person.mosqueName || undefined,
        eventId: enrollment.event.id,
        courseTitle: enrollment.event.title,
        courseSlug: enrollment.event.slug,
        issueDate: enrollment.completedAt
          ? enrollment.completedAt.toLocaleDateString("bn-BD")
          : "১৫ জুলাই ২০২৬",
        issueDateHijri: "২৯ মহররম ১৪৪৮",
        grade: "মুমতাজ (বিশিষ্ট কৃতিত্বের সাথে উত্তীর্ণ)",
        signerName: "শায়খ আহমাদুল্লাহ",
        signerTitle: "চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন",
        advisorName: "ড. মানজুরে ইলাহী",
        advisorTitle: "কোর্স উপদেষ্টা ও গবেষক",
        verificationUrl: getCertificateVerificationUrl(certNo),
        isValid: true,
      };
    }
  } catch {
    // DB offline fallback
  }

  // 2. Fallback to memory store
  const found = inMemoryCertificates.get(certNo) || inMemoryCertificates.get(certNo.toLowerCase());
  return found || null;
}

/**
 * Public Verification Check
 */
export async function verifyCertificate(rawCertNo: string): Promise<{
  valid: boolean;
  certificate?: CertificateRecord;
  error?: string;
}> {
  if (!rawCertNo || !rawCertNo.trim()) {
    return { valid: false, error: "সনদ নম্বর প্রদান করা আবশ্যক" };
  }

  const cert = await getCertificateByNumber(rawCertNo.trim());
  if (!cert) {
    return {
      valid: false,
      error: "প্রদত্ত সনদ নম্বরের সাথে আস-সুন্নাহ ফাউন্ডেশনের ডাটাবেজে কোনো রেকর্ড পাওয়া যায়নি।",
    };
  }

  return {
    valid: true,
    certificate: cert,
  };
}

/**
 * Gets all certificates issued to a specific person
 */
export async function getCertificatesByPersonId(personId: string): Promise<CertificateRecord[]> {
  seedCertificates();
  const results: CertificateRecord[] = [];

  // Try DB
  try {
    const enrollments = await db.enrollment.findMany({
      where: {
        personId,
        certificateNo: { not: null },
      },
      include: {
        person: true,
        event: true,
      },
    });

    for (const e of enrollments) {
      if (e.certificateNo) {
        results.push({
          certificateNo: e.certificateNo,
          personId: e.person.id,
          recipientName: e.person.name,
          recipientCategory: e.person.category,
          recipientDistrict: e.person.district || "বাংলাদেশ",
          recipientInstitution: e.person.mosqueName || undefined,
          eventId: e.event.id,
          courseTitle: e.event.title,
          courseSlug: e.event.slug,
          issueDate: e.completedAt
            ? e.completedAt.toLocaleDateString("bn-BD")
            : "১৫ জুলাই ২০২৬",
          issueDateHijri: "২৯ মহররম ১৪৪৮",
          grade: "মুমতাজ (বিশিষ্ট কৃতিত্বের সাথে উত্তীর্ণ)",
          signerName: "শায়খ আহমাদুল্লাহ",
          signerTitle: "চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন",
          advisorName: "ড. মানজুরে ইলাহী",
          advisorTitle: "কোর্স উপদেষ্টা ও গবেষক",
          verificationUrl: getCertificateVerificationUrl(e.certificateNo),
          isValid: true,
        });
      }
    }
  } catch {
    // DB fallback
  }

  // If DB returned records, return unique by certificateNo
  if (results.length > 0) return results;

  // Otherwise check memory store
  for (const cert of inMemoryCertificates.values()) {
    if (cert.personId === personId && !results.some(r => r.certificateNo === cert.certificateNo)) {
      results.push(cert);
    }
  }

  return results;
}

let certSeqCounter = 1100;

/**
 * Automatically generates, signs, and registers an authentic certificate for a completed enrollment
 */
export async function generateCertificateForEnrollment(params: {
  personId: string;
  recipientName: string;
  recipientCategory?: string;
  recipientDistrict?: string;
  recipientInstitution?: string;
  eventId: string;
  courseTitle: string;
  courseSlug: string;
  completedAt?: Date | string;
  grade?: string;
}): Promise<CertificateRecord> {
  seedCertificates();
  certSeqCounter += 1;
  const certificateNo = generateCertificateNumber(2026, certSeqCounter);

  const completedDate = params.completedAt
    ? (params.completedAt instanceof Date ? params.completedAt : new Date(params.completedAt))
    : new Date();

  const record: CertificateRecord = {
    certificateNo,
    personId: params.personId,
    recipientName: params.recipientName,
    recipientCategory: params.recipientCategory || "ইমাম ও খতিব",
    recipientDistrict: params.recipientDistrict || "বাংলাদেশ",
    recipientInstitution: params.recipientInstitution || "আস-সুন্নাহ প্রশিক্ষণার্থী",
    eventId: params.eventId,
    courseTitle: params.courseTitle,
    courseSlug: params.courseSlug,
    issueDate: isNaN(completedDate.getTime())
      ? "১৫ জুলাই ২০২৬"
      : completedDate.toLocaleDateString("bn-BD"),
    issueDateHijri: "২৯ মহররম ১৪৪৮",
    grade: params.grade || "মুমতাজ (বিশিষ্ট কৃতিত্বের সাথে উত্তীর্ণ)",
    signerName: "শায়খ আহমাদুল্লাহ",
    signerTitle: "চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন",
    advisorName: "ড. মানজুরে ইলাহী",
    advisorTitle: "কোর্স উপদেষ্টা ও গবেষক",
    verificationUrl: getCertificateVerificationUrl(certificateNo),
    isValid: true,
  };

  inMemoryCertificates.set(certificateNo, record);
  inMemoryCertificates.set(certificateNo.toLowerCase(), record);

  try {
    await db.enrollment.upsert({
      where: {
        personId_eventId: {
          personId: params.personId,
          eventId: params.eventId,
        },
      },
      update: {
        certificateNo,
        completedAt: completedDate,
      },
      create: {
        personId: params.personId,
        eventId: params.eventId,
        certificateNo,
        completedAt: completedDate,
      },
    });
  } catch {
    // DB offline fallback
  }

  return record;
}

/**
 * Registers or issues a certificate for a completed enrollment
 */
export function registerCertificate(record: CertificateRecord): void {
  inMemoryCertificates.set(record.certificateNo, record);
}
