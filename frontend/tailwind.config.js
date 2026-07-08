/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html, ts}'],
  theme: {
    extend: {
      colors: {
        m3: {
          primary:
            'color-mix(in srgb, var(--mat-sys-primary) calc(<alpha-value> * 100%), transparent)',
          'primary-container':
            'color-mix(in srgb, var(--mat-sys-primary-container) calc(<alpha-value> * 100%), transparent)',
          'primary-fixed':
            'color-mix(in srgb, var(--mat-sys-primary-fixed) calc(<alpha-value> * 100%), transparent)',
          'primary-fixed-dim':
            'color-mix(in srgb, var(--mat-sys-primary-fixed-dim) calc(<alpha-value> * 100%), transparent)',
          'on-primary':
            'color-mix(in srgb, var(--mat-sys-on-primary) calc(<alpha-value> * 100%), transparent)',
          'on-primary-container':
            'color-mix(in srgb, var(--mat-sys-on-primary-container) calc(<alpha-value> * 100%), transparent)',
          'on-primary-fixed':
            'color-mix(in srgb, var(--mat-sys-on-primary-fixed) calc(<alpha-value> * 100%), transparent)',
          'on-primary-fixed-variant':
            'color-mix(in srgb, var(--mat-sys-on-primary-fixed-variant) calc(<alpha-value> * 100%), transparent)',
          'inverse-primary':
            'color-mix(in srgb, var(--mat-sys-inverse-primary) calc(<alpha-value> * 100%), transparent)',

          secondary:
            'color-mix(in srgb, var(--mat-sys-secondary) calc(<alpha-value> * 100%), transparent)',
          'secondary-container':
            'color-mix(in srgb, var(--mat-sys-secondary-container) calc(<alpha-value> * 100%), transparent)',
          'secondary-fixed':
            'color-mix(in srgb, var(--mat-sys-secondary-fixed) calc(<alpha-value> * 100%), transparent)',
          'secondary-fixed-dim':
            'color-mix(in srgb, var(--mat-sys-secondary-fixed-dim) calc(<alpha-value> * 100%), transparent)',
          'on-secondary':
            'color-mix(in srgb, var(--mat-sys-on-secondary) calc(<alpha-value> * 100%), transparent)',
          'on-secondary-container':
            'color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(<alpha-value> * 100%), transparent)',
          'on-secondary-fixed':
            'color-mix(in srgb, var(--mat-sys-on-secondary-fixed) calc(<alpha-value> * 100%), transparent)',
          'on-secondary-fixed-variant':
            'color-mix(in srgb, var(--mat-sys-on-secondary-fixed-variant) calc(<alpha-value> * 100%), transparent)',

          tertiary:
            'color-mix(in srgb, var(--mat-sys-tertiary) calc(<alpha-value> * 100%), transparent)',
          'tertiary-container':
            'color-mix(in srgb, var(--mat-sys-tertiary-container) calc(<alpha-value> * 100%), transparent)',
          'tertiary-fixed':
            'color-mix(in srgb, var(--mat-sys-tertiary-fixed) calc(<alpha-value> * 100%), transparent)',
          'tertiary-fixed-dim':
            'color-mix(in srgb, var(--mat-sys-tertiary-fixed-dim) calc(<alpha-value> * 100%), transparent)',
          'on-tertiary':
            'color-mix(in srgb, var(--mat-sys-on-tertiary) calc(<alpha-value> * 100%), transparent)',
          'on-tertiary-container':
            'color-mix(in srgb, var(--mat-sys-on-tertiary-container) calc(<alpha-value> * 100%), transparent)',
          'on-tertiary-fixed':
            'color-mix(in srgb, var(--mat-sys-on-tertiary-fixed) calc(<alpha-value> * 100%), transparent)',
          'on-tertiary-fixed-variant':
            'color-mix(in srgb, var(--mat-sys-on-tertiary-fixed-variant) calc(<alpha-value> * 100%), transparent)',

          surface:
            'color-mix(in srgb, var(--mat-sys-surface) calc(<alpha-value> * 100%), transparent)',
          'surface-bright':
            'color-mix(in srgb, var(--mat-sys-surface-bright) calc(<alpha-value> * 100%), transparent)',
          'surface-dim':
            'color-mix(in srgb, var(--mat-sys-surface-dim) calc(<alpha-value> * 100%), transparent)',
          'surface-tint':
            'color-mix(in srgb, var(--mat-sys-surface-tint) calc(<alpha-value> * 100%), transparent)',
          'surface-variant':
            'color-mix(in srgb, var(--mat-sys-surface-variant) calc(<alpha-value> * 100%), transparent)',
          'surface-container':
            'color-mix(in srgb, var(--mat-sys-surface-container) calc(<alpha-value> * 100%), transparent)',
          'surface-container-high':
            'color-mix(in srgb, var(--mat-sys-surface-container-high) calc(<alpha-value> * 100%), transparent)',
          'surface-container-highest':
            'color-mix(in srgb, var(--mat-sys-surface-container-highest) calc(<alpha-value> * 100%), transparent)',
          'surface-container-low':
            'color-mix(in srgb, var(--mat-sys-surface-container-low) calc(<alpha-value> * 100%), transparent)',
          'surface-container-lowest':
            'color-mix(in srgb, var(--mat-sys-surface-container-lowest) calc(<alpha-value> * 100%), transparent)',
          'on-surface':
            'color-mix(in srgb, var(--mat-sys-on-surface) calc(<alpha-value> * 100%), transparent)',
          'on-surface-variant':
            'color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(<alpha-value> * 100%), transparent)',
          'inverse-surface':
            'color-mix(in srgb, var(--mat-sys-inverse-surface) calc(<alpha-value> * 100%), transparent)',
          'inverse-on-surface':
            'color-mix(in srgb, var(--mat-sys-inverse-on-surface) calc(<alpha-value> * 100%), transparent)',

          error: 'color-mix(in srgb, var(--mat-sys-error) calc(<alpha-value> * 100%), transparent)',
          'error-container':
            'color-mix(in srgb, var(--mat-sys-error-container) calc(<alpha-value> * 100%), transparent)',
          'on-error':
            'color-mix(in srgb, var(--mat-sys-on-error) calc(<alpha-value> * 100%), transparent)',
          'on-error-container':
            'color-mix(in srgb, var(--mat-sys-on-error-container) calc(<alpha-value> * 100%), transparent)',

          background:
            'color-mix(in srgb, var(--mat-sys-background) calc(<alpha-value> * 100%), transparent)',
          'on-background':
            'color-mix(in srgb, var(--mat-sys-on-background) calc(<alpha-value> * 100%), transparent)',

          outline:
            'color-mix(in srgb, var(--mat-sys-outline) calc(<alpha-value> * 100%), transparent)',
          'outline-variant':
            'color-mix(in srgb, var(--mat-sys-outline-variant) calc(<alpha-value> * 100%), transparent)',
        },
      },
    },
  },
  plugins: [],
};
