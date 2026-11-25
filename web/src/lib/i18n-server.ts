import { cookies } from "next/headers";
import { messages } from "./messages";
import { messagesEn } from "./messages.en";
import type { Locale } from "./i18n";

export async function getServerLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const val = cookieStore.get("assunnah_lang")?.value;
    return val === "en" ? "en" : "bn";
  } catch {
    return "bn";
  }
}

export async function getServerMessages() {
  const locale = await getServerLocale();
  return {
    locale,
    t: locale === "en" ? messagesEn : messages,
  };
}
