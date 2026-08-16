/* =========================================================
   SHARED FOOTER — injected into #site-footer on every page.
   Edit once here, updates everywhere (Home + every case study).
   Redesigned this pass per Saeed's Figma reference: the centered
   thank-you sentence is replaced by the illustrated character
   asset, and the bottom row is flipped to match the nav's
   branding convention (name + logo mark on the right, utility
   links on the left) — previously social sat right/signature
   left, which no longer matches the header.
   Social hrefs are placeholders ("#") until real profile URLs
   exist — update SOCIAL_LINKS below once they're live.
   ========================================================= */
(function () {
  const SOCIAL_LINKS = {
    linkedin: '#',
    instagram: '#'
  };

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="site-footer__inner">
      <img class="site-footer__character" src="assets/img/footer-character.webp" alt="" data-reveal>
      <div class="site-footer__bottom-row">
        <div class="site-footer__social">
          <a href="${SOCIAL_LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener">Instagram</a>
        </div>
        <div class="site-footer__signature">
          <span class="site-footer__signature-name">Saeed Lavaei</span>
          <span class="site-footer__signature-logo" aria-hidden="true">
            <svg viewBox="0 0 175.01 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,12.5V61.24c0,35.21-28.55,63.76-63.76,63.76h-3.23C14.78,125,0,139.78,0,158.02v29.48c0,6.9,5.6,12.5,12.5,12.5h0c6.9,0,12.5-5.6,12.5-12.5v-25c0-6.9,5.6-12.5,12.5-12.5h0c6.91,0,12.5,5.6,12.5,12.5v1.88c0,19.67,15.94,35.61,35.61,35.61h1.9c6.9,0,12.5-5.6,12.5-12.5h0c0-6.9-5.6-12.5-12.5-12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.91,5.6-12.5,12.5-12.5h50c6.9,0,12.5,5.6,12.5,12.5h0c0,6.91-5.6,12.5-12.5,12.5h0c-6.9,0-12.5,5.6-12.5,12.5h0c0,6.9,5.6,12.5,12.5,12.5h0c20.71,0,37.5-16.79,37.5-37.5h0c0-20.71-16.79-37.5-37.5-37.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9,5.6-12.5,12.5-12.5h25.01c6.9,0,12.5-5.6,12.5-12.5h0c0-6.91-5.6-12.5-12.5-12.5h-25.01c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.91,5.6-12.5,12.5-12.5h25.01c6.9,0,12.5-5.6,12.5-12.5h0c0-6.91-5.6-12.5-12.5-12.5h-25.01c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9-5.59-12.49-12.49-12.5h0c-6.9,0-12.5,5.59-12.5,12.5Z"/>
              <path d="M75,62.5V12.5c0-6.9-5.6-12.5-12.5-12.5h0c-6.9,0-12.5,5.6-12.5,12.5h0c0,6.9-5.6,12.5-12.5,12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0C25,5.6,19.41,0,12.5,0h0C5.6,0,0,5.6,0,12.5V62.5c0,20.71,16.79,37.5,37.5,37.5h0c20.71,0,37.5-16.79,37.5-37.5Zm-37.5-12.5h0c6.9,0,12.5,5.6,12.5,12.5h0c0,6.91-5.6,12.5-12.5,12.5h0c-6.9,0-12.5-5.6-12.5-12.5h0c0-6.9,5.6-12.5,12.5-12.5Z"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  `;

  const mount = document.getElementById('site-footer');
  if (mount) {
    mount.replaceWith(footer);
  } else {
    document.body.appendChild(footer);
  }
})();
