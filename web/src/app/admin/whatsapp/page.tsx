import type { Metadata } from "next";
import { AdminWhatsAppChannelConsole } from "@/components/admin/AdminWhatsAppChannelConsole";
import { messages } from "@/lib/messages";
import { Send } from "lucide-react";

export const metadata: Metadata = {
  title: `WhatsApp চ্যানেল ও ইনভিটেশন ব্রডকাস্ট | ${messages.brand.name}`,
  description:
    "আস-সুন্নাহ ফাউন্ডেশন অফিসিয়াল WhatsApp চ্যানেল সংযোগ, ইভেন্ট ইনভিটেশন কার্ড ও লাইভ ব্রডকাস্ট কনসোল।",
};

export default function AdminWhatsAppPage() {
  return (
    <div className="w-full">
      {/* Top Header Banner */}
      <section className="bg-brand-950/95 py-6 px-4 sm:px-8 text-ivory border-b border-sand/20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sand/20 px-3.5 py-1 border border-sand/30 font-ui text-xs font-bold text-lime-400 mb-2">
            <Send className="size-4" />
            <span>অফিসিয়াল হোয়াটসঅ্যাপ চ্যানেল ব্যবস্থাপনা</span>
          </div>

          <h1 className="font-display text-xl sm:text-3xl font-bold text-ivory">
            WhatsApp চ্যানেল সংযোগ ও ডিজিটাল ইনভিটেশন ব্রডকাস্ট
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ivory/80 font-sans max-w-3xl">
            ওয়েবসাইটের সাথে অফিসিয়াল চ্যানেল যুক্ত করুন এবং যেকোনো ইভেন্ট পাবলিশের সাথে সাথে ছবির মতো কার্ড ও সম্পূর্ণ ক্যাপশন এক ক্লিকে লাখো মানুষের কাছে ছড়িয়ে দিন।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-8">
        <AdminWhatsAppChannelConsole />
      </main>
    </div>
  );
}
