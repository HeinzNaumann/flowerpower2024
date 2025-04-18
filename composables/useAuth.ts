import { ref } from "vue";

export function useAuth() {
  const token = useCookie("auth_token");
  const user = useCookie("user_name");

  const userInfo = ref<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBaseUrl;

  const setAuth = (authToken: string, userName: string) => {
    token.value = authToken;
    user.value = userName;
  };

  const isAuthenticated = () => !!token.value;

  const fetchUserInfo = async () => {
    if (!isAuthenticated()) return;

    try {
      const response = await $fetch<{
        name: string;
        surname: string;
        email: string;
        phone: string;
      }>(`${apiUrl}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      userInfo.value = response;
      user.value = response.name; // actualizamos la cookie también
    } catch (err) {
      console.error("Error fetching user info:", err);
      logout(); // limpias si falla
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    userInfo.value = null;
  };

  return {
    token,
    userName: user,
    userInfo,
    setAuth,
    isAuthenticated,
    fetchUserInfo,
    logout,
  };
}
