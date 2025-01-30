<template>
  <div>
    <h3 class="font-bold text-lg">{{ title }}</h3>
    <ul class="space-y-2 mt-2">
      <!-- Recorremos 'categories' que ahora es CategoryItem[] -->
      <li v-for="category in categories" :key="category.name">
        <NuxtLink
          :to="
            localePath({
              name: 'shop',
              query: {
                tags: route.query.tags,
                [currentCategory]: $t(
                  `filters.${category.name.toLowerCase().replace(/\s+/g, '')}`
                ),
              },
            })
          "
        >
          {{ category.name }} ({{ category.count }})
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const localePath = useLocalePath();
const route = useRoute(); // Usamos route para acceder a los parámetros de la URL

type CategoryItem = { name: string; count: number };

const props = defineProps<{
  title: string;
  typeData: Record<"flowers" | "moments" | "occasions", CategoryItem[]>;
}>();

const title = ref<string>("");
const categories = ref<CategoryItem[]>([]);
const currentCategory = ref<string>(""); // Para manejar la clave dinámica del query

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

  if (
    props.title === "Flores" ||
    props.title === "Flowers" ||
    props.title === "Blumen"
  ) {
    categories.value = props.typeData.flowers || [];
    currentCategory.value = "flowers"; // Clave para la categoría
  } else if (
    props.title === "Momentos" ||
    props.title === "Moments" ||
    props.title === "Momente"
  ) {
    categories.value = props.typeData.moments || [];
    currentCategory.value = "moments"; // Clave para la categoría
  } else {
    categories.value = props.typeData.occasions || [];
    currentCategory.value = "occasions"; // Clave para la categoría
  }
}
</script>

<style scoped>
/* Agrega tus estilos si es necesario */
</style>
