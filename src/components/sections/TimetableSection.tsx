"use client";

import { m } from "framer-motion";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { TimetableSwitcher } from "@/components/timetable/TimetableSwitcher";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import { timetable } from "@/content/timetable";
import { whatsappDemoLink } from "@/content/site";
import { SPRING_TAP, VIEWPORT, fadeRise } from "@/components/motion/vocabulary";

export function TimetableSection() {
  return (
    <section id="timetable" className="relative scroll-mt-20 bg-cream py-20 sm:py-28">
      <div aria-hidden className="bg-grid-navy absolute inset-x-0 top-0 h-[28rem]" />
      <div className="relative mx-auto max-w-site px-5">
        <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeRise}>
          <SectionHeading
            eyebrow="Class schedules"
            title={
              <>
                Pick the batch that <Accent>fits your day</Accent>
              </>
            }
            description="Weekday mornings for Grades 9–11, weekends for O Level, AS & A2 — same faculty, same campus."
          />
        </m.div>

        <TimetableSwitcher />

        {/* Timings disclaimer + coordinator CTA */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeRise}
          className="relative mt-8 flex flex-col items-start gap-5 overflow-hidden rounded-[1.75rem] bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative max-w-xl">
            <p className="font-display text-lg font-bold">Can&apos;t find your slot?</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{timetable.disclaimer}</p>
          </div>
          <m.a
            href={whatsappDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING_TAP}
            className="btn relative shrink-0 bg-[#25D366] text-navy-ink hover:bg-[#3ee07a]"
          >
            <WhatsAppGlyph className="h-5 w-5" />
            Ask the coordinator
          </m.a>
        </m.div>
      </div>
    </section>
  );
}
