import { ref, computed, watchEffect } from "vue";
import type { Product } from "~/types/types";

export const useFetchApi = (typeRequest: string) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const { locale } = useI18n();
  const route = useRoute();
  const productsStore = useProductsStore();
  
  // Datos reactivos
  const data = ref<Product[] | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref<boolean>(true);
  
  // Construye dinámicamente la query basada en los filtros disponibles
  const queryParams = computed(() => {
    const {
      tags,
      occasions,
      moments,
      flowers,
      colors,
      limit = 60,
    } = route.query;

    // Retorna un objeto con los filtros presentes
    return {
      tags: tags || undefined,
      occasions: occasions || undefined,
      moments: moments || undefined,
      flowers: flowers || undefined,
      lang: locale.value,
      limit: Number(limit), // Asegúrate de que sea un número
      colors: colors || undefined,
    };
  });

  // Construir URL base y clave de caché
  const url = computed(() => `${apiUrl}/${typeRequest}`);
  const cacheKey = computed(() => `${typeRequest}-${locale.value}-${JSON.stringify(queryParams.value)}`);
  
  // Cargar datos con caché
  watchEffect(async () => {
    pending.value = true;
    
    try {
      // Intentar obtener datos de la caché
      const cachedData = productsStore.getCachedProducts(cacheKey.value);
      
      if (cachedData) {
        // Usar datos de la caché
        data.value = cachedData;
        pending.value = false;
      } else {
        // Obtener datos frescos de la API
        const response = await $fetch<Product[]>(url.value, {
          method: "GET",
          query: queryParams.value,
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        // Guardar en caché
        productsStore.cacheProducts(cacheKey.value, response);
        data.value = response;
        
        // Pequeño retraso para evitar parpadeos en la interfaz
        setTimeout(() => {
          pending.value = false;
        }, 300);
      }
    } catch (err) {
      error.value = err as Error;
      pending.value = false;
    }
  });

  return { data, error, pending }
};
export const useFetchSlider = async (typeRequest: string) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const { locale } = useI18n();
  const route = useRoute();
  const productsStore = useProductsStore();
  
  // Datos reactivos
  const data = ref<Product[] | null>(null);
  const error = ref<Error | null>(null);
  
  // Construir la URL y clave única para el caché
  const url = `${apiUrl}/${typeRequest}`;
  const cacheKey = `slider-${typeRequest}-${locale.value}-${route.query.tags || 'all'}`;
  
  try {
    // Intentar obtener datos de la caché
    const cachedData = productsStore.getCachedProducts(cacheKey);
    
    if (cachedData) {
      // Usar datos de la caché
      data.value = cachedData;
    } else {
      // Obtener datos frescos de la API
      const response = await $fetch<Product[]>(url, {
        method: "GET",
        query: {
          tags: route.query.tags,
          lang: locale.value,
          limit: 60,
        },
      });
      
      // Guardar en caché
      productsStore.cacheProducts(cacheKey, response);
      data.value = response;
    }
  } catch (err) {
    error.value = err as Error;
  }
  
  return { data, error }
};
