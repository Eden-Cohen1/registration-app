/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",    // Primary color
        primaryVar: "var(--color-primary-variant)",    // Primary color
        offset: "var(--color-offset)",  // input offset color
        link: "var(--color-link)",  // link color
        secondary: "var(--color-secondary)",  // Secondary color
        btnHover: "var(--color-btnHover)",  // Button hover color
        btnSocialHover: "var(--color-btnSocialHover:)",  // Button hover color
        btnDisabled: "var(--color-btnDisabled)",  // Button disabled color
        bg: "var(--color-bg)",              // Background color
        "bgSec": "var(--color-bg-sec)",    // Secondary background color
        text: "var(--color-text)",          // Text color
        "textSec": "var(--color-text-sec)", // Secondary text color
      },
    },
  },
  plugins: [],
};