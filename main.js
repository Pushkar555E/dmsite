import { site } from './site.config.js';

'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const header = $('#siteHeader');
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');
const themeToggle = $('#themeToggle');
const urlParams = new URLSearchParams(window.location.search);

const trackEvent = (name, detail = {}) => {
  if (window.gtag && site.placeholders.ga4MeasurementId !== 'G-REPLACE_ME') {
    window.gtag('event', name, detail);
  }
  window.dispatchEvent(new CustomEvent('nexora:event', { detail: { name, ...detail } }));
};

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  const text = themeToggle?.querySelector('.theme-switch-text');
  if (text) text.textContent = isDark ? 'Dark' : 'Light';
};

applyTheme(localStorage.getItem('nexora-theme') || 'light');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('active') || false;
  navToggle.setAttribute('aria-expanded', String(open));
});

$$('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
  localStorage.setItem('nexora-theme', nextTheme);
  applyTheme(nextTheme);
});

$$('.reveal').forEach((el) => {
  if (!('IntersectionObserver' in window)) {
    el.classList.add('visible');
    return;
  }
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => revealObserver.observe(el));
}

$$('.filter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.filter-btn').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.project-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

let activeModal = null;
let lastFocused = null;

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const closeModal = () => {
  if (!activeModal) return;
  activeModal.classList.remove('active');
  activeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocused?.focus();
  activeModal = null;
};

const openModal = (id) => {
  const modal = $(`#project-${id}`);
  if (!modal) return;
  lastFocused = document.activeElement;
  activeModal = modal;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const firstFocus = $(focusableSelector, modal) || $('.modal-card', modal);
  firstFocus?.focus();
};

$$('[data-project-open]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.projectOpen));
});

$$('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));
$$('.project-modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
  if (event.key !== 'Tab' || !activeModal) return;
  const focusables = $$(focusableSelector, activeModal).filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const validateForm = (form) => {
  const status = $('.form-status', form);
  const required = $$('[required]', form);
  for (const field of required) {
    if ((field.type === 'checkbox' && !field.checked) || !field.value.trim()) {
      field.focus();
      if (status) {
        status.textContent = 'Please complete all required fields before submitting.';
        status.className = 'form-status error full';
      }
      return false;
    }
  }
  const email = $('input[type="email"]', form);
  if (email && !email.checkValidity()) {
    email.focus();
    if (status) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status error full';
    }
    return false;
  }
  return true;
};

$$('[data-contact-form]').forEach((form) => {
  const selectedPackage = urlParams.get('package') || sessionStorage.getItem('nexora-selected-package');
  const packageSelect = $('[data-package-select]', form);
  if (selectedPackage && packageSelect) {
    const option = Array.from(packageSelect.options).find((item) => item.value === selectedPackage);
    if (option) {
      packageSelect.value = selectedPackage;
      sessionStorage.setItem('nexora-selected-package', selectedPackage);
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = $('.form-status', form);
    const submit = $('button[type="submit"]', form);
    const accessKey = $('input[name="access_key"]', form)?.value;

    if (!validateForm(form)) return;
    if (!accessKey || accessKey === site.placeholders.web3formsAccessKey) {
      if (status) {
        status.textContent = 'Form is ready, but the Web3Forms access key still needs to be replaced in site.config.js.';
        status.className = 'form-status error full';
      }
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Sending...';
    if (status) {
      status.textContent = 'Sending your request...';
      status.className = 'form-status full';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Form service rejected the request.');
      form.reset();
      trackEvent('contact_form_submission', { form: form.id || 'contact' });
      if (status) {
        status.textContent = 'Thank you. Your request was sent successfully.';
        status.className = 'form-status success full';
      }
    } catch (error) {
      if (status) {
        status.textContent = 'Something went wrong while sending. Please use WhatsApp or email for now.';
        status.className = 'form-status error full';
      }
    } finally {
      submit.disabled = false;
      submit.textContent = submit.dataset.submitLabel || 'Send Request';
    }
  });
});

$$('[data-track], a[href^="mailto:"], a[href*="wa.me"]').forEach((element) => {
  element.addEventListener('click', () => {
    const href = element.getAttribute('href') || '';
    const packageMatch = href.match(/[?&]package=([^&#]+)/);
    if (packageMatch) sessionStorage.setItem('nexora-selected-package', decodeURIComponent(packageMatch[1]));
    const eventName = element.dataset.track || (href.startsWith('mailto:') ? 'email_click' : href.includes('wa.me') ? 'whatsapp_click' : 'link_click');
    trackEvent(eventName, { href });
  });
});
