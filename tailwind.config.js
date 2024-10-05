/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      }
    },
  },
  plugins: [],
}