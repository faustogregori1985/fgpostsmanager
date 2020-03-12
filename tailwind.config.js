module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'white-75': 'rgba(255, 255, 255, 0.75)',
      'black-75': 'rgba(0,0,0, 0.75)'
    }),
    extend: {},
  },
  variants: {},
  plugins: [],
}
