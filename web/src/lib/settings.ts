import { messages } from "@/lib/messages";

// In-memory runtime settings store (persists across requests during server runtime)
let runtimeWhatsAppChannelUrl: string = process.env.WHATSAPP_CHANNEL_URL || "";

/**
 * Gets the current active WhatsApp Channel URL (empty string if not configured)
 */
export function getWhatsAppChannelUrl(): string {
  return runtimeWhatsAppChannelUrl;
}

/**
 * Updates the active WhatsApp Channel URL (or clears it when empty)
 */
export function setWhatsAppChannelUrl(url: string): { success: boolean; url: string; error?: string } {
  const trimmed = url.trim();
  if (!trimmed) {
    runtimeWhatsAppChannelUrl = "";
    return { success: true, url: "" };
  }
  // Validate basic URL shape
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return { success: false, url: runtimeWhatsAppChannelUrl, error: "সঠিক URL প্রদান করুন (যেমন: https://whatsapp.com/channel/...)" };
  }

  runtimeWhatsAppChannelUrl = trimmed;
  return { success: true, url: runtimeWhatsAppChannelUrl };
}
