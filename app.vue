<template>
  <UApp>
    <NuxtLayout>
      <Head>
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-WFLPL6JJGK"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WFLPL6JJGK');
      </script>
    </Head>
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

// Obtener las clases de transición
const transitionClasses = useCustomPageTransition()
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
