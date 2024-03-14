/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        custom: 'var(--margin)',
      },
    },
  },
  plugins: [],
};
