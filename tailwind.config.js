/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#FBBF24',
        background: '#F3F4F6',
        text: '#1F2937',
        dark: {
          background: '#1F2937',
          text: '#F3F4F6',
          primary: '#1D4ED8',
          secondary: '#FBBF24',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
