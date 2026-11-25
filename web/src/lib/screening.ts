import { PersonCategory } from "@prisma/client";
import { toEnglishDigits, toBengaliDigits } from "@/lib/format";

/**
 * Smart Auto-Screening Engine for As-Sunnah Foundation Applications
 * Evaluates candidate suitability based on:
 * - Category relevance (Imam, Madrasa Teacher, Manager, Volunteer)
 * - Educational qualification (Dawra-e-Hadith, Kamil, Fazil, etc.)
 * - Relevant field experience (years)
 * - Geographical priority (remote, flood-affected, coastal, haor districts)
 * - Age eligibility (optimal range 25-50 years)
 */

export type ScreeningRecommendation = "SHORTLISTED" | "PENDING" | "WAITLIST" | "REJECTED";

export interface AutoScreenBreakdown {
  categoryScore: number;
  qualificationScore: number;
  experienceScore: number;
  districtScore: number;
  ageScore?: number;
  bonusScore?: number;
  notes?: string;
}

export interface AutoScreenResult {
  score: number;
  maxScore: number;
  recommendation: ScreeningRecommendation;
  reasons: string[];
  breakdown: AutoScreenBreakdown;
  evaluatedAt: string;
}

export interface CandidateEvaluationInput {
  category: PersonCategory | string;
  district?: string;
  division?: string;
  answers: {
    qualification?: string;
    experienceYears?: number | string;
    age?: number | string;
    motivation?: string;
    hasSmartphone?: boolean | string;
    [key: string]: unknown;
  };
}

/**
 * List of remote, flood-prone, haor, coastal and under-represented districts
 * that receive priority scoring in As-Sunnah Foundation training programs.
 */
export const PRIORITY_DISTRICTS = new Set([
  "কুড়িগ্রাম", "কুড়িগ্রাম", "Kurigram",
  "সুনামগঞ্জ", "Sunamganj",
  "বান্দরবান", "Bandarban",
  "খাগড়াছড়ি", "খাগড়াছড়ি", "Khagrachhari",
  "রাঙ্গামাটি", "Rangamati",
  "সাতক্ষীরা", "Satkhira",
  "গাইবান্ধা", "Gaibandha",
  "লালমনিরহাট", "Lalmonirhat",
  "পটুয়াখালী", "পটুয়াখালী", "Patuakhali",
  "বরগুনা", "Barguna",
  "ভোলা", "Bhola",
  "কক্সবাজার", "Cox's Bazar", "Coxs Bazar",
  "নেত্রকোণা", "নেত্রকোনা", "Netrokona",
  "হবিগঞ্জ", "Habiganj",
  "জামালপুর", "Jamalpur",
]);

/**
 * Evaluates an applicant against event eligibility criteria
 */
export function evaluateApplication(
  candidate: CandidateEvaluationInput,
  eventContext?: { type?: string; title?: string; eligibility?: string[] }
): AutoScreenResult {
  const isImamCourse =
    eventContext?.title?.includes("ইমাম") ||
    eventContext?.type?.includes("ইমাম") ||
    eventContext?.title?.includes("Imam");

  let categoryScore = 0;
  const reasons: string[] = [];

  // 1. Category Evaluation (Max 35 points)
  const cat = String(candidate.category).toUpperCase();
  if (cat === "IMAM") {
    categoryScore = isImamCourse ? 35 : 30;
    reasons.push(
      isImamCourse
        ? "সম্মানিত ইমাম/খতিব হিসেবে কোর্সের প্রধান লক্ষ্যভুক্ত ক্যাটাগরি (৩৫/৩৫)"
        : "ইমাম ও খতিব হিসেবে সর্বোচ্চ অগ্রাধিকার (৩০/৩৫)"
    );
  } else if (cat === "MADRASA_TEACHER") {
    categoryScore = 30;
    reasons.push("মাদরাসা শিক্ষক হিসেবে উচ্চ অগ্রাধিকার ক্যাটাগরি (৩০/৩৫)");
  } else if (cat === "MADRASA_MANAGER") {
    categoryScore = 28;
    reasons.push("মাদরাসা পরিচালক/মুহতামিম হিসেবে অগ্রাধিকার ক্যাটাগরি (২৮/৩৫)");
  } else if (cat === "VOLUNTEER") {
    categoryScore = 25;
    reasons.push("আস-সুন্নাহ সমাজসেবী ও ভলান্টিয়ার ক্যাটাগরি (২৫/৩৫)");
  } else {
    categoryScore = 10;
    reasons.push("সাধারণ অংশগ্রহণকারী ক্যাটাগরি (১০/৩৫)");
  }

  // 2. Educational Qualification Evaluation (Max 30 points)
  let qualificationScore = 15;
  const qual = String(candidate.answers?.qualification ?? "").toLowerCase();
  if (
    qual.includes("দাওরা") ||
    qual.includes("হাদিস") ||
    qual.includes("dawra") ||
    qual.includes("কামিল") ||
    qual.includes("kamil") ||
    qual.includes("মাস্টার্স") ||
    qual.includes("masters")
  ) {
    qualificationScore = 30;
    reasons.push("দাওরায়ে হাদিস / কামিল / স্নাতকোত্তর সমমানের সর্বোচ্চ শিক্ষাগত যোগ্যতা (৩০/৩০)");
  } else if (
    qual.includes("ফাজিল") ||
    qual.includes("fazil") ||
    qual.includes("স্নাতক") ||
    qual.includes("degree") ||
    qual.includes("bachelor")
  ) {
    qualificationScore = 25;
    reasons.push("ফাজিল / স্নাতক সমমানের উচ্চ শিক্ষাগত যোগ্যতা (২৫/৩০)");
  } else if (
    qual.includes("আলিম") ||
    qual.includes("alim") ||
    qual.includes("এইচএসসি") ||
    qual.includes("hsc") ||
    qual.includes("হাফেজ") ||
    qual.includes("hafiz")
  ) {
    qualificationScore = 20;
    reasons.push("আলিম / হাফেজ সমমানের শিক্ষাগত যোগ্যতা (২০/৩০)");
  } else {
    qualificationScore = 15;
    reasons.push("মৌলিক শিক্ষাগত যোগ্যতা সম্পন্ন (১৫/৩০)");
  }

  // 3. Experience Evaluation (Max 20 points)
  let experienceScore = 10;
  const expRaw = candidate.answers?.experienceYears;
  const expConverted = toEnglishDigits(String(expRaw || ""));
  const expDigitsOnly = expConverted.replace(/\D/g, "");
  const expNum =
    typeof expRaw === "number"
      ? expRaw
      : expDigitsOnly
      ? parseInt(expDigitsOnly, 10)
      : NaN;

  if (!isNaN(expNum)) {
    if (expNum >= 5) {
      experienceScore = 20;
      reasons.push("৫ বছর বা তদূর্ধ্ব দীর্ঘদিনের বাস্তব কর্ম অভিজ্ঞতা (২০/২০)");
    } else if (expNum >= 2) {
      experienceScore = 15;
      reasons.push("২ থেকে ৪ বছরের সন্তোষজনক মাঠপর্যায়ের অভিজ্ঞতা (১৫/২০)");
    } else {
      experienceScore = 10;
      reasons.push("প্রাথমিক পর্যায়ের অভিজ্ঞতা (১০/২০)");
    }
  } else {
    // Check text indications
    const expText = String(expRaw || "");
    if (
      expText.includes("৫") ||
      expText.includes("5") ||
      expText.includes("১০") ||
      expText.includes("10")
    ) {
      experienceScore = 20;
      reasons.push("অভিজ্ঞতার স্তর: প্রবীণ ও দক্ষ (২০/২০)");
    } else if (
      expText.includes("২") ||
      expText.includes("৩") ||
      expText.includes("৪") ||
      expText.includes("2") ||
      expText.includes("3") ||
      expText.includes("4")
    ) {
      experienceScore = 15;
      reasons.push("অভিজ্ঞতার স্তর: মধ্যম (১৫/২০)");
    } else {
      experienceScore = 10;
      reasons.push("অভিজ্ঞতার স্তর: প্রারম্ভিক (১০/২০)");
    }
  }

  // 4. District & Geographical Representation Evaluation (Max 15 points)
  let districtScore = 10;
  const districtName = (candidate.district || "").trim();
  if (PRIORITY_DISTRICTS.has(districtName)) {
    districtScore = 15;
    reasons.push(`অগ্রাধিকারভুক্ত প্রত্যন্ত/দুর্যোগপ্রবণ জেলা (${districtName}) কোটা (১৫/১৫)`);
  } else if (
    districtName &&
    !districtName.includes("ঢাকা") &&
    !districtName.toLowerCase().includes("dhaka")
  ) {
    districtScore = 12;
    reasons.push(`ঢাকার বাইরের জেলা (${districtName}) আঞ্চলিক কোটা (১২/১৫)`);
  } else {
    districtScore = 10;
    reasons.push("ঢাকা কেন্দ্রীয় অঞ্চল কোটা (১০/১৫)");
  }

  // 5. Age & Eligibility Criteria Evaluation
  const ageRaw = candidate.answers?.age;
  if (ageRaw !== undefined && ageRaw !== null && String(ageRaw).trim() !== "") {
    const ageDigits = toEnglishDigits(String(ageRaw)).replace(/\D/g, "");
    const ageNum = parseInt(ageDigits, 10);
    if (!isNaN(ageNum)) {
      if (ageNum >= 25 && ageNum <= 50) {
        reasons.push(`বয়সসীমা: ${toBengaliDigits(ageNum)} বছর (কোর্স নীতিমালার আদর্শ বয়সসীমা ২৫-৫০ বছরের অন্তর্ভুক্ত)`);
      } else if (ageNum < 20 || ageNum > 65) {
        reasons.push(`সতর্কতা: বয়স ${toBengaliDigits(ageNum)} বছর কোর্স নীতিমালার ২৫-৫০ বছর বয়সসীমার বাইরে`);
      } else {
        reasons.push(`বয়স: ${toBengaliDigits(ageNum)} বছর`);
      }
    }
  }

  // 6. Smartphone & Follow-up Agreement
  if (candidate.answers?.hasSmartphone === false) {
    reasons.push("সতর্কতা: স্মার্টফোন ব্যবহারে সীমাবদ্ধতা রয়েছে");
  }

  // Calculate total score
  const totalScore = categoryScore + qualificationScore + experienceScore + districtScore;

  // Recommendation thresholds
  let recommendation: ScreeningRecommendation = "WAITLIST";
  if (totalScore >= 70) {
    recommendation = "SHORTLISTED";
  } else if (totalScore >= 50) {
    recommendation = "PENDING";
  } else {
    recommendation = "WAITLIST";
  }

  return {
    score: totalScore,
    maxScore: 100,
    recommendation,
    reasons,
    breakdown: {
      categoryScore,
      qualificationScore,
      experienceScore,
      districtScore,
    },
    evaluatedAt: new Date().toISOString(),
  };
}

/**
 * Generates a unique human-readable application number.
 * Format: ASF-YYYY-XXXXXX (e.g. ASF-2027-7K9A2M)
 */
export function generateApplicationNumber(year: number = 2027): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // removed 0/O/1/I for readability
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ASF-${year}-${code}`;
}

/**
 * Generates a unique secure QR token for digital venue admission pass.
 */
export function generateQrToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `asf_pass_${timestamp}_${random}`;
}
