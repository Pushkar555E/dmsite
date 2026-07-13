import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { addOns, faqs, individualContentPrices, introOffer, paymentTerms, pricing, pricingCatalog, pricingFaqs, projects, services, site } from '../site.config.js';

const year = new Date().getFullYear();
const pages = [];

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const url = (path = '/') => `${site.baseUrl}${path}`;
const waText = encodeURIComponent('Hi Nexora Digital, I want a free website audit.');
const whatsappAudit = `${site.whatsapp}?text=${waText}`;

const nav = [
  ['Home', 'index.html'],
  ['Services', 'services.html'],
  ['Pricing', 'pricing.html'],
  ['Portfolio', 'portfolio.html'],
  ['Case Studies', 'case-study-growth-nest.html'],
  ['Blog', 'blog.html'],
  ['Contact', 'contact.html']
];

const logo = `<img class="logo-img logo-light" src="/brand/nexora-logo-light.png" width="360" height="105" alt="Nexora Digital logo"><img class="logo-img logo-dark" src="/brand/nexora-logo-dark.png" width="360" height="105" alt="Nexora Digital logo">`;
const themeToggle = `<button class="theme-switch" id="themeToggle" type="button" aria-label="Toggle dark mode" aria-pressed="false"><span class="theme-switch-track" aria-hidden="true"><span class="theme-switch-thumb"></span></span><span class="theme-switch-text">Light</span></button>`;

function header(active = 'Home') {
  const links = nav.map(([label, href]) => `<a ${label === active ? 'aria-current="page"' : ''} href="${href}">${label}</a>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="siteHeader">
    <nav class="nav-shell" aria-label="Primary navigation">
      <a class="brand logo-component" href="index.html" aria-label="Nexora Digital home">${logo}</a>
      <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
      <div class="nav-links" id="navLinks">${links}</div>
      <div class="nav-actions">
        ${themeToggle}
        <a class="btn btn-primary nav-cta" data-track="audit_cta" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open Nexora SiteLens free audit, opens in a new tab">Free Audit</a>
      </div>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="footer">
    <div class="container footer-grid">
      <div>
        <a class="footer-logo logo-component" href="index.html" aria-label="Nexora Digital home">${logo}</a>
        <p>Nexora Digital helps small businesses, startups, local brands, and service professionals build practical websites, SEO foundations, and digital growth systems.</p>
        <p>${site.serviceArea}</p>
      </div>
      <div><h2>Services</h2><a href="services.html#website-services">Website development</a><a href="services.html#marketing-services">Local SEO</a><a href="services.html#marketing-services">Social media planning</a><a href="services.html#analytics-support">Analytics setup</a></div>
      <div><h2>Pages</h2><a href="pricing.html">Pricing</a><a href="portfolio.html">Portfolio</a><a href="case-study-growth-nest.html">Featured client work: Growth Nest</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms</a><a href="refund.html">Refund Policy</a></div>
      <div><h2>Contact</h2><a data-track="email_click" href="mailto:${site.email}">${site.email}</a><a data-track="whatsapp_click" href="${site.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${site.phone}</a><a href="${site.socials.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a><a href="${site.socials.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a></div>
    </div>
    <div class="footer-bottom">&copy; ${year} Nexora Digital. Built by Nexora Digital.</div>
  </footer>`;
}

function baseHead({ title, description, path = '/', image = '/agency/hero-strategy-room.png', extra = '' }) {
  const canonical = url(path);
  return `<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${url(image)}">
  <meta property="og:site_name" content="${site.brand}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${url(image)}">
  ${site.placeholders.searchConsoleVerification ? `<meta name="google-site-verification" content="${site.placeholders.searchConsoleVerification}">` : ''}
  <link rel="icon" type="image/png" href="/brand/nexora-icon.png">
  <link rel="preload" as="image" href="/agency/hero-strategy-room.png" fetchpriority="high">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
  <script>if (localStorage.getItem('nexora-theme') === 'dark') document.documentElement.classList.add('dark-mode');</script>
  <link rel="stylesheet" href="./index.css">
  ${extra}`;
}

function layout(page) {
  pages.push(page.path);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${baseHead(page)}
</head>
<body>
  ${header(page.active)}
  <main id="main">
    ${page.body}
  </main>
  ${footer()}
  <script type="module" src="./main.js"></script>
</body>
</html>`;
}

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const serviceId = (group) => group.group === 'Website Services' ? 'website-services' : group.group === 'Marketing Services' ? 'marketing-services' : 'analytics-support';
const serviceCards = services.map((group) => `<section class="section-pad" id="${serviceId(group)}"><div class="container section-head left"><span class="eyebrow">${group.group}</span><h2>${group.group === 'Website Services' ? 'Professional websites for real business needs.' : group.group === 'Marketing Services' ? 'Practical marketing foundations without inflated promises.' : 'Simple measurement and support after launch.'}</h2></div><div class="container service-grid detailed">${group.items.map(([name, audience, includes, timeline, related]) => `<article class="service-card"><span>${group.group}</span><h3>${name}</h3><p><strong>Who it is for:</strong> ${audience}</p><p><strong>What is included:</strong> ${includes}</p><p><strong>Timeline:</strong> ${timeline}</p><p><strong>Pricing:</strong> Related package: ${related}</p><a data-track="service_click" href="contact.html?package=${slug(related)}#audit">Discuss ${name}</a></article>`).join('')}</div></section>`).join('');

const packageOptions = [
  ...pricing.map((plan) => [plan.name, plan.price]),
  ...pricingCatalog.flatMap((group) => group.packages.map((plan) => [plan.name, plan.price])),
  ...addOns.map(([name, price]) => [name, price])
].filter((item, index, arr) => arr.findIndex((next) => next[0] === item[0]) === index);
const contactHref = (plan) => `contact.html?package=${slug(plan.name)}#audit`;
const featuredClass = (plan) => plan.featured === 'primary' ? 'primary-featured' : plan.featured ? 'soft-featured' : '';
const billingLabel = (plan) => plan.billing || (plan.price.includes('/month') ? 'Per month' : 'One-time');
const shortPackageCta = (plan) => plan.cta || (plan.featured === 'primary' ? 'Choose package' : 'Request quote');
const keyFeatures = (plan, count = 3) => plan.includes.filter((item) => item !== plan.support && item !== plan.revisions).slice(0, count);
const priceCards = pricing.map((plan) => `<article class="pricing-card popular-card ${featuredClass(plan)}">${plan.badge ? `<span class="badge">${plan.badge}</span>` : ''}<span>${plan.pages}</span><h3>${plan.name}</h3><p>${plan.audience || plan.note}</p><strong>${plan.price}</strong><small>${billingLabel(plan)}</small><ul>${keyFeatures(plan, 6).map((item) => `<li>${item}</li>`).join('')}</ul><div class="package-meta"><span>${plan.delivery}</span><span>${plan.support}</span></div><p class="pricing-note">${plan.note}</p><div class="card-actions"><a class="btn ${plan.featured === 'primary' ? 'btn-primary' : 'btn-secondary'}" data-track="pricing_cta" href="${contactHref(plan)}">${shortPackageCta(plan)}</a><a class="text-link" href="pricing.html#${slug(plan.name)}">View full details</a></div></article>`).join('');
const packageCard = (plan) => `<article class="pricing-card package-card ${featuredClass(plan)}" id="${slug(plan.name)}">${plan.badge ? `<span class="badge">${plan.badge}</span>` : ''}<span>${billingLabel(plan)}</span><h3>${plan.name}</h3><strong>${plan.price}</strong><p><strong>Best for:</strong> ${plan.suitableFor}</p><div class="package-meta"><span>Delivery: ${plan.delivery}</span><span>${plan.support ? `Support: ${plan.support}` : billingLabel(plan)}</span></div><ul class="feature-preview">${keyFeatures(plan).map((item) => `<li>${item}</li>`).join('')}</ul><a class="btn ${plan.featured === 'primary' ? 'btn-primary' : 'btn-secondary'}" data-track="pricing_cta" href="${contactHref(plan)}">Request quote</a><details class="package-details"><summary>View full details</summary><div class="details-grid"><div><h4>Included</h4><ul>${plan.includes.map((item) => `<li>${item}</li>`).join('')}</ul></div>${plan.excludes ? `<div class="not-included"><h4>Not included</h4><ul>${plan.excludes.map((item) => `<li>${item}</li>`).join('')}</ul></div>` : ''}</div>${plan.note ? `<p>${plan.note}</p>` : ''}</details></article>`;
const pricingNavItems = [
  ['Websites', 'website-pricing'],
  ['Maintenance', 'maintenance-pricing'],
  ['SEO', 'seo-pricing'],
  ['Social Media', 'social-pricing'],
  ['Advertising', 'ads-pricing'],
  ['Branding', 'branding-pricing'],
  ['Local Bundles', 'local-bundles'],
  ['Add-ons', 'add-ons'],
  ['Terms', 'payment-terms'],
  ['FAQ', 'pricing-faq']
];
const pricingNav = pricingNavItems.map(([label, id]) => `<a href="#${id}" data-pricing-nav>${label}</a>`).join('');
const pricingCategoryCopy = {
  'website-pricing': ['Website packages', 'Build a professional online presence.'],
  'maintenance-pricing': ['Website care', 'Keep your website secure and updated.'],
  'seo-pricing': ['Search visibility', 'Help customers find your business online.'],
  'social-pricing': ['Social content', 'Stay visible with consistent branded content.'],
  'ads-pricing': ['Paid campaigns', 'Launch focused campaigns with clear management fees.'],
  'branding-pricing': ['Brand design', 'Create a consistent and recognisable business identity.'],
  'local-bundles': ['For nearby businesses', 'Practical packages for local business growth.']
};
const compactTable = (rows, caption) => `<div class="table-wrap compact-table" role="region" aria-label="${caption}" tabindex="0"><table><caption>${caption}</caption><thead><tr><th scope="col">Item</th><th scope="col">Price</th></tr></thead><tbody>${rows.map(([name, price]) => `<tr><td>${name}</td><td>${price}</td></tr>`).join('')}</tbody></table></div>`;
const findPlan = (name) => pricingCatalog.flatMap((group) => group.packages).find((plan) => plan.name === name);
const comparePlans = ['Basic Landing Page', 'Starter Website', 'Business Website', 'Advanced Business Website'].map(findPlan);
const bool = (value) => value ? 'Yes' : 'No';
const featureHas = (plan, tests) => {
  const haystack = [plan.name, plan.suitableFor, ...plan.includes].join(' ').toLowerCase();
  return tests.some((test) => haystack.includes(test));
};
const websiteComparisonRows = [
  ['Price', ...comparePlans.map((plan) => plan.price)],
  ['Pages', 'One page', 'Up to three pages', 'Up to five pages', 'Up to eight pages'],
  ['Responsive design', ...comparePlans.map((plan) => bool(featureHas(plan, ['responsive', 'mobile'])))],
  ['Contact form', ...comparePlans.map((plan) => bool(featureHas(plan, ['contact form', 'enquiry form'])))],
  ['WhatsApp', ...comparePlans.map((plan) => bool(featureHas(plan, ['whatsapp'])))],
  ['Google Maps', ...comparePlans.map((plan) => bool(featureHas(plan, ['maps'])))],
  ['Basic SEO', ...comparePlans.map((plan) => bool(featureHas(plan, ['seo'])))],
  ['Analytics', ...comparePlans.map((plan) => bool(featureHas(plan, ['analytics'])))],
  ['Search Console', ...comparePlans.map((plan) => bool(featureHas(plan, ['search console'])))],
  ['Revisions', 'One revision round', 'Two revision rounds', 'Two revision rounds', 'Three revision rounds'],
  ['Support', ...comparePlans.map((plan) => plan.support || 'By scope')],
  ['Delivery', ...comparePlans.map((plan) => plan.delivery)]
];
const websiteComparison = `<div class="container comparison-block">${compactTable(websiteComparisonRows.map(([item, ...values]) => [item, values.join('|')]), 'Compare the core website packages.').replace('<th scope="col">Price</th>', comparePlans.map((plan) => `<th scope="col">${plan.name}</th>`).join('')).replaceAll(/<tr><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g, (_match, item, values) => `<tr><th scope="row">${item}</th>${values.split('|').map((value) => `<td>${value}</td>`).join('')}</tr>`)}</div>`;
const helperOptions = [
  ['website', 'I need a website', ['Landing Page', 'Business Website']],
  ['visibility', 'I want more local visibility', ['Local SEO Setup', 'Local Business Package']],
  ['social', 'I need regular social content', ['Social Starter', 'Social Growth']],
  ['launch', 'I am launching a new business', ['Local Starter Package', 'Complete Business Launch']]
];
const helperCards = helperOptions.map(([id, label, names], index) => {
  const matches = names.map((name) => packageOptions.find(([optionName]) => optionName === name)).filter(Boolean);
  const result = `<strong>${matches.map(([name]) => name).join(' + ')}</strong><span>${matches.map(([name, price]) => `${name}: ${price}`).join(' · ')}</span><a class="btn btn-secondary" href="contact.html?package=${slug(matches[0][0])}#audit">Request quote</a>`;
  return `<button class="helper-card ${index === 0 ? 'active' : ''}" type="button" data-recommendation="${id}" data-result="${esc(result)}"><span>${label}</span><small>${matches.map(([name]) => name).join(' / ')}</small></button>`;
}).join('');
const paymentCards = paymentTerms.slice(0, 4).map((term, index) => `<article><strong>${index + 1}</strong><p>${term}</p></article>`).join('');
const pricingFaqGroups = [
  ['Pricing and payment', pricingFaqs.slice(0, 4)],
  ['Websites and delivery', pricingFaqs.slice(4, 7)],
  ['Marketing expectations', pricingFaqs.slice(7, 10)],
  ['Support and maintenance', pricingFaqs.slice(10)]
];
const pricingFaqMarkup = pricingFaqGroups.map(([title, items]) => `<section class="faq-group"><h3>${title}</h3>${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`).join('');
const pricingFaqSchema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pricingFaqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });

const statusBadge = (status) => `<span class="status-pill" aria-label="Project status: ${esc(status)}"><span aria-hidden="true"></span>${status}</span>`;
const browserFrame = (image, alt, width = 1440, height = 1100, label = 'growth-fawn-two.vercel.app') => `<div class="browser-frame"><div class="browser-bar" aria-hidden="true"><span></span><span></span><span></span><small>${label}</small></div><img src="${image}" width="${width}" height="${height}" loading="lazy" decoding="async" alt="${alt}"></div>`;
const projectCards = projects.map((project) => {
  const liveLabel = project.liveLabel || 'Visit Live Website';
  const liveAction = project.liveUrl ? `<a class="btn btn-primary" data-track="project_click" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="${liveLabel} for ${project.name}, opens in a new tab">${liveLabel}</a>` : '';
  const caseAction = project.caseStudyUrl ? `<a class="btn btn-secondary" href="${project.caseStudyUrl}">${project.detailLabel || 'View Case Study'}</a>` : `<button class="btn btn-secondary" type="button" data-project-open="${project.id}">View Project Details</button>`;
  const coverClass = ['growth-nest', 'nexora-sitelens'].includes(project.id) ? 'project-cover website-cover' : 'project-cover logo-cover';
  const imageAlt = project.id === 'growth-nest' ? `${project.name} live website screenshot` : project.id === 'nexora-sitelens' ? 'Nexora SiteLens website audit dashboard' : `${project.name} project visual`;
  return `<article class="project-card ${project.id === 'growth-nest' ? 'featured-project-card' : ''}" data-category="${project.category.toLowerCase().split(' ')[0]}"><div class="${coverClass}"><img src="${project.image}" width="1440" height="1100" loading="lazy" decoding="async" alt="${imageAlt}"></div>${statusBadge(project.status)}<h3>${project.name}</h3><p>${project.background}</p><div class="project-actions">${liveAction}${caseAction}</div></article>`;
}).join('');

const projectModals = projects.map((project) => `<section class="project-modal" id="project-${project.id}" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="${project.id}-title">
  <div class="modal-card" tabindex="-1">
    <button class="modal-close" type="button" data-modal-close aria-label="Close project details">&times;</button>
    <div class="modal-grid">
      <img src="${project.detailImage}" width="1440" height="1100" alt="${project.name} website screenshot">
      <div>
        <span class="eyebrow">${project.status}</span>
        <h2 id="${project.id}-title">${project.name}</h2>
        <p>${project.background}</p>
        <h3>My role</h3><p>${project.role}</p>
        <h3>Main work completed</h3><ul>${project.work.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>Tools or technologies</h3><p>${project.tools.join(', ')}</p>
        <h3>Key features</h3><ul>${project.features.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>Current status</h3><p>${project.status}.${project.liveUrl ? ` <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="${project.liveLabel || 'Visit Live Website'} for ${project.name}, opens in a new tab">${project.liveLabel || 'Visit the live website'}</a>.` : ''}</p>
        ${project.caseStudyUrl ? `<a class="btn btn-secondary" href="${project.caseStudyUrl}">${project.detailLabel || 'View Case Study'}</a>` : ''}
      </div>
    </div>
  </div>
</section>`).join('');

const faqSchema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });

const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'ProfessionalService', name: site.brand, url: site.baseUrl, image: url('/agency/hero-strategy-room.png'), logo: url('/brand/nexora-logo-dark.png'), email: site.email, telephone: site.phone, areaServed: ['West Bengal', 'India'], description: site.description, sameAs: [site.socials.facebook, site.socials.instagram] },
    { '@type': 'Person', name: 'Pushkar Biswas', jobTitle: 'Founder, Nexora Digital', worksFor: { '@type': 'Organization', name: site.brand }, description: 'Computer Science and Technology diploma student focused on website development, digital marketing, SEO fundamentals, content planning, analytics foundations, AI-assisted workflows, and continuous technical learning.' },
    { '@type': 'WebSite', name: site.brand, url: site.baseUrl }
  ]
});

const home = layout({
  path: '/',
  active: 'Home',
  title: 'Nexora Digital | Websites and Marketing for Growing Businesses',
  description: site.description,
  extra: `<script type="application/ld+json">${organizationSchema}</script><script type="application/ld+json">${faqSchema}</script>`,
  body: `<section class="hero section-pad">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <span class="eyebrow">For small businesses, startups, and service brands</span>
        <h1>Websites and digital marketing systems built to help growing businesses earn trust and generate enquiries.</h1>
        <p>Nexora Digital creates professional websites, local SEO foundations, content systems, and practical digital strategies for small businesses, startups, and service brands.</p>
        <div class="hero-actions"><a class="btn btn-primary" data-track="audit_cta" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open Nexora SiteLens free audit, opens in a new tab">Get a Free Website Audit</a><a class="btn btn-secondary" href="portfolio.html">View Our Work</a><a class="btn btn-quiet" data-track="whatsapp_click" href="${whatsappAudit}" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div>
        <div class="trust-row"><span>Website development</span><span>SEO foundations</span><span>Social media support</span><span>Direct founder communication</span></div>
      </div>
      <div class="hero-visual reveal"><img src="/agency/hero-strategy-room.png" width="1200" height="850" alt="Nexora Digital website planning and marketing strategy workspace" fetchpriority="high" decoding="async"></div>
    </div>
  </section>
  <section class="stats section-pad-sm"><div class="container stats-grid"><div class="stat-card"><strong>Web</strong><span>Responsive websites</span></div><div class="stat-card"><strong>SEO</strong><span>Search basics</span></div><div class="stat-card"><strong>Content</strong><span>Planning support</span></div><div class="stat-card"><strong>Support</strong><span>Clear communication</span></div></div></section>
  <section class="section-pad audit-offer" id="audit"><div class="container split-layout"><div><span class="eyebrow">Free audit offer</span><h2>Free Website Audit With SiteLens</h2><p>Before you spend on redesigns or marketing, run a practical SiteLens review of what may be blocking trust and enquiries.</p><div class="chip-list"><span>Performance</span><span>SEO basics</span><span>Accessibility</span><span>Security headers</span><span>Mobile usability</span><span>Technical health</span></div></div><div class="cta-card"><h3>Launch SiteLens</h3><p>Open the deployed Nexora SiteLens product and run a demo website audit in a new tab.</p><a class="btn btn-primary" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open Nexora SiteLens free audit, opens in a new tab">Launch SiteLens</a><a class="btn btn-secondary" data-track="whatsapp_click" href="${whatsappAudit}" target="_blank" rel="noopener noreferrer">Request on WhatsApp</a><a class="btn btn-quiet" data-track="email_click" href="mailto:${site.email}?subject=Free%2010-Point%20Website%20Audit">Email Nexora</a></div></div></section>
  <section class="section-pad" id="services"><div class="container section-head"><span class="eyebrow">Core services</span><h2>Clear services for businesses that need a stronger digital presence.</h2><p>No inflated promises. Just useful website, SEO, content, and support work.</p></div><div class="container service-grid"><article class="service-card"><span>Website Services</span><h3>Landing pages and small business websites</h3><p>Professional pages built for trust, mobile use, and enquiry flow.</p><a href="services.html#website-services">Explore website services</a></article><article class="service-card"><span>Marketing Services</span><h3>Local SEO and content planning</h3><p>Practical foundations that help people understand and find your business.</p><a href="services.html#marketing-services">Explore marketing services</a></article><article class="service-card"><span>Analytics and Support</span><h3>Tracking, updates, and maintenance</h3><p>Simple measurement and ongoing support after launch.</p><a href="services.html#analytics-support">Explore support</a></article></div></section>
  <section class="section-pad alt" id="portfolio"><div class="container section-head"><span class="eyebrow">Featured projects</span><h2>Real work with clear labels and direct links.</h2><p>Growth Nest is live client work. Nexora Digital and SiteLens are internal Nexora projects with honest labels and direct links.</p></div><div class="container portfolio-grid">${projectCards}</div></section>
  <section class="section-pad" id="case-studies"><div class="container featured-case-card live-client-showcase"><div class="featured-case-copy"><span class="eyebrow">Featured Client Project</span>${statusBadge('Live Client Project')}<h2>Growth Nest — a live digital marketing agency website.</h2><p>Nexora Digital designed and developed the Growth Nest website to present its digital marketing services, strengthen its online brand presence and guide visitors towards enquiry and contact actions.</p><div class="case-detail-row"><span><strong>Client</strong>Growth Nest</span><span><strong>Project type</strong>Client Website</span><span><strong>Status</strong>Live</span><span><strong>Service</strong>Website Design &amp; Development</span></div><div class="case-actions"><a class="btn btn-primary" href="${site.growthNestUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit Growth Nest live website, opens in a new tab">Visit Live Website</a><a class="btn btn-secondary" href="case-study-growth-nest.html">View Case Study</a></div></div><a class="featured-case-media browser-preview-link" href="${site.growthNestUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit Growth Nest live website, opens in a new tab">${browserFrame('/clients/growth-nest-homepage.webp', 'Growth Nest live website homepage screenshot', 1440, 1100)}</a></div></section>
  <section class="section-pad alt"><div class="container section-head"><span class="eyebrow">How Nexora works</span><h2>A simple process with clear communication.</h2></div><div class="container process-grid"><div><strong>1</strong><h3>Review</h3><p>Understand your business, audience, current website, and goals.</p></div><div><strong>2</strong><h3>Plan</h3><p>Choose a practical scope, timeline, content needs, and budget.</p></div><div><strong>3</strong><h3>Build</h3><p>Create the website, SEO basics, forms, links, and launch checklist.</p></div><div><strong>4</strong><h3>Support</h3><p>Review, improve, and guide the next digital steps after launch.</p></div></div></section>
  <section class="section-pad" id="founder"><div class="container split-layout"><div><span class="eyebrow">Founder</span><h2>Built by Pushkar Biswas.</h2><p>Pushkar Biswas is a Computer Science and Technology diploma student with an interest in website development, digital marketing, technology, and practical business tools. He created Nexora Digital to help small businesses and growing brands establish a professional digital presence without unnecessary complexity.</p><div class="chip-list"><span>Website development</span><span>Digital marketing</span><span>SEO fundamentals</span><span>Content planning</span><span>Analytics foundations</span><span>AI-assisted workflows</span><span>Continuous technical learning</span></div></div><div class="founder-card logo-component">${logo}</div></div></section>
  <section class="section-pad alt" id="pricing"><div class="container section-head"><span class="eyebrow">Pricing</span><h2>Transparent starting prices in Indian rupees.</h2><p>Final pricing depends on project scope, content, integrations, timeline, and support requirements.</p></div><div class="container pricing-grid">${priceCards}</div><div class="container center-link"><a class="btn btn-primary" href="pricing.html">View Complete Pricing</a></div></section>
  <section class="section-pad"><div class="container section-head"><span class="eyebrow">What Clients Can Expect</span><h2>Real working principles, ready for real reviews later.</h2></div><div class="container expectation-grid"><article><h3>Clear communication</h3><p>Direct, practical updates throughout the project.</p></article><article><h3>Honest scope</h3><p>Clear deliverables before work begins.</p></article><article><h3>Mobile-first execution</h3><p>Layouts checked on small and large screens.</p></article><article><h3>Transparent pricing</h3><p>Starting prices plus scoped quotes for complex needs.</p></article><article><h3>Practical recommendations</h3><p>Advice focused on what helps the business next.</p></article><article><h3>Support after launch</h3><p>Guidance and maintenance options after handoff.</p></article></div></section>
  <section class="section-pad alt" id="faq"><div class="container section-head"><span class="eyebrow">FAQ</span><h2>Common questions before starting.</h2></div><div class="container faq-list">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>
  ${contactSection('homepage-contact')}
  <section class="section-pad final-cta"><div class="container cta-card"><h2>Ready to improve your website or digital presence?</h2><p>Start with a SiteLens audit and a practical next-step plan.</p><a class="btn btn-primary" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open Nexora SiteLens free audit, opens in a new tab">Get a Free Website Audit</a></div></section>
  ${projectModals}`
});

function contactSection(id = 'audit') {
  return `<section class="section-pad" id="${id}"><div class="container contact-grid"><div class="section-head left"><span class="eyebrow">Contact</span><h2>Request your free website audit or project quote.</h2><p>Share your details and Nexora Digital will respond with practical next steps.</p><div class="contact-details"><a data-track="email_click" href="mailto:${site.email}">${site.email}</a><a data-track="whatsapp_click" href="${whatsappAudit}" target="_blank" rel="noopener noreferrer">WhatsApp: ${site.phone}</a><a href="${site.socials.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a><a href="${site.socials.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a><span>${site.serviceArea}</span></div></div>
    <form class="contact-form" data-contact-form action="https://api.web3forms.com/submit" method="POST" novalidate>
      <input type="hidden" name="access_key" value="${site.placeholders.web3formsAccessKey}">
      <input type="checkbox" name="botcheck" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="form-row"><label for="${id}-name">Full name</label><input id="${id}-name" name="name" type="text" autocomplete="name" required></div>
      <div class="form-row"><label for="${id}-email">Email</label><input id="${id}-email" name="email" type="email" autocomplete="email" required></div>
      <div class="form-row"><label for="${id}-phone">Phone or WhatsApp number</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" required></div>
      <div class="form-row"><label for="${id}-brand">Company or brand</label><input id="${id}-brand" name="company" type="text" required></div>
      <div class="form-row"><label for="${id}-service">Required service</label><select id="${id}-service" name="service" required><option value="">Select a service</option><option>Free 10-Point Website Audit</option><option>Website Design and Development</option><option>Website Maintenance</option><option>SEO Services</option><option>Social Media Design and Management</option><option>Paid Advertising Services</option><option>Branding and Graphic Design</option><option>Local Business Package</option></select></div>
      <div class="form-row"><label for="${id}-package">Selected package</label><select id="${id}-package" name="selected_package" data-package-select required><option value="">Select package</option>${packageOptions.map(([name, price]) => `<option value="${slug(name)}">${name} — ${price}</option>`).join('')}</select></div>
      <div class="form-row"><label for="${id}-budget">Estimated budget</label><select id="${id}-budget" name="budget" required><option value="">Select budget</option><option>Under ₹5,000</option><option>₹5,000 - ₹10,000</option><option>₹10,000 - ₹25,000</option><option>₹25,000+</option><option>Not sure yet</option></select></div>
      <div class="form-row"><label for="${id}-timeline">Desired timeline</label><select id="${id}-timeline" name="timeline" required><option value="">Select timeline</option><option>Within 1 week</option><option>Within 2 weeks</option><option>This month</option><option>Flexible</option></select></div>
      <div class="form-row full"><label for="${id}-message">Project details</label><textarea id="${id}-message" name="message" rows="5" required></textarea></div>
      <label class="consent full"><input name="consent" type="checkbox" required> I agree to be contacted about this enquiry and understand the privacy policy.</label>
      <button class="btn btn-primary full" type="submit" data-submit-label="Send Request">Send Request</button>
      <p class="form-status full" role="status" aria-live="polite"></p>
      <p class="form-note full">Form provider: Web3Forms. Replace the placeholder access key in <code>site.config.js</code> before using the live form.</p>
    </form></div></section>`;
}

const servicesPage = layout({ path: '/services.html', active: 'Services', title: 'Services | Nexora Digital', description: 'Website services, local SEO, social media planning, analytics setup, and maintenance for small businesses and growing brands.', body: `<section class="page-hero"><img src="/agency/service-workspace.png" width="1200" height="750" alt="Website and marketing planning workspace" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Services</span><h1>Practical digital services for growing businesses.</h1><p>Choose one focused service or combine website, SEO, content, analytics, and support into a simple growth plan.</p></div></section>${serviceCards}<section class="section-pad-sm"><div class="container client-trust-strip"><div><span class="eyebrow">Website design example</span><h2>See how Nexora built the Growth Nest website.</h2><p>Growth Nest is a live client website showing service presentation, navigation, brand identity and contact-focused calls to action.</p></div><div class="case-actions"><a class="btn btn-primary" href="case-study-growth-nest.html">View Case Study</a><a class="btn btn-secondary" href="${site.growthNestUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit Growth Nest live website, opens in a new tab">Visit Live Website</a></div></div></section><section class="section-pad alt" id="pricing"><div class="container section-head"><span class="eyebrow">Pricing summary</span><h2>Starting prices that are easy to edit.</h2><p>Final pricing depends on project scope, content, integrations, timeline, and support requirements.</p></div><div class="container pricing-grid">${priceCards}</div><div class="container center-link"><a class="btn btn-primary" href="pricing.html">View Complete Pricing</a></div></section>${contactSection('service-contact')}` });

const pricingPage = layout({ path: '/pricing.html', active: 'Pricing', title: 'Affordable Website & Digital Marketing Pricing | Nexora Digital', description: 'Affordable website design, SEO, social media, branding, paid advertising and local business package pricing for West Bengal and India.', image: '/agency/analytics-command-center.png', extra: `<script type="application/ld+json">${pricingFaqSchema}</script>`, body: `<section class="pricing-hero section-pad">
    <div class="container pricing-hero-grid">
      <div>
        <span class="eyebrow">Simple, transparent pricing</span>
        <h1>Choose the digital support your business needs.</h1>
        <p>Clear starting prices for websites, SEO, social media, branding and local business packages. Every project receives a written scope and final quotation before work begins.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="#popular-packages">Explore Packages</a><a class="btn btn-secondary" href="contact.html#audit">Request a Custom Quote</a></div>
        <div class="trust-row pricing-trust-row"><span>Clear project scope</span><span>No hidden service fees</span><span>Flexible local-business packages</span></div>
      </div>
      <aside class="pricing-summary-card" aria-label="Pricing summary">
        <span>Starting points</span>
        <h2>Quick budget guide</h2>
        <div class="summary-price-grid"><div><strong>Websites</strong><span>from ₹1,499</span></div><div><strong>SEO</strong><span>from ₹499</span></div><div><strong>Social media</strong><span>from ₹1,499/month</span></div><div><strong>Local bundles</strong><span>from ₹3,999</span></div></div>
        <p>Final pricing depends on pages, content, integrations, timeline and support requirements.</p>
      </aside>
    </div>
  </section>
  ${introOffer.enabled ? `<section class="section-pad-sm"><div class="container intro-offer-card"><div><span class="eyebrow">Introductory Client Offer</span><h2>Save 10% on eligible website packages.</h2><p>${introOffer.note}</p></div><ul>${introOffer.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}</ul><a class="btn btn-primary" href="contact.html?package=business-website#audit">Claim Introductory Offer</a></div></section>` : ''}
  <section class="section-pad" id="popular-packages"><div class="container section-head"><span class="eyebrow">Popular packages</span><h2>Start with the package closest to your need.</h2><p>A written project scope and final quotation will be shared before work begins.</p></div><div class="container pricing-grid">${priceCards}</div></section>
  <section class="section-pad-sm"><div class="container package-helper"><div><span class="eyebrow">Package helper</span><h2>Not sure what to choose?</h2><p>Pick the situation closest to your business and see the most relevant starting options.</p></div><div class="helper-options" role="tablist" aria-label="Package recommendations">${helperCards}</div><div class="helper-result" id="packageHelperResults" role="status" aria-live="polite"></div></div></section>
  <nav class="container pricing-nav" aria-label="Pricing categories">${pricingNav}</nav>
  <section class="section-pad-sm"><div class="container client-trust-strip"><div><span class="eyebrow">Live client website</span><h2>See Growth Nest in action.</h2><p>Growth Nest is a live client website built to present digital marketing services and create visible enquiry paths.</p></div><div class="case-actions"><a class="btn btn-primary" href="${site.growthNestUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit Growth Nest live website, opens in a new tab">Visit Live Website</a><a class="btn btn-secondary" href="case-study-growth-nest.html">View Growth Nest Case Study</a></div></div></section>
  ${pricingCatalog.map((group) => {
    const copy = pricingCategoryCopy[group.id] || [group.title, group.title];
    return `<section class="section-pad pricing-category ${group.id === 'local-bundles' ? 'alt' : ''}" id="${group.id}"><div class="container section-head"><span class="eyebrow">${copy[0]}</span><h2>${copy[1]}</h2><p>${group.note}</p></div>${group.id === 'website-pricing' ? websiteComparison : ''}<div class="container pricing-grid catalog-grid">${group.packages.map(packageCard).join('')}</div></section>`;
  }).join('')}
  <section class="section-pad alt" id="content-pricing"><div class="container split-layout"><div><span class="eyebrow">Individual content prices</span><h2>Small content tasks when you do not need a full package.</h2><p>Bulk pricing may be available for ten or more designs.</p></div>${compactTable(individualContentPrices, 'Individual content pricing')}</div></section>
  <section class="section-pad" id="add-ons"><div class="container section-head"><span class="eyebrow">Optional services</span><h2>Add only what your project needs.</h2><p>Domain, hosting, premium tools, advertising budgets and third-party charges are separate unless clearly mentioned.</p></div><div class="container">${compactTable(addOns, 'Optional add-on pricing')}</div></section>
  <section class="section-pad alt"><div class="container section-head"><span class="eyebrow">Next steps</span><h2>What happens after you choose a package?</h2></div><div class="container process-grid pricing-steps"><div><strong>1</strong><h3>Share requirements</h3><p>Send your business details, preferred package and goals.</p></div><div><strong>2</strong><h3>Confirm scope</h3><p>Nexora Digital prepares a written scope and final quote.</p></div><div><strong>3</strong><h3>Start work</h3><p>Work begins after the agreed advance and project materials are received.</p></div><div><strong>4</strong><h3>Review and handover</h3><p>You review the work, request included revisions, then receive the final handover.</p></div></div></section>
  <section class="section-pad" id="payment-terms"><div class="container section-head"><span class="eyebrow">Payment terms</span><h2>Clear payment and handover terms.</h2><p>These terms are shown upfront so there are no hidden expectations.</p></div><div class="container payment-card-grid">${paymentCards}</div><div class="container terms-details"><details><summary>View complete payment terms</summary><ul>${paymentTerms.map((term) => `<li>${term}</li>`).join('')}</ul></details></div></section>
  <section class="section-pad alt"><div class="container disclaimer-box"><h2>Important pricing conditions</h2><p>All prices are starting prices. Final cost depends on approved scope. Domain, hosting, premium plugins, paid tools and advertising budgets are separate unless stated otherwise. Search rankings, social-media growth, paid-advertising leads, sales and returns cannot be guaranteed. Nexora Digital does not provide fake followers, fake reviews or artificial engagement. Third-party verification and approval are outside Nexora Digital's control. Custom functionality is quoted separately.</p></div></section>
  <section class="section-pad" id="pricing-faq"><div class="container section-head"><span class="eyebrow">Pricing FAQ</span><h2>Questions before requesting a quote.</h2></div><div class="container pricing-faq-grid">${pricingFaqMarkup}</div></section>
  <section class="section-pad final-cta"><div class="container cta-card"><h2>Need help choosing the right package?</h2><p>Tell Nexora Digital what you want to build and get a practical recommendation.</p><a class="btn btn-primary" href="contact.html#audit">Request consultation</a></div></section>
  <aside class="pricing-sticky-cta" id="pricingStickyCta" aria-label="Pricing quote shortcut"><button type="button" aria-label="Hide quote shortcut" data-sticky-close>&times;</button><div><strong>Need a final quote?</strong><span>Share your package and get a written scope.</span></div><a class="btn btn-primary" href="contact.html#audit">Request quote</a></aside>` });

const growthNestSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: url('/') },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: url('/portfolio.html') },
      { '@type': 'ListItem', position: 3, name: 'Growth Nest Case Study', item: url('/case-study-growth-nest.html') }
    ] },
    { '@type': 'WebPage', name: 'Growth Nest Website Case Study', url: url('/case-study-growth-nest.html'), description: 'See how Nexora Digital designed and developed the live Growth Nest digital marketing agency website, including responsive structure, service presentation and contact-focused design.', image: url('/clients/growth-nest-homepage.webp') },
    { '@type': 'CreativeWork', name: 'Growth Nest digital marketing agency website', creator: { '@type': 'Organization', name: site.brand }, url: site.growthNestUrl, image: url('/clients/growth-nest-homepage.webp') }
  ]
});

const growthNestCaseStudy = layout({ path: '/case-study-growth-nest.html', active: 'Case Studies', title: 'Growth Nest Website Case Study | Nexora Digital', description: 'See how Nexora Digital designed and developed the live Growth Nest digital marketing agency website, including responsive structure, service presentation and contact-focused design.', image: '/clients/growth-nest-homepage.webp', extra: `<script type="application/ld+json">${growthNestSchema}</script>`, body: `<section class="case-study-hero premium-case-study"><div class="container premium-case-grid"><div class="case-hero-copy"><span class="eyebrow">Client Case Study</span><h1><span>Growth Nest</span><span>Digital Marketing</span><span>Agency Website</span></h1><p>A live client website created to communicate services clearly, establish Growth Nest's credibility and provide direct enquiry paths for potential customers.</p><div class="hero-actions"><a class="btn btn-primary" href="${site.growthNestUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit Growth Nest live website, opens in a new tab">Visit Live Website</a><a class="btn btn-secondary" href="portfolio.html">Back to Portfolio</a></div><div class="case-hero-meta"><span><strong>Project Type</strong>Client Website</span><span><strong>Service</strong>Web Design and Development</span><span><strong>Status</strong>Live</span></div></div><a class="case-browser-showcase" href="${site.growthNestUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit Growth Nest live website, opens in a new tab">${browserFrame('/clients/growth-nest-homepage.webp', 'Growth Nest live website homepage screenshot', 1440, 1100)}</a></div></section>
  <section class="section-pad"><div class="container case-section-grid"><div><span class="eyebrow">Project Overview</span><h2>A professional online presence for a digital marketing agency.</h2><p>Growth Nest is a digital marketing agency website built to present services clearly, support trust with a polished brand experience and guide visitors toward enquiry actions. The project focuses on simple navigation, readable service sections and direct conversion paths.</p></div><div class="case-feature-panel"><h3>What the website needed to solve</h3><p>The site needed to quickly explain what Growth Nest offers, make the agency feel credible and give visitors obvious next steps without relying on exaggerated claims or fake performance metrics.</p></div></div></section>
  <section class="section-pad alt"><div class="container section-head"><span class="eyebrow">Project Goals</span><h2>Clear services, stronger trust and better enquiry paths.</h2></div><div class="container case-card-grid"><article><h3>Present services clearly</h3><p>Structure the page so visitors can understand Growth Nest's digital marketing offer without confusion.</p></article><article><h3>Build brand credibility</h3><p>Use consistent visuals, spacing and copy hierarchy to make the agency feel professional.</p></article><article><h3>Improve mobile usability</h3><p>Keep navigation, text and calls to action readable across small screens.</p></article><article><h3>Create direct enquiry paths</h3><p>Make contact and free-audit actions visible throughout the experience.</p></article><article><h3>Support future growth</h3><p>Leave room for content, blog, pricing and service pages as the agency expands.</p></article></div></section>
  <section class="section-pad"><div class="container section-head"><span class="eyebrow">Work Delivered</span><h2>Design, development and launch-ready structure.</h2></div><div class="container case-card-grid six"><article><h3>Website Design</h3><p>Created a clean service-focused layout with a professional agency feel.</p></article><article><h3>Responsive Development</h3><p>Built layouts that adapt from desktop to mobile without shrinking the whole page.</p></article><article><h3>Service Presentation</h3><p>Organised service content into scannable sections for quicker understanding.</p></article><article><h3>Lead-Focused CTA Structure</h3><p>Placed enquiry and free-audit actions where visitors naturally make decisions.</p></article><article><h3>Performance Optimisation</h3><p>Used local image assets and practical layout choices to support faster loading.</p></article><article><h3>SEO-Friendly Foundation</h3><p>Prepared a readable page structure with clear headings and descriptive content.</p></article></div></section>
  <section class="section-pad alt"><div class="container case-section-grid"><div><span class="eyebrow">Design Approach</span><h2>Readable hierarchy with consistent brand direction.</h2><p>The design approach keeps the message clear: hero first, service context second, proof and enquiry paths close behind. Visual hierarchy, spacious cards and responsive behaviour help the page feel professional without making the user work to understand the offer.</p></div><div class="case-feature-panel"><h3>Key Features</h3><ul><li>Responsive navigation</li><li>Clear service sections</li><li>Pricing or enquiry paths</li><li>Mobile-friendly design</li><li>Conversion-focused calls to action</li><li>Consistent visual branding</li></ul></div></div></section>
  <section class="section-pad"><div class="container section-head"><span class="eyebrow">Project Gallery</span><h2>Real captures from the live Growth Nest website.</h2></div><div class="container screenshot-grid case-gallery"><figure>${browserFrame('/clients/growth-nest-homepage.webp', 'Growth Nest homepage screenshot showing hero and navigation', 1440, 1100)}<figcaption>Homepage hero and navigation.</figcaption></figure><figure>${browserFrame('/clients/growth-nest-services.webp', 'Growth Nest services section screenshot from the live website', 1440, 1100)}<figcaption>Service and page structure capture.</figcaption></figure><figure>${browserFrame('/clients/growth-nest-contact.webp', 'Growth Nest contact and call to action section screenshot from the live website', 1440, 1100)}<figcaption>Contact-oriented page capture.</figcaption></figure><figure>${browserFrame('/clients/growth-nest-mobile.webp', 'Growth Nest mobile website screenshot', 390, 900)}<figcaption>Mobile-size live capture.</figcaption></figure></div></section>
  <section class="section-pad alt"><div class="container case-outcome"><span class="eyebrow">Outcome</span><h2>The completed site gives Growth Nest a clearer professional presence.</h2><p>The completed site provides Growth Nest with a professional online presence and clearer paths for visitors to understand its services and make enquiries.</p></div></section>
  <section class="section-pad final-cta"><div class="container cta-card"><span class="eyebrow">Build With Nexora</span><h2>Need a Website That Converts Visitors Into Enquiries?</h2><p>Share your goals and Nexora Digital will recommend a practical website scope for your business.</p><div class="hero-actions"><a class="btn btn-primary" href="contact.html?service=website-design-and-development#audit">Start Your Project</a><a class="btn btn-secondary" href="portfolio.html">View More Work</a></div></div></section>` });

const siteLensProjectPage = layout({ path: '/project-nexora-sitelens.html', active: 'Portfolio', title: 'Nexora SiteLens Website Audit Platform | Nexora Digital', description: 'Explore Nexora SiteLens, an internal website audit platform for reviewing SEO, performance, accessibility, security headers, mobile usability and technical health.', image: '/projects/nexora-sitelens-preview.png', body: `<section class="case-study-hero premium-case-study"><div class="container premium-case-grid"><div class="case-hero-copy"><span class="eyebrow">Internal Product</span><h1>Nexora SiteLens Website Audit Platform</h1><p>A reusable website audit platform created for Nexora Digital to assess websites before recommending improvement work.</p><div class="hero-actions"><a class="btn btn-primary" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Launch live Nexora SiteLens product, opens in a new tab">Launch Live Product</a><a class="btn btn-secondary" href="portfolio.html">Back to Portfolio</a></div><div class="case-hero-meta"><span><strong>Status</strong>Live Internal Product</span><span><strong>Type</strong>Audit Platform</span><span><strong>Mode</strong>Demo Mode Available</span></div></div><a class="case-browser-showcase" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Launch live Nexora SiteLens product, opens in a new tab">${browserFrame('/projects/nexora-sitelens-preview.png', 'Nexora SiteLens website audit dashboard', 1440, 1100, 'audit-system-lime.vercel.app')}</a></div></section>
  <section class="section-pad"><div class="container case-section-grid"><div><span class="eyebrow">Project Overview</span><h2>A practical audit workflow for business websites.</h2><p>SiteLens helps evaluate SEO, performance, accessibility, security headers, mobile usability and technical health. It turns technical checks into a readable report with category scores, issue explanations and prioritised recommendations.</p></div><div class="case-feature-panel"><h3>Honest status</h3><p>SiteLens is a deployed internal product currently using a functional demo audit engine, with the architecture prepared for live PageSpeed and related integrations.</p></div></div></section>
  <section class="section-pad alt"><div class="container case-section-grid"><div><span class="eyebrow">Purpose</span><h2>Built to support better client conversations.</h2><p>The platform supports preliminary client website reviews, lead-generation audits, identifying high-priority issues, presenting recommendations clearly and showcasing Nexora Digital's technical capability.</p></div><div class="case-feature-panel"><h3>Audit scope</h3><ul><li>SEO</li><li>Performance</li><li>Accessibility</li><li>Security headers</li><li>Mobile usability</li><li>Technical health</li></ul></div></div></section>
  <section class="section-pad"><div class="container section-head"><span class="eyebrow">Core Features</span><h2>Useful audit features without fake claims.</h2></div><div class="container case-card-grid six"><article><h3>URL-based audits</h3><p>Visitors can enter a website address and run a structured audit flow.</p></article><article><h3>Six audit categories</h3><p>Reports cover performance, SEO, accessibility, security, mobile UX and technical health.</p></article><article><h3>Weighted overall score</h3><p>Category scores combine into a clear health score.</p></article><article><h3>Prioritised recommendations</h3><p>Issues are grouped by severity and impact so next steps are easier to choose.</p></article><article><h3>Audit history</h3><p>Reports can be saved locally in the browser for later review.</p></article><article><h3>Report comparison</h3><p>Saved reports can be compared across score and category changes.</p></article><article><h3>Printable reports</h3><p>The browser print flow supports Save as PDF exports.</p></article><article><h3>Demo mode</h3><p>The deployed product works without an API key using a functional demo audit engine.</p></article><article><h3>Light and dark themes</h3><p>The UI supports both visual modes for comfortable review.</p></article></div></section>
  <section class="section-pad alt"><div class="container case-section-grid"><div><span class="eyebrow">Technology</span><h2>Confirmed SiteLens stack.</h2><p>The SiteLens repository confirms a standard Vercel-ready application built with Next.js, React, TypeScript and Tailwind CSS.</p></div><div class="case-feature-panel"><h3>Confirmed technologies</h3><ul><li>Next.js</li><li>React</li><li>TypeScript</li><li>Tailwind CSS</li><li>Vercel deployment</li></ul></div></div></section>
  <section class="section-pad"><div class="container section-head"><span class="eyebrow">Product Preview</span><h2>Actual screenshots from the deployed SiteLens product.</h2></div><div class="container screenshot-grid case-gallery"><figure>${browserFrame('/projects/nexora-sitelens-home.png', 'Nexora SiteLens homepage with website audit input', 1440, 1000, 'audit-system-lime.vercel.app')}</figure><figure>${browserFrame('/projects/nexora-sitelens-results.png', 'Nexora SiteLens results dashboard with audit score cards', 1440, 1000, 'audit-system-lime.vercel.app/results')}</figure><figure>${browserFrame('/projects/nexora-sitelens-compare.png', 'Nexora SiteLens comparison page', 1440, 1000, 'audit-system-lime.vercel.app/compare')}</figure><figure>${browserFrame('/projects/nexora-sitelens-history.png', 'Nexora SiteLens audit history page', 1440, 1000, 'audit-system-lime.vercel.app/history')}</figure></div></section>
  <section class="section-pad final-cta"><div class="container cta-card"><span class="eyebrow">Live Product</span><h2>See What SiteLens Finds on Your Website</h2><p>Open the deployed SiteLens product and run a demo audit for a website.</p><div class="hero-actions"><a class="btn btn-primary" href="${site.siteLensUrl}" target="_blank" rel="noopener noreferrer" aria-label="Launch Nexora SiteLens, opens in a new tab">Launch SiteLens</a><a class="btn btn-secondary" href="portfolio.html">View More Work</a></div></div></section>` });

const portfolioPage = layout({ path: '/portfolio.html', active: 'Portfolio', title: 'Portfolio and Case Studies | Nexora Digital', description: 'Portfolio and case studies from Nexora Digital including the live Growth Nest client website, internal agency work, and SiteLens audit platform.', image: '/clients/growth-nest-homepage.webp', body: `<section class="page-hero"><img src="/agency/hero-strategy-room.png" width="1200" height="750" alt="Nexora Digital project planning workspace" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Portfolio</span><h1>Client work, internal products, and clear project labels.</h1><p>Growth Nest is live client work. Nexora Digital and SiteLens are internal Nexora projects with honest labels and direct links.</p></div></section><section class="section-pad"><div class="container filter-bar" role="tablist" aria-label="Project filters"><button class="filter-btn active" data-filter="all">All</button><button class="filter-btn" data-filter="client">Client Project</button><button class="filter-btn" data-filter="internal">Internal Project</button></div><div class="container portfolio-grid">${projectCards}</div></section><section class="section-pad alt" id="case-studies"><div class="container section-head"><span class="eyebrow">Case studies</span><h2>Detailed project notes without fake metrics.</h2></div><div class="container case-grid">${projects.map((project) => `<article class="case-card">${statusBadge(project.status)}<h3>${project.name}</h3><p><strong>Overview:</strong> ${project.background}</p><p><strong>Work completed:</strong> ${project.work.join(', ')}.</p><p><strong>Visible features:</strong> ${project.features.join(', ')}.</p><p><strong>Tools or platform:</strong> ${project.tools.join(', ')}.</p><p><strong>Current status:</strong> ${project.status}.</p><div class="project-actions">${project.liveUrl ? `<a class="btn btn-primary" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="${project.liveLabel || 'Visit Live Website'} for ${project.name}, opens in a new tab">${project.liveLabel || 'Visit Live Website'}</a>` : ''}${project.caseStudyUrl ? `<a class="btn btn-secondary" href="${project.caseStudyUrl}">${project.detailLabel || 'View Case Study'}</a>` : `<button class="btn btn-secondary" type="button" data-project-open="${project.id}">View Project Details</button>`}</div></article>`).join('')}</div></section>${projectModals}` });

const blogPage = layout({ path: '/blog.html', active: 'Blog', title: 'Blog | Nexora Digital', description: 'Practical website, SEO, content, and digital marketing guides for small businesses and service professionals.', body: `<section class="page-hero"><img src="/agency/analytics-command-center.png" width="1200" height="750" alt="Marketing analytics and website planning dashboard" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Blog</span><h1>Practical guides for better websites and digital growth.</h1><p>Useful articles for small businesses, startups, local brands, and service professionals.</p></div></section><section class="section-pad"><div class="container article-list"><article class="article-card"><img src="/agency/hero-strategy-room.png" width="900" height="560" loading="lazy" decoding="async" alt="Local SEO planning dashboard"><div><span class="eyebrow">Local SEO</span><h2>How local businesses can prepare for SEO</h2><p>Start with service pages, clear contact details, page titles, local keywords, Google Business Profile basics, internal links, and a sitemap.</p><span class="coming-soon">Guide summary - full article coming soon</span></div></article><article class="article-card"><img src="/clients/growth-nest-homepage.webp" width="1440" height="1100" loading="lazy" decoding="async" alt="Growth Nest website homepage screenshot"><div><span class="eyebrow">Website planning</span><h2>Why trust sections matter more than big claims</h2><p>People need clear services, process, pricing direction, contact options, and real work before they enquire. The Growth Nest case study shows how a live client website presents service information and contact actions clearly.</p><a class="text-link" href="case-study-growth-nest.html">Read the Growth Nest case study</a></div></article><article class="article-card"><img src="/agency/analytics-command-center.png" width="900" height="560" loading="lazy" decoding="async" alt="Website analytics planning dashboard"><div><span class="eyebrow">Analytics</span><h2>What to track before spending on ads</h2><p>Track form submissions, WhatsApp clicks, email clicks, project link clicks, and pricing CTA clicks before increasing marketing activity.</p><span class="coming-soon">Guide summary - full article coming soon</span></div></article></div></section>` });

const contactPage = layout({ path: '/contact.html', active: 'Contact', title: 'Contact Nexora Digital | Free Website Audit', description: 'Request a free 10-point website audit, website quote, SEO setup, social media planning, or support from Nexora Digital.', body: `<section class="page-hero"><img src="/agency/service-workspace.png" width="1200" height="750" alt="Nexora Digital consultation workspace" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Contact</span><h1>Tell Nexora Digital what you want to improve next.</h1><p>Request a free audit, website quote, SEO setup, or practical digital support.</p></div></section><section class="section-pad-sm"><div class="container client-trust-strip"><div><span class="eyebrow">Website enquiry</span><h2>Want a website like this for your business?</h2><p>Share your goals and Nexora Digital will recommend a practical website scope. Your design will be planned for your business, not copied from another client.</p></div><a class="btn btn-secondary" href="case-study-growth-nest.html">View Growth Nest Case Study</a></div></section>${contactSection('audit')}` });

const privacy = layout({ path: '/privacy.html', active: '', title: 'Privacy Policy | Nexora Digital', description: 'Privacy Policy for Nexora Digital explaining data collection, forms, analytics preparation, cookies, third-party services, and contact rights.', body: legalPage('Privacy Policy', ['Nexora Digital collects details submitted through contact forms, email, WhatsApp, and social links so enquiries can be answered.', 'Collected data may include name, email, phone number, company or brand, service requirements, budget range, timeline, and project details.', 'Forms are prepared for Web3Forms and require a configured access key before live submissions are accepted.', 'Analytics tools may be added for website measurement when configured.', 'Cookies may be used only when analytics or embedded third-party tools are configured.', 'Data is used for responding to enquiries, preparing proposals, project communication, and improving the website.', 'Third-party services may include Vercel, Web3Forms, Google Analytics, Google Tag Manager, Google Search Console, WhatsApp, Facebook, and Instagram.', 'Users can request access, correction, or deletion of their enquiry data by contacting Nexora Digital.', 'This policy is informational and should be professionally reviewed before the business scales.']) });
const terms = layout({ path: '/terms.html', active: '', title: 'Terms and Conditions | Nexora Digital', description: 'Terms and Conditions for Nexora Digital covering scope, payment, revisions, timelines, responsibilities, third-party costs, support, and liability.', body: legalPage('Terms and Conditions', ['Project scope must be agreed before work begins. Extra features, pages, integrations, or urgent timelines may change the quote.', 'Payment terms should be confirmed in writing before each project. Work may begin after an agreed advance payment.', 'Revision rounds are listed in each package. Additional revisions may be quoted separately.', 'Clients are responsible for providing accurate content, brand assets, access details, approvals, and feedback on time.', 'Delivery timelines depend on scope, content readiness, approvals, and third-party service availability.', 'Client-owned content remains the client property. Nexora-created website work is transferred according to the agreed payment and scope.', 'Domain, hosting, paid plugins, paid tools, advertising spend, and third-party subscriptions are not included unless stated in the scope.', 'Cancellation and refund handling depends on completed work, time spent, third-party costs, and written agreement.', 'Support is provided for the period listed in the selected package or support plan.', 'Nexora Digital provides practical digital services but does not guarantee search rankings, sales, leads, or platform approvals.', 'These terms are informational and should be professionally reviewed before the business scales.']) });
const refund = layout({ path: '/refund.html', active: '', title: 'Refund and Cancellation Policy | Nexora Digital', description: 'Refund and Cancellation Policy for Nexora Digital website, SEO, social media, and support services.', body: legalPage('Refund and Cancellation Policy', ['Cancellations should be requested in writing as early as possible.', 'Advance payments may be partially refundable only when work has not started and no third-party costs have been incurred.', 'Work already completed, strategy time, design drafts, development time, content planning, and third-party costs are generally not refundable.', 'Monthly support or social media starter services can be cancelled before the next billing period.', 'If a project is paused because required client content or feedback is missing, timelines may be extended.', 'Refund decisions depend on the agreed scope, work completed, and written project terms.', 'This policy is informational and should be professionally reviewed before the business scales.']) });

function legalPage(title, items) {
  return `<section class="page-hero compact-hero"><div class="container"><span class="eyebrow">Legal</span><h1>${title}</h1><p>Plain-language policy information for Nexora Digital. This is not legal advice.</p></div></section><section class="section-pad"><div class="container legal-copy">${items.map((item) => `<p>${item}</p>`).join('')}<p>Contact: <a href="mailto:${site.email}">${site.email}</a></p></div></section>`;
}

const notFound = `<!DOCTYPE html><html lang="en"><head>${baseHead({ title: 'Page Not Found | Nexora Digital', description: 'The page you requested could not be found.', path: '/404.html', image: '/brand/nexora-logo-wide.png' })}</head><body>${header('')}<main id="main"><section class="section-pad final-cta"><div class="container cta-card"><span class="eyebrow">404</span><h1>Page not found.</h1><p>The link may have moved. Return to the homepage or contact Nexora Digital for help.</p><a class="btn btn-primary" href="index.html">Go home</a><a class="btn btn-secondary" href="contact.html">Contact Nexora</a></div></section></main>${footer()}<script type="module" src="./main.js"></script></body></html>`;
pages.push('/404.html');

const files = {
  'index.html': home,
  'services.html': servicesPage,
  'pricing.html': pricingPage,
  'portfolio.html': portfolioPage,
  'case-study-growth-nest.html': growthNestCaseStudy,
  'project-nexora-sitelens.html': siteLensProjectPage,
  'blog.html': blogPage,
  'contact.html': contactPage,
  'privacy.html': privacy,
  'terms.html': terms,
  'refund.html': refund,
  '404.html': notFound
};

for (const [file, content] of Object.entries(files)) {
  const full = join(process.cwd(), file);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((path) => `  <url><loc>${url(path)}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(process.cwd(), 'public', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${url('/sitemap.xml')}\n`, 'utf8');
