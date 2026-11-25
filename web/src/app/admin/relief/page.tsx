import type { Metadata } from "next";
import { AdminReliefMonitoringHub } from "@/components/admin/AdminReliefMonitoringHub";
import { getAllReliefBroadcasts } from "@/lib/relief";
import { getLivePhotoWall, getExecutiveReportSummary } from "@/lib/reporting";
import { getAdminTraineesList } from "@/lib/trainee-admin";
import { messages } from "@/lib/messages";
import { Radio } from "lucide-react";

export const metadata: Metadata = {
  title: `জরুরি ত্রাণ সেল ও লাইভ মনিটরিং | ${messages.brand.name}`,
  description:
    "আস-সুন্নাহ ফাউন্ডেশন কেন্দ্রীয় মনিটরিং সেল: লাইভ ফটো ওয়াল, গোপন ১-৫ স্টার রেটিং, জরুরি ত্রাণ ব্রডকাস্ট ও ১-ক্লিক এক্সিকিউটিভ রিপোর্ট।",
};

export const dynamic = "force-dynamic";

export default async function AdminReliefPage() {
  const broadcasts = await getAllReliefBroadcasts();
  const photos = await getLivePhotoWall(36);
  const trainees = await getAdminTraineesList();
  const reportSummary = await getExecutiveReportSummary();

  const msg = messages.adminRelief;

  return (
    <div className="w-full">
      {/* Top Header Banner */}
      <section className="bg-brand-950/95 py-6 px-4 sm:px-8 text-ivory border-b border-sand/20 print:hidden">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 px-3 py-1 border border-red-500/30 font-ui text-xs font-bold text-red-400 mb-2">
            <Radio className="size-4 animate-pulse" />
            <span>{msg.badge}</span>
          </div>

          <h1 className="font-display text-xl sm:text-3xl font-bold text-ivory">
            {msg.pageTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ivory/80 font-sans max-w-3xl">
            {msg.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
        <AdminReliefMonitoringHub
          initialBroadcasts={broadcasts}
          initialPhotos={photos}
          initialTrainees={trainees}
          reportSummary={reportSummary}
          defaultTab="RELIEF"
        />
      </main>
    </div>
  );
}
