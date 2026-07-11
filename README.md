# Nexora Digital Website

Professional static website for Nexora Digital, a growing digital agency helping small businesses, startups, local brands, and service professionals with websites, SEO foundations, content planning, analytics setup, and practical digital support.

## Features

- Responsive homepage, services, portfolio/case studies, blog, contact, legal pages, and 404 page
- Light and dark mode with saved theme preference
- Honest project labels: live client, live internal, personal, concept, and archived work
- Live Growth Nest client case study with real website screenshots
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
- `public/` - brand assets, client website screenshots, agency images, sitemap, and robots
- `index.html`, `services.html`, `portfolio.html`, `case-study-growth-nest.html`, `blog.html`, `contact.html` - main pages
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
searchConsoleVerification: ''
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

Only add a `liveUrl` when the link works publicly. Use `caseStudyUrl` when a project has a dedicated case-study page. Growth Nest is a live client project at `https://growth-fawn-two.vercel.app/`.

## How To Update Pricing

Pricing is centralized in `site.config.js`.

- `pricing` controls the four featured homepage packages.
- `pricingCatalog` controls the complete `pricing.html` catalogue.
- `addOns` controls optional add-on pricing.
- `individualContentPrices` controls small content-task pricing.
- `paymentTerms` controls the payment terms section.
- `pricingFaqs` controls pricing FAQ content and schema.
- `introOffer.enabled` turns the introductory offer banner on or off.

The homepage packages currently shown are:

- Landing Page
- Business Website
- Social Growth
- Local Business Package

To add a new package, add it to the correct `pricingCatalog` group with `name`, `price`, `billing`, `suitableFor`, `delivery`, `includes`, and optional `badge`, `note`, or `excludes`.

Pricing CTAs link to `contact.html?package=package-slug#audit`. `main.js` reads the `package` query value and preselects the matching package in the contact form.

After editing pricing data, run:

```bash
node scripts/generate-pages.mjs
```

Then run the production build again.

Costs excluded unless clearly included in the final scope:

- Domain
- Hosting
- Premium plugins or paid tools
- Advertising budget
- Payment-gateway charges
- Product photography
- Advanced video production
- Third-party platform fees

## How To Replace Images

Place optimized assets in `public/` and update the relevant image paths in `site.config.js`.

Current important assets:

- `public/brand/` - Nexora Digital logos
- `public/clients/growth-nest-homepage.webp` - real Growth Nest homepage screenshot
- `public/clients/growth-nest-services.webp` - real Growth Nest section screenshot
- `public/clients/growth-nest-mobile.webp` - real Growth Nest mobile-size screenshot
- `public/clients/growth-nest-contact.webp` - real Growth Nest contact/CTA screenshot
- `public/agency/` - website and marketing visual assets

## How To Add Testimonials Later

Do not add fake reviews. Add a real reviews section only after you have genuine client permission and real review text. Until then, the site uses “What Clients Can Expect” principles.

## Current Limitations

- Web3Forms key must be added before live form submissions work.
- GA4 and GTM IDs are placeholders only.
- Search Console verification is omitted until a real code is configured.
- Growth Nest is shown as live client work using the public URL `https://growth-fawn-two.vercel.app/`.
- Legal pages are practical drafts and should be professionally reviewed before the business scales.
