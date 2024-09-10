// i18n.config.js
import es from "./locales/es.json";
import en from "./locales/en.json";
import de from "./locales/de.json";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "es",
  messages: {
    en,
    de,
    es,
  },
}));
