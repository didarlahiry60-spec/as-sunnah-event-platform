"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LanguageProvider, type Locale } from "@/lib/i18n";

export function SiteLayoutClient({
  children,
  initialLocale = "bn",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const pathname = usePathname();
  const isSpecialPortal =
    pathname?.startsWith("/admin") ||
    (pathname?.startsWith("/portal") && pathname !== "/portal/login");

  if (isSpecialPortal) {
    return (
      <LanguageProvider initialLocale={initialLocale}>
        <main>{children}</main>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider initialLocale={initialLocale}>
      <div className="min-h-screen bg-ivory text-ink flex flex-col antialiased">
        {/* Floating Top Horizontal Navbar */}
        <Header />

        {/* Main Page Content Canvas */}
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>

        {/* Global Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
