/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.njk",
    "./_includes/**/*.njk",
    "./books/**/*.md",
    "./posts/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

