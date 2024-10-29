<template>
  <div class="flex flex-flex gap-4 mb-10 justify-around">
    <div class="relative card-container">
      <img
        src="public/images/bouquet-red-gerberas-tulips-mixed.webp"
        alt="Ramo de flores con anémonas moradas, dalias lilas y lisianthus"
        class="w-full h-full object-cover max-w-4xl"
      />
      <div class="cta-image-container absolute bottom-10 left-10">
        <h2 class="text-lg text-white mb-2 font-medium">
          Flower Power Yulenka
        </h2>
        <button
          class="px-6 py-2 bg-white text-grey-900 rounded-full hover:bg-gray-200"
        >
          {{ $t("button.buy") }}
        </button>
      </div>
    </div>

    <div class="relative card-container">
      <img
        src="public/images/bouquet-purple-anemones-dahlias-lisianthus.webp"
        alt="Ramo de flores con gerberas rojas, tulipanes y follaje verde"
        class="w-full h-full object-cover max-w-4xl"
      />
      <div class="cta-image-container absolute bottom-10 left-10">
        <h2 class="text-lg text-white mb-2 font-medium">
          Flower Power Yulenka
        </h2>
        <button
          class="px-6 py-2 bg-white text-grey-900 rounded-full hover:bg-gray-200"
        >
          {{ $t("button.buy") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
