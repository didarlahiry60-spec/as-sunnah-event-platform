import { Metadata } from "next";
import { TraineeLogin } from "@/components/portal/TraineeLogin";

export const metadata: Metadata = {
  title: "প্রশিক্ষণার্থী লগইন | আস-সুন্নাহ ফাউন্ডেশন",
  description: "পাসওয়ার্ডবিহীন এসএমএস ওটিপি ও ম্যাজিক লিংকের মাধ্যমে সরাসরি প্রশিক্ষণার্থী পোর্টালে প্রবেশ করুন।",
};

export default async function PortalLoginPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top Header Glow */}
      <section className="relative overflow-hidden bg-brand-950 pt-24 pb-12 text-ivory">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-xl px-5 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/40 bg-brand-900/80 px-3.5 py-1 font-ui text-xs font-semibold text-lime-400">
            <span>আস-সুন্নাহ ফাউন্ডেশন প্রশিক্ষণার্থী পোর্টাল</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ivory sm:text-4xl">
            পাসওয়ার্ডহীন স্মার্ট লগইন
          </h1>
          <p className="mt-2 text-xs text-ivory/80 sm:text-sm">
            ইমাম ও মাদরাসা শিক্ষকদের জন্য অতি সহজ ও নিরাপদ এক-ক্লিক ওটিপি এক্সেস।
          </p>
        </div>
      </section>

      {/* Main Login Form Container */}
      <main className="mx-auto max-w-md px-4 py-8">
        <TraineeLogin
          initialError={searchParams.error}
        />
      </main>
    </div>
  );
}
