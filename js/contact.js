/* Contact page: verified details, enquiry form validation, and the map.
   Nothing here is sent anywhere: the site has no messaging backend yet, and the UI says so. */
(() => {
  'use strict';

  const SITE = window.SITE || {};
  const contact = SITE.contact || {};
  const extra = SITE.contactExtra || {};
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Verified contact details (rendered only when provided in site-config.js) ---------- */
  const list = document.querySelector('[data-contact-details]');
  const fallback = document.querySelector('[data-contact-fallback]');
  if (list) {
    const icon = (d) => `<svg class="h-6 w-6 text-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" aria-hidden="true">${d}</svg>`;
    const rows = [
      contact.email && ['Email', icon('<path d="M3 6h18v12H3zM3 7l9 7 9-7"/>'), `<a class="link-text" href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>`],
      contact.phone && ['Phone', icon('<path d="M6 3h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z"/>'), `<a class="link-text" href="tel:${esc(contact.phone.replace(/\s+/g, ''))}">${esc(contact.phone)}</a>`],
      contact.address && ['Address', icon('<path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'), `<address class="not-italic text-fg">${esc(contact.address)}</address>`],
      extra.hours && ['Hours', icon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'), `<span class="text-fg">${esc(extra.hours)}</span>`],
    ].filter(Boolean);
    if (rows.length) {
      list.innerHTML = rows.map(([label, ic, body]) => `<li class="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-line/25 py-4">${ic}<div><span class="block text-step--1 font-semibold uppercase tracking-eyebrow text-fg-soft">${label}</span>${body}</div></li>`).join('');
      list.hidden = false;
      if (fallback) fallback.hidden = true;
    }
  }

  /* ---------- Map: the page ships a general-area OpenStreetMap embed (visual context only).
     If a verified OpenStreetMap embed URL is added to SITE.contactExtra.mapEmbedUrl, it replaces the general map. ---------- */
  const mapFrame = document.querySelector('[data-map] iframe');
  const mapText = document.querySelector('[data-map-text]');
  const url = extra.mapEmbedUrl;
  if (mapFrame && url && /^https:\/\/www\.openstreetmap\.org\/export\/embed\.html\?/.test(url)) {
    mapFrame.src = url;
    mapFrame.title = "Interactive map showing the business location";
    if (mapText) mapText.textContent = "Use the map to zoom and move around the area.";
  }

  /* ---------- Enquiry form ---------- */
  const form = document.querySelector('[data-enquiry-form]');
  if (!form) return;
  const status = document.querySelector('[data-form-status]');
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    type: form.elements.type,
    message: form.elements.message,
  };
  const errors = {
    name: (v) => (v.trim().length < 2 ? 'Enter your full name.' : ''),
    email: (v) => (!v.trim() ? 'Enter your email address.' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Enter a valid email address, for example name@example.com.' : ''),
    type: (v) => (!v ? 'Choose an enquiry type.' : ''),
    message: (v) => (v.trim().length < 10 ? 'Write a short message of at least 10 characters.' : ''),
  };

  const show = (key, msg) => {
    const el = fields[key];
    const out = document.getElementById(`${el.id}-err`);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (!msg) el.removeAttribute('aria-invalid');
    out.hidden = !msg;
    out.textContent = msg ? `Error: ${msg}` : '';
    return !msg;
  };
  const check = (key) => show(key, errors[key](fields[key].value));

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener('blur', () => { if (fields[key].value || fields[key].hasAttribute('aria-invalid')) check(key); });
    fields[key].addEventListener('input', () => { if (fields[key].hasAttribute('aria-invalid')) check(key); });
    fields[key].addEventListener('change', () => { if (fields[key].hasAttribute('aria-invalid')) check(key); });
  });

  const say = (html) => { status.innerHTML = html; status.hidden = false; };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = Object.keys(fields).filter((k) => !check(k));
    if (bad.length) {
      say('<p><strong>Please fix the highlighted fields.</strong> ' + bad.length + (bad.length === 1 ? ' field needs' : ' fields need') + ' attention.</p>');
      fields[bad[0]].focus();
      return;
    }
    // No backend is connected yet: be explicit that nothing has been sent or saved.
    say('<p><strong>Your enquiry is complete, but it has not been sent.</strong> This website is not yet connected to an email or form service, so nothing has been delivered or saved. Please check back for confirmed contact details.</p>');
    status.focus();
  });

  /* Preselect the enquiry type from ?enquiry=product|consultation|general (used by footer and page links) */
  const wanted = new URLSearchParams(location.search).get('enquiry');
  if (wanted && [...fields.type.options].some((o) => o.value === wanted)) fields.type.value = wanted;
})();
