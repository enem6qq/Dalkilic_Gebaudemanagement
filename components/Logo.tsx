import Link from "next/link";

/**
 * Platzhalter-Logo in Anlehnung an den Flyer (Wortmarke + Gebäude-Signet).
 * Sobald das Original-Logo vorliegt: Datei nach public/brand/ legen und hier
 * durch <Image> ersetzen.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="currentColor" opacity="0.1" />
      <path d="M11 38V20l9-6v24h-9Z" fill="currentColor" />
      <path d="M22 38V10l10 5v23H22Z" fill="currentColor" opacity="0.85" />
      <path d="M34 38V22l5 2v14h-5Z" fill="currentColor" opacity="0.65" />
      <rect x="25" y="17" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="29" y="17" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="25" y="23" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="29" y="23" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="25" y="29" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="29" y="29" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="14" y="24" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <rect x="14" y="30" width="2.4" height="2.4" fill="var(--color-cloud)" />
      <path d="M8 38h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 16c2-2 4-2 5 0" stroke="var(--color-leaf)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="Gebäudemanagement Dalkilic – Startseite" className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={`h-10 w-10 shrink-0 ${light ? "text-white" : "text-royal"}`} />
      <span className="flex flex-col leading-none">
        <span className={`display text-[22px] tracking-[-0.02em] ${light ? "text-white" : "text-navy"}`}>DALKILIC</span>
        <span className={`mt-1 text-[9.5px] font-bold uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-mist"}`}>
          Gebäudemanagement
        </span>
      </span>
    </Link>
  );
}
