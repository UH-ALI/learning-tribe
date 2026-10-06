/**
 * "Book a trial with Sir X" → jump to the form with that teacher's
 * subjects already ticked. A window event keeps the faculty cards and
 * the form decoupled: neither imports the other.
 */
export const PREFILL_EVENT = "lt:prefill";

export interface PrefillDetail {
  subjects?: string[];
}

export function requestTrial(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
  document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
}
