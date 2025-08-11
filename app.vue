<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
import { useHead } from '#imports'

// Head & scripts

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
