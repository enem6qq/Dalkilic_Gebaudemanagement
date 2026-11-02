import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-navy text-white">
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="display mt-8 max-w-[20ch] text-[30px] leading-tight md:text-[34px]">
            Ihr Gebäude. <em className="text-sky">In guten Händen.</em>
          </p>
          <p className="mt-5 max-w-[42ch] text-[14.5px] leading-relaxed text-white/65">
            Gebäudereinigung, Hausmeisterservice, Grünpflege und Elektro für Privathäuser, Büros und Gewerbe in Reutlingen und
            Umgebung. Eingetragen bei der {site.hwk}.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-sky">Kontakt</p>
          <address className="mt-4 not-italic leading-relaxed text-white/80">
            {site.name}
            <br />
            {site.street}
            <br />
            {site.zip} {site.city}
          </address>
          <p className="mt-4 text-white/80">
            <a href={`tel:${site.phoneHref}`} className="link-underline font-semibold text-white">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="link-underline break-all">
              {site.email}
            </a>
            <br />
            <a href={site.whatsapp} target="_blank" rel="noopener" className="link-underline">
              WhatsApp schreiben
            </a>
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-sky">Erreichbar</p>
          <ul className="mt-4 space-y-2 text-[14px] text-white/80">
            {site.hours.map((h) => (
              <li key={h.day}>
                <span className="block font-semibold text-white">{h.day}</span>
                {h.time}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12.5px] leading-relaxed text-white/50">{site.responseNote}</p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-sky">Seiten</p>
          <ul className="mt-4 space-y-2 text-[14px] text-white/80">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/leistungen/${s.slug}`} className="link-underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[12.5px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.founded} {site.name} · Inhaber {site.owner} · {site.legalForm}
          </p>
          <p className="flex gap-4 md:text-right">
            <Link href="/impressum" className="underline underline-offset-4 hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="underline underline-offset-4 hover:text-white">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
