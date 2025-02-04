/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3949ab", // Primary color
        primaryVar: "#17318e", // Primary variant color
        offset: "#bbc0e0", // Input offset color
        link: "#5769d4", // Link color
        secondary: "#5769d5", // Secondary color
        btnHover: "#27368f", // Button hover color
        btnSocialHover: "#f0f0f0", // Button social hover color
        btnDisabled: "#3949ab", // Button disabled color
        bg: "#e2dfed", // Background color
        bgSec: "#d2d2e2", // Secondary background color
        text: "#444141", // Text color
        textSec: "#757575", // Secondary text color
      },
      fontFamily: {
        lato: ["Lato-Regular"],
        latoBold: ["Lato-Bold"],
        latoBlack: ["Lato-Black"],
        latoLight: ["Lato-Light"],
        latoThin: ["Lato-Thin"],
      },
    },
  },
  plugins: [],
};
