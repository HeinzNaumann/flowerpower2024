<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Título -->
      <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">{{ $t('legalNotice.title') }}</h1>
      
      <!-- Fecha de última actualización -->
      <p class="text-gray-600 mb-8 text-center">{{ $t('legalNotice.lastUpdated') }}: 11/05/2025</p>
      
      <!-- Introducción -->
      <div class="mb-10">
        <p>{{ $t('legalNotice.introduction') }}</p>
      </div>
      
      <!-- Secciones -->
      <div class="space-y-10">
        <!-- Datos identificativos -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.identificationData.title') }}</h2>
          <ul class="space-y-2">
            <li><strong>{{ $t('legalNotice.identificationData.companyName.label') }}:</strong> {{ $t('legalNotice.identificationData.companyName.value') }}</li>
            <li><strong>{{ $t('legalNotice.identificationData.nif.label') }}:</strong> {{ $t('legalNotice.identificationData.nif.value') }}</li>
            <li><strong>{{ $t('legalNotice.identificationData.address.label') }}:</strong> {{ $t('legalNotice.identificationData.address.value') }}</li>
            <li><strong>{{ $t('legalNotice.identificationData.email.label') }}:</strong> {{ $t('legalNotice.identificationData.email.value') }}</li>
            <li><strong>{{ $t('legalNotice.identificationData.phone.label') }}:</strong> {{ $t('legalNotice.identificationData.phone.value') }}</li>
            <li><strong>{{ $t('legalNotice.identificationData.registrationData.label') }}:</strong> {{ $t('legalNotice.identificationData.registrationData.value') }}</li>
          </ul>
        </section>
        
        <!-- Finalidad -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.purpose.title') }}</h2>
          <p>{{ $t('legalNotice.purpose.p1') }}</p>
        </section>
        
        <!-- Condiciones de uso -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.termsOfUse.title') }}</h2>
          <p class="mb-4">{{ $t('legalNotice.termsOfUse.p1') }}</p>
          <p>{{ $t('legalNotice.termsOfUse.p2') }}</p>
        </section>
        
        <!-- Propiedad intelectual e industrial -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.intellectualProperty.title') }}</h2>
          <p class="mb-4">{{ $t('legalNotice.intellectualProperty.p1') }}</p>
          <p>{{ $t('legalNotice.intellectualProperty.p2') }}</p>
        </section>
        
        <!-- Exclusión de responsabilidad -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.disclaimer.title') }}</h2>
          <p class="mb-4">{{ $t('legalNotice.disclaimer.p1') }}</p>
          <p>{{ $t('legalNotice.disclaimer.p2') }}</p>
        </section>
        
        <!-- Enlaces externos -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.externalLinks.title') }}</h2>
          <p>{{ $t('legalNotice.externalLinks.p1') }}</p>
        </section>
        
        <!-- Modificaciones -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.modifications.title') }}</h2>
          <p>{{ $t('legalNotice.modifications.p1') }}</p>
        </section>
        
        <!-- Legislación aplicable -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ $t('legalNotice.applicableLaw.title') }}</h2>
          <p>{{ $t('legalNotice.applicableLaw.p1') }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#imports';

// SEO
useHead({
  title: 'Aviso Legal | Flower Power',
  meta: [
    {
      name: 'description',
      content: 'Aviso legal de la tienda online Flower Power. Información sobre la empresa, condiciones de uso y responsabilidades.'
    }
  ]
});
</script>
