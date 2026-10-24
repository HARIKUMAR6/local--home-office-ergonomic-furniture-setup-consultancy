/* Home 2 behaviour: the space finder tabs and the furniture catalogue image swap. */
(() => {
  'use strict';

  /* ---------- Space finder (ARIA tabs, vertical) ---------- */
  const finder = document.querySelector('[data-finder]');
  if (finder) {
    const tabs = [...finder.querySelectorAll('[role="tab"]')];
    const panels = [...finder.querySelectorAll('[data-finder-panel]')];
    const select = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        const last = tabs.length - 1;
        const next = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select(next, true);
      });
    });
    select(0);
  }

  /* ---------- Furniture catalogue: list item hover/focus swaps the sticky image ---------- */
  const catalogue = document.querySelector('[data-catalogue]');
  const stage = document.querySelector('[data-catalogue-stage]');
  if (catalogue && stage) {
    const items = [...catalogue.querySelectorAll('li')];
    const images = [...stage.querySelectorAll('img')];
    const label = stage.querySelector('[data-catalogue-label]');
    const activate = (index) => {
      items.forEach((li, i) => li.classList.toggle('is-active', i === index));
      images.forEach((img, i) => img.classList.toggle('is-active', i === index));
      if (label) label.textContent = items[index].querySelector('h3').textContent;
    };
    items.forEach((li, i) => {
      li.addEventListener('mouseenter', () => activate(i));
      li.addEventListener('focusin', () => activate(i));
    });
  }
})();
