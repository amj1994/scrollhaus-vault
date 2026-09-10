/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Behind The Nineties', 'serif'],
        sans: ['Inter', 'sans-serif'],
        'sans-tight': ['Inter Tight', 'sans-serif'],
        noi: ['Noi Variable Flex Trial', 'Inter Tight', 'sans-serif'],
        mono: ['Chivo Mono', 'monospace'],
      },
      colors: {
        cream: '#f8f3ef',
      },
    },
  },
  plugins: [],
};
