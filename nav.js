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
      <span class="nav__lang">FA&nbsp;&nbsp;/&nbsp;&nbsp;EN</span>
      <ul class="nav__links">
        <li><a href="${homeHref}#hero">خانه</a></li>
        <li><a href="${homeHref}#index">فهرست</a></li>
        <li><a href="${homeHref}#about">درباره من</a></li>
      </ul>
      <a href="${homeHref || '#hero'}" class="nav__logo" aria-label="سعید لواعی — صفحه اصلی">
        <svg viewBox="0 0 175.01 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,12.5V61.24c0,35.21-28.55,63.76-63.76,63.76h-3.23C14.78,125,0,139.78,0,158.02v29.48c0,6.9,5.6,12.5,12.5,12.5h0c6.9,0,12.5-5.6,12.5-12.5v-25c0-6.9,5.6-12.5,12.5-12.5h0c6.91,0,12.5,5.6,12.5,12.5v1.88c0,19.67,15.94,35.61,35.61,35.61h1.9c6.9,0,12.5-5.6,12.5-12.5h0c0-6.9-5.6-12.5-12.5-12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.91,5.6-12.5,12.5-12.5h50c6.9,0,12.5,5.6,12.5,12.5h0c0,6.91-5.6,12.5-12.5,12.5h0c-6.9,0-12.5,5.6-12.5,12.5h0c0,6.9,5.6,12.5,12.5,12.5h0c20.71,0,37.5-16.79,37.5-37.5h0c0-20.71-16.79-37.5-37.5-37.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9,5.6-12.5,12.5-12.5h25.01c6.9,0,12.5-5.6,12.5-12.5h0c0-6.91-5.6-12.5-12.5-12.5h-25.01c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.91,5.6-12.5,12.5-12.5h25.01c6.9,0,12.5-5.6,12.5-12.5h0c0-6.91-5.6-12.5-12.5-12.5h-25.01c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9-5.59-12.49-12.49-12.5h0c-6.9,0-12.5,5.59-12.5,12.5Z"/>
          <path d="M75,62.5V12.5c0-6.9-5.6-12.5-12.5-12.5h0c-6.9,0-12.5,5.6-12.5,12.5h0c0,6.9-5.6,12.5-12.5,12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0C25,5.6,19.41,0,12.5,0h0C5.6,0,0,5.6,0,12.5V62.5c0,20.71,16.79,37.5,37.5,37.5h0c20.71,0,37.5-16.79,37.5-37.5Zm-37.5-12.5h0c6.9,0,12.5,5.6,12.5,12.5h0c0,6.91-5.6,12.5-12.5,12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9,5.6-12.5,12.5-12.5Z"/>
        </svg>
      </a>
    </div>
  `;

  const mount = document.getElementById('site-nav');
  if (mount) {
    mount.replaceWith(nav);
  } else {
    document.body.prepend(nav);
  }
})();
