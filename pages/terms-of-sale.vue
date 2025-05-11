<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Título -->
      <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">{{ $t('termsOfSale.title') }}</h1>
      
      <!-- Fecha de última actualización -->
      <p class="text-gray-600 mb-8 text-center">{{ $t('termsOfSale.lastUpdated') }}: 11/05/2025</p>
      
      <!-- Introducción -->
      <div class="mb-10">
        <p class="mb-4">{{ $t('termsOfSale.introduction.p1') }}</p>
        <p>{{ $t('termsOfSale.introduction.p2') }}</p>
      </div>
      
      <!-- Secciones -->
      <div class="space-y-10">
        <!-- Productos -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.products.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.products.p1') }}</p>
          <p>{{ $t('termsOfSale.products.p2') }}</p>
        </section>
        
        <!-- Precios -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.prices.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.prices.p1') }}</p>
          <p>{{ $t('termsOfSale.prices.p2') }}</p>
        </section>
        
        <!-- Pedidos -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.orders.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.orders.p1') }}</p>
          <p>{{ $t('termsOfSale.orders.p2') }}</p>
        </section>
        
        <!-- Pago -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.payment.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.payment.p1') }}</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>{{ $t('termsOfSale.payment.list.item1') }}</li>
            <li>{{ $t('termsOfSale.payment.list.item2') }}</li>
            <li>{{ $t('termsOfSale.payment.list.item3') }}</li>
          </ul>
          <p>{{ $t('termsOfSale.payment.p2') }}</p>
        </section>
        
        <!-- Envío y entrega -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.shipping.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.shipping.p1') }}</p>
          <p class="mb-4">{{ $t('termsOfSale.shipping.p2') }}</p>
          <p>{{ $t('termsOfSale.shipping.p3') }}</p>
        </section>
        
        <!-- Cancelaciones -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.cancellations.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.cancellations.p1') }}</p>
          <p>{{ $t('termsOfSale.cancellations.p2') }}</p>
        </section>
        
        <!-- Devoluciones -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.returns.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfSale.returns.p1') }}</p>
          <p class="mb-4">{{ $t('termsOfSale.returns.p2') }}</p>
          <p>{{ $t('termsOfSale.returns.p3') }}</p>
        </section>
        
        <!-- Garantía -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.warranty.title') }}</h2>
          <p>{{ $t('termsOfSale.warranty.p1') }}</p>
        </section>
        
        <!-- Reclamaciones -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.complaints.title') }}</h2>
          <p>{{ $t('termsOfSale.complaints.p1') }}</p>
        </section>
        
        <!-- Ley aplicable -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.governingLaw.title') }}</h2>
          <p>{{ $t('termsOfSale.governingLaw.p1') }}</p>
        </section>
        
        <!-- Contacto -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfSale.contact.title') }}</h2>
          <p>{{ $t('termsOfSale.contact.p1') }} <a :href="localePath('/contact')" class="text-[#382C3E] hover:underline">{{ $t('termsOfSale.contact.link') }}</a>.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocalePath, useHead } from '#imports';

const localePath = useLocalePath();

// SEO
useHead({
  title: 'Condiciones de Venta | Flower Power',
  meta: [
    {
      name: 'description',
      content: 'Condiciones de venta de la tienda online Flower Power. Información sobre pedidos, pagos, envíos, devoluciones y garantías.'
    }
  ]
});
</script>
