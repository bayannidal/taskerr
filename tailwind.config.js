module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: 'rgb(255,255,255)',
        // secondary: 'rgb(243 244 246)',
        primary: '#FEFFFE',
        secondary: '#F8F8F9',
        // dPrimary: '#121212',
        // dSecondary: '#1E1E1E',
        dPrimary: '#292929',
        dSecondary: '#353536',
        // dPrimary: '#3F5A7D',
        // dSecondary: '#4C688D',
        // dSecondary: '#224069',
        // dPrimary: '#122F5D',
        comp: '#FAFAFF',
        third: '#FEDE55',
        text: '#323442',
        dText: "#FAFAFF"
      },
      dark: 'class'
    },
  },
  plugins: [],
}