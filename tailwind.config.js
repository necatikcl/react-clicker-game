module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    fontFamily: {
      sans: ['Roboto']
    },
    extend: {},
  },
  variants: {
    extend: {
      scale: ['active'],
    }
  },
  plugins: [],
}
