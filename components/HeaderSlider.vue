<template>
  <Swiper
  class="top-[100px] lg:top-[170px] "
    :height="300"
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: true,
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
      <div class="flex flex-col w-full h-full bg-gray-200 ">
      <p
        :src="slide.image"
        :alt="slide.title"
        class=" flex flex-col"
      >
        {{ slide.title }}
     
      </p>
      <p>
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
    title: "Envio Gratuito",
    description: "Description 1",
    src: "https://via.placeholder.com/800x400?text=Slide+1",
  },
  {
    id: 2,
    title: "Envio Gratuito",
    description: "Description 2",
    src: "https://via.placeholder.com/800x400?text=Slide+2",
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
