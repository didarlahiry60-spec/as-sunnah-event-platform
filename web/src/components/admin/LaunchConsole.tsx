"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Database,
  Layers,
  Activity,
  Lock,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";
import { messages } from "@/lib/messages";

interface HealthCheckData {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: string;
    memory: string;
    security: string;
  };
  system?: {
    nodeVersion: string;
    platform: string;
    activeRateLimiters: number;
  };
}

export function LaunchConsole() {
  const [health, setHealth] = useState<HealthCheckData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sprints = [
    {
      id: 1,
      title: "স্প্রিন্ট ১: ব্র্যান্ডিং, কোর ডাটা মডেল ও ডিজাইন সিস্টেম",
      desc: "ফাউন্ডেশন ডিজাইন টোকেন, কালার প্যালেট, প্রিজমা ডাটাবেজ স্কিমা ও মাস্টার মেসেজ ডিকশনারি।",
      status: "সম্পূর্ণ",
      tests: "৬টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 2,
      title: "স্প্রিন্ট ২: পাবলিক পোর্টাল, ইভেন্ট হাব ও নোটিশ বোর্ড",
      desc: "হোমপেজ, ইভেন্ট লিস্টিং ও বিস্তারিত, নোটিশ হাব, ইসলামিক ব্লগ ও ফটো গ্যালারি।",
      status: "সম্পূর্ণ",
      tests: "৫টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 3,
      title: "স্প্রিন্ট ৩: আবেদন ইঞ্জিন, ডায়নামিক ফর্ম ও অটোমেটেড স্কোরিং",
      desc: "আবেদন ফর্ম, স্ক্রিনিং ক্রাইটেরিয়া, জেলা ভিত্তিক কোটা ও স্বয়ংক্রিয় স্কোরিং ইঞ্জিন।",
      status: "সম্পূর্ণ",
      tests: "৬টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 4,
      title: "স্প্রিন্ট ৪: এসএমএস ডিসপ্যাচ ও ভেন্যু কিউআর চেক-ইন ইঞ্জিন",
      desc: "বাল্ক সিলেকশন, ওয়েটলিস্ট ম্যানেজমেন্ট, এসএমএস ডিসপ্যাচ লগ ও তাৎক্ষণিক কিউআর স্ক্যানার।",
      status: "সম্পূর্ণ",
      tests: "৬টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 5,
      title: "স্প্রিন্ট ৫: ইমাম ও খতিব পোর্টাল, সার্টিফিকেট ও পয়েন্ট সিস্টেম",
      desc: "পাসওয়ার্ডবিহীন ওটিপি/ম্যাজিক লিংক লগইন, পাঠ্যসামগ্রী, ডিজিটাল সনদ ভেরিফিকেশন ও পয়েন্ট।",
      status: "সম্পূর্ণ",
      tests: "৭টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 6,
      title: "স্প্রিন্ট ৬: স্বয়ংক্রিয় ফলো-আপ শিডিউলার ও ক্রন ইঞ্জিন",
      desc: "ইনঅ্যাক্টিভিটি ট্র্যাকিং, জুমার খুতবা ও রমাদান বুস্টার অ্যালার্ট, ক্রন ক্যালকুলেটর।",
      status: "সম্পূর্ণ",
      tests: "৭টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 7,
      title: "স্প্রিন্ট ৭: গোপন ইমাম রেটিং, জরুরি ত্রাণ সেল ও এক্সিকিউটিভ রিপোর্ট",
      desc: "গোপন ১-৫ স্টার রেটিং, রেড ফ্ল্যাগ ও অ্যাডমিন কল লগ, লাইভ ফটো ওয়াল ও ১-ক্লিক প্রিন্ট রিপোর্ট।",
      status: "সম্পূর্ণ",
      tests: "৮টি ভেরিফিকেশন স্যুট",
    },
    {
      id: 8,
      title: "স্প্রিন্ট ৮: সিকিউরিটি হার্ডেনিং, রেট লিমিটিং, পিডব্লিউএ ও ফাইনাল লঞ্চ",
      desc: "সিকিউরিটি এইচটিটিপি হেডার্স, ইন-মেমোরি রেট লিমিটিং ডিফেন্স, পিডব্লিউএ ও WCAG 2.2 অ্যাক্সেসিবিলিটি।",
      status: "সম্পূর্ণ",
      tests: "ফাইনাল ভেরিফিকেশন",
    },
  ];

  const securityInvariants = [
    {
      name: "কঠোর ডাটা আইসোলেশন ও গোপন রেটিং সুরক্ষা",
      desc: "internalStars, redFlag এবং কল লগ কখনো পাবলিক বা প্রশিক্ষণার্থী একাউন্টে এক্সপোজ হয় না।",
      status: "সুরক্ষিত (Verified)",
    },
    {
      name: "ইন-মেমোরি রেট লিমিটিং ডিফেন্স",
      desc: "ওটিপি (৫/মিনিট), আবেদন (১০/মিনিট) ও কিউআর স্ক্যানার (৬০/মিনিট) কঠোরভাবে সুরক্ষিত।",
      status: "সক্রিয় (Active)",
    },
    {
      name: "ইনস্টিটিউশনাল সিকিউরিটি হেডার্স",
      desc: "HSTS, CSP (strict), X-Frame-Options (SAMEORIGIN), X-Content-Type-Options সম্পূর্ণ কনফিগার করা।",
      status: "পালিত (Enforced)",
    },
    {
      name: "আইডি গেসিং ও ওটিপি ব্রুট-ফোর্স ডিফেন্স",
      desc: "ধারাবাহিক ৫ বার ভুল ওটিপিতে টোকেন স্বয়ংক্রিয় বাতিল এবং অনুমোদন কার্ডে ফুল ক্রিপ্টোগ্রাফিক সুরক্ষা।",
      status: "লকডাউন (Hardened)",
    },
  ];

  const mobilePwaChecks = [
    {
      name: "Web App Manifest (PWA) সমর্থন",
      desc: "src/app/manifest.ts এর মাধ্যমে অ্যান্ড্রয়েড ডিভাইসে সরাসরি ইনস্টলযোগ্য 'Add to Home Screen'।",
      status: "প্রস্তুত (Ready)",
    },
    {
      name: "অফলাইন সার্ভিস ওয়ার্কার",
      desc: "পাবলিক/sw.js ব্যাকগ্রাউন্ড ক্যাশিং ও নেটওয়ার্ক বিচ্ছিন্নতায় অফলাইন ফলব্যাক পেজ প্রদান করে।",
      status: "সক্রিয় (Active)",
    },
    {
      name: "মোবাইল টাচ টার্গেট ও এক্সেসিবিলিটি (WCAG 2.2 AA)",
      desc: "সকল অ্যাকশনেবল বোতাম ও লিংক ন্যূনতম ৪৮px উচ্চতা (min-h-12) বজায় রাখে।",
      status: "পালিত (Compliant)",
    },
    {
      name: "গ্রামীণ ২জি/৩জি ডাটা সেভার মোড",
      desc: "দুর্বল নেটওয়ার্কে দ্রুত ব্রাউজিংয়ের জন্য ব্যান্ডউইথ সাশ্রয়ী মোড সক্রিয় রয়েছে।",
      status: "চালু (Active)",
    },
  ];

  const dbBackupChecks = [
    {
      name: "প্রিজমা রিলেশনাল স্কিমা ও কানেকশন পুলিং",
      desc: "ইভেন্ট, আবেদনকারী, সনদ, ট্রেইনি ও অ্যাক্টিভিটি সাবমিশন মডেল সুসংগঠিত।",
      status: "সচল (Connected)",
    },
    {
      name: "অটোমেটেড স্ন্যাপশট ও ডিজাস্টার রিকভারি",
      desc: "দৈনিক স্বয়ংক্রিয় ব্যাকআপ ও জরুরি ত্রাণ সেলের ডাটা সুরক্ষার ব্যাকআপ পলিসি।",
      status: "নিশ্চিত (Configured)",
    },
  ];

  const runDiagnostic = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/health");
      if (!res.ok) throw new Error("ডায়াগনস্টিক ফেচ ব্যর্থ হয়েছে");
      const data = await res.json();
      setHealth(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "অপ্রত্যাশিত ত্রুটি ঘটেছে");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Launch Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 border border-sand/20 p-6 sm:p-7 shadow-md text-ivory">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-500/20 px-3 py-1 border border-lime-500/40 font-ui text-xs font-bold text-lime-400">
              <CheckCircle2 className="size-4" />
              <span>{messages.launch.statusReady}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              {messages.launch.pageTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-ivory/80 max-w-2xl leading-relaxed">
              {messages.launch.pageSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={runDiagnostic}
            disabled={isLoading}
            className="min-h-11 px-5 py-2.5 inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-brand-950 font-ui font-bold text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>{isLoading ? messages.launch.runningDiagnostic : messages.launch.runDiagnostic}</span>
          </button>
        </div>

        {/* Live Diagnostic Display */}
        {error && (
          <div className="mt-5 rounded-xl bg-red-900/60 border border-red-500/40 p-3.5 text-xs text-red-200">
            {error}
          </div>
        )}

        {health && (
          <div className="mt-5 rounded-xl bg-black/30 border border-sand/20 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-sand/15 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="size-4.5 text-lime-400 animate-pulse" />
                <span className="font-ui text-xs sm:text-sm font-bold text-ivory">
                  {messages.launch.diagnosticHealthy}
                </span>
              </div>
              <span className="font-ui text-xs text-ivory/60">
                ভার্সন: v{health.version} | সময়: {new Date(health.timestamp).toLocaleTimeString("bn-BD")}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-ui">
              <div className="rounded-lg bg-white/5 p-2.5 border border-sand/15">
                <span className="text-ivory/60 block text-[11px]">{messages.launch.diagnosticUptime}</span>
                <span className="text-sm font-bold text-lime-400">{health.uptime} সেকেন্ড</span>
              </div>
              <div className="rounded-lg bg-white/5 p-2.5 border border-sand/15">
                <span className="text-ivory/60 block text-[11px]">{messages.launch.diagnosticMemory}</span>
                <span className="text-sm font-bold text-lime-400">{health.checks.memory}</span>
              </div>
              <div className="rounded-lg bg-white/5 p-2.5 border border-sand/15">
                <span className="text-ivory/60 block text-[11px]">{messages.launch.diagnosticDb}</span>
                <span className="text-sm font-bold text-lime-400">{health.checks.database}</span>
              </div>
              <div className="rounded-lg bg-white/5 p-2.5 border border-sand/15">
                <span className="text-ivory/60 block text-[11px]">{messages.launch.diagnosticRateLimit}</span>
                <span className="text-sm font-bold text-lime-400">সক্রিয় ({health.system?.activeRateLimiters ?? 0} চাবি)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sprints 1 to 8 Checklist */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-brand-950">
          <Layers className="size-5 text-brand-800" />
          <h3 className="font-display text-xl font-bold">
            {messages.launch.sprintChecklistTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sprints.map((s) => (
            <div
              key={s.id}
              className="rounded-xl bg-white border border-sand p-4.5 shadow-xs hover:border-brand-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-5.5 items-center justify-center rounded-md bg-brand-800 text-ivory font-ui text-xs font-bold">
                      {s.id}
                    </span>
                    <h4 className="font-ui text-sm font-bold text-brand-950">{s.title}</h4>
                  </div>
                  <p className="text-xs text-muted font-sans leading-relaxed pt-0.5">
                    {s.desc}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-ui text-[11px] font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    {s.status}
                  </span>
                  <span className="text-[10px] text-muted font-ui">{s.tests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Security & Rate Limiting | Mobile & PWA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Invariants */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-brand-950">
            <Lock className="size-5 text-accent-700" />
            <h3 className="font-display text-xl font-bold">
              {messages.launch.securityTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {securityInvariants.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white border border-sand p-4 shadow-xs space-y-1 hover:border-accent-400/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-ui text-xs sm:text-sm font-bold text-brand-950">
                    {item.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-200">
                    <ShieldCheck className="size-3 text-amber-600" />
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Accessibility & PWA */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-brand-950">
            <Smartphone className="size-5 text-brand-800" />
            <h3 className="font-display text-xl font-bold">
              {messages.launch.mobilePwaTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {mobilePwaChecks.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white border border-sand p-4 shadow-xs space-y-1 hover:border-lime-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-ui text-xs sm:text-sm font-bold text-brand-950">
                    {item.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    <Zap className="size-3 text-emerald-600" />
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Database & Infrastructure Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-brand-950">
          <Database className="size-5 text-brand-800" />
          <h3 className="font-display text-xl font-bold">
            {messages.launch.dbBackupTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dbBackupChecks.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white border border-sand p-4 shadow-xs space-y-1 hover:border-brand-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-ui text-xs sm:text-sm font-bold text-brand-950">
                  {item.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  <Server className="size-3 text-emerald-600" />
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-muted font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
