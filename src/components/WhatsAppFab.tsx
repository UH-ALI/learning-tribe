"use client";

import { useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { whatsappLink } from "@/content/site";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import { SPRING } from "@/components/motion/vocabulary";

/** Show the widget only after the visitor scrolls past the hero's own CTAs. */
const REVEAL_AFTER_PX = 600;

/**
 * Persistent WhatsApp escape hatch. Hidden on load — the hero already has a
 * "Chat on WhatsApp" button, so the widget would be redundant noise above
 * the fold. It springs in once the reader scrolls into the page proper,
 * and is unfocusable/unclickable while hidden. On wide screens the label
 * slides out on hover.
 */
export function WhatsAppFab() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > REVEAL_AFTER_PX));

  return (
    <m.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      initial={false}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 24 }}
      transition={SPRING}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="group fixed bottom-5 right-5 z-50 flex h-14 items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden" />
      <span className="relative flex h-14 w-14 items-center justify-center">
        <WhatsAppGlyph className="h-8 w-8" />
      </span>
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap font-display text-sm font-bold transition-[max-width,padding] duration-500 ease-out group-hover:max-w-[10rem] group-hover:pr-5 sm:block">
        Chat with us
      </span>
    </m.a>
  );
}
