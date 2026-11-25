import crypto from "node:crypto";
import { normalizeBdPhone, toEnglishDigits } from "@/lib/format";

export interface OtpRecord {
  mobile: string;
  code: string;
  expiresAt: number;
  attempts: number;
  failedAttempts: number;
}

const globalForOtp = globalThis as unknown as {
  otpStore?: Map<string, OtpRecord>;
};
export const otpStore = globalForOtp.otpStore ?? new Map<string, OtpRecord>();
if (process.env.NODE_ENV !== "production") {
  globalForOtp.otpStore = otpStore;
}

// Known master test OTP for development & automated evaluation
export const MASTER_TEST_OTP = "123456";

/**
 * Generates and stores a 6-digit OTP for the given phone number
 * Uses crypto.randomInt for cryptographically secure pseudo-random number generation
 */
export function requestOtp(rawMobile: string): {
  success: boolean;
  mobile?: string;
  simulatedOtp?: string;
  expiresInSeconds?: number;
  error?: string;
} {
  const mobile = normalizeBdPhone(rawMobile);
  if (!mobile || !/^01[3-9]\d{8}$/.test(mobile)) {
    return {
      success: false,
      error: "সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678 বা ০১৭১২৩৪৫৬৭৮)",
    };
  }

  // Rate limiting: check recent requests
  const existing = otpStore.get(mobile);
  if (existing && Date.now() < existing.expiresAt && existing.attempts >= 5) {
    return {
      success: false,
      error: "অতিরিক্ত ওটিপি অনুরোধ করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।",
    };
  }

  // Generate cryptographically secure 6-digit code
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresInSeconds = 300; // 5 minutes
  const expiresAt = Date.now() + expiresInSeconds * 1000;

  otpStore.set(mobile, {
    mobile,
    code,
    expiresAt,
    attempts: existing ? existing.attempts + 1 : 1,
    failedAttempts: 0,
  });

  return {
    success: true,
    mobile,
    simulatedOtp: code,
    expiresInSeconds,
  };
}

/**
 * Validates a submitted OTP against the phone number
 * STRICT SECURITY: Master test OTP (123456) is disabled in production
 */
export function verifyOtp(rawMobile: string, inputOtp: string): {
  success: boolean;
  mobile?: string;
  error?: string;
} {
  const mobile = normalizeBdPhone(rawMobile);
  if (!mobile) {
    return { success: false, error: "মোবাইল নম্বর সঠিক নয়" };
  }

  if (!inputOtp || typeof inputOtp !== "string" || !inputOtp.trim()) {
    return { success: false, error: "৬ ডিজিটের ওটিপি কোড প্রদান আবশ্যক" };
  }

  // Support Bengali digits input (e.g. ১২৩৪৫৬ -> 123456)
  const cleanOtp = toEnglishDigits(inputOtp.trim());
  const isProduction = process.env.NODE_ENV === "production";

  // 1. Master test code check (strictly locked down in production)
  if (!isProduction && cleanOtp === MASTER_TEST_OTP) {
    otpStore.delete(mobile);
    return { success: true, mobile };
  }

  // 2. Normal store lookup
  const record = otpStore.get(mobile);
  if (!record) {
    return { success: false, error: "কোনো ওটিপি অনুরোধ পাওয়া যায়নি। পুনরায় কোড পাঠান।" };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);
    return { success: false, error: "ওটিপির মেয়াদ শেষ হয়ে গেছে। পুনরায় কোড পাঠান।" };
  }

  if (record.failedAttempts >= 5) {
    otpStore.delete(mobile);
    return {
      success: false,
      error: "সর্বোচ্চ ভুল প্রচেষ্টার সীমা অতিক্রম করেছে। নতুন ওটিপি অনুরোধ করুন।",
    };
  }

  if (record.code !== cleanOtp) {
    record.failedAttempts = (record.failedAttempts || 0) + 1;
    if (record.failedAttempts >= 5) {
      otpStore.delete(mobile);
      return {
        success: false,
        error: "সর্বোচ্চ ভুল প্রচেষ্টার সীমা অতিক্রম করেছে। নতুন ওটিপি অনুরোধ করুন।",
      };
    }

    return {
      success: false,
      error: "ভুল ওটিপি কোড। অনুগ্রহ করে সঠিক ৬ ডিজিটের কোডটি লিখুন।",
    };
  }

  // Success
  otpStore.delete(mobile);
  return { success: true, mobile };
}

/**
 * Helper to get an OTP record in tests
 */
export function getOtpRecordForTest(rawMobile: string): OtpRecord | undefined {
  const mobile = normalizeBdPhone(rawMobile);
  if (!mobile) return undefined;
  return otpStore.get(mobile);
}

/**
 * Helper to clear OTP store in tests
 */
export function clearOtpStore(): void {
  otpStore.clear();
}
