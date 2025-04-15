// composables/useAuth.ts
export function useAuth() {
  const token = useCookie("auth_token");
  const user = useCookie("user_name");

  const setAuth = (authToken: string, userName: string) => {
    token.value = authToken;
    user.value = userName;
  };

  const isAuthenticated = () => !!token.value;

  const fetchUserInfo = async () => {
    if (isAuthenticated()) {
      // aquí podrías hacer llamadas al backend
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  return {
    token,
    userName: user,
    setAuth,
    isAuthenticated,
    fetchUserInfo,
    logout,
  };
}
