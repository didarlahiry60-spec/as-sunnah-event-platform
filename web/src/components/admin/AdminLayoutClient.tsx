"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If on admin login page, render full-bleed login screen without admin sidebar/topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F2F4EC] text-ink flex flex-col lg:flex-row antialiased selection:bg-lime-400 selection:text-brand-950">
      {/* Responsive Left Sidebar & Mobile Navigation Header */}
      <AdminSidebar />

      {/* Main Admin Content Canvas */}
      <div className="flex-1 min-w-0 flex flex-col">
        {children}
      </div>
    </div>
  );
}
