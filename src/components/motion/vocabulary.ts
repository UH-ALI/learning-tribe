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

/** Scroll trigger: fire once, 100px before the element hits the viewport edge. */
export const VIEWPORT = { once: true, margin: "-100px" } as const;

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

/** Masked line reveal — pair with an `overflow-hidden` parent. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { ...SPRING, stiffness: 90 } },
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
