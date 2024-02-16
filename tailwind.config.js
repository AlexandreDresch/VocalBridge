/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Fira Code'", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#303951",
        },
        secondary: {
          DEFAULT: "#E25319",
        },
        tertiary: {
          DEFAULT: "#596175",
        },
      },
    },
  },
  plugins: [],
}