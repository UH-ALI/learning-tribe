import { site } from "@/content/site";

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12 7-1 11.4-5.6 12-12Z" />
    </svg>
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {site.tribeCode.map(({ lead, word }) => (
        <li
          key={word}
          className="flex items-center gap-6 whitespace-nowrap px-3 font-display text-xl font-semibold tracking-tight sm:text-2xl"
        >
          <span>
            {lead}{" "}
            <span className="font-extrabold uppercase">{word}</span>
          </span>
          <Star />
        </li>
      ))}
    </ul>
  );
}

/**
 * The "tribe code" from the classroom poster, running as a tilted gold
 * ribbon across the dark stretch between the hero and the faculty.
 * Pure CSS marquee — the list is doubled and slid by -50% for a
 * seamless loop.
 */
export function TribeMarquee() {
  return (
    <section
      aria-label="The Tribe code"
      className="relative z-10 overflow-hidden bg-navy-ink py-8"
    >
      <div className="-mx-4 -rotate-[1.6deg] bg-gold py-4 text-navy-dark shadow-[0_20px_50px_-20px_rgba(244,180,26,0.6)]">
        <div className="mask-fade-x flex">
          <div className="flex animate-marquee motion-reduce:animate-none">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
