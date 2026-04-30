/* ═══════════════════════════════════════════
   PORTFOLIO — script.js
   Interactive: Cursor, Navbar, Scroll Reveal,
   Skill Bars, Progress Bars, Form,
   Candlestick Chart Hero Animation
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ── 0. LOADING SCREEN ── */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hide');
    // remove from DOM after fade completes
    setTimeout(() => loader.remove(), 700);
  }, 2000); // 2 seconds total — adjust if you want longer
});

  /* ── 1. CUSTOM CURSOR ──────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0;
  let curX = 0,   curY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, input, textarea, .project-card, .hobby-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });


  /* ── 2. NAVBAR SCROLL ─────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ── 3. HAMBURGER MENU ────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });


  /* ── 4. SCROLL REVEAL ─────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.dataset.delay = (Array.from(revealEls).indexOf(el) % 4) * 80;
    revealObserver.observe(el);
  });


  /* ── 5. SKILL BAR ANIMATION ───────────── */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width || el.style.width;
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => {
    fill.dataset.width = fill.style.width;
    fill.style.width = '0';
    skillObserver.observe(fill);
  });


  /* ── 6. PROJECT PROGRESS BAR ANIMATION ── */
  const progressFills = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width || el.style.width;
        progressObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  progressFills.forEach(fill => {
    fill.dataset.width = fill.style.width;
    fill.style.width = '0';
    progressObserver.observe(fill);
  });


  /* ── 7. ACTIVE NAV LINK ON SCROLL ─────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


 
  /* ── 8. CONTACT FORM ──────────────────── */
const form    = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

// ↓↓ PASTE YOUR OWN IDs HERE ↓↓
const EMAILJS_SERVICE_ID  = 'service_rpsd9tl';
const EMAILJS_TEMPLATE_ID = 'template_ldlv20l';
const EMAILJS_PUBLIC_KEY  = 'AHmPaBfdvSnhrlPDP';

emailjs.init(EMAILJS_PUBLIC_KEY);

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    const templateParams = {
      from_name:  form.querySelector('input[type="text"]').value,
      from_email: form.querySelector('input[type="email"]').value,
      subject:    form.querySelectorAll('input[type="text"]')[1]?.value || 'No subject',
      message:    form.querySelector('textarea').value,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        formMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
        formMsg.style.color = '#1d9e75';
        form.reset();
        btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
        setTimeout(() => formMsg.textContent = '', 6000);
      })
      .catch((err) => {
        formMsg.textContent = '✗ Something went wrong. Please try again.';
        formMsg.style.color = '#c0392b';
        btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
        console.error('EmailJS error:', err);
      });
  });
}


  /* ── 9. SMOOTH SCROLL OFFSET FOR FIXED NAV ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 10. CURRENT YEAR IN FOOTER ─────────── */
  const yearEl = document.querySelector('.footer-copy');
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
  }


  /* ══════════════════════════════════════════
     ── 11. CANDLESTICK CHART HERO ANIMATION ──
     Scrolling uptrend candles on the right
     side of the hero section
  ══════════════════════════════════════════ */

  const canvas = document.getElementById('candleChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CANDLE_W   = 16;   // body width px (wider)
  const CANDLE_GAP = 34;   // spacing between candles
  const SCROLL_SPD = 0.45; // scroll speed
  const UPTREND    = 0.68; // % chance of green candle

  let candles = [];
  let scrollX = 0;

  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function makeCandle(prevClose) {
    const isUp     = Math.random() < UPTREND;
    const bodySize = 30 + Math.random() * 60; // much taller bodies
    const open     = prevClose + (Math.random() - 0.46) * 7;
    const close    = isUp ? open + bodySize : open - bodySize;
    const high     = Math.max(open, close) + Math.random() * 20;
    const low      = Math.min(open, close) - Math.random() * 15;
    return { open, close, high, low, isUp };
  }

  function initCandles() {
    const count = Math.ceil(canvas.width / CANDLE_GAP) + 8;
    candles = [];
    let price = canvas.height * 0.3; // start lower so candles fill more height

    for (let i = 0; i < count; i++) {
      const c = makeCandle(price);
      // Gentler upward trend lift so candles don't go off screen
      const lift = (count - i) * 2.0;
      c.open  -= lift;
      c.close -= lift;
      c.high  -= lift;
      c.low   -= lift;
      price = c.close;
      candles.push(c);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseline = canvas.height * 0.88;
    const scaleY   = 2.8; // tall vertical scale — fills the hero height

    /* Grid lines */
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth   = 1;
    [0.2, 0.4, 0.6, 0.8].forEach(pct => {
      const y = canvas.height * pct;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    });

    /* Volume bars (background) */
    candles.forEach((c, i) => {
      const x   = i * CANDLE_GAP - (scrollX % CANDLE_GAP);
      const vol = 14 + Math.abs(c.close - c.open) * 1.4;
      ctx.fillStyle = c.isUp ? 'rgba(29,158,117,0.07)' : 'rgba(192,57,43,0.05)';
      ctx.fillRect(x, baseline - vol, CANDLE_W + 2, vol);
    });

    /* Trend line (dashed gold) */
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(201,168,76,0.22)';
    ctx.lineWidth   = 1.4;
    ctx.setLineDash([5, 9]);
    candles.forEach((c, i) => {
      const x   = i * CANDLE_GAP - (scrollX % CANDLE_GAP) + CANDLE_W / 2;
      const mid = (c.open + c.close) / 2;
      const y   = baseline - mid * scaleY;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    /* Candles */
    candles.forEach((c, i) => {
      const x      = i * CANDLE_GAP - (scrollX % CANDLE_GAP);
      const cx     = x + CANDLE_W / 2;
      const openY  = baseline - c.open  * scaleY;
      const closeY = baseline - c.close * scaleY;
      const highY  = baseline - c.high  * scaleY;
      const lowY   = baseline - c.low   * scaleY;
      const bodyTop = Math.min(openY, closeY);
      const bodyH   = Math.max(Math.abs(closeY - openY), 2);
      const color   = c.isUp ? '#1d9e75' : '#c0392b';

      /* Glow */
      ctx.shadowColor = color;
      ctx.shadowBlur  = c.isUp ? 10 : 6;

      /* Wick */
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      ctx.moveTo(cx, highY);
      ctx.lineTo(cx, lowY);
      ctx.stroke();

      /* Body */
      ctx.globalAlpha = 0.92;
      ctx.fillStyle   = color;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(x, bodyTop, CANDLE_W, bodyH, 2);
        ctx.fill();
      } else {
        ctx.fillRect(x, bodyTop, CANDLE_W, bodyH);
      }

      /* Shine on green candles */
      if (c.isUp && bodyH > 5) {
        ctx.globalAlpha = 0.16;
        ctx.fillStyle   = '#ffffff';
        ctx.fillRect(x + 2, bodyTop + 2, 3, Math.min(bodyH * 0.4, 12));
      }

      ctx.shadowBlur  = 0;
      ctx.globalAlpha = 1;
    });

    /* Live price label on last candle */
    const last = candles[candles.length - 2];
    if (last) {
      const lx    = (candles.length - 2) * CANDLE_GAP - (scrollX % CANDLE_GAP);
      const ly    = baseline - last.close * scaleY - 18;
      const price = (1000 + Math.abs(last.close) * 2.5).toFixed(2);
      ctx.font        = '500 11px DM Sans, sans-serif';
      ctx.fillStyle   = last.isUp ? '#5dcaa5' : '#f09595';
      ctx.globalAlpha = 0.75;
      ctx.fillText((last.isUp ? '▲ ' : '▼ ') + price, lx - 8, Math.max(ly, 16));
      ctx.globalAlpha = 1;
    }
  }

  function animate() {
    scrollX += SCROLL_SPD;
    if (scrollX >= CANDLE_GAP) {
      scrollX = 0;
      candles.shift();
      candles.push(makeCandle(candles[candles.length - 1].close));
    }
    draw();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initCandles();
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initCandles();
  }, { passive: true });

});
