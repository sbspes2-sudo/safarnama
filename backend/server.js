/* Safarnama backend: a small Express API that reads the travel content
   from Supabase and serves it to the frontend in the exact shapes it
   already understands. Read-only - no bookings, accounts or payments.
   It uses the public anon (publishable) key: Row Level Security policies
   in schema.sql are what allow the reads, so the key stays low-privilege. */
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const PORT = process.env.PORT || 3001;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

const app = express();
app.use(express.json());

const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);
app.use(cors(allowed.length ? { origin: allowed } : undefined));

const configured = Boolean(SUPABASE_URL && SUPABASE_KEY);
const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function notConfigured(res) {
  return res.status(503).json({
    error: 'not_configured',
    hint: 'Set SUPABASE_URL and SUPABASE_ANON_KEY in backend/.env (see .env.example).'
  });
}

/* Runs an async route and turns any failure into one safe response.
   The real error is logged on the server; callers only get a generic
   code so database or upstream details never leak to the public API. */
function route(handler) {
  return async (req, res) => {
    if (!configured) return notConfigured(res);
    try {
      await handler(req, res);
    } catch (e) {
      console.error(`[safarnama] ${req.method} ${req.path} failed:`, e && e.message ? e.message : e);
      if (!res.headersSent) res.status(502).json({ error: 'upstream_error' });
    }
  };
}

async function query(promise) {
  const { data, error } = await promise;
  if (error) throw new Error(error.message);
  return data;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, supabase: configured ? 'configured' : 'not_configured' });
});

/* One call that returns everything the landing page needs, in the exact
   shapes the frontend's bundled data uses, so it is a drop-in swap. */
app.get('/api/bootstrap', route(async (req, res) => {
  const [dest, getting, fares, guides] = await Promise.all([
    query(supabase.from('destinations').select('*').order('sort_order')),
    query(supabase.from('getting_there').select('*').order('sort_order')),
    query(supabase.from('fares').select('route, fare').order('sort_order')),
    query(supabase.from('state_guides').select('*').order('sort_order'))
  ]);

  const byDest = {};
  for (const g of getting) {
    (byDest[g.destination_id] = byDest[g.destination_id] || []).push({
      text: g.text, fare: g.fare || '', source: g.source || undefined, url: g.url || undefined
    });
  }
  const destinations = dest.map(d => ({
    id: d.id, name: d.name, state: d.state, region: d.region,
    vibes: d.vibes, blurb: d.blurb, photo: d.photo, alt: d.alt,
    credit: d.credit || undefined,
    best: d.best, months: d.months,
    festival: { name: d.festival_name, when: d.festival_when, note: d.festival_note },
    ideal: d.ideal, places: d.places,
    getting: byDest[d.id] || []
  }));
  const toRow = s => [s.name, s.best_months, s.festival || '', s.festival_when || '', s.source_url || ''];

  res.json({
    destinations,
    fares,
    states: guides.filter(s => s.kind === 'state').map(toRow),
    uts: guides.filter(s => s.kind === 'ut').map(toRow)
  });
}));

/* Individual endpoints, useful when the site grows. */
app.get('/api/destinations', route(async (req, res) => {
  res.json(await query(supabase.from('destinations').select('*').order('sort_order')));
}));

app.get('/api/destinations/:id', route(async (req, res) => {
  const data = await query(
    supabase.from('destinations').select('*').eq('id', req.params.id).maybeSingle());
  if (!data) return res.status(404).json({ error: 'not_found' });
  const getting = await query(supabase
    .from('getting_there').select('text, fare, source, url')
    .eq('destination_id', req.params.id).order('sort_order'));
  res.json({ ...data, getting });
}));

app.get('/api/fares', route(async (req, res) => {
  res.json(await query(supabase.from('fares').select('route, fare').order('sort_order')));
}));

app.get('/api/state-guides', route(async (req, res) => {
  res.json(await query(supabase.from('state_guides').select('*').order('sort_order')));
}));

app.listen(PORT, () => {
  console.log(`Safarnama API listening on http://localhost:${PORT}`);
  if (!configured) {
    console.log('Supabase is NOT configured yet - copy backend/.env.example to backend/.env and fill it in.');
  }
});
