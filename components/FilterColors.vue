<!-- src/components/AvailableColors.vue -->
<template>
  <div>
    <h3 class="font-bold text-lg">Colores</h3>
    <div class="flex flex-wrap mt-2 gap-2">
      <span
        v-for="color in mappedColors"
        :key="color.class"
        :class="[color.class]"
        class="w-6 h-6 rounded-full cursor-pointer"
        :title="capitalize(color.name)"
        @click="handleClick(color.name)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineEmits } from "vue";
import { useI18n } from "vue-i18n";

// Emite un evento al seleccionar un color
const emit = defineEmits(["selectColor"]);

// Obtiene el idioma actual directamente
const { locale } = useI18n();

// Define las propiedades que recibe el componente
const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
    default: () => [],
  },
});

const colorMapping: Record<string, Record<string, string>> = {
  es: {
    rojo: "bg-red-500",
    rosa: "bg-pink-500",
    blanco: "bg-white border border-gray-300",
    amarillo: "bg-yellow-500",
    naranja: "bg-orange-500",
    azul: "bg-blue-500",
    negro: "bg-black",
    violeta: "bg-purple-500",
    verde: "bg-green-500",
    gris: "bg-gray-500",
  },
  en: {
    red: "bg-red-500",
    pink: "bg-pink-500",
    white: "bg-white border border-gray-300",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    black: "bg-black",
    purple: "bg-purple-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
    // Añade más mapeos según sea necesario
  },
  de: {
    rot: "bg-red-500",
    rosa: "bg-pink-500",
    weiß: "bg-white border border-gray-300",
    gelb: "bg-yellow-500",
    orange: "bg-orange-500",
    blau: "bg-blue-500",
    schwarz: "bg-black",
    violett: "bg-purple-500",
    grün: "bg-green-500",
    grau: "bg-gray-500",
  },
};

const mappedColors = computed(() => {
  const currentLang = locale.value || "es";
  const mapping = colorMapping[currentLang] || {};

  const classMap = new Map<string, string>();

  props.colors.forEach((color) => {
    const normalizedColor = color.toLowerCase();
    const className = mapping[normalizedColor] || "bg-gray-300";

    // Solo agregar si la clase no está ya en el mapa y la clase no es la por defecto
    if (className !== "bg-gray-300" && !classMap.has(className)) {
      classMap.set(className, normalizedColor);
    }
  });

  return Array.from(classMap.entries()).map(([className, colorName]) => ({
    name: colorName,
    class: className,
  }));
});

const capitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleClick = (colorName: string) => {
  emit("selectColor", colorName);
};
</script>

<style scoped>
/* Puedes añadir estilos adicionales si es necesario */
</style>
