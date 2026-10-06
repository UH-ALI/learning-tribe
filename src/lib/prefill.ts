/**
 * Cross-section links into the sign-up area, via window events so the
 * sections and forms stay decoupled (none imports another):
 *
 * - "Book a free trial with Sir X" → trial mode, that teacher's subjects ticked
 * - "Register now" on the crash-course pass → crash-course mode
 */
export const PREFILL_EVENT = "lt:prefill";
export const ENROL_MODE_EVENT = "lt:enrol-mode";

export type EnrolMode = "trial" | "crash";

export interface PrefillDetail {
  subjects?: string[];
}

/** Hash that opens the sign-up area in crash-course mode (shareable, e.g. in ads). */
export const CRASH_COURSE_HASH = "#crash-course-form";

function scrollToForm() {
  document.getElementById("enroll-form")?.scrollIntoView({ behavior: "smooth" });
}

export function requestTrial(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
  scrollToForm();
}

export function openEnrol(mode: EnrolMode) {
  window.dispatchEvent(new CustomEvent<EnrolMode>(ENROL_MODE_EVENT, { detail: mode }));
  scrollToForm();
}
