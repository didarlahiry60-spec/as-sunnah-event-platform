import type { Metadata } from "next";
import { SAMPLE_BLOG_POSTS } from "@/lib/sample-data";
import { BlogHub } from "@/components/blog/BlogHub";
import { messages } from "@/lib/messages";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: `${messages.blogPage.title} | ${messages.brand.name}`,
  description: messages.blogPage.subtitle,
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Banner */}
      <section className="relative overflow-hidden bg-brand-950 pt-28 pb-16 text-ivory">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-brand-900/80 px-4 py-1.5 font-ui text-sm font-semibold text-lime-400">
                <BookOpen className="size-4" />
                <span>{messages.blogPage.badge}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-ivory">
                {messages.blogPage.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg sm:text-xl xl:text-2xl text-ivory/80 leading-relaxed font-sans">
                {messages.blogPage.subtitle}
              </p>
            </div>

            {/* Quick KPI stats in Hero Header */}
            <div className="flex flex-wrap gap-4 font-ui text-sm">
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">প্রকাশিত প্রবন্ধ</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-400">
                  ১৫+ সংকলন
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">বিষয়ভিত্তিক বিভাগ</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-accent-500">
                  ৫টি ক্যাটাগরি
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">নিয়মিত পাঠক</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-300">
                  ৫০,০০০+ পাঠক
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-10 md:py-16">
        <BlogHub initialPosts={SAMPLE_BLOG_POSTS} />
      </main>
    </div>
  );
}
