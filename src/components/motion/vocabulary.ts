import type { Transition, Variants } from "framer-motion";

/**
 * The site's motion vocabulary. Every animated component draws from
 * these few primitives so the whole page moves with one accent —
 * consistent physics is what separates designed motion from decoration.
 *
 * Performance: every variant animates transform/opacity only. Both are
 * GPU-composited, so nothing here triggers layout or paint on mobile.
 */

/** Standard entrance spring — settles quickly, slight organic overshoot. */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

/** Heavier spring for large surfaces (cards, panels) — less overshoot. */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.9,
};

/** Snappy spring for pointer feedback on buttons and links. */
export const SPRING_TAP: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 22,
};

/**
 * Scroll trigger: fire once, 100px before the element crosses the bottom
 * edge. Vertical inset only — a horizontal one would shrink the viewport
 * sideways and strand narrow elements near the screen edges on phones.
 */
export const VIEWPORT = { once: true, margin: "-100px 0px" } as const;

/** Rise-and-fade for individual elements. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

/** Softer rise for large cards. */
export const cardRise: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: SPRING_SOFT },
};

/** Scale-in for floating badges and chips. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING },
};

/** Masked line reveal — pair with an `overflow-hidden` parent. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { ...SPRING, stiffness: 90 } },
};

/** Hand-drawn stroke — animate an SVG path's length from 0 to 1. */
export const drawStroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 },
  },
};

/** Orchestrator: parents stagger their children into place. */
export function staggerGroup(stagger = 0.1, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}
