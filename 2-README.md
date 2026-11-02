# Safarnama - current project snapshot

Saved 3 November 2026 (India time). This is the current 38-destination website, including the Surprise trip planner no-match/recovery fix. It replaces the older 12-destination version as the current source snapshot. No bookings or payments are made by this demo.

## Files
- `public/`: complete HTML/CSS/JavaScript frontend and local photos, with photo credits and licence links retained in the app.
- `server.js`: current Node.js server for the private passcode gate, content reads, OAuth callback and photo-AI endpoint.
- `data/destinations.json`: bundled destination content snapshot, not an export of user accounts or profiles.
- `.env.example`: environment variable names only, no secret values.

## Run
Node.js 18 or newer is required. No npm dependencies are needed. Load your environment variables using your hosting provider or shell, then run `npm start`. With Node.js 22+, you can copy `.env.example` to `.env`, fill your own settings, and run `node --env-file=.env server.js`. Open `http://localhost:3000`.

The server fails closed when GATE_PASS_HASH is not configured. This is intentional. GATE_PASS_HASH is a scrypt verifier in salt:hash hexadecimal form, not a plaintext password. Existing deployment secrets remain on the hosting service and are not included here.

## External services and limits
The existing private deployment uses Supabase for content and authentication, Render for hosting, and Gemini for photo recognition. Uploading source does not copy those services, their database configuration, OAuth settings or secrets. The frontend currently points to the existing project's publishable Supabase configuration and OAuth callback. To run a separate deployment, configure your own project, redirects and permitted origins in both frontend and server. The publishable key in the frontend is not a service-role credential.

Content tables used by the server: destinations, destination_getting, destination_places, dishes, eateries, stays and shops. Authentication/profile data is separate; never relax profile row-level security or put service-role/Gemini keys in frontend code. This snapshot includes travel content only, not user records. It is not a tested one-command recreation of the external database/auth setup.

For a simple static preview, serve public/ with a local HTTP server. Bundled guide content works as a fallback. Google login, photo recognition and live content still require the configured services. The production passcode gate needs HTTPS secure cookies, so use the existing HTTPS deployment for the full authenticated flow.

## Versions
Current production source is also maintained in the separate private safarnama-backend repository. This archive is a clean, portable project snapshot, not the history of that deployment repository. The older frontend/backend/supabase folders in this repository are retained as historical source; use this current snapshot for the latest version.

Planner figures are rough allowances, not quotes. Routes, venue ratings and festival details have dates/caveats in the guide and need rechecking before travel. Photo rights remain with their credited owners; do not assume this project grants rights beyond each linked licence.
