/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    // Page gutters / container: see .container-site in src/input.css
    extend: {
      colors: {
        // Midnight Studio — locked base palette (static brand colours: swatches, marks, decoration)
        ink: "#17263D",        // Ink Navy
        steel: "#416A8A",      // Steel Blue
        ice: "#D9E6F0",        // Ice Blue
        cool: "#F5F7FA",       // Cool White
        copper: "#B77C5B",     // Muted Copper (decorative / large text only on light)
        "copper-deep": "#8F5A3C", // copper text on light (>= 5:1 on Cool White)

        // Semantic, theme-aware tokens. Values live in src/input.css (:root and [data-theme="dark"]).
        page: "rgb(var(--page) / <alpha-value>)",              // page background
        alt: "rgb(var(--alt) / <alpha-value>)",                // alternate section / subtle surface
        strong: "rgb(var(--strong) / <alpha-value>)",          // deep surface (ink sections, footer)
        fg: "rgb(var(--fg) / <alpha-value>)",                  // headings / primary text
        "fg-soft": "rgb(var(--fg-soft) / <alpha-value>)",      // body / secondary text
        link: "rgb(var(--link) / <alpha-value>)",              // links, eyebrows
        "copper-text": "rgb(var(--copper-text) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",              // borders (use with /opacity)
        "on-strong": "rgb(var(--on-strong) / <alpha-value>)",  // text on strong surfaces
        "on-strong-soft": "rgb(var(--on-strong-soft) / <alpha-value>)",
        "on-strong-mute": "rgb(var(--on-strong-mute) / <alpha-value>)",
        btn: "rgb(var(--btn) / <alpha-value>)",
        "btn-fg": "rgb(var(--btn-fg) / <alpha-value>)",
        "btn-hover": "rgb(var(--btn-hover) / <alpha-value>)",
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['"Public Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      // Fluid type scale (min @ 360px -> max @ 1280px)
      fontSize: {
        'step--1': ['clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)', { lineHeight: '1.5' }],
        'step-0': ['clamp(1rem, 0.96rem + 0.15vw, 1.0625rem)', { lineHeight: '1.65' }],
        'step-1': ['clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)', { lineHeight: '1.55' }],
        'step-2': ['clamp(1.3125rem, 1.15rem + 0.6vw, 1.625rem)', { lineHeight: '1.3' }],
        'step-3': ['clamp(1.625rem, 1.3rem + 1.2vw, 2.25rem)', { lineHeight: '1.2' }],
        'step-4': ['clamp(2rem, 1.5rem + 2vw, 3.25rem)', { lineHeight: '1.1' }],
        'step-5': ['clamp(2.375rem, 1.6rem + 3.2vw, 4.25rem)', { lineHeight: '1.05' }],
      },
      // Spacing scale for sections and gutters (fluid)
      spacing: {
        gutter: 'clamp(1rem, 0.5rem + 2.2vw, 2.5rem)',
        'section-sm': 'clamp(2.5rem, 2rem + 2.5vw, 4rem)',
        section: 'clamp(3.5rem, 2.5rem + 4.5vw, 7rem)',
        'section-lg': 'clamp(4.5rem, 3rem + 6vw, 9rem)',
        header: '4.25rem',
      },
      maxWidth: {
        site: '80rem',     // 1280 – wide editorial canvas
        content: '68rem',  // 1088 – standard content
        narrow: '46rem',   // 736  – reading column
        prose: '65ch',
      },
      letterSpacing: { eyebrow: '0.14em' },
      transitionTimingFunction: { studio: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
    },
  },
  plugins: [],
};
