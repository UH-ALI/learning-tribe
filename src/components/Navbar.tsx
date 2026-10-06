"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { whatsappLink } from "@/content/site";
import {
  SPRING,
  SPRING_TAP,
  staggerGroup,
} from "@/components/motion/vocabulary";

const NAV_LINKS = [
  { href: "#why", label: "Why us" },
  { href: "#faculty", label: "Faculty" },
  { href: "#timetable", label: "Timetable" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
] as const;

const navItem = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

/** Tracks which section is under the reader's eye-line. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// Hero and enrol have no nav link; observing them clears the highlight there.
const SECTION_IDS = ["top", ...NAV_LINKS.map((l) => l.href.slice(1)), "enroll"];

/**
 * Fixed header. Rides transparent and full-width over the navy hero, then
 * tightens into a floating glass island once the page scrolls. A gold
 * hairline along the top edge tracks reading progress.
 */
export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Freeze the page behind the mobile menu; Escape closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <m.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
      />

      <m.header
        initial="hidden"
        animate="visible"
        variants={staggerGroup(0.06, 0.1)}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex h-16 max-w-site items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 ease-out sm:pl-5 ${
            scrolled
              ? "border border-white/10 bg-navy-deeper/80 shadow-[0_20px_50px_-20px_rgba(4,9,25,0.8)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <m.a variants={navItem} href="#top" aria-label="The Learning Tribe — home">
            <Logo />
          </m.a>

          {/* Anchor links — desktop only */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = active === href.slice(1);
              return (
                <m.a
                  key={href}
                  variants={navItem}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden
                    className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </m.a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <m.a
              variants={navItem}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_TAP}
              href="#enroll"
              className="btn-gold hidden min-h-11 px-5 text-sm sm:inline-flex"
            >
              Book a free trial
            </m.a>

            <m.button
              variants={navItem}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "w-5 -translate-y-[5px] -rotate-45" : "w-3"
                  }`}
                />
              </span>
            </m.button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 overflow-y-auto bg-navy-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
            />
            <m.nav
              aria-label="Mobile"
              initial="hidden"
              animate="visible"
              variants={staggerGroup(0.06, 0.08)}
              className="relative flex min-h-full flex-col px-6 pb-10 pt-28"
            >
              <ul className="space-y-1">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <m.li key={href} variants={navItem}>
                    <a
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl font-bold tracking-tight text-white"
                    >
                      <span className="font-sans text-xs font-semibold text-gold tabular">
                        0{i + 1}
                      </span>
                      <span className="transition-colors group-hover:text-gold">
                        {label}
                      </span>
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.div variants={navItem} className="mt-auto grid gap-3 pt-10">
                <a
                  href="#enroll"
                  onClick={() => setMenuOpen(false)}
                  className="btn-gold w-full"
                >
                  Book a free trial class
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass w-full"
                >
                  Chat on WhatsApp
                </a>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
