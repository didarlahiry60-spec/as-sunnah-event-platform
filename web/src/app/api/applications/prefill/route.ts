import { NextRequest, NextResponse } from "next/server";
import { lookupPersonByMobile } from "@/lib/applications";
import {
  getSession,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  getAdminSession,
  verifyAdminSessionToken,
  ADMIN_SESSION_COOKIE_NAME,
} from "@/lib/auth";
import { normalizeBdPhone } from "@/lib/format";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Masks middle characters of a full name for privacy protection
 */
export function maskSensitiveName(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (trimmed.length <= 2) return trimmed[0] + "*";
  if (trimmed.length <= 4) return trimmed[0] + "**" + trimmed.slice(-1);
  return trimmed.slice(0, 2) + "***" + trimmed.slice(-2);
}

/**
 * Masks details of an institution or locality
 */
export function maskSensitiveText(text: string): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= 3) return trimmed[0] + "**";
  return trimmed.slice(0, 3) + "***" + (trimmed.length > 6 ? trimmed.slice(-2) : "");
}

/**
 * Masks middle digits of a phone number (e.g. 017****3344)
 */
export function maskMobileNumber(mobile: string): string {
  if (!mobile || mobile.length < 8) return mobile;
  return mobile.slice(0, 3) + "****" + mobile.slice(-4);
}

export async function GET(request: NextRequest) {
  try {
    const limiter = rateLimit(request, { keyPrefix: "prefill", limit: 30, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(
        limiter.retryAfterSeconds,
        "অতিরিক্ত অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
      );
    }

    const { searchParams } = new URL(request.url);
    const rawMobile = searchParams.get("mobile");

    if (!rawMobile) {
      return NextResponse.json(
        { found: false, error: "মোবাইল নম্বর প্রদান করুন" },
        { status: 400 }
      );
    }

    const normMobile = normalizeBdPhone(rawMobile);
    if (!normMobile) {
      return NextResponse.json(
        { found: false, error: "সঠিক মোবাইল নম্বর প্রদান করুন" },
        { status: 400 }
      );
    }

    const result = await lookupPersonByMobile(normMobile);
    if (!result.found || !result.person) {
      return NextResponse.json({ found: false });
    }

    // Check verification: Does caller own this phone session OR have an active admin session?
    const traineeCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const traineeSession = traineeCookie
      ? await verifySessionToken(traineeCookie)
      : await getSession();

    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : undefined;
    const adminCookie = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
    const adminToken = bearerToken || adminCookie;
    const adminSession = adminToken
      ? await verifyAdminSessionToken(adminToken)
      : await getAdminSession();

    const isVerifiedOwner = Boolean(traineeSession && traineeSession.mobile === normMobile);
    const isAuthorizedAdmin = Boolean(adminSession);

    if (isVerifiedOwner || isAuthorizedAdmin) {
      // Verified caller receives full unmasked demographic profile
      return NextResponse.json({
        found: true,
        isMasked: false,
        person: result.person,
      });
    }

    // PRIVACY PROTECTION INVARIANT:
    // Anonymous public callers receive masked personal & mosque details to prevent enumeration
    return NextResponse.json({
      found: true,
      isMasked: true,
      person: {
        id: result.person.id,
        name: maskSensitiveName(result.person.name),
        mobile: maskMobileNumber(result.person.mobile),
        category: result.person.category,
        division: result.person.division,
        district: result.person.district,
        upazila: result.person.upazila ? maskSensitiveText(result.person.upazila) : null,
        unionName: result.person.unionName ? maskSensitiveText(result.person.unionName) : null,
        mosqueName: result.person.mosqueName ? maskSensitiveText(result.person.mosqueName) : null,
      },
    });
  } catch (error) {
    console.error("Prefill lookup error:", error);
    return NextResponse.json(
      { found: false, error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
