<template>
  <div>
    <h3 class="font-bold text-lg">{{ title }}</h3>
    <ul class="space-y-2 mt-2">
      <!-- Recorremos 'categories' que ahora es CategoryItem[] -->
      <li v-for="category in categories" :key="category.name" class="py-1">
        <button 
          @click="applyFilter(currentCategory, category.name.toLowerCase().replace(/\s+/g, ''))"
          class="text-left w-full hover:text-neutral-800 transition-colors"
          :class="{
            'font-semibold': isActiveFilter(currentCategory, category.name.toLowerCase().replace(/\s+/g, ''))
          }"
        >
          <span>{{ category.name }}</span>
          <span class="text-neutral-400 ml-1">({{ category.count }})</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import type { Product } from '~/types/types';

// Importar el composable de filtros
const { activeFilters, applyFilter } = useProductFilters();

// Obtener los productos del store o del contexto
const { data: products } = useFetchApi("products");

type CategoryItem = { name: string; count: number };
type CategoryType = "flowers" | "moments" | "occasions" | "tags";

const props = defineProps<{
  title: string;
  typeData: Record<CategoryType, CategoryItem[]>;
}>();

const title = ref<string>("");
const categories = ref<CategoryItem[]>([]);
const currentCategory = ref<CategoryType>("flowers"); // Categoría actual (flowers, moments, occasions)

// Función para verificar si un filtro está activo
function isActiveFilter(filterType: CategoryType, value: string): boolean {
  return activeFilters.value[filterType] === value;
}

watch(
  () => props.typeData,
  () => {
    updateCategories();
  },
  { deep: true, immediate: true }
);

watch(
  () => props.title,
  () => {
    updateCategories();
  },
  { immediate: true }
);

function updateCategories() {
  title.value = props.title;

  // Determinar la categoría basada en el título en diferentes idiomas
  if (
    props.title === "Flores" ||
    props.title === "Flowers" ||
    props.title === "Blumen"
  ) {
    categories.value = props.typeData.flowers || [];
    currentCategory.value = "flowers";
  } else if (
    props.title === "Momentos" ||
    props.title === "Moments" ||
    props.title === "Momente"
  ) {
    categories.value = props.typeData.moments || [];
    currentCategory.value = "moments";
  } else if (
    props.title === "Etiquetas" ||
    props.title === "Tags" ||
    props.title === "Stichworte"
  ) {
    // Usar las etiquetas de los productos para el filtro de tags
    const allTags = new Set<string>();
    
    // Recopilar todas las etiquetas únicas de los productos
    if (products.value) {
      (products.value as Product[]).forEach((product: Product) => {
        if (product.tags && Array.isArray(product.tags)) {
          product.tags.forEach((tag: string) => allTags.add(tag));
        }
      });
      
      // Convertir a array de CategoryItem
      categories.value = Array.from(allTags).map(tag => ({
        name: tag,
        count: (products.value as Product[]).filter((p: Product) => 
          p.tags?.includes(tag)
        ).length || 0
      }));
    }
    
    currentCategory.value = "tags";
  } else {
    categories.value = props.typeData.occasions || [];
    currentCategory.value = "occasions";
  }
  
  // Ordenar categorías por conteo (mayor a menor) y luego por nombre
  categories.value.sort((a, b) => {
    // Primero intentar ordenar por conteo (descendente)
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    // Si el conteo es igual, ordenar por nombre (ascendente)
    return a.name.localeCompare(b.name);
  });
}
</script>

<style scoped>
/* Agrega tus estilos si es necesario */
</style>
