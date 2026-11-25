import type { Metadata } from "next";
import { LaunchConsole } from "@/components/admin/LaunchConsole";
import { messages } from "@/lib/messages";

export const metadata: Metadata = {
  title: `প্রোডাকশন লঞ্চ ও রেডিনেস কনসোল | ${messages.brand.name}`,
  description:
    "আস-সুন্নাহ ফাউন্ডেশন প্ল্যাটফর্মের চূড়ান্ত লঞ্চ প্রস্তুতি: ৮টি স্প্রিন্ট, সিকিউরিটি ইনভ্যারিয়েন্ট, রেট লিমিটিং, পিডব্লিউএ ও WCAG 2.2 অ্যাক্সেসিবিলিটি অডিট কনসোল।",
};

export const dynamic = "force-dynamic";

export default function AdminLaunchPage() {
  return (
    <main className="w-full mx-auto max-w-7xl px-4 sm:px-8 py-8">
      <LaunchConsole />
    </main>
  );
}
