import { NextRequest, NextResponse } from "next/server";
import { listAdminApplications, getSmsDispatchLogs } from "@/lib/applications";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/applications
 * Administrative list of applications with screening scores and dashboard stats.
 * STRICT SECURITY INVARIANT: Enforces getAdminSession(request) defense-in-depth.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন লগইন আবশ্যক।" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const minScore = searchParams.get("minScore") ? parseInt(searchParams.get("minScore")!, 10) : undefined;
    const maxScore = searchParams.get("maxScore") ? parseInt(searchParams.get("maxScore")!, 10) : undefined;
    const query = searchParams.get("query") || undefined;
    const eventSlug = searchParams.get("eventSlug") || undefined;

    const applications = await listAdminApplications({
      status,
      minScore,
      maxScore,
      query,
      eventSlug,
    });

    // Compute unfiltered total stats for dashboard counters
    const allApplications = await listAdminApplications(eventSlug ? { eventSlug } : undefined);
    const stats = {
      total: allApplications.length,
      shortlisted: allApplications.filter(a => a.status === "SHORTLISTED").length,
      selected: allApplications.filter(a => a.status === "SELECTED").length,
      waitlist: allApplications.filter(a => a.status === "WAITLIST").length,
      rejected: allApplications.filter(a => a.status === "REJECTED").length,
    };

    const smsLogs = getSmsDispatchLogs();

    return NextResponse.json({
      success: true,
      applications,
      stats,
      smsLogs,
      total: applications.length,
    });
  } catch (error) {
    console.error("Admin list applications error:", error);
    return NextResponse.json(
      { error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
