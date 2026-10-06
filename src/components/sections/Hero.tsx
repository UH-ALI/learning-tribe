"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { site, whatsappLink } from "@/content/site";
import { faculty } from "@/content/faculty";
import { ARROW_LEFT_PATH, ARROW_RIGHT_PATH } from "@/components/brand/Logo";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import {
  SPRING_TAP,
  drawStroke,
  fadeRise,
  lineReveal,
  popIn,
  staggerGroup,
} from "@/components/motion/vocabulary";

/** Teachers who rotate through the hero card, story-style. */
const FEATURED = [
  "zaryab-hussain",
  "noor-azeem",
  "fahad-ali",
  "mustafa-moten",
  "ibrahim-ali",
  "ali-moten",
]
  .map((slug) => faculty.find((f) => f.slug === slug))
  .filter((f): f is (typeof faculty)[number] & { photo: string } => !!f?.photo);

const withPhotos = faculty.filter((f) => f.photo);
const STORY_MS = 3800;

/** Deterministic positions so server and client render the same particles. */
const PARTICLES = [
  { left: "6%", size: 14, duration: 16, delay: 0 },
  { left: "18%", size: 10, duration: 22, delay: 6 },
  { left: "31%", size: 18, duration: 19, delay: 11 },
  { left: "44%", size: 9, duration: 24, delay: 3 },
  { left: "57%", size: 12, duration: 18, delay: 14 },
  { left: "69%", size: 16, duration: 21, delay: 8 },
  { left: "82%", size: 10, duration: 17, delay: 1 },
  { left: "93%", size: 14, duration: 23, delay: 12 },
];

function RisingArrow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20V5M5 11l7-7 7 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Above-the-fold conversion block. One orchestrated entrance — badge,
 * masked headline lines, copy, CTAs, proof — while the right-hand card
 * cycles through real faculty like an Instagram story, mirroring the
 * centre's "Meet Our Teacher" posts.
 */
export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % FEATURED.length),
      STORY_MS,
    );
    return () => window.clearTimeout(id);
  }, [index]);

  const current = FEATURED[index];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy-ink text-white"
    >
      {/* ── Atmosphere ───────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[20%] -top-[30%] h-[70rem] w-[70rem] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(244,180,26,0.22),transparent)]" />
        <div className="absolute -left-[25%] top-[10%] h-[60rem] w-[60rem] animate-drift-slow rounded-full bg-[radial-gradient(closest-side,rgba(42,66,144,0.75),transparent)]" />
        <div className="absolute bottom-[-30%] left-[30%] h-[50rem] w-[50rem] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(27,47,110,0.8),transparent)] [animation-delay:-9s]" />
        <div className="bg-grid absolute inset-0" />
        <div className="bg-noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        {PARTICLES.map((p) => (
          <span
            key={p.left}
            className="absolute -bottom-10 text-gold/40"
            style={{
              left: p.left,
              animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            <RisingArrow size={p.size} />
          </span>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-ink" />
      </div>

      <div className="mx-auto grid max-w-site items-center gap-14 px-5 pb-20 pt-32 sm:pt-36 lg:min-h-[100svh] lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:pb-24">
        {/* ── Copy column ─────────────────────────────────────────── */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerGroup(0.1, 0.15)}
          className="flex flex-col items-start"
        >
          <m.p
            variants={fadeRise}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-2 pr-4 text-xs font-semibold text-slate-200 backdrop-blur"
          >
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-2.5 py-1 font-display text-[0.7rem] font-bold uppercase tracking-wider text-navy-dark">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-dark/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-navy-dark" />
              </span>
              Admissions open
            </span>
            <span className="whitespace-nowrap">
              Session 2026–27<span className="hidden sm:inline"> · Bahadurabad</span>
            </span>
          </m.p>

          <h1 className="mt-7 font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[3.7rem] xl:text-[4.1rem]">
            <span className="block overflow-hidden pb-1">
              <m.span variants={lineReveal} className="block">
                Cambridge O &amp; A Level
              </m.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <m.span variants={lineReveal} className="block text-white/75">
                coaching that turns
              </m.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <m.span variants={lineReveal} className="block">
                effort into{" "}
                <span className="relative inline-block">
                  <span className="text-gold-gradient">A*s</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-4 w-full text-gold"
                  >
                    <m.path
                      variants={drawStroke}
                      d="M3 17 C 50 6, 120 4, 197 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </m.span>
            </span>
          </h1>

          <m.p
            variants={fadeRise}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Specialist teachers for every subject, focused batches, and morning
            or weekend schedules at {site.city}.{" "}
            <span className="font-serif text-xl italic text-gold-light">
              {site.tagline}.
            </span>
          </m.p>

          <m.div
            variants={fadeRise}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <m.a
              href="#enroll"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_TAP}
              className="btn-gold min-h-14 px-8 text-base"
            >
              Book a free trial class
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </m.a>
            <m.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_TAP}
              className="btn-glass min-h-14 px-8 text-base"
            >
              <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
              Chat on WhatsApp
            </m.a>
          </m.div>

          {/* Faculty proof — real faces beat any claim */}
          <m.div variants={fadeRise} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {withPhotos.slice(0, 5).map((f) => (
                <span
                  key={f.slug}
                  className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-navy-ink"
                >
                  <Image
                    src={f.photo!}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </span>
              ))}
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gold font-display text-xs font-extrabold text-navy-dark ring-2 ring-navy-ink">
                +{faculty.length - 5}
              </span>
            </div>
            <p className="text-sm leading-snug text-slate-300">
              <span className="block font-display text-base font-bold text-white">
                {faculty.length} subject specialists
              </span>
              O Level · AS Level · A2 Level
            </p>
          </m.div>
        </m.div>

        {/* ── Story card column ──────────────────────────────────── */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerGroup(0.12, 0.5)}
          className="relative mx-auto w-full max-w-[25rem] lg:max-w-[27rem]"
        >
          {/* Brand arrows + orbit rings behind the card */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <svg
              viewBox="-10 -10 630 506"
              className="absolute left-1/2 top-1/2 w-[155%] -translate-x-1/2 -translate-y-1/2 text-gold opacity-40"
            >
              <path d={ARROW_LEFT_PATH} fill="url(#hero-arrow-fade)" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d={ARROW_RIGHT_PATH} fill="url(#hero-arrow-fade)" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <defs>
                <linearGradient id="hero-arrow-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F4B41A" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#F4B41A" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full border border-white/[0.05]" />
          </div>

          <m.div
            variants={popIn}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-navy-light shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
          >
            {FEATURED.map((f, i) => (
              <Image
                key={f.slug}
                src={f.photo}
                alt={i === index ? `${f.name}, ${f.subjects.join(" & ")} teacher` : ""}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 27rem, 85vw"
                className={`object-cover transition-[opacity,transform] duration-1000 ease-out ${
                  i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-ink via-navy-ink/10 to-navy-ink/40" />

            {/* Story progress */}
            <div className="absolute inset-x-4 top-4 flex gap-1.5">
              {FEATURED.map((f, i) => (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${f.name}`}
                  className="group relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                    <span
                      key={i === index ? `active-${index}` : f.slug}
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      style={
                        i === index
                          ? { animation: `story-fill ${STORY_MS}ms linear forwards` }
                          : { width: i < index ? "100%" : "0%" }
                      }
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="absolute left-4 top-12 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              Meet our teacher
            </div>

            {/* Name plate */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div key={current.slug} className="animate-[plate-in_0.6s_ease-out]">
                <div className="flex flex-wrap gap-1.5">
                  {current.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-gold px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-wide text-navy-dark"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-3 font-display text-3xl font-extrabold tracking-tight">
                  {current.name}
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {current.levels.join(" · ")}
                </p>
              </div>
            </div>
          </m.div>

          {/* Floating proof chips */}
          <m.div
            variants={popIn}
            className="absolute -left-4 top-[18%] sm:-left-12"
          >
            <div className="animate-float rounded-2xl border border-white/15 bg-navy-deeper/70 p-3 pr-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path d="M22 10 12 5 2 10l10 5 10-5Z" strokeLinejoin="round" />
                    <path d="M6 12v5c3 2 9 2 12 0v-5" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-bold">Cambridge</p>
                  <p className="text-xs text-white/60">O · AS · A2</p>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            variants={popIn}
            className="absolute -right-3 top-[46%] sm:-right-10"
          >
            <div className="animate-float rounded-2xl border border-white/15 bg-white/95 p-3 pr-4 text-navy shadow-2xl [animation-delay:-2s]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <rect x="3" y="4.5" width="18" height="16" rx="3" />
                    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-bold">2 batches</p>
                  <p className="text-xs text-navy/60">Weekday AM · Weekend</p>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            variants={popIn}
            className="absolute -bottom-5 left-6 sm:-left-6"
          >
            <div className="animate-float rounded-full bg-gold px-5 py-2.5 font-display text-sm font-bold text-navy-dark shadow-glow [animation-delay:-4s]">
              ✦ First class is on us
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
