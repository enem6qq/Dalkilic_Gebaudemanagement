import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum", robots: { index: false, follow: true } };

export default function Impressum() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" />
      <section className="container-x pb-24">
        <div className="card max-w-[760px] p-8 leading-relaxed text-ink md:p-12">
          <h2 className="text-[20px] font-bold text-navy">Angaben gemäß § 5 DDG</h2>
          <p className="mt-3">
            {site.name}
            <br />
            Inhaber: {site.owner}
            <br />
            {site.street}
            <br />
            {site.zip} {site.city}
          </p>
          <h2 className="mt-8 text-[20px] font-bold text-navy">Kontakt</h2>
          <p className="mt-3">
            Telefon: {site.phone}
            <br />
            E-Mail: {site.email}
          </p>
          <h2 className="mt-8 text-[20px] font-bold text-navy">Berufsbezeichnung und Kammer</h2>
          <p className="mt-3">
            Rechtsform: {site.legalForm}
            <br />
            Eingetragen bei der {site.hwk}
            <br />
            Betriebsnummer / Handwerksrolle: <span className="text-mist">[bitte ergänzen]</span>
          </p>
          <h2 className="mt-8 text-[20px] font-bold text-navy">Umsatzsteuer</h2>
          <p className="mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <span className="text-mist">[bitte ergänzen, falls vorhanden]</span>
          </p>
          <h2 className="mt-8 text-[20px] font-bold text-navy">Streitbeilegung</h2>
          <p className="mt-3">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <p className="mt-8 rounded-[14px] bg-amber/10 p-4 text-[13.5px] text-ink">
            Hinweis für den Betreiber: Adresse, Handwerksrollen-Nummer und ggf. USt-IdNr. müssen vor Veröffentlichung ergänzt werden
            (Datei <code>lib/site.ts</code> und diese Seite).
          </p>
        </div>
      </section>
    </>
  );
}
