// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "@nuxt/ui", "@pinia/nuxt", "@nuxt/image"],
  
  // Configuraciones experimentales y avanzadas
  experimental: {
    viewTransition: true,
  },
  
  // Configuración de app para rendimiento
  app: {
    // Habilitar prefetching inteligente
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      // Agregar hints de precarga para recursos críticos
      link: [
        { rel: 'preconnect', href: process.env.API_BASE_URL || "https://flowerpower.es/api" }
      ]
    }
  },
  css: [
    "~/assets/styles/main.css",
    "swiper/css",
    "swiper/css/effect-fade",
    "swiper/css/scrollbar",
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
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
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "https://flowerpower.es/api",
    },
  },
});
