/**
 * Bengali numeral and date formatting utilities for As-Sunnah Foundation Platform
 */

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * Converts any Latin digits (0-9) in a number or string into Bengali digits (০-৯)
 */
export function toBengaliDigits(input: number | string): string {
  return String(input).replace(/\d/g, d => BN_DIGITS[Number(d)] ?? d);
}

/**
 * Formats a number with leading zeros and converts to Bengali numerals
 */
export function padBengali(num: number, width: number = 2): string {
  return toBengaliDigits(String(num).padStart(width, "0"));
}

/**
 * Formats a Gregorian date into a Bengali formatted date string
 */
export function formatBengaliDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "object" ? date : new Date(date);
  const opts: Intl.DateTimeFormatOptions = options ?? {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  };
  return new Intl.DateTimeFormat("bn-BD", opts).format(d);
}
