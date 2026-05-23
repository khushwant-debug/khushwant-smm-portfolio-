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

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animFollower);
  }
  animFollower();

  document.querySelectorAll('a, button, .skill-item, .project-card, .service-card, .testi-card, .stat-card, .timeline-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

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
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

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

/* ── PARTICLES CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = [];
  const count = window.innerWidth < 768 ? 40 : 80;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '61,122,255' : '124,92,252';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(61,122,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

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
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-6px)`;
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
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    blobs.forEach((blob, i) => {
      const speed = 0.04 + i * 0.02;
      blob.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
})();

/* ── FLOAT CARD PARALLAX ON MOUSE ── */
(function heroMouseParallax() {
  const hero = document.getElementById('hero');
  if (!hero || window.innerWidth < 1024) return;

  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    const floatCards = document.querySelectorAll('.float-card');
    floatCards.forEach((card, i) => {
      const factor = 0.5 + i * 0.3;
      card.style.transform = `translate(${-x * factor}px, ${-y * factor}px)`;
    });
  });
})();

/* ── PRELOADER body overflow ── */
document.body.style.overflow = 'hidden';
