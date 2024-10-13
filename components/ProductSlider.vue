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
    <SwiperSlide v-for="(slide, idx) in ProductSlides" :key="idx">
      <div class="flex flex-col w-full h-full bg-white justify-center p-2">
        <img
          :src="slide.imageUrl"
          :alt="slide.alt"
          class="h-100 w-100 object-cover border-grey-500 border-1 border-solid border mb-3"
        />
        <p :alt="$t(slide.titleKey)" class="text-sm lg:text-base font-medium">
          {{ $t(slide.titleKey) }}
        </p>

        <p class="text-sm lg:text-base font-extralight">
          {{ $t(slide.descriptionKey) }}
        </p>
        <p class="text-sm lg:text-base font-extralight">{{ slide.Price }} €</p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
interface ProductSlide {
  id: number;
  imageUrl: string;
  alt: string;
  titleKey: string;
  link?: string;
  descriptionKey: string;
  Price: number;
}
const ProductSlides = ref<ProductSlide[]>([
  {
    id: 1,
    imageUrl: "/images/Ramo_con_flores_variadas.jpg",
    alt: "Ramo con flores variadas",
    titleKey: "Flower bouquet",
    descriptionKey: "Ramo con flores variadas",
    link: "/shop",
    Price: 20,
  },
  {
    id: 2,
    imageUrl: "/images/Ramo_con_lilium_y_rosas_alstroemeria.jpg",
    alt: "Ramo con lilium y rosas alstroemeria",
    titleKey: "Flower power",
    descriptionKey: "Algosto de lilium y rosas alstroemeria",
    link: "/login-register",
    Price: 25,
  },
  {
    id: 3,
    imageUrl: "/images/Ramo_con_rosas_azules_y_amarillas.jpg",
    alt: "Ramo con rosas azules y amarillas",
    titleKey: "Flower world",
    descriptionKey: "Ramo con rosas azules y amarillas",
    link: "/login-register",
    Price: 30,
  },
  {
    id: 4,
    imageUrl: "/images/Ramo_de_flor_variada_tonos_rosados.jpg",
    alt: "Ramo de flores variadas en tonos rosados",
    titleKey: "home.slides.slide2.title",
    descriptionKey: "Ramo de flores variadas en tonos rosados",
    link: "/login-register",
    Price: 35,
  },
]);
</script>

<style scoped>
.swiper-slide {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
