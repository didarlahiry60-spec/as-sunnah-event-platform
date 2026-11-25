"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { sanitizeRedirectUrl } from "@/lib/format";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/applications";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("ইমেইল ও পাসওয়ার্ড উভয়ই প্রদান আবশ্যক");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "ভুল ইমেইল বা পাসওয়ার্ড। পুনরায় চেষ্টা করুন।");
        return;
      }

      // Successful login -> navigate to intended admin page (sanitized against open redirects)
      const target = sanitizeRedirectUrl(from, "/admin/applications");
      router.push(target);
      router.refresh();
    } catch {
      setError("নেটওয়ার্ক ত্রুটি। ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-sand/20 bg-brand-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex justify-center mb-4">
          <AsSunnahLogo variant="dark" />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-500/20 px-3 py-1 text-xs font-semibold text-lime-400 border border-lime-500/30 font-ui mb-3">
          <ShieldCheck className="size-3.5" />
          <span>কেন্দ্রীয় প্রশাসনিক সেল</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-ivory tracking-tight">
          অ্যাডমিন লগইন
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-ivory/70 font-sans">
          আস-সুন্নাহ ফাউন্ডেশন প্রশিক্ষণ ও ইভেন্ট ম্যানেজমেন্ট প্রশাসনিক কনসোল
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div role="alert" className="mt-5 rounded-xl border border-red-500/40 bg-red-950/60 p-3.5 text-xs text-red-200 flex items-start gap-2.5">
          <AlertCircle className="size-4 shrink-0 text-red-400 mt-0.5" />
          <span className="font-sans leading-relaxed">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="admin-email"
            className="block font-ui text-xs font-bold text-ivory/90 mb-1.5"
          >
            অ্যাডমিন ইমেইল
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ivory/40" />
            <input
              id="admin-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@assunnahfoundation.org"
              className="w-full min-h-12 rounded-xl border border-sand/20 bg-brand-950/60 pl-10 pr-4 py-2 text-sm text-ivory placeholder:text-ivory/30 focus:border-lime-400 focus:bg-brand-950/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 transition"
              autoComplete="username email"
              autoFocus
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block font-ui text-xs font-bold text-ivory/90 mb-1.5"
          >
            গোপন পাসওয়ার্ড
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ivory/40" />
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full min-h-12 rounded-xl border border-sand/20 bg-brand-950/60 pl-10 pr-11 py-2 text-sm text-ivory placeholder:text-ivory/30 focus:border-lime-400 focus:bg-brand-950/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 transition font-sans"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-ivory p-1 cursor-pointer"
              aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-400 px-6 font-ui text-base font-bold text-brand-950 transition-[background-color,transform] duration-150 active:scale-[0.98] shadow-xs cursor-pointer disabled:opacity-50 mt-4"
        >
          <span>{loading ? "যাচাই করা হচ্ছে..." : "অ্যাডমিন প্যানেলে প্রবেশ করুন"}</span>
          <ArrowRight className="size-4" />
        </button>
      </form>

      {/* Return to website */}
      <div className="mt-8 pt-5 border-t border-sand/15 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-ui text-sm font-medium text-ivory/70 hover:text-ivory transition"
        >
          <ArrowLeft className="size-4" />
          <span>মূল ওয়েবসাইটে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-brand-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Atmospheric Background Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-lime-500/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 size-[400px] rounded-full bg-brand-700/20 blur-[160px]"
        aria-hidden="true"
      />

      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-3xl border border-sand/20 bg-brand-900/70 p-8 text-center text-ivory">
            <p className="font-ui text-sm">লোড হচ্ছে...</p>
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>

      <p className="mt-6 text-center text-[11px] text-ivory/40 font-sans max-w-xs">
        সুরক্ষিত আস-সুন্নাহ সিস্টেমস • সমস্ত অধিকার সংরক্ষিত © ২০২৬
      </p>
    </div>
  );
}
