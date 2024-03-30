/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      lineHeight: {
        tight: 'calc(var(--line-height) - 0.5)',
        snug: 'calc(var(--line-height) - 0.3)',
        normal: 'var(--line-height)',
        relaxed: 'calc(var(--line-height) + 0.3)',
        loose: 'calc(var(--line-height) + 0.5)',
      },
      spacing: {
        custom: 'var(--spacing)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
