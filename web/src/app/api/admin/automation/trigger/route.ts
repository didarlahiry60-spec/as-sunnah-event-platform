import { requireAdminApi } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { triggerJob, AUTOMATION_JOB_KEYS, JobKey } from "@/lib/automation";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/automation/trigger
 * Body: { jobKey: string }
 * Manually triggers an automation job immediately and returns execution summary.
 */
export async function POST(request: NextRequest) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.jobKey !== "string") {
      return NextResponse.json(
        {
          error: "অবৈধ অনুরোধ। সঠিক jobKey প্রদান করুন।",
          validKeys: AUTOMATION_JOB_KEYS,
        },
        { status: 400 }
      );
    }

    const jobKey = body.jobKey.trim();

    if (!AUTOMATION_JOB_KEYS.includes(jobKey as JobKey)) {
      return NextResponse.json(
        {
          error: `অননুমোদিত জব কী: ${jobKey}।`,
          validKeys: AUTOMATION_JOB_KEYS,
        },
        { status: 400 }
      );
    }

    const result = await triggerJob(jobKey);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Admin automation trigger error:", error);
    return NextResponse.json(
      { error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
