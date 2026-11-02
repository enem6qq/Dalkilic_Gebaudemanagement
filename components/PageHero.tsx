import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  text,
  tone = "#1d5fd6",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  tone?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.12] blur-3xl" style={{ background: tone }} />
      <div className="container-x relative grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-8">
          <p className="eyebrow" style={{ color: tone }}>
            {eyebrow}
          </p>
          <h1 className="display mt-5 text-[44px] text-navy sm:text-[56px] md:text-[76px]">{title}</h1>
        </Reveal>
        {(text || children) && (
          <Reveal className="md:col-span-4" delay={120}>
            {text && <p className="text-[17px] leading-relaxed text-mist md:text-[18px]">{text}</p>}
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
