/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',    // Primary color from CSS variable
        secondary: 'var(--color-secondary)',  // Secondary color from CSS variable
        bg: 'var(--color-bg)',              // Background color from CSS variable
        'bg-sec': 'var(--color-bg-sec)',    // Secondary background color
        text: 'var(--color-text)',          // Text color
        'text-sec': 'var(--color-text-sec)', // Secondary text color
      },
    },
  },
  plugins: [],
}

