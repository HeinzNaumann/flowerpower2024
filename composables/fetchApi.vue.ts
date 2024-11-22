import { ref, computed, watch, watchEffect } from "vue";

import type { Product } from "~/types/types";

export const useFetchApi = (typeRequest: string) => {
  const data = ref<Product[] | null>(null);
  const error = ref<Error | null>(null);

  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const { locale } = useI18n();
  const route = useRoute();

  const url = computed(() => `${apiUrl}/${typeRequest}`);
  const tags = computed(() => route.query.tags);
  const oldTags = ref(route.query.tags);

  watchEffect(async () => {
    try {
      const response = await $fetch<Product[]>(url.value, {
        method: "GET",
        query: { tags: tags.value, lang: locale.value, limit: 60 },
        headers: {
          "Content-Type": "application/json",
        },
      });
      data.value = response; // Ensure data.value can be null
    } catch (err) {
      error.value = err as Error;
    }
  });

  return { data, error };
};
