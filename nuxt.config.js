export default {
  ssr: false,
  head: {
    title: 'stock-ticker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  css: [
  ],

  plugins: [
  ],


  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-highcharts'
  ],

  highcharts: {
    exporting: true,
  },

  axios: {
    baseURL: '/',
  },

  build: {
  },

  router: {
    prefetchLinks: false,
  },

  loading: {
    color: '#B90E57',
    height: '3px',
    continuous: true
  }
}
