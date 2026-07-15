"use client";

import { useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import {
  SPRING,
  SPRING_TAP,
  staggerGroup,
} from "@/components/motion/vocabulary";

const NAV_LINKS = [
  { href: "#faculty", label: "Faculty" },
  { href: "#timetable", label: "Timetables" },
  { href: "#results", label: "Results" },
] as const;

const navItem = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

/**
 * Fixed header. Rides transparent over the navy hero, then eases into a
 * blurred glass bar once the page scrolls — the state change is driven
 * by framer-motion's scroll value, not a scroll event listener.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <m.header
      initial="hidden"
      animate="visible"
      variants={staggerGroup(0.08, 0.1)}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-navy-deeper/85 shadow-lg shadow-black/10 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-site items-center justify-between px-5"
      >
        {/* Wordmark */}
        <m.a
          variants={navItem}
          href="#"
          className="font-display text-base font-extrabold tracking-tight text-white"
        >
          The Learning{" "}
          <span className="text-gold">Tribe</span>
        </m.a>

        {/* Anchor links — desktop only; mobile keeps the bar minimal */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <m.a
              key={href}
              variants={navItem}
              href={href}
              className="group relative py-1 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
            >
              {label}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </m.a>
          ))}
        </div>

        {/* Persistent CTA */}
        <m.a
          variants={navItem}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={SPRING_TAP}
          href="#enroll"
          className="inline-flex min-h-10 items-center rounded-full bg-gold px-5 font-display text-sm font-bold text-navy-dark shadow-md shadow-gold/20"
        >
          Free Trial
        </m.a>
      </nav>
    </m.header>
  );
}
