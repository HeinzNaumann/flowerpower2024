<template>
  <div class="container mx-auto px-4 py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ $t('bouquetCarePage.title') }}</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('bouquetCarePage.generalCare.title') }}</h2>
      <p class="mb-4">{{ $t('bouquetCarePage.generalCare.description') }}</p>
      <ul class="list-disc pl-6 mb-4">
        <li v-for="(item, index) in 5" :key="index" class="mb-2">
          {{ $t(`bouquetCarePage.generalCare.tips.${index}`) }}
        </li>
      </ul>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('bouquetCarePage.wateringGuide.title') }}</h2>
      <p class="mb-4">{{ $t('bouquetCarePage.wateringGuide.description') }}</p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-neutral-200 mb-4">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('bouquetCarePage.wateringGuide.table.flowerType') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('bouquetCarePage.wateringGuide.table.waterAmount') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('bouquetCarePage.wateringGuide.table.frequency') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in 4" :key="index" class="hover:bg-neutral-50">
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`bouquetCarePage.wateringGuide.table.rows.${index}.type`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`bouquetCarePage.wateringGuide.table.rows.${index}.amount`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`bouquetCarePage.wateringGuide.table.rows.${index}.frequency`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('bouquetCarePage.seasonalCare.title') }}</h2>
      <p class="mb-4">{{ $t('bouquetCarePage.seasonalCare.description') }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(season, index) in 4" :key="index" class="border border-neutral-200 rounded-lg p-4">
          <h3 class="text-xl font-semibold mb-2">{{ $t(`bouquetCarePage.seasonalCare.seasons.${index}.name`) }}</h3>
          <p class="mb-3">{{ $t(`bouquetCarePage.seasonalCare.seasons.${index}.description`) }}</p>
          <ul class="list-disc pl-6">
            <li v-for="(tip, tipIndex) in 2" :key="tipIndex" class="mb-1">
              {{ $t(`bouquetCarePage.seasonalCare.seasons.${index}.tips.${tipIndex}`) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('bouquetCarePage.commonProblems.title') }}</h2>
      <p class="mb-4">{{ $t('bouquetCarePage.commonProblems.description') }}</p>
      <div class="space-y-4">
        <div v-for="(problem, index) in 3" :key="index" class="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
          <h3 class="text-lg font-semibold mb-2">{{ $t(`bouquetCarePage.commonProblems.problems.${index}.problem`) }}</h3>
          <p>{{ $t(`bouquetCarePage.commonProblems.problems.${index}.solution`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No es necesario importar useI18n, solo usamos $t en el template como en el resto de páginas.
</script>

<style scoped>
/* Estilos específicos para la página de cuidado de ramos si son necesarios */
</style>
