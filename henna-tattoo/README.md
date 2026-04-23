# Henna Tattoo Albania — Website

Static site for **Henna Tattoo Albania** (Tirana). Built with **Astro** + **Tailwind CSS** so pages ship as pure HTML with zero client JavaScript — great for Google indexing and Core Web Vitals.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:4321.

## Scripts

- `npm run dev` — start the dev server (http://localhost:4321)
- `npm run build` — build the production site into `dist/`
- `npm run preview` — serve the production build locally
- `npm run astro -- ...` — run any Astro CLI command

## Project structure

```
src/
  layouts/
    Layout.astro          Root layout — meta/OG tags, JSON-LD, nav, footer
  pages/
    index.astro           Home: hero, categories, about, gallery, CTA
    contact.astro         Contact form + Google Maps embed
    categories/[slug].astro  Dynamic detail pages (one per category)
    sitemap.xml.ts        Build-time XML sitemap endpoint
    404.astro             Custom not-found page
  components/
    Navbar.astro          Sticky nav with mobile menu (small vanilla JS)
    Footer.astro
    Hero.astro
    Logo.astro
    CategoryCard.astro
    PriceList.astro
    PriceChart.astro
    DesignGallery.astro
  lib/
    site.ts               Brand info (name, contact, location, social)
    categories.ts         All 5 categories: prices, photos, charts
  styles/
    global.css            Tailwind directives + utility classes
public/
  images/                 Photos, logo, price charts
  robots.txt              Points at /sitemap.xml
```

## Editing content

**Brand / contact info:** [src/lib/site.ts](src/lib/site.ts)

**Pricing & photos per category:** [src/lib/categories.ts](src/lib/categories.ts)
- `startingAt` — "from" price shown on cards
- `priceList[]` — rows in the pricing table
- `image` — card / detail-page hero photo, path relative to `public/`
- `priceChart` — visual price-scale image
- `gallery[]` — array of design photo paths

Drop new photos into `public/images/` and reference them like `/images/my-photo.jpg`.

## SEO features

- Static HTML, zero client-side JS on content pages
- `<link rel="canonical">`, OpenGraph + Twitter meta on every page
- JSON-LD `LocalBusiness` structured data (address, geo, phone, email)
- `/sitemap.xml` auto-generated from `src/lib/categories.ts`
- `/robots.txt` pointing to the sitemap
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`)
- Custom 404 page

## Deploying

The output is 100% static HTML in `dist/`. Works on any static host:

- **Netlify** — connect the repo, build command `npm run build`, publish `dist`
- **Vercel** — framework preset "Astro", same build/output
- **Cloudflare Pages** — same
- **GitHub Pages** — build locally, push `dist/` to `gh-pages`

Before deploying, update `site:` in [astro.config.mjs](astro.config.mjs) to the real domain so canonical URLs and the sitemap point to the right host.

## Requirements

- Node.js **≥ 18.17.1** (Astro 4 requirement — your current Node may warn on install; upgrade if you see engine warnings).
