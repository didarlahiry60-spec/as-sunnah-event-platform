import type { Metadata } from "next";
import { AdminReliefMonitoringHub } from "@/components/admin/AdminReliefMonitoringHub";
import { getAllReliefBroadcasts } from "@/lib/relief";
import { getLivePhotoWall, getExecutiveReportSummary } from "@/lib/reporting";
import { getAdminTraineesList } from "@/lib/trainee-admin";
import { messages } from "@/lib/messages";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: `লাইভ ফটো ওয়াল ও এক্সিকিউটিভ রিপোর্ট | ${messages.brand.name}`,
  description:
    "আস-সুন্নাহ ফাউন্ডেশন কেন্দ্রীয় মনিটরিং সেল: সারা দেশের ইমামদের লাইভ ফিল্ড ফটো ওয়াল ও প্রাতিষ্ঠানিক এক্সিকিউটিভ রিপোর্ট।",
};

export const dynamic = "force-dynamic";

export default async function AdminMonitoringPage() {
  const broadcasts = await getAllReliefBroadcasts();
  const photos = await getLivePhotoWall(36);
  const trainees = await getAdminTraineesList();
  const reportSummary = await getExecutiveReportSummary();

  const msg = messages.adminMonitoring;

  return (
    <div className="w-full">
      {/* Top Header Banner */}
      <section className="bg-brand-950/95 py-6 px-4 sm:px-8 text-ivory border-b border-sand/20 print:hidden">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-500/20 px-3 py-1 border border-lime-400/30 font-ui text-xs font-bold text-lime-400 mb-2">
            <ImageIcon className="size-4" />
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
          defaultTab="WALL"
        />
      </main>
    </div>
  );
}
