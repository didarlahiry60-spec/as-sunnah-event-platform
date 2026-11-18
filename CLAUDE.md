# As-Sunnah Foundation Platform: Project Brief for Claude Code

## What we are building
An event management + post-training follow-up platform for As-Sunnah Foundation (Bangladesh). Three layers in one app:
1. **Public site**: events, calendar, no-login application, notices, blog, gallery.
2. **Trainee portal**: passwordless (SMS Magic Link + mobile OTP), resources, certificates, class attendance, activity photo/report upload.
3. **Admin + automation**: event/form builder, applicant screening, bulk SMS/email, scoring, internal 1-5 star rating, Red Flag, live photo wall, PDF reports. Scheduled jobs run in a BullMQ worker.

Users are imams, madrasa teachers and volunteers, mostly on mid-range Android phones and slow mobile data. **Bangla first, mobile first, one-thumb simple.** Core tasks take 3 taps or fewer.

## Stack (do not swap without asking)
TypeScript, Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, PostgreSQL 16 + **Prisma 6** (pin `prisma@6`), Redis + BullMQ, Zod, React Hook Form, `jose` for sessions, Cloudflare R2 (S3 API) for media, SSL Wireless for SMS, Resend/SMTP for email, Recharts, Leaflet, Puppeteer for PDFs, Sentry. Package manager: pnpm.

## Design system (source of truth: `src/styles/tokens.css`)
- Concept: "Nur and Geometry". Light through a lattice. Deep forest green, pearl white, lime and orange accents from the logo.
- Colors (taken from the As-Sunnah logo, deepened for luxury): brand-950 #04180F, brand-900 #07261A, brand-800 #0D3B28, brand-600 #1F7A45, brand-500 #2F9E5B (logo leaf green), lime-500 #8DC63F (logo lime), lime-300 #B7DE7A, lime-100 #EAF5D6, accent-500 #F0922B (logo orange), accent-700 #C9700F, accent-300 #F7B866, accent-100 #FDE8CB, pearl/ivory #F8FAF3, sand #EDF1E3, ink #0E1A13, muted #5B6A60. States: info #1F4E79, success #2E8B57, warning #D98E04, danger #B3261E.
- Usage: deep forest green dominates (hero, footer, stats). Lime = fresh highlights and big numerals on dark. Orange = primary CTA buttons only (dark text on orange, never white). Never orange or lime text for body copy on light backgrounds. `--accent-foil` gradient for the main CTA.
- Luxury feel: dark-led sections, generous whitespace, thin accent hairlines, one soft lime glow in the hero, restraint everywhere else.
- Logo: needs a vector (SVG) with a WHITE-text version for dark backgrounds. Do not place the black-text logo directly on dark green.
- Fonts: Noto Serif Bengali (display), Anek Bangla (UI titles), Hind Siliguri (body), Inter (Latin/numerals), Amiri (Arabic).
- Bangla body min 17px, line-height 1.7, headings 1.3, max line ~65ch.
- Radius 16px, soft emerald-tinted shadows. Signature detail: pointed-arch (mihrab) image masks. One geometric 8-fold SVG pattern at 4-8% opacity, never behind paragraphs.
- Motion: calm. Animate only transform/opacity. Respect `prefers-reduced-motion`. No scatter of hover effects.

## Rules
- All UI strings in Bangla via a central `messages` object (English toggle later). Bengali numerals and Hijri dates where relevant.
- WCAG 2.2 AA: 48px touch targets, visible gold focus ring, semantic HTML, labels on every input.
- Performance budget: LCP < 2s on 4G mid-range phone, < 150 KB JS per portal route. Use next/image, subset fonts, lazy-load below the fold.
- Security: magic-link tokens stored hashed, expiring, purpose-scoped. OTP rate-limited. HttpOnly Secure cookies. `Person.internalStars`, call logs and Red Flag are admin-only and must NEVER appear in trainee-facing API responses.
- Validate every input with Zod on the server. Audit-log sensitive admin actions.
- Timezone `Asia/Dhaka` for all schedules. Hijri date uses Intl `islamic-umalqura` + admin offset (`Setting.hijriOffset`, -1/0/+1).
- Never commit `.env`. Write small commits. Add tests for auth, scoring and screening.

## Folder structure
```
src/app/(public)/  events/[slug]/ events/[slug]/apply/ ...
src/app/(portal)/portal/...      src/app/(admin)/admin/...
src/app/m/[code]/route.ts        # magic link handler
src/components/ui/  site/        src/lib/  db sms auth storage scoring hijri qr
src/jobs/ worker.ts khutbah.ts reminders.ts monthly.ts redflag.ts
prisma/schema.prisma seed.ts
```

## Scoring defaults (editable in admin via ActivityType)
Khutbah 5, Cleanup 20, Tree planting 20, Online class 20, Halaqa 15.

## Schedules (BullMQ repeatable, tz Asia/Dhaka)
Tue 08:00 khutbah PDF | Sun & Wed 16:30 amal reminder | Hijri day 12 after Maghrib | day 25 monthly report reminder | nightly 02:00 inactivity Red Flag (60 days).

## Sprint plan
1 Design + foundation (current) | 2 Public site | 3 Apply + admin basics | 4 Magic link + portal | 5 Submissions + scoring + attendance | 6 Automation | 7 Live wall + reports | 8 Hardening + launch.
Work ONE sprint at a time, ask before starting the next, and finish each with its "Done when" check.

## Sprint 1 "Done when"
Localhost shows a polished Bangla home page with correct colors/fonts, header/footer work on mobile, DB connects, `pnpm db:seed` loads demo data, Lighthouse mobile >= 90.
