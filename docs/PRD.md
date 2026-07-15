# The Learning Tribe — MVP Website PRD & Architecture Plan

**Version:** 1.0 · **Date:** 16 July 2026 · **Stack:** Next.js (App Router) + React + Tailwind CSS
**Author:** Product / Web Architecture
**Status:** Phase 1 — Approved scope only

---

## 1. Executive Summary

The Learning Tribe (Bahadurabad Campus, Karachi) currently generates leads exclusively through Instagram (~1,061 followers) and phone/WhatsApp inquiries. The MVP is a **single, mobile-first landing page** that converts paid/organic social traffic into qualified leads.

**The core thesis:** parents and students in this market choose a coaching centre based on *who teaches* and *what results they produce*. The site therefore front-loads faculty credibility and A* results, and removes every ounce of friction from inquiry — a 4-field lead form and a persistent WhatsApp button, both reachable within one thumb-scroll.

**Primary KPI:** lead submissions (form + WhatsApp taps).
**Secondary KPIs:** scroll depth to Faculty section, timetable toggle engagement, Core Web Vitals (LCP < 2.0s on 3G-class mobile networks).

**Success definition for Phase 1:** a parent on a mid-range Android phone over a congested mobile network can land, understand the offer, see the faculty, and submit an inquiry in under 60 seconds.

---

## 2. Competitor / Brand Insights (from Instagram assets)

> Note: all provided screenshots carry The Learning Tribe's own branding — they function as the *brand benchmark* the site must be visually consistent with, and reveal the positioning conventions of this market segment.

### 2.1 Core messaging observed
| Theme | Evidence in assets |
|---|---|
| **Authority via Cambridge affiliation** | "Cambridge Assessment International Education / Cambridge International School" badge on every timetable poster |
| **Faculty-led trust** | Recurring "Meet Our Teacher" post format: headshot + name + subject pill + levels taught |
| **Urgency & scarcity** | "Limited seats available!", "Classes start 6th July / 4th July" |
| **Aspirational taglines** | "Quality Education. Better Tomorrow.", "Empowering Minds, Building Futures!", "Learning Is Our Only Vibe" |
| **Concrete logistics** | Full timetable grids, campus address (Arab Business Center, Main Char Minar Chowrangi, Bahadurabad), two phone numbers on every post |
| **Value pillars** | "Why Choose Us": Cambridge Curriculum · Experienced & Dedicated Faculty · Holistic Student Development · Supportive Learning Environment · Academic Excellence & Personal Growth |

### 2.2 Visual branding system
- **Palette:** deep navy (≈ `#0F1E4B`) as primary, gold/amber (≈ `#F4B41A`) as accent, white/off-white surfaces. High contrast, works well for accessibility.
- **Typography:** heavy uppercase display headings (navy) with the key word highlighted in gold; script accents for emotional taglines.
- **Component language:** gold "pill" badges for subjects, rounded cards, wave-shaped navy footers, check-mark bullet lists.
- **Photography:** real classroom/группа shots and professional faculty portraits on light abstract backgrounds — no stock-photo feel.

### 2.3 Faculty & program data already available (seed content)
- **Director:** Hasan Khan.
- **Faculty posts identified:** Dr Noor Azeem (Biology/Chemistry — A Level), Sir Zaryab Hussain (Computer Science — O/AS/A2), Sir Mustafa Moten (Business/Economics — O/AS/A2), Sir Fahad Ali (Physics — O/AS/A2), Sir Waleed Fulara (Pakistan Studies), Sir Tayyab Ansari (Islamiyat).
- **Programs:** Morning Program (weekdays, Grades 9–11 Science & Commerce, Mon–Thu subject grid + Friday enrichment) and Evening Program (weekend Sat/Sun, three tracks: O-Levels / AS / A2).
- **Contact:** 0317 8915543 · 0309 8191228 · +92 329 2476497; Google Maps link exists.

### 2.4 Gaps the website must close
1. **No results/social proof asset exists yet** — Instagram shows faculty and schedules but no A* results wall or testimonials. The site introduces this as a differentiator; content must be collected from the centre.
2. **Instagram posters are static images** — the timetable is unreadable on small screens without pinch-zoom. The website's interactive, legible timetable is an immediate UX win.
3. **No single inquiry funnel** — today a parent must DM or dial. The form + WhatsApp deep link consolidates this.

---

## 3. Functional Requirements — The Core Funnel

Page order is the funnel order: **Hero → Trust (Faculty) → Logistics (Timetable) → Proof (Results) → Capture (Form)**, with WhatsApp escape-hatch persistent throughout.

### FR-1 · Hero Section
- **Goal:** communicate offer + trigger CTA within the first viewport (mobile: 375×~700px).
- H1 pattern: outcome-led, e.g. *"Cambridge O & A Level Coaching That Delivers A*s"* — sub-line carries brand tagline and campus locality ("Bahadurabad, Karachi").
- Cambridge affiliation badge displayed near H1 (authority anchor, mirrors Instagram).
- **Primary CTA:** `Book a Free Trial Class` → smooth-scrolls to Lead Capture Form (no page navigation, no modal).
- **Secondary CTA:** `Chat on WhatsApp` (outline style, opens wa.me deep link).
- Session urgency strip: "New session started July 2026 — Limited seats" (content-managed string).
- Background: optimized real classroom photo (from assets) with navy overlay; must not delay LCP — H1 is the LCP element, image served as `next/image` with `priority` + AVIF/WebP.

### FR-2 · Faculty Directory (core trust builder)
- **Goal:** replicate the proven "Meet Our Teacher" Instagram format as a scannable grid.
- Card contents: headshot (1:1, lazy-loaded), name with honorific, gold subject pill(s), levels taught (`O Level`, `AS`, `A2` chips), one-line credential (e.g. "MBBS — 8+ yrs teaching A Level Biology").
- Layout: horizontal snap-scroll carousel on mobile (thumb-friendly), 3-column grid ≥768px.
- Data-driven from a typed content file (see §4.4) — adding a teacher is a data edit, not a code change.
- Optional per-card "Book a trial with [Name]" link that pre-fills the form's subject selection (nice-to-have, ship if trivial).

### FR-3 · Timetable Module
- **Goal:** make schedules legible on a phone — the single biggest upgrade over Instagram posters.
- **Toggle control:** segmented control `Morning Batch | Evening Batch` (default: Morning). Animated slide indicator; instant client-side swap, zero network.
- **Morning view:** weekday grid (Mon–Thu rows × time slots), Grades 9–11 Science & Commerce; Friday enrichment note row.
- **Evening view:** weekend (Sat/Sun) with three track columns — O-Levels / AS / A2 — rendered as stacked cards on mobile, columns on desktop.
- Tables collapse to per-day accordion cards under 640px — **no horizontal page scroll ever**; if a grid must stay tabular it scrolls inside its own container.
- Schedule data lives in one typed file; batch start dates ("Classes start 6th July") are content strings.
- CTA beneath timetable: "Can't find your slot? Ask us on WhatsApp."

### FR-4 · Social Proof — Results & Testimonials
- **Results wall:** grid of stat tiles (e.g. "12 A*s — CAIE 2025", "95% A*–B"), each tile optionally naming student + subject. Data-driven; renders gracefully with as few as 3 tiles while content is collected.
- **Testimonials:** 3–5 short quotes (≤160 chars) with student name, grade achieved, and level. Mobile: swipeable snap carousel; desktop: 3-up grid.
- No video in Phase 1 (performance budget); schema allows a `videoUrl` field for Phase 2.

### FR-5 · Lead Capture Form
- **Fields (exactly 4 — no email, no message box):**
  1. `Name` — text, required.
  2. `WhatsApp Number` — tel input, `inputmode="tel"`, validated for Pakistani mobile format (`03XXXXXXXXX` / `+923XXXXXXXXX`), required.
  3. `Grade / Level` — dropdown: Grade 9, Grade 10, Grade 11, O Level, AS Level, A2 Level. Required.
  4. `Subjects` — checkbox chip group (Maths, Physics, Chemistry, Biology, Computer Science, Business, Economics, Accounts, English, Urdu, Islamiyat, Pakistan Studies). Min 1.
- **Submission flow:** client validation (zod) → POST to internal Route Handler `/api/lead` → server forwards to configured webhook (Google Apps Script → Google Sheet, and/or email via Resend) → success state swaps form for confirmation card: "Thanks [Name]! We'll WhatsApp you within a few hours." + direct WhatsApp button as fallback.
- **Resilience:** webhook URL and secrets live server-side in env vars (never exposed to client). On webhook failure, return success:false and show a WhatsApp fallback CTA — a lead is never dead-ended.
- Anti-spam: honeypot field + minimal time-to-submit check. No CAPTCHA (friction).

### FR-6 · Floating WhatsApp Button
- Fixed bottom-right FAB, official WhatsApp green, 56×56px min touch target, `aria-label="Chat on WhatsApp"`.
- Deep link `https://wa.me/92XXXXXXXXXX?text=<url-encoded prefill>` with prefill: *"Hi! I'd like to book a free trial class at The Learning Tribe."*
- Visible on all viewports at all scroll positions; must not overlap the form's submit button (form section adds bottom padding).
- Plain anchor tag — zero JS cost.

### FR-7 · Footer (supporting, not a funnel stage)
- Campus address + embedded static map image linking to the existing Google Maps URL (no iframe — performance).
- Phone numbers as `tel:` links, Instagram link, brand tagline.

### Non-functional requirements
| Category | Requirement |
|---|---|
| Performance | LCP < 2.0s / TTI < 3.5s on simulated Slow 4G; total JS < 100KB gzipped; Lighthouse mobile ≥ 90 across the board |
| SEO | SSG output, semantic HTML, `metadata` API with local keywords ("O Level coaching Bahadurabad Karachi"), OpenGraph image, `LocalBusiness` JSON-LD |
| Accessibility | WCAG 2.1 AA: contrast (navy/gold verified), keyboard-operable toggle & form, visible focus states |
| Analytics | Lightweight event tracking (Vercel Analytics or Plausible): CTA clicks, toggle usage, form submit, WhatsApp taps |
| Languages | English only in Phase 1; copy kept in content files so Urdu can be added later |

---

## 4. Technical Architecture

### 4.1 Stack decisions
| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSG for the landing page; Route Handlers give a free, serverless lead endpoint |
| Rendering | **Static (SSG)** — whole page is Server Components except 3 client islands | Fastest possible mobile delivery; content changes are code deploys, acceptable for Phase 1 |
| Styling | **Tailwind CSS** + CSS variables for brand tokens (`--navy`, `--gold`) | Matches poster design system; zero runtime CSS cost |
| Forms | **react-hook-form + zod** (shared schema client & server) | Tiny, uncontrolled inputs = fewer re-renders on low-end devices |
| Images | `next/image` (AVIF/WebP, responsive sizes) | Faculty headshots & hero are the heaviest assets |
| Hosting | Vercel (or equivalent edge host) | CDN edge delivery to PK networks, zero-ops |
| Lead routing | Route Handler → **Google Apps Script webhook → Google Sheet**, optional Resend email | Free, owner-editable, no database in Phase 1 |

### 4.2 Folder structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, JSON-LD, analytics
│   ├── page.tsx                # THE landing page (server component, composes sections)
│   ├── globals.css             # Tailwind + brand token CSS variables
│   └── api/
│       └── lead/
│           └── route.ts        # POST: validate (zod) → forward to webhook → respond
│
├── components/
│   ├── sections/               # One per funnel stage — server components
│   │   ├── Hero.tsx
│   │   ├── FacultyDirectory.tsx
│   │   ├── TimetableSection.tsx
│   │   ├── SocialProof.tsx
│   │   ├── LeadCapture.tsx
│   │   └── Footer.tsx
│   ├── ui/                     # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Badge.tsx           # gold subject pill
│   │   ├── StatTile.tsx
│   │   └── TestimonialCard.tsx
│   ├── faculty/
│   │   └── FacultyCard.tsx
│   ├── timetable/
│   │   ├── BatchToggle.tsx     # "use client" — segmented control
│   │   ├── TimetableGrid.tsx   # renders whichever batch is active
│   │   └── ScheduleRow.tsx
│   ├── forms/
│   │   └── LeadForm.tsx        # "use client" — RHF + zod
│   └── WhatsAppFab.tsx         # plain <a>, server component
│
├── content/                    # ALL editable content — no CMS in Phase 1
│   ├── site.ts                 # brand copy, phones, address, wa.me number, session dates
│   ├── faculty.ts              # Faculty[] (name, photo, subjects, levels, credential)
│   ├── timetable.ts            # { morning: Schedule, evening: Schedule }
│   ├── results.ts              # stat tiles + testimonials
│   └── types.ts                # shared content types
│
├── lib/
│   ├── leadSchema.ts           # zod schema — imported by LeadForm AND api/lead
│   ├── webhook.ts              # server-only: POST payload to WEBHOOK_URL
│   └── analytics.ts            # typed track() wrapper
│
public/
└── images/
    ├── faculty/                # optimized headshots
    ├── hero/                   # classroom photo
    └── brand/                  # logo, Cambridge badge
```

### 4.3 Core component inventory (Phase 1 build list)
| Component | Type | Notes |
|---|---|---|
| `Hero` | Server | LCP-critical; H1 + dual CTA + badge |
| `FacultyCard` / `FacultyDirectory` | Server | Pure render from `content/faculty.ts` |
| `BatchToggle` | **Client** | Only stateful UI besides the form |
| `TimetableGrid` | Server-rendered markup, toggled client-side | Both batches rendered, CSS/state controls visibility → no fetch on toggle |
| `StatTile`, `TestimonialCard`, `SocialProof` | Server | Data-driven |
| `LeadForm` | **Client** | RHF + zod, POST `/api/lead` |
| `WhatsAppFab` | Server | Pure anchor |
| `Button`, `Badge`, `SectionHeading` | Server | Brand primitives |

**Client JS is limited to exactly two islands** (`BatchToggle`+visibility state, `LeadForm`). Everything else ships zero JS.

### 4.4 State management strategy
- **No global state library.** Nothing in this funnel is shared across distant components.
- **Timetable toggle:** single `useState<'morning' | 'evening'>` inside `TimetableSection`'s client wrapper. Both schedules are in the static HTML; toggle flips visibility — instant, works offline after first paint. State optionally mirrored to `?batch=` via `history.replaceState` so a shared link opens the right batch (progressive enhancement, not required).
- **Form:** `react-hook-form` local state + zod resolver. Submission status (`idle | submitting | success | error`) is a local `useState`. The same zod schema validates again inside `api/lead/route.ts` — never trust the client.
- **Server boundary:** webhook URL, email API key in `.env` (`WEBHOOK_URL`, `RESEND_API_KEY`); the Route Handler is the only code that touches them.

### 4.5 Lead data flow
```
LeadForm (client, zod-validated)
   → POST /api/lead (Route Handler: re-validate, honeypot check)
      → Google Apps Script webhook  → appends row to Google Sheet
      → (optional) Resend email     → notification to centre inbox
   ← { ok: true } → success card + WhatsApp fallback CTA
```

---

## 5. Phase 2 Roadmap (architecture headroom, zero Phase 1 bloat)

The Phase 1 decisions are deliberately Phase-2-compatible without adding any of it now:

| Phase 2 capability | How Phase 1 architecture supports it |
|---|---|
| **Student portal (auth)** | App Router route groups: add `(portal)/portal/...` alongside the existing `(marketing)` page. Auth (NextAuth/Clerk) mounts as new routes + middleware — landing page bundle is untouched and stays static. |
| **Database** | `content/*.ts` types (Faculty, Schedule, Lead) become the Prisma/Drizzle schema seed. Leads webhook is swapped for a DB insert inside the same `/api/lead` handler — the form never changes. |
| **Fee collection** | Payment routes live under the authenticated portal group; local gateways (e.g. PayFast/Safepay) integrate server-side via Route Handlers, same pattern as `/api/lead`. |
| **CMS for faculty/timetable** | Because every section already renders from typed content modules, swapping the import source to a headless CMS (or DB) is a data-layer change only — components untouched. |
| **Attendance / announcements / results upload** | New portal routes; the marketing funnel remains an independent, always-fast static shell. |

**Guardrail:** Phase 1 ships no auth library, no database client, no payment SDK — the roadmap above requires only additive changes.

---

## 6. Open items (content, not code)
1. Collect **results data** (A* counts, named results with consent) and 3–5 testimonials — currently absent from all brand assets.
2. Confirm the **canonical WhatsApp number** for the FAB/prefill (assets show 0317 8915543, 0309 8191228, +92 329 2476497).
3. One-line **credentials for each teacher** (qualification + years) to strengthen faculty cards beyond name + subject.
4. Confirm current **session start dates** for the urgency strip (posters show July 2026 intake).
