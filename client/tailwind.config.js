/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0099CC', // Uzbekistan flag blue-ish
        secondary: '#33CC33', // Uzbekistan flag green-ish
        accent: '#FFCC00', // Uzbekistan flag yellow-ish
      }
    },
  },
  plugins: [],
}
