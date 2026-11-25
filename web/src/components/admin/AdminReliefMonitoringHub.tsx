"use client";

import { useState } from "react";
import { Radio, Image as ImageIcon, Star, FileText } from "lucide-react";
import { ReliefBroadcastSummary } from "@/lib/relief";
import { LivePhotoWallItem, ExecutiveReportSummary } from "@/lib/reporting";
import { AdminTraineeItem } from "@/lib/trainee-admin";
import { ReliefBroadcastConsole } from "./ReliefBroadcastConsole";
import { LivePhotoWall } from "./LivePhotoWall";
import { TraineeDirectoryRating } from "./TraineeDirectoryRating";
import { ExecutiveReportView } from "./ExecutiveReportView";

interface AdminReliefMonitoringHubProps {
  initialBroadcasts: ReliefBroadcastSummary[];
  initialPhotos: LivePhotoWallItem[];
  initialTrainees: AdminTraineeItem[];
  reportSummary: ExecutiveReportSummary;
  defaultTab?: "RELIEF" | "WALL" | "TRAINEES" | "REPORT";
}

export function AdminReliefMonitoringHub({
  initialBroadcasts,
  initialPhotos,
  initialTrainees,
  reportSummary,
  defaultTab = "RELIEF",
}: AdminReliefMonitoringHubProps) {
  const [activeTab, setActiveTab] = useState<"RELIEF" | "WALL" | "TRAINEES" | "REPORT">(
    defaultTab
  );

  const tabs = [
    {
      id: "RELIEF" as const,
      label: "জরুরি ত্রাণ সেল ও রেসপন্স",
      icon: Radio,
    },
    {
      id: "WALL" as const,
      label: "লাইভ ফটো ওয়াল",
      icon: ImageIcon,
    },
    {
      id: "TRAINEES" as const,
      label: "গোপন ১-৫ স্টার রেটিং ও ডিরেক্টরি",
      icon: Star,
    },
    {
      id: "REPORT" as const,
      label: "১-ক্লিক এক্সিকিউটিভ রিপোর্ট",
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Switcher - Light Theme */}
      <div className="flex space-x-1.5 sm:space-x-2 border border-sand/80 bg-white p-2 rounded-2xl shadow-soft overflow-x-auto no-scrollbar print:hidden">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-11 inline-flex items-center gap-2 rounded-xl px-4 py-2 font-ui text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-brand-950 text-lime-400 shadow-sm font-bold"
                  : "text-muted hover:text-ink hover:bg-sand/50"
              }`}
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === "RELIEF" && (
        <ReliefBroadcastConsole initialBroadcasts={initialBroadcasts} />
      )}

      {activeTab === "WALL" && <LivePhotoWall initialPhotos={initialPhotos} />}

      {activeTab === "TRAINEES" && (
        <TraineeDirectoryRating initialTrainees={initialTrainees} />
      )}

      {activeTab === "REPORT" && <ExecutiveReportView summary={reportSummary} />}
    </div>
  );
}
