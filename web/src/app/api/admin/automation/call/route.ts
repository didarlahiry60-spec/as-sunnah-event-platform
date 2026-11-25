import { NextRequest, NextResponse } from "next/server";
import { markAdminCallCompleted } from "@/lib/automation";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/automation/call
 * Body: { personId: string, note?: string }
 * Marks administrative follow-up call as completed for a trainee
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.personId !== "string") {
      return NextResponse.json(
        { error: "প্রশিক্ষণার্থী আইডি (personId) আবশ্যক।" },
        { status: 400 }
      );
    }

    const res = await markAdminCallCompleted(body.personId, body.note);

    return NextResponse.json({
      success: true,
      traineeId: res.traineeId,
      message: "কল সম্পন্ন হিসেবে সফলভাবে চিহ্নিত করা হয়েছে।",
    });
  } catch (error) {
    console.error("Admin call mark error:", error);
    return NextResponse.json(
      { error: "কল রেকর্ড হালনাগাদ করা সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}
