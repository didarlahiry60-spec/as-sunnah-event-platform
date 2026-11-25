export interface NewsletterSubscriber {
  id: string;
  emailOrPhone: string;
  type: "EMAIL" | "PHONE";
  createdAt: string;
}

// In-memory persistent subscriber registry
const subscribersStore: NewsletterSubscriber[] = [
  {
    id: "sub-1",
    emailOrPhone: "student@example.com",
    type: "EMAIL",
    createdAt: "২০২৬-১১-২১T১২:০০:০০Z"
  }
];

export async function subscribeToNewsletter(rawInput: string): Promise<{
  success: boolean;
  message: string;
  subscriber?: NewsletterSubscriber;
}> {
  const input = rawInput.trim();
  if (!input) {
    return { success: false, message: "অনুগ্রহ করে আপনার ইমেইল অথবা মোবাইল নম্বর লিখুন।" };
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  const isPhone = /^(?:\+?880|0)?1[3-9]\d{8}$/.test(input.replace(/[-+ ]/g, ""));

  if (!isEmail && !isPhone) {
    return {
      success: false,
      message: "সঠিক ইমেইল ঠিকানা বা ১১ ডিজিটের মোবাইল নম্বর লিখুন।"
    };
  }

  const normalized = input.toLowerCase();
  const existing = subscribersStore.find(s => s.emailOrPhone.toLowerCase() === normalized);
  if (existing) {
    return {
      success: true,
      message: "আপনি ইতিমধ্যে আস-সুন্নাহ ফাউন্ডেশনের নিউজলেটারে যুক্ত আছেন। জাযাকাল্লাহু খাইরান!",
      subscriber: existing
    };
  }

  const newSub: NewsletterSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    emailOrPhone: input,
    type: isEmail ? "EMAIL" : "PHONE",
    createdAt: new Date().toISOString()
  };

  subscribersStore.unshift(newSub);

  return {
    success: true,
    message: "আলহামদুলিল্লাহ! আস-সুন্নাহ ফাউন্ডেশন নিউজলেটারে আপনার সাবস্ক্রিপশন সম্পন্ন হয়েছে।",
    subscriber: newSub
  };
}

export function getAllSubscribers(): NewsletterSubscriber[] {
  return [...subscribersStore];
}
