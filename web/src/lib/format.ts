/**
 * Bengali numeral and date formatting utilities for As-Sunnah Foundation Platform
 */

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_TO_EN: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/**
 * Converts any Latin digits (0-9) in a number or string into Bengali digits (০-৯)
 */
export function toBengaliDigits(input: number | string): string {
  return String(input).replace(/\d/g, d => BN_DIGITS[Number(d)] ?? d);
}

/**
 * Alias for toBengaliDigits
 */
export const formatBengaliNumber = toBengaliDigits;

/**
 * Converts Bengali digits (০-৯) in a string into Latin digits (0-9)
 */
export function toEnglishDigits(input: string): string {
  return input.replace(/[০-৯]/g, d => BN_TO_EN[d] ?? d);
}

/**
 * Normalizes a Bangladeshi mobile phone number into 11-digit format starting with "01".
 * Accepts formats:
 * - "01712345678"
 * - "+8801712345678" / "8801712345678"
 * - "০১৭১২৩৪৫৬৭৮" / "+৮৮০১৭১২৩৪৫৬৭৮"
 * - Formatted strings with dashes or spaces: "01712-345678"
 */
export function normalizeBdPhone(input: string): string {
  let normalized = toEnglishDigits(input.trim()).replace(/\D/g, "");
  if (normalized.startsWith("8801")) {
    normalized = normalized.slice(2);
  }
  return normalized;
}

/**
 * Formats a number with leading zeros and converts to Bengali numerals
 */
export function padBengali(num: number, width: number = 2): string {
  return toBengaliDigits(String(num).padStart(width, "0"));
}

/**
 * Safely sanitizes a redirect target URL to prevent Open Redirect vulnerabilities.
 * Disallows absolute URLs, protocol-relative URLs (//, /\), and external schemes.
 */
export function sanitizeRedirectUrl(
  url: string | null | undefined,
  fallback = "/admin/applications"
): string {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/\\") ||
    trimmed.includes("://") ||
    trimmed.startsWith("/\\\\")
  ) {
    return fallback;
  }
  return trimmed;
}

/**
 * Formats a Gregorian date into a Bengali formatted date string in Asia/Dhaka time
 */
export function formatBengaliDate(
  date: Date | string | number | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const opts: Intl.DateTimeFormatOptions = options ?? {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  };
  return new Intl.DateTimeFormat("bn-BD", opts).format(d);
}

/**
 * Returns date in YYYY-MM-DD format according to Asia/Dhaka timezone
 */
export function getDhakaDateKey(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/**
 * Returns an array of YYYY-MM-DD date keys in Asia/Dhaka time covering the full range [startsAt, endsAt]
 */
export function getDateKeysBetween(startDate: string | Date, endDate: string | Date): string[] {
  const startKey = getDhakaDateKey(startDate);
  const endKey = getDhakaDateKey(endDate);
  if (!startKey || !endKey) return [];

  const [sY, sM, sD] = startKey.split("-").map(Number);
  const [eY, eM, eD] = endKey.split("-").map(Number);

  const cur = new Date(sY, sM - 1, sD, 12, 0, 0);
  const end = new Date(eY, eM - 1, eD, 12, 0, 0);

  const keys: string[] = [];
  while (cur <= end) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const d = String(cur.getDate()).padStart(2, "0");
    keys.push(`${y}-${m}-${d}`);
    cur.setDate(cur.getDate() + 1);
  }
  return keys;
}
