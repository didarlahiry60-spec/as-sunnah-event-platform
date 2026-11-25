import { NextRequest, NextResponse } from "next/server";
import { validateAndConsumeMagicLink } from "@/lib/magic-link";
import { getTraineeFullProfile } from "@/lib/trainee";
import { createSessionToken, SESSION_COOKIE_NAME, sanitizeRedirectUrl } from "@/lib/auth";

export function resolveMagicLinkDestination(
  purpose?: string,
  payload?: Record<string, unknown> | null
): string {
  // If an explicit relative redirect URL was embedded in the payload, sanitize and prioritize it
  if (typeof payload?.redirectUrl === "string") {
    const safeUrl = sanitizeRedirectUrl(payload.redirectUrl, "");
    if (safeUrl !== "") {
      return safeUrl;
    }
  }

  const p = (purpose || "").toLowerCase().trim();

  // Khutbah pushes & sermon guidelines
  if (p === "khutbah" || p === "khutbah_push") {
    return "/portal?tab=khutbah";
  }

  // Live online classes & webinars
  if (p === "class" || p === "classes" || p === "online_class") {
    return "/portal?tab=classes";
  }

  // Monthly activity reports / field submissions
  if (
    p === "report" ||
    p === "reports" ||
    p === "submission" ||
    p === "submissions" ||
    p === "activity_report"
  ) {
    return "/portal/submissions/new";
  }

  // Emergency relief campaign response
  if (p === "relief" || p === "relief_response" || p === "disaster") {
    return "/portal?tab=relief";
  }

  // Learning materials & curriculum
  if (p === "materials" || p === "material" || p === "curriculum") {
    return "/portal?tab=materials";
  }

  // Digital certificates
  if (p === "certificate" || p === "certificates") {
    return "/portal/certificates";
  }

  // Default portal home
  return "/portal";
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const rawToken = request.nextUrl.searchParams.get("token");
  const token = rawToken?.trim() ? rawToken.trim() : undefined;
  const baseUrl = request.nextUrl.origin;

  const cleanCode = decodeURIComponent(code).trim().toLowerCase();

  // Production Lockdown: strictly disable demo shortcut link in production (case-insensitive)
  if (
    process.env.NODE_ENV === "production" &&
    (cleanCode === "demo" || cleanCode === "asf_imam_demo")
  ) {
    return NextResponse.redirect(
      new URL("/portal/login?error=invalid", baseUrl),
      { status: 302 }
    );
  }

  const result = await validateAndConsumeMagicLink(cleanCode, token);

  if (!result.valid || !result.personId) {
    const errorParam = result.error === "expired" ? "expired" : "invalid";
    return NextResponse.redirect(
      new URL(`/portal/login?error=${errorParam}`, baseUrl),
      { status: 302 }
    );
  }

  // Retrieve trainee details to populate authenticated session
  const profile = await getTraineeFullProfile(result.personId);
  const sessionToken = await createSessionToken({
    personId: result.personId,
    mobile: profile?.mobile || "01700000000",
    name: profile?.name || "প্রশিক্ষণার্থী",
    category: profile?.category || "IMAM",
  });

  // Purpose-aware smart redirection
  const destination = resolveMagicLinkDestination(result.purpose, result.payload);

  const response = NextResponse.redirect(new URL(destination, baseUrl), {
    status: 302,
  });

  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  return response;
}
