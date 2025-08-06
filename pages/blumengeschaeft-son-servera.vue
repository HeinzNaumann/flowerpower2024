<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-[#3F2D50] to-[#382C3E] text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Blumengeschäft in Son Servera
          </h1>
          <h3 class="text-xl md:text-2xl mb-8 opacity-90">
            Blumen- und Pflanzenservice mit Lieferung in ganz Son Servera
          </h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              :to="$localePath('/shop')"
              class="bg-white text-[#3F2D50] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Katalog anzeigen
            </NuxtLink>
            <NuxtLink
              :to="$localePath('/contact')"
              class="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#3F2D50] transition-all duration-300"
            >
              Kontakt
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Servicios -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Dienstleistungen in Son Servera</h2>
          <h3 class="text-lg text-gray-600 max-w-2xl mx-auto">
            Wir bieten einen kompletten Blumenservice mit schneller Lieferung in Son Servera und Umgebung
          </h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="bg-[#3F2D50] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Express-Lieferung</h3>
            <p class="text-gray-600">Lieferung in 2-3 Stunden in Son Servera und Umgebung</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="bg-[#3F2D50] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Blumenarrangements</h3>
            <p class="text-gray-600">Hochzeiten, Events und maßgeschneiderte Blumendekoration</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="bg-[#3F2D50] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Mediterrane Pflanzen</h3>
            <p class="text-gray-600">Spezialisten für einheimische mallorquinische Flora</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Zonas de servicio -->
    <div class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Gebiete, die wir in Son Servera bedienen</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Son Servera Zentrum</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Port Verd</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">S'Illot</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Sa Coma</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Cala Millor</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Cala Bona</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Costa dels Pins</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Cala Morlanda</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonios -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Was unsere Kunden in Son Servera sagen</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">★★★★★</div>
              <span class="text-sm text-gray-600">Laura M. - Son Servera</span>
            </div>
            <p class="text-gray-700">
              "Erstaunlicher Service in Son Servera. Die Blumen waren wunderschön und kamen sehr schnell. Perfekt für meine Veranstaltung."
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">★★★★★</div>
              <span class="text-sm text-gray-600">Carlos R. - Sa Coma</span>
            </div>
            <p class="text-gray-700">
              "Ausgezeichnete Qualität und persönliche Betreuung. Meine Frau war begeistert vom Strauß."
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div class="py-16 bg-[#3F2D50] text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Brauchen Sie Blumen in Son Servera?</h2>
        <h3 class="text-xl mb-8 opacity-90">
          Kontaktieren Sie uns jetzt und erhalten Sie Ihre Bestellung noch heute
        </h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+34971587497"
            class="bg-white text-[#3F2D50] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            Anrufen: +34 971 58 74 97
          </a>
          <NuxtLink
            :to="$localePath('/contact')"
            class="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#3F2D50] transition-all duration-300"
          >
            Nachricht senden
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead, useLocalePath } from '#imports'

const localePath = useLocalePath()

useHead({
  title: 'Blumengeschäft Son Servera | Flower Power - Blumen und Pflanzen Lieferung',
  meta: [
    {
      name: 'description',
      content: 'Blumengeschäft in Son Servera mit Lieferservice. Blumensträuße, Pflanzen und Blumendekoration. Service in Son Servera, Sa Coma, Cala Millor und Umgebung. Rufen Sie +34 971 58 74 97 an'
    },
    {
      name: 'keywords',
      content: 'blumengeschäft Son Servera, blumen Son Servera, blumenlieferung Son Servera, blumensträuße Son Servera, pflanzen Son Servera, blumengeschäft Mallorca'
    }
  ]
})
</script>
