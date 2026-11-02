"use client";

import Link from "next/link";
import { useState } from "react";
import { services, tones, type ServiceId } from "@/lib/services";
import { Arrow, ServiceIcon } from "./Icons";

/**
 * Interaktiver Gebäudeschnitt: Klick/Hover auf einen Bereich zeigt die passende Leistung.
 * Reines SVG – schnell, barrierearm, funktioniert auch ohne WebGL.
 */
export function BuildingExplorer() {
  const [active, setActive] = useState<ServiceId>("gebaeudereinigung");
  const s = services.find((x) => x.id === active)!;
  const tone = tones[s.tone];
  const is = (id: ServiceId) => active === id;
  const zoneCls = (id: ServiceId) => `cursor-pointer transition-all duration-300 ${is(id) ? "opacity-100" : "opacity-50 hover:opacity-80"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <svg viewBox="0 0 640 420" className="w-full" role="group" aria-label="Gebäude mit vier Leistungsbereichen">
          <defs>
            <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#dff0ff" />
              <stop offset="1" stopColor="#f3f6fa" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="640" height="420" rx="28" fill="url(#skyg)" />

          {/* Boden */}
          <rect x="0" y="340" width="640" height="80" fill="#e6ebf1" />
          <rect x="0" y="340" width="640" height="4" fill="#cfd7e1" />

          {/* Garten – Grünpflege */}
          <g className={zoneCls("gruenpflege")} onClick={() => setActive("gruenpflege")} onMouseEnter={() => setActive("gruenpflege")} tabIndex={0} onFocus={() => setActive("gruenpflege")} role="button" aria-label="Grünpflege">
            <rect x="24" y="318" width="190" height="26" rx="6" fill={is("gruenpflege") ? "#3fa34d" : "#7cc07f"} />
            <rect x="440" y="318" width="176" height="26" rx="6" fill={is("gruenpflege") ? "#3fa34d" : "#7cc07f"} />
            {/* Hecke */}
            {[40, 70, 100, 130, 160].map((x) => (
              <rect key={x} x={x} y="296" width="26" height="26" rx="6" fill={is("gruenpflege") ? "#2f8f3d" : "#6fb374"} />
            ))}
            {/* Baum */}
            <rect x="520" y="250" width="10" height="72" fill="#7a5533" />
            <circle cx="525" cy="236" r="38" fill={is("gruenpflege") ? "#3fa34d" : "#86c389"} />
            <circle cx="550" cy="256" r="26" fill={is("gruenpflege") ? "#58b85f" : "#9ccf9e"} />
            <circle cx="498" cy="258" r="24" fill={is("gruenpflege") ? "#35944a" : "#7dbb81"} />
            {is("gruenpflege") && <circle cx="525" cy="300" r="12" fill="none" stroke="#3fa34d" strokeWidth="3" className="animate-ping" style={{ transformOrigin: "525px 300px" }} />}
          </g>

          {/* Gebäude Korpus */}
          <rect x="230" y="110" width="200" height="232" fill="#fdfdfe" stroke="#cfd7e1" strokeWidth="2" />
          <rect x="230" y="110" width="200" height="8" fill="#c8d0da" />
          {[180, 250].map((y) => (
            <rect key={y} x="230" y={y} width="200" height="3" fill="#dfe6ef" />
          ))}

          {/* Dach & Technik – Elektro */}
          <g className={zoneCls("elektro")} onClick={() => setActive("elektro")} onMouseEnter={() => setActive("elektro")} tabIndex={0} onFocus={() => setActive("elektro")} role="button" aria-label="Elektro">
            <rect x="222" y="100" width="216" height="12" rx="3" fill={is("elektro") ? "#f0a32b" : "#c8d0da"} />
            <rect x="250" y="72" width="40" height="28" rx="3" fill={is("elektro") ? "#f0a32b" : "#dfe6ef"} stroke="#9aa5b4" />
            <rect x="305" y="78" width="80" height="22" rx="3" fill={is("elektro") ? "#163a6e" : "#9aa5b4"} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={312 + i * 25} y="82" width="18" height="14" fill="#2f5c9c" opacity="0.6" />
            ))}
            <rect x="404" y="52" width="3" height="48" fill="#9aa5b4" />
            <path d="M398 56l5-8 5 8" fill="none" stroke="#9aa5b4" strokeWidth="2" />
            {is("elektro") && (
              <path d="M270 36l-10 18h9l-6 16 16-22h-9l6-12z" fill="#f0a32b" />
            )}
          </g>

          {/* Fenster – Gebäudereinigung */}
          <g className={zoneCls("gebaeudereinigung")} onClick={() => setActive("gebaeudereinigung")} onMouseEnter={() => setActive("gebaeudereinigung")} tabIndex={0} onFocus={() => setActive("gebaeudereinigung")} role="button" aria-label="Gebäudereinigung">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => {
                if (r === 2 && c === 2) return null;
                const x = 248 + c * 60;
                const y = 128 + r * 70;
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={x} y={y} width="44" height="48" rx="3" fill={is("gebaeudereinigung") ? "#8ed6ff" : "#bfe0fb"} stroke="#1e2a3a" strokeWidth="2" />
                    <path d={`M${x + 4} ${y + 40} L${x + 26} ${y + 6}`} stroke="#ffffff" strokeWidth="5" opacity={is("gebaeudereinigung") ? 0.9 : 0.5} strokeLinecap="round" />
                    {is("gebaeudereinigung") && <path d={`M${x + 34} ${y + 12} l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z`} fill="#ffffff" />}
                  </g>
                );
              }),
            )}
          </g>

          {/* Eingang – Hausmeister */}
          <g className={zoneCls("hausmeisterservice")} onClick={() => setActive("hausmeisterservice")} onMouseEnter={() => setActive("hausmeisterservice")} tabIndex={0} onFocus={() => setActive("hausmeisterservice")} role="button" aria-label="Hausmeisterservice">
            <rect x="366" y="268" width="48" height="74" rx="3" fill={is("hausmeisterservice") ? "#1d5fd6" : "#5f8fe0"} />
            <circle cx="404" cy="306" r="3" fill="#ffffff" />
            <rect x="356" y="258" width="68" height="8" rx="2" fill="#1e2a3a" />
            <rect x="366" y="342" width="48" height="6" fill="#cfd7e1" />
            {/* Mülltonnen */}
            <rect x="450" y="306" width="18" height="36" rx="3" fill={is("hausmeisterservice") ? "#2f4a66" : "#8a9bb0"} />
            <rect x="472" y="306" width="18" height="36" rx="3" fill={is("hausmeisterservice") ? "#5a7a3a" : "#a2b19a"} />
            {/* Leuchte */}
            <circle cx="430" cy="266" r="5" fill={is("hausmeisterservice") ? "#ffd98a" : "#dfe6ef"} />
            {is("hausmeisterservice") && <circle cx="430" cy="266" r="14" fill="#ffd98a" opacity="0.3" />}
          </g>
        </svg>
        <div className="mt-4 flex flex-wrap gap-2">
          {services.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setActive(x.id)}
              className={`chip transition-colors ${is(x.id) ? "text-white" : "bg-white text-ink ring-1 ring-ink/10 hover:bg-cloud"}`}
              style={is(x.id) ? { background: tones[x.tone].hex } : undefined}
              aria-pressed={is(x.id)}
            >
              <ServiceIcon id={x.id} className="h-3.5 w-3.5" /> {x.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card relative flex flex-col p-7 md:p-9 lg:col-span-5" key={s.id}>
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: tone.hex }}>
            <ServiceIcon id={s.id} className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow" style={{ color: tone.hex }}>
              {s.zone}
            </p>
            <h3 className="display text-[26px] text-navy">{s.name}</h3>
          </div>
        </div>
        <p className="mt-5 leading-relaxed text-mist">{s.intro}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {s.items.slice(0, 6).map((it) => (
            <li key={it.name} className="flex items-start gap-2 text-[14.5px] font-semibold text-ink">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tone.hex }} />
              {it.name}
            </li>
          ))}
        </ul>
        <Link href={`/leistungen/${s.slug}`} className="btn btn-dark mt-8 self-start">
          Alle Leistungen: {s.name} <Arrow />
        </Link>
      </div>
    </div>
  );
}
