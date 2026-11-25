import type { Metadata } from "next";
import { SAMPLE_NOTICES } from "@/lib/sample-data";
import { NoticesHub } from "@/components/notices/NoticesHub";
import { messages } from "@/lib/messages";
import { getServerMessages } from "@/lib/i18n-server";
import { Bell } from "lucide-react";
import { getWhatsAppChannelUrl } from "@/lib/settings";

export const metadata: Metadata = {
  title: `${messages.noticesPage.title} | ${messages.brand.name}`,
  description: messages.noticesPage.subtitle,
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const { locale, t } = await getServerMessages();
  const isEn = locale === "en";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Banner */}
      <section className="relative overflow-hidden bg-brand-950 pt-28 pb-16 text-ivory">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-brand-900/80 px-4 py-1.5 font-ui text-sm font-semibold text-lime-400">
                <Bell className="size-4" />
                <span>{t.noticesPage.badge}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-ivory">
                {t.noticesPage.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg sm:text-xl xl:text-2xl text-ivory/80 leading-relaxed font-sans">
                {t.noticesPage.subtitle}
              </p>
            </div>

            {/* Quick Institutional Notice Stats */}
            <div className="flex flex-wrap gap-4 font-ui text-sm">
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Latest Update" : "সর্বশেষ আপডেট"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-400">
                  {isEn ? "24/7 Live Circulars" : "২৪/৭ লাইভ সার্কুলার"}
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Urgent Notice" : "জরুরি নোটিশ"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-accent-500">
                  {isEn ? "1 Urgent Alert" : "১টি জরুরি বিজ্ঞপ্তি"}
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Selection Results" : "নির্বাচন ফলাফল"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-300">
                  {isEn ? "Published Online" : "অনলাইনে উন্মুক্ত"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Notices Hub */}
      <main className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* WhatsApp Channel Alert Bar */}
        <div className="mb-8 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#25D366] text-white shrink-0">
              <Bell className="size-5" />
            </div>
            <div>
              <span className="font-ui text-sm sm:text-base font-bold text-ink">
                {isEn
                  ? "Want new circulars and results first on WhatsApp?"
                  : "নতুন সার্কুলার ও রেজাল্ট সবার আগে সরাসরি হোয়াটসঅ্যাপে পেতে চান?"}
              </span>
              <p className="text-xs sm:text-sm text-muted font-sans">
                {isEn
                  ? "Follow As-Sunnah Foundation's official WhatsApp channel for instant notifications."
                  : "আস-সুন্নাহ ফাউন্ডেশনের অফিশিয়াল হোয়াটসঅ্যাপ চ্যানেল ফলো করুন এবং যেকোনো নোটিফিকেশন পান তাৎক্ষণিকভাবে।"}
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppChannelUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25D366] px-5 font-ui text-sm font-bold text-white shadow-sm hover:bg-[#20ba59] transition-all shrink-0 cursor-pointer"
          >
            <span>{t.whatsappChannel.joinButton}</span>
          </a>
        </div>

        <NoticesHub initialNotices={SAMPLE_NOTICES} />
      </main>
    </div>
  );
}
