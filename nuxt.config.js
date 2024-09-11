// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  css: ["~/assets/styles/main.css"],
  i18n: {
    locales: [{ code: 'es', file: 'es.json', name: 'Español' },
    { code: 'en', file: 'en.json', name: 'English' },
    { code: 'de', file: 'de.json', name: 'Deutsch' },],
    defaultLocale: 'es',
    vueI18n: "./i18n.config.ts",
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales/',
  }
})