<template>
  <div class="container max-w-screen-xl mx-auto px-4 py-8">
    <div class="flex flex-row md:flex-row justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">{{ $t('common.shop') || 'Tienda' }}</h1>
      
      <!-- Sort Dropdown (a la derecha) -->
      <div class="relative">
        <button
          @click="showDropdown = !showDropdown"
          class="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-sm shadow-md"
        >
          {{ $t('shop.sort') || 'Ordenar por' }}
        </button>
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-sm shadow-md z-10"
        >
          <button
            @click="sortProducts('price', 'asc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            {{ $t('shop.priceLowToHigh') || 'Precio: De menor a mayor' }}
          </button>
          <button
            @click="sortProducts('price', 'desc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            {{ $t('shop.priceHighToLow') || 'Precio: De mayor a menor' }}
          </button>
          <button
            @click="sortProducts('name', 'asc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            {{ $t('shop.nameAToZ') || 'Nombre: A-Z' }}
          </button>
          <button
            @click="sortProducts('name', 'desc')"
            class="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
          >
            {{ $t('shop.nameZToA') || 'Nombre: Z-A' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Contenedor del grid de filtros y productos con márgenes estables -->
    <div class="flex flex-col md:flex-row">
      
      <!-- Columna de filtros con altura mínima fija para evitar saltos -->
      <aside class="w-full md:w-1/4 md:pr-4 mb-2 md:mb-0">
        <div class="sticky top-12 md:top-24 min-h-[200px] md:min-h-[600px] overflow-visible">
          <!-- Categorías de filtros con espacio mínimo fijo -->
          <div>
  <!-- Mobile/Tablet: filtros colapsables -->
  <div class="block md:hidden space-y-2 pb-0">
    <client-only>
      <details class="border rounded-md">
        <summary class="cursor-pointer font-bold px-3 py-2 select-none bg-neutral-50 border-b">{{$t('shop.filtersTitle.flowers')}}</summary>
        <div class="p-3">
          <LazyFilters :typeData="typeData" :title="$t('shop.filtersTitle.flowers')" />
        </div>
      </details>
      <details class="border rounded-md">
        <summary class="cursor-pointer font-bold px-3 py-2 select-none bg-neutral-50 border-b">{{$t('shop.filtersTitle.colors')}}</summary>
        <div class="p-3">
          <LazyFilterColors :colors="availableColors" :title="$t('shop.filtersTitle.colors')" />
        </div>
      </details>
      <details class="border rounded-md">
        <summary class="cursor-pointer font-bold px-3 py-2 select-none bg-neutral-50 border-b">{{$t('shop.filtersTitle.moments')}}</summary>
        <div class="p-3">
          <LazyFilters :typeData="typeData" :title="$t('shop.filtersTitle.moments')" />
        </div>
      </details>
      <details class="border rounded-md">
        <summary class="cursor-pointer font-bold px-3 py-2 select-none bg-neutral-50 border-b">{{$t('shop.filtersTitle.occasions')}}</summary>
        <div class="p-3">
          <LazyFilters :typeData="typeData" :title="$t('shop.filtersTitle.occasions')" />
        </div>
      </details>
    </client-only>
  </div>
  <!-- Desktop: filtros siempre expandidos -->
  <div class="hidden md:block space-y-4 pb-4">
    <client-only>
      <LazyFilters :typeData="typeData" :title="$t('shop.filtersTitle.flowers')" />
      <LazyFilterColors :colors="availableColors" :title="$t('shop.filtersTitle.colors')" />
      <LazyFilters :typeData="typeData" :title="$t('shop.filtersTitle.moments')" />
      <LazyFilters :typeData="typeData" :title="$t('shop.filtersTitle.occasions')" />
    </client-only>
  </div>
</div>
        </div>
      </aside>

      <!-- Grid de productos con altura mínima para estabilidad -->
      <main class="w-full md:w-3/4 md:pl-4 min-h-[800px]">
        <!-- Panel de filtros activos -->        
        <div v-if="hasActiveFilters" class="mb-4 p-3 bg-neutral-100 rounded-md">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-medium">{{ $t('shop.activeFilters') || 'Filtros activos' }}</h2>
            <button 
              @click="clearAllFilters" 
              class="text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
              aria-label="Clear all filters"
            >
              {{ $t('shop.clearAllFilters') || 'Borrar todos' }}              
            </button>
          </div>
          
          <!-- Filtro de búsqueda -->  
          <div v-if="activeFilters.search" class="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm mr-2 mb-2">
            <span class="mr-2">{{ $t('shop.search') || 'Búsqueda' }}: "{{ activeFilters.search }}"</span>
            <button @click="clearFilter('search')" class="text-neutral-400 hover:text-neutral-900">&times;</button>
          </div>
          
          <!-- Filtros de categorías (excepto colores) -->  
          <template v-for="filterType in filterTypes.filter(type => type !== 'colors')" :key="filterType">
            <div v-if="activeFilters[filterType]" class="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm mr-2 mb-2">
              <span class="mr-2">{{ $t(`shop.${filterType}`) || filterType }}: {{ activeFilters[filterType] }}</span>
              <button @click="clearFilter(filterType)" class="text-neutral-400 hover:text-neutral-900">&times;</button>
            </div>
          </template>
          
          <!-- Filtros de colores (chips individuales) -->
          <template v-if="activeFilters.colors">
            <!-- Si hay múltiples colores (array) -->
            <template v-if="Array.isArray(activeFilters.colors)">
              <div 
                v-for="(color, index) in activeFilters.colors" 
                :key="`color-${index}`"
                class="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                <span class="mr-2">{{ $t('shop.colors') || 'Colores' }}: {{ color }}</span>
                <button 
                  @click="toggleColorFilter(color as string)" 
                  class="text-neutral-400 hover:text-neutral-900"
                  aria-label="Eliminar filtro de color"
                >&times;</button>
              </div>
            </template>
            <!-- Si hay un solo color (string) -->
            <div v-else class="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm mr-2 mb-2">
              <span class="mr-2">{{ $t('shop.colors') || 'Colores' }}: {{ activeFilters.colors }}</span>
              <button 
                @click="toggleColorFilter(activeFilters.colors as string)" 
                class="text-neutral-400 hover:text-neutral-900"
                aria-label="Eliminar filtro de color"
              >&times;</button>
            </div>
          </template>
        </div>

        <!-- Mostrar shimmer effect para productos durante la carga -->
        <client-only>
          <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 9" :key="i" class="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
              <!-- Shimmer para imagen -->
              <div class="bg-gray-200 h-64 w-full"></div>
              
              <!-- Shimmer para título y precio -->
              <div class="p-4 space-y-3">
                <div class="h-5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                
                <!-- Shimmer para botón -->
                <div class="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
              </div>
            </div>
          </div>
          
          <!-- Mostrar mensaje de error si hay un problema -->
          <div v-else-if="error" class="text-red-500 text-center py-12">
            {{ $t('shop.errorLoading') || 'Error cargando productos' }}
          </div>
          
          <!-- Mostrar mensaje cuando no hay resultados -->
          <div v-else-if="products.length === 0 && hasActiveFilters" class="w-full py-10 px-5 text-center bg-neutral-50 rounded-md">
            <div class="text-3xl mb-3">⚠️</div>
            <h3 class="text-lg font-medium mb-2">{{ $t('shop.noResults') }}</h3>
            <p class="text-neutral-600 mb-4">{{ $t('shop.clearFilters') }}</p>
            <button 
              @click="clearAllFilters" 
              class="px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
            >
              {{ $t('shop.clearAllFilters') }}
            </button>
          </div>

          <!-- Mostrar productos cuando están disponibles -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
          >
            <div v-for="(product, id) in products" :key="id">
              <NuxtLink
                :to="
                  localePath({ path: '/product', query: { slug: product.slug } })
                "
                class="flex flex-col w-full h-full bg-white justify-center p-2 hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  :src="`${config.public.apiBaseUrl}/files/product/${product.images}`"
                  :alt="product.slug"
                  class="w-full object-cover border-neutral-200 border-solid border mb-3"
                  loading="lazy"
                />
                <p 
                  :alt="product.title" 
                  class="text-sm lg:text-base font-medium text-pri"
                >
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
        </client-only>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import type { Product } from "~/types/types";
const localePath = useLocalePath();

// Definir metadatos de la página, incluyendo la transición
definePageMeta({
  pageTransition: {
    name: 'fade-slide',
    mode: 'out-in'
  }
});

const route = useRoute();
const router = useRouter();
const showDropdown = ref(false);
const { data, error, pending } = useFetchApi("products");
const config = useRuntimeConfig();

const categories = ["flowers", "moments", "occasions"] as const;
type Category = (typeof categories)[number];

type CategoryItem = { name: string; count: number };

const typeData = ref<Record<Category, CategoryItem[]>>({
  flowers: [],
  moments: [],
  occasions: [],
});

// Usar el composable de filtros centralizado
const { activeFilters, hasActiveFilters, applyFilters, clearFilter, clearAllFilters, applyFilter } = useProductFilters();

// Definir los tipos de filtros disponibles
const filterTypes = ['search', 'flowers', 'moments', 'occasions', 'colors', 'tags'] as const;
type FilterType = typeof filterTypes[number];


// Estado de ordenación
const sortState = ref<{ type: 'price' | 'name' | null; order: 'asc' | 'desc' }>({ 
  type: null, 
  order: 'asc' 
});

// Productos sin filtrar
const allProducts = computed<Product[]>(() => data.value || []);

// Productos filtrados aplicando todos los filtros activos y ordenación
const products = computed<Product[]>(() => {
  let filtered = applyFilters(allProducts.value || []);
  
  // Aplicar ordenación si hay un criterio activo
  if (sortState.value.type) {
    const { type, order } = sortState.value;
    return [...filtered].sort((a, b) => {
      if (type === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        return order === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });
  }
  
  return filtered;
});

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


// Función para manejar la eliminación de chips de colores
const toggleColorFilter = (colorValue: string) => {
  // Usar el método centralizado en lugar de manipular directamente
  // Es más seguro y evita problemas de sincronización
  nextTick(() => {
    clearFilter('colors');
  });
};

const sortProducts = (type: "price" | "name", order: "asc" | "desc") => {
  // Actualizar el estado de ordenación
  sortState.value = { type, order };
  showDropdown.value = false;
};
</script>

<style scoped></style>
