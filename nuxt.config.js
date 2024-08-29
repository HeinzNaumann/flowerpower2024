// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  css: ["~/assets/styles/main.css"],
  i18n: {
    locales: ['es', 'en', 'de'],
    defaultLocale: 'es',
    vueI18n: "./i18n.config.ts",
  }
})


