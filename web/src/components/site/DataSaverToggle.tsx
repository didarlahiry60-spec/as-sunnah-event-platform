"use client";

import { useSyncExternalStore, useEffect } from "react";
import { Zap, ZapOff, CheckCircle2 } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("data-saver-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("data-saver-change", callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("as_sunnah_data_saver") === "true";
}

function getServerSnapshot(): boolean {
  return false;
}

export function DataSaverToggle() {
  const isDataSaver = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sync HTML data attribute on initial render and state changes to ensure persistence across page navigation/reloads
  useEffect(() => {
    if (isDataSaver) {
      document.documentElement.setAttribute("data-saver-mode", "active");
    } else {
      document.documentElement.removeAttribute("data-saver-mode");
    }
  }, [isDataSaver]);

  const toggleDataSaver = () => {
    const nextState = !isDataSaver;
    if (nextState) {
      localStorage.setItem("as_sunnah_data_saver", "true");
      document.documentElement.setAttribute("data-saver-mode", "active");
    } else {
      localStorage.removeItem("as_sunnah_data_saver");
      document.documentElement.removeAttribute("data-saver-mode");
    }
    window.dispatchEvent(new Event("data-saver-change"));
  };

  return (
    <div
      className={`min-h-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3 sm:px-4 border transition-all ${
        isDataSaver
          ? "bg-brand-900/90 border-lime-500/50 shadow-md shadow-lime-950/20"
          : "bg-brand-900/40 border-sand/20 hover:border-sand/40"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`size-8 rounded-xl flex items-center justify-center transition-colors ${
            isDataSaver ? "bg-lime-500 text-brand-950" : "bg-white/10 text-ivory/70"
          }`}
        >
          {isDataSaver ? <Zap className="size-4" /> : <ZapOff className="size-4" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-ui text-xs sm:text-sm font-bold text-ivory">
              ডাটা সেভার মোড (২জি/৩জি)
            </span>
            {isDataSaver && (
              <span className="inline-flex items-center gap-1 rounded-full bg-lime-500/20 px-2 py-0.5 text-[10px] font-bold text-lime-400 border border-lime-500/30">
                <CheckCircle2 className="size-3" />
                চালু
              </span>
            )}
          </div>
          <p className="text-[11px] text-ivory/60 font-sans leading-tight">
            {isDataSaver
              ? "কম ব্যান্ডউইথ ও গ্রামীণ নেটওয়ার্কে দ্রুত লোড হচ্ছে।"
              : "দুর্বল ইন্টারনেটে ডাটা ও সময় সাশ্রয় করতে চালু করুন।"}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isDataSaver}
        aria-label="ডাটা সেভার মোড টগল করুন"
        onClick={toggleDataSaver}
        className={`min-h-12 min-w-28 px-4 py-2 inline-flex items-center justify-center gap-2 rounded-xl font-ui text-xs font-bold transition-all cursor-pointer ${
          isDataSaver
            ? "bg-lime-500 hover:bg-lime-400 text-brand-950 shadow-sm"
            : "bg-white/10 hover:bg-white/20 text-ivory border border-sand/30"
        }`}
      >
        {isDataSaver ? "মোড বন্ধ করুন" : "মোড চালু করুন"}
      </button>
    </div>
  );
}
