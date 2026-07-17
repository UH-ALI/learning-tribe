import Image from "next/image";
import type { FacultyMember } from "@/content/types";
import { Badge } from "@/components/ui/Badge";

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
    <svg
      viewBox="0 0 128 128"
      className="h-28 w-28 text-gold"
      role="img"
      aria-label="Profile logo"
    >
      <circle cx="64" cy="64" r="62" fill="currentColor" opacity="0.12" />
      {/* head */}
      <circle cx="64" cy="50" r="20" fill="currentColor" />
      {/* hair framing the face */}
      <path
        d="M40 52c0-16 10-27 24-27s24 11 24 27c0 6-2 11-4 14 0-6-1-12-4-16-4 3-10 5-16 5s-12-2-16-5c-3 4-4 10-4 16-2-3-4-8-4-14Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* shoulders */}
      <path
        d="M26 108c0-19 17-30 38-30s38 11 38 30v4H26v-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <article className="flex h-full w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:w-full">
      {/* Headshot — photo cropped square from the top so faces stay in frame;
          falls back to a female profile logo or branded initials otherwise. */}
      <div className="relative aspect-square w-full bg-navy">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.subjects.join(" & ")} teacher`}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 18rem"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(20rem_20rem_at_70%_20%,rgba(244,180,26,0.25),transparent)]">
            {member.avatar === "female" ? (
              <FemaleAvatar />
            ) : (
              <span
                aria-hidden
                className="font-display text-6xl font-extrabold text-gold"
              >
                {initials(member.name)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold text-navy">
          {member.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {member.subjects.map((subject) => (
            <Badge key={subject}>{subject}</Badge>
          ))}
        </div>

        {member.credential ? (
          <p className="text-sm text-slate-600">{member.credential}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {member.levels.map((level) => (
            <Badge key={level} variant="outline">
              {level}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
