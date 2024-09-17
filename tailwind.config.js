/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#0087EA",
        accent: "#0087EA",
        complementary: "#0144E6",
      },
    },
    aspectRatio: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
