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

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <article className="flex h-full w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:w-full">
      {/* Headshot — falls back to branded initials until photos are added */}
      <div className="relative aspect-square w-full bg-navy">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.subjects.join(" & ")} teacher`}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 18rem"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(20rem_20rem_at_70%_20%,rgba(244,180,26,0.25),transparent)]">
            <span
              aria-hidden
              className="font-display text-6xl font-extrabold text-gold"
            >
              {initials(member.name)}
            </span>
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
