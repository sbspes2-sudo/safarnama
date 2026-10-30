-- Safarnama database schema for Supabase (PostgreSQL)
-- Run this FIRST in the Supabase SQL editor, then run seed.sql.
-- Safe to re-run: existing tables are kept, policies are replaced.

create table if not exists destinations (
  id            text primary key,          -- slug, e.g. 'agra'
  name          text not null,
  state         text not null,
  region        text not null,             -- north | west | south | east | islands
  vibes         text[] not null default '{}',
  blurb         text not null,
  photo         text not null,             -- relative path served by the frontend, e.g. 'photos/agra.jpg'
  alt           text not null,
  credit        text,
  best          text not null,             -- human label, e.g. 'Oct - Mar'
  months        smallint[] not null default '{}', -- in-season months, 0 = January
  festival_name text,
  festival_when text,
  festival_note text,
  ideal         text,                      -- ideal stay length, e.g. '3 days'
  places        text[] not null default '{}',
  sort_order    integer not null default 0
);

create table if not exists getting_there (
  id             bigint generated always as identity primary key,
  destination_id text not null references destinations(id) on delete cascade,
  text           text not null,            -- e.g. 'Flight, New Delhi to Leh - one-way economy, 28 Nov 2026'
  fare           text,                     -- e.g. 'from $77.60' or 'check live fares'
  source         text,                     -- e.g. 'Duffel live quote, 30 Oct'
  url            text,                     -- optional link to check live prices
  sort_order     integer not null default 0
);

create table if not exists fares (
  id         bigint generated always as identity primary key,
  route      text not null,
  fare       text not null,
  sort_order integer not null default 0
);

create table if not exists state_guides (
  id            bigint generated always as identity primary key,
  name          text not null,
  kind          text not null check (kind in ('state', 'ut')),
  best_months   text not null,
  festival      text,
  festival_when text,
  source_url    text,
  sort_order    integer not null default 0
);

-- Row Level Security. These SELECT policies, scoped to Supabase's built-in
-- anon and authenticated roles, are what make the content publicly readable
-- with the low-privilege anon (publishable) key. There are deliberately no
-- INSERT/UPDATE/DELETE policies, so nobody can write through the API keys.
-- Read grants for the API roles (Supabase's default privileges already
-- cover new tables in public; stated here so the intent is explicit).
grant select on destinations, getting_there, fares, state_guides to anon, authenticated;

alter table destinations   enable row level security;
alter table getting_there  enable row level security;
alter table fares          enable row level security;
alter table state_guides   enable row level security;

drop policy if exists "destinations are publicly readable" on destinations;
drop policy if exists "getting_there is publicly readable" on getting_there;
drop policy if exists "fares are publicly readable"        on fares;
drop policy if exists "state_guides are publicly readable" on state_guides;

create policy "destinations are publicly readable"  on destinations  for select to anon, authenticated using (true);
create policy "getting_there is publicly readable"  on getting_there for select to anon, authenticated using (true);
create policy "fares are publicly readable"         on fares         for select to anon, authenticated using (true);
create policy "state_guides are publicly readable"  on state_guides  for select to anon, authenticated using (true);
