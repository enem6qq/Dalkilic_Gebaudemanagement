import Link from "next/link";
import { BuildingScene } from "@/components/three/Lazy";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { BuildingExplorer } from "@/components/BuildingExplorer";
import { AreaMap } from "@/components/AreaMap";
import { Arrow, Check, Phone, WhatsApp } from "@/components/Icons";
import { audiences, services, steps, usps } from "@/lib/services";
import { areaTowns, site } from "@/lib/site";

const facts = [
  "Kostenlose Besichtigung vor Ort",
  "Notdienst & Rufbereitschaft",
  "Eingetragen bei der HWK Reutlingen",
  "Reutlingen + 20 km Umkreis",
  "Betreuungsvertrag oder Einzelauftrag",
  "Leise Akku-Gartengeräte",
  "Mo – Sa 09:00 – 18:00 Uhr",
];

export default function Home() {
  const [reinigung, ...rest] = services;
  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,#1f4f9e_0%,#10294d_45%,#0b1f3a_100%)]" />
        <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-[52%] md:inset-0 md:left-[30%] md:h-auto">
          <BuildingScene />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent md:bg-gradient-to-r md:from-navy md:via-navy/40 md:to-transparent" />

        <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:justify-center md:pb-24">
          <div className="pointer-events-auto max-w-[640px]">
            <p className="eyebrow text-sky">Gebäudemanagement · Reutlingen & Umgebung</p>
            <h1 className="display mt-5 text-[52px] sm:text-[68px] md:text-[88px]">
              Ihr Gebäude.
              <br />
              <em className="text-sky">In guten Händen.</em>
            </h1>
            <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-white/80 md:text-[19px]">
              Gebäudereinigung, Hausmeisterservice, Grünpflege und Elektro – alles aus einer Hand. Für Privathäuser, Büros und
              Gewerbe in Reutlingen und {site.radiusKm} km Umkreis.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-primary">
                Kostenlose Besichtigung <Arrow />
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn btn-ghost text-white">
                <Phone /> {site.phone}
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-white/70">
              {["Kostenlose Erstberatung", "Notdienst & Rufbereitschaft", "HWK Reutlingen"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="text-sky" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="pointer-events-none absolute right-6 top-28 hidden text-right text-[12px] leading-relaxed text-white/45 lg:block">
          Echtzeit-3D · Maus bewegen
          <br />
          Bereiche anklicken
        </p>
      </section>

      {/* ——— Laufband ——— */}
      <div className="overflow-hidden border-y border-navy/10 bg-white py-5" aria-label="Das zeichnet uns aus">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...facts, ...facts].map((f, i) => (
            <span key={i} className="flex items-center gap-12 text-[15px] font-semibold text-navy">
              {f}
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* ——— Intro ——— */}
      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-royal">Alles aus einer Hand</p>
          <h2 className="display mt-5 text-[40px] text-navy md:text-[60px]">
            Ein Partner. <em>Vier Gewerke.</em> Keine Koordination.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <p className="text-[19px] leading-relaxed text-ink/80 md:text-[22px]">
            Wir kümmern uns um Bestandsgebäude: reinigen, pflegen, instand halten, reparieren. Sie haben einen
            Ansprechpartner, eine Rechnung und ein Gebäude, das jeden Tag einen guten Eindruck macht.
          </p>
          <p className="mt-6 leading-relaxed text-mist">
            Keine Rohbau- oder Neubauarbeiten – dafür alle Handwerksdienstleistungen rund um die Instandhaltung. Als
            fester Betreuungsvertrag oder als Einzelauftrag, ganz wie es zu Ihrem Objekt passt.
          </p>
          <Link href="/ueber-uns" className="link-underline mt-8 inline-flex items-center gap-2 font-bold text-navy">
            Mehr über uns <Arrow />
          </Link>
        </Reveal>
      </section>

      {/* ——— Leistungen ——— */}
      <section className="bg-white py-24 md:py-32" id="leistungen">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-aqua">Leistungen</p>
              <h2 className="display mt-4 max-w-[16ch] text-[40px] text-navy md:text-[60px]">
                Was wir für Ihr <em>Gebäude</em> tun.
              </h2>
            </div>
            <Link href="/leistungen" className="btn btn-dark self-start md:self-auto">
              Alle Leistungen <Arrow />
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <ServiceCard s={reinigung} big />
            </Reveal>
            {rest.map((s, i) => (
              <Reveal key={s.id} delay={80 + i * 70} className={i === 0 ? "md:row-span-2" : ""}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
            <Reveal delay={300} className="md:col-span-2">
              <div className="card flex h-full flex-col justify-between gap-6 bg-navy p-7 text-white md:flex-row md:items-center md:p-8">
                <div>
                  <p className="eyebrow text-sky">Nicht sicher, was Sie brauchen?</p>
                  <p className="display mt-2 text-[26px]">Wir schauen uns Ihr Objekt kostenlos an.</p>
                </div>
                <Link href="/kontakt" className="btn btn-light shrink-0">
                  Besichtigung anfragen <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Gebäude-Explorer ——— */}
      <section className="container-x py-24 md:py-32">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow text-royal">Ihr Gebäude im Überblick</p>
          <h2 className="display mt-4 text-[40px] text-navy md:text-[56px]">
            Klicken Sie sich durch – <em>Bereich für Bereich.</em>
          </h2>
          <p className="mt-5 leading-relaxed text-mist">
            Fenster, Eingang, Garten oder Dach und Technik: Jeder Bereich Ihres Gebäudes hat bei uns einen festen Platz.
          </p>
        </Reveal>
        <Reveal className="mt-12" delay={100}>
          <BuildingExplorer />
        </Reveal>
      </section>

      {/* ——— Warum Dalkilic ——— */}
      <section className="grain relative overflow-hidden bg-navy py-24 text-white md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(29_95_214/0.35),transparent_70%)]" />
        <div className="container-x relative grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-sky">Warum Dalkilic</p>
            <h2 className="display mt-4 text-[40px] md:text-[56px]">
              Schnell. Zuverlässig. <em className="text-sky">Vertrauenswürdig.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-white/70">
              Dafür loben uns unsere Kunden am häufigsten. Und dafür stehen wir – mit festen Zeiten, festen Gesichtern und
              klaren Absprachen.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["HWK Reutlingen", "Meisterbrief folgt", "Partnerbetriebe geprüft"].map((t) => (
                <span key={t} className="chip bg-white/10 text-white">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <ol className="md:col-span-7 md:col-start-6">
            {usps.map((u, i) => (
              <Reveal as="li" key={u.t} delay={i * 80} className="grid grid-cols-[56px_1fr] gap-4 border-t border-white/10 py-7">
                <span className="display text-[28px] text-sky">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[20px] font-bold">{u.t}</h3>
                  <p className="mt-2 leading-relaxed text-white/70">{u.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Ablauf ——— */}
      <section className="container-x py-24 md:py-32">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow text-royal">So läuft es ab</p>
          <h2 className="display mt-4 text-[40px] text-navy md:text-[56px]">
            In vier Schritten <em>zum gepflegten Objekt.</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <div className="card relative h-full p-7">
                <span className="display text-[44px] leading-none text-royal/20">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[20px] font-bold text-navy">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-mist">{s.d}</p>
                {i < steps.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-cloud text-royal md:flex">
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Für wen ——— */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-leaf">Für wen wir arbeiten</p>
            <h2 className="display mt-4 text-[40px] text-navy md:text-[56px]">
              Vom Privathaus bis zur <em>Hausverwaltung.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-mist">
              Besonders gern betreuen wir große Häuser und Villen, deren Eigentümer sich nicht mehr selbst um alles kümmern
              möchten – zuverlässig, diskret und mit einem festen Ansprechpartner.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-8">
            {audiences.map((a, i) => (
              <Reveal key={a.t} delay={i * 70}>
                <div className="h-full rounded-[22px] bg-cloud p-7">
                  <h3 className="text-[19px] font-bold text-navy">{a.t}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Einsatzgebiet ——— */}
      <section className="container-x grid items-center gap-12 py-24 md:grid-cols-12 md:py-32" id="einsatzgebiet">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-royal">Einsatzgebiet</p>
          <h2 className="display mt-4 text-[40px] text-navy md:text-[56px]">
            Reutlingen und <em>20 km rundherum.</em>
          </h2>
          <p className="mt-6 leading-relaxed text-mist">
            Kurze Wege, schnelle Reaktion: Wir sind in Reutlingen zu Hause und in der ganzen Region unterwegs – von
            Tübingen bis Bad Urach, von Nürtingen bis Sonnenbühl.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {areaTowns.slice(1).map((t) => (
              <li key={t.name} className="chip bg-white text-ink ring-1 ring-ink/10">
                {t.name}
              </li>
            ))}
          </ul>
          <Link href="/einsatzgebiet" className="link-underline mt-8 inline-flex items-center gap-2 font-bold text-navy">
            Mehr zum Einsatzgebiet <Arrow />
          </Link>
        </Reveal>
        <Reveal className="md:col-span-7" delay={120}>
          <div className="card p-4 md:p-6">
            <AreaMap className="w-full" />
          </div>
        </Reveal>
      </section>

      {/* ——— Kontakt-CTA ——— */}
      <section className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="grain relative overflow-hidden rounded-[28px] bg-royal text-white">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_100%,rgb(18_167_160/0.45),transparent_70%)]" />
          <div className="container-x relative grid gap-10 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-7">
              <p className="eyebrow text-white/70">Jetzt anfragen</p>
              <h2 className="display mt-4 text-[40px] md:text-[64px]">
                Kostenlose Besichtigung – <em>wir melden uns spätestens am nächsten Tag.</em>
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={`tel:${site.phoneHref}`} className="btn btn-light">
                  <Phone /> {site.phone}
                </a>
                <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-wa">
                  <WhatsApp /> WhatsApp
                </a>
                <Link href="/kontakt" className="btn btn-ghost text-white">
                  Formular & Rückruf
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-[19px] font-semibold">{site.name}</p>
              <p className="mt-1 text-white/80">{site.region}</p>
              <ul className="mt-6 space-y-3 text-white/80">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 border-b border-white/15 pb-3 text-[15px]">
                    <span>{h.day}</span>
                    <span className="text-right text-white">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] text-white/60">{site.responseNote}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
