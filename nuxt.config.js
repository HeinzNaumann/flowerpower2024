// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  css: ["~/assets/styles/main.css"],
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
      },
      {
        code: "de",
        iso: "de-DE",
        name: "German",
      },
      {
        code: "es",
        iso: "es-ES",
        name: "Spanish",
      },
    ],
    defaultLocale: "es", // Set Spanish as the default language
    vueI18n: "./i18n.config.js", // Path to the i18n configuration file
  },
});
