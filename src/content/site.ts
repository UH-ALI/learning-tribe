import type { SiteContent } from "./types";

export const site: SiteContent = {
  brandName: "The Learning Tribe",
  tagline: "Learning Is Our Only Vibe",
  city: "Bahadurabad, Karachi",
  addressLines: [
    "Arab Business Center",
    "Main Char Minar Chowrangi",
    "Bahadurabad, Karachi",
  ],
  phones: ["0317 8915543", "0309 8191228"],
  whatsappNumber: "923178915543",
  whatsappPrefill:
    "Hi! I'd like to book a free trial class at The Learning Tribe.",
  instagramUrl: "https://www.instagram.com/thelearningtribetlt/",
  mapsUrl: "https://maps.app.goo.gl/ScKQsFgLxRZ3Wmpd6",
  sessionNote:
    "Session 2026–27 now enrolling — Morning & Evening batches, limited seats.",
  campusDirections: "Second floor, left side",
  tribeCode: [
    { lead: "Be ready to", word: "Learn" },
    { lead: "Tell the", word: "Truth" },
    { lead: "Raise your", word: "Hand" },
    { lead: "Do your", word: "Best" },
    { lead: "Be kind to", word: "Everyone" },
    { lead: "Work", word: "Hard" },
    { lead: "Ask", word: "Questions" },
    { lead: "Dream", word: "Big" },
    { lead: "Try new", word: "Things" },
    { lead: "Don't", word: "Give Up" },
  ],
};

/** WhatsApp deep link with the pre-filled inquiry message. */
export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappPrefill,
)}`;

/** Same number, timetable-specific prefill — confirm timings / book a demo class. */
export const whatsappDemoLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi! I'd like to confirm the current class timings and book a free demo class at The Learning Tribe.",
)}`;

/** Same number, crash-course prefill. */
export const whatsappCrashLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi! I'd like to know more about the crash courses at The Learning Tribe.",
)}`;
