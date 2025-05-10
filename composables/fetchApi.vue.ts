import { ref, computed, watchEffect } from "vue";

import type { Product } from "~/types/types";

export const useFetchApi = (typeRequest: string) => {
  const data = ref<Product[] | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref<boolean>(true);

  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const { locale } = useI18n();
  const route = useRoute();

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

  // Construir URL base
  const url = computed(() => `${apiUrl}/${typeRequest}`);

  // Hacer la llamada al API
  watchEffect(async () => {
    pending.value = true;
    try {
      const response = await $fetch<Product[]>(url.value, {
        method: "GET",
        query: queryParams.value, // Pasa los parámetros dinámicos aquí
        headers: {
          "Content-Type": "application/json",
        },
      });
      data.value = response;
      // Pequeño retraso para evitar parpadeos en la interfaz
      setTimeout(() => {
        pending.value = false;
      }, 300);
    } catch (err) {
      error.value = err as Error;
      pending.value = false;
    }
  });

  return { data, error, pending };
};
export const useFetchSlider = async (typeRequest: string) => {
  const data = ref<Product[] | null>(null);
  const error = ref<Error | null>(null);

  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const { locale } = useI18n();
  const route = useRoute();

  try {
    data.value = await $fetch<Product[]>(`${apiUrl}/${typeRequest}`, {
      method: "GET",
      query: {
        tags: route.query.tags,
        lang: locale.value,
        limit: 60,
      },
    });
  } catch (err) {
    error.value = err as Error;
  }

  return { data, error };
};
