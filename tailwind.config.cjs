/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#071d34',
        'primary-hover': '#283d55',
      },
    },
  },
  plugins: [],
};
