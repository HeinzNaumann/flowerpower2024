import { useCookie } from "#imports";

const token = useCookie("auth_token"); // Puedes usar una cookie para guardar el JWT si quieres más seguridad
const user = useCookie("user_name"); // Puedes usar una cookie para guardar el nombre de usuario

// Esto lo usas para actualizar el estado de autenticación.
const setAuth = (authToken: string, userName: string) => {
  token.value = authToken;
  user.value = userName;
};

// Esto verifica si el usuario está autenticado basándose en la existencia del token.
const isAuthenticated = () => !!token.value;

// Esto podría ser una llamada al backend para obtener más información del usuario autenticado.
const fetchUserInfo = async () => {
  if (isAuthenticated()) {
    // Ejemplo: Llamar a un endpoint para obtener más detalles del usuario
    // const data = await $fetch('/api/me', { headers: { Authorization: `Bearer ${token.value}` } })
    // userEmail.value = data.email
  }
};

const logout = () => {
  token.value = null;
  user.value = null;
};

export function useAuth() {
  return {
    token,
    userName: user,
    setAuth,
    isAuthenticated,
    fetchUserInfo,
    logout,
  };
}
