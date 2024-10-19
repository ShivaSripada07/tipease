/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tipease-primary': '#05aa6d',
        'tipease-primary-dark': '#048c59',
        'tipease-dark': '#1d2a35',
      },
    },
  },
  plugins: [],
}