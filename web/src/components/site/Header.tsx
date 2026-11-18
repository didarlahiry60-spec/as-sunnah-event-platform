"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { messages } from "@/lib/messages";

const navLinks = [
  ["/events", messages.nav.events],
  ["/notices", messages.nav.notices],
  ["/about", messages.nav.about],
  ["/blog", messages.nav.blog],
  ["/gallery", messages.nav.gallery],
  ["/contact", messages.nav.contact],
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
        <Link href="/" aria-label={`${messages.brand.name} ${messages.nav.home}`} className="flex items-center">
          <AsSunnahLogo variant={solid || open ? "dark" : "light"} />
        </Link>
        <nav className="hidden items-center gap-7 font-ui md:flex" aria-label={messages.nav.mainNavLabel}>
          {navLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className={`transition-colors font-medium ${
                solid ? "hover:text-brand-800 text-ink/90" : "hover:text-lime-300 text-ivory/95"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/portal" variant="accent" prefetch={false} className="hidden sm:inline-flex">
            {messages.nav.login}
          </Button>
          <button
            className="grid size-12 place-items-center rounded-lg focus-visible:outline-2 focus-visible:outline-accent-500 md:hidden cursor-pointer"
            aria-label={open ? messages.nav.closeMenu : messages.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="border-t border-accent-500/30 px-5 pb-6 font-ui md:hidden bg-ivory text-ink shadow-lg"
          aria-label={messages.nav.mobileNavLabel}
        >
          {navLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              prefetch={false}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center text-lg font-medium border-b border-sand/70 active:bg-sand/40 text-brand-950"
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <Button href="/portal" variant="primary" prefetch={false} className="w-full">
              {messages.nav.login}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
