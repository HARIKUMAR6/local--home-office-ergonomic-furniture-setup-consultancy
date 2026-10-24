/* Shared header + footer, rendered from window.SITE into
   <div data-site-header></div> and <div data-site-footer></div>.
   The active page is read from <body data-page="…">. */
(() => {
  'use strict';

  const SITE = window.SITE;
  if (!SITE) return;

  const page = document.body.dataset.page || '';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isActive = (item) => item.id === page || (item.children || []).some((c) => c.id === page);
  const cur = (item) => (item.id === page ? ' aria-current="page"' : '');

  const chevron = '<svg class="nav-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 7.5 5 5 5-5"/></svg>';

  // Temporary mark: a stylised desk-and-chair line drawing. Swap for the final logo.
  const mark = '<svg class="brand__mark" viewBox="0 0 36 36" fill="none" aria-hidden="true"><rect class="mark-bg" x="1" y="1" width="34" height="34"/><path class="mark-fg" d="M8 14h20M11 14v12M25 14v12" stroke-width="1.8" stroke-linecap="square"/><path d="M14 10.5h8" stroke="#B77C5B" stroke-width="2.2" stroke-linecap="square"/></svg>';

  const brand = (cls = '') => `
    <a class="brand ${cls}" href="${esc(SITE.brand.href)}">
      ${mark}
      <span class="brand__text">
        <span class="brand__name">${esc(SITE.brand.name)}</span>
        <span class="brand__tag">${esc(SITE.brand.tagline)}</span>
      </span>
    </a>`;

  /* ---------- Header ---------- */
  const desktopItem = (item) => {
    if (!item.children) {
      return `<li><a class="nav-link" href="${item.href}"${cur(item)}>${esc(item.label)}</a></li>`;
    }
    const active = isActive(item) ? ' aria-current="true"' : '';
    return `
      <li class="relative" data-dropdown>
        <button type="button" class="nav-link" aria-expanded="false" aria-controls="dd-${item.id}" aria-haspopup="true"${active} data-dropdown-trigger>
          ${esc(item.label)}${chevron}
        </button>
        <ul class="dropdown" id="dd-${item.id}" hidden>
          ${item.children.map((c) => `<li><a href="${c.href}"${cur(c)}>${esc(c.label)}</a></li>`).join('')}
        </ul>
      </li>`;
  };

  const mobileItem = (item) => {
    if (!item.children) {
      return `<a class="mobile-link" href="${item.href}"${cur(item)}><span>${esc(item.label)}</span></a>`;
    }
    return `
      <div>
        <button type="button" class="mobile-link" aria-expanded="false" aria-controls="m-${item.id}" data-mobile-sub-trigger>
          <span>${esc(item.label)}</span>${chevron}
        </button>
        <div class="mobile-sub" id="m-${item.id}" hidden>
          ${item.children.map((c) => `<a href="${c.href}"${cur(c)}>${esc(c.label)}</a>`).join('')}
        </div>
      </div>`;
  };

  const sun = '<svg class="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/></svg>';
  const moon = '<svg class="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';

  // variant 'icon' = compact header button; 'full' = labelled button inside the mobile menu
  const prefButtons = (variant) => {
    const full = variant === 'full';
    return `
      <button type="button" class="pref-btn" data-pref="theme" aria-label="Switch to dark theme">
        ${sun}${moon}${full ? '<span class="lbl-light">Light theme</span><span class="lbl-dark">Dark theme</span>' : ''}
      </button>
      <button type="button" class="pref-btn" data-pref="dir" aria-label="Switch to right-to-left layout">
        <span class="lbl-ltr">LTR</span><span class="lbl-rtl">RTL</span>
      </button>`;
  };

  const cta = SITE.cta;
  const headerHTML = `
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <div class="container-site site-header__bar">
        ${brand()}
        <nav aria-label="Primary" class="site-header__nav hidden xl:block">
          <ul class="flex items-center justify-center gap-1">${SITE.nav.map(desktopItem).join('')}</ul>
        </nav>
        <div class="header-actions">
          <div class="header-prefs" role="group" aria-label="Display preferences">${prefButtons('icon')}</div>
          <a class="btn btn-primary header-cta" href="${esc(cta.href)}">${esc(cta.label)}</a>
          <button type="button" class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-open>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16"/></svg>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" hidden>
      <div class="mobile-menu__bar">
        ${brand()}
        <button type="button" class="menu-toggle" aria-label="Close menu" data-menu-close style="display:inline-flex">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l12 12M17 5 5 17"/></svg>
        </button>
      </div>
      <nav aria-label="Mobile" class="mobile-menu__nav">${SITE.nav.map(mobileItem).join('')}</nav>
      <div class="mobile-menu__foot">
        <a class="btn btn-primary" href="${esc(cta.href)}">${esc(cta.label)}</a>
        <div class="menu-prefs" role="group" aria-label="Display preferences">${prefButtons('full')}</div>
      </div>
    </div>`;

  /* ---------- Footer ---------- */
  const flat = SITE.nav.flatMap((i) => (i.children ? i.children : [i]));
  /* Contact: verified details win; otherwise clearly-labelled sample details from SITE.footerPlaceholder */
  const verified = SITE.contact || {};
  const hasVerified = !!(verified.email || verified.phone || verified.address);
  const fc = hasVerified ? verified : (SITE.footerPlaceholder || {});
  const ic = (d) => `<svg class="footer-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const row = (icon, body) => `<li class="footer-contact__row">${icon}<span>${body}</span></li>`;
  const contactLines = [
    fc.phone && row(ic('<path d="M6 3h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z"/>'), hasVerified ? `<a href="tel:${esc(fc.phone.replace(/\s+/g, ''))}"><bdi dir="ltr">${esc(fc.phone)}</bdi></a>` : `<bdi dir="ltr">${esc(fc.phone)}</bdi>`),
    fc.email && row(ic('<path d="M3 6h18v12H3zM3 7l9 7 9-7"/>'), hasVerified ? `<a href="mailto:${esc(fc.email)}"><bdi dir="ltr">${esc(fc.email)}</bdi></a>` : `<bdi dir="ltr">${esc(fc.email)}</bdi>`),
    fc.address && row(ic('<path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'), `<address class="not-italic">${esc(fc.address)}</address>`),
  ].filter(Boolean);

  const socialIcons = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
    facebook: '<path d="M15 3h-2.5A4.5 4.5 0 008 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5c0-.3.2-.5.5-.5H15z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-7M12 13c0-2 1.5-3 3-3s3 1 3 3v4"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>',
  };
  // Entries without a real href render as inert buttons so they never navigate anywhere.
  const social = (SITE.social || []).slice(0, 4).map((s) => {
    const icon = ic(socialIcons[s.id] || '');
    return s.href
      ? `<li><a class="social-btn" href="${esc(s.href)}" rel="noopener" target="_blank" aria-label="${esc(s.label)}">${icon}</a></li>`
      : `<li><button type="button" class="social-btn" aria-disabled="true" aria-label="${esc(s.label)} (link coming soon)" title="${esc(s.label)} (link coming soon)">${icon}</button></li>`;
  });

  const footerHTML = `
    <div class="footer-divider" aria-hidden="true"><div class="container-site"><hr></div></div>
    <footer class="site-footer">
      <div class="container-site grid gap-10 py-section-sm md:grid-cols-3 xl:grid-cols-12">
        <div class="footer-brand md:col-span-3 xl:col-span-4">
          ${brand()}
          <p class="mt-4 max-w-sm text-[0.9375rem]">${esc(SITE.description)}</p>
        </div>
        <nav aria-label="Footer" class="xl:col-span-2">
          <h2 class="footer-heading !font-sans !text-step--1">Explore</h2>
          <ul class="footer-list">${flat.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
        </nav>
        <div class="xl:col-span-3">
          <h2 class="footer-heading !font-sans !text-step--1">Enquire</h2>
          <ul class="footer-list">
            ${SITE.enquiries.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}
          </ul>
        </div>
        <div class="xl:col-span-3" data-footer-contact>
          <h2 class="footer-heading !font-sans !text-step--1">Contact</h2>
          <ul class="footer-list footer-contact">${contactLines.join('')}</ul>
          ${hasVerified ? '' : '<p class="mt-2 text-[0.75rem]">Sample details, to be replaced.</p>'}
          <h2 class="footer-heading !font-sans !text-step--1 mt-6">Follow</h2>
          <ul class="flex flex-wrap gap-2" aria-label="Social media">${social.join('')}</ul>
        </div>
      </div>
      <div class="container-site footer-legal">
        <p style="color:inherit">&copy; <span data-year></span> ${esc(SITE.brand.name)}</p>
      </div>
    </footer>`;

  const headerHost = document.querySelector('[data-site-header]');
  const footerHost = document.querySelector('[data-site-footer]');
  if (headerHost) headerHost.innerHTML = headerHTML;
  if (footerHost) {
    footerHost.innerHTML = footerHTML;
    footerHost.querySelector('[data-year]').textContent = new Date().getFullYear();
  }
  if (!headerHost) return;

  /* ---------- Behaviour ---------- */
  const desktopMQ = window.matchMedia('(min-width: 80rem)');

  // Desktop dropdown(s)
  const dropdowns = [...headerHost.querySelectorAll('[data-dropdown]')];
  const setDropdown = (dd, open, focusTrigger = false) => {
    const trigger = dd.querySelector('[data-dropdown-trigger]');
    const menu = dd.querySelector('.dropdown');
    trigger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (!open && focusTrigger) trigger.focus();
  };
  const closeDropdowns = (focusTrigger = false) => dropdowns.forEach((dd) => setDropdown(dd, false, focusTrigger));

  dropdowns.forEach((dd) => {
    const trigger = dd.querySelector('[data-dropdown-trigger]');
    const items = () => [...dd.querySelectorAll('.dropdown a')];
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') !== 'true';
      closeDropdowns();
      setDropdown(dd, open);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setDropdown(dd, true);
        items()[0]?.focus();
      }
    });
    dd.querySelector('.dropdown').addEventListener('keydown', (e) => {
      const list = items();
      const i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
    });
    // Close when focus leaves the dropdown (Tab out)
    dd.addEventListener('focusout', (e) => {
      if (!dd.contains(e.relatedTarget)) setDropdown(dd, false);
    });
  });

  // Mobile menu
  const openBtn = headerHost.querySelector('[data-menu-open]');
  const closeBtn = headerHost.querySelector('[data-menu-close]');
  const panel = headerHost.querySelector('#mobile-menu');
  const focusables = () => [...panel.querySelectorAll('a[href], button:not([disabled])')].filter((el) => el.offsetParent !== null);

  const setMenu = (open, returnFocus = true) => {
    panel.hidden = !open;
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) closeBtn.focus();
    else if (returnFocus) openBtn.focus();
  };
  openBtn.addEventListener('click', () => setMenu(true));
  closeBtn.addEventListener('click', () => setMenu(false));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false, false)));
  // The panel is full-screen, so "outside" is any empty area that is not a link or button
  panel.addEventListener('click', (e) => { if (!e.target.closest('a, button')) setMenu(false); });

  panel.querySelectorAll('[data-mobile-sub-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
    });
  });

  // Focus trap inside the open mobile menu
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = focusables();
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Theme + direction toggles (header and mobile menu share the same handlers)
  const syncPrefs = () => {
    const { theme, dir } = window.sitePrefs;
    headerHost.querySelectorAll('[data-pref="theme"]').forEach((b) => b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'));
    headerHost.querySelectorAll('[data-pref="dir"]').forEach((b) => b.setAttribute('aria-label', dir === 'rtl' ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout'));
  };
  headerHost.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pref]');
    if (!btn || !window.sitePrefs) return;
    if (btn.dataset.pref === 'theme') window.sitePrefs.toggleTheme();
    else window.sitePrefs.toggleDir();
    syncPrefs();
  });
  document.addEventListener('sitepreferences', syncPrefs);
  if (window.sitePrefs) syncPrefs();

  // Escape, outside click, resize
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!panel.hidden) setMenu(false);
    closeDropdowns(true);
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) closeDropdowns();
  });
  desktopMQ.addEventListener('change', (e) => {
    if (e.matches && !panel.hidden) setMenu(false, false);
    closeDropdowns();
  });
})();
