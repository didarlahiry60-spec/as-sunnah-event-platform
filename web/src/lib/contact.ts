import { db } from "@/lib/db";
import { normalizeBdPhone } from "@/lib/format";

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "UNREAD" | "READ" | "REPLIED";
}

// In-memory store for contact inquiries
const contactMessagesStore: ContactMessage[] = [
  {
    id: "msg-1",
    name: "মাওলানা মাহমুদুর রহমান",
    phone: "01711223344",
    email: "mahmud@example.com",
    subject: "ইমাম প্রশিক্ষণ ব্যাচ ৫ এর রেজিস্ট্রেশন সংক্রান্ত",
    message: "আসসালামু আলাইকুম, ইমাম প্রশিক্ষণ পরবর্তী ব্যাচের আবেদন কবে শুরু হবে অনুগ্রহ করে জানালে উপকৃত হতাম।",
    createdAt: "২০২৬-১১-২০T১০:৩০:০০Z",
    status: "READ"
  }
];

export async function createContactMessage(data: {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const cleanPhone = normalizeBdPhone(data.phone);
  const newMsg: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    phone: cleanPhone || data.phone.trim(),
    email: data.email?.trim() || undefined,
    subject: data.subject.trim(),
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
    status: "UNREAD"
  };

  contactMessagesStore.unshift(newMsg);

  // Attempt database backup if MessageLog model is available
  try {
    const prismaClient = db as unknown as {
      messageLog?: {
        create: (args: {
          data: {
            channel: string;
            body: string;
            status: string;
          };
        }) => Promise<unknown>;
      };
    };

    if (prismaClient && typeof prismaClient.messageLog?.create === "function") {
      await prismaClient.messageLog.create({
        data: {
          channel: "CONTACT_FORM",
          body: JSON.stringify({
            name: newMsg.name,
            phone: newMsg.phone,
            email: newMsg.email,
            subject: newMsg.subject,
            message: newMsg.message
          }),
          status: "RECEIVED"
        }
      });
    }
  } catch {
    // Graceful fallback to persistent runtime memory store
  }

  return newMsg;
}

export function getAllContactMessages(): ContactMessage[] {
  return [...contactMessagesStore];
}
