<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
        ...transitionClasses
      }" />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// Importar las transiciones personalizadas
import { useCustomPageTransition } from '~/composables/pageTransition'
import { useHead } from '#imports'

// Obtener las clases de transición
const transitionClasses = useCustomPageTransition()

import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

useHead({
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-WFLPL6JJGK',
      async: true
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WFLPL6JJGK');
      `
    }
  ]
})

onMounted(() => {
  // Tracking inicial (por si la navegación es directa)
  if (window.gtag && (!window.cookiePreferences || window.cookiePreferences.analytics)) {
    window.gtag('event', 'page_view', {
      page_path: route.fullPath,
      page_title: document.title,
      page_location: window.location.href
    })
  }
  // Tracking en cada cambio de ruta
  router.afterEach((to) => {
    if (window.gtag && (!window.cookiePreferences || window.cookiePreferences.analytics)) {
      window.gtag('event', 'page_view', {
        page_path: to.fullPath,
        page_title: document.title,
        page_location: window.location.href
      })
    }
  })
})
</script>

<style>
/* Estilos para las transiciones de página */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Transición para la página de producto */
.product-detail-enter-active,
.product-detail-leave-active {
  transition: all 0.4s ease-out;
}

.product-detail-enter-from,
.product-detail-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Transición para la página de tienda */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Transición para el checkout */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
