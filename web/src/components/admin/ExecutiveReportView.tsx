"use client";

import { Printer, HeartHandshake } from "lucide-react";
import { ExecutiveReportSummary } from "@/lib/reporting";
import { toBengaliDigits } from "@/lib/format";

interface ExecutiveReportViewProps {
  summary: ExecutiveReportSummary;
}

export function ExecutiveReportView({ summary }: ExecutiveReportViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Action Header - Light Theme */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white border border-sand/80 shadow-soft print:hidden">
        <div>
          <h2 className="font-ui text-lg sm:text-xl font-bold text-ink">
            ১-ক্লিক প্রাতিষ্ঠানিক এক্সিকিউটিভ রিপোর্ট
          </h2>
          <p className="text-xs sm:text-sm text-muted font-ui mt-0.5">
            পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ডের উপস্থাপনের জন্য প্রিন্ট ও পিডিএফ-রেডি সারাংশ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-brand-950 font-ui text-sm font-extrabold transition-all shadow-md shadow-lime-500/20 cursor-pointer min-h-11"
          >
            <Printer className="size-4 stroke-[2.5]" />
            <span>প্রিন্ট / PDF ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* Printable Report Canvas - Light Clean Style */}
      <div
        id="executive-printable-report"
        className="p-6 sm:p-10 rounded-3xl bg-white border border-sand/80 shadow-soft space-y-8 print:p-0 print:border-none print:shadow-none"
      >
        {/* Printable Official Header */}
        <div className="border-b border-sand/60 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:border-b-2 print:border-gray-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 text-brand-900 border border-lime-300 text-xs font-bold mb-2">
              আস-সুন্নাহ ফাউন্ডেশন • কেন্দ্রীয় মনিটরিং সেল
            </div>
            <h1 className="font-ui text-2xl sm:text-3xl font-extrabold text-ink">
              জাতীয় ইমাম ও দ্বীনি নেতৃত্ব প্রশিক্ষণ: সার্বিক অগ্রগতি প্রতিবেদন
            </h1>
            <p className="text-xs sm:text-sm text-muted font-ui mt-1">
              প্রতিবেদন প্রস্তুতের তারিখ: {summary.generatedAtBn}
            </p>
          </div>

          <div className="text-right hidden sm:block print:block">
            <span className="text-xs font-mono text-muted">
              CONFIDENTIAL • ASF-EXEC-REP
            </span>
          </div>
        </div>

        {/* 4 Core Pillars Stats Grid - Light Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:gap-3">
          <div className="p-5 rounded-2xl bg-sand/20 border border-sand/80 shadow-2xs">
            <span className="text-xs text-muted font-ui font-medium">
              মোট নিবন্ধিত প্রশিক্ষণার্থী
            </span>
            <p className="text-3xl font-black text-ink font-ui mt-1.5">
              {toBengaliDigits(summary.totalTrainees)} জন
            </p>
            <span className="text-[11px] text-brand-700 font-bold font-ui mt-1 block">
              ৬৪ জেলার সক্রিয় নেটওয়ার্ক
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
            <span className="text-xs text-emerald-800 font-ui font-medium">
              ভৌগোলিক জেলা কভারেজ
            </span>
            <p className="text-3xl font-black text-emerald-700 font-ui mt-1.5">
              {toBengaliDigits(summary.totalDistricts)}টি জেলা
            </p>
            <span className="text-[11px] text-muted font-ui mt-1 block">
              উপকূলীয় ও হাওরাঞ্চল অন্তর্ভুক্ত
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs">
            <span className="text-xs text-amber-800 font-ui font-medium">
              অনুমোদিত মাঠপর্যায়ের কার্যক্রম
            </span>
            <p className="text-3xl font-black text-amber-700 font-ui mt-1.5">
              {toBengaliDigits(summary.totalActivitiesApproved)}টি
            </p>
            <span className="text-[11px] text-muted font-ui mt-1 block">
              মোট {toBengaliDigits(summary.totalPhotosCount)}টি স্থিরচিত্র যাচাইকৃত
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-sand/20 border border-sand/80 shadow-2xs">
            <span className="text-xs text-muted font-ui font-medium">
              প্রদত্ত মোট আমল পয়েন্ট
            </span>
            <p className="text-3xl font-black text-brand-900 font-ui mt-1.5">
              {toBengaliDigits(summary.totalPointsAwarded)}
            </p>
            <span className="text-[11px] text-brand-700 font-bold font-ui mt-1 block">
              সক্রিয়তার ভিত্তিতে স্কোরিং
            </span>
          </div>
        </div>

        {/* Disaster Relief Mobilization Readiness Block */}
        <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="size-5 text-rose-700" />
            <h3 className="font-ui text-base font-bold text-rose-950">
              জরুরি দুর্যোগ সাড়াদান সেল কার্যক্ষমতা
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-ui">
            <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <span className="text-muted">মোট ত্রাণ ব্রডকাস্ট:</span>
              <p className="text-lg font-bold text-ink mt-0.5">
                {toBengaliDigits(summary.reliefSummary.totalBroadcasts)}টি ক্যাম্পেইন
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <span className="text-muted">তলবকৃত ভলান্টিয়ার ও ইমাম:</span>
              <p className="text-lg font-bold text-ink mt-0.5">
                {toBengaliDigits(summary.reliefSummary.totalVolunteersMobilized)} জন
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <span className="text-muted">তাত্ক্ষণিক প্রস্তুত সাড়াদান:</span>
              <p className="text-lg font-bold text-emerald-700 mt-0.5">
                {toBengaliDigits(summary.reliefSummary.totalReadyVolunteers)} জন ({toBengaliDigits(summary.reliefSummary.readyRatePercent)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Activity Breakdown Section */}
        <div className="space-y-4">
          <h3 className="font-ui text-base font-bold text-ink border-b border-sand/60 pb-2">
            কাজের ধরন অনুযায়ী সার্বিক বিভাজন (Activity Breakdown)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {summary.activityBreakdown.map(item => (
              <div
                key={item.code}
                className="p-4 rounded-xl bg-sand/20 border border-sand/80 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs font-ui">
                  <span className="font-bold text-ink">
                    {item.labelBn}
                  </span>
                  <span className="font-bold text-brand-800">
                    {toBengaliDigits(item.count)}টি ({toBengaliDigits(item.percentage)}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-sand/80 overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full"
                  />
                </div>

                <div className="text-[11px] text-muted text-right font-medium">
                  মোট পয়েন্ট: {toBengaliDigits(item.points)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Districts Table */}
        <div className="space-y-4">
          <h3 className="font-ui text-base font-bold text-ink border-b border-sand/60 pb-2">
            শীর্ষ জেলাসমূহের পারফরম্যান্স ও অংশগ্রহণ
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-sand/80">
            <table className="w-full text-left font-ui text-xs">
              <thead className="bg-sand/30 text-ink/80 border-b border-sand/60">
                <tr>
                  <th className="p-3">জেলা</th>
                  <th className="p-3">নিবন্ধিত প্রশিক্ষণার্থী</th>
                  <th className="p-3">সম্পাদিত কার্যক্রম</th>
                  <th className="p-3 text-right">অর্জিত পয়েন্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/60">
                {summary.districtBreakdown.slice(0, 8).map(d => (
                  <tr key={d.district} className="hover:bg-sand/20 transition-colors">
                    <td className="p-3 font-bold text-ink">
                      {d.district} জেলা
                    </td>
                    <td className="p-3 text-muted font-medium">
                      {toBengaliDigits(d.traineeCount)} জন
                    </td>
                    <td className="p-3 text-emerald-700 font-bold">
                      {toBengaliDigits(d.activityCount)}টি
                    </td>
                    <td className="p-3 text-right text-brand-900 font-bold">
                      {toBengaliDigits(d.pointsAwarded)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Signature Section */}
        <div className="pt-8 border-t border-sand/60 flex justify-between items-end text-xs font-ui">
          <div className="space-y-1">
            <p className="font-bold text-ink">প্রতিবেদন সত্যায়ন:</p>
            <p className="text-muted">আস-সুন্নাহ ফাউন্ডেশন মনিটরিং সেল</p>
            <p className="text-[11px] text-muted/80">আফতাবনগর, ঢাকা ১২১২</p>
          </div>

          <div className="text-right space-y-1">
            <div className="w-36 border-b border-sand/80 mb-1.5 ml-auto" />
            <p className="font-bold text-ink">শায়খ আহমাদুল্লাহ</p>
            <p className="text-muted">চেয়ারম্যান, আস-সুন্নাহ ফাউন্ডেশন</p>
          </div>
        </div>
      </div>
    </div>
  );
}
