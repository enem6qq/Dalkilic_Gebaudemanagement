"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";
import { Phone } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  // Seiten mit dunklem Hero → Header anfangs weiß
  const darkTop = pathname === "/";
  const solid = scrolled || !darkTop;
  const light = !solid && !menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !menu ? "bg-white/85 text-ink shadow-[0_1px_0_rgb(14_23_38/0.06)] backdrop-blur-xl" : "text-white"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Logo light={light || menu} className="relative z-10" />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            {nav.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`link-underline text-[14.5px] font-semibold ${active ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={`tel:${site.phoneHref}`}
              className={`btn hidden h-11 min-h-0 px-5 text-[14px] md:inline-flex ${light || menu ? "btn-light" : "btn-primary"}`}
            >
              <Phone />
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${solid && !menu ? "hover:bg-navy/5" : "hover:bg-white/10"}`}
              aria-label={menu ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menu}
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-[2px] w-5 bg-current transition-opacity ${menu ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-navy text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-x flex h-full flex-col justify-center gap-1 overflow-y-auto pb-10 pt-24" aria-label="Mobile Navigation">
          {[{ href: "/", label: "Start" }, ...nav].map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="display border-b border-white/10 py-3 text-[32px] transition-all duration-500"
              style={{ transitionDelay: menu ? `${80 + i * 40}ms` : "0ms", opacity: menu ? 1 : 0, transform: menu ? "none" : "translateY(12px)" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((s) => (
              <Link key={s.id} href={`/leistungen/${s.slug}`} className="chip bg-white/10 text-white">
                {s.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneHref}`} className="btn btn-light">
              <Phone /> {site.phone}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-wa">
              WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">{site.hours[0].day}: {site.hours[0].time}</p>
        </nav>
      </div>
    </>
  );
}
