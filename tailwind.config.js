module.exports = {
  content: ['./components/**/*.js', './layouts/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
