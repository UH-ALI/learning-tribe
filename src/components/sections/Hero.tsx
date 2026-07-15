"use client";

import { m } from "framer-motion";
import { site, whatsappLink } from "@/content/site";
import {
  SPRING_TAP,
  fadeRise,
  lineReveal,
  staggerGroup,
} from "@/components/motion/vocabulary";

const STATS = [
  ["11", "Specialist teachers"],
  ["2", "Batches: AM & PM"],
  ["12+", "Cambridge subjects"],
] as const;

/**
 * Above-the-fold conversion block. The entrance is a single orchestrated
 * sequence — badge, headline lines (masked reveals), copy, CTAs, stats —
 * so the page reads top-to-bottom like a narrative rather than popping
 * in at once. Transform/opacity only; nothing here causes reflow.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark text-white">
      {/* Brand glow accents — pure CSS, no image request */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgba(244,180,26,0.18),transparent),radial-gradient(40rem_24rem_at_-10%_110%,rgba(27,47,110,0.9),transparent)]"
      />

      <m.div
        initial="hidden"
        animate="visible"
        variants={staggerGroup(0.11, 0.15)}
        className="mx-auto flex max-w-site flex-col items-center px-5 pb-16 pt-28 text-center sm:pb-24 sm:pt-36"
      >
        {/* Authority anchor */}
        <m.p
          variants={fadeRise}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200"
        >
          <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
          Cambridge Curriculum · O Level · AS · A2
        </m.p>

        {/* Headline — each line rises out of its own mask, in sequence */}
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
          <span className="block overflow-hidden pb-1">
            <m.span variants={lineReveal} className="block">
              Cambridge O &amp; A Level coaching
            </m.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <m.span variants={lineReveal} className="block">
              that turns effort into <span className="text-gold">A*s</span>
            </m.span>
          </span>
        </h1>

        <m.p
          variants={fadeRise}
          className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg"
        >
          Specialist teachers for every subject, small batches, and morning or
          evening schedules — at {site.city}. {site.tagline}.
        </m.p>

        {/* Primary + secondary CTA — tactile spring feedback */}
        <m.div
          variants={fadeRise}
          className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <m.a
            href="#enroll"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING_TAP}
            className="btn-gold"
          >
            Book a Free Trial Class
          </m.a>
          <m.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING_TAP}
            className="btn-outline-light"
          >
            Chat on WhatsApp
          </m.a>
        </m.div>

        {/* Urgency strip */}
        <m.p
          variants={fadeRise}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-light"
        >
          <span aria-hidden>⚡</span>
          {site.sessionNote}
        </m.p>

        {/* Trust stats — the last beat of the sequence */}
        <m.dl
          variants={staggerGroup(0.09)}
          className="mt-12 grid w-full max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5"
        >
          {STATS.map(([stat, label]) => (
            <m.div variants={fadeRise} key={label} className="px-2 py-5 sm:px-6">
              <dt className="order-last mt-1 block text-[11px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                {label}
              </dt>
              <dd className="font-display text-2xl font-extrabold text-gold sm:text-3xl">
                {stat}
              </dd>
            </m.div>
          ))}
        </m.dl>
      </m.div>
    </section>
  );
}
