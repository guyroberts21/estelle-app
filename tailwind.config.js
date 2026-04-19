/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4169e1',
          600: '#2651c7',
          700: '#1a3a8f',
          800: '#162d72',
          900: '#0f1f4d',
          950: '#080e24',
        },
      },
    },
  },
  plugins: [],
}
