import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Arrow, Check } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns – Gebäudemanagement aus Reutlingen",
  description:
    "Gebäudemanagement Dalkilic: junges Handwerksunternehmen aus Reutlingen, eingetragen bei der HWK Reutlingen. Fokus auf Instandhaltung bestehender Gebäude – alles aus einer Hand.",
  alternates: { canonical: "/ueber-uns" },
};

const values = [
  { t: "Ehrlich beraten", d: "Wir sagen Ihnen, was Ihr Objekt wirklich braucht – und was nicht. Die Erstberatung ist kostenlos und unverbindlich." },
  { t: "Verlässlich erreichbar", d: "Montag bis Samstag von 9 bis 18 Uhr, dazu Notdienst und Rufbereitschaft. Anfragen nach 18 Uhr beantworten wir am nächsten Tag." },
  { t: "Feste Gesichter", d: "Sie bekommen einen festen Ansprechpartner, der Ihr Objekt kennt. Keine wechselnden Kolonnen, keine Rückfragen von vorn." },
  { t: "Leise & sauber", d: "Akku-Geräte in der Grünpflege, umweltschonende Reinigungsmittel, ordentliche Baustellen. So, wie wir es zu Hause auch wollen." },
];

const departments = ["Gebäudereinigung", "Hausmeisterservice", "Instandhaltung", "Grünpflege", "Elektro (mit Partnerbetrieben)", "Hausverwaltung (im Aufbau)"];

export default function UeberUns() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={
          <>
            Handwerk aus Reutlingen – <em>für Gebäude, die bleiben.</em>
          </>
        }
        text="Wir sind ein junges Unternehmen mit einem klaren Fokus: bestehende Gebäude pflegen, instand halten und technisch betreuen. Alles aus einer Hand, ohne Rohbau und ohne Umwege."
      />

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-royal">Unsere Geschichte</p>
          <h2 className="display mt-4 text-[36px] text-navy md:text-[52px]">
            Gegründet 2026. <em>Mit Erfahrung aus dem Handwerk.</em>
          </h2>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <p className="text-[18px] leading-relaxed text-ink/80 md:text-[20px]">
            {site.name} wurde am {site.foundedDate} in Reutlingen gegründet – mit dem Ziel, Eigentümern, Büros und
            Hausverwaltungen einen Partner zu geben, der sich wirklich um das ganze Gebäude kümmert.
          </p>
          <p className="mt-6 leading-relaxed text-mist">
            Der Schwerpunkt liegt auf der Gebäudereinigung – mit den besten Gebäudereinigern im Team. Dazu kommen
            Hausmeisterservice, Grünpflege und Elektro. Elektroarbeiten führen wir derzeit gemeinsam mit geprüften
            Partnerbetrieben aus; sobald der eigene Meisterbrief vorliegt, übernehmen wir sie in eigener Regie.
          </p>
          <p className="mt-6 leading-relaxed text-mist">
            Wir sind bei der {site.hwk} eingetragen und arbeiten ausschließlich an Bestandsgebäuden: keine Rohbau- oder
            Neubauarbeiten, dafür alles, was ein Gebäude im Alltag braucht.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {departments.map((d) => (
              <li key={d} className="chip bg-white text-ink ring-1 ring-ink/10">
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-[600px]">
            <p className="eyebrow text-aqua">Wofür wir stehen</p>
            <h2 className="display mt-4 text-[36px] text-navy md:text-[52px]">
              Vier Dinge, auf die Sie sich <em>verlassen können.</em>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className="h-full rounded-[22px] bg-cloud p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-royal text-white">
                    <Check />
                  </span>
                  <h3 className="mt-5 text-[19px] font-bold text-navy">{v.t}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-6">
          <div className="card h-full bg-navy p-8 text-white md:p-10">
            <p className="eyebrow text-sky">Qualifikation</p>
            <ul className="mt-6 space-y-4">
              {[
                ["Handwerkskammer", `Eingetragen bei der ${site.hwk}`],
                ["Meisterbrief", "Elektro-Meisterbrief folgt in Kürze – bis dahin arbeiten wir im Elektrobereich mit geprüften Partnerbetrieben"],
                ["Team", "Gebäudereiniger, Hausmeister und Gartenpfleger mit Erfahrung aus dem Handwerk"],
                ["Versichert", "Betriebshaftpflicht für alle Leistungen – auf Wunsch legen wir den Nachweis vor"],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-1 border-t border-white/10 pt-4 md:grid-cols-[170px_1fr]">
                  <span className="font-bold text-white">{t}</span>
                  <span className="text-white/70">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="md:col-span-6" delay={100}>
          <div className="card h-full p-8 md:p-10">
            <p className="eyebrow text-leaf">Für wen wir da sind</p>
            <h2 className="display mt-4 text-[30px] text-navy md:text-[38px]">
              Privathäuser, Büros, Gewerbe – <em>und Menschen, die sich nicht mehr um alles kümmern möchten.</em>
            </h2>
            <p className="mt-5 leading-relaxed text-mist">
              Viele unserer Kunden besitzen ein großes Haus oder eine Villa und möchten die Objektpflege in gute Hände geben.
              Genau dafür sind wir da: regelmäßig, zuverlässig und mit einem festen Ansprechpartner, der sich kümmert.
            </p>
            <Link href="/kontakt" className="btn btn-primary mt-8">
              Kostenlose Besichtigung <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
