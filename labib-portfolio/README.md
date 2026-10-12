# Labib Portfolio

A dark, circuit-inspired personal portfolio using Express, EJS, GSAP, ScrollTrigger and Lenis.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize first

1. Edit `src/data/profile.js` with verified profile details.
2. Edit `src/data/skills.js` with real skills and evidence.
3. Edit `src/data/projects.js` to include only real projects.
4. Replace sample email and GitHub links.
5. Add optimized videos to `public/videos/` if you want cinematic video sections.

The profile content currently contains clearly marked placeholders because LinkedIn profile details have not yet been imported.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Deploy using the included `vercel.json`.

This repository uses an Express app exported as a Vercel Node.js function. Verify the current Vercel Node.js runtime conventions if you change the app structure.

## Important notes

- The contact form is a UI demo. The POST route returns a message explaining that delivery is not configured. Connect an email service before production.
- The skills map is a lightweight clickable 2D node map. Add more nodes and matching data as the portfolio grows.
- GSAP and Lenis are imported from CDN in `public/js/scroll.js`; this means the browser needs access to that CDN. For a fully bundled setup, change the imports to package imports and add a bundler such as Vite.
- Videos are not included. Use short, compressed, muted looping clips and lazy-load below-the-fold media.
- Do not claim experience, proficiency, qualifications, or achievements that you cannot substantiate.
