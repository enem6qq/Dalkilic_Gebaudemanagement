-- Supabase-Schema für Gebäudemanagement Dalkilic
-- Ausführen im Supabase SQL-Editor (Project → SQL Editor → New query).

create extension if not exists "pgcrypto";

-- Anfragen aus dem Kontaktformular und Rückruf-Wünsche
create table if not exists public.anfragen (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  art           text not null check (art in ('anfrage', 'rueckruf', 'notdienst')),
  name          text not null,
  telefon       text,
  email         text,
  leistung      text,                       -- z. B. gebaeudereinigung, hausmeisterservice, gruenpflege, elektro
  objekt        text,                       -- z. B. Privathaus, Büro, Gewerbe, Mehrfamilienhaus
  ort           text,
  nachricht     text,
  wunschzeit    text,                       -- freier Text für Rückruf ("morgen Vormittag")
  quelle        text default 'website',
  status        text not null default 'neu' check (status in ('neu', 'in_bearbeitung', 'erledigt', 'spam')),
  notiz         text                        -- interne Notiz, nur im Supabase-Dashboard pflegen
);

create index if not exists anfragen_created_at_idx on public.anfragen (created_at desc);
create index if not exists anfragen_status_idx on public.anfragen (status);

-- Row Level Security: niemand außer dem Service-Role-Key (Server) darf lesen/schreiben.
alter table public.anfragen enable row level security;
-- Keine Policies für anon/authenticated → kein Zugriff aus dem Browser.
-- Der Server (Next.js Route Handler auf Vercel) nutzt den Service-Role-Key und umgeht RLS.

comment on table public.anfragen is 'Kontakt- und Rückrufanfragen von www.dalkilic-gruppe.de';
