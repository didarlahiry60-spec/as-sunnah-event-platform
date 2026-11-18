/**
 * Hijri (Islamic Umalqura) Date utility with admin offset support
 * Timezone: Asia/Dhaka
 */

import { toBengaliDigits } from "./format";

export interface HijriDateResult {
  day: number;
  dayBn: string;
  monthName: string;
  year: number;
  yearBn: string;
  formatted: string;
}

/**
 * Calculates Hijri date parts with an optional offset in days (-1, 0, +1)
 */
export function getHijriDate(date: Date = new Date(), offsetDays: number = 0): HijriDateResult {
  // Apply offset in milliseconds (1 day = 86,400,000 ms)
  const adjustedDate = new Date(date.getTime() + offsetDays * 86_400_000);

  const formatter = new Intl.DateTimeFormat("bn-BD-u-ca-islamic-umalqura", {
    timeZone: "Asia/Dhaka",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(adjustedDate);
  let dayStr = "";
  let monthName = "";
  let yearStr = "";

  for (const part of parts) {
    if (part.type === "day") dayStr = part.value;
    if (part.type === "month") monthName = part.value;
    if (part.type === "year") yearStr = part.value;
  }

  // Parse numeric day value by converting Bengali digits back to Latin
  const latinDay = dayStr.replace(/[০-৯]/g, d => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
  const latinYear = yearStr.replace(/[০-৯]/g, d => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
  const day = parseInt(latinDay, 10) || 1;
  const year = parseInt(latinYear, 10) || 1448;

  const formatted = formatter.format(adjustedDate);

  return {
    day,
    dayBn: toBengaliDigits(day),
    monthName,
    year,
    yearBn: toBengaliDigits(year),
    formatted,
  };
}

/**
 * Formats Hijri date directly as a localized string
 */
export function formatHijriDate(date: Date = new Date(), offsetDays: number = 0): string {
  return getHijriDate(date, offsetDays).formatted;
}
