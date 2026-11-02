// Vercel-only private port. Signed session cookies survive function restarts.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const GATE_PASS_HASH = process.env.GATE_PASS_HASH || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const PORT = process.env.PORT || 3000;
const COOKIE_NAME = 'sf_gate';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const SESSION_KEY = process.env.SESSION_SIGNING_KEY || ''; // deployment-only HMAC key

const TABLES = {
  destinations: 'destinations?select=*',
  destination_getting: 'destination_getting?select=*&order=position.asc',
  destination_places: 'destination_places?select=*&order=position.asc',
  dishes: 'dishes?select=*&order=position.asc',
  eateries: 'eateries?select=*&order=position.asc',
  stays: 'stays?select=*&order=position.asc',
  shops: 'shops?select=*&order=position.asc',
};

const ALLOWED_ORIGIN = /^https:\/\/(filerevision-[a-z0-9]+\.instinctusercontent\.com|files\.instinct\.com|safarnama-mauve-zeta\.vercel\.app|localhost(:\d+)?)$/;

function corsHeaders(origin) {
  const allow = origin && ALLOWED_ORIGIN.test(origin) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

async function fetchTable(name, query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: { apikey: SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`${name}: Supabase returned ${res.status}`);
  return res.json();
}

// ---------- passcode gate ----------
const attempts = new Map(); // ip -> {count, resetAt}
const photoAttempts = new Map(); // ip -> {count, resetAt} - Gemini quota guard
function photoRateLimited(ip) {
  const now = Date.now();
  const a = photoAttempts.get(ip);
  if (!a || a.resetAt < now) { photoAttempts.set(ip, { count: 1, resetAt: now + 3600000 }); return false; }
  a.count += 1;
  return a.count > 10;
}
function rateLimited(ip) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || a.resetAt < now) { attempts.set(ip, { count: 1, resetAt: now + 60000 }); return false; }
  a.count += 1;
  return a.count > 5;
}
function verifyPasscode(pw) {
  if (!GATE_PASS_HASH || !pw) return false;
  const [salt, hash] = GATE_PASS_HASH.split(':');
  if (!salt || !hash) return false;
  const calc = crypto.scryptSync(String(pw), salt, 32).toString('hex');
  const a = Buffer.from(calc, 'hex'), b = Buffer.from(hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function newSession(res) {
  const payload = Buffer.from(JSON.stringify({exp:Date.now()+SESSION_TTL_MS,nonce:crypto.randomBytes(16).toString('hex')})).toString('base64url');
  const sig=crypto.createHmac('sha256',SESSION_KEY).update(payload).digest('base64url');
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${payload}.${sig}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_MS/1000}`);
}
function sessionOk(req) {
  if(!SESSION_KEY) return false;
  const m=(req.headers.cookie||'').match(/(?:^|; )sf_gate=([^;]+)/); if(!m)return false;
  try { const [p,s,...extra]=m[1].split('.'); if(extra.length||!p||!s)return false;
    const actual=Buffer.from(s,'base64url'),expected=crypto.createHmac('sha256',SESSION_KEY).update(p).digest();
    if(actual.length!==expected.length||!crypto.timingSafeEqual(actual,expected))return false;
    const data=JSON.parse(Buffer.from(p,'base64url').toString());return Number.isFinite(data.exp)&&data.exp>Date.now()&&data.exp<=Date.now()+SESSION_TTL_MS;
  }catch{return false;}
}

const GATE_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Safarnama - private</title></head>
<body style="font-family:system-ui,sans-serif;background:#0d1512;color:#f2ede4;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
<form method="POST" action="/gate/login" style="text-align:center;max-width:320px">
<h2 style="font-family:Georgia,serif">Safarnama<span style="color:#7fc4b2">.</span></h2>
<p style="color:#a7b6ad;font-size:14px">Private site - enter the access passcode.</p>
<input type="password" name="passcode" autocomplete="current-password" required minlength="8"
 style="width:100%;padding:12px;border-radius:10px;border:1px solid rgba(242,237,228,.2);background:#16241e;color:#f2ede4;font-size:15px">
<button style="margin-top:12px;width:100%;padding:12px;border:0;border-radius:10px;background:#2f6f5e;color:#fff;font-size:15px">Open the site</button>
ERR
</form></body></html>`;

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json', '.svg': 'image/svg+xml' };
const PUBLIC_DIR = path.join(process.cwd(), 'private-assets');

// Resolve legacy numeric-prefixed static assets; exact file names take priority.
function listFiles(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(listFiles(full));
    else if (e.isFile()) out.push(full);
  }
  return out;
}
function resolveStatic(pathname) {
  let base = path.basename(pathname === '/' ? '/index.html' : pathname);
  if (!/^[A-Za-z0-9._-]+$/.test(base)) return null;
  let best = null, bestN = -1;
  for (const f of listFiles(PUBLIC_DIR)) {
    const n = path.basename(f);
    if (n === base) return f;
    const m = n.match(/^(\d+)-(.+)$/);
    if (m && m[2] === base && parseInt(m[1], 10) > bestN) { best = f; bestN = parseInt(m[1], 10); }
  }
  return best;
}
function serveStatic(req, res, pathname) {
  const file = resolveStatic(pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}

const CALLBACK_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Safarnama sign-in</title></head>
<body style="font-family:sans-serif;background:#0f1a16;color:#e8f0ec;display:flex;min-height:100vh;align-items:center;justify-content:center">
<p id="msg">Signing you in - this window will close automatically.</p>
<script>
(function () {
  var sp = {}; location.search.replace(/^\\?/, '').split('&').forEach(function (kv) { var p = kv.split('='); if (p[0]) sp[p[0]] = decodeURIComponent(p[1] || ''); });
  var hp = {}; location.hash.replace(/^#/, '').split('&').forEach(function (kv) { var p = kv.split('='); if (p[0]) hp[p[0]] = decodeURIComponent(p[1] || ''); });
  var payload = null;
  if (sp.code && sp.state) payload = { type: 'safarnama-auth', code: sp.code, state: sp.state };
  else if (hp.access_token && hp.state) payload = { type: 'safarnama-auth', token: hp.access_token, state: sp.state };
  else if (sp.error) payload = { type: 'safarnama-auth', error: sp.error, state: sp.error ? (sp.state || '') : '' };
  if (!payload || !window.opener) {
    // Same-window redirect flow (iOS / in-app browsers): hand the parameters to the main
    // page, which validates the state against the value it stored locally before use.
    if (payload && payload.code) location.replace('/?code=' + encodeURIComponent(payload.code) + '&state=' + encodeURIComponent(payload.state));
    else if (payload && payload.token) location.replace('/#access_token=' + encodeURIComponent(payload.token) + '&state=' + encodeURIComponent(payload.state));
    else document.getElementById('msg').textContent = 'Sign-in session not found - you can close this window and try again from the site.';
    return;
  }
  // Deliver the payload only to a verified Safarnama origin that identifies
  // itself first; never broadcast tokens/codes with '*'.
  var TRUSTED = /^https:\\/\\/(files\\.instinct\\.com|filerevision-[a-z0-9]+\\.instinctusercontent\\.com|safarnama-backend-3a61\\.onrender\\.com)$/;
  var done = false;
  function finish(msg) { if (!done) { done = true; document.getElementById('msg').textContent = msg; } }
  window.addEventListener('message', function (e) {
    if (done || !e.data || e.data.type !== 'safarnama-auth-hello') return;
    if (e.source !== window.opener || !TRUSTED.test(e.origin)) return;
    try { window.opener.postMessage(payload, e.origin); } catch (err) {}
    finish('Signed in - you can close this window.');
    window.close();
  });
  setTimeout(function () { finish('Still waiting for the site - you can close this window and try again.'); }, 30000);
})();
<\/script>
</body></html>`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control','private, no-store');
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/auth/callback') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(CALLBACK_HTML);
    return;
  }

  if (pathname === '/gate/login' && req.method === 'POST') {
    const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (rateLimited(ip)) {
      res.writeHead(429, { 'Content-Type': 'text/html; charset=utf-8', 'Retry-After': '60' });
      res.end(GATE_HTML.replace('ERR', '<p style="color:#d9a441;font-size:13px">Too many tries - wait a minute and try again.</p>'));
      return;
    }
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 4096) req.destroy(); });
    req.on('end', () => {
      const pw = new URLSearchParams(body).get('passcode') || '';
      if (verifyPasscode(pw)) {
        newSession(res);
        res.writeHead(303, { Location: '/' });
        res.end();
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(GATE_HTML.replace('ERR', '<p style="color:#d9a441;font-size:13px">Wrong passcode.</p>'));
      }
    });
    return;
  }

  const origin = req.headers.origin;
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders(origin));
    res.end();
    return;
  }

  if (pathname === '/api/health') {
    res.writeHead(200, headers);
    res.end(JSON.stringify({ ok: true, service: 'safarnama-backend' }));
    return;
  }

  // Photo -> destination guess via Gemini free tier. Photos are sent to Google
  // (disclosed in the site UI). Rate limited per IP to protect the free quota.
  if (pathname === '/api/photo' && req.method === 'POST') {
    if (!sessionOk(req)) {
      res.writeHead(401, headers);
      res.end(JSON.stringify({ error: 'unauthorized' }));
      return;
    }
    const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!GEMINI_API_KEY) {
      res.writeHead(503, headers);
      res.end(JSON.stringify({ error: 'photo_ai_unconfigured' }));
      return;
    }
    if (photoRateLimited(ip)) {
      res.writeHead(429, headers);
      res.end(JSON.stringify({ error: 'rate_limited' }));
      return;
    }
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 8 * 1024 * 1024) req.destroy(); });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const image = String(parsed.image || '');
        const mime = String(parsed.mimeType || '');
        if (!image || image.length > 6 * 1024 * 1024 || !/^image\/(jpeg|png|webp)$/.test(mime)) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ error: 'bad_image' }));
          return;
        }
        const prompt = 'You are helping an Indian travel guide app. Look at this photo and guess the most likely place in India it shows (or the closest well-known Indian destination). Respond ONLY as JSON with these keys: "place" (string or null), "state" (string), "confidence" ("high"|"medium"|"low"), "why" (one sentence), "best_season" (string), "estimated_trip_cost_inr" (object with "budget" and "comfort" string ranges, per person for 3 days, very rough). If the photo does not look like a real place in India, use "place": null and a "reason" string.';
        const MODELS = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
        let gRes = null, gData = null;
        for (const model of MODELS) {
          gRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mime, data: image } }] }],
              generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
            }),
          });
          if (gRes.ok) break;
        }
        gData = await gRes.json().catch(() => ({}));
        if (!gRes.ok) {
          res.writeHead(502, headers);
          res.end(JSON.stringify({ error: 'gemini_error' }));
          return;
        }
        const text = (((gData.candidates || [])[0] || {}).content || {}).parts;
        const raw = text && text[0] && text[0].text ? text[0].text : '';
        let guess = null;
        try { guess = JSON.parse(raw); } catch (e) { guess = null; }
        if (!guess || typeof guess !== 'object') {
          res.writeHead(502, headers);
          res.end(JSON.stringify({ error: 'unparseable' }));
          return;
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify({ guess }));
      } catch (e) {
        res.writeHead(500, headers);
        res.end(JSON.stringify({ error: 'server_error' }));
      }
    });
    return;
  }

  if (pathname === '/api/content') {
    if (!sessionOk(req)) {
      res.writeHead(401, headers);
      res.end(JSON.stringify({ error: 'unauthorized' }));
      return;
    }
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      res.writeHead(500, headers);
      res.end(JSON.stringify({ error: 'backend not configured' }));
      return;
    }
    try {
      const entries = await Promise.all(
        Object.entries(TABLES).map(async ([name, query]) => [name, await fetchTable(name, query)])
      );
      const data = Object.fromEntries(entries);
      res.writeHead(200, { ...headers, 'Cache-Control': 'private, no-store' });
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(502, headers);
      res.end(JSON.stringify({ error: 'content source unavailable' }));
    }
    return;
  }

  // Everything else is the gated static site.
  if (!GATE_PASS_HASH || !SESSION_KEY) {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('site not configured');
    return;
  }
  if (!sessionOk(req)) {
    if (req.method !== 'GET') { res.writeHead(401); res.end('unauthorized'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(GATE_HTML.replace('ERR', ''));
    return;
  }
  serveStatic(req, res, pathname);
    }
