"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Phone, WhatsApp } from "./Icons";

/** Schwebende Schnellkontakt-Leiste (Anruf, WhatsApp, Rückruf) – erscheint nach dem Hero. */
export function FloatingContact() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 transition-all duration-500 md:bottom-6 md:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${open ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}>
        <a href={`tel:${site.phoneHref}`} className="btn btn-light h-11 min-h-0 shadow-lg">
          <Phone /> Anrufen
        </a>
        <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-wa h-11 min-h-0 shadow-lg">
          <WhatsApp /> WhatsApp
        </a>
        <Link href="/kontakt#rueckruf" className="btn btn-dark h-11 min-h-0 shadow-lg">
          Rückruf anfordern
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Schnellkontakt schließen" : "Schnellkontakt öffnen"}
        className="pulse-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-royal text-white shadow-[0_14px_30px_-10px_rgb(29_95_214/0.8)] transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <Phone className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
