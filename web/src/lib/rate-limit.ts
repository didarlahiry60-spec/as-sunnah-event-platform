import { NextRequest, NextResponse } from "next/server";

export interface RateLimitOptions {
  limit?: number; // Maximum allowed requests in the time window (default: 10)
  windowMs?: number; // Time window in milliseconds (default: 60,000 = 1 minute)
  keyPrefix?: string; // Cache key prefix (e.g. "otp-send", "checkin")
  identifier?: string; // Optional custom identifier (defaults to client IP)
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Milliseconds timestamp when window resets
  retryAfterSeconds: number; // Seconds to wait before retrying
  clientIp: string;
}

interface WindowRecord {
  count: number;
  resetTime: number;
}

// In-memory rate limit store
const rateLimitStore = new Map<string, WindowRecord>();
const MAX_STORE_ENTRIES = 10000;
const PRUNE_THRESHOLD = 500;
let lastPruneTime = 0;

/**
 * Prunes expired rate limit records to prevent in-memory memory leaks in long-running processes.
 */
export function cleanupExpiredRateLimits(now: number = Date.now()): number {
  let pruned = 0;
  for (const [k, record] of rateLimitStore.entries()) {
    if (now >= record.resetTime) {
      rateLimitStore.delete(k);
      pruned++;
    }
  }
  return pruned;
}

/**
 * Extracts client IP from request headers or fallbacks safely.
 * Prioritizes edge-verified headers (Cloudflare) to prevent X-Forwarded-For spoofing.
 */
export function getClientIp(req: NextRequest): string {
  // 1. Cloudflare edge-verified connecting IP (unspoofable by client when proxied)
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp?.trim()) return cfIp.trim();

  // 2. Real IP from trusted reverse proxy
  const realIp = req.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();

  // 3. X-Forwarded-For fallback (extract leftmost non-empty IP)
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return "127.0.0.1";
}

/**
 * Low-level check and consume token against a specific key.
 */
export function checkRateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60000
): { allowed: boolean; count: number; remaining: number; resetTime: number; retryAfterSeconds: number } {
  const safeLimit = Math.max(0, limit);
  const safeWindowMs = Math.max(1000, windowMs);
  const now = Date.now();

  // Handle immediate rejection if limit is 0
  if (safeLimit <= 0) {
    return {
      allowed: false,
      count: 1,
      remaining: 0,
      resetTime: now + safeWindowMs,
      retryAfterSeconds: Math.ceil(safeWindowMs / 1000),
    };
  }

  // Periodic memory leak prevention: sweep expired entries when store grows
  if (rateLimitStore.size > PRUNE_THRESHOLD && now - lastPruneTime > 10000) {
    cleanupExpiredRateLimits(now);
    lastPruneTime = now;
  }

  const record = rateLimitStore.get(key);

  // If expired or new key
  if (!record || now >= record.resetTime) {
    // Safety cap against extreme DDoS: if still over MAX_STORE_ENTRIES, delete oldest
    if (rateLimitStore.size >= MAX_STORE_ENTRIES) {
      const oldestKey = rateLimitStore.keys().next().value;
      if (oldestKey) {
        rateLimitStore.delete(oldestKey);
      }
    }

    const resetTime = now + safeWindowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return {
      allowed: true,
      count: 1,
      remaining: Math.max(0, safeLimit - 1),
      resetTime,
      retryAfterSeconds: Math.ceil(safeWindowMs / 1000),
    };
  }

  // Already at or exceeded limit
  if (record.count >= safeLimit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      allowed: false,
      count: record.count,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfterSeconds,
    };
  }

  // Increment within window
  record.count += 1;
  const remaining = Math.max(0, safeLimit - record.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

  return {
    allowed: true,
    count: record.count,
    remaining,
    resetTime: record.resetTime,
    retryAfterSeconds,
  };
}

/**
 * High-level rate limiter for NextRequest.
 */
export function rateLimit(
  req: NextRequest,
  options: RateLimitOptions = {}
): RateLimitResult {
  const {
    limit = 10,
    windowMs = 60000,
    keyPrefix = "general",
    identifier,
  } = options;

  const clientIp = identifier || getClientIp(req);
  const key = `${keyPrefix}:${clientIp}`;

  const result = checkRateLimit(key, limit, windowMs);

  return {
    allowed: result.allowed,
    limit,
    remaining: result.remaining,
    resetTime: result.resetTime,
    retryAfterSeconds: result.retryAfterSeconds,
    clientIp,
  };
}

/**
 * Standard 429 Too Many Requests response with appropriate security headers.
 */
export function rateLimitResponse(
  retryAfterSeconds: number = 60,
  customMessage: string = "অতিরিক্ত অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: customMessage,
      retryAfter: retryAfterSeconds,
    },
    {
      status: 429,
      headers: {
        "Retry-After": retryAfterSeconds.toString(),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}

/**
 * Reset memory store (used by tests and diagnostics).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
  lastPruneTime = 0;
}

/**
 * Diagnostics metric for health check.
 */
export function getRateLimitStoreSize(): number {
  return rateLimitStore.size;
}
