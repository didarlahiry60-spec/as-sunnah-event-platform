"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, KeyRound, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { messages } from "@/lib/messages";

export function TraineeLogin({
  initialError,
}: {
  initialError?: string;
}) {
  const msg = messages.portal;

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"MOBILE" | "OTP">("MOBILE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    initialError === "expired"
      ? "ম্যাজিক লিংকের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে ওটিপি দিয়ে লগইন করুন।"
      : initialError === "invalid"
      ? "অকার্যকর ম্যাজিক লিংক। অনুগ্রহ করে মোবাইল ওটিপি দিয়ে লগইন করুন।"
      : null
  );

  // Send OTP handler
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!mobile.trim()) {
      setError("অনুগ্রহ করে আপনার মোবাইল নম্বরটি লিখুন");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "ওটিপি পাঠাতে সমস্যা হয়েছে। সঠিক নম্বর দিন।");
        return;
      }

      setStep("OTP");
    } catch {
      setError("নেটওয়ার্ক সংযোগ ত্রুটি। পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otp.trim()) {
      setError("অনুগ্রহ করে ৬ ডিজিটের ওটিপি লিখুন");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "ভুল ওটিপি কোড। পুনরায় চেষ্টা করুন।");
        return;
      }

      // Login successful -> redirect to portal with full document navigation
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/portal";
    } catch {
      setError("যাচাইকরণে ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-sand/90 bg-white p-7 sm:p-9 shadow-xl shadow-brand-950/5">
        {/* Top Multi-Color Islamic Brand Stripe */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-950 via-lime-500 to-amber-400" />

        <div className="text-center mb-7 pt-1">
          <AsSunnahLogo variant="dark" className="justify-center mb-4" />
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-ink">
            {step === "MOBILE" ? msg.loginTitle : "ওটিপি কোড যাচাই"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-muted font-sans">
            {step === "MOBILE"
              ? msg.loginSubtitle
              : `${mobile} নম্বরে প্রেরিত ৬ ডিজিটের কোডটি লিখুন`}
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-5 flex items-start gap-2.5 rounded-2xl border border-danger/30 bg-danger/5 p-4 text-xs text-danger shadow-xs">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {step === "MOBILE" ? (
          <form className="space-y-4" onSubmit={handleSendOtp}>
            <div>
              <label htmlFor="portal-mobile" className="block font-ui text-xs font-bold text-ink/90 mb-1.5">
                {msg.mobileLabel}
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  id="portal-mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder={msg.mobilePlaceholder}
                  className="w-full min-h-12 rounded-xl border border-sand bg-ivory/50 pl-10 pr-4 py-2 text-sm text-ink placeholder:text-muted focus:border-lime-500 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 transition-colors"
                  autoFocus
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted">
                {msg.mobileHint}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 px-6 font-ui text-base font-extrabold text-brand-950 transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] shadow-md hover:shadow-lg shadow-lime-500/20 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? msg.sendingOtp : msg.sendOtpButton}</span>
              <ArrowRight className="size-4 stroke-[2.5]" />
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div>
              <label htmlFor="portal-otp" className="block font-ui text-xs font-bold text-ink/90 mb-1.5">
                {msg.otpLabel}
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  id="portal-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder={msg.otpPlaceholder}
                  className="w-full min-h-12 text-center tracking-widest font-mono text-xl font-bold rounded-xl border border-sand bg-ivory/50 pl-10 pr-4 py-2 text-ink focus:border-lime-500 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 transition-colors"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 px-6 font-ui text-base font-extrabold text-brand-950 transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] shadow-md hover:shadow-lg shadow-lime-500/20 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? msg.verifyingOtp : msg.verifyOtpButton}</span>
              <CheckCircle2 className="size-4 stroke-[2.5]" />
            </button>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep("MOBILE")}
                className="font-ui text-xs text-muted hover:text-ink cursor-pointer"
              >
                নম্বর পরিবর্তন করুন
              </button>
              <button
                type="button"
                onClick={() => handleSendOtp()}
                className="font-ui text-xs text-brand-700 font-semibold hover:underline cursor-pointer"
              >
                {msg.resendOtp}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-5 border-t border-sand text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-brand-800 hover:text-brand-950 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
