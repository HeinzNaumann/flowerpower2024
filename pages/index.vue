<template>
  <div class="md:mx-12 mx-2">
    <!-- Hero siempre visible -->
    <Hero />

    <!-- Resto de componentes con carga optimizada -->
    <div>
      <ProductSlider />
      <ProductHero />
      <FeaturedHero />
      <ProductSlider />
      <ProductHero />
      <CategoriesLinks />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// SEO dinámico portada
useHead({
  title: t('home.seo.title'),
  meta: [
    {
      name: 'description',
      content: t('home.seo.description')
    }
  ]
});
// Optimizar la carga de recursos
onMounted(() => {
  // Código de optimización simplificado
  if (typeof window !== 'undefined') {
    window.requestIdleCallback = window.requestIdleCallback || function(cb) {
      return setTimeout(cb, 1);
    };
  }
})
</script>

<style>
/* Transiciones suaves entre páginas */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
