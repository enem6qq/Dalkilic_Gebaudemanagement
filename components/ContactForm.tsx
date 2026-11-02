"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Arrow, Phone, WhatsApp } from "./Icons";

type Mode = "anfrage" | "rueckruf";

export function ContactForm({ mode = "anfrage" }: { mode?: Mode }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "demo" | "error">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    telefon: "",
    email: "",
    leistung: "",
    objekt: "Privathaus / Villa",
    ort: "",
    nachricht: "",
    wunschzeit: "",
    website: "",
  });
  const up = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailBody = encodeURIComponent(
    `${mode === "rueckruf" ? "Bitte um Rückruf" : "Anfrage"}\n\nName: ${form.name}\nTelefon: ${form.telefon}\nE-Mail: ${form.email}\nLeistung: ${form.leistung}\nObjekt: ${form.objekt}\nOrt: ${form.ort}\nWunschzeit: ${form.wunschzeit}\n\n${form.nachricht}`,
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, art: mode }),
      });
      const data = (await res.json()) as { ok: boolean; demo?: boolean; error?: string };
      if (data.ok) setState("ok");
      else if (data.demo) setState("demo");
      else {
        setError(data.error ?? "Etwas ist schiefgelaufen.");
        setState("error");
      }
    } catch {
      setError("Keine Verbindung. Bitte versuchen Sie es erneut oder rufen Sie uns an.");
      setState("error");
    }
  }

  if (state === "ok" || state === "demo") {
    return (
      <div className="card p-8 md:p-12" role="status">
        <p className="display text-[32px] text-navy">Vielen Dank, {form.name.split(" ")[0] || "bis bald"}!</p>
        {state === "ok" ? (
          <p className="mt-3 leading-relaxed text-mist">
            {mode === "rueckruf" ? "Wir rufen Sie zurück" : "Ihre Anfrage ist bei uns eingegangen"} – spätestens am nächsten Tag. Bei dringenden
            Störungen erreichen Sie uns jederzeit telefonisch.
          </p>
        ) : (
          <p className="mt-3 leading-relaxed text-mist">
            Das Formular ist auf dieser Testversion noch nicht angebunden. Schicken Sie uns Ihre Anfrage gern direkt per E-Mail oder
            WhatsApp – wir melden uns spätestens am nächsten Tag.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {state === "demo" && (
            <a className="btn btn-dark" href={`mailto:${site.email}?subject=${encodeURIComponent("Anfrage über die Website")}&body=${mailBody}`}>
              Als E-Mail öffnen
            </a>
          )}
          <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-wa">
            <WhatsApp /> WhatsApp
          </a>
          <a href={`tel:${site.phoneHref}`} className="btn btn-ghost on-light text-navy">
            <Phone /> {site.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="card grid gap-4 p-6 md:grid-cols-2 md:p-10" onSubmit={submit} noValidate>
      <label className="block">
        <span className="text-[14px] font-semibold">Name *</span>
        <input required className="input mt-1.5" value={form.name} onChange={up("name")} autoComplete="name" />
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">Telefon {mode === "rueckruf" ? "*" : ""}</span>
        <input required={mode === "rueckruf"} type="tel" className="input mt-1.5" value={form.telefon} onChange={up("telefon")} autoComplete="tel" />
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">E-Mail {mode === "anfrage" ? "*" : "(optional)"}</span>
        <input required={mode === "anfrage"} type="email" className="input mt-1.5" value={form.email} onChange={up("email")} autoComplete="email" />
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">Ort des Objekts</span>
        <input className="input mt-1.5" value={form.ort} onChange={up("ort")} placeholder="z. B. Reutlingen" autoComplete="address-level2" />
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">Leistung</span>
        <select className="input mt-1.5" value={form.leistung} onChange={up("leistung")}>
          <option value="">Bitte wählen</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
          <option value="mehrere">Mehrere Bereiche / Rundum-Betreuung</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">Art des Objekts</span>
        <select className="input mt-1.5" value={form.objekt} onChange={up("objekt")}>
          {["Privathaus / Villa", "Wohnung", "Mehrfamilienhaus", "Büro / Praxis", "Gewerbefläche / Halle", "Sonstiges"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      {mode === "rueckruf" ? (
        <label className="block md:col-span-2">
          <span className="text-[14px] font-semibold">Wann passt es Ihnen?</span>
          <input className="input mt-1.5" value={form.wunschzeit} onChange={up("wunschzeit")} placeholder="z. B. morgen Vormittag" />
        </label>
      ) : (
        <label className="block md:col-span-2">
          <span className="text-[14px] font-semibold">Nachricht</span>
          <textarea rows={5} className="input mt-1.5 resize-y" value={form.nachricht} onChange={up("nachricht")} placeholder="Erzählen Sie uns kurz, worum es geht – z. B. Objektgröße, gewünschter Rhythmus, Besonderheiten." />
        </label>
      )}
      {/* Honeypot – für Menschen unsichtbar */}
      <input tabIndex={-1} autoComplete="off" value={form.website} onChange={up("website")} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

      {state === "error" && (
        <p className="rounded-[12px] border border-amber/50 bg-amber/10 px-4 py-3 text-[14px] text-ink md:col-span-2" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[48ch] text-[12.5px] leading-relaxed text-mist">
          Mit dem Absenden stimmen Sie zu, dass wir Ihre Angaben zur Bearbeitung der Anfrage speichern. Details in der{" "}
          <a href="/datenschutz" className="underline underline-offset-2">
            Datenschutzerklärung
          </a>
          .
        </p>
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Wird gesendet …" : mode === "rueckruf" ? "Rückruf anfordern" : "Anfrage senden"}
          <Arrow />
        </button>
      </div>
    </form>
  );
}
