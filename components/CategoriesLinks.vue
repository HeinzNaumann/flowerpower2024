<template>
  <div class="flex flex-col md:flex-row justify-center md:gap-36 gap-4 p-8">
    <div class="text-left">
      <h2 class="font-bold text-lg">
        {{ $t("categories.sections.occasions") }}
      </h2>
      <ul class="space-y-2 mt-4">
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: tFilter('cumpleaños')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.birthday")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: tFilter('nacimiento')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.birth")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: tFilter('felicitaciones')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.congratulations")
          }}</NuxtLink>
        </li>

      </ul>
    </div>
    <div class="text-left">
      <h2 class="font-bold text-lg">{{ $t("categories.sections.moments") }}</h2>
      <ul class="space-y-2 mt-4">
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: tFilter('romantico')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.romantic")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: tFilter('gracias')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.sayThankYou")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: tFilter('gratitud')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.gratitude")
          }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="text-left">
      <h2 class="font-bold text-lg">
        {{ $t("categories.sections.flowers") }}
      </h2>
      <ul class="space-y-2 mt-4">
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {flowers: tFilter('rosas')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.roses")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {flowers: tFilter('margaritas')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.margaritas")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {flowers: tFilter('gerberas')}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.gerberas")
          }}</NuxtLink>
        </li>

      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
const { locale } = useI18n();

// Traducciones de slugs de filtros por idioma (usamos ES como referencia)
const filterTranslations: Record<string, Record<string, string>> = {
  es: {
    // Ocasiones
    cumpleaños: 'cumpleaños',
    nacimiento: 'nacimiento',
    felicitaciones: 'felicitaciones',
    // Momentos
    romantico: 'romantico',
    gracias: 'gracias',
    gratitud: 'gratitud',
    // Flores
    rosas: 'rosas',
    margaritas: 'margaritas',
    gerberas: 'gerberas',
  },
  en: {
    // Ocasiones
    cumpleaños: 'birthday',
    nacimiento: 'birth',
    felicitaciones: 'congratulations',
    // Momentos
    romantico: 'romantic',
    gracias: 'thankyou',
    gratitud: 'gratitude',
    // Flores
    rosas: 'roses',
    margaritas: 'margaritas',
    gerberas: 'gerberas',
  },
  de: {
    // Ocasiones
    cumpleaños: 'geburtstag',
    nacimiento: 'geburt',
    felicitaciones: 'glückwünsche',
    // Momentos
    romantico: 'romantisch',
    gracias: 'danke',
    gratitud: 'dankbarkeit',
    // Flores
    rosas: 'rosen',
    margaritas: 'margeriten',
    gerberas: 'gerbera',
  },
};

// Devuelve el slug traducido partiendo del valor base en ES
const tFilter = (valueEs: keyof typeof filterTranslations.es) => {
  const lang = locale.value as 'es' | 'en' | 'de';
  const table = filterTranslations[lang] || filterTranslations.es;
  return table[valueEs] || valueEs;
};
</script>

<style></style>
