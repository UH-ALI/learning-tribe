"use client";

import { m } from "framer-motion";
import { crashCourse } from "@/content/crashCourse";
import { whatsappCrashLink } from "@/content/site";
import { CRASH_LEVELS, EXAM_SESSIONS } from "@/lib/crashCourseSchema";
import { openEnrol } from "@/lib/prefill";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import {
  SPRING_TAP,
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

const HIGHLIGHT_ICONS = [
  // Recap — stacked layers
  <path key="a" d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" strokeLinejoin="round" />,
  // Past papers — document
  <path key="b" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h4" strokeLinejoin="round" strokeLinecap="round" />,
  // Doubts — speech bubble with question
  <path key="c" d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12ZM10 9.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2M12 15.5h.01" strokeLinejoin="round" strokeLinecap="round" />,
];

/** Banknote-style security lines for the ticket face (deterministic, so SSR matches). */
const GUILLOCHE = Array.from({ length: 16 }, (_, i) => {
  let d = "";
  for (let x = 0; x <= 1200; x += 24) {
    const y = 20 + i * 26 + Math.sin(x / 80 + i * 0.55) * 18 + Math.sin(x / 27 + i) * 4;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d;
});

/** Decorative barcode — widths derived from a fixed string. */
const BARS = Array.from("TLT-CRASH-COURSE-2026-27").map((ch, i) => ({
  w: (ch.charCodeAt(0) % 3) + 1,
  gap: ((ch.charCodeAt(0) + i) % 2) + 1,
}));

function Barcode() {
  let x = 0;
  const rects = BARS.flatMap(({ w, gap }, i) => {
    const out = [<rect key={i} x={x} y="0" width={w} height="40" />];
    x += w + gap;
    return out;
  });
  return (
    <svg viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" className="h-10 w-full text-navy" fill="currentColor" aria-hidden>
      {rects}
    </svg>
  );
}

/** Circular "exam ready" stamp; only the lettering ring rotates. */
function Stamp() {
  return (
    <div aria-hidden className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow text-gold">
        <defs>
          <path id="tlt-stamp-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        {/* textLength = ring circumference (2π·44), so the lettering closes exactly */}
        <text className="fill-current font-display text-[10px] font-bold uppercase">
          <textPath href="#tlt-stamp-ring" textLength="276" lengthAdjust="spacing">
            Exam ready ✦ O Level ✦ AS ✦ A2 ✦
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-gold">
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="2 3" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl italic text-gold">
        A*
      </span>
    </div>
  );
}

/**
 * Exam-season crash courses, presented as an exam pass rather than yet
 * another "copy + form" block: the ticket sells the offer, and its stub's
 * "Register now" switches the sign-up area below into crash-course mode.
 * Registrations still land in their own sheet tab.
 */
export function CrashCourses() {
  return (
    <section
      id="crash-courses"
      className="relative isolate scroll-mt-20 overflow-hidden bg-gold px-3 py-20 sm:px-5 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(10,20,53,0.05)_0_2px,transparent_2px_22px)]" />
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),transparent)]" />
        <div className="absolute -bottom-48 -right-32 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(217,154,6,0.65),transparent)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.08] mix-blend-overlay" />
      </div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={cardRise}
        className="mx-auto grid max-w-site [filter:drop-shadow(0_40px_45px_rgba(10,20,53,0.35))] lg:grid-cols-[minmax(0,1fr)_23rem]"
      >
        {/* ── Ticket face ─────────────────────────────────────────── */}
        <m.div
          variants={staggerGroup(0.08, 0.15)}
          className="ticket-main relative isolate overflow-hidden rounded-t-[2rem] bg-navy-ink px-6 pb-12 pt-10 text-white sm:px-12 sm:pt-14 lg:rounded-l-[2.25rem] lg:rounded-tr-none lg:pb-14"
        >
          <svg
            aria-hidden
            viewBox="0 0 1200 420"
            preserveAspectRatio="none"
            className="absolute inset-0 -z-10 h-full w-full text-gold opacity-[0.09]"
          >
            {GUILLOCHE.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" />
            ))}
          </svg>
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

          <div className="absolute right-8 top-8 hidden sm:block xl:right-12 xl:top-12">
            <Stamp />
          </div>

          <m.p
            variants={fadeRise}
            className="inline-flex items-center gap-2.5 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/15 backdrop-blur"
          >
            <span className="rounded-full bg-gold px-2.5 py-1 font-display text-[0.7rem] tracking-wider text-navy-dark">
              New
            </span>
            Exam-season crash courses
          </m.p>

          <m.h2
            variants={fadeRise}
            className="mt-6 max-w-2xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:pr-36 sm:text-6xl"
          >
            {crashCourse.title}{" "}
            <span className="block font-serif font-normal italic tracking-normal text-gold">
              {crashCourse.accent}
            </span>
          </m.h2>

          <m.p variants={fadeRise} className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {crashCourse.blurb}
          </m.p>

          <m.ul
            variants={fadeRise}
            className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-8"
          >
            {crashCourse.highlights.map((item, i) => (
              <li key={item.title} className="flex gap-4 sm:block">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5" aria-hidden>
                    {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                  </svg>
                </span>
                <div>
                  <p className="font-display text-base font-bold sm:mt-4">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              </li>
            ))}
          </m.ul>
        </m.div>

        {/* ── Stub ────────────────────────────────────────────────── */}
        <div className="ticket-stub relative flex flex-col rounded-b-[2rem] border-t-2 border-dashed border-navy/20 bg-cream px-6 pb-8 pt-9 text-navy sm:px-8 lg:rounded-r-[2.25rem] lg:rounded-bl-none lg:border-l-2 lg:border-t-0 lg:pt-12">
          <div className="flex items-baseline justify-between gap-3">
            <p className="eyebrow text-gold-deep">Crash course pass</p>
            <p className="font-serif text-lg italic text-navy/60">Admit one</p>
          </div>

          <dl className="mt-6 divide-y divide-navy/10 border-y border-navy/10 text-sm">
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-navy/55">Levels</dt>
              <dd className="text-right font-display font-bold">
                {CRASH_LEVELS.map((l) => l.replace(" Level", "")).join(" · ")}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-navy/55">Exam series</dt>
              <dd className="text-right font-display font-bold">
                {EXAM_SESSIONS.map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-navy/55">Taught by</dt>
              <dd className="text-right font-display font-bold">Our specialists</dd>
            </div>
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-navy/55">Seats</dt>
              <dd className="inline-flex items-center gap-1.5 font-display font-bold text-gold-deep">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-dark" />
                </span>
                Limited
              </dd>
            </div>
          </dl>

          <m.button
            type="button"
            onClick={() => openEnrol("crash")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_TAP}
            className="btn-navy mt-7 min-h-14 w-full text-base"
          >
            Register now
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gold" aria-hidden>
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </m.button>
          <p className="mt-3 text-center text-xs text-navy/55">{crashCourse.note}</p>
          <a
            href={whatsappCrashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-navy/25 decoration-2 underline-offset-4 hover:decoration-navy"
          >
            <WhatsAppGlyph className="h-4 w-4 text-[#1faa53]" />
            Questions? Ask on WhatsApp
          </a>

          {/* Barcode anchors the bottom of the stub, as on a real pass */}
          <div className="mt-auto pt-8 opacity-80">
            <Barcode />
          </div>
        </div>
      </m.div>
    </section>
  );
}
