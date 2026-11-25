import crypto from "node:crypto";
import { db } from "@/lib/db";

export interface MagicLinkRecord {
  id: string;
  shortCode: string;
  tokenHash: string;
  personId: string;
  purpose: string;
  payload?: Record<string, unknown> | null;
  expiresAt: Date;
  usedCount: number;
}

// In-memory store fallback for offline/test execution
const inMemoryMagicLinks = new Map<string, MagicLinkRecord>();

/**
 * Computes a deterministic SHA-256 hex hash of a raw token
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Generates a clean URL-safe short code
 */
export function generateShortCode(prefix = "m"): string {
  const randomPart = crypto.randomBytes(4).toString("hex");
  return `${prefix}_${randomPart}`;
}

/**
 * Creates a hashed, expiring magic link for passwordless trainee authentication
 */
export async function createMagicLink(options: {
  personId: string;
  purpose?: string;
  expiresInMinutes?: number;
  payload?: Record<string, unknown>;
  customShortCode?: string;
  rawToken?: string;
}): Promise<{
  id: string;
  shortCode: string;
  rawToken: string;
  tokenHash: string;
  url: string;
  directUrl: string;
  expiresAt: Date;
}> {
  const {
    personId,
    purpose = "PORTAL_LOGIN",
    expiresInMinutes = 30,
    payload = {},
    customShortCode,
  } = options;

  const shortCode = customShortCode || generateShortCode();
  const rawToken = options.rawToken || crypto.randomBytes(24).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  const id = `ml_${crypto.randomBytes(6).toString("hex")}`;

  const record: MagicLinkRecord = {
    id,
    shortCode,
    tokenHash,
    personId,
    purpose,
    payload,
    expiresAt,
    usedCount: 0,
  };

  // Always keep in memory store
  inMemoryMagicLinks.set(shortCode, record);

  // Try DB persistence
  try {
    await db.magicLink.create({
      data: {
        id,
        shortCode,
        tokenHash,
        personId,
        purpose,
        payload: payload as object,
        expiresAt,
        usedCount: 0,
      },
    });
  } catch {
    // DB offline fallback
  }

  return {
    id,
    shortCode,
    rawToken,
    tokenHash,
    url: `/m/${shortCode}?token=${rawToken}`,
    directUrl: `/m/${shortCode}`,
    expiresAt,
  };
}

/**
 * Validates and consumes a magic link.
 * Checks expiry, matches hashed token, and increments usage counter.
 */
export async function validateAndConsumeMagicLink(
  shortCode: string,
  rawToken?: string
): Promise<{
  valid: boolean;
  error?: "not_found" | "expired" | "invalid_token";
  personId?: string;
  purpose?: string;
  payload?: Record<string, unknown> | null;
}> {
  const normalizedCode = (shortCode || "").trim().toLowerCase();

  // Production lockdown: strictly forbid master demo magic link in production (case-insensitive)
  if (
    process.env.NODE_ENV === "production" &&
    (normalizedCode === "demo" || normalizedCode === "asf_imam_demo")
  ) {
    return { valid: false, error: "not_found" };
  }

  let record: MagicLinkRecord | null = null;

  // 1. Try DB lookup
  try {
    const dbRecord = await db.magicLink.findUnique({
      where: { shortCode },
    });
    if (dbRecord) {
      record = {
        ...dbRecord,
        payload: dbRecord.payload as Record<string, unknown> | null,
      };
    }
  } catch {
    // DB offline
  }

  // 2. In-memory lookup fallback
  if (!record) {
    record = inMemoryMagicLinks.get(shortCode) || null;
  }

  if (!record) {
    return { valid: false, error: "not_found" };
  }

  // Check expiration
  if (new Date() > new Date(record.expiresAt)) {
    return { valid: false, error: "expired" };
  }

  // Constant-time token verification to prevent timing attacks
  const safeHashCompare = (hashA: string, hashB: string): boolean => {
    try {
      const bufA = Buffer.from(hashA, "hex");
      const bufB = Buffer.from(hashB, "hex");
      if (bufA.length !== bufB.length) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  };

  // Check token hash if rawToken is provided
  if (rawToken) {
    const computedHash = hashToken(rawToken);
    if (!safeHashCompare(computedHash, record.tokenHash)) {
      return { valid: false, error: "invalid_token" };
    }
  } else {
    // If rawToken is omitted, accept ONLY if shortCode itself was the secret token
    const shortCodeHash = hashToken(shortCode);
    const matchesShortHash = safeHashCompare(shortCodeHash, record.tokenHash);
    const matchesPlain = record.tokenHash === shortCode;
    if (!matchesShortHash && !matchesPlain) {
      return { valid: false, error: "invalid_token" };
    }
  }

  // Increment usage count and update lastActiveAt
  record.usedCount += 1;
  try {
    await db.magicLink.update({
      where: { shortCode },
      data: { usedCount: { increment: 1 } },
    });
    await db.person.update({
      where: { id: record.personId },
      data: { lastActiveAt: new Date() },
    });
  } catch {
    // in-memory handled
  }

  return {
    valid: true,
    personId: record.personId,
    purpose: record.purpose,
    payload: record.payload,
  };
}

/**
 * Seed helper for automated tests and demo exploration
 */
export function seedDemoMagicLink(
  shortCode: string,
  personId: string,
  rawToken = "test_secret_token_123"
): MagicLinkRecord {
  const tokenHash = hashToken(rawToken);
  const record: MagicLinkRecord = {
    id: `ml_demo_${shortCode}`,
    shortCode,
    tokenHash,
    personId,
    purpose: "PORTAL_LOGIN",
    payload: { source: "seed" },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    usedCount: 0,
  };
  inMemoryMagicLinks.set(shortCode, record);
  return record;
}

// Pre-seed known test magic links for instant evaluation in non-production environments
if (process.env.NODE_ENV !== "production") {
  seedDemoMagicLink("asf_imam_demo", "person-mock-1", "asf_token_secret_demo");
  seedDemoMagicLink("demo", "person-mock-1", "demo");
}
