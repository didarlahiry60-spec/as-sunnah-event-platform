import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali, Anek_Bangla, Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const body = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600"], variable: "--f-body", display: "swap" });
const display = Noto_Serif_Bengali({ subsets: ["bengali", "latin"], weight: ["600", "700"], variable: "--f-display", display: "swap" });
const ui = Anek_Bangla({ subsets: ["bengali", "latin"], weight: ["500", "600"], variable: "--f-ui", display: "swap" });
const latin = Inter({ subsets: ["latin"], variable: "--f-latin", display: "swap" });
const arabic = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--f-arabic", display: "swap" });

export const metadata: Metadata = {
  title: "আস-সুন্নাহ ইভেন্ট",
  description: "আস-সুন্নাহ ফাউন্ডেশনের প্রশিক্ষণ, কর্মশালা ও সেমিনারের আবেদন ও ফলো-আপ প্ল্যাটফর্ম।",
};
export const viewport: Viewport = { themeColor: "#07261A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${body.variable} ${display.variable} ${ui.variable} ${latin.variable} ${arabic.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
