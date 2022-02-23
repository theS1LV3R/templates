import type { NuxtConfig } from '@nuxt/types'

const metaData = {
  url: 'localhost',
  scheme: 'http',
  title: '',
  description: '',
  email: '',
  theme: '',
  author: '',
  locale: '',
}

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-server/
  server: {
    https: undefined,
    host: '0.0.0.0',
  },

  // SSR: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) =>
      titleChunk !== 'nuxt-template' && titleChunk !== ''
        ? `${titleChunk} | Nuxt template`
        : 'Nuxt template',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: metaData.description,
      },

      { name: 'title', content: metaData.title },
      { name: 'theme-color', content: metaData.theme },
      { name: 'author', content: metaData.author },
      {
        hid: 'description',
        name: 'description',
        content: metaData.description,
      },

      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: metaData.title },
      { property: 'og:url', content: `${metaData.scheme}://${metaData.url}` },
      { property: 'og:locale', content: metaData.locale },
      { property: 'og:description', content: metaData.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios-accessor.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/harlan-zw/nuxt-webpack-optimisations
    'nuxt-webpack-optimisations',
    // https://www.npmjs.com/package/@nuxt/postcss8
    '@nuxt/postcss8',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/netlify-files-module
    '@nuxtjs/netlify-files',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://marquez.co/docs/nuxt-optimized-images
    '@aceforth/nuxt-optimized-images',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // https://nuxtjs.org/docs/configuration-glossary/configuration-telemetry/
  telemetry: false,

  // https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: `${metaData.scheme}://${metaData.url}`,
    exclude: ['/admin/**'],
  },

  // https://github.com/nuxt-community/robots-module
  robots: [
    {
      UserAgent: '*',
      Allow: '*',
      Disallow: '/admin',
      Sitemap: '/sitemap.xml',
    },
  ],

  // https://color-mode.nuxtjs.org/
  colorMode: {
    fallback: 'dark',
    classSuffix: '',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },

  // https://github.com/harlan-zw/nuxt-webpack-optimisations
  webpackOptimisations: {
    hardSourcePlugin: process.env.NODE_ENV === 'development',
    parallelPlugin: process.env.NODE_ENV === 'development',
  },

  // https://marquez.co/docs/nuxt-optimized-images
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false,
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'jpg'],
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-generate/
  generate: {
    fallback: '404.html',
  },

  // https://go.nuxtjs.dev/tailwindcss
  tailwindcss: {
    exposeConfig: true,
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-loading/
  loading: {
    throttle: 0,
    continuous: true,
    color: '#BF616A',
  },

  // https://www.npmjs.com/package/@nuxtjs/toast
  toast: {
    position: 'bottom-right',
    duration: 3000,
    keepOnHover: true,
  },

  // https://go.nuxtjs.dev/axios
  axios: {
    baseURL: 'http://localhost:3001/api/v1',
    credentials: true,
    progress: true,
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config/
  publicRuntimeConfig: {
    // https://go.nuxtjs.dev/axios
    axios: {
      browserBaseURL:
        process.env.NODE_ENV === 'production'
          ? process.env.BROWSER_BASE_URL
          : undefined,
    },
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config/
  privateRuntimeConfig: {
    // https://go.nuxtjs.dev/axios
    axios: {
      baseURL:
        process.env.NODE_ENV === 'production'
          ? process.env.BASE_URL
          : undefined,
    },
  },
}

export default config
