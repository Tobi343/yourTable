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
    
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
