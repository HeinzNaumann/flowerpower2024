export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("auth_token");
  const user = useCookie("user_name");

  if (!token.value && !user.value) {
    return navigateTo("/", { replace: true });
  }
});
