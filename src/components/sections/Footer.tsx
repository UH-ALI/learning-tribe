import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy-deeper px-5 py-12 text-slate-300">
      <div className="mx-auto grid max-w-site gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-white">
            {site.brandName}
          </p>
          <p className="mt-1 text-sm text-gold">{site.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed">
            Cambridge O Level, AS &amp; A2 coaching — morning and evening
            batches at {site.city}.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Visit Us
          </p>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-gold hover:text-gold-light"
          >
            Open in Google Maps →
          </a>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Talk to Us
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-gold"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-gold hover:text-gold-light"
          >
            Instagram @thelearningtribetlt →
          </a>
        </div>
      </div>

      <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.brandName}. All rights reserved.
      </p>
    </footer>
  );
}
