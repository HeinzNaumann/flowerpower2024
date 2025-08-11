// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "@nuxt/ui", "@pinia/nuxt", "@nuxt/image"],
  
  // Configuración de Vite para manejar eventos pasivos y mejorar el rendimiento
  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-libs': ['vue', 'vue-router']
          }
        }
      }
    },
    plugins: [
      {
        name: 'passive-events-plugin',
        enforce: 'pre',
        transformIndexHtml(html) {
          return {
            html,
            tags: [
              {
                tag: 'script',
                injectTo: 'head',
                children: `
                  // Fix para eventos no pasivos
                  try {
                    window.addEventListener('test', null, {
                      get passive() {
                        const options = Object.defineProperty({}, 'passive', {
                          get() { return true; }
                        });
                        
                        // Sobrescribe el método addEventListener para hacer pasivos
                        // todos los eventos de wheel y touch
                        const originalAddEventListener = EventTarget.prototype.addEventListener;
                        EventTarget.prototype.addEventListener = function(type, listener, options) {
                          const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
                          let newOptions = options;
                          
                          if (passiveEvents.includes(type)) {
                            newOptions = typeof options === 'object' ? 
                              {...options, passive: options.passive === false ? false : true} : 
                              {passive: true};
                          }
                          
                          return originalAddEventListener.call(this, type, listener, newOptions);
                        };
                        return true;
                      }
                    });
                  } catch (e) {}
                `
              }
            ]
          };
        },
      }
    ]
  },
  
  // Configuraciones experimentales y avanzadas
  experimental: {
    viewTransition: true,
  },
  
  // Configuración de app para rendimiento
  app: {
    // Habilitar prefetching inteligente
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      // Agregar hints de precarga para recursos críticos
      link: [
        { rel: 'preconnect', href: process.env.API_BASE_URL || "https://www.flowerpower.es/api" }
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
    defaultLocale: "es",
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "locales/",
    locales: [
      { 
        code: "es", 
        file: "es.json", 
        name: "Español",
        iso: "es-ES" 
      },
      { 
        code: "en", 
        file: "en.json", 
        name: "English",
        iso: "en-US" 
      },
      { 
        code: "de", 
        file: "de.json", 
        name: "Deutsch",
        iso: "de-DE" 
      },
    ],
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      enabled: true,
      onlyOnRoot: true,
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    seo: true,
    baseUrl: "https://www.flowerpower.es",
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "https://www.flowerpower.es/api",
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
    },
  },
});
