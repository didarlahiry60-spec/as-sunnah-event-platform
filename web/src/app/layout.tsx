import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Anek_Bangla, Noto_Serif_Bengali, Noto_Sans_Bengali, Inter, Amiri } from "next/font/google";
import "./globals.css";
import { SiteLayoutClient } from "@/components/site/SiteLayoutClient";
import { PwaRegister } from "@/components/site/PwaRegister";

const body = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--f-body",
  display: "swap",
  fallback: ["Hind Siliguri", "Anek Bangla", "Noto Sans Bengali", "Kalpurush", "SolaimanLipi", "Vrinda", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const display = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["600", "700", "800"],
  variable: "--f-display",
  display: "swap",
  fallback: ["Anek Bangla", "Hind Siliguri", "Noto Sans Bengali", "Kalpurush", "SolaimanLipi", "Vrinda", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const ui = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700"],
  variable: "--f-ui",
  display: "swap",
  fallback: ["Anek Bangla", "Hind Siliguri", "Noto Sans Bengali", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const serif = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["600", "700"],
  variable: "--f-serif",
  display: "swap",
  fallback: ["Noto Serif Bengali", "Kalpurush", "serif"],
  adjustFontFallback: true,
});

const noto = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--f-noto",
  display: "swap",
  fallback: ["Noto Sans Bengali", "Kalpurush", "sans-serif"],
  adjustFontFallback: true,
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--f-latin",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const arabic = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--f-arabic",
  display: "swap",
  fallback: ["Amiri", "Scheherazade New", "Traditional Arabic", "serif"],
});

import { siteMetadata } from "@/lib/metadata";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: "#04180F",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  return (
    <html lang={locale} className={`${body.variable} ${display.variable} ${ui.variable} ${serif.variable} ${noto.variable} ${latin.variable} ${arabic.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/Bornomala-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Bornomala-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/UbuntuSans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&display=swap"
        />
      </head>
      <body>
        <SiteLayoutClient initialLocale={locale}>{children}</SiteLayoutClient>
        <PwaRegister />
      </body>
    </html>
  );
}
