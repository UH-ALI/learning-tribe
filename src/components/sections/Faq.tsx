"use client";

import { m } from "framer-motion";
import { faq } from "@/content/faq";
import { site, whatsappLink } from "@/content/site";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import {
  VIEWPORT,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

/**
 * Native <details> accordion — keyboard and screen-reader support for
 * free, and it works before hydration. The first answer starts open so
 * the pattern is obvious.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeRise}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <SectionHeading
            align="left"
            eyebrow="Questions parents ask"
            title={
              <>
                Good to <Accent>know</Accent>
              </>
            }
            description="Quick answers about trial classes, batches and the campus. Anything else — just ask."
          />

          <div className="mt-8 rounded-3xl bg-cream p-6 ring-1 ring-navy/[0.06]">
            <p className="font-display text-lg font-bold text-navy">Still curious?</p>
            <p className="mt-1 text-sm text-slate-600">
              Our coordinator replies on WhatsApp, or call us directly.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn min-h-11 bg-[#25D366] px-5 text-sm text-navy-ink hover:bg-[#3ee07a]"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                WhatsApp
              </a>
              <a href={`tel:${site.phones[0].replace(/\s/g, "")}`} className="btn-outline-navy min-h-11 px-5 text-sm">
                Call {site.phones[0]}
              </a>
            </div>
          </div>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGroup(0.06)}
          className="divide-y divide-navy/[0.08] border-y border-navy/[0.08]"
        >
          {faq.map(({ question, answer }, i) => (
            <m.details
              key={question}
              variants={fadeRise}
              open={i === 0}
              className="group py-1"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-5 font-display text-lg font-bold text-navy transition-colors hover:text-navy-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-xl [&::-webkit-details-marker]:hidden">
                {question}
                <span
                  aria-hidden
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-navy transition-colors group-open:bg-gold"
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 group-open:rotate-90 group-open:scale-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-slate-600">{answer}</p>
            </m.details>
          ))}
        </m.div>
      </div>
    </section>
  );
}
