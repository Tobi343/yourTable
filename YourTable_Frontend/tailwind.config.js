const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {backgroundImage: {
      'LoginBackground': "url('/background.jpg')",
      'footer-texture': "url('http://images4.wikia.nocookie.net/__cb20120602014607/icarly/images/1/13/PearPhone3.jpg')",
     }},
    
    colors: {
      'main': '#F7761E',
      'indigo': '#5c6ac4',
      'indigo-dark': '#202e78',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      green: colors.green,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.yellow,
      blue: colors.blue,
      purple: colors.purple,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
