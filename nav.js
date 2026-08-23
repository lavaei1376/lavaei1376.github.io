/* =========================================================
   SHARED NAV — injected into #site-nav on every page.
   Edit once here, updates everywhere. Home links use anchors
   (#index, #about); on case-study pages these should still
   resolve correctly since they point back to index.html's
   sections — handled via the data-home-anchor prefix below.
   ========================================================= */
(function () {
  const isHome = document.body.getAttribute('data-page') === 'home';
  const homeHref = isHome ? '' : 'index.html';

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav__inner">
      <ul class="nav__links">
        <li><a href="${homeHref}#hero">خانه</a></li>
        <li><a href="${homeHref}#index">فهرست</a></li>
        <li><a href="${homeHref}#about">درباره من</a></li>
      </ul>
      <button type="button" class="nav__toggle" aria-label="باز کردن منو" aria-expanded="false" aria-controls="nav-mobile-menu">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
      <a href="${homeHref || '#hero'}" class="nav__logo" aria-label="سعید لوائی — صفحه اصلی">
        <span class="nav__logo-name">Saeed Lavaei</span>
        <svg viewBox="0 0 175.01 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,12.5V61.24c0,35.21-28.55,63.76-63.76,63.76h-3.23C14.78,125,0,139.78,0,158.02v29.48c0,6.9,5.6,12.5,12.5,12.5h0c6.9,0,12.5-5.6,12.5-12.5v-25c0-6.9,5.6-12.5,12.5-12.5h0c6.91,0,12.5,5.6,12.5,12.5v1.88c0,19.67,15.94,35.61,35.61,35.61h1.9c6.9,0,12.5-5.6,12.5-12.5h0c0-6.9-5.6-12.5-12.5-12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.91,5.6-12.5,12.5-12.5h50c6.9,0,12.5,5.6,12.5,12.5h0c0,6.91-5.6,12.5-12.5,12.5h0c-6.9,0-12.5,5.6-12.5,12.5h0c0,6.9,5.6,12.5,12.5,12.5h0c20.71,0,37.5-16.79,37.5-37.5h0c0-20.71-16.79-37.5-37.5-37.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9,5.6-12.5,12.5-12.5h25.01c6.9,0,12.5-5.6,12.5-12.5h0c0-6.91-5.6-12.5-12.5-12.5h-25.01c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.91,5.6-12.5,12.5-12.5h25.01c6.9,0,12.5-5.6,12.5-12.5h0c0-6.91-5.6-12.5-12.5-12.5h-25.01c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9-5.59-12.49-12.49-12.5h0c-6.9,0-12.5,5.59-12.5,12.5Z"/>
          <path d="M75,62.5V12.5c0-6.9-5.6-12.5-12.5-12.5h0c-6.9,0-12.5,5.6-12.5,12.5h0c0,6.9-5.6,12.5-12.5,12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0C25,5.6,19.41,0,12.5,0h0C5.6,0,0,5.6,0,12.5V62.5c0,20.71,16.79,37.5,37.5,37.5h0c20.71,0,37.5-16.79,37.5-37.5Zm-37.5-12.5h0c6.9,0,12.5,5.6,12.5,12.5h0c0,6.91-5.6,12.5-12.5,12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9,5.6-12.5,12.5-12.5Z"/>
        </svg>
      </a>
    </div>
    <div class="nav__mobile-menu" id="nav-mobile-menu">
      <ul class="nav__mobile-links">
        <li><a href="${homeHref}#hero">خانه</a></li>
        <li><a href="${homeHref}#index">فهرست</a></li>
        <li><a href="${homeHref}#about">درباره من</a></li>
      </ul>
    </div>
  `;

  const mount = document.getElementById('site-nav');
  if (mount) {
    mount.replaceWith(nav);
  } else {
    document.body.prepend(nav);
  }

  /* =======================================================
     ANIMATION DEPTH PASS — two additions:
     1. Scroll-awareness: .is-scrolled toggled once the page
        moves off the very top, driving the shadow in styles.css.
        Runs on every page (nav is shared).
     2. Active-link scroll-spy: Home page only — tracks which of
        #hero/#index/#about is currently in view and marks the
        matching nav link .is-active. Case-study pages don't have
        these sections in-page (they link back to index.html), so
        scroll-spy is skipped there; hover-underline still works
        everywhere via CSS alone.
     ======================================================= */
  function updateScrollState() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  /* =======================================================
     MOBILE MENU — hamburger toggle for narrow viewports.
     .nav__links (desktop) is hidden below 900px via CSS; this
     button + panel is the mobile replacement. Closes on: link
     click (navigation happens anyway, but this also covers
     same-page anchor clicks), outside click, or resizing back
     above the mobile breakpoint while open.
     ======================================================= */
  const toggleBtn = nav.querySelector('.nav__toggle');
  function closeMenu() {
    nav.classList.remove('is-menu-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    nav.classList.add('is-menu-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
  toggleBtn.addEventListener('click', () => {
    if (nav.classList.contains('is-menu-open')) closeMenu();
    else openMenu();
  });
  nav.querySelectorAll('.nav__mobile-links a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-menu-open') && !nav.contains(e.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && nav.classList.contains('is-menu-open')) closeMenu();
  });

  if (isHome && 'IntersectionObserver' in window) {
    const sectionIds = ['hero', 'index', 'about'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    // Targets both the desktop link list and the mobile menu's duplicate
    // list, so the active-section indicator stays correct regardless of
    // which one is currently visible at the viewport width in use.
    const links = nav.querySelectorAll('.nav__links a, .nav__mobile-links a');

    function setActive(id) {
      links.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    }

    const spy = new IntersectionObserver(
      (entries) => {
        // Prefer the intersecting section nearest the top of the
        // viewport — correct behavior when two sections are both
        // partially visible during a fast scroll.
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.boundingClientRect.top < best.boundingClientRect.top) {
              best = entry;
            }
          }
        });
        if (best) setActive(best.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
