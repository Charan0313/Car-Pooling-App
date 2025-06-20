/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./a  pp.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}