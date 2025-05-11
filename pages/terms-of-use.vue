<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Título -->
      <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">{{ $t('termsOfUse.title') }}</h1>
      
      <!-- Fecha de última actualización -->
      <p class="text-gray-600 mb-8 text-center">{{ $t('termsOfUse.lastUpdated') }}: 11/05/2025</p>
      
      <!-- Introducción -->
      <div class="mb-10">
        <p class="mb-4">{{ $t('termsOfUse.introduction.p1') }}</p>
        <p>{{ $t('termsOfUse.introduction.p2') }}</p>
      </div>
      
      <!-- Secciones -->
      <div class="space-y-10">
        <!-- Aceptación de términos -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.acceptance.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfUse.acceptance.p1') }}</p>
          <p>{{ $t('termsOfUse.acceptance.p2') }}</p>
        </section>
        
        <!-- Modificaciones -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.modifications.title') }}</h2>
          <p>{{ $t('termsOfUse.modifications.p1') }}</p>
        </section>
        
        <!-- Uso del sitio -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.siteUsage.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfUse.siteUsage.p1') }}</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>{{ $t('termsOfUse.siteUsage.list.item1') }}</li>
            <li>{{ $t('termsOfUse.siteUsage.list.item2') }}</li>
            <li>{{ $t('termsOfUse.siteUsage.list.item3') }}</li>
            <li>{{ $t('termsOfUse.siteUsage.list.item4') }}</li>
            <li>{{ $t('termsOfUse.siteUsage.list.item5') }}</li>
          </ul>
          <p>{{ $t('termsOfUse.siteUsage.p2') }}</p>
        </section>
        
        <!-- Cuentas de usuario -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.userAccounts.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfUse.userAccounts.p1') }}</p>
          <p>{{ $t('termsOfUse.userAccounts.p2') }}</p>
        </section>
        
        <!-- Propiedad intelectual -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.intellectualProperty.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfUse.intellectualProperty.p1') }}</p>
          <p>{{ $t('termsOfUse.intellectualProperty.p2') }}</p>
        </section>
        
        <!-- Enlaces a terceros -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.thirdPartyLinks.title') }}</h2>
          <p>{{ $t('termsOfUse.thirdPartyLinks.p1') }}</p>
        </section>
        
        <!-- Limitación de responsabilidad -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.liability.title') }}</h2>
          <p class="mb-4">{{ $t('termsOfUse.liability.p1') }}</p>
          <p>{{ $t('termsOfUse.liability.p2') }}</p>
        </section>
        
        <!-- Ley aplicable -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.governingLaw.title') }}</h2>
          <p>{{ $t('termsOfUse.governingLaw.p1') }}</p>
        </section>
        
        <!-- Contacto -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('termsOfUse.contact.title') }}</h2>
          <p>{{ $t('termsOfUse.contact.p1') }} <a :href="localePath('/contact')" class="text-[#382C3E] hover:underline">{{ $t('termsOfUse.contact.link') }}</a>.</p>
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
  title: 'Términos de Uso | Flower Power',
  meta: [
    {
      name: 'description',
      content: 'Términos y condiciones de uso de la tienda online Flower Power. Información sobre el uso adecuado del sitio web y los derechos y obligaciones de los usuarios.'
    }
  ]
});
</script>
