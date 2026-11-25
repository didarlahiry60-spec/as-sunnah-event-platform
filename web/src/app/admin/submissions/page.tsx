import type { Metadata } from "next";
import { SubmissionsReviewWall } from "@/components/admin/SubmissionsReviewWall";
import { messages } from "@/lib/messages";
import { ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `মাঠপর্যায়ের কার্যক্রম ও পয়েন্ট পর্যালোচনা | ${messages.brand.name}`,
  description:
    "আস-সুন্নাহ ফাউন্ডেশন প্রশিক্ষণার্থীদের খুতবা, পরিচ্ছন্নতা ও সমাজসেবা কার্যক্রম পর্যালোচনা এবং পয়েন্ট অনুমোদন।",
};

export default function AdminSubmissionsPage() {
  const msg = messages.adminSubmissions;

  return (
    <div className="w-full">
      {/* Top Header Banner */}
      <section className="bg-brand-950/95 py-6 px-4 sm:px-8 text-ivory border-b border-sand/20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sand/20 px-3 py-1 border border-sand/30 font-ui text-xs font-bold text-lime-400 mb-2">
            <ClipboardCheck className="size-4" />
            <span>{msg.badge}</span>
          </div>

          <h1 className="font-display text-xl sm:text-3xl font-bold text-ivory">
            {msg.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ivory/80 font-sans max-w-2xl">
            {msg.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-8">
        <SubmissionsReviewWall />
      </main>
    </div>
  );
}
