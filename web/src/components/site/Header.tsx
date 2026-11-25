"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Calendar,
  Bell,
  Info,
  BookOpen,
  Image as ImageIcon,
  Phone,
  User,
  Menu,
  X,
} from "lucide-react";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { messages } from "@/lib/messages";

const navLinks = [
  { href: "/", label: messages.nav.home, icon: Home },
  { href: "/about", label: messages.nav.about, icon: Info },
  { href: "/events", label: messages.nav.events, icon: Calendar },
  { href: "/gallery", label: messages.nav.gallery, icon: ImageIcon },
  { href: "/blog", label: messages.nav.blog, icon: BookOpen },
  { href: "/notices", label: messages.nav.notices, icon: Bell },
  { href: "/contact", label: messages.nav.contact, icon: Phone },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Track scroll for subtle shadow/elevation change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape key & lock scroll when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Dedicated consoles (Trainee Portal Dashboard & Admin Console) have their own navigation.
  if (
    pathname?.startsWith("/admin") ||
    (pathname?.startsWith("/portal") && pathname !== "/portal/login")
  ) {
    return null;
  }

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      {/* Floating Navbar Pill Container */}
      <div
        className={`mx-auto max-w-7xl rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-sand/80 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
          scrolled ? "shadow-lg shadow-brand-950/8 border-sand" : "shadow-md shadow-brand-950/4"
        }`}
      >
        {/* 1. Left: Official As-Sunnah Logo */}
        <Link
          href="/"
          aria-label={`${messages.brand.name} ${messages.nav.home}`}
          className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
        >
          <AsSunnahLogo variant="dark" />
        </Link>

        {/* 2. Center: Desktop Horizontal Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-7 font-ui text-sm font-semibold text-ink/80"
          aria-label="মূল ওয়েবসাইট মেনু"
        >
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`transition-all duration-150 pb-1 border-b-2 cursor-pointer ${
                  isActive
                    ? "text-brand-700 font-bold border-brand-600"
                    : "border-transparent text-ink/80 hover:text-brand-700 hover:border-brand-600/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: Utility Actions (Language Switcher, User Icon, Portal Button & Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <div className="hidden sm:inline-flex items-center rounded-xl bg-sand/60 p-0.5 text-xs font-ui border border-sand">
            <span className="rounded-lg bg-emerald-100 text-brand-950 font-bold px-2 py-0.5 shadow-2xs">
              বাং
            </span>
            <span className="px-2 py-0.5 text-muted hover:text-ink cursor-default">
              EN
            </span>
          </div>

          {/* User / Trainee Icon */}
          <Link
            href="/portal/login"
            className="inline-flex items-center justify-center size-9 rounded-xl bg-amber-100/70 hover:bg-amber-100 text-amber-900 border border-amber-300/40 transition-colors active:scale-95 cursor-pointer shadow-2xs"
            aria-label="প্রশিক্ষণার্থী লগইন"
            title="প্রশিক্ষণার্থী লগইন"
          >
            <User className="size-4.5 stroke-[2.2]" />
          </Link>

          {/* Portal / Login CTA Button */}
          <Link
            href="/portal"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-ui font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
          >
            <span>{messages.nav.login}</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl text-ink/80 hover:bg-sand/40 active:scale-95 transition cursor-pointer"
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
          >
            {open ? <X className="size-6 text-brand-900" /> : <Menu className="size-6 text-brand-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Dropdown Card */}
      {open && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl pointer-events-auto">
          <div className="rounded-2xl bg-white border border-sand/90 shadow-2xl p-5 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="space-y-1" aria-label="মোবাইল নেভিগেশন">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-ui text-sm font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-sand/80 text-brand-950 font-bold border-l-4 border-lime-500 rounded-l-none"
                        : "text-ink/85 hover:bg-sand/40 hover:text-brand-900"
                    }`}
                  >
                    <Icon className={`size-4.5 ${isActive ? "text-brand-700 stroke-[2.5]" : "text-muted"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-sand/80 flex items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-xl bg-sand/60 p-0.5 text-xs font-ui border border-sand">
                <span className="rounded-lg bg-emerald-100 text-brand-950 font-bold px-2 py-0.5">
                  বাং
                </span>
                <span className="px-2 py-0.5 text-muted">
                  EN
                </span>
              </div>

              <Link
                href="/portal"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-ui font-bold text-xs shadow-xs text-center"
              >
                {messages.nav.login}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
