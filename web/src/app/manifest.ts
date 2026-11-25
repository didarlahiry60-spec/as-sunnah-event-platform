import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "আস-সুন্নাহ ইভেন্ট ও ফলো-আপ",
    short_name: "আস-সুন্নাহ",
    description: "আস-সুন্নাহ ফাউন্ডেশন প্রশিক্ষণ, কর্মশালা ও ফলো-আপ প্ল্যাটফর্ম",
    start_url: "/",
    display: "standalone",
    background_color: "#04180F",
    theme_color: "#04180F",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/as-sunnah-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
