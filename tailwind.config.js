module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1650px',
      '4xl': '1860px'
    },
    extend: {
      colors: {
        'gray-200': '#4E4B66',
        'gray-teal': '#364666',
        'off-white': '#FCFCFC',
        'bg-light': '#fafafb',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
