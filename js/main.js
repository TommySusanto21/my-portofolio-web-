'use strict';

/* ============================================================
   TYPED-TEXT ANIMATION
   ============================================================ */
const roles = [
  'Mahasiswa Teknik Informatika',
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const TYPING_SPEED = 90;
const DELETE_SPEED = 50;
const PAUSE_AFTER  = 2000;
const PAUSE_BEFORE = 400;

function typeEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const current = roles[roleIndex];
  el.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  let delay = isDeleting ? DELETE_SPEED : TYPING_SPEED;
  if (!isDeleting && charIndex === current.length) {
    delay = PAUSE_AFTER; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = PAUSE_BEFORE;
  }
  setTimeout(typeEffect, delay);
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
function initSkillBars() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => io.observe(c));
}

/* ============================================================
   ACTIVE NAV INDICATOR
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item[data-section]');
  function update() {
    let current = '';
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(s => { if (scrollY >= s.offsetTop) current = s.id; });
    navItems.forEach(item => item.classList.toggle('active', item.dataset.section === current));
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileDrawer();
    });
  });
}

/* ============================================================
   MOBILE DRAWER
   ============================================================ */
function closeMobileDrawer() {
  const drawer  = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer)  drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function initMobileDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const overlay   = document.getElementById('drawerOverlay');
  const closeBtn  = document.getElementById('drawerClose');
  function open() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  if (hamburger) hamburger.addEventListener('click', open);
  if (closeBtn)  closeBtn.addEventListener('click', closeMobileDrawer);
  if (overlay)   overlay.addEventListener('click', closeMobileDrawer);
}

/* ============================================================
   TOPBAR HIDE ON SCROLL DOWN
   ============================================================ */
function initTopbar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    topbar.style.transform = (y > 80 && y > lastY) ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y;
  }, { passive: true });
}

/* ============================================================
   HERO GLOW PARALLAX
   ============================================================ */
function initHeroParallax() {
  const hero = document.querySelector('.hero-section');
  const glow = document.querySelector('.profile-glow');
  if (!hero || !glow) return;
  hero.addEventListener('mousemove', e => {
    const r  = hero.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width  - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    glow.style.transform = `translate(${cx * 20}px, ${cy * 20}px) scale(1.05)`;
  });
  hero.addEventListener('mouseleave', () => { glow.style.transform = ''; });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  initReveal();
  initSkillBars();
  initActiveNav();
  initSmoothScroll();
  initMobileDrawer();
  initTopbar();
  initHeroParallax();
});
