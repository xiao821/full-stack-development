export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@element-plus/nuxt'],
  nitro: {
    experimental: {
      wasm: true
    },
    externals: {
      external: ['better-sqlite3']
    }
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production'
  }
})
