import type { Metadata } from "next";
import { AutomationDashboard } from "@/components/admin/AutomationDashboard";
import { messages } from "@/lib/messages";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: `স্বয়ংক্রিয় ফলো-আপ ও সময়সূচি | ${messages.brand.name}`,
  description:
    "আস-সুন্নাহ ফাউন্ডেশন কেন্দ্রীয় ফলো-আপ ব্যবস্থা: খুতবা পুশ, আমল রিমাইন্ডার, আইয়ামে বিজ, মাসিক রিপোর্ট ও নিয়মিত যোগাযোগ।",
};

export default function AdminAutomationPage() {
  const msg = messages.adminAutomation;

  return (
    <div className="w-full">
      {/* Top Header Banner */}
      <section className="bg-brand-950/95 py-6 px-4 sm:px-8 text-ivory border-b border-sand/20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sand/20 px-3 py-1 border border-sand/30 font-ui text-xs font-bold text-lime-400 mb-2">
            <Clock className="size-4" />
            <span>{msg.badge}</span>
          </div>

          <h1 className="font-display text-xl sm:text-3xl font-bold text-ivory">
            {msg.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ivory/80 font-sans max-w-3xl">
            {msg.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-8">
        <AutomationDashboard />
      </main>
    </div>
  );
}
