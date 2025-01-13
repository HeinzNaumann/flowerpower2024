<template>
  <div class="container mx-auto p-4">
    <!-- Sort Dropdown -->
    <div class="flex justify-end mb-4">
      <div class="relative">
        <button
          @click="showDropdown = !showDropdown"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-md"
        >
          Sort by
        </button>
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10"
        >
          <button
            @click="sortProducts('price', 'asc')"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Price: Low to High
          </button>
          <button
            @click="sortProducts('price', 'desc')"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Price: High to Low
          </button>
          <button
            @click="sortProducts('name', 'asc')"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Name: A to Z
          </button>
          <button
            @click="sortProducts('name', 'desc')"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
        <div>
          <h3 class="font-bold text-lg">Flores</h3>
          <ul class="space-y-2 mt-2">
            <li><a href="#" class="hover:underline">Rosas (3)</a></li>
            <li><a href="#" class="hover:underline">Margaritas (2)</a></li>
            <li><a href="#" class="hover:underline">Claveles (5)</a></li>
            <li><a href="#" class="hover:underline">Gerberas (6)</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg">Colores</h3>
          <div class="flex flex-wrap mt-2 gap-2">
            <span class="w-6 h-6 bg-red-500 rounded-full"></span>
            <span class="w-6 h-6 bg-orange-500 rounded-full"></span>
            <span class="w-6 h-6 bg-yellow-500 rounded-full"></span>
            <span class="w-6 h-6 bg-blue-500 rounded-full"></span>
            <span class="w-6 h-6 bg-black rounded-full"></span>
            <span class="w-6 h-6 bg-pink-500 rounded-full"></span>
            <span class="w-6 h-6 bg-purple-500 rounded-full"></span>
            <span
              class="w-6 h-6 bg-white border border-gray-300 rounded-full"
            ></span>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-lg">Momentos</h3>
          <ul class="space-y-2 mt-2">
            <li><a href="#" class="hover:underline">Buenos días (4)</a></li>
            <li><a href="#" class="hover:underline">Cumpleaños (7)</a></li>
            <li><a href="#" class="hover:underline">Aniversario (9)</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg">Ocasiones</h3>
          <ul class="space-y-2 mt-2">
            <li><a href="#" class="hover:underline">Buenos días (4)</a></li>
            <li><a href="#" class="hover:underline">Cumpleaños (7)</a></li>
            <li><a href="#" class="hover:underline">Aniversario (9)</a></li>
          </ul>
        </div>
      </aside>

      <!-- Grid de productos -->
      <main class="w-full md:w-3/4 md:pl-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(product, id) in products" :key="id">
            <div
              class="flex flex-col w-full h-full bg-white justify-center p-2"
            >
              <img
                :src="`https://flowerpower.es/api/files/product/${product.images}`"
                :alt="product.slug"
                class="h-100 w-100 object-cover border-grey-500 border-1 border-solid border mb-3"
              />
              <p :alt="product.title" class="text-sm lg:text-base font-medium">
                {{ product.title }}
              </p>

              <p class="text-sm lg:text-base font-extralight">
                {{ product.shortDescription }}
              </p>
              <p class="text-sm lg:text-base font-extralight">
                {{ product.price }} €
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/types";

const route = useRoute();
const showDropdown = ref(false);

const { data, error } = useFetchApi("products");

const products = computed<Product[]>(() => data.value || []);

const errorMessage = computed(() =>
  error.value ? error.value || "Error desconocido" : null
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

<style scoped></style>
