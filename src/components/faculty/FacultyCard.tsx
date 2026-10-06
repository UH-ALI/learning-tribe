"use client";

import Image from "next/image";
import type { FacultyMember } from "@/content/types";
import { LogoMark } from "@/components/brand/Logo";
import { canonicalSubject } from "@/content/subjects";
import { requestTrial } from "@/lib/prefill";
import { trackSpotlight } from "@/components/motion/spotlight";

const LEVEL_SHORT: Record<FacultyMember["levels"][number], string> = {
  "O Level": "O",
  "AS Level": "AS",
  "A2 Level": "A2",
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !["dr", "sir", "miss", "ms"].includes(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Girl profile logo — a gold silhouette used when a teacher has no photo yet. */
function FemaleAvatar() {
  return (
    <svg viewBox="0 0 128 128" className="h-32 w-32 text-gold" role="img" aria-label="Profile logo">
      <circle cx="64" cy="64" r="62" fill="currentColor" opacity="0.12" />
      <circle cx="64" cy="50" r="20" fill="currentColor" />
      <path
        d="M40 52c0-16 10-27 24-27s24 11 24 27c0 6-2 11-4 14 0-6-1-12-4-16-4 3-10 5-16 5s-12-2-16-5c-3 4-4 10-4 16-2-3-4-8-4-14Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path d="M26 108c0-19 17-30 38-30s38 11 38 30v4H26v-4Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Portrait card in the spirit of the "Meet Our Teacher" posts: full-bleed
 * photo, name plate over a navy fade, gold subject pills. The trial button
 * pre-ticks this teacher's subjects in the enquiry form.
 */
export function FacultyCard({ member }: { member: FacultyMember }) {
  const subjects = member.subjects
    .map(canonicalSubject)
    .filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <article
      onPointerMove={trackSpotlight}
      className="spotlight group relative isolate aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-navy-light ring-1 ring-white/10 transition-shadow duration-500 [--spot:rgba(244,180,26,0.25)] hover:shadow-glow"
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.subjects.join(" & ")} teacher`}
          fill
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 80vw"
          className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 -z-20 flex items-center justify-center bg-[radial-gradient(28rem_22rem_at_70%_10%,rgba(244,180,26,0.22),transparent),linear-gradient(160deg,#1B2F6E,#0A1435)]">
          <LogoMark
            tone="white"
            className="absolute -right-10 -top-6 w-56 opacity-[0.06]"
          />
          {member.avatar === "female" ? (
            <FemaleAvatar />
          ) : (
            <span aria-hidden className="font-display text-7xl font-extrabold tracking-tight text-gold">
              {initials(member.name)}
            </span>
          )}
        </div>
      )}

      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-ink via-navy-ink/35 via-45% to-transparent" />

      {/* Levels */}
      <div className="absolute left-4 top-4 flex gap-1">
        {member.levels.map((level) => (
          <span
            key={level}
            title={level}
            className="rounded-full bg-navy-ink/55 px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-white ring-1 ring-white/15 backdrop-blur-md"
          >
            {LEVEL_SHORT[level]}
          </span>
        ))}
      </div>

      {/* Name plate */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex flex-wrap gap-1.5">
          {member.subjects.map((subject) => (
            <span
              key={subject}
              className="rounded-full bg-gold px-2.5 py-1 font-display text-[0.68rem] font-bold uppercase tracking-wide text-navy-dark"
            >
              {subject}
            </span>
          ))}
        </div>
        <h3 className="mt-2.5 font-display text-xl font-bold leading-tight tracking-tight text-white">
          {member.name}
        </h3>
        {member.credential ? (
          <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-white/65">
            {member.credential}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => requestTrial({ subjects })}
          className="mt-4 inline-flex w-full items-center justify-between gap-2 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 text-left text-[0.8rem] font-semibold text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-gold hover:text-navy-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          <span className="truncate">
            Book a free trial<span className="sr-only"> with {member.name}</span>
          </span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-navy-dark transition-transform group-hover:translate-x-0.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </article>
  );
}
