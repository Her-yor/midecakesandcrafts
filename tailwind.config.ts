/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          cream: '#FFF9F5',
          'soft-pink': '#FFB6C1',
          'pastel-pink': '#FFC0CB',
          'deep-pink': '#FF8FA3',
          mint: '#B5E7CF',
          'soft-mint': '#D4F5E0',
          charcoal: '#3D3D3D',
          'soft-gray': '#6B6B6B',
          'light-gray': '#9B9B9B',
          gold: '#D4AF37',
          'warm-brown': '#5C4033',
          'footer-bg': '#3D2B1F',
        },
        fontFamily: {
          serif: ['Playfair Display', 'Georgia', 'serif'],
          sans: ['Inter', 'system-ui', 'sans-serif'],
          script: ['Pacifico', 'cursive'],
        },
      },
    },
    plugins: [],
  }