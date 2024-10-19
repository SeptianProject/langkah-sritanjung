/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        kufam: ['Kufam', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#EA8104',
        secondary: '#233028',
        tertiary: '#1E1E1E',
        blueCard: '#64CCC5'
      },
      boxShadow: {
        solidFlat: '5px 5px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}