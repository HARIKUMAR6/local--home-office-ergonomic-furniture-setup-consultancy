/* Theme + direction preferences.
   Loaded synchronously in <head> (before the stylesheet paints) so the saved
   theme/direction are applied to <html> before first render: no flash.
   Storage keys: site-theme = light | dark, site-dir = ltr | rtl. */
(() => {
  'use strict';
  const root = document.documentElement;
  const KEYS = { theme: 'site-theme', dir: 'site-dir' };
  const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable: preference lasts for this page only */ } };

  const apply = (theme, dir) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.setAttribute('dir', dir);
  };

  let theme = read(KEYS.theme);
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  let dir = read(KEYS.dir);
  if (dir !== 'ltr' && dir !== 'rtl') dir = 'ltr';
  apply(theme, dir);

  const notify = () => document.dispatchEvent(new CustomEvent('sitepreferences', { detail: { theme, dir } }));

  window.sitePrefs = {
    get theme() { return theme; },
    get dir() { return dir; },
    toggleTheme() {
      theme = theme === 'dark' ? 'light' : 'dark';
      write(KEYS.theme, theme); apply(theme, dir); notify();
    },
    toggleDir() {
      dir = dir === 'rtl' ? 'ltr' : 'rtl';
      write(KEYS.dir, dir); apply(theme, dir); notify();
    },
  };

  // Keep several open tabs in step
  window.addEventListener('storage', (e) => {
    if (e.key !== KEYS.theme && e.key !== KEYS.dir) return;
    const t = read(KEYS.theme); const d = read(KEYS.dir);
    if (t === 'light' || t === 'dark') theme = t;
    if (d === 'ltr' || d === 'rtl') dir = d;
    apply(theme, dir); notify();
  });
})();
