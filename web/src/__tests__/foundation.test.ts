import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PersonCategory, EventStatus, ApplicationStatus, AdminRole } from "@prisma/client";
import { toBengaliDigits, padBengali, formatBengaliDate } from "../lib/format";
import { getHijriDate, formatHijriDate } from "../lib/hijri";
import {
  DEFAULT_ACTIVITY_SCORES,
  calculateTotalScore,
  isTraineeInactive,
  INACTIVITY_RED_FLAG_DAYS,
} from "../lib/scoring";
import { messages } from "../lib/messages";

describe("Bengali Numerals & Formatting (src/lib/format)", () => {
  it("correctly converts single digits to Bengali digits", () => {
    assert.equal(toBengaliDigits(0), "০");
    assert.equal(toBengaliDigits(5), "৫");
    assert.equal(toBengaliDigits(9), "৯");
  });

  it("correctly converts multi-digit numbers to Bengali digits", () => {
    assert.equal(toBengaliDigits(2027), "২০২৭");
    assert.equal(toBengaliDigits(1234567890), "১২৩৪৫৬৭৮৯০");
    assert.equal(toBengaliDigits(600), "৬০০");
    assert.equal(toBengaliDigits("1,000+"), "১,০০০+");
  });

  it("pads two-digit numbers with leading zero in Bengali", () => {
    assert.equal(padBengali(0), "০০");
    assert.equal(padBengali(7), "০৭");
    assert.equal(padBengali(14), "১৪");
    assert.equal(padBengali(59), "৫৯");
    assert.equal(padBengali(100, 3), "১০০");
  });

  it("formats dates in Bengali locale", () => {
    const d = new Date("2027-03-15T00:00:00Z");
    const formatted = formatBengaliDate(d);
    assert.ok(formatted.includes("২০২৭"));
    assert.ok(formatted.includes("১৫"));
  });
});

describe("Hijri Date Calculations & Offsets (src/lib/hijri)", () => {
  it("formats Hijri date with Umalqura calendar", () => {
    const d = new Date("2026-11-18T12:00:00Z");
    const res = getHijriDate(d, 0);
    assert.ok(res.day > 0 && res.day <= 30);
    assert.ok(res.year >= 1447);
    assert.ok(typeof res.formatted === "string" && res.formatted.length > 0);
  });

  it("correctly adjusts Hijri day on +1 and -1 day admin offsets", () => {
    const base = new Date("2026-11-18T12:00:00Z");
    const current = getHijriDate(base, 0);
    const nextDay = getHijriDate(base, 1);
    const prevDay = getHijriDate(base, -1);

    // Adjacent days should differ by 1 (or rollover at month boundary)
    assert.notEqual(current.day, nextDay.day);
    assert.notEqual(current.day, prevDay.day);
  });

  it("returns formatted string from formatHijriDate", () => {
    const formatted = formatHijriDate(new Date("2026-11-18T12:00:00Z"));
    assert.ok(typeof formatted === "string");
    assert.match(formatted, /[০-৯]/);
  });
});

describe("Scoring & Inactivity Red Flag (src/lib/scoring)", () => {
  it("defines default activity scores matching master spec", () => {
    assert.equal(DEFAULT_ACTIVITY_SCORES.KHUTBAH, 5);
    assert.equal(DEFAULT_ACTIVITY_SCORES.CLEANUP, 20);
    assert.equal(DEFAULT_ACTIVITY_SCORES.TREE, 20);
    assert.equal(DEFAULT_ACTIVITY_SCORES.CLASS, 20);
    assert.equal(DEFAULT_ACTIVITY_SCORES.HALAQA, 15);
  });

  it("calculates total score accurately", () => {
    const subs = [
      { pointsAwarded: DEFAULT_ACTIVITY_SCORES.KHUTBAH },
      { pointsAwarded: DEFAULT_ACTIVITY_SCORES.CLEANUP },
      { pointsAwarded: DEFAULT_ACTIVITY_SCORES.TREE },
    ];
    assert.equal(calculateTotalScore(subs), 45);
  });

  it("detects inactive trainees (Red Flag after 60 days)", () => {
    assert.equal(INACTIVITY_RED_FLAG_DAYS, 60);
    const now = new Date("2026-11-18T00:00:00Z");

    // 10 days ago -> active
    const activeDate = new Date("2026-11-08T00:00:00Z");
    assert.equal(isTraineeInactive(activeDate, now), false);

    // 65 days ago -> red flag
    const inactiveDate = new Date("2026-09-14T00:00:00Z");
    assert.equal(isTraineeInactive(inactiveDate, now), true);

    // null / undefined -> red flag
    assert.equal(isTraineeInactive(null, now), true);
  });
});

describe("Design System & As-Sunnah Brand Tokens", () => {
  const tokensPath = path.resolve(__dirname, "../styles/tokens.css");
  const tokensContent = fs.readFileSync(tokensPath, "utf-8");

  it("contains official deep forest green colors", () => {
    assert.match(tokensContent, /--brand-950:\s*#04180F/i);
    assert.match(tokensContent, /--brand-900:\s*#07261A/i);
    assert.match(tokensContent, /--brand-800:\s*#0D3B28/i);
  });

  it("contains official logo lime and accent orange", () => {
    assert.match(tokensContent, /--lime-500:\s*#8DC63F/i);
    assert.match(tokensContent, /--accent-500:\s*#F0922B/i);
    assert.match(tokensContent, /--accent-foil:\s*linear-gradient/i);
  });

  it("contains official ivory and ink background/text tokens", () => {
    assert.match(tokensContent, /--ivory:\s*#F8FAF3/i);
    assert.match(tokensContent, /--ink:\s*#0E1A13/i);
  });

  it("defines 16px radius and soft shadow", () => {
    assert.match(tokensContent, /--radius:\s*16px/);
    assert.match(tokensContent, /--shadow:\s*0 10px 40px/);
  });
});

describe("Central Messages Dictionary (src/lib/messages)", () => {
  it("contains brand and navigation strings in Bangla", () => {
    assert.equal(messages.brand.name, "আস-সুন্নাহ ইভেন্ট");
    assert.equal(messages.brand.foundation, "আস-সুন্নাহ ফাউন্ডেশন");
    assert.ok(messages.nav.events.length > 0);
    assert.ok(messages.nav.login.length > 0);
  });

  it("contains stats and pillars strings", () => {
    assert.equal(messages.stats.imam.value, "৬০০+");
    assert.equal(messages.stats.madrasa.value, "২০০+");
    assert.equal(messages.stats.volunteers.value, "১,০০০+");
    assert.equal(messages.pillars.pillar1.number, "০১");
  });
});

describe("Prisma Models & Enums", () => {
  it("exports PersonCategory enums with all required roles", () => {
    assert.equal(PersonCategory.IMAM, "IMAM");
    assert.equal(PersonCategory.MADRASA_TEACHER, "MADRASA_TEACHER");
    assert.equal(PersonCategory.MADRASA_MANAGER, "MADRASA_MANAGER");
    assert.equal(PersonCategory.VOLUNTEER, "VOLUNTEER");
  });

  it("exports EventStatus enums", () => {
    assert.equal(EventStatus.DRAFT, "DRAFT");
    assert.equal(EventStatus.UPCOMING, "UPCOMING");
    assert.equal(EventStatus.ONGOING, "ONGOING");
    assert.equal(EventStatus.COMPLETED, "COMPLETED");
  });

  it("exports ApplicationStatus and AdminRole enums", () => {
    assert.equal(ApplicationStatus.PENDING, "PENDING");
    assert.equal(ApplicationStatus.SHORTLISTED, "SHORTLISTED");
    assert.equal(AdminRole.SUPER_ADMIN, "SUPER_ADMIN");
  });
});
