import Link from "next/link";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { Home, Calendar, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between">
      {/* Top Header Banner */}
      <section className="relative overflow-hidden bg-brand-950 pt-32 pb-24 text-ivory text-center px-6">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto mb-6 flex justify-center">
            <AsSunnahLogo variant="light" />
          </div>

          {/* 404 Pointed Arch Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-brand-900/80 px-4 py-1.5 font-ui text-sm font-semibold text-lime-400 mb-4">
            <HelpCircle className="size-4" />
            <span>ত্রুটি ৪০৪ (404 Error)</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ivory tracking-tight">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>

          <p className="mt-4 text-base sm:text-lg lg:text-xl text-ivory/80 max-w-lg mx-auto font-sans leading-relaxed">
            আপনি যে ঠিকানাটি খুঁজছেন তা হয়তো পরিবর্তিত হয়েছে, সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল টাইপ করা হয়েছে।
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-13 items-center gap-2.5 rounded-full accent-foil-bg px-8 font-ui text-base font-bold text-brand-950 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Home className="size-5" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>

            <Link
              href="/events"
              className="inline-flex min-h-13 items-center gap-2.5 rounded-full border border-lime-500/40 bg-brand-900/80 px-8 font-ui text-base font-bold text-lime-300 hover:bg-brand-900 transition-all cursor-pointer"
            >
              <Calendar className="size-5" />
              <span>ইভেন্ট ক্যালেন্ডার দেখুন</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Helpful Links Grid */}
      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        <h3 className="font-display text-xl font-bold text-ink text-center mb-6">
          হয়তো আপনি নিচের পৃষ্ঠাগুলোর কোনো একটি খুঁজছিলেন:
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/events"
            className="rounded-2xl border border-sand bg-white p-5 shadow-soft hover:border-brand-600/40 hover:shadow-md transition-all text-center"
          >
            <span className="block font-display text-lg font-bold text-ink">ইভেন্ট ও প্রশিক্ষণ</span>
            <span className="block font-ui text-xs text-muted mt-1">আসন্ন সকল কোর্স ও কর্মশালা</span>
          </Link>

          <Link
            href="/notices"
            className="rounded-2xl border border-sand bg-white p-5 shadow-soft hover:border-brand-600/40 hover:shadow-md transition-all text-center"
          >
            <span className="block font-display text-lg font-bold text-ink">নোটিশ বোর্ড</span>
            <span className="block font-ui text-xs text-muted mt-1">জরুরি বিজ্ঞপ্তি ও ফলাফল</span>
          </Link>

          <Link
            href="/contact"
            className="rounded-2xl border border-sand bg-white p-5 shadow-soft hover:border-brand-600/40 hover:shadow-md transition-all text-center"
          >
            <span className="block font-display text-lg font-bold text-ink">যোগাযোগ কেন্দ্র</span>
            <span className="block font-ui text-xs text-muted mt-1">সরাসরি সহায়তা ও পরামর্শ</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
