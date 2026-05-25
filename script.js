/* ============================================
   KHUSHWANT SINGH — PREMIUM PORTFOLIO JS
   ============================================ */

'use strict';

/* ── PRELOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
  }, 2200);
});

/* ── SCROLL PROGRESS ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}
initScrollProgress();

/* ── CUSTOM CURSOR REMOVED FOR PERFORMANCE ── */

/* ── NAVBAR ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
})();

/* ── ACTIVE NAV SECTION ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ── SCROLL REVEAL ── */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-line');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

/* ── ANIMATED COUNTERS ── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let started = false;

  function startCounters() {
    if (started) return;
    started = true;
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const scale = parseFloat(counter.dataset.scale || 1);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        const display = scale >= 1000000
          ? (current / scale).toFixed(1)
          : scale > 1
          ? (current / scale).toFixed(1)
          : Math.floor(current).toLocaleString();
        counter.textContent = display + suffix;
      }, stepTime);
    });
  }

  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startCounters();
      observer.disconnect();
    }
  }, { threshold: 0.4 });

  observer.observe(statsSection);
})();

/* ── PARTICLES CANVAS REMOVED FOR PERFORMANCE ── */

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── CONTACT FORM ── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit span');
    if (btn) btn.textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 4000);
      }
      if (btn) btn.textContent = 'Send Message';
    }, 1200);
  });
})();

/* ── HERO TITLE STAGGER ── */
(function staggerHero() {
  const lines = document.querySelectorAll('.title-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(30px)';
    line.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 2400 + i * 120);
  });

  const heroEls = document.querySelectorAll('#hero .reveal-up');
  heroEls.forEach((el, i) => {
    el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => el.classList.add('visible'), 2600 + i * 150);
  });

  const heroRight = document.querySelectorAll('#hero .reveal-right');
  heroRight.forEach((el, i) => {
    el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => el.classList.add('visible'), 2900 + i * 200);
  });
})();

/* ── TILT EFFECT ON PROJECT CARDS ── */
(function initTilt() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.project-card, .testi-card, .stat-card').forEach(card => {
    let ticking = false;
    card.addEventListener('mousemove', e => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (rect.width / 2);
          const dy = (e.clientY - cy) / (rect.height / 2);
          card.style.transform = `perspective(600px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translate3d(0, -6px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── NAVBAR LOGO GLOW ── */
(function navLogoHover() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  logo.addEventListener('mouseenter', () => {
    logo.style.textShadow = '0 0 20px rgba(61,122,255,0.5)';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.textShadow = '';
  });
})();

/* ── SERVICE CARDS WAVE ── */
(function serviceWave() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 50}ms`;
  });
})();

/* ── SCROLL-TRIGGERED BACKGROUND SHIFT ── */
(function initBgParallax() {
  const blobs = document.querySelectorAll('.hero-blob');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        blobs.forEach((blob, i) => {
          const speed = 0.04 + i * 0.02;
          blob.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── FLOAT CARD PARALLAX ON MOUSE ── */
(function heroMouseParallax() {
  const hero = document.getElementById('hero');
  if (!hero || window.innerWidth < 1024) return;

  let ticking = false;
  document.addEventListener('mousemove', e => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        const floatCards = document.querySelectorAll('.float-card');
        floatCards.forEach((card, i) => {
          const factor = 0.5 + i * 0.3;
          card.style.transform = `translate3d(${-x * factor}px, ${-y * factor}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── PRELOADER body overflow ── */
document.body.style.overflow = 'hidden';
