import { requireAdminApi } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  getAllJobs,
  getRecentExecutionLogs,
  getAutomationSettings,
  getRedFlaggedTrainees,
} from "@/lib/automation";
import { getHijriDate } from "@/lib/hijri";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/automation
 * Returns all 5 job schedules, their statuses, next run times,
 * recent execution logs, current Hijri date calculation, and active settings.
 * ADMIN ONLY — STRICT SECURITY INVARIANT
 */
export async function GET(request?: NextRequest) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  try {
    const now = new Date();
    const settings = await getAutomationSettings();
    const jobs = await getAllJobs(now);
    const recentLogs = await getRecentExecutionLogs(20);
    const hijriInfo = {
      ...getHijriDate(now, settings.hijriOffset),
      offset: settings.hijriOffset,
    };
    const redFlaggedTrainees = await getRedFlaggedTrainees(now);

    return NextResponse.json({
      success: true,
      jobs,
      recentLogs,
      settings,
      hijriInfo,
      redFlaggedTrainees,
    });
  } catch (error) {
    console.error("Admin automation fetch error:", error);
    return NextResponse.json(
      { error: "অটোমেশন শিডিউল ও ডেটা লোড করা সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}
