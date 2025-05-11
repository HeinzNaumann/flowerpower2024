<template>
  <div class="flex flex-col md:flex-row justify-center md:gap-36 gap-4 p-8">
    <div class="text-left">
      <h2 class="font-bold text-lg">
        {{ $t("categories.sections.occasions") }}
      </h2>
      <ul class="space-y-2 mt-4">
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: 'cumpleaños'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.birthday")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: 'nacimiento'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.birth")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: 'felicitaciones'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.congratulations")
          }}</NuxtLink>
        </li>

      </ul>
    </div>
    <div class="text-left">
      <h2 class="font-bold text-lg">{{ $t("categories.sections.moments") }}</h2>
      <ul class="space-y-2 mt-4">
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: 'romantico'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.romantic")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: 'gracias'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.sayThankYou")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: 'buenosdias'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.goodMorning")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {moments: 'buenasnoches'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.goodNight")
          }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="text-left">
      <h2 class="font-bold text-lg">
        {{ $t("categories.sections.weddings") }}
      </h2>
      <ul class="space-y-2 mt-4">
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: 'pedidamano'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.proposal")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath({path: '/shop', query: {occasions: 'aniversario'}})" class="text-neutral-900 hover:underline">{{
            $t("categories.links.anniversary")
          }}</NuxtLink>
        </li>

      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<style></style>
