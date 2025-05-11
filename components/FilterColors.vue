<template>
  <div>
    <h3 class="font-bold text-lg">{{ title }}</h3>
    <div class="flex flex-wrap mt-2 gap-2">
      <button
        v-for="color in mappedColors"
        :key="color.class"
        @click="toggleColor(color.name.toLowerCase().replace(/\s+/g, ''))" 
        :title="capitalize(color.name)"
        :class="[
          color.class,
          'inline-block',
          'w-6',
          'h-6',
          'rounded-full',
          'cursor-pointer',
          'transition-all duration-200',
          'relative',
          isActiveFilter('colors', color.name.toLowerCase().replace(/\s+/g, '')) ? 'ring-2 ring-offset-2 ring-black' : ''
        ]"
        aria-label="Filtrar por color"
      >
        <!-- Indicador visual para filtro activo -->
        <span v-if="isActiveFilter('colors', color.name.toLowerCase().replace(/\s+/g, ''))" 
          class="absolute -top-1 -right-1 w-3 h-3 bg-white border border-black rounded-full">            
        </span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

// -- IMPORTANTE: si antes usabas defineEmits(["selectColor"]),
// puede que ya no sea necesario si todo el manejo se hace por ruta.

// Importar el composable de filtros
const { activeFilters, applyFilter, clearFilter } = useProductFilters();
const router = useRouter();
const route = useRoute();

// Función para verificar si un color está activo (puede ser múltiple)
function isActiveFilter(filterType: string, value: string): boolean {
  const filterValue = activeFilters.value[filterType as keyof typeof activeFilters.value];
  
  // Si es un array, verificar si el valor está en el array
  if (Array.isArray(filterValue)) {
    return filterValue.includes(value);
  }
  
  // Si es un string, comparar directamente
  return filterValue === value;
}

// Función para alternar (toggle) los colores
function toggleColor(colorValue: string): void {
  // Crear una copia de la consulta actual
  const query = { ...route.query };
  
  // Verificar si el color ya está seleccionado
  if (isActiveFilter('colors', colorValue)) {
    // Si está seleccionado, eliminarlo
    if (Array.isArray(query.colors)) {
      // Si hay múltiples colores
      query.colors = query.colors.filter(c => c !== colorValue);
      
      // Si no quedan colores, eliminar la propiedad colors
      if (query.colors.length === 0) {
        delete query.colors;
      }
    } else {
      // Si solo hay un color y es el mismo, eliminarlo
      delete query.colors;
    }
  } else {
    // Si no está seleccionado, añadirlo
    if (!query.colors) {
      // Si no hay colores, añadir como string
      query.colors = colorValue;
    } else if (Array.isArray(query.colors)) {
      // Si ya hay un array de colores, añadir al array
      query.colors.push(colorValue);
    } else {
      // Si hay un solo color como string, convertir a array
      query.colors = [query.colors as string, colorValue];
    }
  }
  
  // Actualizar la ruta con la nueva consulta
  router.push({ query });
}



// Define las propiedades que recibe el componente
const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
    default: "colors",
  },
});

// Mapeo de colores según el idioma
const colorMapping: Record<string, Record<string, string>> = {
  es: {
    rojo: "bg-red-500",
    rosa: "bg-pink-500",
    blanco: "bg-white border border-neutral-300",
    amarillo: "bg-yellow-500",
    naranja: "bg-orange-500",
    azul: "bg-blue-500",
    negro: "bg-black",
    violeta: "bg-purple-500",
    verde: "bg-green-500",
    gris: "bg-neutral-500",
  },
  en: {
    red: "bg-red-500",
    pink: "bg-pink-500",
    white: "bg-white border border-neutral-300",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    black: "bg-black",
    purple: "bg-purple-500",
    green: "bg-green-500",
    neutral: "bg-neutral-500",
  },
  de: {
    rot: "bg-red-500",
    rosa: "bg-pink-500",
    weiß: "bg-white border border-neutral-300",
    gelb: "bg-yellow-500",
    orange: "bg-orange-500",
    blau: "bg-blue-500",
    schwarz: "bg-black",
    violett: "bg-purple-500",
    grün: "bg-green-500",
    grau: "bg-neutral-500",
  },
};

const { locale, t } = useI18n();

// Computamos los colores mapeados
const mappedColors = computed(() => {
  const currentLang = locale.value || "es";
  const mapping = colorMapping[currentLang] || {};

  const classMap = new Map<string, string>();

  props.colors.forEach((color) => {
    const normalizedColor = color.toLowerCase();
    const className = mapping[normalizedColor] || "bg-neutral-300";

    // Solo agregamos si la clase no es la por defecto
    // y si no está ya en el mapa
    if (className !== "bg-neutral-300" && !classMap.has(className)) {
      classMap.set(className, normalizedColor);
    }
  });

  // Devolvemos un array con objeto { name, class } por cada color
  return Array.from(classMap.entries()).map(([className, colorName]) => ({
    name: colorName,
    class: className,
  }));
});

// Función para capitalizar
const capitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
