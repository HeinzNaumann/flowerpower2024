<template>
  <div class="relative flex flex-col md:flex-row">
    <div
      class="hidden md:grid bg-[#3F2D50] w-1/3 content-center justify-items-start justify-center gap-2 text-white pl-8 xl:pl-0"
    >
      <h1 class="text-3xl md:text-4xl font-bold text-left uppercase">
        {{ $t("home.hero.titleFirstHalf") }} <br />
        {{ $t("home.hero.titleSecondHalf") }}
      </h1>
      <p class="text-lg text-left !text-white">{{ $t("home.hero.subtitle") }}</p>
      <NuxtLink
        :to="$localePath('/shop')"
        class="inline-block bg-white text-neutral-900 font-bold py-2 px-5 rounded-full hover:bg-neutral-200 transition duration-200 transform hover:scale-105"
      >
        {{ $t("button.buy") }}
      </NuxtLink>
    </div>

    <div class="w-full md:w-1/2 lg:w-2/3 relative">
      <img
        src="/images/floristeriaFlowerPower-Hero.webp"
        alt="{{ $t('header.alt.logo') }}"
        class="h-[80vh] object-cover w-full"
        loading="eager"
      />

      <div
        class="absolute bottom-0 left-0 p-4 w-full text-white space-y-3 md:hidden pl-8"
      >
        <h1 class="text-3xl font-bold text-left uppercase">
          {{ $t("home.hero.titleFirstHalf") }}
          {{ $t("home.hero.titleSecondHalf") }}
        </h1>
        <p class="text-lg text-left !text-white">{{ $t("home.hero.subtitle") }}</p>
        <NuxtLink
          :to="$localePath('/shop')"
          class="inline-block bg-white text-neutral-900 font-bold py-2 px-4 rounded-full hover:bg-red-400 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          {{ $t("button.buy") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#imports'
const $localePath = useLocalePath()
</script>
