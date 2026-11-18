import { AsSunnahLogo } from "@/components/ui/Logo";
import { toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";

export function Footer() {
  const currentYearBn = toBengaliDigits(new Date().getFullYear());

  return (
    <footer className="bg-brand-950 text-ivory/80">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <AsSunnahLogo variant="light" showSubtitle={true} className="mb-4" />
        <p className="mt-2 max-w-md text-ivory/80">
          {messages.brand.subSlogan}
        </p>
        <div className="mt-8 flex flex-col gap-4 border-t border-accent-500/30 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYearBn} {messages.brand.copyright}</p>
          <div className="flex flex-wrap gap-6 text-ivory/70 font-ui text-sm">
            <span className="hover:text-ivory transition-colors cursor-pointer">{messages.footer.privacyPolicy}</span>
            <span className="hover:text-ivory transition-colors cursor-pointer">{messages.footer.termsOfUse}</span>
            <span className="hover:text-ivory transition-colors cursor-pointer">{messages.footer.helpAndContact}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
