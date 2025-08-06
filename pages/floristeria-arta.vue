<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-[#3F2D50] to-[#382C3E] text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Floristería en Artá
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Flores frescas y entrega rápida en todo Artá y pueblos cercanos
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              :to="$localePath('/shop')"
              class="bg-white text-[#3F2D50] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Ver Catálogo
            </NuxtLink>
            <NuxtLink
              :to="$localePath('/contact')"
              class="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#3F2D50] transition-all duration-300"
            >
              Contactar
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Servicios -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Servicios en Artá</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Servicio profesional de floristería con entrega express en Artá y toda la comarca del Llevant
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="bg-[#3F2D50] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Entrega express</h3>
            <p class="text-gray-600">Entrega en 2-3 horas en Artá y alrededores</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="bg-[#3F2D50] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Arreglos florales</h3>
            <p class="text-gray-600">Bodas, eventos y decoración floral personalizada</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="bg-[#3F2D50] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Plantas mediterráneas</h3>
            <p class="text-gray-600">Especialistas en flora autóctona de Mallorca</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Zonas de servicio -->
    <div class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Zonas que servimos en Artá</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Centro Artá</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Canyamel</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Font de sa Cala</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Cala Torta</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Cala Mesquida</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Cala Ratjada</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Colònia de Sant Pere</h4>
          </div>
          <div class="bg-[#F8F5FA] p-4 rounded-lg text-center">
            <h4 class="font-semibold">Capdepera</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonios -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Lo que dicen nuestros clientes en Artá</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">★★★★★</div>
              <span class="text-sm text-gray-600">Laura M. - Artá</span>
            </div>
            <p class="text-gray-700">
              "Increíble servicio en Artá. Las flores eran preciosas y llegaron muy rápido. Perfecto para mi evento."
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">★★★★★</div>
              <span class="text-sm text-gray-600">Carlos R. - Canyamel</span>
            </div>
            <p class="text-gray-700">
              "Excelente calidad y atención personalizada. Mi esposa quedó encantada con el ramo."
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div class="py-16 bg-[#3F2D50] text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">¿Necesitas flores en Artá?</h2>
        <p class="text-xl mb-8 opacity-90">
          Contáctanos y recibe tu pedido en Artá o cualquier punto del Llevant
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+34971587497"
            class="bg-white text-[#3F2D50] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            Llamar: 971 58 74 97
          </a>
          <NuxtLink
            :to="$localePath('/contact')"
            class="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#3F2D50] transition-all duration-300"
          >
            Enviar mensaje
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
  title: 'Floristería Artá | Flower Power - Envío de flores y plantas a domicilio',
  meta: [
    {
      name: 'description',
      content: 'Floristería en Artá con entrega a domicilio. Ramos de flores, plantas y decoración floral. Servicio en Artá, Canyamel, Cala Ratjada y todo el Llevant. Llama al 971 58 74 97'
    },
    {
      name: 'keywords',
      content: 'floristería Artá, flores Artá, envío flores Artá, ramos flores Artá, plantas Artá, floristería Mallorca, floristería Llevant'
    }
  ]
})
</script>
