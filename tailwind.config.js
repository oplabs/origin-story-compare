/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        origin: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "primary": "#0074F0",
        },
      }
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")]
}
