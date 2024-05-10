/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{md,njk,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

