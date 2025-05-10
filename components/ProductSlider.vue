<template>
  <Swiper
    class="mt-3"
    :height="300"
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="3"
    :loop="false"
    :effect="'fade'"
    :noSwiping="true"
    :noSwipingClass="'swiper-no-swiping'"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
  >
    <SwiperSlide v-for="(slide, id) in products" :key="id">
      <NuxtLink
        :to="$localePath({ path: '/product', query: { slug: slide.slug } })"
        class="flex flex-col w-full h-full bg-white justify-center p-2 hover:shadow-lg transition-shadow duration-200"
      >
        <img
          :src="`${config.public.apiBaseUrl}/files/product/${slide.images}`"
          :alt="slide.slug"
          class="w-full object-cover border-neutral-200 border-solid border mb-3"
        />
        <p :alt="slide.title" class="text-sm lg:text-base font-medium">
          {{ slide.title }}
        </p>

        <p v-if="isDesktop" class="text-sm lg:text-base font-extralight">
          {{ $t(slide.shortDescription) }}
        </p>
        <p class="text-sm lg:text-base font-extralight">{{ slide.price }} €</p>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
const { isDesktop } = useCustomBreakpoints();
import type { Product } from "~/types/types";

const products = ref<Product[]>([]);
const config = useRuntimeConfig();

onMounted(async () => {
  const { data, error } = await useFetchSlider("products");

  if (!error.value && data.value !== null) {
    products.value = data.value as Product[];
  } else {
    console.error("No se pudieron cargar los productos");
    products.value = [];
  }
});
</script>

<style scoped>
.swiper-slide {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
