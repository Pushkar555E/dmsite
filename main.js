/* ===================================================================
   PUSHKAR GROWTH DIGITAL — MAIN CONTROLLER
   Handling Hero Typing, Scroll Reveals, Mock Dashboard, Mobile Nav & Forms
   =================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Set dynamic cross-routing link hrefs ---
  const isLocalServer = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isFileProtocol = window.location.protocol === 'file:';
  
  const getLink = (target) => {
    const PRODUCTION_DOMAINS = {
      dev: 'https://pushkar-port.vercel.app',
      cafe: 'https://esite-two.vercel.app'
    };
    const DEV_PORTS = {
      dev: 'http://localhost:5173',
      cafe: 'http://localhost:5175'
    };
    const RELATIVE_PATHS = {
      dev: '../PushkarPort/index.html',
      cafe: '../esite/index.html'
    };
    
    if (isFileProtocol) return RELATIVE_PATHS[target];
    if (isLocalServer) return DEV_PORTS[target];
    return PRODUCTION_DOMAINS[target];
  };

  document.querySelectorAll('.client-dev-btn').forEach(link => link.setAttribute('href', getLink('dev')));
  document.querySelectorAll('.client-cyber-btn').forEach(link => link.setAttribute('href', getLink('cafe')));

  // --- 1. Mobile Menu Hamburger Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when links are clicked
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 2. Floating Navbar Scroll State ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- 3. Scroll Reveal Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -45px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 4. Hero Headline Typing Animation ---
  const typingWords = ["FOOT TRAFFIC. 📍", "LEADS. 🎯", "REVENUE. 📈"];
  const typingSpeed = 100;
  const deletingSpeed = 60;
  const delayBetweenWords = 2000;
  
  const typingContainer = document.getElementById('hero-typing');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    if (!typingContainer) return;
    const currentWord = typingWords[wordIndex];

    if (isDeleting) {
      // Deleting characters
      typingContainer.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Typing characters
      typingContainer.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine timeouts
    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      // Full word typed, pause before deleting
      currentSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word completely deleted, move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      currentSpeed = 500; // Small delay before typing next word
    }

    setTimeout(typeEffect, currentSpeed);
  };

  if (typingContainer) {
    typeEffect();
  }

  // --- 5. Simulated Interactive Dashboard Graphic ---
  const chartVal = document.getElementById('mock-chart-val');
  const barElements = document.querySelectorAll('.mock-bar');
  
  if (chartVal) {
    // Count up animation for revenue
    const targetRevenue = 84250;
    const duration = 2000; // 2 seconds
    const startTimestamp = performance.now();

    const animateRevenue = (timestamp) => {
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const currentVal = Math.floor(easeOutQuad * targetRevenue);
      
      chartVal.textContent = '₹' + currentVal.toLocaleString('en-IN');
      
      if (progress < 1) {
        requestAnimationFrame(animateRevenue);
      }
    };
    
    // Trigger animations when visual enters viewport
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && typeof IntersectionObserver !== 'undefined') {
      const visualObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(animateRevenue);
            // Animate bar heights
            barElements.forEach(bar => {
              const targetHeight = bar.style.height;
              bar.style.height = '0%';
              setTimeout(() => {
                bar.style.height = targetHeight;
              }, 100);
            });
            visualObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      visualObserver.observe(heroVisual);
    } else {
      requestAnimationFrame(animateRevenue);
    }
  }

  // --- 6. Contact Form Submission (Web3Forms Integration) ---
  const contactForm = document.getElementById('mkt-contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success-msg');

  if (contactForm && submitBtn && successMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Request...</span>';

      const keyInput = document.getElementById('ala-web3forms-key');
      const accessKey = keyInput ? keyInput.value : '';

      // Fallback simulation for local dev if key is missing/placeholder
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        console.warn('Web3Forms: Using local simulation.');
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
        alert('Network error encountered. Please check connection.');
      });
    });
  }

  // --- 7. A-la-Carte Pricing Tabs Controller ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const pricingPanels = document.querySelectorAll('.pricing-panel');

  if (tabButtons.length > 0 && pricingPanels.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(b => b.classList.remove('active'));
        pricingPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and target panel
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

});
