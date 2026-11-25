import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckinScanner } from "@/components/checkin/CheckinScanner";
import { messages } from "@/lib/messages";
import { QrCode, Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: `অডিটোরিয়াম চেক-ইন | ${messages.brand.name}`,
  description: "আস-সুন্নাহ ফাউন্ডেশন অডিটোরিয়াম ডিজিটাল প্রবেশ চেক-ইন ও কিউআর যাচাই।",
};

export default function CheckinPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Banner */}
      <section className="bg-brand-950 pt-28 pb-12 text-ivory text-center px-5">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-sand/20 px-3 py-1 border border-sand/30 font-ui text-xs font-bold text-lime-400">
            <QrCode className="size-4" />
            <span>{messages.checkin.badge}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ivory">
            {messages.checkin.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ivory/80 font-sans max-w-xl mx-auto">
            {messages.checkin.subtitle}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-5 py-10">
        <Suspense
          fallback={
            <div className="flex justify-center p-12">
              <Loader2 className="size-8 animate-spin text-brand-800" />
            </div>
          }
        >
          <CheckinScanner />
        </Suspense>
      </main>
    </div>
  );
}
