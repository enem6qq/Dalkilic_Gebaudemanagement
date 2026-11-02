import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = {
  art?: string;
  name?: string;
  telefon?: string;
  email?: string;
  leistung?: string;
  objekt?: string;
  ort?: string;
  nachricht?: string;
  wunschzeit?: string;
  website?: string; // Honeypot
};

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: echte Nutzer füllen das versteckte Feld nicht aus
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const art = ["anfrage", "rueckruf", "notdienst"].includes(body.art ?? "") ? body.art! : "anfrage";
  const name = clean(body.name, 120);
  const telefon = clean(body.telefon, 60);
  const email = clean(body.email, 160);
  const nachricht = clean(body.nachricht, 4000);

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Bitte geben Sie Ihren Namen an." }, { status: 422 });
  if (!telefon && !email) return NextResponse.json({ ok: false, error: "Bitte Telefonnummer oder E-Mail angeben." }, { status: 422 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 422 });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Demo-Modus (lokal / ohne Supabase-Variablen): nichts speichern, aber dem Nutzer einen Weg anbieten
    return NextResponse.json({ ok: false, demo: true, error: "Das Formular ist noch nicht angebunden." }, { status: 503 });
  }

  const { error } = await supabase.from("anfragen").insert({
    art,
    name,
    telefon: telefon || null,
    email: email || null,
    leistung: clean(body.leistung, 60) || null,
    objekt: clean(body.objekt, 60) || null,
    ort: clean(body.ort, 120) || null,
    nachricht: nachricht || null,
    wunschzeit: clean(body.wunschzeit, 120) || null,
    quelle: "website",
  });

  if (error) {
    console.error("Supabase insert failed", error);
    return NextResponse.json({ ok: false, error: "Die Anfrage konnte nicht gespeichert werden. Bitte rufen Sie uns an." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
