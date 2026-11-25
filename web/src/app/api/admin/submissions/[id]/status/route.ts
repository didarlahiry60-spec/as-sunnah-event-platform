import { requireAdminApi } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { updateSubmissionStatus, SubmissionStatus } from "@/lib/submissions";

export const dynamic = "force-dynamic";

async function handleStatusUpdate(
  request: NextRequest,
  paramsPromise: Promise<{ id: string }>
) {
  try {
    const { id } = await paramsPromise;
    const body = await request.json();
    const { status, adminFeedback } = body;

    const validStatuses: SubmissionStatus[] = ["APPROVED", "PENDING", "REJECTED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "সঠিক অবস্থা (APPROVED, PENDING, বা REJECTED) নির্বাচন করুন।" },
        { status: 400 }
      );
    }

    const result = await updateSubmissionStatus(id, status as SubmissionStatus, adminFeedback);

    return NextResponse.json({
      success: true,
      submission: result.submission,
      pointsDelta: result.pointsDelta,
      newTotalPoints: result.newTotalPoints,
    });
  } catch (error) {
    console.error("Update submission status error:", error);
    const isNotFound = error instanceof Error && error.message.includes("পাওয়া যায়নি");
    const message = isNotFound
      ? "সংশ্লিষ্ট কার্যক্রমটি খুঁজে পাওয়া যায়নি।"
      : "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
    const status = isNotFound ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  return handleStatusUpdate(request, params);
}

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  return handleStatusUpdate(request, params);
}
