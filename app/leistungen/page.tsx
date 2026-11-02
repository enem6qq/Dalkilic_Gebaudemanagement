import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Arrow, Check, ServiceIcon } from "@/components/Icons";
import { services, tones } from "@/lib/services";

export const metadata: Metadata = {
  title: "Leistungen – Gebäudereinigung, Hausmeisterservice, Grünpflege & Elektro",
  description:
    "Alle Leistungen von Gebäudemanagement Dalkilic in Reutlingen: Unterhaltsreinigung, Treppenhausreinigung, Hausmeisterservice, Winterdienst, Gartenpflege, E-Check und mehr.",
  alternates: { canonical: "/leistungen" },
};

export default function Leistungen() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title={
          <>
            Alles rund um Ihr <em>Bestandsgebäude.</em>
          </>
        }
        text="Vier Bereiche, ein Ansprechpartner: Wir reinigen, pflegen, halten instand und kümmern uns um die Elektrik – für Privathäuser, Büros, Gewerbe und Hausverwaltungen."
      />

      <section className="container-x py-16 md:py-24">
        <div className="space-y-6">
          {services.map((s, i) => {
            const tone = tones[s.tone];
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.id} as="article" className="card overflow-hidden">
                <div className={`grid gap-8 p-7 md:grid-cols-12 md:gap-12 md:p-12 ${flip ? "" : ""}`}>
                  <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: tone.hex }}>
                      <ServiceIcon id={s.id} className="h-7 w-7" />
                    </span>
                    <p className="eyebrow mt-8" style={{ color: tone.hex }}>
                      {s.eyebrow}
                    </p>
                    <h2 className="display mt-3 text-[36px] text-navy md:text-[48px]">
                      {s.headline[0]} <em>{s.headline[1]}</em>
                    </h2>
                    <p className="mt-5 leading-relaxed text-mist">{s.intro}</p>
                    <ul className="mt-6 space-y-2">
                      {s.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] font-semibold text-ink">
                          <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: tone.hex }}>
                            <Check className="h-3 w-3" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/leistungen/${s.slug}`} className="btn btn-dark mt-8">
                      {s.name} im Detail <Arrow />
                    </Link>
                  </div>
                  <div className={`md:col-span-7 ${flip ? "md:order-1" : ""}`}>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {s.items.map((it) => (
                        <li key={it.name} className="rounded-[18px] bg-cloud p-5">
                          <p className="font-bold text-navy">{it.name}</p>
                          <p className="mt-1 text-[14px] leading-relaxed text-mist">{it.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-24">
        <Reveal className="card grid gap-8 bg-navy p-8 text-white md:grid-cols-12 md:items-center md:p-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-sky">Betreuungsvertrag oder Einzelauftrag</p>
            <h2 className="display mt-3 text-[32px] md:text-[44px]">
              Sie entscheiden, <em className="text-sky">wie viel wir übernehmen.</em>
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-white/70">
              Einmalige Grundreinigung oder Rundum-Betreuung mit Hausmeister, Reinigung, Grünpflege und Winterdienst – wir
              stellen das Paket zusammen, das zu Ihrem Objekt passt. Nach einer kostenlosen Besichtigung vor Ort.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/kontakt" className="btn btn-light">
              Besichtigung anfragen <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
