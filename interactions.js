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
