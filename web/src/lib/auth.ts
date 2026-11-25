import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { PersonCategory, AdminRole } from "@prisma/client";
import { sanitizeRedirectUrl } from "@/lib/format";

export { sanitizeRedirectUrl };

export const SESSION_COOKIE_NAME = "asf_session";
export const ADMIN_SESSION_COOKIE_NAME = "asf_admin_session";

const DEFAULT_SECRET = "as-sunnah-foundation-secure-sprint4-jwt-key-2026";

/**
 * Robust secret key retrieval supporting both AUTH_SECRET and SESSION_SECRET
 */
export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET || process.env.SESSION_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  personId: string;
  mobile: string;
  name: string;
  category: PersonCategory;
}

export interface AdminSessionPayload {
  adminId: string;
  email: string;
  name: string;
  role: AdminRole | string;
}

/**
 * Creates an encrypted/signed JWT trainee session token
 */
export async function createSessionToken(
  payload: SessionPayload,
  expiresIn = "30d"
): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getJwtSecretKey());
}

/**
 * Verifies an incoming trainee session token and extracts safe trainee payload
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    if (!payload.personId || !payload.mobile) {
      return null;
    }
    return {
      personId: String(payload.personId),
      mobile: String(payload.mobile),
      name: String(payload.name || "প্রশিক্ষণার্থী"),
      category: (payload.category as PersonCategory) || PersonCategory.IMAM,
    };
  } catch {
    return null;
  }
}

/**
 * Reads and verifies the current trainee session from request (Bearer header / cookie) or Next.js server cookie store
 */
export async function getSession(req?: NextRequest): Promise<SessionPayload | null> {
  try {
    if (req) {
      const authHeader = req.headers.get("authorization");
      const bearerToken = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
      const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
      const token = bearerToken || cookieToken;
      if (token) {
        return await verifySessionToken(token);
      }
      return null;
    }
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Sets secure HTTP-Only trainee session cookie in Next.js cookie store
 */
export async function setSessionCookie(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  } catch {
    // Handled in route responses if invoked outside action/handler
  }
}

/**
 * Clears the trainee session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Handled in route responses if invoked outside action/handler
  }
}

// =========================================================================
// Admin Session Management
// =========================================================================

/**
 * Creates an encrypted/signed JWT admin session token
 */
export async function createAdminSessionToken(
  payload: AdminSessionPayload,
  expiresIn = "7d"
): Promise<string> {
  return await new SignJWT({ ...payload, isAdmin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getJwtSecretKey());
}

/**
 * Verifies an incoming admin session token
 */
export async function verifyAdminSessionToken(
  token: string
): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    if (!payload.adminId || !payload.email || payload.isAdmin !== true) {
      return null;
    }
    return {
      adminId: String(payload.adminId),
      email: String(payload.email),
      name: String(payload.name || "অ্যাডমিন"),
      role: (payload.role as AdminRole) || AdminRole.SUPER_ADMIN,
    };
  } catch {
    return null;
  }
}

/**
 * Reads and verifies current admin session from request (Bearer header / cookie) or cookie store
 */
export async function getAdminSession(req?: NextRequest): Promise<AdminSessionPayload | null> {
  try {
    if (req) {
      const authHeader = req.headers.get("authorization");
      const bearerToken = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
      const cookieToken = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
      const token = bearerToken || cookieToken;
      if (token) {
        return await verifyAdminSessionToken(token);
      }
      return null;
    }
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminSessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Sets secure HTTP-Only admin session cookie
 */
export async function setAdminSessionCookie(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  } catch {
    // Handled in route responses
  }
}

/**
 * Clears the admin session cookie
 */
export async function clearAdminSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
  } catch {
    // Handled in route responses
  }
}

/**
 * Defense-in-depth helper for Admin API route handlers.
 * Returns null if authenticated, or a 401 NextResponse otherwise.
 */
export async function requireAdminApi(req?: NextRequest): Promise<NextResponse | null> {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন লগইন আবশ্যক।" },
      { status: 401 }
    );
  }
  return null;
}
