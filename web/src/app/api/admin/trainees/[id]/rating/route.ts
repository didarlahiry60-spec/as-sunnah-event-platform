import { requireAdminApi } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { updateTraineeInternalRating } from "@/lib/trainee-admin";

export const dynamic = "force-dynamic";

async function handleRatingUpdate(
  request: NextRequest,
  paramsPromise: Promise<{ id: string }>
) {
  try {
    const { id } = await paramsPromise;
    const body = await request.json();
    const rating = body.rating !== undefined ? body.rating : body.starRating;

    if (
      typeof rating !== "number" ||
      isNaN(rating) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: "গোপন রেটিং অবশ্যই ১ থেকে ৫ এর মধ্যে পূর্ণসংখ্যা হতে হবে।" },
        { status: 400 }
      );
    }

    const result = await updateTraineeInternalRating(id, rating);

    return NextResponse.json({
      success: true,
      personId: result.personId,
      internalStars: result.internalStars,
    });
  } catch (error) {
    console.error("Update trainee rating error:", error);
    const isNotFound = error instanceof Error && error.message.includes("পাওয়া যায়নি");
    const message = isNotFound
      ? "প্রশিক্ষণার্থী তথ্য খুঁজে পাওয়া যায়নি।"
      : "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
    const status = isNotFound ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  return handleRatingUpdate(request, params);
}

export async function POST(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  return handleRatingUpdate(request, params);
}
