<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Título -->
      <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">{{ $t('cookieSettings.title') }}</h1>
      
      <!-- Fecha de última actualización -->
      <p class="text-gray-600 mb-8 text-center">{{ $t('cookieSettings.lastUpdated') }}: 11/05/2025</p>
      
      <!-- Introducción -->
      <div class="mb-10">
        <p class="mb-4">{{ $t('cookieSettings.introduction.p1') }}</p>
        <p>{{ $t('cookieSettings.introduction.p2') }}</p>
      </div>
      
      <!-- Secciones -->
      <div class="space-y-10">
        <!-- ¿Qué son las cookies? -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('cookieSettings.whatAreCookies.title') }}</h2>
          <p>{{ $t('cookieSettings.whatAreCookies.p1') }}</p>
        </section>
        
        <!-- Tipos de cookies que utilizamos -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('cookieSettings.typesOfCookies.title') }}</h2>
          <p class="mb-6">{{ $t('cookieSettings.typesOfCookies.p1') }}</p>
          
          <div class="space-y-6">
            <!-- Cookies técnicas -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{ $t('cookieSettings.typesOfCookies.technical.title') }}</h3>
              <p>{{ $t('cookieSettings.typesOfCookies.technical.description') }}</p>
            </div>
            
            <!-- Cookies de preferencias -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{ $t('cookieSettings.typesOfCookies.preferences.title') }}</h3>
              <p>{{ $t('cookieSettings.typesOfCookies.preferences.description') }}</p>
            </div>
            
            <!-- Cookies analíticas -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{ $t('cookieSettings.typesOfCookies.analytics.title') }}</h3>
              <p>{{ $t('cookieSettings.typesOfCookies.analytics.description') }}</p>
            </div>
            
            <!-- Cookies de marketing -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{ $t('cookieSettings.typesOfCookies.marketing.title') }}</h3>
              <p>{{ $t('cookieSettings.typesOfCookies.marketing.description') }}</p>
            </div>
          </div>
        </section>
        
        <!-- Configuración de cookies -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('cookieSettings.manageCookies.title') }}</h2>
          <p class="mb-6">{{ $t('cookieSettings.manageCookies.p1') }}</p>
          
          <!-- Panel de configuración de cookies -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gray-50 p-4 border-b border-gray-200">
              <h3 class="font-semibold">{{ $t('cookieSettings.manageCookies.panel.title') }}</h3>
            </div>
            
            <div class="p-6 space-y-4">
              <!-- Cookies técnicas (siempre activas) -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium">{{ $t('cookieSettings.typesOfCookies.technical.title') }}</h4>
                  <p class="text-sm text-gray-600">{{ $t('cookieSettings.manageCookies.panel.alwaysActive') }}</p>
                </div>
                <div class="relative">
                  <input type="checkbox" checked disabled class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-[#382C3E] peer-disabled:bg-[#382C3E] peer-disabled:opacity-70"></div>
                  <div class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5 peer-disabled:translate-x-5"></div>
                </div>
              </div>
              
              <!-- Cookies de preferencias -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium">{{ $t('cookieSettings.typesOfCookies.preferences.title') }}</h4>
                  <p class="text-sm text-gray-600">{{ $t('cookieSettings.manageCookies.panel.preferencesDescription') }}</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="preferences-cookies" v-model="cookiePreferences.preferences" class="sr-only peer">
                  <label for="preferences-cookies" class="block w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-[#382C3E] cursor-pointer"></label>
                  <div class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5"></div>
                </div>
              </div>
              
              <!-- Cookies analíticas -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium">{{ $t('cookieSettings.typesOfCookies.analytics.title') }}</h4>
                  <p class="text-sm text-gray-600">{{ $t('cookieSettings.manageCookies.panel.analyticsDescription') }}</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="analytics-cookies" v-model="cookiePreferences.analytics" class="sr-only peer">
                  <label for="analytics-cookies" class="block w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-[#382C3E] cursor-pointer"></label>
                  <div class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5"></div>
                </div>
              </div>
              
              <!-- Cookies de marketing -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium">{{ $t('cookieSettings.typesOfCookies.marketing.title') }}</h4>
                  <p class="text-sm text-gray-600">{{ $t('cookieSettings.manageCookies.panel.marketingDescription') }}</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="marketing-cookies" v-model="cookiePreferences.marketing" class="sr-only peer">
                  <label for="marketing-cookies" class="block w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-[#382C3E] cursor-pointer"></label>
                  <div class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5"></div>
                </div>
              </div>
              
              <!-- Botones de acción -->
              <div class="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
                <button @click="rejectAll" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  {{ $t('cookieSettings.manageCookies.panel.rejectAll') }}
                </button>
                <button @click="acceptAll" class="px-4 py-2 bg-[#382C3E] text-white rounded-md hover:bg-[#4A3C50]">
                  {{ $t('cookieSettings.manageCookies.panel.acceptAll') }}
                </button>
                <button @click="savePreferences" class="px-4 py-2 bg-[#382C3E] text-white rounded-md hover:bg-[#4A3C50]">
                  {{ $t('cookieSettings.manageCookies.panel.savePreferences') }}
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Cómo eliminar las cookies -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('cookieSettings.deleteCookies.title') }}</h2>
          <p class="mb-4">{{ $t('cookieSettings.deleteCookies.p1') }}</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>{{ $t('cookieSettings.deleteCookies.browsers.chrome') }}</li>
            <li>{{ $t('cookieSettings.deleteCookies.browsers.firefox') }}</li>
            <li>{{ $t('cookieSettings.deleteCookies.browsers.safari') }}</li>
            <li>{{ $t('cookieSettings.deleteCookies.browsers.edge') }}</li>
          </ul>
        </section>
        
        <!-- Actualizaciones de la política -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('cookieSettings.updates.title') }}</h2>
          <p>{{ $t('cookieSettings.updates.p1') }}</p>
        </section>
        
        <!-- Contacto -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('cookieSettings.contact.title') }}</h2>
          <p>{{ $t('cookieSettings.contact.p1') }} <a :href="localePath('/contact')" class="text-[#382C3E] hover:underline">{{ $t('cookieSettings.contact.link') }}</a>.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalePath, useHead } from '#imports';

const localePath = useLocalePath();

// SEO
useHead({
  title: 'Configuración de Cookies | Flower Power',
  meta: [
    {
      name: 'description',
      content: 'Configuración de cookies de la tienda online Flower Power. Gestiona tus preferencias de cookies y privacidad.'
    }
  ]
});

// Estado de las preferencias de cookies
const cookiePreferences = ref({
  preferences: true,
  analytics: true,
  marketing: false
});

// Métodos para gestionar las cookies
const acceptAll = () => {
  cookiePreferences.value = {
    preferences: true,
    analytics: true,
    marketing: true
  };
  savePreferences();
};

const rejectAll = () => {
  cookiePreferences.value = {
    preferences: false,
    analytics: false,
    marketing: false
  };
  savePreferences();
};

const savePreferences = () => {
  // Aquí iría la lógica para guardar las preferencias de cookies
  console.log('Preferencias de cookies guardadas:', cookiePreferences.value);
  
  // En una implementación real, aquí se guardarían las preferencias en localStorage o cookies
  // y se aplicarían los cambios en las cookies del sitio
  
  // Mostrar un mensaje de confirmación (en una implementación real)
  alert('Tus preferencias de cookies han sido guardadas.');
};
</script>
