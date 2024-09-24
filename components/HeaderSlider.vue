<template>
  <Swiper
    class="top-[100px] lg:top-[170px]"
    :height="300"
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="1"
    :loop="true"
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
    <SwiperSlide v-for="(slide, idx) in slides" :key="idx">
      <div class="flex flex-col w-full h-full bg-gray-200 justify-center">
        <p :src="slide.image" :alt="slide.title" class="text-base">
          {{ slide.title }}
        </p>
        <p v-if="slide.linkText" class="text-sm">
          <NuxtLink :to="slide.link" class="underline">{{
            slide.linkText
          }}</NuxtLink>
        </p>
        <p v-else class="text-sm">
          {{ slide.description }}
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import "swiper/css/scrollbar";

const slides = ref([
  {
    id: 1,
    title: "Comprar Novedades",
    linkText: "Comprar",
    link: "/shop",
  },
  {
    id: 2,
    title: "Descuento de 10% en tu primera compra",
    linkText: "Registrate",
    link: "/login-register",
  },
]);
</script>

<style>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  height: 70px;
  font-size: 1rem;
  text-align: center;
}

.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}
</style>
