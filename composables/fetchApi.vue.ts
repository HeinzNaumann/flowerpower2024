export const useFetchApi = (typeRequest: string) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;
  const { data, error } = useFetch(`${apiUrl}/${typeRequest}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(data.value);

  if (error.value) {
    console.error("Fetch error:", error.value);
  }

  return { data, error };
};
