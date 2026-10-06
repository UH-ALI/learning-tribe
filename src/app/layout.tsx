import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

// Self-hosted via next/font — no external font requests, no layout shift.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Editorial italic accents — the web echo of the posters' script taglines.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thelearningtribe.pk"),
  title: `${site.brandName} — O & A Level Coaching in ${site.city}`,
  description:
    "Cambridge O Level, AS & A2 coaching at Bahadurabad, Karachi. Experienced specialist faculty, morning and evening batches, and a free trial class. Limited seats for Session 2026–27.",
  openGraph: {
    title: `${site.brandName} — Cambridge O & A Level Coaching`,
    description:
      "Experienced faculty. Proven Cambridge curriculum. Book your free trial class today.",
    locale: "en_PK",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1435",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.brandName,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressLines.slice(0, 2).join(", "),
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  telephone: `+${site.whatsappNumber}`,
  sameAs: [site.instagramUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${bricolage.variable} ${instrument.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
