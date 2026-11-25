"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { toBengaliDigits } from "@/lib/format";
import { useLanguage } from "@/lib/i18n";
import { DataSaverToggle } from "@/components/site/DataSaverToggle";
import { NewsletterSubscription } from "@/components/site/NewsletterSubscription";

export function Footer() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const yearNum = new Date().getFullYear();
  const currentYear = locale === "en" ? String(yearNum) : toBengaliDigits(yearNum);

  if (
    pathname?.startsWith("/admin") ||
    (pathname?.startsWith("/portal") && pathname !== "/portal/login")
  ) {
    return null;
  }

  return (
    <footer className="bg-brand-950 text-ivory/80">
      <div className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-16 xl:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-lg">
            <AsSunnahLogo variant="light" showSubtitle={true} className="mb-4" />
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-ivory/80 font-sans">
              {t.brand.subSlogan}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-wrap gap-12 xl:gap-16 font-ui text-base xl:text-lg">
            <div>
              <span className="block font-bold text-lime-400 mb-4 text-base xl:text-lg">
                {locale === "en" ? "Main Links" : "প্রধান লিংক"}
              </span>
              <ul className="space-y-3 text-ivory/75">
                <li>
                  <Link href="/" className="hover:text-lime-300 transition-colors">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-lime-300 transition-colors">
                    {t.nav.events}
                  </Link>
                </li>
                <li>
                  <Link href="/notices" className="hover:text-lime-300 transition-colors">
                    {t.nav.notices}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-lime-300 transition-colors">
                    {t.nav.about}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="block font-bold text-lime-400 mb-4 text-base xl:text-lg">
                {locale === "en" ? "Media & Contact" : "মিডিয়া ও যোগাযোগ"}
              </span>
              <ul className="space-y-3 text-ivory/75">
                <li>
                  <Link href="/blog" className="hover:text-lime-300 transition-colors">
                    {t.nav.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-lime-300 transition-colors">
                    {t.nav.gallery}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-lime-300 transition-colors">
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="block font-bold text-lime-400 mb-4 text-base xl:text-lg">
                {locale === "en" ? "Venue & Portal" : "ভেন্যু ও অ্যাডমিন"}
              </span>
              <ul className="space-y-3 text-ivory/75">
                <li>
                  <Link href="/checkin" className="hover:text-lime-300 transition-colors">
                    {locale === "en" ? "Auditorium Check-In" : "অডিটোরিয়াম চেক-ইন"}
                  </Link>
                </li>
                <li>
                  <Link href="/admin/applications" className="hover:text-lime-300 transition-colors">
                    {locale === "en" ? "Applications Management" : "আবেদন ব্যবস্থাপনা"}
                  </Link>
                </li>
                <li>
                  <Link href="/admin/submissions" className="hover:text-lime-300 transition-colors">
                    {locale === "en" ? "Activities & Scoring" : "কার্যক্রম ও স্কোরিং"}
                  </Link>
                </li>
                <li>
                  <Link href="/portal" className="hover:text-lime-300 transition-colors">
                    {locale === "en" ? "Trainee Portal" : "প্রশিক্ষণার্থী পোর্টাল"}
                  </Link>
                </li>
                <li>
                  <Link href="/verify-certificate" className="hover:text-lime-300 transition-colors">
                    {locale === "en" ? "Verify Certificate" : "সনদ যাচাই কনসোল"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* E-Newsletter Subscription Box */}
        <div className="mt-14">
          <NewsletterSubscription />
        </div>

        <div className="mt-10">
          <DataSaverToggle />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-accent-500/30 pt-8 text-base sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ivory/70">© {currentYear} {t.brand.copyright}</p>
          <div className="flex flex-wrap gap-8 text-ivory/75 font-ui text-base">
            <Link href="/contact" className="hover:text-lime-300 transition-colors">
              {t.footer.helpAndContact}
            </Link>
            <Link href="/notices" className="hover:text-lime-300 transition-colors">
              {t.footer.termsOfUse}
            </Link>
            <Link href="/about" className="hover:text-lime-300 transition-colors">
              {t.footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
