/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'inter': ['Inter', 'sans-serif'],
      },
      // colors:{
      //   'baseColor': '#1F8CDB',
      //   'gray100': '#E9E9E9',
      //   'gray200': '#C9C4C8',
      //   'gray400': '#827E81',
      //   'gray900': '#161015',
      //   'green100': '#E4F7E9',
      //   'green400': '#36BD5C',
      //   'red100': '#F7E4E4',
      //   'red400': '#E04B4B',
      //   'background': '#FFFFFF',
      //   'transparent' : 'transparent'
      // },
      borderRadius: {
        'custom': '10px',
      },
      // fontSize: {
      //   px12: ['12px', 'auto'],
      //   px14: ['14px', 'auto'],
      //   px16: ['16px', 'auto'],
      //   px20: ['20px', 'auto'],
      //   px29: ['29px', 'auto'],
      // },
    },
  },
  plugins: [],
} 