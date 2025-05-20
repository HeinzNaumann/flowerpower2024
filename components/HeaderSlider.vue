<template>
  <Swiper
    class="mt-3"
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
      <div
        class="flex flex-col w-full h-full bg-neutral-100 justify-center items-center text-center p-2"
      >
        <p :alt="$t(slide.titleKey)" class="text-sm lg:text-base font-medium">
          {{ $t(slide.titleKey) }}
        </p>
        <p v-if="slide.linkTextKey" class="text-xs lg:text-sm">
          <NuxtLink 
            v-if="slide.id !== 2" 
            :to="slide.link" 
            class="underline"
          >
            {{ $t(slide.linkTextKey) }}
          </NuxtLink>
          <a 
            v-else
            href="#"
            class="underline"
            @click.prevent="$emit('open-register')"
          >
            {{ $t(slide.linkTextKey) }}
          </a>
        </p>
        <p v-else-if="slide.descriptionKey" class="text-sm">
          {{ $t(slide.descriptionKey) }}
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
const emit = defineEmits(['open-register']);
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
