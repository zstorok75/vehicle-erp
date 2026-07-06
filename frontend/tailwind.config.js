/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html, ts}'],
  theme: {
    extend: {
      colors: {
        m3: {
          primary: 'var(--mat-sys-primary)',
          'primary-container': 'var(--mat-sys-primary-container)',
          'primary-fixed': 'var(--mat-sys-primary-fixed)',
          'primary-fixed-dim': 'var(--mat-sys-primary-fixed-dim)',
          'on-primary': 'var(--mat-sys-on-primary)',
          'on-primary-container': 'var(--mat-sys-on-primary-container)',
          'on-primary-fixed': 'var(--mat-sys-on-primary-fixed)',
          'on-primary-fixed-variant': 'var(--mat-sys-on-primary-fixed-variant)',
          'inverse-primary': 'var(--mat-sys-inverse-primary)',

          secondary: 'var(--mat-sys-secondary)',
          'secondary-container': 'var(--mat-sys-secondary-container)',
          'secondary-fixed': 'var(--mat-sys-secondary-fixed)',
          'secondary-fixed-dim': 'var(--mat-sys-secondary-fixed-dim)',
          'on-secondary': 'var(--mat-sys-on-secondary)',
          'on-secondary-container': 'var(--mat-sys-on-secondary-container)',
          'on-secondary-fixed': 'var(--mat-sys-on-secondary-fixed)',
          'on-secondary-fixed-variant': 'var(--mat-sys-on-secondary-fixed-variant)',

          tertiary: 'var(--mat-sys-tertiary)',
          'tertiary-container': 'var(--mat-sys-tertiary-container)',
          'tertiary-fixed': 'var(--mat-sys-tertiary-fixed)',
          'tertiary-fixed-dim': 'var(--mat-sys-tertiary-fixed-dim)',
          'on-tertiary': 'var(--mat-sys-on-tertiary)',
          'on-tertiary-container': 'var(--mat-sys-on-tertiary-container)',
          'on-tertiary-fixed': 'var(--mat-sys-on-tertiary-fixed)',
          'on-tertiary-fixed-variant': 'var(--mat-sys-on-tertiary-fixed-variant)',

          surface: 'var(--mat-sys-surface)',
          'surface-bright': 'var(--mat-sys-surface-bright)',
          'surface-dim': 'var(--mat-sys-surface-dim)',
          'surface-tint': 'var(--mat-sys-surface-tint)',
          'surface-variant': 'var(--mat-sys-surface-variant)',
          'surface-container': 'var(--mat-sys-surface-container)',
          'surface-container-high': 'var(--mat-sys-surface-container-high)',
          'surface-container-highest': 'var(--mat-sys-surface-container-highest)',
          'surface-container-low': 'var(--mat-sys-surface-container-low)',
          'surface-container-lowest': 'var(--mat-sys-surface-container-lowest)',
          'on-surface': 'var(--mat-sys-on-surface)',
          'on-surface-variant': 'var(--mat-sys-on-surface-variant)',
          'inverse-surface': 'var(--mat-sys-inverse-surface)',
          'inverse-on-surface': 'var(--mat-sys-inverse-on-surface)',

          error: 'var(--mat-sys-error)',
          'error-container': 'var(--mat-sys-error-container)',
          'on-error': 'var(--mat-sys-on-error)',
          'on-error-container': 'var(--mat-sys-on-error-container)',

          background: 'var(--mat-sys-background)',
          'on-background': 'var(--mat-sys-on-background)',

          outline: 'var(--mat-sys-outline)',
          'outline-variant': 'var(--mat-sys-outline-variant)',
        },
      },
    },
  },
  plugins: [],
};
