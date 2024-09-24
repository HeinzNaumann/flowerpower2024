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
        <p :alt="$t(slide.titleKey)" class="text-base">
          {{ $t(slide.titleKey) }}
        </p>
        <p v-if="slide.linkTextKey" class="text-sm">
          <NuxtLink :to="slide.link" class="underline">
            {{ $t(slide.linkTextKey) }}
          </NuxtLink>
        </p>
        <p v-else-if="slide.descriptionKey" class="text-sm">
          {{ $t(slide.descriptionKey) }}
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
interface Slide {
  id: number;
  titleKey: string;
  linkTextKey?: string;
  link?: string;
  descriptionKey?: string;
}
const slides = ref<Slide[]>([
  {
    id: 1,
    titleKey: "home.slides.slide1.title",
    linkTextKey: "home.slides.slide1.linkText",
    link: "/shop",
  },
  {
    id: 2,
    titleKey: "home.slides.slide2.title",
    linkTextKey: "home.slides.slide2.linkText",
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
  height: 68px;
  font-size: 1rem;
  text-align: center;
}

.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}
</style>
