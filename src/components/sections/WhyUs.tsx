"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { faculty } from "@/content/faculty";
import { testimonials } from "@/content/results";
import { timetable } from "@/content/timetable";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { trackSpotlight } from "@/components/motion/spotlight";
import {
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

const JOURNEY = ["Grades 9–11", "O Level", "AS Level", "A2 Level"];

const doubtsQuote = testimonials.find((t) => t.name === "Mahanoor");

function Tile({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <m.article
      variants={cardRise}
      onPointerMove={trackSpotlight}
      className={`spotlight overflow-hidden rounded-[1.75rem] p-7 sm:p-8 ${className}`}
    >
      {children}
    </m.article>
  );
}

function TileTitle({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <h3
      className={`font-display text-2xl font-bold leading-tight tracking-tight ${
        onDark ? "text-white" : "text-navy"
      }`}
    >
      {children}
    </h3>
  );
}

/**
 * The poster's "Why Choose Us" pillars, rebuilt as a bento grid where
 * every claim carries its own proof: the level ladder, the real faculty
 * count, the actual batch days, a student's own words.
 */
export function WhyUs() {
  const withPhotos = faculty.filter((f) => f.photo);

  return (
    <section id="why" className="relative scroll-mt-20 bg-cream py-20 sm:py-28">
      <div aria-hidden className="bg-grid-navy absolute inset-x-0 top-0 h-[32rem]" />
      <div className="relative mx-auto max-w-site px-5">
        <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeRise}>
          <SectionHeading
            eyebrow="Why the Tribe"
            title={
              <>
                Everything a Cambridge student needs, <Accent>under one roof</Accent>
              </>
            }
            description="Quality education, better tomorrow — built on specialist teaching, honest feedback and a campus students actually look forward to."
          />
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGroup(0.08)}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {/* 1 — The whole Cambridge journey */}
          <Tile className="relative bg-navy-dark text-white [--spot:rgba(244,180,26,0.18)] sm:col-span-2 lg:col-span-4">
            <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <p className="eyebrow text-gold">Cambridge curriculum</p>
            <div className="mt-3 max-w-md">
              <TileTitle onDark>From Grade 9 fundamentals to A2 finals</TileTitle>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                One campus for the whole journey — the same specialists carry
                you through every Cambridge stage, Science and Commerce alike.
              </p>
            </div>
            <ol className="relative mt-10 grid grid-cols-4 gap-2">
              <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-white/10" />
              <m.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 origin-left bg-gradient-to-r from-gold/60 to-gold"
              />
              {JOURNEY.map((step, i) => (
                <li key={step} className="relative flex flex-col items-center text-center">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-extrabold ring-4 ring-navy-dark ${
                      i === JOURNEY.length - 1
                        ? "bg-gold text-navy-dark"
                        : "bg-navy-light text-gold"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="mt-3 whitespace-nowrap text-[0.7rem] font-semibold text-slate-200 sm:text-sm">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Tile>

          {/* 2 — Specialists */}
          <Tile className="relative bg-gold text-navy-dark [--spot:rgba(255,255,255,0.35)] lg:col-span-2">
            <p className="font-display text-7xl font-extrabold leading-none tracking-tighter">
              {faculty.length}
            </p>
            <TileTitle>subject specialists</TileTitle>
            <p className="mt-2 text-sm leading-relaxed text-navy-dark/75">
              Every subject has its own expert — no one covering gaps outside
              their field.
            </p>
            <div className="mt-6 flex -space-x-2.5">
              {withPhotos.slice(-6).map((f) => (
                <span
                  key={f.slug}
                  className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-gold"
                >
                  <Image src={f.photo!} alt="" fill sizes="40px" className="object-cover object-top" />
                </span>
              ))}
            </div>
          </Tile>

          {/* 3 — Batches */}
          <Tile className="border border-navy/[0.07] bg-white shadow-card lg:col-span-2">
            <IconBadge>
              <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" />
            </IconBadge>
            <div className="mt-5">
              <TileTitle>Mornings or weekends</TileTitle>
            </div>
            <ul className="mt-5 space-y-2.5">
              <li className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3">
                <span className="font-display text-sm font-bold text-navy">Mon – Thu</span>
                <span className="text-right text-xs text-slate-500">{timetable.morning.label} · Gr 9–11</span>
              </li>
              <li className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3">
                <span className="font-display text-sm font-bold text-navy">Sat – Sun</span>
                <span className="text-right text-xs text-slate-500">{timetable.evening.label} · O/AS/A2</span>
              </li>
            </ul>
          </Tile>

          {/* 4 — Doubts cleared (student's own words) */}
          <Tile className="relative flex flex-col border border-navy/[0.07] bg-white shadow-card lg:col-span-2">
            <span aria-hidden className="font-serif text-7xl leading-[0.6] text-gold">
              &ldquo;
            </span>
            <p className="mt-4 font-serif text-[1.6rem] italic leading-snug text-navy">
              They never let you leave with doubts.
            </p>
            {doubtsQuote && (
              <p className="mt-auto pt-6 text-sm text-slate-500">
                <span className="font-semibold text-navy">{doubtsQuote.name}</span>{" "}
                · {doubtsQuote.detail}
              </p>
            )}
          </Tile>

          {/* 5 — Friday enrichment (real trip photo) */}
          <Tile className="relative isolate flex min-h-[18rem] flex-col justify-end bg-navy text-white sm:col-span-2 lg:col-span-2">
            <Image
              src="/images/campus/enrichment-trip.jpeg"
              alt="Learning Tribe students on an enrichment trip"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="-z-10 object-cover"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-ink via-navy-ink/60 to-transparent" />
            <span className="mb-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
              Every Friday
            </span>
            <TileTitle onDark>Students Enrichment Program</TileTitle>
            <p className="mt-2 text-sm text-slate-200">
              Onsite &amp; offsite sessions on alternating Fridays, 9 AM – 12 noon.
            </p>
          </Tile>

          {/* 6 — Parents in the loop */}
          <Tile className="border border-navy/[0.07] bg-white shadow-card sm:col-span-2 lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-center">
              <div>
                <IconBadge>
                  <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12Z" strokeLinejoin="round" />
                </IconBadge>
                <div className="mt-5">
                  <TileTitle>Parents stay in the loop</TileTitle>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Our coordinator keeps families updated on WhatsApp — timings,
                  tests and progress, without the chasing.
                </p>
              </div>
              <div aria-hidden className="space-y-2 rounded-2xl bg-[#ECE5DD] p-4 text-[0.8rem] leading-snug">
                <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-slate-700 shadow-sm">
                  <p className="text-[0.7rem] font-bold text-emerald-700">TLT Coordinator</p>
                  Assalam o Alaikum! Reminder: Chemistry test this Saturday, 11:00 AM.
                </div>
                <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 text-slate-700 shadow-sm">
                  JazakAllah — she&apos;ll be there 👍
                </div>
              </div>
            </div>
          </Tile>

          {/* 7 — Holistic growth */}
          <Tile className="relative bg-navy-light text-white [--spot:rgba(244,180,26,0.2)] sm:col-span-2 lg:col-span-3">
            <div aria-hidden className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
            <p className="eyebrow text-gold">Holistic development</p>
            <div className="mt-3">
              <TileTitle onDark>Grow beyond the grade sheet</TileTitle>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
              Academic excellence and personal growth, side by side — the
              Tribe code lives in every classroom.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Ask questions", "Dream big", "Work hard", "Raise your hand", "Be kind", "Don't give up"].map(
                (word, i) => (
                  <li
                    key={word}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${
                      i % 3 === 0
                        ? "bg-gold text-navy-dark"
                        : "border border-white/20 text-white/85"
                    }`}
                  >
                    {word}
                  </li>
                ),
              )}
            </ul>
          </Tile>
        </m.div>
      </div>
    </section>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold shadow-lg shadow-navy/20">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        className="h-6 w-6"
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
}
