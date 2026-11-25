import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createSubmission,
  getSubmissionsByPerson,
  CreateSubmissionSchema,
} from "@/lib/submissions";

export const dynamic = "force-dynamic";

/**
 * GET /api/portal/submissions
 * Returns submission history for the logged-in trainee
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "অননুমোদিত এক্সেস। অনুগ্রহ করে লগইন করুন।" },
      { status: 401 }
    );
  }

  try {
    const submissions = await getSubmissionsByPerson(session.personId);
    const approvedPoints = submissions
      .filter(s => s.status === "APPROVED")
      .reduce((sum, s) => sum + s.points, 0);

    return NextResponse.json({
      success: true,
      submissions,
      totalCount: submissions.length,
      approvedPoints,
    });
  } catch (error) {
    console.error("Failed to load submissions:", error);
    return NextResponse.json(
      { error: "কার্যক্রমের তথ্য লোড করা সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portal/submissions
 * Creates a new field activity submission for the logged-in trainee
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "অননুমোদিত এক্সেস। অনুগ্রহ করে লগইন করুন।" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // Validate body with Zod
    // SECURITY: Ensure trainees can NEVER approve their own submissions or set arbitrary points.
    // status is strictly forced to "PENDING" and points is forced to undefined (calculated server-side).
    const parsed = CreateSubmissionSchema.safeParse({
      ...body,
      personId: session.personId,
      traineeName: session.name,
      traineeMobile: session.mobile,
      status: "PENDING",
      points: undefined,
    });

    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message || "ভুল তথ্য প্রদান করা হয়েছে।";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const submission = await createSubmission(parsed.data);

    return NextResponse.json(
      {
        success: true,
        submission,
        message: "আপনার কার্যক্রম সফলভাবে জমা হয়েছে।",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create submission:", error);
    return NextResponse.json(
      { error: "কার্যক্রম জমা দেওয়া সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
