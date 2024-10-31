<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <h1 class="my-5 font-medium text-2xl">
    {{ $t("home.title.featured") }}
  </h1>
  <div class="flex flex-col md:flex-row gap-4 mb-10 justify-around object-fit">
    <div class="relative card-container">
      <img
        src="public/images/floristeriaFlowerPower-Hero.webp"
        alt="Ramo de flores con anémonas moradas, dalias lilas y lisianthus"
        class="w-full h-full object-cover"
      />
      <div
        class="cta-image-container absolute bottom-5 left-5 md:bottom-10 md:left-10"
      >
        <h2 class="text-sm md:text-lg text-white mb-2 font-medium">
          Flower Power Yulenka
        </h2>
        <button
          class="px-6 py-2 bg-white text-grey-900 rounded-full hover:bg-gray-200 text-sm md:text-lg"
        >
          {{ $t("button.buy") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
