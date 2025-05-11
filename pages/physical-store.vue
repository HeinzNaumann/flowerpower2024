<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Título y descripción -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold mb-6">{{ $t('physicalStore.title') }}</h1>
      <p class="max-w-3xl mx-auto text-lg">
        {{ $t('physicalStore.description') }}
      </p>
    </div>

    <!-- Imágenes de la tienda -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div>
        <img 
          src="" 
          alt="Flower Power tienda física" 
          class="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div class="flex flex-col justify-between">
        <!-- Horario -->
        <div class="bg-neutral-100 p-6 rounded-lg shadow mb-6">
          <h2 class="text-xl font-bold mb-2">{{ $t('physicalStore.schedule.title') }}</h2>
          <p>{{ $t('physicalStore.schedule.weekdays') }}</p>
          <p>{{ $t('physicalStore.schedule.weekends') }}</p>
        </div>
        
        <!-- Talleres online -->
        <div class="bg-neutral-100 p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold mb-2">{{ $t('physicalStore.workshops.title') }}</h2>
          <p>{{ $t('physicalStore.workshops.description') }}</p>
        </div>
      </div>
    </div>

    <!-- Segunda imagen de la tienda -->
    <div class="mb-16">
      <img 
        src="" 
        alt="Interior de la tienda Flower Power" 
        class="w-full h-auto rounded-lg shadow-lg"
      />
    </div>

    <!-- Separador -->
    <div class="border-t border-gray-200 my-12"></div>

    <!-- Dirección y mapa -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-center mb-6">{{ $t('physicalStore.location.title') }}</h2>
      <p class="text-center mb-8">
        {{ $t('physicalStore.location.visit') }}
      </p>
      
      <!-- Google Maps iframe -->
      <div class="w-full h-96 rounded-lg overflow-hidden shadow-lg mb-8">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.6854665897584!2d2.1518899999999997!3d41.3867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f4142fdb4d%3A0x4c0a0e7d01b6d79f!2sCarrer%20Fetjet%2C%203%2C%2008009%20Barcelona!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      
      <!-- Video de la tienda -->
      <h2 class="text-2xl font-bold text-center mb-6">{{ $t('physicalStore.video.title') }}</h2>
      <div class="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <!-- Aquí iría el iframe de YouTube o un reproductor de video -->
        <iframe 
          width="100%" 
          height="500" 
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
          title="Flower Power Tienda" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importaciones necesarias
import { useHead } from '#imports';

// SEO
useHead({
  title: 'Nuestra Tienda Física | Flower Power',
  meta: [
    {
      name: 'description',
      content: 'Visita nuestra tienda física en Barcelona. Podrás sentir, oler y ver nuestras flores y plantas en persona.'
    }
  ]
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
