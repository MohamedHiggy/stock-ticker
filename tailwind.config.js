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
        'text-black': '#212121',
        'color-purple-light': '#7C88FF',
        'dark-color': '#070f33',
        'secondary-color': '#000C66',
        'hover-blue': '#234d9de6',
        'gray-dark': '#364766',
        'gray-200': '#4E4B66',
        'gray-teal': '#364666',
        'gray-medium': '#030229',
        'placeholder-text': '#A0A3BD',
        'inactive-text': '#D9DBE9',
        'input-bg': '#EFF0F6',
        'font-title': '#14142B',
        'font-lbl': '#6E7191',
        'gray-blue': '#EBF0FA',
        'off-white': '#FCFCFC',
        'bg-light': '#fafafb',
        'color-red': '#FF2D2B',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
