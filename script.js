/* ============================================================
   MADHAN KUMAR PORTFOLIO - JavaScript
   Features: Loader, Typing Animation, Dark Mode, Scroll Effects,
   Skill Bars, Project Filter, Contact Form, Back-to-Top, Particles
   ============================================================ */

'use strict';

/* ====================================
   UTILITY FUNCTIONS
   ==================================== */
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ====================================
   LOADING SCREEN
   ==================================== */
(function initLoader() {
  const loader = qs('#loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1600);
  });

  document.body.style.overflow = 'hidden';
})();

/* ====================================
   SCROLL PROGRESS BAR
   ==================================== */
(function initScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ====================================
   NAVBAR — SCROLL & ACTIVE LINK
   ==================================== */
(function initNavbar() {
  const navbar = qs('#navbar');
  const navLinks = qsa('.nav-link');
  const sections = qsa('section[id]');

  // Scroll effect
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ====================================
   MOBILE NAVIGATION
   ==================================== */
(function initMobileNav() {
  const hamburger = qs('#hamburger');
  const mobileNav = qs('#mobile-nav');
  const mobileLinks = qsa('.mobile-nav .nav-link');

  if (!hamburger || !mobileNav) return;

  const toggle = () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  const close = () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', toggle);
  mobileLinks.forEach(link => link.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      close();
    }
  });
})();

/* ====================================
   DARK / LIGHT MODE TOGGLE
   ==================================== */
(function initTheme() {
  const toggle = qs('#theme-toggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ====================================
   TYPING ANIMATION
   ==================================== */
(function initTyping() {
  const el = qs('#typing-text');
  if (!el) return;

  const phrases = [
    'AI / ML Engineer',
    'Full Stack Developer',
    'Data Analyst',
    'Problem Solver',
    'Software Engineer',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  const tick = () => {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = current.slice(0, charIdx);

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 300;
    } else {
      delay = isDeleting ? 50 : 100;
    }

    setTimeout(tick, delay);
  };

  setTimeout(tick, 800);
})();

/* ====================================
   HERO PARTICLES
   ==================================== */
(function initParticles() {
  const container = qs('#particles-container');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.3 + 0.1};
    `;
    container.appendChild(p);
  }
})();

/* ====================================
   SCROLL REVEAL ANIMATIONS
   ==================================== */
(function initReveal() {
  const revealEls = qsa('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ====================================
   ANIMATED SKILL BARS
   ==================================== */
(function initSkillBars() {
  const bars = qsa('.skill-bar-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        requestAnimationFrame(() => {
          bar.style.width = `${width}%`;
        });
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ====================================
   PROJECT FILTER
   ==================================== */
(function initProjectFilter() {
  const filterBtns = qsa('.filter-btn');
  const projectCards = qsa('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards with animation
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const match = filter === 'all' || category === filter;

        if (match) {
          card.style.animation = '';
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.transition = 'opacity 0.2s ease';
          card.style.opacity = '0';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
})();

/* ====================================
   CONTACT FORM
   ==================================== */
(function initContactForm() {
  const form = qs('#contact-form');
  const successMsg = qs('#form-success');
  const submitBtn = qs('#form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name = qs('#form-name').value.trim();
    const email = qs('#form-email').value.trim();
    const subject = qs('#form-subject').value.trim();
    const message = qs('#form-message').value.trim();

    if (!name || !email || !subject || !message) {
      shakeForm(form);
      return;
    }

    if (!isValidEmail(email)) {
      qs('#form-email').style.borderColor = '#EF4444';
      setTimeout(() => {
        qs('#form-email').style.borderColor = '';
      }, 2000);
      return;
    }

    // Real submission via Web3Forms (emails go directly to madhankumarbala2k@gmail.com)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Get your free access key at https://web3forms.com
          name: name,
          email: email,
          subject: subject,
          message: message,
          from_name: "Madhan Kumar Portfolio Contact"
        })
      });

      const json = await response.json();
      
      if (response.status === 200 || json.success) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.background = '#16A34A';
        if (successMsg) {
          successMsg.style.display = 'flex';
          successMsg.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i> Message sent successfully! I will get back to you soon.';
          successMsg.style.color = '#155724';
        }
        form.reset();
      } else {
        throw new Error(json.message || "Failed to submit form.");
      }
    } catch (err) {
      submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
      submitBtn.style.background = '#EF4444';
      if (successMsg) {
        successMsg.style.display = 'flex';
        successMsg.innerHTML = `<i class="fas fa-times-circle" aria-hidden="true"></i> Error: ${err.message || 'Something went wrong.'}`;
        successMsg.style.color = '#721C24';
      }
    }

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.style.background = '';
      if (successMsg) {
        successMsg.style.display = 'none';
        successMsg.style.color = '';
      }
    }, 5000);
  });

  // Real-time email validation feedback
  const emailInput = qs('#form-email');
  emailInput?.addEventListener('blur', () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      emailInput.style.borderColor = '#EF4444';
    } else {
      emailInput.style.borderColor = '';
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeForm(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
  }
})();

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ====================================
   BACK TO TOP BUTTON
   ==================================== */
(function initBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ====================================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ==================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ====================================
   COUNTER ANIMATION (Stats)
   ==================================== */
(function initCounters() {
  const statNumbers = qsa('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const hasPlus = text.includes('+');
        const num = parseInt(text.replace(/\D/g, ''), 10);

        if (isNaN(num)) return;

        let start = 0;
        const duration = 1200;
        const step = num / (duration / 16);

        const tick = () => {
          start = Math.min(start + step, num);
          el.textContent = Math.floor(start) + (hasPlus ? '+' : '') + (text.includes('/') ? '+' : '');
          if (start < num) requestAnimationFrame(tick);
          else el.textContent = text; // restore original
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
})();

/* ====================================
   CARD HOVER TILT EFFECT (subtle)
   ==================================== */
(function initCardTilt() {
  if (window.innerWidth < 768) return; // skip on mobile

  const cards = qsa('.project-card, .cert-card, .achievement-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ====================================
   KEYBOARD ACCESSIBILITY
   ==================================== */
(function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const mobileNav = qs('#mobile-nav');
      const hamburger = qs('#hamburger');
      if (mobileNav?.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();

/* ====================================
   PRINT / RESUME DOWNLOAD FEEDBACK
   ==================================== */
(function initResumeDownload() {
  const btns = qsa('[download][href="MADHAN_KUMAR_Resume.pdf"], #download-resume-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Show tooltip feedback (resume.pdf needs to exist)
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.style.opacity = '';
      }, 500);
    });
  });
})();

/* ====================================
   PERFORMANCE: Lazy load images
   ==================================== */
(function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // native lazy load supported

  const imgs = qsa('img[loading="lazy"]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      }
    });
  });

  imgs.forEach(img => observer.observe(img));
})();

/* ====================================
   LOG WELCOME MESSAGE
   ==================================== */
console.log(
  '%c👋 Hello, Recruiter!',
  'font-size:24px;font-weight:bold;color:#2563EB;'
);
console.log(
  '%cThis portfolio was built by Madhan Kumar — AI/ML Engineer & Full Stack Developer.',
  'font-size:14px;color:#334155;'
);
console.log(
  '%c📧 Contact: madhankumarbala2k@gmail.com',
  'font-size:13px;color:#64748B;'
);
