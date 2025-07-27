/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Używa klasy "dark" na <html> do przełączania motywu
  theme: {
    extend: {
      // textColor:{
      //   close: 'var(--close)',
      // }
    },
  },
  plugins: [],
};