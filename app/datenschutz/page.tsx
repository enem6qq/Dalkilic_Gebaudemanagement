import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutzerklärung", robots: { index: false, follow: true } };

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-8 text-[20px] font-bold text-navy">{children}</h2>;

export default function Datenschutz() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <section className="container-x pb-24">
        <div className="card max-w-[760px] p-8 leading-relaxed text-ink md:p-12">
          <H>1. Verantwortlicher</H>
          <p className="mt-3">
            {site.name}, Inhaber {site.owner}, {site.street}, {site.zip} {site.city}, Telefon {site.phone}, E-Mail {site.email}.
          </p>

          <H>2. Hosting</H>
          <p className="mt-3">
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Seite
            verarbeitet Vercel technisch notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser) in Server-Logfiles.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb). Vercel
            ist unter dem EU-US Data Privacy Framework zertifiziert; zusätzlich bestehen Standardvertragsklauseln.
          </p>

          <H>3. Kontaktformular und Rückrufservice</H>
          <p className="mt-3">
            Wenn Sie uns über das Formular kontaktieren, speichern wir Ihre Angaben (Name, Telefon, E-Mail, Ort, Leistung, Nachricht)
            zur Bearbeitung Ihrer Anfrage. Die Daten werden in einer Datenbank bei Supabase Inc. (Rechenzentrum in der EU, Region
            Frankfurt) gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung). Die Daten werden gelöscht,
            sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>

          <H>4. Kontakt per Telefon, E-Mail oder WhatsApp</H>
          <p className="mt-3">
            Bei Kontaktaufnahme per Telefon oder E-Mail verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b
            DSGVO). Wenn Sie uns über WhatsApp schreiben, gelten zusätzlich die Datenschutzbestimmungen von WhatsApp Ireland Ltd.;
            dabei können Daten in Drittländer übertragen werden. Die Nutzung von WhatsApp ist freiwillig.
          </p>

          <H>5. Keine Cookies, kein Tracking</H>
          <p className="mt-3">
            Diese Website setzt keine Tracking-Cookies ein und nutzt keine Analyse- oder Werbedienste. Schriften werden lokal vom
            eigenen Server geladen; es werden keine Verbindungen zu Google Fonts aufgebaut.
          </p>

          <H>6. Ihre Rechte</H>
          <p className="mt-3">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
            Widerspruch (Art. 15–21 DSGVO) sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde, z. B. dem Landesbeauftragten für
            den Datenschutz und die Informationsfreiheit Baden-Württemberg.
          </p>

          <p className="mt-8 rounded-[14px] bg-amber/10 p-4 text-[13.5px] text-ink">
            Hinweis für den Betreiber: Diese Erklärung ist eine Vorlage für den aktuellen technischen Stand (Vercel, Supabase, kein
            Tracking). Bitte vor Veröffentlichung juristisch prüfen lassen und bei neuen Diensten ergänzen.
          </p>
        </div>
      </section>
    </>
  );
}
