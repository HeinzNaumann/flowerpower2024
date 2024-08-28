// i18n.config.js
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'es', // Default language
  messages: {
    en: {
      welcome: 'Welcome',
      underConstruction: {
        heading: 'Flower Power Website is Under Construction',
        message:
          'We apologize for the inconvenience, but our website is currently undergoing some exciting updates and improvements.',
        contact: 'Call the shop', // More direct and engaging
      },
    },
    de: {
      welcome: 'Willkommen',
      underConstruction: {
        heading: 'Flower Power Website ist im Aufbau',
        message:
          'Wir entschuldigen uns für die Unannehmlichkeiten, aber unsere Website wird derzeit aufregend aktualisiert und verbessert.',
        contact: 'Rufen Sie den Laden an', // Clear and straightforward
      },
    },
    es: {
      welcome: 'Bienvenido',
      underConstruction: {
        heading: 'El sitio web de Flower Power está en construcción',
        message:
          'Pedimos disculpas por las molestias, pero nuestro sitio web está actualmente en proceso de emocionantes actualizaciones y mejoras.',
        contact: 'Llama a la tienda', // Corrected Spanish phrase
      },
    },
  },
}));