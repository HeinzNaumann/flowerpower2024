<template>
  <div class="container mx-auto px-4 py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ $t('shippingPage.title') }}</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('shippingPage.deliveryAreas.title') }}</h2>
      <p class="mb-4">{{ $t('shippingPage.deliveryAreas.description') }}</p>
      <ul class="list-disc pl-6 mb-4">
        <li v-for="(area, index) in 3" :key="index" class="mb-2">
          {{ $t(`shippingPage.deliveryAreas.areas.${index}`) }}
        </li>
      </ul>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('shippingPage.deliveryTimes.title') }}</h2>
      <p class="mb-4">{{ $t('shippingPage.deliveryTimes.description') }}</p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-neutral-200 mb-4">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('shippingPage.deliveryTimes.table.orderType') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('shippingPage.deliveryTimes.table.processingTime') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('shippingPage.deliveryTimes.table.deliveryTime') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in 3" :key="index" class="hover:bg-neutral-50">
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`shippingPage.deliveryTimes.table.rows.${index}.type`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`shippingPage.deliveryTimes.table.rows.${index}.processing`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`shippingPage.deliveryTimes.table.rows.${index}.delivery`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('shippingPage.shippingCosts.title') }}</h2>
      <p class="mb-4">{{ $t('shippingPage.shippingCosts.description') }}</p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-neutral-200 mb-4">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('shippingPage.shippingCosts.table.location') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('shippingPage.shippingCosts.table.standardDelivery') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('shippingPage.shippingCosts.table.expressDelivery') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in 3" :key="index" class="hover:bg-neutral-50">
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`shippingPage.shippingCosts.table.rows.${index}.location`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`shippingPage.shippingCosts.table.rows.${index}.standard`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`shippingPage.shippingCosts.table.rows.${index}.express`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('shippingPage.specialInstructions.title') }}</h2>
      <p class="mb-4">{{ $t('shippingPage.specialInstructions.description') }}</p>
      <ul class="list-disc pl-6">
        <li v-for="(instruction, index) in 4" :key="index" class="mb-2">
          {{ $t(`shippingPage.specialInstructions.instructions.${index}`) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// No es necesario importar useI18n, solo usamos $t en el template como en el resto de páginas.
</script>

<style scoped>
/* Estilos específicos para la página de envío y entrega si son necesarios */
</style>
