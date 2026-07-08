'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const header = $('#siteHeader');
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');
const themeToggle = $('#themeToggle');
const searchOpen = $('#searchOpen');
const searchClose = $('#searchClose');
const searchModal = $('#searchModal');
const siteSearch = $('#siteSearch');
const searchResults = $('#searchResults');

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  const themeText = themeToggle?.querySelector('.theme-switch-text');
  if (themeText) themeText.textContent = isDark ? 'Dark' : 'Light';
};

applyTheme(localStorage.getItem('nexora-theme') || 'light');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', String(open));
});

$$('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
  localStorage.setItem('nexora-theme', nextTheme);
  applyTheme(nextTheme);
});

const searchable = [
  ['Services', 'services.html'],
  ['Portfolio', 'portfolio.html'],
  ['Case Studies', 'portfolio.html#case-studies'],
  ['Industries', '#industries'],
  ['Pricing', '#pricing'],
  ['Resources', '#resources'],
  ['Blog', 'blog.html'],
  ['Reviews', '#reviews'],
  ['Careers', '#careers'],
  ['Contact', 'contact.html'],
  ['Book Consultation', '#book'],
  ['Privacy Policy', '#privacy'],
  ['Terms', '#terms'],
];

const renderSearch = (query = '') => {
  if (!searchResults) return;
  const q = query.trim().toLowerCase();
  const results = searchable.filter(([label]) => label.toLowerCase().includes(q)).slice(0, 8);
  searchResults.innerHTML = results.map(([label, href]) => `<a href="${href}">${label}</a>`).join('') || '<p>No matching page found.</p>';
};

searchOpen?.addEventListener('click', () => {
  if (!searchModal) return;
  searchModal.classList.add('active');
  searchModal.setAttribute('aria-hidden', 'false');
  renderSearch();
  setTimeout(() => siteSearch?.focus(), 50);
});

searchClose?.addEventListener('click', () => {
  if (!searchModal) return;
  searchModal.classList.remove('active');
  searchModal.setAttribute('aria-hidden', 'true');
});

searchModal?.addEventListener('click', (event) => {
  if (event.target === searchModal) searchClose.click();
});

siteSearch?.addEventListener('input', (event) => renderSearch(event.target.value));
searchResults?.addEventListener('click', () => searchClose.click());

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

$$('.reveal').forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 42));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 24);
    observer.unobserve(el);
  });
}, { threshold: 0.6 });

$$('.counter').forEach((counter) => counterObserver.observe(counter));

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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && searchModal?.classList.contains('active')) searchClose.click();
});
