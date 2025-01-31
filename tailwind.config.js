/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'border-spin': {
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
      },
      
    },
  },
  plugins: [],
}

