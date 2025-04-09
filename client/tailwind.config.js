/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Używa klasy "dark" na <html> do przełączania motywu
  theme: {
    extend: {
      boxShadow: {
      "custom-dark": "10 4px 6px 10px rgba(40, 126, 224, 0.5), 0 2px 4px -2px rgba(31, 133, 235, 0.3)",
    }},
  },
  plugins: [],
};