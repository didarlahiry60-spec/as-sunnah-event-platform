import type { Metadata } from "next";
import Link from "next/link";
import { Users, Award, BookOpen, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { messages } from "@/lib/messages";
import { TRAINER_PROFILES } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: `${messages.aboutPage.title} | ${messages.brand.name}`,
  description: messages.aboutPage.subtitle,
};

const objectives = [
  {
    icon: BookOpen,
    title: "বিশুদ্ধ দ্বীনি জ্ঞান ও আধুনিক শিক্ষণপদ্ধতি",
    desc: "প্রথাগত দ্বীনি শিক্ষার সাথে সমকালীন মনস্তত্ত্ব, যোগাযোগ দক্ষতা ও ডিজিটাল প্ল্যাটফর্ম ব্যবহারের সমন্বয় সাধন।",
  },
  {
    icon: Users,
    title: "মসজিদভিত্তিক সামাজিক নেতৃত্ব ও সংস্কার",
    desc: "ইমাম ও খতিবদের শুধুমাত্র নামাজের ইমামতির বাইরে এনে মহল্লার পরিচ্ছন্নতা, মাদক প্রতিরোধ ও সমাজকল্যাণে নেতা হিসেবে গড়ে তোলা।",
  },
  {
    icon: Award,
    title: "স্বচ্ছতা ও জাতীয় জরুরি রেসপন্স নেটওয়ার্ক",
    desc: "বন্যা, সাইক্লোন কিংবা যেকোনো জাতীয় দুর্যোগে সরাসরি মসজিদ ও মাদরাসার মাধ্যমে দ্রুততম সময়ে সুষম মানবিক ত্রাণ পৌঁছানো।",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-brand-950 pt-32 pb-24 text-ivory">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-brand-900/80 px-5 py-2 font-ui text-sm font-semibold text-lime-400">
                <span className="size-2.5 rounded-full bg-lime-400" aria-hidden="true" />
                <span>{messages.aboutPage.badge}</span>
              </div>

              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-ivory">
                {messages.aboutPage.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg sm:text-xl xl:text-2xl text-ivory/80 leading-relaxed font-sans">
                {messages.aboutPage.subtitle}
              </p>
            </div>

            {/* Quick Institutional Highlights */}
            <div className="flex flex-wrap gap-4 font-ui text-sm">
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">প্রতিষ্ঠাতা ও চেয়ারম্যান</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-400">
                  শায়খ আহমাদুল্লাহ
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">সেবাপ্রাপ্ত মানুষ</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-accent-500">
                  ১ কোটিরও বেশি
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">মাঠপর্যায়ে সেবা</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-300">
                  ৬৪ জেলায় নেটওয়ার্ক
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Balanced 2-Column Desktop Grid) */}
      <section className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid gap-8 xl:gap-10 lg:grid-cols-12 items-stretch">
          {/* Main Mission Card (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-sand/90 bg-white p-10 sm:p-12 xl:p-14 shadow-lg flex flex-col justify-between">
            <div>
              <span className="font-ui text-sm xl:text-base font-bold uppercase tracking-wider text-brand-600">
                আমাদের দৃষ্টিভঙ্গি
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-ink leading-tight">
                {messages.aboutPage.missionHeading}
              </h2>
              <p className="mt-6 text-lg sm:text-xl xl:text-2xl leading-relaxed text-ink/85 font-sans">
                {messages.aboutPage.missionBody}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-sand">
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-ui font-bold text-brand-800">
                <CheckCircle2 className="size-5 text-brand-600" />
                <span>শতভাগ অপার্থিব ও জনকল্যাণমুখী</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-ui font-bold text-brand-800">
                <CheckCircle2 className="size-5 text-brand-600" />
                <span>স্বচ্ছ আর্থিক ব্যবস্থাপনা ও অডিট</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-ui font-bold text-brand-800">
                <CheckCircle2 className="size-5 text-brand-600" />
                <span>সারাদেশে সক্রিয় স্বেচ্ছাসেবক নেটওয়ার্ক</span>
              </div>
            </div>
          </div>

          {/* Institutional Commitments Card (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl border border-brand-800 bg-brand-950 p-10 sm:p-12 text-ivory shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-brand-900/80 px-4 py-1 text-xs font-semibold text-lime-400 font-ui mb-4">
                <span>মূল অঙ্গীকারসমূহ</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                আস-সুন্নাহর ৪টি মূল ভিত্তি
              </h3>
              <ul className="mt-6 space-y-4 text-base xl:text-lg text-ivory/85 font-sans">
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-lime-400 mt-2 shrink-0" />
                  <span>বিশুদ্ধ তাওহীদ ও সুন্নাহর ভিত্তিতে মুসলিম ঐক্য গঠন</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-accent-400 mt-2 shrink-0" />
                  <span>ইমাম ও মাদরাসা শিক্ষকদের যুগোপযোগী দাওয়াহ ও নেতৃত্বে দক্ষ করা</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-lime-400 mt-2 shrink-0" />
                  <span>প্রতিটি পাই-পয়সার স্বাধীন আন্তর্জাতিক অডিট ও জবাবদিহিতা</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-accent-400 mt-2 shrink-0" />
                  <span>জাতীয় যেকোনো দুর্যোগে নিরপেক্ষ ও সর্বোচ্চ দ্রুততায় ত্রাণ বিতরণ</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-brand-800 pt-5 flex items-center justify-between text-sm font-ui text-ivory/70">
              <span>রেজিস্ট্রেশন নং: এস-১২৮৮২/২০১৮</span>
              <span className="text-lime-400 font-bold">স্থাপিত ২০১৮</span>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="bg-sand/30 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-ui text-sm xl:text-base font-bold uppercase tracking-wider text-brand-600">
              আমাদের কর্মপদ্ধতি
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-ink">
              {messages.aboutPage.objectivesHeading}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 xl:gap-12 sm:grid-cols-3">
            {objectives.map(obj => {
              const Icon = obj.icon;
              return (
                <div
                  key={obj.title}
                  className="rounded-3xl border border-sand bg-white p-8 xl:p-10 shadow-soft transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid size-16 place-items-center rounded-2xl bg-lime-100 text-brand-800 mb-6">
                    <Icon className="size-8" />
                  </div>
                  <h3 className="font-display text-2xl xl:text-3xl font-bold text-ink">{obj.title}</h3>
                  <p className="mt-4 text-base xl:text-lg leading-relaxed text-muted font-sans">{obj.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trainer Profiles Section */}
      <section className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-ui text-sm xl:text-base font-bold uppercase tracking-wider text-brand-600">
            দক্ষ ও অভিজ্ঞ শিক্ষক পরিষদ
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-ink">
            {messages.aboutPage.trainersHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg xl:text-xl text-muted font-sans">
            {messages.aboutPage.trainersSubtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINER_PROFILES.map(tr => (
            <div
              key={tr.id}
              className="flex flex-col justify-between rounded-3xl border border-sand bg-white p-8 xl:p-10 shadow-soft transition-all hover:border-brand-600/40 hover:shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* Avatar Placeholder Badge */}
                <div className="flex items-center gap-5">
                  <div className="grid size-18 place-items-center rounded-2xl bg-brand-950 font-display text-2xl font-bold text-lime-400 border-2 border-lime-500/40">
                    {tr.name.charAt(0) === "শ" ? "আ" : tr.name.split(" ")[1]?.charAt(0) || "আ"}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink">{tr.name}</h3>
                    <p className="font-ui text-base font-bold text-brand-700">{tr.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm font-semibold text-ink/75 font-ui">{tr.designation}</p>
                <p className="mt-3 text-base xl:text-lg leading-relaxed text-muted font-sans line-clamp-4">{tr.bio}</p>
              </div>

              {/* Specialization Tags */}
              <div className="mt-8 flex flex-wrap gap-2.5 border-t border-sand/70 pt-5">
                {tr.specialization.map(s => (
                  <span
                    key={s}
                    className="rounded-full bg-sand/80 px-3.5 py-1 font-ui text-xs sm:text-sm font-bold text-brand-950"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auditorium & Complex Facilities */}
      <section className="bg-brand-950 py-20 md:py-28 text-ivory">
        <div className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-brand-900/60 px-5 py-2 font-ui text-sm font-semibold text-lime-400">
              <Building2 className="size-5" />
              <span>অবকাঠামো ও সুবিধা</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-ivory">
              {messages.aboutPage.complexHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg xl:text-xl text-ivory/80 font-sans">
              {messages.aboutPage.complexSubtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-6 xl:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {messages.aboutPage.complexFacilities.map(fac => (
              <div
                key={fac.title}
                className="rounded-3xl border border-brand-800 bg-brand-900/60 p-8 xl:p-10 shadow-lg backdrop-blur-xs transition-all hover:border-lime-500/40 hover:-translate-y-1"
              >
                <h3 className="font-display text-2xl xl:text-3xl font-bold text-lime-300">{fac.title}</h3>
                <p className="mt-4 text-base xl:text-lg leading-relaxed text-ivory/85 font-sans">{fac.desc}</p>
              </div>
            ))}
          </div>

          {/* Photo Gallery Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-brand-800 shadow-md group">
              <img
                src="/images/events/sheikh-ahmadullah-dawah-training.jpg"
                alt="শায়খ আহমাদুল্লাহর দাওয়াহ প্রশিক্ষণ"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-ui text-xs font-semibold text-lime-300">
                দাওয়াহ প্রশিক্ষণ ও দিকনির্দেশনা
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-brand-800 shadow-md group">
              <img
                src="/images/events/imam-training-closing-ceremony.jpg"
                alt="ইমাম প্রশিক্ষণ সমাপনী অনুষ্ঠান"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-ui text-xs font-semibold text-lime-300">
                ইমাম কোর্সের সমাপনী সমাবেশ
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-brand-800 shadow-md group">
              <img
                src="/images/events/trainee-interactive-workshop.jpg"
                alt="প্রশিক্ষণার্থীদের ক্লাসরুম সেশন"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-ui text-xs font-semibold text-lime-300">
                নিবিড় ক্লাসরুম ওয়ার্কশপ
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-brand-800 shadow-md group">
              <img
                src="/images/events/islamic-economics-multimedia-class.jpg"
                alt="মাল্টিমিডিয়া অডিটোরিয়াম ক্লাস"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-ui text-xs font-semibold text-lime-300">
                মাল্টিমিডিয়া অডিটোরিয়াম লেকচার
              </span>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center gap-2.5 rounded-full accent-foil-bg px-10 font-ui text-lg font-bold text-brand-950 transition-all hover:brightness-110 shadow-xl cursor-pointer"
            >
              <span>আমাদের সাথে সরাসরি যোগাযোগ করুন</span>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
