<template>
  <div>
    <h3 class="font-bold text-lg">{{ title }}</h3>
    <ul class="space-y-2 mt-2">
      <!-- Recorremos 'categories' que ahora es CategoryItem[] -->
      <li v-for="category in categories" :key="category.name">
        <a href="#" class="hover:underline">
          {{ category.name }} ({{ category.count }})
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

type CategoryItem = { name: string; count: number };

const props = defineProps<{
  title: string;
  typeData: Record<"flowers" | "moments" | "occasions", CategoryItem[]>;
}>();

const title = ref<string>("");
const categories = ref<CategoryItem[]>([]);
const length = ref<number>(0);

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
    length.value = categories.value.length;
  } else if (
    props.title === "Momentos" ||
    props.title === "Moments" ||
    props.title === "Momente"
  ) {
    categories.value = props.typeData.moments || [];
    length.value = categories.value.length;
  } else {
    categories.value = props.typeData.occasions || [];
    length.value = categories.value.length;
  }
}
</script>

<style scoped>
/* Agrega tus estilos si es necesario */
</style>
