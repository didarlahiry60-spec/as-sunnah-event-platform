import type { Metadata } from "next";
import { ApplicationManagement } from "@/components/admin/ApplicationManagement";
import { messages } from "@/lib/messages";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `আবেদন ব্যবস্থাপনা | ${messages.brand.name}`,
  description: "আস-সুন্নাহ ফাউন্ডেশন আবেদন ব্যবস্থাপনা, অটো-স্ক্রিনিং স্কোর ও প্রবেশপত্র ট্র্যাকিং।",
};

export default function AdminApplicationsPage() {
  return (
    <div className="w-full">
      {/* Top Header Banner */}
      <section className="bg-brand-950/95 py-6 px-4 sm:px-8 text-ivory border-b border-sand/20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sand/20 px-3 py-1 border border-sand/30 font-ui text-xs font-bold text-lime-400 mb-2">
            <ShieldCheck className="size-4" />
            <span>{messages.admin.badge}</span>
          </div>

          <h1 className="font-display text-xl sm:text-3xl font-bold text-ivory">
            {messages.admin.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ivory/80 font-sans max-w-2xl">
            {messages.admin.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-8">
        <ApplicationManagement />
      </main>
    </div>
  );
}
