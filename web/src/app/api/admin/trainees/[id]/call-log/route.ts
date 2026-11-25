import { requireAdminApi } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { recordTraineeCallLog } from "@/lib/trainee-admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/trainees/[id]/call-log
 * Records an administrative call log entry and optionally resolves redFlag.
 */
export async function POST(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();

    const { callerName, notes, outcome, clearRedFlag } = body;

    if (!notes || typeof notes !== "string" || notes.trim().length === 0) {
      return NextResponse.json(
        { error: "কল সংক্রান্ত বিবরণ বা নোট আবশ্যক।" },
        { status: 400 }
      );
    }

    const result = await recordTraineeCallLog(id, {
      callerName,
      notes,
      outcome,
      clearRedFlag: Boolean(clearRedFlag),
    });

    return NextResponse.json({
      success: true,
      log: result.log,
      redFlagCleared: result.redFlagCleared,
      traineeId: result.traineeId,
    });
  } catch (error) {
    console.error("Record trainee call log error:", error);
    const isNotFound = error instanceof Error && error.message.includes("পাওয়া যায়নি");
    const message = isNotFound
      ? "প্রশিক্ষণার্থী তথ্য খুঁজে পাওয়া যায়নি।"
      : "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
    const status = isNotFound ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
