import { areaTowns, site } from "@/lib/site";

/** Stilisierte Umkreis-Karte: Reutlingen in der Mitte, Orte im 20-km-Radius. */
export function AreaMap({ className = "" }: { className?: string }) {
  const R = 300;
  const cx = 360;
  const cy = 320;
  const scale = R / site.radiusKm;
  const pt = (km: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return { x: cx + Math.cos(a) * km * scale, y: cy + Math.sin(a) * km * scale * 0.82 };
  };
  return (
    <svg viewBox="0 0 720 640" className={className} role="img" aria-label={`Einsatzgebiet: ${site.region}`}>
      <defs>
        <radialGradient id="areag" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#1d5fd6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#1d5fd6" stopOpacity="0.02" />
        </radialGradient>
      </defs>
      {[20, 15, 10, 5].map((km) => (
        <ellipse key={km} cx={cx} cy={cy} rx={km * scale} ry={km * scale * 0.82} fill={km === 20 ? "url(#areag)" : "none"} stroke="#1d5fd6" strokeOpacity={km === 20 ? 0.5 : 0.18} strokeDasharray={km === 20 ? undefined : "4 6"} />
      ))}
      <text x={cx + 20 * scale - 6} y={cy - 8} fontSize="11" fill="#1d5fd6" textAnchor="end" fontWeight="700" letterSpacing="0.1em">
        20 KM
      </text>
      {areaTowns
        .filter((t) => t.km > 0)
        .map((t) => {
          const p = pt(t.km, t.deg);
          return (
            <g key={t.name}>
              <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#1d5fd6" strokeWidth="2" />
              <text x={p.x} y={p.y - 10} fontSize="12" fill="#0e1726" textAnchor="middle" fontWeight="600">
                {t.name}
              </text>
            </g>
          );
        })}
      <g>
        <circle cx={cx} cy={cy} r="22" fill="#1d5fd6" opacity="0.15" />
        <circle cx={cx} cy={cy} r="9" fill="#1d5fd6" stroke="#ffffff" strokeWidth="3" />
        <text x={cx} y={cy + 36} fontSize="15" fill="#0b1f3a" textAnchor="middle" fontWeight="800">
          Reutlingen
        </text>
      </g>
    </svg>
  );
}
