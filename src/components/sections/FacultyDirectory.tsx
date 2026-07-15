"use client";

import { m } from "framer-motion";
import { faculty } from "@/content/faculty";
import { FacultyCard } from "@/components/faculty/FacultyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SPRING_TAP,
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

/**
 * The core trust builder. The heading settles first, then the cards
 * cascade in as the rail crosses the reader's eye-line (whileInView,
 * fired once, offset -100px). Hover lifts are spring-driven transforms —
 * no box-shadow animation, so mobile scrolling stays at 60fps.
 */
export function FacultyDirectory() {
  return (
    <section id="faculty" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-site px-5">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeRise}
        >
          <SectionHeading
            eyebrow="Meet Our Teachers"
            title="Learn from subject specialists"
            description="Every subject is taught by a dedicated specialist — the same faculty families in Bahadurabad already trust."
          />
        </m.div>

        <m.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGroup(0.08, 0.1)}
          className="scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          aria-label="Faculty members"
        >
          {faculty.map((member) => (
            <m.li
              key={member.slug}
              variants={cardRise}
              whileHover={{ y: -6 }}
              transition={SPRING_TAP}
              className="flex"
            >
              <FacultyCard member={member} />
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
