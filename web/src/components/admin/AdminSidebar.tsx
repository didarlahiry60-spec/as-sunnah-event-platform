"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  ClipboardCheck,
  Clock,
  Radio,
  Send,
  QrCode,
  Rocket,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Global ESC key listener to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Clean, focused navigation modules (no noisy subtitles or crowded badges)
  const links = [
    {
      href: "/admin/applications",
      label: "আবেদন ও স্ক্রিনিং",
      icon: Users,
    },
    {
      href: "/admin/submissions",
      label: "মাঠপর্যায়ের কার্যক্রম",
      icon: ClipboardCheck,
    },
    {
      href: "/admin/automation",
      label: "স্বয়ংক্রিয় ফলো-আপ",
      icon: Clock,
    },
    {
      href: "/admin/relief",
      label: "মনিটরিং ও ত্রাণ সেল",
      icon: Radio,
    },
    {
      href: "/admin/whatsapp",
      label: "WhatsApp চ্যানেল",
      icon: Send,
    },
    {
      href: "/admin/checkin",
      label: "চেক-ইন স্ক্যানার",
      icon: QrCode,
    },
    {
      href: "/admin/launch",
      label: "লঞ্চ কনসোল",
      icon: Rocket,
    },
  ];

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between p-5">
      {/* 1. Brand & Header */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-sand/15">
          <Link
            href="/admin/applications"
            className="flex items-center gap-3 group min-w-0"
            onClick={() => setIsMobileOpen(false)}
          >
            <Image
              src="/as-sunnah-logo-light.svg"
              alt="আস-সুন্নাহ ফাউন্ডেশন"
              width={48}
              height={34}
              priority
              className="h-9 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-ivory text-base tracking-tight leading-snug whitespace-nowrap group-hover:text-lime-300 transition-colors">
                আস-সুন্নাহ
              </span>
              <span className="font-ui text-xs font-semibold text-lime-400 leading-none whitespace-nowrap mt-0.5">
                অ্যাডমিন পোর্টাল
              </span>
            </div>
          </Link>

          {/* Close button for Mobile Drawer */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-xl text-ivory/70 hover:text-ivory hover:bg-white/10 active:scale-95 transition cursor-pointer"
            aria-label="মেনু বন্ধ করুন"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* 2. Clean, uncluttered navigation links */}
        <nav className="mt-6 space-y-1.5" aria-label="অ্যাডমিন সাইডবার মেনু">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/applications" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-ui text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-lime-500 text-brand-950 font-bold shadow-md shadow-lime-950/20"
                    : "text-ivory/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`size-5 shrink-0 ${
                    isActive ? "text-brand-950 stroke-[2.5]" : "text-lime-400"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. Footer Actions (Clean & Minimal) */}
      <div className="pt-5 border-t border-sand/15 space-y-2.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl px-4 py-2.5 font-ui text-xs font-semibold text-ivory/70 hover:text-ivory hover:bg-white/10 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="size-4 text-lime-400" />
            <span>মূল ওয়েবসাইট</span>
          </span>
          <span className="text-[10px] text-ivory/50">লাইভ</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-ui text-xs font-bold text-red-300 hover:text-white bg-red-950/50 hover:bg-red-900/80 border border-red-500/30 transition-all active:scale-[0.98] cursor-pointer shadow-xs disabled:opacity-50"
        >
          <LogOut className="size-4 shrink-0" />
          <span>{loggingOut ? "লগআউট হচ্ছে..." : "লগআউট করুন"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-brand-950 text-ivory px-4 py-3 flex items-center justify-between border-b border-sand/20 shadow-md">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 px-3 py-2 text-xs font-bold font-ui text-lime-400 border border-lime-400/30 transition cursor-pointer"
          aria-label="অ্যাডমিন মেনু খুলুন"
        >
          <Menu className="size-5 text-lime-400" />
          <span>মেনু</span>
        </button>

        <div className="flex items-center gap-2.5">
          <Image
            src="/as-sunnah-logo-light.svg"
            alt="আস-সুন্নাহ ফাউন্ডেশন"
            width={36}
            height={26}
            className="h-7 w-auto object-contain shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold text-ivory leading-none">
              আস-সুন্নাহ
            </span>
            <span className="font-ui text-[10px] font-semibold text-lime-400 leading-none mt-0.5">
              অ্যাডমিন
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-xs font-ui font-bold text-red-300 hover:text-red-100 bg-red-950/60 px-3 py-1.5 rounded-lg border border-red-500/30 transition"
        >
          লগআউট
        </button>
      </header>

      {/* Mobile Slide-out Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-brand-950/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="relative w-64 max-w-[80vw] h-full bg-brand-950 text-ivory shadow-2xl z-50 flex flex-col border-r border-emerald-950 animate-in slide-in-from-left duration-200"
            aria-label="মোবাইল অ্যাডমিন মেনু"
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Permanent Left Sidebar */}
      <aside
        className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 bg-brand-950 text-ivory flex-col justify-between border-r border-emerald-950 shadow-xl z-30"
        aria-label="অ্যাডমিন সাইডবার মেনু"
      >
        {navContent}
      </aside>
    </>
  );
}
