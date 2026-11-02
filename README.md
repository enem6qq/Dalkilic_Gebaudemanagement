# Gebäudemanagement Dalkilic – Webseite

Webseite für **Gebäudemanagement Dalkilic** (Reutlingen): Gebäudereinigung, Hausmeisterservice, Grünpflege und Elektro.
Gebaut mit Next.js 16, Tailwind CSS 4 und React Three Fiber (Echtzeit-3D-Hero). Hosting auf **Vercel**, Anfragen in **Supabase**.

## Seiten

| Seite | Inhalt |
|---|---|
| `/` | Startseite: 3D-Gebäude mit anklickbaren Leistungsbereichen, Leistungen (Bento), interaktiver Gebäude-Explorer, Warum Dalkilic, Ablauf, Zielgruppen, Einsatzgebiet-Karte, Kontakt-CTA |
| `/leistungen` | Übersicht aller vier Bereiche mit allen Einzelleistungen |
| `/leistungen/gebaeudereinigung`, `/hausmeisterservice`, `/gruenpflege`, `/elektro` | Detailseiten mit Leistungen, Vorteilen, FAQ (inkl. FAQ-Schema für Google) |
| `/ueber-uns` | Unternehmen, Werte, Qualifikation |
| `/einsatzgebiet` | Stilisierte Umkreis-Karte (Reutlingen + 20 km) mit Ortsliste |
| `/kontakt` | Kontaktdaten, Notdienst-Hinweis, Formular „Anfrage“ / „Rückruf anfordern“ (→ Supabase) |
| `/impressum`, `/datenschutz` | Rechtliches (Vorlagen – bitte ergänzen/prüfen) |

Grundlage: `docs/BRIEF.md` (Inhalte aus dem Fragebogen) und `docs/DESIGN.md` (Farben, Typografie, Bewegung).

## Lokal starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen. Ohne Supabase-Variablen läuft das Formular im Demo-Modus (zeigt E-Mail/WhatsApp als Alternative).

## Supabase einrichten (Anfragen speichern)

1. In Supabase ein Projekt anlegen (Region **Frankfurt** für DSGVO).
2. `supabase/schema.sql` im SQL-Editor ausführen → Tabelle `anfragen` (RLS aktiv, nur Server-Zugriff).
3. In Vercel unter **Settings → Environment Variables** eintragen (siehe `.env.example`):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (nur serverseitig, niemals `NEXT_PUBLIC_`)
   - `NEXT_PUBLIC_SITE_URL` = `https://www.dalkilic-gruppe.de`
4. Neue Anfragen erscheinen in Supabase unter **Table Editor → anfragen**. Dort kann der Status (`neu`, `in_bearbeitung`, `erledigt`, `spam`) und eine interne Notiz gepflegt werden.

## Auf Vercel veröffentlichen

1. https://vercel.com → **Add New → Project** → dieses Repository importieren.
2. Framework wird automatisch erkannt (Next.js). Umgebungsvariablen wie oben setzen → **Deploy**.
3. Eigene Domain `dalkilic-gruppe.de` unter **Settings → Domains** verbinden.

Jeder Push auf den Haupt-Branch aktualisiert die Seite automatisch.

## Inhalte pflegen

- **Stammdaten** (Telefon, E-Mail, Adresse, Zeiten): `lib/site.ts`
- **Leistungen, Texte, FAQ, USPs, Ablauf**: `lib/services.ts`
- **Orte im Einsatzgebiet**: `lib/site.ts` (`areaTowns`)
- **Logo**: Platzhalter in `components/Logo.tsx` – Original-Logo nach `public/brand/` legen und dort einbinden

## Vor dem Livegang

- [ ] Geschäftsadresse in `lib/site.ts` und Handwerksrollen-Nr. im Impressum ergänzen
- [ ] E-Mail-Postfach anlegen und in `lib/site.ts` eintragen
- [ ] Original-Logo einbinden
- [ ] Datenschutzerklärung prüfen lassen
- [ ] Supabase-Variablen in Vercel setzen und Formular testen
