import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Gebäudemanagement Dalkilic – Gebäudereinigung, Hausmeisterservice, Grünpflege & Elektro in Reutlingen",
    template: "%s · Gebäudemanagement Dalkilic",
  },
  description:
    "Gebäudereinigung, Hausmeisterservice, Grünpflege und Elektro aus einer Hand – für Privathäuser, Büros und Gewerbe in Reutlingen und 20 km Umkreis. Kostenlose Besichtigung, Notdienst, HWK Reutlingen.",
  keywords: ["Gebäudereinigung Reutlingen", "Hausmeisterservice Reutlingen", "Gartenpflege Reutlingen", "Elektriker Reutlingen", "Gebäudemanagement Reutlingen", "Treppenhausreinigung", "Winterdienst Reutlingen"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Gebäudemanagement Dalkilic – Ihr Gebäude. In guten Händen.",
    description: "Reinigung, Hausmeisterservice, Grünpflege und Elektro aus einer Hand – Reutlingen und Umgebung.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  foundingDate: "2026-10-01",
  address: { "@type": "PostalAddress", streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: "DE" },
  areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.4914, longitude: 9.2043 }, geoRadius: "20000" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" }],
  makesOffer: ["Gebäudereinigung", "Hausmeisterservice", "Grünpflege", "Elektroinstallation"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-dvh overflow-x-hidden">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
        <FloatingContact />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
