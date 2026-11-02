import Link from "next/link";
import { tones, type Service } from "@/lib/services";
import { Arrow, ServiceIcon } from "./Icons";

export function ServiceCard({ s, big = false }: { s: Service; big?: boolean }) {
  const tone = tones[s.tone];
  return (
    <Link
      href={`/leistungen/${s.slug}`}
      className={`card group relative flex h-full flex-col overflow-hidden p-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-8 ${big ? "md:p-10" : ""}`}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.12] blur-2xl transition-transform duration-700 group-hover:scale-150" style={{ background: tone.hex }} />
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: tone.hex }}>
          <ServiceIcon id={s.id} className="h-6 w-6" />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cloud text-navy transition-all group-hover:bg-navy group-hover:text-white">
          <Arrow />
        </span>
      </div>
      <p className="eyebrow relative mt-8" style={{ color: tone.hex }}>
        {s.eyebrow}
      </p>
      <h3 className={`display relative mt-2 text-navy ${big ? "text-[34px] md:text-[44px]" : "text-[28px]"}`}>{s.name}</h3>
      <p className="relative mt-3 leading-relaxed text-mist">{big ? s.intro : s.short}</p>
      <ul className={`relative mt-6 flex flex-wrap gap-2 ${big ? "" : "mt-auto pt-6"}`}>
        {s.items.slice(0, big ? 6 : 4).map((it) => (
          <li key={it.name} className="chip bg-cloud text-[12px] text-ink">
            {it.name}
          </li>
        ))}
        {s.items.length > (big ? 6 : 4) && <li className="chip bg-cloud text-[12px] text-mist">+{s.items.length - (big ? 6 : 4)} weitere</li>}
      </ul>
    </Link>
  );
}
