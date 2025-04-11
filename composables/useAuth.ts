import { useCookie } from "#imports";

const token = useCookie("auth_token"); // Puedes usar una cookie para guardar el JWT si quieres más seguridad
const userEmail = useCookie("email");

// Esto lo usas para actualizar el estado de autenticación.
const setAuth = (authToken: string, email: string) => {
  token.value = authToken;
  userEmail.value = email;
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
  userEmail.value = null;
};

export function useAuth() {
  return {
    token,
    userEmail,
    setAuth,
    isAuthenticated,
    fetchUserInfo,
    logout,
  };
}
