/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '39rem',
        '100':'-5rem'
      }
    },
  },
  plugins: [],
}
