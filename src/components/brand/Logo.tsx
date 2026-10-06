/**
 * The Learning Tribe mark, traced from the brand logo: a navy "L" book
 * cradled by two gold arrows rising upward. Pure SVG — crisp at any size,
 * zero image requests.
 */

/** Gold arrows — shared with decorative hero artwork. */
export const ARROW_RIGHT_PATH =
  "M461 7 L461 82 Q501 104 501 136 L501 443 Q553 405 559 352 L559 175 L604 216 Q592 88 465 7 Z";
export const ARROW_LEFT_PATH =
  "M149 7 L149 82 Q109 104 109 136 L109 443 Q57 405 51 352 L51 175 L6 216 Q18 88 145 7 Z";

const NAVY_PATHS = [
  "M161 6 L161 366 L325 478 L483 341 L433 311 L320 406 L219 336 L219 6 Z",
  "M293 88 L227 88 L227 322 L293 266 Z",
  "M425 303 L373 271 L272 359 L323 392 Z",
];

interface LogoMarkProps {
  className?: string;
  /** Colour of the "L" — navy on light surfaces, white on dark ones. */
  tone?: "navy" | "white";
  title?: string;
}

export function LogoMark({ className, tone = "navy", title }: LogoMarkProps) {
  const ink = tone === "navy" ? "#0F1E4B" : "#FFFFFF";
  return (
    <svg
      viewBox="0 0 610 486"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={ARROW_LEFT_PATH} fill="#F4B41A" />
      <path d={ARROW_RIGHT_PATH} fill="#F4B41A" />
      {NAVY_PATHS.map((d) => (
        <path key={d} d={d} fill={ink} />
      ))}
    </svg>
  );
}

/** Mark + two-tone wordmark, as used in the navbar and footer. */
export function Logo({
  tone = "white",
  className = "",
}: {
  tone?: "navy" | "white";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} className="h-8 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-extrabold tracking-tight ${
            tone === "white" ? "text-white" : "text-navy"
          }`}
        >
          The Learning <span className="text-gold">Tribe</span>
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] ${
            tone === "white" ? "text-white/50" : "text-navy/50"
          }`}
        >
          Learning is our only vibe
        </span>
      </span>
    </span>
  );
}
