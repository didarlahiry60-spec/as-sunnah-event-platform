"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export function SiteLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSpecialPortal =
    pathname?.startsWith("/admin") ||
    (pathname?.startsWith("/portal") && pathname !== "/portal/login");

  if (isSpecialPortal) {
    return <main>{children}</main>;
  }

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col antialiased">
      {/* Floating Top Horizontal Navbar */}
      <Header />

      {/* Main Page Content Canvas */}
      <main className="flex-1 min-w-0 flex flex-col">{children}</main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
