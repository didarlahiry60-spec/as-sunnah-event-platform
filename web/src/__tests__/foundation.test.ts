import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PersonCategory, EventStatus, ApplicationStatus, AdminRole } from "@prisma/client";

// Utility to convert numbers to Bengali numerals
const bnNum = (n: number) => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[+d]);
const bnPad = (n: number) => String(n).padStart(2, "0").replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[+d]);

describe("Bengali Numerals & Formatting", () => {
  it("correctly converts single digits to Bengali digits", () => {
    assert.equal(bnNum(0), "০");
    assert.equal(bnNum(5), "৫");
    assert.equal(bnNum(9), "৯");
  });

  it("correctly converts multi-digit numbers to Bengali digits", () => {
    assert.equal(bnNum(2027), "২০২৭");
    assert.equal(bnNum(1234567890), "১২৩৪৫৬৭৮৯০");
    assert.equal(bnNum(600), "৬০০");
  });

  it("pads two-digit numbers with leading zero in Bengali", () => {
    assert.equal(bnPad(0), "০০");
    assert.equal(bnPad(7), "০৭");
    assert.equal(bnPad(14), "১৪");
    assert.equal(bnPad(59), "৫৯");
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
