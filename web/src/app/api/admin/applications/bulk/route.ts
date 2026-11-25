import { NextRequest, NextResponse } from "next/server";
import { bulkUpdateApplications } from "@/lib/applications";
import { getAdminSession } from "@/lib/auth";
import { ApplicationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/applications/bulk
 * Bulk update applicant statuses and trigger SMS dispatches.
 * STRICT SECURITY INVARIANT: Enforces getAdminSession(request) defense-in-depth.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন লগইন আবশ্যক।" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { ids, status } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "ন্যূনতম একটি আবেদন নির্বাচন করুন" },
        { status: 400 }
      );
    }

    if (!status || !Object.values(ApplicationStatus).includes(status)) {
      return NextResponse.json(
        { error: "সঠিক স্ট্যাটাস নির্বাচন করুন" },
        { status: 400 }
      );
    }

    const result = await bulkUpdateApplications(ids, status as ApplicationStatus);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Bulk update status error:", error);
    return NextResponse.json(
      { error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
