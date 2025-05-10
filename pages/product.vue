<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">
      {{ $t("productPage.product") }} / {{ product.title }}
    </h1>

    <div class="flex flex-col md:flex-row justify-around">
      <div
        :class="[
          'relative flex items-center justify-center zoom-container',
          cursorClass,
        ]"
        @mousemove="handleMouseMove"
        @mouseleave="stopZoom"
        @wheel.prevent="handleWheel"
      >
        <img
          :src="`${config.public.apiBaseUrl}/files/product/${product.images}`"
          width="500"
          height="500"
          :style="zoomStyle"
          class="w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-cover"
          alt="Flower Power Emilio Bouquet"
          @click="toggleZoom"
        />
        <button
          @click="toggleZoom"
          class="hidden md:block absolute top-1 right-1 p-2"
        >
          <img
            src="/assets/icons/magnifier.svg"
            :alt="$t('header.alt.cart')"
            class="size-8 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
      </div>

      <div class="flex flex-col justify-between p-6">
        <div class="flex md:flex-row flex-col justify-between">
          <h2 class="text-2xl">{{ product.title }}</h2>
          <div class="text-2xl">€ {{ product.price }}</div>
        </div>
        <p class="text-neutral-600 mb-6">{{ product.shortDescription }}</p>

        <div>
          <h3 class="text-lg font-medium">
            {{ $t("productPage.addYourComplement") }}:
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <div
              class="rounded-lg p-4 text-center cursor-pointer border-2 transition-all"
              :class="selectedComplements.box ? 'border-[#db9526] ring-2 ring-[#db9526]' : 'border-transparent'"
              @click="toggleComplement('box')"
              tabindex="0"
              @keydown.enter="toggleComplement('box')"
            >
              <img
                src="public/images/complements/bombones.webp"
                alt="complement"
                class="w-full h-32 object-cover mb-2 border p-2"
              />
              <div class="flex items-center justify-center gap-2 mt-2 font-medium">
                1x {{ $t("productPage.box") }} (€45.00)
              </div>
            </div>
            <div
              class="rounded-lg p-4 text-center cursor-pointer border-2 transition-all"
              :class="selectedComplements.bottle ? 'border-[#db9526] ring-2 ring-[#db9526]' : 'border-transparent'"
              @click="toggleComplement('bottle')"
              tabindex="0"
              @keydown.enter="toggleComplement('bottle')"
            >
              <img
                src="public/images/complements/moet-chandon.webp"
                alt="complement"
                class="w-full h-32 object-cover mb-2 border p-2"
              />
              <div class="flex items-center justify-center gap-2 mt-2 font-medium">
                1x {{ $t("productPage.bottle") }} (€45.00)
              </div>
            </div>
            <div
              class="rounded-lg p-4 text-center cursor-pointer border-2 transition-all"
              :class="selectedComplements.card ? 'border-[#db9526] ring-2 ring-[#db9526]' : 'border-transparent'"
              @click="toggleComplement('card')"
              tabindex="0"
              @keydown.enter="toggleComplement('card')"
            >
              <img
                src="public/images/complements/tarjeta-felicitacion.webp"
                alt="complement"
                class="w-full h-32 object-cover mb-2 border p-2"
              />
              <div class="flex items-center justify-center gap-2 mt-2 font-medium">
                1x {{ $t("productPage.card") }} (€45.00)
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col border-t border-b w-3/4 self-end text-xs py-2 space-y-1"
        >
          <div class="flex justify-between items-center">
            <span>1x {{ product.title }}</span>
            <span>€{{ product.price }}</span>
          </div>
          <div v-if="selectedComplements.box" class="flex justify-between items-center">
            <span>1x {{ $t("productPage.box") }}</span>
            <span>€45.00</span>
          </div>
          <div v-if="selectedComplements.bottle" class="flex justify-between items-center">
            <span>1x {{ $t("productPage.bottle") }}</span>
            <span>€45.00</span>
          </div>
          <div v-if="selectedComplements.card" class="flex justify-between items-center">
            <span>1x {{ $t("productPage.card") }}</span>
            <span>€45.00</span>
          </div>
        </div>

        <div
          class="flex gap-2 items-center text-xl font-normal self-end mt-2 mb-5"
        >
          <span>{{ $t("productPage.subTotal") }}</span>
          <span>€{{ totalPrice }}</span>
        </div>

        <button
          class="w-1/3s flex self-end bg-[#db9526] hover:bg-[#db9526] text-black p-3 rounded-md transition-colors cursor-pointer"
          @click="addToCart"
        >
          {{ $t("productPage.addToCart") }}
        </button>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-xl font-semibold mb-4">{{ $t("productPage.colors") }}</h3>
      <div class="flex items-center gap-2">
        <div
          v-for="color in mappedColors"
          :class="[
            color.class,
            'w-6',
            'h-6',
            'rounded-full',
            'inline-block',
            'gap-2',
          ]"
          :key="color.name"
        ></div>
      </div>
    </div>
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-2">{{ $t("productPage.sizes") }}</h3>
      <p class="text-neutral-600">{{ product.sizes }}</p>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-2">
        {{ $t("productPage.description") }}
      </h3>
      <p class="text-neutral-600">
        {{ product.description }}
      </p>
    </div>
    <CartDrawer v-model:open="showCartDrawer" @checkout="goToCheckout" />
  </div>
</template>

<script setup>
import CartDrawer from '~/components/CartDrawer.vue';
import { ref, computed } from "vue";
import { useCartStore } from "~/stores/cart";

const config = useRuntimeConfig();
const route = useRoute();
const slug = route.query.slug;
const { locale, t } = useI18n();

const cart = useCartStore();

const { data: product, error } = await useFetch(
  `${config.public.apiBaseUrl}/products/${slug}?lang=${locale.value}`
);

const { mappedColors } = useColorMapping(product.value.colors);

// Complements selection state
const selectedComplements = ref({
  box: false,
  bottle: false,
  card: false,
});

function toggleComplement(id) {
  selectedComplements.value[id] = !selectedComplements.value[id];
  const complement = COMPLEMENTS.find(c => c.id === id);
  if (!product.value) return;
  const parentId = product.value.id;
  if (selectedComplements.value[id]) {
    // Add to cart
    cart.addItem({
      id: `complement-${id}-${parentId}`,
      title: t(complement.name),
      price: complement.price,
      images: complement.image ? [complement.image.replace(/^public\//, "")] : [],
      quantity: 1,
      isComplement: true,
      parentProductId: parentId
    });
  } else {
    // Remove from cart
    cart.removeItem(`complement-${id}-${parentId}`);
  }
}

const COMPLEMENTS = [
  {
    id: 'box',
    name: 'productPage.box',
    price: 45,
    image: 'public/images/complements/bombones.webp',
  },
  {
    id: 'bottle',
    name: 'productPage.bottle',
    price: 45,
    image: 'public/images/complements/moet-chandon.webp',
  },
  {
    id: 'card',
    name: 'productPage.card',
    price: 45,
    image: 'public/images/complements/tarjeta-felicitacion.webp',
  },
];

const totalPrice = computed(() => {
  let total = Number(product.value?.price || 0);
  if (selectedComplements.value.box) total += 45;
  if (selectedComplements.value.bottle) total += 45;
  if (selectedComplements.value.card) total += 45;
  return total.toFixed(2);
});

const showCartDrawer = ref(false);

function goToCheckout() {
  showCartDrawer.value = false;
  window.location.href = '/checkout/checkout';
}

function addToCart() {
  showCartDrawer.value = true;
  // Add main product
  // Asegura que la imagen tenga la URL completa del API
const productWithFullImageUrl = {
    ...product.value,
    quantity: 1,
    // Usa la URL completa del API para la imagen
    images: [`${config.public.apiBaseUrl}/files/product/${product.value.images}`]
  };
  cart.addItem(productWithFullImageUrl);
  // Limpia complementos antiguos de este producto
  COMPLEMENTS.forEach((c) => {
    cart.removeItem(`complement-${c.id}-${product.value.id}`);
  });
  // Añade solo los complementos seleccionados
  COMPLEMENTS.forEach((c) => {
    if (selectedComplements.value[c.id]) {
      cart.addItem({
        id: `complement-${c.id}-${product.value.id}`,
        title: t(c.name),
        price: c.price,
        images: c.image ? [c.image.replace(/^public\//, "")] : [],
        quantity: 1,
        isComplement: true,
        parentProductId: product.value.id
      });
    }
  });
}

const isZoomActive = ref(false);
const scale = ref(1);
const transformOrigin = ref("center");

const maxScale = 3;
const minScale = 1;

const zoomStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: transformOrigin.value,
  transition: "transform 0.3s ease",
}));

const zoomIcon = computed(() => {
  if (isZoomActive.value && scale.value >= maxScale) {
    return "/assets/icons/magnifier-minus.svg";
  }
  return "/assets/icons/magnifier-plus.svg";
});

const cursorClass = computed(() => {
  return isZoomActive.value && scale.value > minScale
    ? "cursor-zoom-out"
    : "cursor-zoom-in";
});

function toggleZoom() {
  if (!isZoomActive.value) {
    isZoomActive.value = true;
    scale.value = 1.5;
  } else {
    isZoomActive.value = false;
    scale.value = 1;
  }
  transformOrigin.value = "center";
}

function handleMouseMove(e) {
  if (!isZoomActive.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  transformOrigin.value = `${x}% ${y}%`;
}

function stopZoom() {
  isZoomActive.value = false;
  scale.value = 1;
  transformOrigin.value = "center";
}

function handleWheel(e) {
  if (!isZoomActive.value) return;
  let newScale = scale.value;
  if (e.deltaY < 0) {
    newScale += 0.1;
  } else if (e.deltaY > 0) {
    newScale -= 0.1;
  }
  newScale = Math.max(minScale, Math.min(newScale, maxScale));
  scale.value = newScale;
}
</script>

<style scoped>
.zoom-container {
  position: relative;
  overflow: hidden;
}

.cursor-zoom-in {
  cursor: zoom-in;
}

.cursor-zoom-out {
  cursor: zoom-out;
}
</style>
