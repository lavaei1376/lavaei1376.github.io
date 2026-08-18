/* =========================================================
   SHARED INTERACTIONS — reintroduced this session (refinement
   pass). One file, included last on every page, driving:
     1. Scroll-reveal for every [data-reveal] element found.
     2. Real behavior for every .case-gallery__cell--slider found
        (auto-advance, pause-on-hover, manual dot clicks).
   Single shared script for both systems rather than one file per
   page — however many reveal targets or slider instances exist
   on a given page, this finds and drives all of them.
   Respects prefers-reduced-motion: reveals show immediately with
   no animation, sliders don't auto-advance (manual dots still work).
   ========================================================= */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Hero stat count-up (animation depth pass) ---
  // Triggered from inside the reveal observer below, the moment
  // .hero__stats becomes visible — no separate observer needed.
  // Skipped entirely under prefers-reduced-motion: the authored
  // Persian digits already sit in the markup as the correct final
  // value, so doing nothing is the correct reduced-motion behavior.
  const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  function toPersianDigits(n) {
    return String(n)
      .split('')
      .map((d) => PERSIAN_DIGITS[+d] ?? d)
      .join('');
  }
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count-to'), 10);
    if (isNaN(target)) return;
    const duration = 900; // slightly longer than --dur-slow (700ms) — this is a
                           // standalone micro-interaction, not a shared transition,
                           // so it isn't wired to the CSS var, but stays in the
                           // same "medium pace" family per Saeed's instruction.
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      el.textContent = toPersianDigits(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.querySelectorAll('.hero__stat-num[data-count-to]').forEach(animateCount);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // very old browsers without IntersectionObserver — fail open, don't hide content
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // --- FAQ accordion (single-item-open) ---
  document.querySelectorAll('.faq__list').forEach((list) => {
    const items = list.querySelectorAll('.faq__item');
    items.forEach((item) => {
      const btn = item.querySelector('.faq__question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((i) => {
          i.classList.remove('is-open');
          const b = i.querySelector('.faq__question');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // --- Gallery sliders ---
  document.querySelectorAll('.case-gallery__cell--slider').forEach((cell) => {
    const slides = cell.querySelectorAll('.case-gallery__slide');
    const dots = cell.querySelectorAll('.case-gallery__dots span');
    if (!slides.length) return;

    let current = 0;
    let timer = null;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        s.style.display = idx === current ? 'flex' : 'none';
      });
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
    }

    function start() {
      if (prefersReduced) return;
      stop();
      timer = setInterval(() => show(current + 1), 3500);
    }
    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach((d, idx) => {
      d.addEventListener('click', () => {
        show(idx);
        start(); // restart the auto-advance clock after a manual pick
      });
    });

    cell.addEventListener('mouseenter', stop);
    cell.addEventListener('mouseleave', start);

    show(0);
    start();
  });
})();
