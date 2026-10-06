import { site, whatsappLink } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";

const LINKS = [
  { href: "#faculty", label: "Faculty" },
  { href: "#why", label: "Why the Tribe" },
  { href: "#results", label: "Results" },
  { href: "#timetable", label: "Timetable" },
  { href: "#crash-courses", label: "Crash courses" },
  { href: "#faq", label: "FAQ" },
  { href: "#enroll", label: "Free trial class" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-gold">
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-ink text-slate-300">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(42,66,144,0.6),transparent)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-site px-5 pt-20">
        {/* Closing CTA */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            Ready to join the{" "}
            <span className="font-serif font-normal italic tracking-normal text-gold">
              Tribe?
            </span>
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#enroll" className="btn-gold min-h-14 px-8">
              Book a free trial class
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass min-h-14 px-8"
            >
              <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Cambridge O Level, AS &amp; A2 coaching — morning and weekend
              batches at {site.city}.
            </p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @thelearningtribetlt
            </a>
          </div>

          <div>
            <Heading>Explore</Heading>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-gold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Visit us</Heading>
            <address className="mt-4 text-sm not-italic leading-relaxed">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-1 block text-slate-500">{site.campusDirections}</span>
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light"
            >
              Open in Google Maps
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div>
            <Heading>Talk to us</Heading>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="font-display text-lg font-bold text-white tabular transition-colors hover:text-gold"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-serif text-lg italic text-gold-light">{site.tagline}</p>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="text-stroke -mb-[0.22em] whitespace-nowrap text-center font-display text-[15vw] font-extrabold leading-none tracking-[-0.05em]">
          The Learning Tribe
        </p>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-site px-5 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {site.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
