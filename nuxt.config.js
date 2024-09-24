// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "nuxt-swiper"],
  css: [
    "~/assets/styles/main.css",
    "swiper/css",
    "swiper/css/effect-fade",
    "swiper/css/scrollbar",
  ],
  i18n: {
    locales: [
      { code: "es", file: "es.json", name: "Español" },
      { code: "en", file: "en.json", name: "English" },
      { code: "de", file: "de.json", name: "Deutsch" },
    ],
    defaultLocale: "es",
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "locales/",
    detectBrowserLanguage: {
      enabled: true,
      onlyOnRoot: true,
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    seo: true,
    baseUrl: "https://flowerpower.es",
  },
});
