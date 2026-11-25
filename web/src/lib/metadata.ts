import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "আস-সুন্নাহ ইভেন্ট ও ফলো-আপ প্ল্যাটফর্ম | আস-সুন্নাহ ফাউন্ডেশন",
  description: "আস-সুন্নাহ ফাউন্ডেশনের প্রশিক্ষণ, কর্মশালা ও সেমিনারের আবেদন, ডিজিটাল ইনভিটেশন ও ফলো-আপ প্ল্যাটফর্ম।",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://assunnahfoundation.org"),
  icons: {
    icon: [
      { url: "/as-sunnah-official-seal.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/as-sunnah-official-seal.svg",
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
  },
  openGraph: {
    title: "আস-সুন্নাহ ইভেন্ট ও ফলো-আপ প্ল্যাটফর্ম | আস-সুন্নাহ ফাউন্ডেশন",
    description: "আস-সুন্নাহ ফাউন্ডেশনের জাতীয় প্রশিক্ষণ, সেমিনার, ডিজিটাল ইনভিটেশন ও ফলো-আপ প্ল্যাটফর্ম।",
    url: "https://assunnahfoundation.org",
    siteName: "আস-সুন্নাহ ফাউন্ডেশন (As-Sunnah Foundation)",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "আস-সুন্নাহ ফাউন্ডেশন",
      },
      {
        url: "/as-sunnah-logo.png",
        width: 1200,
        height: 630,
        alt: "আস-সুন্নাহ ফাউন্ডেশন প্ল্যাটফর্ম ব্যানার",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "আস-সুন্নাহ ইভেন্ট ও ফলো-আপ প্ল্যাটফর্ম",
    description: "আস-সুন্নাহ ফাউন্ডেশনের প্রশিক্ষণ, কর্মশালা ও সেমিনারের আবেদন ও ডিজিটাল ইনভিটেশন প্ল্যাটফর্ম।",
    images: ["/as-sunnah-logo.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "আস-সুন্নাহ",
  },
};
