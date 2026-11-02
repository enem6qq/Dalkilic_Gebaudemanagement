# DESIGN – Gebäudemanagement Dalkilic

> Phase 2 der Anleitung („Designrichtung“). Abgeleitet aus dem Flyer (Blau als Hauptfarbe, vier farbige Leistungsbereiche)
> und den Anforderungen aus dem Fragebogen (seriös, vertrauenswürdig, Google-Region Reutlingen).

## Idee

„Ein Gebäude, rundum versorgt.“ Ein ruhiges, helles Design mit einem dunkelblauen Rahmen (Vertrauen, Kompetenz) und
vier klar unterscheidbaren Leistungsfarben. Statt Stockfotos: eine Echtzeit-3D-Illustration eines gepflegten Gebäudes,
dessen Bereiche (Fenster, Eingang, Garten, Dach/Technik) die vier Leistungen zeigen. Viel Luft, große Headlines,
zurückhaltende Bewegung.

## Farbpsychologie

| Token  | Hex       | Wirkung / Einsatz                                                                 |
|--------|-----------|-----------------------------------------------------------------------------------|
| navy   | `#0B1F3A` | Tiefes Blau – Seriosität, Sicherheit, Stabilität. Dunkle Sektionen, Footer, Hero.  |
| royal  | `#1D5FD6` | Kräftiges Blau – Vertrauen, Zuverlässigkeit, Technik. Primär-Buttons, Hausmeister. |
| sky    | `#7CC4FF` | Helles Blau – Klarheit, Luft. Akzente auf dunklem Grund.                           |
| aqua   | `#12A7A0` | Türkis – Frische, Sauberkeit, Hygiene. **Gebäudereinigung** (Schwerpunkt).          |
| leaf   | `#3FA34D` | Naturgrün – Wachstum, Erholung, Natur. **Grünpflege**.                             |
| amber  | `#F0A32B` | Warmes Gelb-Orange – Energie, Licht, Wärme (ohne Aggressivität). **Elektro**.      |
| cloud  | `#F3F6FA` | Fast-Weiß – Reinheit, Ordnung. Helle Sektionen.                                    |
| ink    | `#0E1726` | Fließtext auf Hell.                                                                |
| mist   | `#5B6B80` | Sekundärtext, Linien.                                                              |

**Bewusst vermieden:** Dunkelrot/Signalrot (Aggression, Gefahr, Alarm) – passt nicht zu Pflege, Vertrauen und
Ruhe. Fehlermeldungen im Formular nutzen deshalb Amber statt Rot. Pro Sektion maximal eine Akzentfarbe.

## Typografie

- **Display:** Bricolage Grotesque (variabel) – charakterstark, modern, handwerklich. Enge Laufweite (−0.03em).
- **Text:** Manrope (variabel) – klar und sehr gut lesbar, auch auf dem Handy.
- Skala (px): 12 · 14 · 16 · 18 · 20 · 24 · 32 · 44 · 60 · 84 (per `clamp` mobil kleiner)
- Labels in Versalien, +0.16em Laufweite

## Abstände & Layout

- 4-px-Raster, Sektionen 96–160 px vertikal (mobil 64–96 px)
- Max. Breite 1280 px, Seitenrand 20 px (mobil) / 40 px
- Asymmetrische 12-Spalten-Layouts (5/7, 4/8), Bento-Raster für Leistungen statt vier gleicher Karten
- Radien: 12 px (Inputs), 22–28 px (Karten), 999 px (Buttons, Chips)

## Bewegung

- 3D-Hero: langsame Drehung (ca. 60 s pro Umdrehung), Maus-Parallaxe ±0.35, Scroll-Parallaxe
- Fenster „leuchten“ nacheinander (Elektro), Glanzpunkte an Glasflächen (Reinigung), Bäume wiegen sich leicht (Grün)
- Einblenden beim Scrollen: 800 ms, ease-out, 24 px Versatz
- `prefers-reduced-motion` wird respektiert (3D statisch, keine Einblendungen)

## Was die Seite hochwertig macht

Große, selbstbewusste Headlines; Leerraum; ein eigenes 3D-Motiv statt Stockfotos; vier klare Farben mit Bedeutung;
Vertrauen durch Fakten (HWK-Eintrag, Erreichbarkeit, kostenlose Besichtigung) statt erfundener Bewertungen.
