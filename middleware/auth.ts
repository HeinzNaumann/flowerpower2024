declare const process: any;

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("auth_token");
  const user = useCookie("user_name");
  const userName = user.value || "";

  if (!token.value || !userName) {
    return navigateTo("/", { replace: true });
  }

  // Solo redirigir si estamos en cliente y la URL es incorrecta
  if (process.client) {
    const correctPath = `/userPanel/${userName}`;
    if (to.fullPath !== correctPath) {
      window.location.replace(correctPath);
    }
  }
});
