"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * App-wide motion boundary.
 *
 * - LazyMotion + `m.` components load only the DOM animation feature set
 *   (roughly a third of the full framer-motion bundle) — `strict` throws
 *   if anyone imports the heavy `motion.` API by accident.
 * - MotionConfig honours prefers-reduced-motion: users who ask for less
 *   movement get opacity-only transitions automatically.
 *
 * Children passed through from the server layout stay server components.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
