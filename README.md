# Mangiore

Marketing site for Mangiore LLC, a digital product & systems studio.

Built with **Next.js 15 (App Router) + TypeScript**, statically exported. No
server runtime: the build emits plain HTML/CSS/JS to `out/`, which deploys to
any static host (Vercel, Netlify, S3, etc.). Fast by construction is part of
the pitch.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

## Structure

- `app/` — routes
  - `page.tsx` — homepage
  - `[lane]/page.tsx` — the four lane pages (generated from `lib/lanes.ts`)
  - `layout.tsx` — fonts, metadata, shared chrome
  - `sitemap.ts`, `robots.ts` — emitted as `sitemap.xml` / `robots.txt`
- `components/` — `TopBar`, `Footer`, `Reveal` (scroll reveal)
- `lib/site.ts` — entity facts (name, email, location, principal, flagship)
- `lib/lanes.ts` — the four lanes: copy, metadata, "what's included" lists
- `reference/` — the previous site versions, kept for copy reference only

## Content

Edit `lib/lanes.ts` to change lane copy or add a lane (a new entry becomes a
new crawlable page automatically, with its own title, description, and
cross-links). Edit `lib/site.ts` for entity-level facts.

## Open item

`lib/site.ts` → `principal` is set to `"Nicho"`. Complete it with the full
name to be used wherever the principal is named.
