import { NextRequest, NextResponse } from "next/server";
import { updateApplicationStatus } from "@/lib/applications";
import { getAdminSession } from "@/lib/auth";
import { ApplicationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/admin/applications/[id]/status
 * Individual application status update.
 * STRICT SECURITY INVARIANT: Enforces getAdminSession(request) defense-in-depth.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন লগইন আবশ্যক।" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { status } = body;

    if (!status || !Object.values(ApplicationStatus).includes(status)) {
      return NextResponse.json(
        { error: "সঠিক স্ট্যাটাস নির্বাচন করুন" },
        { status: 400 }
      );
    }

    await updateApplicationStatus(id, status as ApplicationStatus);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json(
      { error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
