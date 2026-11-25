"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export function NewsletterSubscription() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: input.trim() })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "সাবস্ক্রিপশন ব্যর্থ হয়েছে।");
      } else {
        setSuccessMsg(data.message);
        setInput("");
      }
    } catch {
      setErrorMsg("সংযোগ বিচ্ছিন্ন হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-brand-800 bg-brand-900/40 p-6 sm:p-8 backdrop-blur-xs">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-lime-400 font-ui text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
            <Mail className="size-4" />
            <span>আস-সুন্নাহ ই-নিউজলেটার</span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-ivory">
            নতুন ইভেন্ট ও দাওয়াহ নোটিশ পান সবার আগে
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm text-ivory/70 font-sans leading-relaxed">
            আসন্ন কর্মশালা, রেজিস্ট্রেশন তারিখ ও বিশেষ সার্কুলার সরাসরি আপনার ইনবক্সে পৌঁছে যাবে।
          </p>
        </div>

        <div className="w-full md:max-w-md">
          {successMsg ? (
            <div className="flex items-center gap-2.5 rounded-2xl border border-lime-500/40 bg-lime-500/10 p-4 text-xs sm:text-sm text-lime-300 font-ui">
              <CheckCircle2 className="size-5 shrink-0 text-lime-400" />
              <span>{successMsg}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="আপনার ইমেইল বা মোবাইল নম্বর..."
                  disabled={loading}
                  className="w-full min-h-12 rounded-xl border border-sand/30 bg-brand-950/70 pl-4 pr-4 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:border-lime-400 focus:bg-brand-950 focus:outline-none font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl accent-foil-bg px-6 font-ui text-xs sm:text-sm font-bold text-brand-950 shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <span>সাবস্ক্রাইব</span>
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {errorMsg && (
            <p className="mt-2 text-xs text-red-400 font-ui pl-1">
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
