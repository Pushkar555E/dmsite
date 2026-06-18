/* ===================================================================
   PUSHKAR GROWTH DIGITAL — MAIN CONTROLLER
   Handling Mobile Navigation, Scroll Blurs, Reveals & Contact Forms
   =================================================================== */

'use strict';

// --- Freelancer Marketing Services Dataset (50 items) ---
const MARKETING_SERVICES_DATA = [
  // 1. Social Media Setup (smm)
  { name: "Facebook Business Page Setup", price: "₹499", cat: "smm" },
  { name: "Instagram Business Setup", price: "₹499", cat: "smm" },
  { name: "LinkedIn Business Page Setup", price: "₹599", cat: "smm" },
  { name: "Google Business Profile Setup", price: "₹799", cat: "smm" },
  { name: "Google Business Profile Verification Assistance", price: "₹499", cat: "smm" },
  { name: "Google Business Profile Optimization", price: "₹999", cat: "smm" },
  { name: "WhatsApp Business Setup", price: "₹399", cat: "smm" },
  { name: "Social Media Audit", price: "₹499", cat: "smm" },

  // 2. Social Media Design (smm)
  { name: "Single Post Design", price: "₹149", cat: "smm" },
  { name: "Carousel Post (up to 5 slides)", price: "₹399", cat: "smm" },
  { name: "Story Design", price: "₹99", cat: "smm" },
  { name: "Reel Cover Design", price: "₹99", cat: "smm" },
  { name: "Thumbnail Design", price: "₹149", cat: "smm" },
  { name: "Festival Post", price: "₹199", cat: "smm" },
  { name: "Product Promotion Post", price: "₹249", cat: "smm" },
  { name: "Banner/Menu Design", price: "₹399", cat: "smm" },

  // 3. Reel & Video Services (smm)
  { name: "Reel Upload", price: "₹99", cat: "smm" },
  { name: "Basic Reel Editing", price: "₹399", cat: "smm" },
  { name: "Advanced Reel Editing", price: "₹799", cat: "smm" },
  { name: "YouTube Shorts Editing", price: "₹399", cat: "smm" },
  { name: "Caption Addition", price: "₹149", cat: "smm" },
  { name: "Background Music & Effects", price: "₹149", cat: "smm" },
  { name: "30-sec Promotional Video", price: "₹699", cat: "smm" },

  // 4. Social Media Management Packages (packages)
  { name: "Starter SMM Package", price: "₹2,999/month", cat: "packages" },
  { name: "Standard SMM Package", price: "₹4,999/month", cat: "packages" },
  { name: "Growth SMM Package", price: "₹7,999/month", cat: "packages" },

  // 5. Meta Ads (Facebook & Instagram) (ads)
  { name: "Meta Ads Campaign Setup", price: "₹999", cat: "ads" },
  { name: "Meta Ad Copy Writing", price: "₹299", cat: "ads" },
  { name: "Meta Audience Research", price: "₹499", cat: "ads" },
  { name: "Meta Pixel Installation", price: "₹999", cat: "ads" },
  { name: "Meta Retargeting Campaign", price: "₹1,499", cat: "ads" },
  { name: "Meta Monthly Ad Management", price: "₹2,999", cat: "ads" },
  { name: "Meta Campaign Optimization", price: "₹799", cat: "ads" },
  { name: "Meta Performance Report", price: "₹499", cat: "ads" },

  // 6. Google Ads (ads)
  { name: "Google Search Campaign Setup", price: "₹1,499", cat: "ads" },
  { name: "Google Display Campaign Setup", price: "₹1,499", cat: "ads" },
  { name: "Google Performance Max Campaign", price: "₹1,999", cat: "ads" },
  { name: "Google Keyword Research", price: "₹499", cat: "ads" },
  { name: "Google Ad Copy Writing", price: "₹399", cat: "ads" },
  { name: "Google Conversion Tracking Setup", price: "₹999", cat: "ads" },
  { name: "Google Monthly Management", price: "₹2,999", cat: "ads" },

  // 7. Google Business Profile (Maps) (seo_maps)
  { name: "GBP Create New Profile", price: "₹799", cat: "seo_maps" },
  { name: "GBP Profile Optimization", price: "₹999", cat: "seo_maps" },
  { name: "GBP Add Products/Services", price: "₹499", cat: "seo_maps" },
  { name: "GBP Weekly Business Posts", price: "₹699/month", cat: "seo_maps" },
  { name: "GBP Photo Upload", price: "₹299", cat: "seo_maps" },
  { name: "GBP Business Description", price: "₹299", cat: "seo_maps" },
  { name: "GBP Q&A Setup", price: "₹299", cat: "seo_maps" },
  { name: "GBP Review Management", price: "₹599/month", cat: "seo_maps" },
  { name: "Google Maps SEO (Basic)", price: "₹1,999", cat: "seo_maps" },

  // 8. SEO Services (seo_maps)
  { name: "SEO Audit", price: "₹999", cat: "seo_maps" },
  { name: "On-Page SEO", price: "₹2,499", cat: "seo_maps" },
  { name: "Local SEO", price: "₹2,999", cat: "seo_maps" },
  { name: "SEO Keyword Research", price: "₹799", cat: "seo_maps" },
  { name: "SEO Meta Title & Description", price: "₹499", cat: "seo_maps" },
  { name: "Image SEO Optimization", price: "₹499", cat: "seo_maps" },

  // 9. Website Services (web)
  { name: "Landing Page Development", price: "₹2,999", cat: "web" },
  { name: "Portfolio Website Design", price: "₹4,999", cat: "web" },
  { name: "Business Website Design", price: "₹6,999", cat: "web" },
  { name: "Google Analytics Setup", price: "₹799", cat: "web" },
  { name: "Google Search Console Setup", price: "₹799", cat: "web" },
  { name: "Basic Website SEO Setup", price: "₹1,499", cat: "web" },

  // 10. Monthly Marketing Packages (packages)
  { name: "Basic Marketing Package", price: "₹4,999/month", cat: "packages" },
  { name: "Standard Marketing Package", price: "₹7,999/month", cat: "packages" },
  { name: "Premium Marketing Package", price: "₹12,999/month", cat: "packages" },

  // 11. Free Introductory Offers (free)
  { name: "Free Marketing Audit", price: "Included", cat: "free" },
  { name: "Free Competitor Analysis", price: "Included", cat: "free" },
  { name: "Free GBP Audit", price: "Included", cat: "free" },
  { name: "Free Social Media Audit", price: "Included", cat: "free" },
  { name: "15-Minute Consultation Call", price: "Included", cat: "free" }
];

// --- Blog Posts Dataset for SMM Insights ---
const BLOG_POSTS_DATA = [
  {
    id: 1,
    category: "SMM Strategy",
    date: "June 2026",
    title: "The 2.5-Second Hook Rule: How to Stop the Scroll",
    excerpt: "Discover the exact neuro-linguistic triggers and visual frame sequences that capture retention and double organic views.",
    content: `
      <div class="blog-article-meta">SMM Strategy · June 2026</div>
      <h3 class="blog-article-title">The 2.5-Second Hook Rule: How to Stop the Scroll</h3>
      <div class="blog-article-content">
        <p>In modern digital marketing, attention is the single most valuable currency. If you cannot capture a user's attention within the first 2.5 seconds of their scrolling experience, your content—regardless of how valuable or well-produced it is—will go entirely unnoticed. This is the <strong>2.5-Second Hook Rule</strong>.</p>
        
        <h4>1. The Neuro-Linguistic Trigger</h4>
        <p>A successful hook does not just ask a question; it disrupts the user's current cognitive state. Use visual or textual cues that create immediate curiosity or indicate a high-value payoff. For example:</p>
        <ul>
          <li><strong>Disruptive Hook:</strong> "Stop wasting 90% of your organic traffic..."</li>
          <li><strong>Curiosity Loop:</strong> "This single design token doubled our conversion rate, and it takes 10 seconds to add."</li>
        </ul>

        <h4>2. Frame Pacing and Micro-Movements</h4>
        <p>Static scenes do not convert on feeds. Every 1.5 to 2.5 seconds, there must be a subtle visual transition: a text pop, zoom effect, change in camera angle, or graphic overlay. This signals the brain that new information is arriving, maintaining focus.</p>

        <blockquote>
          "The best hooks don't feel like sales pitches. They feel like insider secrets that the viewer stumbled upon."
        </blockquote>

        <h4>3. The Implementation Blueprint</h4>
        <p>When structuring your next short-form video or image carousel, use this three-step pipeline:</p>
        <ol>
          <li><strong>0.0s - 2.5s:</strong> Bold, high-contrast headline + immediate pattern interrupt (movement/zoom).</li>
          <li><strong>2.5s - 15.0s:</strong> Rapid delivery of the primary value point (no fluff, cut pauses).</li>
          <li><strong>15.0s+:</strong> Micro-CTA directing profile clicks or comments for automated inbox links.</li>
        </ol>
      </div>
    `
  },
  {
    id: 2,
    category: "Brand Design",
    date: "June 2026",
    title: "Organic Grid Aesthetics: Designing for Immediate Brand Trust",
    excerpt: "Learn how to establish instant visual authority and drive organic engagement loops using harmonious brand layouts.",
    content: `
      <div class="blog-article-meta">Brand Design · June 2026</div>
      <h3 class="blog-article-title">Organic Grid Aesthetics: Designing for Immediate Brand Trust</h3>
      <div class="blog-article-content">
        <p>Your social media grid is your digital storefront. When a cold user clicks through a hook to visit your profile, you have exactly one glance (less than a second) to establish authority. A chaotic grid signals an unorganized business, while a premium, cohesive aesthetic converts profile views into followers and clients.</p>

        <h4>1. Curating the Harmonious HSL Palette</h4>
        <p>Avoid random color choices. Select 3 core colors (e.g., deep dark backgrounds, bright neon accents, and clean secondary whites/grays) and stick to them strictly. HSL (Hue, Saturation, Lightness) modeling allows you to create matching shades easily, ensuring a unified visual hierarchy across posts.</p>

        <h4>2. The Three-Column Layout Rhythm</h4>
        <p>A premium grid follows a pattern. Instead of posting arbitrary graphics, structure your grid rows in columns of visual weight:</p>
        <ul>
          <li><strong>Column 1:</strong> High-contrast typography / educational text decks.</li>
          <li><strong>Column 2:</strong> Premium mockups / high-end brand visuals / human faces.</li>
          <li><strong>Column 3:</strong> Clean, minimalist graphics / short quotes / brand logos.</li>
        </ul>

        <blockquote>
          "Cohesion beats single-post quality every time. A beautiful grid creates an experience, not just individual feed impressions."
        </blockquote>

        <h4>3. Creating a Living Interface</h4>
        <p>Incorporate dynamic elements like glassmorphism tokens, custom gradients, and soft neon drop-shadows. On the web, subtle hover states and micro-animations make the layout feel reactive and alive, enhancing the perception of premium build quality.</p>
      </div>
    `
  },
  {
    id: 3,
    category: "Local SEO",
    date: "June 2026",
    title: "Local SEO Retainers: Dominating Google Maps in 2026",
    excerpt: "A complete walkthrough for startups and local businesses aiming to convert local searches into real revenue pipelines.",
    content: `
      <div class="blog-article-meta">Local SEO · June 2026</div>
      <h3 class="blog-article-title">Local SEO Retainers: Dominating Google Maps in 2026</h3>
      <div class="blog-article-content">
        <p>For local businesses and service desks, Google Maps is the single most powerful source of inbound leads. When someone searches for a service 'near me' or in a specific locality, the top three map listings (the '3-Pack') capture over 60% of all search clicks. Here is how we optimize Google Business Profiles for maximum visibility.</p>

        <h4>1. NAP Consistency & Local Citations</h4>
        <p>Your Name, Address, and Phone number (NAP) must be identical across every directory on the internet—from your website, to your GBP, to local directories (like Justdial, Sulekha, or Yelp). Google's algorithm rewards absolute consistency with higher local search trust.</p>

        <h4>2. The Review Amplification Funnel</h4>
        <p>Getting reviews is not just about quantity; it is about keyword richness and frequency. Encourage customers to write detailed reviews containing the specific service name and location (e.g., 'Best cyber cafe in Ichapur for college form fill-up'). This directly boosts category authority.</p>

        <blockquote>
          "Reviews are Google's local trust signal. A business that gets new, keyword-rich reviews weekly will easily outrank older, stagnant listings."
        </blockquote>

        <h4>3. Active Engagement Signals</h4>
        <p>Treat your Google Business Profile like a social channel. Upload high-resolution photos of your workstation weekly, publish regular business updates/offers via Google Posts, and resolve Q&As proactively. These signals tell Google's crawl bots that your business is active and ready to serve searchers.</p>
      </div>
    `
  }
];

function getLink(target) {
  const isLocalServer = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isFileProtocol = window.location.protocol === 'file:';

  const PRODUCTION_DOMAINS = {
    dev: 'https://your-dev-portfolio-url.com',
    mkt: 'https://your-marketing-url.com',
    cafe: 'https://your-cybercafe-url.com'
  };

  const DEV_PORTS = {
    dev: 'http://localhost:5173',
    mkt: 'http://localhost:5174',
    cafe: 'http://localhost:5175'
  };

  const RELATIVE_PATHS = {
    dev: '../PushkarPort/index.html',
    mkt: './index.html',
    cafe: '../esite/index.html'
  };

  if (isFileProtocol) {
    return RELATIVE_PATHS[target];
  } else if (isLocalServer) {
    return DEV_PORTS[target];
  } else {
    return PRODUCTION_DOMAINS[target];
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Set dynamic cross-routing link hrefs ---
  document.querySelectorAll('.client-dev-btn').forEach(link => link.setAttribute('href', getLink('dev')));
  document.querySelectorAll('.client-cyber-btn').forEach(link => link.setAttribute('href', getLink('cafe')));

  // --- 1. Mobile Menu Toggle ---
  const hamburger = document.getElementById('mkt-hamburger');
  const navMenu = document.getElementById('mkt-nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link:not(.ext-link)');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 2. Floating Navbar Scroll State ---
  const navbar = document.getElementById('mkt-navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once in case user loads page scrolled down
  }

  // --- 3. Scroll Reveal Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 4. Interactive Contact Form Submission (Web3Forms Integration) ---
  const contactForm = document.getElementById('mkt-contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success-msg');

  if (contactForm && submitBtn && successMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Disable submit panel during processing
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Request...</span>';

      const keyInput = document.getElementById('ala-web3forms-key');
      const accessKey = keyInput ? keyInput.value : '';

      // If key is not set, run simulated response for local dev
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        console.warn('Web3Forms: Using simulated fallback. Paste your actual API Key inside index.html to enable email routing.');
        setTimeout(() => {
          contactForm.reset();
          successMsg.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }, 1200);
        return;
      }

      // Perform real API post submission
      const formData = new FormData(contactForm);
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (data.success) {
          contactForm.reset();
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        } else {
          alert('Submission Error: ' + (data.message || 'Verification failed.'));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        alert('Form submission encountered a network error. Please check connection.');
      });
    });
  }

  // --- 5. Smooth Anchor Scrolling ---
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId || 'hero');
      if (targetElement) {
        e.preventDefault();
        const navOffset = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 6. Interactive A-La-Carte Services Directory ---
  const alacarteGrid = document.getElementById('alacarte-list-grid');
  const alaSearchInput = document.getElementById('ala-search-input');
  const alaClearBtn = document.getElementById('ala-clear-btn');
  const alaTabButtons = document.querySelectorAll('.ala-tab-btn');

  if (alacarteGrid) {
    let activeCategory = 'all';
    let searchQuery = '';

    const renderAlacarte = () => {
      alacarteGrid.innerHTML = '';
      
      const totalCount = MARKETING_SERVICES_DATA.length;
      const filtered = MARKETING_SERVICES_DATA.filter(service => {
        const matchesCategory = activeCategory === 'all' || service.cat === activeCategory;
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      // Update match metrics
      const matchCounter = document.getElementById('ala-match-counter');
      if (matchCounter) {
        if (searchQuery) {
          matchCounter.textContent = `Found ${filtered.length} matching service${filtered.length === 1 ? '' : 's'}`;
        } else {
          if (activeCategory === 'all') {
            matchCounter.textContent = `Showing all ${totalCount} services`;
          } else {
            const tabBtn = document.querySelector(`.ala-tab-btn[data-category="${activeCategory}"]`);
            const catName = tabBtn ? tabBtn.textContent.replace(/[^\w\s&]/g, '').trim() : activeCategory;
            matchCounter.textContent = `Showing ${filtered.length} in ${catName}`;
          }
        }
      }

      if (filtered.length === 0) {
        alacarteGrid.innerHTML = `
          <div class="no-results-card">
            <p>🔍 No matching services found. Please refine your search or inquire below.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(service => {
        const card = document.createElement('div');
        card.className = 'alacarte-card reveal';
        card.setAttribute('data-category', service.cat);
        card.innerHTML = `
          <div class="alacarte-card-header">
            <span class="alacarte-card-icon">${getIconForCat(service.cat)}</span>
            <h4>${service.name}</h4>
          </div>
          <div class="alacarte-card-value-wrap">
            <span class="alacarte-card-price">${service.price}</span>
            <span class="alacarte-card-action">💬</span>
          </div>
        `;

        card.addEventListener('click', () => {
          const messageField = document.getElementById('message');
          const nameField = document.getElementById('name');
          if (messageField) {
            messageField.value = `Hello! I would like to inquire about your: "${service.name}" (${service.price}) service. Please let me know how we can get started.`;
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              const navOffset = navbar ? navbar.offsetHeight : 0;
              const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - navOffset - 10;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });

              if (nameField) {
                setTimeout(() => {
                  nameField.focus();
                }, 600);
              }

              // Neon flash highlight
              const formWrap = document.querySelector('.contact-form-wrap');
              if (formWrap) {
                formWrap.classList.remove('neon-spotlight-flash');
                void formWrap.offsetWidth; // trigger reflow
                formWrap.classList.add('neon-spotlight-flash');
              }
            }
          }
        });

        alacarteGrid.appendChild(card);
      });

      // Trigger reveal visible classes for newly rendered cards
      const newReveals = alacarteGrid.querySelectorAll('.reveal');
      if (newReveals.length > 0 && typeof IntersectionObserver !== 'undefined') {
        const obs = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.02 });
        newReveals.forEach(el => obs.observe(el));
      }
    };

    const getIconForCat = (cat) => {
      switch (cat) {
        case 'smm': return '📱';
        case 'ads': return '🚀';
        case 'seo_maps': return '🔍';
        case 'web': return '💻';
        case 'packages': return '📦';
        case 'free': return '🎁';
        default: return '⚡';
      }
    };

    // Tab bindings
    alaTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alaTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        renderAlacarte();
      });
    });

    // Search input bindings
    const handleAlaSearch = () => {
      searchQuery = alaSearchInput.value;
      if (alaClearBtn) {
        alaClearBtn.classList.toggle('visible', searchQuery.length > 0);
      }
      renderAlacarte();
    };

    if (alaSearchInput) {
      alaSearchInput.addEventListener('input', handleAlaSearch);
    }

    if (alaClearBtn) {
      alaClearBtn.addEventListener('click', () => {
        alaSearchInput.value = '';
        handleAlaSearch();
        alaSearchInput.focus();
      });
    }

    renderAlacarte();
  }

  // --- 7. Blog Posts Rendering & Modal Logic ---
  const blogGrid = document.getElementById('blog-posts-grid');
  const blogModal = document.getElementById('blog-reader-modal');
  const blogModalContent = document.getElementById('blog-reader-content');
  const blogModalCloseBtn = document.getElementById('blog-modal-close-btn');
  const blogModalCloseBg = document.getElementById('blog-modal-close-bg');

  if (blogGrid && blogModal && blogModalContent) {
    // Populate Blog Grid
    BLOG_POSTS_DATA.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card reveal';
      card.innerHTML = `
        <div class="blog-card-meta">${post.category} · ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="blog-read-more">Read Insight →</span>
      `;
      
      card.addEventListener('click', () => {
        // Render detailed content
        blogModalContent.innerHTML = post.content;
        
        // Re-inject close button since we overwrite innerHTML
        blogModalContent.appendChild(blogModalCloseBtn);
        
        // Open modal
        blogModal.classList.add('active');
        blogModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock scrolling
      });
      
      blogGrid.appendChild(card);
    });

    // Modal close handlers
    const closeModal = () => {
      blogModal.classList.remove('active');
      blogModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scrolling
    };

    if (blogModalCloseBtn) blogModalCloseBtn.addEventListener('click', closeModal);
    if (blogModalCloseBg) blogModalCloseBg.addEventListener('click', closeModal);
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});
