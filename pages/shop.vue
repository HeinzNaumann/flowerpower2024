<template>
  <div class="container mx-auto p-4">
    <!-- Sort Dropdown -->
    <div class="flex justify-end mb-4">
      <div class="relative">
        <button
          @click="showDropdown = !showDropdown"
          class="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-sm shadow-md"
        >
          Sort by
        </button>
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-sm shadow-md z-10"
        >
          <button
            @click="sortProducts('price', 'asc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            Price: Low to High
          </button>
          <button
            @click="sortProducts('price', 'desc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            Price: High to Low
          </button>
          <button
            @click="sortProducts('name', 'asc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            Name: A to Z
          </button>
          <button
            @click="sortProducts('name', 'desc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            Name: Z to A
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar and Product Grid -->
    <div class="flex flex-col md:flex-row">
      <!-- Sidebar con filtros -->
      <aside class="w-full md:w-1/4 space-y-8">
        <Filters
          :typeData="typeData"
          :title="$t('shop.filtersTitle.flowers')"
        />
        <FilterColors
          :colors="availableColors"
          :title="$t('shop.filtersTitle.colors')"
        />
        <Filters
          :typeData="typeData"
          :title="$t('shop.filtersTitle.moments')"
        />
        <Filters
          :typeData="typeData"
          :title="$t('shop.filtersTitle.occasions')"
        />
      </aside>

      <!-- Grid de productos -->
      <main class="w-full md:w-3/4 md:pl-6">
        <!-- Skeleton loader mientras carga -->
        <div v-if="isLoading" 
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          <div v-for="n in 9" :key="`skeleton-${n}`" class="animate-pulse">
            <div class="flex flex-col w-full h-full bg-white justify-center p-2">
              <div class="size-72 bg-neutral-200 mb-3"></div>
              <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-neutral-200 rounded w-1/2 mb-2"></div>
              <div class="h-3 bg-neutral-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
        
        <!-- Productos reales -->
        <div v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          <div v-for="(product, id) in products" :key="id" class="transform transition duration-300 hover:scale-[1.02]">
            <NuxtLink
              :to="
                localePath({ path: '/product', query: { slug: product.slug } })
              "
              class="flex flex-col w-full h-full bg-white justify-center p-2"
            >
              <img
                :src="`${config.public.apiBaseUrl}/files/product/${product.images}`"
                :alt="product.slug"
                class="size-72 object-cover border-neutral-200 border-solid border mb-3 w-full h-72"
                loading="lazy"
              />
              <p :alt="product.title" class="text-sm lg:text-base font-medium text-pri">
                {{ product.title }}
              </p>

              <p class="text-sm lg:text-base font-extralight">
                {{ product.shortDescription }}
              </p>
              <p class="text-sm lg:text-base font-extralight">
                {{ product.price }} €
              </p>
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/types";
const localePath = useLocalePath();

const route = useRoute();
const showDropdown = ref(false);
const { data, error, pending } = useFetchApi("products");
const isLoading = ref(true);
const config = useRuntimeConfig();

const categories = ["flowers", "moments", "occasions"] as const;
type Category = (typeof categories)[number];

type CategoryItem = { name: string; count: number };

const typeData = ref<Record<Category, CategoryItem[]>>({
  flowers: [],
  moments: [],
  occasions: [],
});

const products = computed<Product[]>(() => data.value || []);

// Simular un tiempo de carga mínimo para evitar parpadeos
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

// Actualizar estado de carga cuando cambian los datos
watch(() => pending.value, (isPending) => {
  if (!isPending && data.value) {
    // Pequeño retraso para asegurar transición suave
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  } else {
    isLoading.value = true;
  }
}, { immediate: true });

const availableColors = ref<string[]>([]);

watch(
  products,
  (newProducts) => {
    const updated: Record<Category, CategoryItem[]> = {
      flowers: [],
      moments: [],
      occasions: [],
    };

    categories.forEach((category) => {
      const rawStrings = newProducts.flatMap(
        (product) => product[category] || []
      );

      const allItems = rawStrings.flatMap((str) =>
        str.split(",").map((s) => {
          const trimmed = s.trim();
          if (!trimmed) return "";
          return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
        })
      );

      const freqMap = allItems.reduce((acc, item) => {
        if (!item) return acc;
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      updated[category] = Object.entries(freqMap).map(([name, count]) => ({
        name,
        count,
      }));
    });

    typeData.value = updated;

    const allColors = newProducts.flatMap((product) => product.colors || []);
    availableColors.value = Array.from(
      new Set(allColors.map((color) => color.toLowerCase()))
    );
  },
  { immediate: true }
);
const sortProducts = (type: "price" | "name", order: "asc" | "desc") => {
  products.value.sort((a: any, b: any) => {
    if (type === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    } else {
      return order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });
  showDropdown.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-move {
  transition: transform 0.3s ease;
}
</style>
