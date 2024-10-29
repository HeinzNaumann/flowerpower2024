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
      <div class="flex flex-col w-full h-full bg-white justify-center p-2">
        <img
          :src="`https://flowerpower.es/api/files/product/${slide.images}`"
          :alt="slide.slug"
          class="h-100 w-100 object-cover border-grey-500 border-1 border-solid border mb-3"
        />
        <p :alt="$t(slide.title)" class="text-sm lg:text-base font-medium">
          {{ $t(slide.title) }}
        </p>

        <p v-if="isDesktop" class="text-sm lg:text-base font-extralight">
          {{ $t(slide.shortDescription) }}
        </p>
        <p class="text-sm lg:text-base font-extralight">{{ slide.price }} €</p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
const { isDesktop } = useCustomBreakpoints();
interface ProductSlide {
  id: number;
  images: string;
  slug: string;
  title: string;
  link?: string;
  shortDescription: string;
  price: number;
}

interface data {
  data: ProductSlide[];
}
const products = ref<ProductSlide[]>([]);

const fetchProducts = () => {
  const { data, error } = useFetchApi("products");
  if (error.value) {
    console.error("Error fetching products:", error.value);
  } else {
    products.value = data.value;
  }
};

fetchProducts();
</script>

<style scoped>
.swiper-slide {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
