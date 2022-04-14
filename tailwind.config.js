const defaultTheme = require('tailwindcss/defaulttheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '325px',
      ...defaultTheme.screens,
      '3xl': '1600px'
    },
    extend: {
      colors: {
        // primary: 'rgb(255,255,255)',
        // secondary: 'rgb(243 244 246)',
        primary: '#FEFFFE',
        secondary: '#F8F8F9',
        comp: '#FAFAFF',
        third: '#FEDE55',
        text: '#323442'
      },

      dark: 'class'
    },
  },
  plugins: [],
}