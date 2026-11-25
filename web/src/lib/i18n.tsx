"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { messages } from "./messages";
import { messagesEn } from "./messages.en";

export type Locale = "bn" | "en";

const STORAGE_KEY = "assunnah_lang";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: typeof messages;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "bn",
  setLocale: () => {},
  t: messages,
});

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)assunnah_lang=(bn|en)(?:;|$)/);
  return match ? (match[1] as Locale) : null;
}

export function LanguageProvider({
  children,
  initialLocale = "bn",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const cookieLang = readCookieLocale();
    const storedLang =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(STORAGE_KEY) as Locale | null)
        : null;
    const resolved: Locale =
      cookieLang === "en" || cookieLang === "bn"
        ? cookieLang
        : storedLang === "en"
        ? "en"
        : initialLocale;
    setLocaleState(resolved);
    if (typeof document !== "undefined") {
      document.documentElement.lang = resolved;
    }
  }, [initialLocale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    if (typeof document !== "undefined") {
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = next;
    }
    router.refresh();
  };

  const t = locale === "en" ? messagesEn : messages;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
