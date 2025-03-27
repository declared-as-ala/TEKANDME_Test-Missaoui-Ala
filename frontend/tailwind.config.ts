/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redAccent: "#ef4444",
        yellowAccent: "#fbbf24",
        pinkAccent: "#f472b6",
        beige: "#f1d7a2",
        brown: "#b18b8b",
        greenAccent: "#15803d",
        darkGrey: "#525252",
      },
      fontFamily: {
        fancy: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
