"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/content/site";
import {
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

const STEPS = [
  {
    title: "Tell us about the student",
    body: "Name, WhatsApp number, grade and subjects — that's all we need.",
  },
  {
    title: "We WhatsApp you",
    body: "Our coordinator confirms a trial slot that fits your timetable.",
  },
  {
    title: "Sit in a real class",
    body: "Meet the teacher, feel the vibe — then decide. No pressure.",
  },
];

/**
 * The conversion endpoint of the funnel. Keeps id="enroll" — every CTA
 * on the page anchors here. A floating navy stage holds the "how it
 * works" story on the left and the form on the right. The FAQ below
 * gives scroll room, so the floating WhatsApp button never has to sit
 * on top of the submit button.
 */
export function LeadCapture() {
  return (
    <section id="enroll" className="scroll-mt-16 bg-white px-3 pb-4 pt-16 sm:px-5 sm:pt-20">
      <div className="relative isolate mx-auto max-w-[84rem] overflow-hidden rounded-[2rem] bg-navy-ink px-5 py-16 text-white sm:rounded-[2.75rem] sm:px-10 sm:py-20 lg:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(244,180,26,0.2),transparent)]" />
          <div className="absolute -bottom-60 right-0 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(42,66,144,0.8),transparent)]" />
          <LogoMark tone="white" className="absolute -bottom-16 -left-20 w-[30rem] opacity-[0.035]" />
          <div className="bg-noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerGroup(0.1)}
          >
            <m.p variants={fadeRise} className="eyebrow text-gold">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              Free trial class
            </m.p>
            <m.h2
              variants={fadeRise}
              className="mt-4 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl"
            >
              Sit in a class before you{" "}
              <span className="font-serif font-normal italic tracking-normal text-gold">
                decide.
              </span>
            </m.h2>
            <m.p variants={fadeRise} className="mt-5 max-w-md text-slate-300">
              Tell us who&apos;s joining and which subjects — our coordinator
              will WhatsApp you to set up a free trial at {site.city}.
            </m.p>

            <ol className="relative mt-10 space-y-7">
              <span aria-hidden className="absolute bottom-4 left-[1.1875rem] top-4 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />
              {STEPS.map((step, i) => (
                <m.li key={step.title} variants={fadeRise} className="relative flex gap-5">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-extrabold text-navy-dark ring-4 ring-navy-ink">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-display text-lg font-bold">{step.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{step.body}</p>
                  </div>
                </m.li>
              ))}
            </ol>

            <m.figure
              variants={cardRise}
              className="relative mt-12 hidden overflow-hidden rounded-3xl ring-1 ring-white/10 lg:block"
            >
              <Image
                src="/images/campus/classroom.jpeg"
                alt="Students in a Learning Tribe classroom"
                width={544}
                height={220}
                sizes="28rem"
                className="h-44 w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-ink/90 via-navy-ink/20 to-transparent" />
              <figcaption className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-sm">
                <span className="font-semibold">Real classrooms, {site.city}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {site.campusDirections}
                </span>
              </figcaption>
            </m.figure>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={cardRise}
          >
            <LeadForm />
          </m.div>
        </div>
      </div>
    </section>
  );
}
