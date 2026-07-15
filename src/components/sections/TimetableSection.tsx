import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimetableSwitcher } from "@/components/timetable/TimetableSwitcher";
import { timetable } from "@/content/timetable";
import { whatsappDemoLink } from "@/content/site";

export function TimetableSection() {
  return (
    <section id="timetable" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-site px-5">
        <SectionHeading
          eyebrow="Class Schedules"
          title="Pick the batch that fits your day"
          description="Weekday mornings for Grades 9–11, weekend evenings for O Level, AS & A2 — same faculty, same campus."
        />

        <TimetableSwitcher />

        {/* Timings disclaimer + coordinator CTA */}
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-gold/40 bg-gold/5 p-6 text-center">
          <p className="text-sm text-slate-700">{timetable.disclaimer}</p>
          <a
            href={whatsappDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-4 bg-navy text-white hover:bg-navy-light"
          >
            Ask the Coordinator on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
