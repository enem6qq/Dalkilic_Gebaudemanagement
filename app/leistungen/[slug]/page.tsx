import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Arrow, Check, Phone, ServiceIcon } from "@/components/Icons";
import { serviceBySlug, services, tones } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Reutlingen – ${s.short}`,
    description: `${s.intro} Kostenlose Besichtigung in Reutlingen und ${site.radiusKm} km Umkreis.`,
    alternates: { canonical: `/leistungen/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const tone = tones[s.tone];
  const others = services.filter((x) => x.id !== s.id);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <PageHero
        eyebrow={`${s.name} · Reutlingen & Umgebung`}
        tone={tone.hex}
        title={
          <>
            {s.headline[0]} <em>{s.headline[1]}</em>
          </>
        }
        text={s.intro}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/kontakt" className="btn btn-primary">
            Anfrage stellen <Arrow />
          </Link>
          <a href={`tel:${site.phoneHref}`} className="btn btn-ghost on-light text-navy">
            <Phone /> Anrufen
          </a>
        </div>
      </PageHero>

      {s.note && (
        <div className="container-x -mt-6 md:-mt-10">
          <Reveal className="rounded-[18px] border border-amber/40 bg-amber/10 px-5 py-4 text-[14.5px] leading-relaxed text-ink">
            <strong>Hinweis:</strong> {s.note}
          </Reveal>
        </div>
      )}

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: tone.hex }}>
            <ServiceIcon id={s.id} className="h-7 w-7" />
          </span>
          <h2 className="display mt-6 text-[34px] text-navy md:text-[44px]">
            Unsere Leistungen <em>im Detail.</em>
          </h2>
          <ul className="mt-8 space-y-3">
            {s.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] font-semibold text-ink">
                <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: tone.hex }}>
                  <Check className="h-3 w-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-8">
          {s.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 50}>
              <div className="card h-full p-6">
                <span className="display text-[22px]" style={{ color: tone.hex }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[18px] font-bold text-navy">{it.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mist">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow" style={{ color: tone.hex }}>
              Häufige Fragen
            </p>
            <h2 className="display mt-4 text-[34px] text-navy md:text-[44px]">
              Gut zu <em>wissen.</em>
            </h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            {s.faq.map((f, i) => (
              <Reveal as="div" key={f.q} delay={i * 60} className="border-t border-navy/10 py-6">
                <h3 className="text-[18px] font-bold text-navy">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-mist">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-royal">Passt dazu</p>
          <h2 className="display mt-4 text-[34px] text-navy md:text-[44px]">
            Weitere <em>Leistungen.</em>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.id} delay={i * 70}>
              <Link href={`/leistungen/${o.slug}`} className="card group flex h-full items-center gap-4 p-6 transition-transform hover:-translate-y-1">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: tones[o.tone].hex }}>
                  <ServiceIcon id={o.id} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-navy">{o.name}</span>
                  <span className="block text-[13.5px] text-mist">{o.short}</span>
                </span>
                <Arrow className="ml-auto text-navy transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="grain relative overflow-hidden rounded-[28px] bg-navy text-white">
          <div className="absolute inset-0" style={{ background: `radial-gradient(60% 80% at 100% 100%, ${tone.hex}55, transparent 70%)` }} />
          <div className="container-x relative flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-24">
            <div>
              <p className="eyebrow text-sky">{s.name} anfragen</p>
              <h2 className="display mt-3 max-w-[18ch] text-[34px] md:text-[52px]">
                Kostenlose Besichtigung <em className="text-sky">vor Ort.</em>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-light">
                Anfrage senden <Arrow />
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn btn-ghost text-white">
                <Phone /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
