import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const brand = 'Nexora Digital';
const baseUrl = 'https://dmsite-sooty.vercel.app';
const email = 'pushkarbusiness05@gmail.com';
const phone = '+91 90076 34717';
const whatsapp = 'https://wa.me/919007634717';

const nav = [
  ['Home', '/'],
  ['About', '/about/'],
  ['Services', '/services/'],
  ['Portfolio', '/portfolio/'],
  ['Pricing', '/pricing/'],
  ['Resources', '/resources/'],
  ['Contact', '/contact/'],
];

const servicePages = [
  {
    path: 'services/web-development/index.html',
    slug: '/services/web-development/',
    title: 'Website Development',
    desc: 'Fast, conversion-focused websites for brands that need credibility, speed, and a clear path to enquiry.',
    points: ['Modern responsive websites', 'Landing pages and service pages', 'SEO-ready structure', 'Analytics and conversion tracking'],
  },
  {
    path: 'services/seo/index.html',
    slug: '/services/seo/',
    title: 'SEO & Local SEO',
    desc: 'Search architecture, technical cleanup, content planning, and local visibility improvements for service businesses.',
    points: ['Technical SEO audit', 'Keyword and content mapping', 'Google Business Profile alignment', 'Monthly improvement roadmap'],
  },
  {
    path: 'services/social-media-management/index.html',
    slug: '/services/social-media-management/',
    title: 'Social Media Management',
    desc: 'Content systems that help brands look active, credible, and consistent across social platforms.',
    points: ['Content calendar planning', 'Creative direction', 'Caption and post systems', 'Profile optimization'],
  },
  {
    path: 'services/google-business-profile/index.html',
    slug: '/services/google-business-profile/',
    title: 'Google Business Profile',
    desc: 'Structured local profile setup and optimization for companies that want stronger map and search visibility.',
    points: ['Profile cleanup', 'Service and category setup', 'Post and update planning', 'Local trust improvements'],
  },
  {
    path: 'services/paid-ads/index.html',
    slug: '/services/paid-ads/',
    title: 'Paid Ads',
    desc: 'Focused campaign setup for Google and Meta with landing pages, tracking, and transparent reporting.',
    points: ['Campaign planning', 'Ad copy and creative direction', 'Landing page alignment', 'Performance reporting'],
  },
  {
    path: 'services/branding/index.html',
    slug: '/services/branding/',
    title: 'Branding',
    desc: 'Identity, messaging, and visual systems that make your business easier to understand and trust.',
    points: ['Positioning and message clarity', 'Logo usage and visual direction', 'Offer and service copy', 'Trust-building brand assets'],
  },
];

const pricing = [
  ['Starter', 'For businesses building their first serious online presence.', 'Custom quote', ['Website or profile audit', 'Landing page direction', 'Basic SEO setup', 'Clear launch checklist']],
  ['Growth', 'For teams ready to improve visibility and enquiries.', 'Custom quote', ['Website improvements', 'Local SEO roadmap', 'Social content system', 'Monthly performance review']],
  ['Scale', 'For companies that need multi-channel acquisition.', 'Custom quote', ['Campaign landing pages', 'SEO and ads alignment', 'Analytics dashboard', 'Conversion optimization']],
  ['Custom', 'For complex scopes, campaigns, or ongoing partnerships.', 'Scoped proposal', ['Discovery workshop', 'Custom deliverables', 'Priority planning', 'Flexible support model']],
];

function logoComponent(className = '') {
  return `<span class="logo-system ${className}">
    <img class="logo-img logo-light" src="/brand/nexora-logo-light.png" alt="Nexora Digital logo">
    <img class="logo-img logo-dark" src="/brand/nexora-logo-dark.png" alt="Nexora Digital logo">
  </span>`;
}

function serviceCard(page) {
  return `<article class="card service-card reveal">
    <span class="card-kicker">${page.title}</span>
    <h3>${page.desc}</h3>
    <ul>${page.points.map((point) => `<li>${point}</li>`).join('')}</ul>
    <a class="text-link" href="${page.slug}">Explore service</a>
  </article>`;
}

function layout({ title, description, canonical, eyebrow, heading, subheading, body, active = '' }) {
  const canonicalUrl = `${baseUrl}${canonical}`;
  const navItems = nav.map(([label, href]) => `<a class="nav-link${active === href ? ' active' : ''}" href="${href}">${label}</a>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:site_name" content="${brand}">
  <meta property="og:image" content="${baseUrl}/brand/nexora-logo-dark.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${baseUrl}/brand/nexora-logo-dark.png">
  <link rel="icon" type="image/png" href="/brand/nexora-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script>if (localStorage.getItem('nexora-theme') === 'light') document.documentElement.classList.add('light-mode');</script>
  <link rel="stylesheet" href="/index.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "Nexora Digital",
        "url": "${baseUrl}/",
        "logo": "${baseUrl}/brand/nexora-logo-dark.png",
        "email": "${email}",
        "telephone": "${phone}",
        "areaServed": "India",
        "description": "${description}"
      },
      {
        "@type": "LocalBusiness",
        "name": "Nexora Digital",
        "url": "${baseUrl}/",
        "image": "${baseUrl}/brand/nexora-logo-dark.png",
        "email": "${email}",
        "telephone": "${phone}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ichapur",
          "addressRegion": "West Bengal",
          "addressCountry": "IN"
        }
      }
    ]
  }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="siteHeader">
    <nav class="nav-shell" aria-label="Primary navigation">
      <a class="brand-link" href="/" aria-label="Nexora Digital home">${logoComponent('nav-logo')}</a>
      <button class="nav-toggle" id="navToggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      <div class="nav-menu" id="navMenu">${navItems}</div>
      <div class="nav-actions">
        <button class="mode-toggle" id="themeToggle" type="button" aria-label="Toggle theme" aria-pressed="false">Mode</button>
        <a class="btn btn-primary" href="/contact/">Book Strategy Call</a>
      </div>
    </nav>
  </header>

  <main id="main">
    <section class="page-hero">
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <span class="eyebrow">${eyebrow}</span>
          <h1>${heading}</h1>
          <p>${subheading}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/contact/">Start a Project</a>
            <a class="btn btn-secondary" href="/services/">Explore Services</a>
          </div>
        </div>
        <div class="hero-panel reveal">
          ${logoComponent('hero-logo')}
          <div class="signal-grid">
            <span>Innovation</span><span>Trust</span><span>Performance</span><span>Growth</span>
          </div>
        </div>
      </div>
    </section>
    ${body}
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        ${logoComponent('footer-logo')}
        <p>Nexora Digital builds premium websites, search systems, brand assets, and digital growth infrastructure for ambitious companies.</p>
      </div>
      <div><h3>Company</h3><a href="/about/">About</a><a href="/portfolio/">Portfolio</a><a href="/case-studies/">Case Studies</a></div>
      <div><h3>Services</h3><a href="/services/web-development/">Web Development</a><a href="/services/seo/">SEO</a><a href="/services/paid-ads/">Paid Ads</a></div>
      <div><h3>Contact</h3><a href="mailto:${email}">${email}</a><a href="${whatsapp}" target="_blank" rel="noopener">WhatsApp ${phone}</a><a href="/pricing/">View Pricing</a></div>
    </div>
    <div class="footer-bottom">&copy; 2026 Nexora Digital. Building the Next Era of Digital Growth.</div>
  </footer>
  <a class="whatsapp-float" href="${whatsapp}?text=Hi%20Nexora%20Digital%2C%20I%20want%20to%20discuss%20a%20project." target="_blank" rel="noopener" aria-label="Chat with Nexora Digital on WhatsApp">WhatsApp</a>
  <script type="module" src="/main.js"></script>
</body>
</html>`;
}

const sections = {
  home: `<section class="section">
    <div class="container metrics-row reveal"><span>Websites</span><span>SEO</span><span>Paid Ads</span><span>Brand Systems</span><span>Analytics</span></div>
  </section>
  <section class="section compact">
    <div class="container section-head reveal"><span class="eyebrow">Services</span><h2>Growth infrastructure, not random marketing activity.</h2><p>Every service is designed to improve trust, clarity, discoverability, and conversion.</p></div>
    <div class="container card-grid three">${servicePages.slice(0, 6).map(serviceCard).join('')}</div>
  </section>
  <section class="section surface-band">
    <div class="container split">
      <div class="reveal"><span class="eyebrow">Why Nexora Digital</span><h2>Premium execution with a simple operating rhythm.</h2><p>We start with research, define the strongest path, build only what supports the goal, and report progress in plain language.</p></div>
      <div class="stacked-list reveal"><div>Discovery and positioning</div><div>Design-led trust building</div><div>SEO-ready technical foundation</div><div>Measurement and iteration</div></div>
    </div>
  </section>
  <section class="section">
    <div class="container section-head reveal"><span class="eyebrow">Pricing</span><h2>Clear packages for different growth stages.</h2></div>
    <div class="container card-grid four">${pricing.map(([name, best, price, items], index) => `<article class="card pricing-card reveal ${index === 1 ? 'featured' : ''}"><span class="card-kicker">${index === 1 ? 'Best Value' : 'Package'}</span><h3>${name}</h3><p>${best}</p><strong>${price}</strong><ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul><a class="btn btn-secondary" href="/contact/">Get Quote</a></article>`).join('')}</div>
  </section>`,
  about: `<section class="section"><div class="container split"><div class="reveal"><span class="eyebrow">About</span><h2>A digital agency built around clarity, craft, and measurable improvement.</h2></div><div class="reveal"><p>Nexora Digital helps businesses turn their digital presence into a serious business asset. The work combines brand thinking, interface design, search structure, content systems, ads, and analytics into one practical growth engine.</p><p>The approach is simple: understand the audience, remove friction, build trust, and keep improving what matters.</p></div></div></section>
  <section class="section surface-band"><div class="container card-grid four">${['Innovation', 'Trust', 'Performance', 'Intelligence'].map((value) => `<article class="card reveal"><span class="card-kicker">Value</span><h3>${value}</h3><p>Every recommendation must make the brand clearer, faster, easier to trust, or easier to measure.</p></article>`).join('')}</div></section>`,
  services: `<section class="section"><div class="container section-head reveal"><span class="eyebrow">Services</span><h2>One premium growth system across brand, website, traffic, and measurement.</h2><p>Pick one service or combine multiple services into a focused growth roadmap.</p></div><div class="container card-grid three">${servicePages.map(serviceCard).join('')}</div></section>`,
  portfolio: `<section class="section"><div class="container section-head reveal"><span class="eyebrow">Portfolio</span><h2>Project formats prepared for real business proof.</h2><p>Use these formats to present verified client projects, internal builds, or live digital products as your proof library grows.</p></div><div class="container card-grid three">${['Premium agency website', 'Local SEO visibility system', 'Paid ads landing funnel', 'Brand identity refresh', 'Social content engine', 'Analytics dashboard setup'].map((item) => `<article class="portfolio-card card reveal"><div class="visual-tile"></div><span class="card-kicker">Project</span><h3>${item}</h3><p>Structured around challenge, strategy, deliverables, launch notes, and measurable next steps.</p></article>`).join('')}</div></section>`,
  caseStudies: `<section class="section"><div class="container section-head reveal"><span class="eyebrow">Case Studies</span><h2>Decision-focused stories, ready for verified numbers later.</h2></div><div class="container card-grid three">${['Research', 'Execution', 'Optimization'].map((stage) => `<article class="card reveal"><span class="card-kicker">${stage}</span><h3>${stage} narrative</h3><p>Explain the situation, decisions made, assets delivered, and lessons learned without inventing fake results.</p></article>`).join('')}</div></section>`,
  pricing: `<section class="section"><div class="container section-head reveal"><span class="eyebrow">Pricing</span><h2>Flexible pricing based on scope, timeline, and support level.</h2><p>Pricing stays transparent and realistic. Final quotes depend on business requirements and workload.</p></div><div class="container card-grid four">${pricing.map(([name, best, price, items], index) => `<article class="card pricing-card reveal ${index === 1 ? 'featured' : ''}"><span class="card-kicker">${index === 1 ? 'Popular' : 'Plan'}</span><h3>${name}</h3><p>${best}</p><strong>${price}</strong><ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul><a class="btn btn-secondary" href="/contact/">Request Proposal</a></article>`).join('')}</div></section>`,
  resources: `<section class="section"><div class="container section-head reveal"><span class="eyebrow">Resources</span><h2>Practical guides for better marketing decisions.</h2></div><div class="container card-grid three">${['Website launch checklist', 'Local SEO starter map', 'Paid ads readiness guide', 'Brand clarity worksheet', 'Analytics setup guide', 'Content planning template'].map((title) => `<article class="card reveal"><span class="card-kicker">Guide</span><h3>${title}</h3><p>Request this resource and adapt it to your business before launch.</p><a class="text-link" href="/contact/">Request guide</a></article>`).join('')}</div></section>`,
  blog: `<section class="section"><div class="container section-head reveal"><span class="eyebrow">Blog</span><h2>Thinking on websites, SEO, growth systems, and brand trust.</h2></div><div class="container card-grid three">${['Why premium service websites need proof architecture', 'How local businesses can prepare for SEO', 'What to track before spending on ads'].map((title) => `<article class="card reveal"><span class="card-kicker">Insight</span><h3>${title}</h3><p>A concise article format with key points, next steps, and related services.</p></article>`).join('')}</div></section>`,
  contact: `<section class="section"><div class="container contact-grid"><div class="reveal"><span class="eyebrow">Contact</span><h2>Tell Nexora Digital what you want to build next.</h2><p>Share your business, goals, and current digital presence. You will get practical next steps before a paid scope begins.</p><div class="contact-lines"><a href="mailto:${email}">${email}</a><a href="${whatsapp}" target="_blank" rel="noopener">${phone}</a><span>Ichapur, West Bengal, India</span></div></div><form class="contact-form card reveal" id="mkt-contact-form"><input type="hidden" name="access_key" id="ala-web3forms-key" value="d3079a1d-d72b-4d02-9031-adb58e812328"><label>Name<input name="name" required placeholder="Your name"></label><label>Email<input type="email" name="email" required placeholder="you@example.com"></label><label>Project goals<textarea name="message" required placeholder="Tell us what you want to improve"></textarea></label><button class="btn btn-primary" id="submit-btn" type="submit">Send Message</button><div class="form-success" id="form-success-msg">Message sent. Nexora Digital will get back to you soon.</div></form></div></section>`,
};

const pages = [
  ['index.html', { title: 'Nexora Digital | Premium Digital Agency', description: 'Nexora Digital builds premium websites, SEO systems, paid campaigns, brand identity, and growth infrastructure for ambitious businesses.', canonical: '/', active: '/', eyebrow: 'Building the Next Era of Digital Growth', heading: 'Digital systems for brands that need to look trusted and scale intelligently.', subheading: 'Nexora Digital combines strategy, design, technology, search, ads, and analytics into one premium growth engine.', body: sections.home }],
  ['about/index.html', { title: 'About Nexora Digital | Premium Digital Growth Agency', description: 'Learn about Nexora Digital, a premium agency focused on innovation, trust, performance, growth, intelligence, creativity, and simplicity.', canonical: '/about/', active: '/about/', eyebrow: 'About Nexora Digital', heading: 'Built for brands that want a sharper digital presence.', subheading: 'A modern agency focused on clean strategy, premium execution, and measurable improvement.', body: sections.about }],
  ['services/index.html', { title: 'Services | Nexora Digital', description: 'Explore Nexora Digital services including website development, SEO, social media management, Google Business Profile, paid ads, and branding.', canonical: '/services/', active: '/services/', eyebrow: 'Services', heading: 'Premium services for visibility, credibility, and conversion.', subheading: 'Choose focused support or combine services into a complete growth roadmap.', body: sections.services }],
  ['portfolio/index.html', { title: 'Portfolio | Nexora Digital', description: 'Explore Nexora Digital portfolio formats for premium websites, SEO systems, paid funnels, brand refreshes, and analytics setups.', canonical: '/portfolio/', active: '/portfolio/', eyebrow: 'Portfolio', heading: 'A polished proof library for digital growth work.', subheading: 'Present real work clearly with project context, strategy, deliverables, and verified outcomes.', body: sections.portfolio }],
  ['case-studies/index.html', { title: 'Case Studies | Nexora Digital', description: 'Read Nexora Digital case study structures focused on research, execution, optimization, and honest performance context.', canonical: '/case-studies/', active: '/case-studies/', eyebrow: 'Case Studies', heading: 'Strategy stories that explain the work behind the result.', subheading: 'No fake claims. Just clear project thinking and verified evidence when available.', body: sections.caseStudies }],
  ['pricing/index.html', { title: 'Pricing | Nexora Digital', description: 'Review Nexora Digital pricing options for websites, SEO, paid ads, branding, and custom growth systems.', canonical: '/pricing/', active: '/pricing/', eyebrow: 'Pricing', heading: 'Premium support with clear scope and honest quotes.', subheading: 'Start with a focused package or request a custom proposal for complex work.', body: sections.pricing }],
  ['resources/index.html', { title: 'Resources | Nexora Digital', description: 'Access Nexora Digital resources for website planning, local SEO, ads readiness, branding, analytics, and content systems.', canonical: '/resources/', active: '/resources/', eyebrow: 'Resources', heading: 'Guides and frameworks for smarter digital decisions.', subheading: 'Practical resources to help you plan before you invest in execution.', body: sections.resources }],
  ['blog/index.html', { title: 'Blog | Nexora Digital', description: 'Read Nexora Digital insights on websites, SEO, performance marketing, brand trust, and growth systems.', canonical: '/blog/', active: '/blog/', eyebrow: 'Blog', heading: 'Sharp thinking for modern digital growth.', subheading: 'Articles for founders, operators, and local businesses improving their online presence.', body: sections.blog }],
  ['contact/index.html', { title: 'Contact Nexora Digital | Book a Strategy Call', description: 'Contact Nexora Digital for website development, SEO, paid ads, branding, analytics, and growth strategy support.', canonical: '/contact/', active: '/contact/', eyebrow: 'Contact', heading: 'Start with a clear conversation, not a confusing package.', subheading: 'Tell us what you want to improve and get practical next steps.', body: sections.contact }],
];

for (const service of servicePages) {
  pages.push([service.path, {
    title: `${service.title} | Nexora Digital`,
    description: `${service.desc} Nexora Digital provides premium ${service.title.toLowerCase()} services for ambitious businesses.`,
    canonical: service.slug,
    active: '/services/',
    eyebrow: 'Service',
    heading: service.title,
    subheading: service.desc,
    body: `<section class="section"><div class="container split"><div class="reveal"><span class="eyebrow">What is included</span><h2>A focused service built around clarity and measurable next steps.</h2><p>${service.desc}</p></div><div class="stacked-list reveal">${service.points.map((point) => `<div>${point}</div>`).join('')}</div></div></section><section class="section surface-band"><div class="container cta-card reveal"><h2>Want ${service.title.toLowerCase()} support?</h2><p>Request a short consultation and Nexora Digital will suggest a practical scope.</p><a class="btn btn-primary" href="/contact/">Discuss this service</a></div></section>`,
  }]);
}

for (const [file, data] of pages) {
  const full = join(process.cwd(), file);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, layout(data), 'utf8');
}
