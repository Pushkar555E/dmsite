import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { faqs, pricing, projects, services, site } from '../site.config.js';

const year = new Date().getFullYear();
const pages = [];

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const url = (path = '/') => `${site.baseUrl}${path}`;
const waText = encodeURIComponent('Hi Nexora Digital, I want a free website audit.');
const whatsappAudit = `${site.whatsapp}?text=${waText}`;

const nav = [
  ['Home', 'index.html'],
  ['Services', 'services.html'],
  ['Portfolio', 'portfolio.html'],
  ['Case Studies', 'portfolio.html#case-studies'],
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
        <a class="btn btn-primary nav-cta" data-track="audit_cta" href="contact.html#audit">Free Audit</a>
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
      <div><h2>Pages</h2><a href="portfolio.html">Portfolio</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms</a><a href="refund.html">Refund Policy</a></div>
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
  <meta name="google-site-verification" content="${site.placeholders.searchConsoleVerification}">
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

const serviceCards = services.map((group) => `<section class="section-pad" id="${group.group.toLowerCase().replaceAll(' ', '-').replaceAll('and', 'analytics')}"><div class="container section-head left"><span class="eyebrow">${group.group}</span><h2>${group.group === 'Website Services' ? 'Professional websites for real business needs.' : group.group === 'Marketing Services' ? 'Practical marketing foundations without inflated promises.' : 'Simple measurement and support after launch.'}</h2></div><div class="container service-grid detailed">${group.items.map(([name, audience, includes, timeline, related]) => `<article class="service-card"><span>${group.group}</span><h3>${name}</h3><p><strong>Who it is for:</strong> ${audience}</p><p><strong>What is included:</strong> ${includes}</p><p><strong>Timeline:</strong> ${timeline}</p><p><strong>Pricing:</strong> Related package: ${related}</p><a data-track="service_click" href="contact.html#audit">Discuss ${name}</a></article>`).join('')}</div></section>`).join('');

const priceCards = pricing.map((plan) => `<article class="pricing-card"><span>${plan.pages}</span><h3>${plan.name}</h3><strong>${plan.price}</strong><ul>${plan.includes.map((item) => `<li>${item}</li>`).join('')}<li>${plan.revisions}</li><li>${plan.delivery}</li><li>${plan.support}</li></ul><p>${plan.note}</p><a class="btn btn-secondary" data-track="pricing_cta" href="contact.html#audit">Request quote</a></article>`).join('');

const projectCards = projects.map((project) => {
  const action = project.liveUrl ? `<a class="project-link" data-track="project_click" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">View live project</a>` : `<button class="project-link button-link" type="button" data-project-open="${project.id}">View project details</button>`;
  return `<article class="project-card" data-category="${project.category.toLowerCase().split(' ')[0]}"><div class="project-cover logo-cover"><img src="${project.image}" width="900" height="420" loading="lazy" decoding="async" alt="${project.name} project proof"></div><span>${project.category} / ${project.status}</span><h3>${project.name}</h3><p>${project.background}</p>${action}</article>`;
}).join('');

const projectModals = projects.map((project) => `<section class="project-modal" id="project-${project.id}" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="${project.id}-title">
  <div class="modal-card" tabindex="-1">
    <button class="modal-close" type="button" data-modal-close aria-label="Close project details">&times;</button>
    <div class="modal-grid">
      <img src="${project.proof}" width="1200" height="680" alt="${project.name} screenshot or proof image">
      <div>
        <span class="eyebrow">${project.category} / ${project.status}</span>
        <h2 id="${project.id}-title">${project.name}</h2>
        <p>${project.background}</p>
        <h3>My role</h3><p>${project.role}</p>
        <h3>Main work completed</h3><ul>${project.work.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>Tools or technologies</h3><p>${project.tools.join(', ')}</p>
        <h3>Key features</h3><ul>${project.features.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>Current status</h3><p>${project.status}. ${project.liveUrl ? 'The live URL is available above.' : 'The original live deployment is no longer publicly available. Screenshots and project proof are shown here as an archive of completed work.'}</p>
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
        <div class="hero-actions"><a class="btn btn-primary" data-track="audit_cta" href="contact.html#audit">Get a Free Website Audit</a><a class="btn btn-secondary" href="portfolio.html">View Our Work</a><a class="btn btn-quiet" data-track="whatsapp_click" href="${whatsappAudit}" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div>
        <div class="trust-row"><span>Website development</span><span>SEO foundations</span><span>Social media support</span><span>Direct founder communication</span></div>
      </div>
      <div class="hero-visual reveal"><img src="/agency/hero-strategy-room.png" width="1200" height="850" alt="Nexora Digital website planning and marketing strategy workspace" fetchpriority="high" decoding="async"></div>
    </div>
  </section>
  <section class="stats section-pad-sm"><div class="container stats-grid"><div class="stat-card"><strong>Web</strong><span>Responsive websites</span></div><div class="stat-card"><strong>SEO</strong><span>Search basics</span></div><div class="stat-card"><strong>Content</strong><span>Planning support</span></div><div class="stat-card"><strong>Support</strong><span>Clear communication</span></div></div></section>
  <section class="section-pad audit-offer" id="audit"><div class="container split-layout"><div><span class="eyebrow">Free audit offer</span><h2>Free 10-Point Website Audit</h2><p>Before you spend on redesigns or marketing, get a practical review of what may be blocking trust and enquiries.</p><div class="proof-list"><span>Mobile responsiveness</span><span>Loading speed</span><span>SEO basics</span><span>Website structure</span><span>Calls to action</span><span>Trust signals</span><span>Contact accessibility</span><span>Broken links</span><span>Social media presence</span><span>Overall user experience</span></div></div><div class="cta-card"><h3>Request the audit</h3><p>Use the form, WhatsApp, or email. You will receive practical notes, not pressure.</p><a class="btn btn-primary" href="contact.html#audit">Use contact form</a><a class="btn btn-secondary" data-track="whatsapp_click" href="${whatsappAudit}" target="_blank" rel="noopener noreferrer">Request on WhatsApp</a><a class="btn btn-quiet" data-track="email_click" href="mailto:${site.email}?subject=Free%2010-Point%20Website%20Audit">Email Nexora</a></div></div></section>
  <section class="section-pad" id="services"><div class="container section-head"><span class="eyebrow">Core services</span><h2>Clear services for businesses that need a stronger digital presence.</h2><p>No inflated promises. Just useful website, SEO, content, and support work.</p></div><div class="container service-grid"><article class="service-card"><span>Website Services</span><h3>Landing pages and small business websites</h3><p>Professional pages built for trust, mobile use, and enquiry flow.</p><a href="services.html#website-services">Explore website services</a></article><article class="service-card"><span>Marketing Services</span><h3>Local SEO and content planning</h3><p>Practical foundations that help people understand and find your business.</p><a href="services.html#marketing-services">Explore marketing services</a></article><article class="service-card"><span>Analytics and Support</span><h3>Tracking, updates, and maintenance</h3><p>Simple measurement and ongoing support after launch.</p><a href="services.html#analytics-support">Explore support</a></article></div></section>
  <section class="section-pad alt" id="portfolio"><div class="container section-head"><span class="eyebrow">Featured projects</span><h2>Genuine work and clearly labelled project types.</h2><p>Client work, internal work, and concept systems are separated clearly. No broken demo links.</p></div><div class="container portfolio-grid">${projectCards}</div></section>
  <section class="section-pad" id="case-studies"><div class="container split-layout"><div class="section-head left"><span class="eyebrow">Featured case study</span><h2>Growth Nest archived client website proof.</h2><p>Growth Nest is presented as archived client work because the original live deployment is no longer publicly available. The uploaded proof images are included and viewable in the project details.</p><a class="btn btn-primary" href="portfolio.html#case-studies">Read case study</a></div><div class="proof-image"><img src="/clients/growth-nest-proof.png" width="1600" height="900" loading="lazy" decoding="async" alt="Growth Nest completed project proof image"></div></div></section>
  <section class="section-pad alt"><div class="container section-head"><span class="eyebrow">How Nexora works</span><h2>A simple process with clear communication.</h2></div><div class="container process-grid"><div><strong>1</strong><h3>Review</h3><p>Understand your business, audience, current website, and goals.</p></div><div><strong>2</strong><h3>Plan</h3><p>Choose a practical scope, timeline, content needs, and budget.</p></div><div><strong>3</strong><h3>Build</h3><p>Create the website, SEO basics, forms, links, and launch checklist.</p></div><div><strong>4</strong><h3>Support</h3><p>Review, improve, and guide the next digital steps after launch.</p></div></div></section>
  <section class="section-pad" id="founder"><div class="container split-layout"><div><span class="eyebrow">Founder</span><h2>Built by Pushkar Biswas.</h2><p>Pushkar Biswas is a Computer Science and Technology diploma student with an interest in website development, digital marketing, technology, and practical business tools. He created Nexora Digital to help small businesses and growing brands establish a professional digital presence without unnecessary complexity.</p><div class="proof-list"><span>Website development</span><span>Digital marketing</span><span>SEO fundamentals</span><span>Content planning</span><span>Analytics foundations</span><span>AI-assisted workflows</span><span>Continuous technical learning</span></div></div><div class="founder-card logo-component">${logo}</div></div></section>
  <section class="section-pad alt" id="pricing"><div class="container section-head"><span class="eyebrow">Pricing</span><h2>Transparent starting prices in Indian rupees.</h2><p>Final pricing depends on project scope, content, integrations, timeline, and support requirements.</p></div><div class="container pricing-grid">${priceCards}</div></section>
  <section class="section-pad"><div class="container section-head"><span class="eyebrow">What Clients Can Expect</span><h2>Real working principles, ready for real reviews later.</h2></div><div class="container expectation-grid"><article><h3>Clear communication</h3><p>Direct, practical updates throughout the project.</p></article><article><h3>Honest scope</h3><p>Clear deliverables before work begins.</p></article><article><h3>Mobile-first execution</h3><p>Layouts checked on small and large screens.</p></article><article><h3>Transparent pricing</h3><p>Starting prices plus scoped quotes for complex needs.</p></article><article><h3>Practical recommendations</h3><p>Advice focused on what helps the business next.</p></article><article><h3>Support after launch</h3><p>Guidance and maintenance options after handoff.</p></article></div></section>
  <section class="section-pad alt" id="faq"><div class="container section-head"><span class="eyebrow">FAQ</span><h2>Common questions before starting.</h2></div><div class="container faq-list">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>
  ${contactSection('homepage-contact')}
  <section class="section-pad final-cta"><div class="container cta-card"><h2>Ready to improve your website or digital presence?</h2><p>Start with a free 10-point website audit and a practical next-step plan.</p><a class="btn btn-primary" href="contact.html#audit">Get a Free Website Audit</a></div></section>
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
      <div class="form-row"><label for="${id}-service">Required service</label><select id="${id}-service" name="service" required><option value="">Select a service</option><option>Free 10-Point Website Audit</option><option>Landing Page</option><option>Business Website</option><option>Website Redesign</option><option>Local SEO Setup</option><option>Social Media Starter</option><option>Website Maintenance</option><option>Custom Growth Package</option></select></div>
      <div class="form-row"><label for="${id}-budget">Estimated budget</label><select id="${id}-budget" name="budget" required><option value="">Select budget</option><option>Under ₹5,000</option><option>₹5,000 - ₹10,000</option><option>₹10,000 - ₹25,000</option><option>₹25,000+</option><option>Not sure yet</option></select></div>
      <div class="form-row"><label for="${id}-timeline">Desired timeline</label><select id="${id}-timeline" name="timeline" required><option value="">Select timeline</option><option>Within 1 week</option><option>Within 2 weeks</option><option>This month</option><option>Flexible</option></select></div>
      <div class="form-row full"><label for="${id}-message">Project details</label><textarea id="${id}-message" name="message" rows="5" required></textarea></div>
      <label class="consent full"><input name="consent" type="checkbox" required> I agree to be contacted about this enquiry and understand the privacy policy.</label>
      <button class="btn btn-primary full" type="submit" data-submit-label="Send Request">Send Request</button>
      <p class="form-status full" role="status" aria-live="polite"></p>
      <p class="form-note full">Form provider: Web3Forms. Replace the placeholder access key in <code>site.config.js</code> before using the live form.</p>
    </form></div></section>`;
}

const servicesPage = layout({ path: '/services.html', active: 'Services', title: 'Services | Nexora Digital', description: 'Website services, local SEO, social media planning, analytics setup, and maintenance for small businesses and growing brands.', body: `<section class="page-hero"><img src="/agency/service-workspace.png" width="1200" height="750" alt="Website and marketing planning workspace" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Services</span><h1>Practical digital services for growing businesses.</h1><p>Choose one focused service or combine website, SEO, content, analytics, and support into a simple growth plan.</p></div></section>${serviceCards}<section class="section-pad alt" id="pricing"><div class="container section-head"><span class="eyebrow">Pricing summary</span><h2>Starting prices that are easy to edit.</h2><p>Final pricing depends on project scope, content, integrations, timeline, and support requirements.</p></div><div class="container pricing-grid">${priceCards}</div></section>${contactSection('service-contact')}` });

const portfolioPage = layout({ path: '/portfolio.html', active: 'Portfolio', title: 'Portfolio and Case Studies | Nexora Digital', description: 'Honest portfolio and case studies from Nexora Digital including archived client work, internal work, and concept frameworks.', image: '/clients/growth-nest-logo.png', body: `<section class="page-hero"><img src="/agency/hero-strategy-room.png" width="1200" height="750" alt="Nexora Digital project planning workspace" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Portfolio</span><h1>Client work, internal projects, and archived proof.</h1><p>Every project is labelled honestly. Archived work uses screenshots or proof images, not broken live-demo buttons.</p></div></section><section class="section-pad"><div class="container filter-bar" role="tablist" aria-label="Project filters"><button class="filter-btn active" data-filter="all">All</button><button class="filter-btn" data-filter="client">Client Project</button><button class="filter-btn" data-filter="internal">Internal Project</button><button class="filter-btn" data-filter="concept">Concept Project</button></div><div class="container portfolio-grid">${projectCards}</div></section><section class="section-pad alt" id="case-studies"><div class="container section-head"><span class="eyebrow">Case studies</span><h2>Detailed project notes without fake metrics.</h2></div><div class="container case-grid">${projects.map((project) => `<article class="case-card"><span>${project.category} / ${project.status}</span><h3>${project.name}</h3><p><strong>Overview:</strong> ${project.background}</p><p><strong>Challenge:</strong> Present the work clearly and guide visitors toward the right next action.</p><p><strong>Objectives:</strong> ${project.features.join(', ')}.</p><p><strong>My role:</strong> ${project.role}.</p><p><strong>Process:</strong> Review, structure, design, build, test, and prepare launch/archive proof.</p><p><strong>Work completed:</strong> ${project.work.join(', ')}.</p><p><strong>Technologies:</strong> ${project.tools.join(', ')}.</p><p><strong>Final outcome:</strong> ${project.outcome.join(', ')}.</p><p><strong>Lessons learned:</strong> Keep proof honest, make contact paths visible, and avoid broken public links.</p><p><strong>Current status:</strong> ${project.status}.</p>${project.liveUrl ? `<a class="project-link" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">View live project</a>` : `<button class="project-link button-link" type="button" data-project-open="${project.id}">View screenshots</button>`}</article>`).join('')}</div></section>${projectModals}` });

const blogPage = layout({ path: '/blog.html', active: 'Blog', title: 'Blog | Nexora Digital', description: 'Practical website, SEO, content, and digital marketing guides for small businesses and service professionals.', body: `<section class="page-hero"><img src="/agency/analytics-command-center.png" width="1200" height="750" alt="Marketing analytics and website planning dashboard" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Blog</span><h1>Practical guides for better websites and digital growth.</h1><p>Useful articles for small businesses, startups, local brands, and service professionals.</p></div></section><section class="section-pad"><div class="container article-list"><article class="article-card"><img src="/agency/hero-strategy-room.png" width="900" height="560" loading="lazy" decoding="async" alt="Local SEO planning dashboard"><div><span class="eyebrow">Local SEO</span><h2>How local businesses can prepare for SEO</h2><p>Start with service pages, clear contact details, page titles, local keywords, Google Business Profile basics, internal links, and a sitemap.</p></div></article><article class="article-card"><img src="/agency/service-workspace.png" width="900" height="560" loading="lazy" decoding="async" alt="Website trust section planning"><div><span class="eyebrow">Website planning</span><h2>Why trust sections matter more than big claims</h2><p>People need proof, process, pricing direction, contact options, and clear service descriptions before they enquire.</p></div></article><article class="article-card"><img src="/agency/analytics-command-center.png" width="900" height="560" loading="lazy" decoding="async" alt="Website analytics planning dashboard"><div><span class="eyebrow">Analytics</span><h2>What to track before spending on ads</h2><p>Track form submissions, WhatsApp clicks, email clicks, project link clicks, and pricing CTA clicks before increasing marketing activity.</p></div></article></div></section>` });

const contactPage = layout({ path: '/contact.html', active: 'Contact', title: 'Contact Nexora Digital | Free Website Audit', description: 'Request a free 10-point website audit, website quote, SEO setup, social media planning, or support from Nexora Digital.', body: `<section class="page-hero"><img src="/agency/service-workspace.png" width="1200" height="750" alt="Nexora Digital consultation workspace" fetchpriority="high" decoding="async"><div class="container"><span class="eyebrow">Contact</span><h1>Tell Nexora Digital what you want to improve next.</h1><p>Request a free audit, website quote, SEO setup, or practical digital support.</p></div></section>${contactSection('audit')}` });

const privacy = layout({ path: '/privacy.html', active: '', title: 'Privacy Policy | Nexora Digital', description: 'Privacy Policy for Nexora Digital explaining data collection, forms, analytics preparation, cookies, third-party services, and contact rights.', body: legalPage('Privacy Policy', ['Nexora Digital collects details submitted through contact forms, email, WhatsApp, and social links so enquiries can be answered.', 'Collected data may include name, email, phone number, company or brand, service requirements, budget range, timeline, and project details.', 'Forms are prepared for Web3Forms. Add your Web3Forms access key before accepting live submissions.', 'Analytics placeholders are prepared for GA4, Google Tag Manager, and Search Console. No fake tracking IDs are inserted.', 'Cookies may be used only when analytics or embedded third-party tools are configured.', 'Data is used for responding to enquiries, preparing proposals, project communication, and improving the website.', 'Third-party services may include Vercel, Web3Forms, Google Analytics, Google Tag Manager, Google Search Console, WhatsApp, Facebook, and Instagram.', 'Users can request access, correction, or deletion of their enquiry data by contacting Nexora Digital.', 'This policy is informational and should be professionally reviewed before the business scales.']) });
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
  'portfolio.html': portfolioPage,
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
