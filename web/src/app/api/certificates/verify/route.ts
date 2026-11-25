import { NextRequest, NextResponse } from "next/server";
import { verifyCertificate } from "@/lib/certificates";

export async function GET(req: NextRequest) {
  try {
    const certNo = req.nextUrl.searchParams.get("certNo");
    if (!certNo) {
      return NextResponse.json(
        { valid: false, error: "সনদ নম্বর (certNo) প্রদান করা আবশ্যক" },
        { status: 400 }
      );
    }

    const result = await verifyCertificate(certNo);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Certificate verify GET error:", error);
    return NextResponse.json(
      { valid: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const certNo = body.certNo;

    if (!certNo) {
      return NextResponse.json(
        { valid: false, error: "সনদ নম্বর (certNo) প্রদান করা আবশ্যক" },
        { status: 400 }
      );
    }

    const result = await verifyCertificate(certNo);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Certificate verify POST error:", error);
    return NextResponse.json(
      { valid: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
