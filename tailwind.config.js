/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Add any custom colors here
      },
      spacing: {
        '70': '17.5rem', // For sidebar width
      },
    },
  },
  plugins: [],
} 