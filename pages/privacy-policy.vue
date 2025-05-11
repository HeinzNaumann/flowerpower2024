<template>
  <div class="container mx-auto px-4 py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ $t('privacyPage.title') }}</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('privacyPage.dataCollection.title') }}</h2>
      <p class="mb-4">{{ $t('privacyPage.dataCollection.description') }}</p>
      <ul class="list-disc pl-6 mb-4">
        <li v-for="(item, index) in 4" :key="index" class="mb-2">
          {{ $t(`privacyPage.dataCollection.items.${index}`) }}
        </li>
      </ul>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('privacyPage.dataUse.title') }}</h2>
      <p class="mb-4">{{ $t('privacyPage.dataUse.description') }}</p>
      <ul class="list-disc pl-6 mb-4">
        <li v-for="(item, index) in 5" :key="index" class="mb-2">
          {{ $t(`privacyPage.dataUse.items.${index}`) }}
        </li>
      </ul>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('privacyPage.cookies.title') }}</h2>
      <p class="mb-4">{{ $t('privacyPage.cookies.description') }}</p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-neutral-200 mb-4">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('privacyPage.cookies.table.type') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('privacyPage.cookies.table.purpose') }}</th>
              <th class="py-2 px-4 border-b border-neutral-200 text-left">{{ $t('privacyPage.cookies.table.duration') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in 3" :key="index" class="hover:bg-neutral-50">
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`privacyPage.cookies.table.rows.${index}.type`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`privacyPage.cookies.table.rows.${index}.purpose`) }}</td>
              <td class="py-2 px-4 border-b border-neutral-200">{{ $t(`privacyPage.cookies.table.rows.${index}.duration`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('privacyPage.thirdParties.title') }}</h2>
      <p class="mb-4">{{ $t('privacyPage.thirdParties.description') }}</p>
      <ul class="list-disc pl-6">
        <li v-for="(party, index) in 3" :key="index" class="mb-2">
          {{ $t(`privacyPage.thirdParties.items.${index}`) }}
        </li>
      </ul>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('privacyPage.rights.title') }}</h2>
      <p class="mb-4">{{ $t('privacyPage.rights.description') }}</p>
      <ul class="list-disc pl-6">
        <li v-for="(right, index) in 5" :key="index" class="mb-2">
          {{ $t(`privacyPage.rights.items.${index}`) }}
        </li>
      </ul>
      <p class="mt-4">{{ $t('privacyPage.contact') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No es necesario importar useI18n, solo usamos $t en el template como en el resto de páginas.
</script>

<style scoped>
/* Estilos específicos para la página de política de privacidad si son necesarios */
</style>
