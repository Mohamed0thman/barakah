/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./template/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primry: {
        100: "#E6F5B3",
        300: "#D4EB66",
        500: "#C3E600",
      },
      success: {
        100: "#E3FCEC",
        300: "#92F2B8",
        500: "#067647",
      },
      negative: {
        100: "#FFECEB",
        300: "#E7A29D",
        500: "#AD342B",
        600: "#932C25",
      },
      gray: {
        50: "#FFFFFF",
        100: "#F7F7F7",
        200: "#EBEBEB",
        300: "#0A0A0A1F",
        400: "#AFAFAF",
        700: "#7A7A7A",
        800: "#666666",
        900: "#0A0A0A",
      },
      black: "#000000",
      white: "#FFFFFF",
      yellow: "#FFD700",

      transparent: "transparent",
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
      auto: "auto",
    },
    borderRadius: {
      s: 4,
      m: 8,
      l: 16,
      xl: 20,
      xxl: 40,
      full: 999,
    },
    fontSize: {
      s: 10,
      m: 14,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 28,
    },
    extend: {},
  },
  plugins: [],
};
