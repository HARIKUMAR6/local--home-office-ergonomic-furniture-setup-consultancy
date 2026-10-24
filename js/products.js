/* Products page: category filter + pagination for the catalogue.
   Filters are real buttons (aria-pressed). "All Products" is the reset.
   Page size: 6 for "All Products", 4 for any single category. Pagination controls appear only when a
   view has more entries than one page holds. Entries come from the markup; nothing is generated here.
   A deep link to an entry (e.g. products.html#chairs) switches to the page that contains it. */
(() => {
  'use strict';
  const bar = document.querySelector('[data-filters]');
  const catalog = document.querySelector('[data-catalog]');
  if (!bar || !catalog) return;

  const PAGE_SIZE = { all: 6, category: 4 };
  const chips = [...bar.querySelectorAll('[data-filter]')];
  const items = [...catalog.querySelectorAll('.catalog-item')];
  const status = document.querySelector('[data-status]');
  const pager = document.querySelector('[data-pager]');
  const labels = { all: 'all', seating: 'Seating', desks: 'Desks', screens: 'Screen Setup', accessories: 'Accessories' };

  let filter = 'all';
  let page = 1;

  // Keep the counts in the chips honest if entries are edited later
  chips.forEach((chip) => {
    const key = chip.dataset.filter;
    const n = key === 'all' ? items.length : items.filter((li) => li.dataset.group === key).length;
    const badge = chip.querySelector('small');
    if (badge) badge.textContent = String(n);
  });

  const inView = () => items.filter((li) => filter === 'all' || li.dataset.group === filter);
  const sizeFor = () => (filter === 'all' ? PAGE_SIZE.all : PAGE_SIZE.category);

  const renderPager = (pages) => {
    if (!pager) return;
    pager.hidden = pages <= 1;
    if (pages <= 1) { pager.innerHTML = ''; return; }
    const num = (n) => `<li><button type="button" class="page-btn" data-page="${n}" aria-label="Page ${n}"${n === page ? ' aria-current="page"' : ''}>${n}</button></li>`;
    pager.innerHTML = `<ul class="pager__list">
      <li><button type="button" class="page-btn page-btn--step" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}>Previous</button></li>
      ${Array.from({ length: pages }, (_, i) => num(i + 1)).join('')}
      <li><button type="button" class="page-btn page-btn--step" data-page="${page + 1}" ${page === pages ? 'disabled' : ''}>Next</button></li>
    </ul>`;
  };

  const render = () => {
    const list = inView();
    const size = sizeFor();
    const pages = Math.max(1, Math.ceil(list.length / size));
    page = Math.min(Math.max(1, page), pages);
    const start = (page - 1) * size;
    const visible = new Set(list.slice(start, start + size));
    items.forEach((li) => { li.hidden = !visible.has(li); });
    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === filter)));
    renderPager(pages);
    if (status) {
      const what = filter === 'all' ? 'all products' : labels[filter];
      status.textContent = pages > 1
        ? `Showing ${visible.size} of ${list.length} (${what}), page ${page} of ${pages}`
        : `Showing ${visible.size} ${visible.size === 1 ? 'entry' : 'entries'}: ${what}`;
    }
  };

  // When the list gets shorter the browser may leave the controls under the sticky header; bring them back.
  const keepControlsVisible = () => {
    if (bar.getBoundingClientRect().top < 96) bar.scrollIntoView({ block: 'start' });
  };

  const setFilter = (key) => { filter = key; page = 1; render(); keepControlsVisible(); };

  bar.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter]');
    if (chip) setFilter(chip.dataset.filter);
  });

  if (pager) {
    pager.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-page]');
      if (!btn || btn.disabled) return;
      page = Number(btn.dataset.page);
      render();
      // Keep keyboard focus on the equivalent control after the pager re-renders
      const same = pager.querySelector(`[data-page="${page}"]:not([disabled])`) || pager.querySelector('.page-btn:not([disabled])');
      if (same) same.focus();
      keepControlsVisible();
    });
  }

  // Deep links such as #chairs, #desks, #monitor-arms, #accessories
  const revealHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && items.find((li) => li.id === id);
    if (!target) return;
    if (target.hidden) {
      filter = 'all';
      page = Math.floor(items.indexOf(target) / PAGE_SIZE.all) + 1;
      render();
    }
    target.scrollIntoView({ block: 'start' });
  };
  window.addEventListener('hashchange', revealHash);
  render();
  revealHash();
})();
