import { SectionHeading } from "@/components/ui/SectionHeading";
import { resultStats, testimonials } from "@/content/results";

export function SocialProof() {
  return (
    <section id="results" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-site px-5">
        <SectionHeading
          eyebrow="Results & Reviews"
          title="The grades speak for themselves"
          description="Real students, real CAIE results — from the same classrooms you'll sit in."
        />

        {/* Results wall */}
        <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {resultStats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl bg-navy px-4 py-8 text-center"
            >
              <dd className="font-display text-4xl font-extrabold text-gold">
                {value}
              </dd>
              <dt className="mt-2 text-sm font-medium text-slate-300">
                {label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Testimonials — snap rail on mobile, 3-up grid on desktop */}
        <ul
          aria-label="Student testimonials"
          className="scrollbar-none -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
        >
          {testimonials.map(({ quote, name, detail }) => (
            <li
              key={detail}
              className="flex w-80 shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:w-full"
            >
              <p aria-hidden className="font-display text-4xl text-gold">
                &ldquo;
              </p>
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-700">
                {quote}
              </blockquote>
              <footer className="mt-4 border-t border-slate-100 pt-4">
                <p className="font-display text-sm font-bold text-navy">
                  {name}
                </p>
                <p className="text-xs font-semibold text-gold-dark">{detail}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
