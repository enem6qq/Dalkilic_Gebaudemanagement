// Stammdaten aus dem ausgefüllten Fragebogen. Alles, was mit "TODO" markiert ist,
// lag noch nicht vor und muss vor dem Livegang ergänzt werden.

export const site = {
  name: "Gebäudemanagement Dalkilic",
  shortName: "Dalkilic",
  claim: "Ihr zuverlässiger Partner für Immobilienpflege & Technik",
  legalForm: "Einzelunternehmen",
  owner: "Ömer Dalkilic", // TODO: vollständigen Namen des Inhabers bestätigen
  founded: 2026,
  foundedDate: "01.10.2026",
  // TODO: Geschäftsadresse ergänzen (Pflichtangabe im Impressum)
  street: "Musterstraße 1",
  zip: "72764",
  city: "Reutlingen",
  region: "Reutlingen und Umkreis von 20 km",
  phone: "0179 7069679",
  phoneHref: "+491797069679",
  whatsapp: "https://wa.me/491797069679",
  // TODO: E-Mail-Adresse wird noch angelegt – laut Fragebogen "dalkilic@info.de"; hier die
  // zur Domain passende Adresse eingetragen. Bitte anpassen, sobald das Postfach existiert.
  email: "info@dalkilic-gruppe.de",
  domain: "www.dalkilic-gruppe.de",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dalkilic-gruppe.de",
  hours: [
    { day: "Montag – Samstag", time: "09:00 – 18:00 Uhr" },
    { day: "Sonntag", time: "Notdienst / Rufbereitschaft" },
  ],
  responseNote: "Anfragen nach 18:00 Uhr beantworten wir am nächsten Tag.",
  hwk: "Handwerkskammer Reutlingen",
  radiusKm: 20,
};

export const nav = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/einsatzgebiet", label: "Einsatzgebiet" },
  { href: "/kontakt", label: "Kontakt" },
];

// Orte im Einsatzgebiet (Reutlingen + ca. 20 km). Winkel/Entfernung dienen nur der
// stilisierten Karte auf der Seite – keine exakten Geodaten.
export const areaTowns: { name: string; km: number; deg: number }[] = [
  { name: "Reutlingen", km: 0, deg: 0 },
  { name: "Pfullingen", km: 6, deg: 205 },
  { name: "Eningen u. A.", km: 7, deg: 125 },
  { name: "Wannweil", km: 6, deg: 300 },
  { name: "Kirchentellinsfurt", km: 7, deg: 320 },
  { name: "Metzingen", km: 9, deg: 60 },
  { name: "Kusterdingen", km: 8, deg: 275 },
  { name: "Lichtenstein", km: 11, deg: 168 },
  { name: "Pliezhausen", km: 10, deg: 20 },
  { name: "Walddorfhäslach", km: 11, deg: 345 },
  { name: "Dettingen a. d. Erms", km: 12, deg: 85 },
  { name: "Tübingen", km: 13, deg: 260 },
  { name: "Sonnenbühl", km: 14, deg: 195 },
  { name: "Mössingen", km: 15, deg: 230 },
  { name: "Bad Urach", km: 17, deg: 95 },
  { name: "Neckartenzlingen", km: 15, deg: 25 },
  { name: "Nürtingen", km: 19, deg: 35 },
  { name: "Engstingen", km: 18, deg: 150 },
];
