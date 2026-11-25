"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { AsSunnahLogo } from "@/components/ui/Logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between">
      <section className="relative overflow-hidden bg-brand-950 pt-32 pb-24 text-ivory text-center px-6">
        <div className="relative mx-auto max-w-xl">
          <div className="mx-auto mb-6 flex justify-center">
            <AsSunnahLogo variant="light" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 font-ui text-sm font-semibold text-accent-300 mb-4">
            <AlertCircle className="size-4" />
            <span>একটি সাময়িক সমস্যা দেখা দিয়েছে</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ivory tracking-tight">
            অনুরোধটি সম্পন্ন করা যায়নি
          </h1>

          <p className="mt-4 text-base text-ivory/80 font-sans leading-relaxed">
            কারিগরি কোনো জটিলতার কারণে পৃষ্ঠাটি লোড হতে সমস্যা হয়েছে। অনুগ্রহ করে পৃষ্ঠাটি পুনরায় লোড করুন।
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex min-h-12 items-center gap-2 rounded-full accent-foil-bg px-8 font-ui text-sm font-bold text-brand-950 shadow-md hover:brightness-110 cursor-pointer"
            >
              <RotateCcw className="size-4" />
              <span>পুনরায় চেষ্টা করুন</span>
            </button>

            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-lime-500/40 bg-brand-900 px-6 font-ui text-sm font-bold text-lime-300 hover:bg-brand-800 cursor-pointer"
            >
              <Home className="size-4" />
              <span>হোম পেজে যান</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
