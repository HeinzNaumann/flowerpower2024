<template>
  <div class="container mx-auto px-4 py-10 max-w-5xl">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ $t('ourHistoryPage.title') }}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
      <div>
        <h2 class="text-2xl font-semibold mb-4">{{ $t('ourHistoryPage.teamSection.title') }}</h2>
        <p class="mb-4">{{ $t('ourHistoryPage.teamSection.paragraph1') }}</p>
        <p>{{ $t('ourHistoryPage.teamSection.paragraph2') }}</p>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img 
          src="assets/images/trabajando-flowerpower-floristeria.jpg" 
          :alt="$t('ourHistoryPage.teamSection.imageAlt')" 
          class="w-full h-auto"
        />
      </div>
    </div>
    
    <div class="mb-16">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('ourHistoryPage.historySection.title') }}</h2>
      <p class="mb-4">{{ $t('ourHistoryPage.historySection.paragraph1') }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
      <div class="md:order-2">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('ourHistoryPage.founderSection.title') }}</h2>
        <p class="mb-4">{{ $t('ourHistoryPage.founderSection.paragraph1') }}</p>
        <p class="mb-4">{{ $t('ourHistoryPage.founderSection.paragraph2') }}</p>
        <p>{{ $t('ourHistoryPage.founderSection.signature') }}</p>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg md:order-1">
        <img 
          src="assets/images/Antonia_Madueño.jpg" 
          width="500"
          height="500"
          :alt="$t('ourHistoryPage.founderSection.imageAlt')" 
          class="w-full h-auto"
        />
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('ourHistoryPage.valuesSection.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="border border-neutral-200 rounded-lg p-4">
          <h3 class="text-xl font-semibold mb-2">{{ $t('ourHistoryPage.valuesSection.values.0.title') }}</h3>
          <p>{{ $t('ourHistoryPage.valuesSection.values.0.description') }}</p>
        </div>
        <div class="border border-neutral-200 rounded-lg p-4">
          <h3 class="text-xl font-semibold mb-2">{{ $t('ourHistoryPage.valuesSection.values.1.title') }}</h3>
          <p>{{ $t('ourHistoryPage.valuesSection.values.1.description') }}</p>
        </div>
        <div class="border border-neutral-200 rounded-lg p-4">
          <h3 class="text-xl font-semibold mb-2">{{ $t('ourHistoryPage.valuesSection.values.2.title') }}</h3>
          <p>{{ $t('ourHistoryPage.valuesSection.values.2.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No es necesario importar useI18n, solo usamos $t en el template como en el resto de páginas.
</script>

<style scoped>
/* Estilos específicos para la página de nuestra historia si son necesarios */
</style>
