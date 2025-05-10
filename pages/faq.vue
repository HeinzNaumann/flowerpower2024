<template>
  <div class="container mx-auto px-4 py-10 max-w-3xl">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ $t('faqPage.title') }}</h1>
    <div v-for="idx in 8" :key="idx" class="mb-6">
      <details class="bg-white rounded shadow p-4">
        <summary class="cursor-pointer font-semibold text-lg">{{ $t(`faqPage.faqs.${idx - 1}.q`) }}</summary>
        <p class="mt-2 text-neutral-700">{{ $t(`faqPage.faqs.${idx - 1}.a`) }}</p>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
// No es necesario importar useI18n ni definir faqs, solo usamos $t en el template como en el resto de páginas.
</script>

<style scoped>
details[open] summary {
  color: #10b981; /* Tailwind emerald-500 */
}
</style>
