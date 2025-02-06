/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "serif"],
      },
      screens: {
        // Custom height based breakpoints
        "h-sm": { raw: "(max-height: 640px)" },
        "h-md": { raw: "(max-height: 909px)" },
        "h-lg": { raw: "(min-height: 910px)" },
      },
      colors: {
        bg: {
          btn: "#2027C6",
          blue: "#3038E5",
          lightBtn: "#ffffff30",
        },
        text: {
          fadedBlue: "#9DA3F9",
          white: "#ffffff",
          inactive: "#648CFF",
          grey: "#9397B3",
          darkBlue: "#1E2240",
        },
      },
    },
  },
  plugins: [],
};
