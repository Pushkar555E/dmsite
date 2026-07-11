# Nexora Digital Website

Professional static website for Nexora Digital, a growing digital agency helping small businesses, startups, local brands, and service professionals with websites, SEO foundations, content planning, analytics setup, and practical digital support.

## Features

- Responsive homepage, services, portfolio/case studies, blog, contact, legal pages, and 404 page
- Light and dark mode with saved theme preference
- Honest project labels: client, internal, archived, and concept work
- Archived project proof gallery/modal for work without a public live URL
- Web3Forms-ready contact and audit request form
- Free 10-point website audit offer
- Central pricing, services, projects, contact, and placeholder configuration
- FAQ section with FAQPage schema
- SEO metadata, Open Graph tags, sitemap, and robots.txt
- Analytics event hooks prepared for GA4/GTM without fake IDs

## Technology Stack

- Vite
- HTML
- CSS
- Vanilla JavaScript

## Project Structure

- `site.config.js` - central brand, contact, pricing, services, project, form, and analytics configuration
- `scripts/generate-pages.mjs` - generates HTML pages, `sitemap.xml`, and `robots.txt`
- `index.css` - site styling, responsiveness, dark mode, forms, modal, and layout
- `main.js` - navigation, theme toggle, form handling, modal/gallery, filtering, and event hooks
- `public/` - brand assets, client proof images, agency images, sitemap, and robots
- `index.html`, `services.html`, `portfolio.html`, `blog.html`, `contact.html` - main pages
- `privacy.html`, `terms.html`, `refund.html`, `404.html` - legal and utility pages

## Local Setup

```bash
npm install
npm run dev
```

Local development usually runs at `http://localhost:5174/` unless another command overrides the port.

## Build

```bash
npm run build
npm run preview
```

## Regenerate Pages

After editing `site.config.js` or `scripts/generate-pages.mjs`, run:

```bash
node scripts/generate-pages.mjs
```

Then run the production build again.

## Form Configuration

The contact form is prepared for Web3Forms.

Replace this placeholder in `site.config.js`:

```js
web3formsAccessKey: 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY'
```

Until that value is replaced, the form shows a clear setup error instead of pretending to submit.

## Analytics Configuration

Analytics placeholders are in `site.config.js`:

```js
ga4MeasurementId: 'G-REPLACE_ME'
googleTagManagerId: 'GTM-REPLACE_ME'
searchConsoleVerification: 'REPLACE_WITH_SEARCH_CONSOLE_VERIFICATION_CODE'
```

No fake tracking IDs are inserted. `main.js` already exposes event hooks for form submissions, WhatsApp clicks, email clicks, pricing CTA clicks, audit requests, project clicks, and service clicks when analytics is configured.

## Custom Domain Configuration

The current base URL is:

```js
baseUrl: 'https://nexora-digital-growth.vercel.app'
```

Change `baseUrl` in `site.config.js` only after the new domain is actually connected and serving this website. Then regenerate pages and rebuild.

## How To Add Projects

Edit the `projects` array in `site.config.js`.

Use accurate labels:

- `Client Project`
- `Personal Project`
- `Internal Project`
- `Archived Project`
- `Concept Project`

Only add a `liveUrl` when the link works publicly. For archived work, add proof images and leave `liveUrl` empty.

## How To Update Pricing

Edit the `pricing` array in `site.config.js`. The homepage and services page will update after running:

```bash
node scripts/generate-pages.mjs
```

## How To Replace Images

Place optimized assets in `public/` and update the relevant image paths in `site.config.js`.

Current important assets:

- `public/brand/` - Nexora Digital logos
- `public/clients/growth-nest-logo.png` - Growth Nest public proof/logo asset
- `public/clients/growth-nest-proof.png` - Growth Nest archived proof asset copied from the uploaded proof file
- `public/agency/` - website and marketing visual assets

## How To Add Testimonials Later

Do not add fake reviews. Add a real reviews section only after you have genuine client permission and real review text. Until then, the site uses “What Clients Can Expect” principles.

## Current Limitations

- Web3Forms key must be added before live form submissions work.
- GA4, GTM, and Search Console IDs are placeholders only.
- Growth Nest is shown as archived client work because the public live deployment is no longer available.
- Legal pages are practical drafts and should be professionally reviewed before the business scales.
