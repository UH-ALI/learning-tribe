import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/content/site";

/**
 * The conversion endpoint of the funnel. Keeps id="enroll" — the hero
 * CTA and every mid-page CTA anchor here. Extra bottom padding keeps
 * the floating WhatsApp button clear of the submit button.
 */
export function LeadCapture() {
  return (
    <section
      id="enroll"
      className="scroll-mt-16 bg-navy-dark px-5 py-16 pb-28 sm:py-24 sm:pb-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">
            Free Trial Class
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Sit in a class before you{" "}
            <span className="text-gold">decide</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-300">
            Tell us who&apos;s joining and which subjects — our coordinator
            will WhatsApp you to set up a free trial at {site.city}.
          </p>
        </div>

        <div className="mt-10">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
