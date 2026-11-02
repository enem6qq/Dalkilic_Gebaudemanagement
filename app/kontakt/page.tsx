import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactTabs } from "@/components/ContactTabs";
import { Clock, Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt – Anfrage, Rückruf, WhatsApp",
  description: `Kontakt zu Gebäudemanagement Dalkilic in Reutlingen: ${site.phone}, WhatsApp, Kontaktformular und Rückrufservice. Kostenlose Besichtigung vor Ort.`,
  alternates: { canonical: "/kontakt" },
};

export default function Kontakt() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Sprechen wir über <em>Ihr Gebäude.</em>
          </>
        }
        text="Anrufen, per WhatsApp schreiben, Formular ausfüllen oder Rückruf anfordern – wie es Ihnen am liebsten ist. Wir melden uns spätestens am nächsten Tag."
      />

      <section className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24" id="rueckruf">
        <Reveal className="md:col-span-4">
          <div className="card space-y-6 bg-navy p-7 text-white md:p-8">
            <a href={`tel:${site.phoneHref}`} className="group flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sky">
                <Phone />
              </span>
              <span>
                <span className="eyebrow block text-white/60">Telefon</span>
                <span className="link-underline text-[20px] font-bold">{site.phone}</span>
              </span>
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#25d366]">
                <WhatsApp />
              </span>
              <span>
                <span className="eyebrow block text-white/60">WhatsApp</span>
                <span className="link-underline font-bold">Nachricht schreiben</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sky">
                <Mail />
              </span>
              <span>
                <span className="eyebrow block text-white/60">E-Mail</span>
                <span className="link-underline break-all font-bold">{site.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sky">
                <Clock />
              </span>
              <span>
                <span className="eyebrow block text-white/60">Erreichbar</span>
                {site.hours.map((h) => (
                  <span key={h.day} className="block text-[15px]">
                    <span className="font-bold">{h.day}:</span> {h.time}
                  </span>
                ))}
                <span className="mt-1 block text-[13px] text-white/60">{site.responseNote}</span>
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sky">
                <Pin />
              </span>
              <span>
                <span className="eyebrow block text-white/60">Einsatzgebiet</span>
                <span className="block text-[15px]">{site.region}</span>
              </span>
            </div>
          </div>
          <div className="mt-4 rounded-[22px] border border-amber/40 bg-amber/10 p-5">
            <p className="eyebrow text-amber">Notdienst</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink">
              Wasserschaden, Stromausfall, Sturmschaden? Für dringende Fälle haben wir eine Rufbereitschaft – rufen Sie uns an.
            </p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-8" delay={100}>
          <ContactTabs />
        </Reveal>
      </section>
    </>
  );
}
