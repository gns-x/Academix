/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        animation: {
          'text-pulse': 'text-pulse 2s ease-in-out infinite',
        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            inter: ['Inter', 'sans-serif'],
          },
        keyframes: {
          'text-pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.7 },
          },
        },
      },
    },
    plugins: [],
  };
