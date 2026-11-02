import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AreaMap } from "@/components/AreaMap";
import { Arrow, Phone } from "@/components/Icons";
import { areaTowns, site } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Einsatzgebiet – Reutlingen, Tübingen, Metzingen, Pfullingen und Umgebung",
  description:
    "Gebäudemanagement Dalkilic ist in Reutlingen und im Umkreis von 20 km im Einsatz: Pfullingen, Eningen, Metzingen, Tübingen, Bad Urach, Mössingen, Nürtingen und mehr.",
  alternates: { canonical: "/einsatzgebiet" },
};

export default function Einsatzgebiet() {
  return (
    <>
      <PageHero
        eyebrow="Einsatzgebiet"
        title={
          <>
            Reutlingen und <em>20 Kilometer rundherum.</em>
          </>
        }
        text="Kurze Wege sind für uns Teil der Zuverlässigkeit: Wir sind in Reutlingen zu Hause und in der ganzen Region schnell vor Ort – auch für Notdienst und Rufbereitschaft."
      />

      <section className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <Reveal className="md:col-span-7">
          <div className="card p-4 md:p-6">
            <AreaMap className="w-full" />
          </div>
        </Reveal>
        <Reveal className="md:col-span-5" delay={100}>
          <p className="eyebrow text-royal">Orte, in denen wir arbeiten</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {areaTowns.map((t) => (
              <li key={t.name} className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-royal" />
                {t.name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] leading-relaxed text-mist">
            Ihr Ort fehlt? Fragen Sie einfach an – im Umkreis von {site.radiusKm} km um Reutlingen sind wir in der Regel
            ohne Anfahrtspauschale unterwegs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-primary">
              Anfrage stellen <Arrow />
            </Link>
            <a href={`tel:${site.phoneHref}`} className="btn btn-ghost on-light text-navy">
              <Phone /> {site.phone}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-[640px]">
            <p className="eyebrow text-aqua">In der ganzen Region</p>
            <h2 className="display mt-4 text-[36px] text-navy md:text-[52px]">
              Alle Leistungen, <em>überall im Einsatzgebiet.</em>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <Link href={`/leistungen/${s.slug}`} className="group block h-full rounded-[22px] bg-cloud p-6 transition-colors hover:bg-navy hover:text-white">
                  <p className="font-bold">{s.name}</p>
                  <p className="mt-1 text-[14px] opacity-70">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold">
                    Mehr erfahren <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
