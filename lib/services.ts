export type ServiceId = "gebaeudereinigung" | "hausmeisterservice" | "gruenpflege" | "elektro";

export type Service = {
  id: ServiceId;
  slug: string;
  name: string;
  short: string;
  /** Farb-Token aus globals.css */
  tone: "aqua" | "royal" | "leaf" | "amber";
  eyebrow: string;
  headline: [string, string]; // [normal, betont]
  intro: string;
  items: { name: string; text: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
  note?: string;
  /** Hotspot im 3D-Gebäude / Explorer */
  zone: string;
};

export const services: Service[] = [
  {
    id: "gebaeudereinigung",
    slug: "gebaeudereinigung",
    name: "Gebäudereinigung",
    short: "Unterhalts-, Glas- & Sonderreinigung",
    tone: "aqua",
    eyebrow: "Unser Schwerpunkt",
    headline: ["Sauberkeit, die man", "spürt."],
    intro:
      "Von der regelmäßigen Unterhaltsreinigung bis zur Grundreinigung nach dem Umbau: Unsere Gebäudereiniger arbeiten gründlich, diskret und mit festen Ansprechpartnern – damit Ihr Objekt jeden Tag einen guten Eindruck macht.",
    zone: "Fenster & Treppenhaus",
    items: [
      { name: "Unterhaltsreinigung", text: "Regelmäßige Reinigung von Büros, Praxen, Treppenhäusern und Wohnungen – nach festem Plan, mit festen Zeiten." },
      { name: "Treppenhausreinigung", text: "Saubere Treppen, Handläufe, Fenster und Eingangsbereiche für Mehrfamilienhäuser und Hausverwaltungen." },
      { name: "Glas- & Fensterreinigung", text: "Streifenfreie Fenster, Glasfassaden und Wintergärten – innen und außen." },
      { name: "Grund- & Bauendreinigung", text: "Nach Renovierung oder Umbau: Staub, Kleberreste und Baudreck verschwinden, das Objekt ist bezugsfertig." },
      { name: "Fassadenreinigung", text: "Schonende Reinigung von Putz, Klinker und Verkleidungen – ohne die Oberfläche anzugreifen." },
      { name: "PVC-Beschichtung", text: "Reinigung und Neubeschichtung von PVC- und Linoleumböden für Glanz und längere Haltbarkeit." },
      { name: "Teppich- & Polsterreinigung", text: "Tiefenreinigung von Teppichböden und Polstern mit professioneller Sprühextraktion." },
      { name: "Rollladen- & Jalousienreinigung", text: "Rollläden, Raffstores und Jalousien wieder sauber – ohne Ausbau." },
      { name: "Industriereinigung", text: "Hallen, Werkstätten und Produktionsflächen – auch außerhalb der Betriebszeiten." },
      { name: "Sonder- & Tatortreinigung", text: "Diskrete, fachgerechte Reinigung in besonderen Situationen – inklusive Desinfektion und Geruchsbeseitigung." },
    ],
    benefits: ["Feste Ansprechpartner & feste Zeiten", "Umweltschonende Reinigungsmittel", "Auch abends, am Wochenende und außerhalb der Geschäftszeiten", "Betreuungsvertrag oder Einzelauftrag"],
    faq: [
      { q: "Wie oft sollte ein Treppenhaus gereinigt werden?", a: "Bei Mehrfamilienhäusern empfehlen wir wöchentlich oder 14-tägig. Wir schauen uns das Objekt kostenlos an und schlagen Ihnen einen passenden Rhythmus vor." },
      { q: "Bringen Sie Reinigungsmittel und Geräte mit?", a: "Ja. Wir arbeiten mit eigenen, professionellen Geräten und umweltschonenden Mitteln. Sie müssen nichts bereitstellen." },
      { q: "Reinigen Sie auch einmalig, z. B. nach einem Umzug?", a: "Selbstverständlich. Grund-, Bauend- und Umzugsreinigungen bieten wir auch als Einzelauftrag an." },
    ],
  },
  {
    id: "hausmeisterservice",
    slug: "hausmeisterservice",
    name: "Hausmeisterservice",
    short: "Instandhaltung & Objektbetreuung",
    tone: "royal",
    eyebrow: "Alles aus einer Hand",
    headline: ["Ein Ansprechpartner", "für Ihr Objekt."],
    intro:
      "Unser Hausmeisterservice hält Ihr Gebäude in Schuss: regelmäßige Kontrollgänge, Kleinreparaturen, Mülltonnen- und Winterdienst. Für Mieter und Verwaltung sind wir der verlässliche Ansprechpartner vor Ort.",
    zone: "Eingang & Technik",
    items: [
      { name: "Regelmäßige Kontrollgänge", text: "Wir prüfen Beleuchtung, Türen, Aufzugsräume, Keller und Außenanlagen – und melden Auffälligkeiten sofort." },
      { name: "Kleinreparaturen", text: "Tropfender Wasserhahn, klemmende Tür, lockerer Handlauf: Kleine Dinge erledigen wir direkt." },
      { name: "Instandhaltung", text: "Planmäßige Wartung und Pflege von Gebäudeteilen, damit teure Schäden erst gar nicht entstehen." },
      { name: "Mülltonnen-Service", text: "Tonnen rechtzeitig raus- und reinstellen, Müllplatz sauber halten, Sperrmüll koordinieren." },
      { name: "Winterdienst", text: "Räumen und Streuen nach Satzung – zuverlässig, auch an Wochenenden und Feiertagen." },
      { name: "Außenreinigung", text: "Wege, Zufahrten, Tiefgaragen und Eingangsbereiche sauber und sicher halten." },
      { name: "Ansprechpartner vor Ort", text: "Für Mieter, Eigentümer und Hausverwaltung: ein Gesicht, eine Nummer, kurze Wege." },
      { name: "Objektbetreuung", text: "Handwerker koordinieren, Zählerstände ablesen, Schlüssel verwalten – alles rund ums Objekt." },
    ],
    benefits: ["Elektriker als Hausmeister direkt vor Ort", "Kleinreparaturen ohne extra Handwerkertermin", "Notdienst & Rufbereitschaft", "Feste Betreuungsverträge oder Einzelaufträge"],
    faq: [
      { q: "Für welche Objekte eignet sich der Hausmeisterservice?", a: "Für Privathäuser und Villen genauso wie für Mehrfamilienhäuser, Büros, Praxen und Gewerbeflächen. Besonders gern betreuen wir Objekte, deren Eigentümer sich nicht mehr selbst um alles kümmern möchten." },
      { q: "Was ist, wenn außerhalb der Zeiten etwas passiert?", a: "Für Betreuungskunden haben wir eine Rufbereitschaft. Anfragen, die nach 18:00 Uhr eingehen, beantworten wir spätestens am nächsten Tag." },
      { q: "Übernehmen Sie auch einzelne Aufgaben, z. B. nur den Winterdienst?", a: "Ja. Sie stellen sich Ihr Paket selbst zusammen – vom reinen Winterdienst bis zur Rundum-Betreuung." },
    ],
  },
  {
    id: "gruenpflege",
    slug: "gruenpflege",
    name: "Grünpflege",
    short: "Garten- & Außenanlagen",
    tone: "leaf",
    eyebrow: "Gesunde Natur",
    headline: ["Grün, das", "gepflegt aussieht."],
    intro:
      "Rasen, Hecken, Beete und Wege: Wir pflegen Ihre Außenanlagen regelmäßig und leise – mit modernen Akku-Geräten, die Ihre Nachbarn nicht stören.",
    zone: "Garten & Außenanlagen",
    items: [
      { name: "Rasen mähen", text: "Regelmäßiger Schnitt, Kanten nachstechen, Rasen vertikutieren und düngen." },
      { name: "Hecken- & Strauchschnitt", text: "Formschnitt und Rückschnitt zur richtigen Zeit – gesetzeskonform und pflanzengerecht." },
      { name: "Laubpflege", text: "Laub aufnehmen und entsorgen, Dachrinnen und Wege freihalten." },
      { name: "Unkrautbeseitigung", text: "Mechanisch und thermisch – ohne chemische Mittel auf Wegen und Flächen." },
      { name: "Beetpflege", text: "Beete lockern, mulchen, Stauden pflegen und Saisonbepflanzung einsetzen." },
      { name: "Wegepflege", text: "Wege, Terrassen und Einfahrten reinigen, kehren und von Moos befreien." },
    ],
    benefits: ["Leise Akku-Gartengeräte – Nachbarn bleiben vom Lärm verschont", "Pflege nach Jahreszeiten-Plan", "Grünschnitt-Entsorgung inklusive", "Auch für große Grundstücke und Villen"],
    faq: [
      { q: "Warum Akku-Geräte?", a: "Sie sind deutlich leiser als Benzingeräte, stoßen vor Ort keine Abgase aus und sind genauso leistungsstark. Gerade in Wohngebieten ein echter Vorteil." },
      { q: "Wie oft kommen Sie zur Gartenpflege?", a: "Je nach Grundstück und Jahreszeit alle ein bis vier Wochen. Wir erstellen Ihnen einen Pflegeplan, der zu Ihrem Garten passt." },
      { q: "Entsorgen Sie den Grünschnitt?", a: "Ja, die fachgerechte Entsorgung ist bei uns Teil der Leistung." },
    ],
  },
  {
    id: "elektro",
    slug: "elektro",
    name: "Elektro",
    short: "Installation, Reparatur & E-Check",
    tone: "amber",
    eyebrow: "Fachgerecht",
    headline: ["Strom, auf den", "Verlass ist."],
    intro:
      "Störungen beheben, Leuchten installieren, Anlagen warten und prüfen: Wir kümmern uns um die Elektrik in Ihrem Bestandsgebäude – fachgerecht und sicher.",
    zone: "Dach & Elektrik",
    note: "Elektroarbeiten führen wir derzeit gemeinsam mit geprüften Partnerbetrieben aus. Sobald der eigene Meisterbrief vorliegt, übernehmen wir sie in eigener Regie.",
    items: [
      { name: "Reparaturen & Störungsbehebung", text: "Ausgefallene Steckdosen, flackernde Lampen, defekte Schalter – wir finden die Ursache und beheben sie." },
      { name: "Installationen", text: "Leuchten, Steckdosen, Bewegungsmelder, Außenbeleuchtung und Ladepunkte – sauber installiert." },
      { name: "Wartungen", text: "Regelmäßige Wartung von Beleuchtung, Verteilungen und Notbeleuchtung in Ihrem Objekt." },
      { name: "E-Checks / DGUV V3", text: "Prüfung ortsveränderlicher und ortsfester Betriebsmittel mit Prüfprotokoll – für Vermieter, Büros und Gewerbe." },
    ],
    benefits: ["Elektrik und Hausmeisterservice aus einer Hand", "Prüfprotokolle für Versicherung & Vermietung", "Schnelle Störungsbehebung", "Keine Rohbau- oder Neubauarbeiten – Fokus auf Bestand"],
    faq: [
      { q: "Was ist ein E-Check?", a: "Eine normgerechte Prüfung Ihrer Elektroanlage und Geräte. Sie erhalten ein Prüfprotokoll, das z. B. Versicherungen oder Vermieter verlangen." },
      { q: "Machen Sie auch Neubau-Installationen?", a: "Nein. Wir konzentrieren uns bewusst auf Instandhaltung, Reparatur und Erweiterung in bestehenden Gebäuden." },
      { q: "Wie schnell sind Sie bei einer Störung da?", a: "Bei Störungen reagieren wir so schnell wie möglich. Betreuungskunden profitieren von unserer Rufbereitschaft." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const tones = {
  aqua: { text: "text-aqua", bg: "bg-aqua", soft: "bg-aqua/10", ring: "ring-aqua/30", hex: "#12A7A0" },
  royal: { text: "text-royal", bg: "bg-royal", soft: "bg-royal/10", ring: "ring-royal/30", hex: "#1D5FD6" },
  leaf: { text: "text-leaf", bg: "bg-leaf", soft: "bg-leaf/10", ring: "ring-leaf/30", hex: "#3FA34D" },
  amber: { text: "text-amber", bg: "bg-amber", soft: "bg-amber/10", ring: "ring-amber/30", hex: "#F0A32B" },
} as const;

export const usps = [
  {
    t: "Alles aus einer Hand",
    d: "Reinigung, Hausmeister, Grünpflege und Elektrik – ein Ansprechpartner, eine Rechnung, keine Koordination zwischen fünf Firmen.",
  },
  {
    t: "Elektriker als Hausmeister",
    d: "Unser Hausmeister bringt Elektro-Know-how mit. Viele Störungen sind damit erledigt, bevor ein extra Handwerker kommen muss.",
  },
  {
    t: "Leise Akku-Technik",
    d: "In der Grünpflege setzen wir auf Akku-Geräte. Ihre Nachbarn bleiben vom Lärm verschont – und die Luft bleibt sauber.",
  },
  {
    t: "Schnell, zuverlässig, vertrauenswürdig",
    d: "Feste Zeiten, feste Gesichter, klare Absprachen. Dafür loben uns unsere Kunden am häufigsten.",
  },
];

export const steps = [
  { t: "Anfrage", d: "Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Wir melden uns spätestens am nächsten Tag." },
  { t: "Kostenlose Besichtigung", d: "Wir schauen uns Ihr Objekt vor Ort an, hören zu und beraten ehrlich – unverbindlich und kostenlos." },
  { t: "Klares Angebot", d: "Sie erhalten ein transparentes Angebot: als Einzelauftrag oder als festen Betreuungsvertrag." },
  { t: "Umsetzung", d: "Wir legen los – zuverlässig, pünktlich und mit einem festen Ansprechpartner für alle Fragen." },
];

export const audiences = [
  { t: "Privathaushalte & Villen", d: "Für alle, die ihr Zuhause in guten Händen wissen wollen – besonders, wenn man sich nicht mehr um alles selbst kümmern möchte." },
  { t: "Büros & Praxen", d: "Saubere Räume, funktionierende Technik und ein Hausmeister, der sich kümmert – ohne dass Sie es merken." },
  { t: "Gewerbeflächen", d: "Hallen, Läden, Werkstätten: regelmäßige Reinigung und Instandhaltung, auch außerhalb der Öffnungszeiten." },
  { t: "Hausverwaltungen", d: "Treppenhaus, Außenanlagen, Winterdienst und Kleinreparaturen – ein Partner für das ganze Objekt." },
];
