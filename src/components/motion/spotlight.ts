import type { PointerEvent } from "react";

/**
 * Feeds the pointer position into the `.spotlight` CSS (see globals.css)
 * so a soft glow follows the cursor across a card. Writes two custom
 * properties — no React state, no re-render per mouse move.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--y", `${event.clientY - rect.top}px`);
}
