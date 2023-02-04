/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          blue: {
            50: '#f0f8ff',
            100: '#c6e2ff',
            200: '#3155ce',
            300: '#003366'
          },
          brown: '#ffc3a0'
        }
      }
    },
  },
  plugins: [],
}
