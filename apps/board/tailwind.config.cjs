/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      spacing: {
        custom: 'var(--spacing)',
      },
    },
  },
  plugins: [],
};
