import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as ReturnType<typeof createPinia>;
  pinia.use(piniaPluginPersistedstate);
});
