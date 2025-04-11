export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("auth_token"); // leerá del SSR o del cliente automáticamente

  if (!token.value) {
    return navigateTo("/", { replace: true });
  }
});
