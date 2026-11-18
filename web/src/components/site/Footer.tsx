import { AsSunnahLogo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-ivory/80">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <AsSunnahLogo variant="light" showSubtitle={true} className="mb-4" />
        <p className="mt-2 max-w-md text-ivory/80">
          প্রশিক্ষণ, কর্মশালা ও সেমিনারের মাধ্যমে জ্ঞান, দক্ষতা ও সেবার পথে একসাথে।
        </p>
        <div className="mt-8 flex flex-col gap-4 border-t border-accent-500/30 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} আস-সুন্নাহ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6 text-ivory/70 font-ui text-sm">
            <span>প্রাইভেসি পলিসি</span>
            <span>ব্যবহারের শর্তাবলি</span>
            <span>সাহায্য ও যোগাযোগ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
