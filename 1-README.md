# Safarnama - travel website with a Node.js + Supabase backend

The site is split into three parts:

```
safarnama-fullstack/
  frontend/    the website - index.html, styles.css, app.js, config.js, photos/
  backend/     the Node.js API that reads content from Supabase
  supabase/    the SQL you paste into Supabase to create and fill the tables
```

How they connect: the browser loads the frontend, the frontend calls the
Node.js API, and the API reads from your Supabase database. Supabase stores
the data; Node.js serves it. The Node server runs on your own machine or on
a hosting service - it does not run inside Supabase.

Everything still works with zero setup: open frontend/index.html and the
site runs standalone from its bundled copy of the content. The backend only
takes over once you link it (step 3).

## 1. Set up the database in Supabase

1. Go to https://supabase.com, sign in, and create a project.
2. In the left menu open **SQL Editor** -> **New query**.
3. Paste the whole contents of `supabase/schema.sql` and click **Run**.
   This creates the 4 tables, grants read access, and adds Row Level
   Security policies so the content is publicly readable but nobody can
   write through the API keys. The script is safe to run again if needed.
4. New query again, paste `supabase/seed.sql`, click **Run**.
   This fills the tables with all 12 destinations, flight fare examples,
   and the 28-state / 8-UT season and festival guide.
5. Check **Table Editor** - you should see `destinations`, `getting_there`,
   `fares` and `state_guides` with rows in them.

## 2. Run the backend

You need Node.js 22 or newer (https://nodejs.org) - the Supabase client
library requires it.

```
cd backend
cp .env.example .env
```

Open `.env` and fill in the two values from your Supabase project
(**Project Settings -> API keys**):

- `SUPABASE_URL` - looks like `https://abcdefgh.supabase.co`
- `SUPABASE_ANON_KEY` - the **anon public** key (newer dashboards call it
  the **publishable** key). This API is read-only and the RLS policies
  control access, so it never needs the `service_role` secret key - do not
  use that one here.

Then:

```
npm install
npm start
```

You should see `Safarnama API listening on http://localhost:3001`.
Test it: open http://localhost:3001/api/health (should say
`"supabase":"configured"`) and http://localhost:3001/api/bootstrap
(should return all the destinations as JSON).

### API endpoints

| URL | Returns |
| --- | --- |
| `/api/health` | whether Supabase is connected |
| `/api/bootstrap` | everything the homepage needs, in one call |
| `/api/destinations` | all 12 destinations |
| `/api/destinations/agra` | one destination plus its getting-there options |
| `/api/fares` | the example flight fares |
| `/api/state-guides` | all 28 states + 8 UTs with seasons and festivals |

All endpoints are read-only. If the database call fails, the API returns a
generic error and logs the detail on the server only.

## 3. Link the frontend to the backend

Open `frontend/config.js` and set your API address:

```js
window.SAFARNAMA_API_URL = 'http://localhost:3001';
```

Reload the site. It now loads its content from Supabase through your
backend. Edit a row in the Supabase Table Editor, refresh the page, and the
change appears - no code edits needed.

If the backend is ever unreachable, the site shows a small notice at the
bottom of the page ("Showing the built-in copy...") and keeps working from
its bundled data, so visitors never see a blank page and can always tell
they are not seeing your latest database content.

## 4. Putting it online

- **Frontend**: the `frontend/` folder is plain static files. Host it on any
  static host (Netlify, Vercel, GitHub Pages, or ordinary web hosting).
- **Backend**: deploy `backend/` to any Node.js host (for example Render or
  Railway). Set the same two environment variables there instead of using
  `.env`, then put the deployed URL into `frontend/config.js`.
- If the frontend and backend end up on different domains, also set
  `ALLOWED_ORIGINS` in the backend environment to your frontend's URL.

## What this backend does and does not do

It serves the site's content from a database you control. It does not book
anything, take payments, or fetch live flight and hotel prices - the fares
in the `fares` table are dated examples checked 30 Oct 2026, exactly as
labelled on the site. Live prices would need a travel-data provider such
as Duffel or Amadeus wired into this same API, which is a separate step
that needs its own provider account.
