/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#ffffff",  // Przykładowy kolor tła
          foreground: "#333333",  // Przykładowy kolor tekstu
          border: "#e5e7eb",      // Przykładowy kolor ramki
          ring: "#3b82f6",        // Przykładowy kolor obramowania
        },
      },
    },
    plugins: [],
  };
  