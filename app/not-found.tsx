import Link from "next/link";
import { Arrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-28">
      <p className="eyebrow text-royal">404</p>
      <h1 className="display mt-4 text-[44px] text-navy md:text-[72px]">
        Diese Seite <em>gibt es nicht.</em>
      </h1>
      <p className="mt-5 max-w-[46ch] text-mist">Vielleicht hat sich der Link geändert. Auf der Startseite finden Sie alle Leistungen und Kontaktmöglichkeiten.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Zur Startseite <Arrow />
      </Link>
    </section>
  );
}
