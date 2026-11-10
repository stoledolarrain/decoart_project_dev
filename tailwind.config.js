/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deco: {
          pink: {
            DEFAULT: '#FF2A85',
            hover: '#E01670',
            light: '#FFE4EF',
            50: '#FFF1F7',
            100: '#FFE4EF',
            500: '#FF2A85',
            600: '#E01670',
            700: '#BD0E5D',
          },
          gold: {
            DEFAULT: '#F59E0B',
            light: '#FEF3C7',
            dark: '#D97706',
          },
          blue: {
            DEFAULT: '#0EA5E9',
            light: '#E0F2FE',
            dark: '#0284C7',
          },
          green: {
            DEFAULT: '#10B981',
            light: '#D1FAE5',
            dark: '#059669',
          },
          dark: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

