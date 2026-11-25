import type { Metadata } from "next";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { messages } from "@/lib/messages";

export const metadata: Metadata = {
  title: `প্রশাসনিক ড্যাশবোর্ড | ${messages.brand.name}`,
  description: "আস-সুন্নাহ ফাউন্ডেশন কেন্দ্রীয় প্রশিক্ষণ ও ইভেন্ট ম্যানেজমেন্ট প্রশাসনিক প্ল্যাটফর্ম।",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
