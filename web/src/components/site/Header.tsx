"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AsSunnahLogo } from "@/components/ui/Logo";

const links = [
  ["/events", "ইভেন্ট"],
  ["/notices", "নোটিশ"],
  ["/about", "আমাদের সম্পর্কে"],
  ["/blog", "ব্লগ"],
  ["/gallery", "গ্যালারি"],
  ["/contact", "যোগাযোগ"],
] as const;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? "bg-ivory/95 text-ink shadow-soft backdrop-blur" : "text-ivory"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="আস-সুন্নাহ ইভেন্ট হোমপেজ" className="flex items-center">
          <AsSunnahLogo variant={solid || open ? "dark" : "light"} />
        </Link>
        <nav className="hidden items-center gap-7 font-ui md:flex" aria-label="প্রধান মেনু">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-accent-500 transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/portal" variant="accent" className="hidden min-h-10! sm:inline-flex">
            লগইন
          </Button>
          <button
            className="grid size-12 place-items-center rounded-lg focus-visible:outline-2 focus-visible:outline-accent-500 md:hidden"
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-accent-500/30 px-5 pb-5 font-ui md:hidden bg-ivory text-ink" aria-label="মোবাইল মেনু">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg border-b border-sand/70 active:bg-sand/40"
            >
              {label}
            </Link>
          ))}
          <Button href="/portal" variant="primary" className="mt-4 w-full">
            লগইন
          </Button>
        </nav>
      )}
    </header>
  );
}
