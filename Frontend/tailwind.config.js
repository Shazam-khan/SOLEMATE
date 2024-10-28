/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#3D2B1F',
        'custom-brown-light': '#6D5642',
      },
      backgroundImage: {
        'brown-gradient': 'linear-gradient(135deg, #B89F8D, #3D2B1F)', // Define gradient
      },
    },
  },
  plugins: [],
}
