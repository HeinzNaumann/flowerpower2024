// Plugin de transiciones de página para FlowerPower
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Configurar transiciones de página
  nuxtApp.hook('page:finish', () => {
    // Scroll al inicio de la página al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})
