import { ref } from "vue";
import type { Address } from "~/types/types";

export function useAuth() {
  const token = useCookie("auth_token");
  const user = useCookie("user_name");

  // Incluimos orders en la info de usuario si tu /auth/profile las devuelve
  const userInfo = ref<{
    name: string;
    surname: string;
    email: string;
    phone: string;
    orders?: any[];
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
      const resp = await $fetch<{
        name: string;
        surname: string;
        email: string;
        phone: string;
        orders?: any[];
      }>(`${apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      userInfo.value = resp;
      user.value = resp.name;
    } catch (err) {
      console.error("Error fetching user info:", err);
      logout();
    }
  };

  const updateUserProfile = async (data: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
  }) => {
    if (!isAuthenticated()) return;
    try {
      const resp = await $fetch<Partial<typeof data>>(`${apiUrl}/auth/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (resp.name) user.value = resp.name;
      if (userInfo.value) userInfo.value = { ...userInfo.value, ...resp };
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // lee todas y filtra por type
  const getAddress = async (
    type: "billing" | "shipping"
  ): Promise<Address | null> => {
    if (!isAuthenticated()) return null;
    try {
      const list = await $fetch<Address[]>(`${apiUrl}/addresses`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return list.find((a) => a.type === type) || null;
    } catch (err) {
      console.error("Error fetching addresses:", err);
      return null;
    }
  };

  const createAddress = async (addr: Omit<Address, "id">) => {
    if (!isAuthenticated()) return null;
    try {
      return await $fetch<Address>(`${apiUrl}/addresses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
        body: addr,
      });
    } catch (err) {
      console.error("Error creating address:", err);
      return null;
    }
  };

  const updateAddress = async (addr: Address) => {
    if (!isAuthenticated()) return null;
    try {
      const body: Record<string, any> = {
        street: addr.street,
        city: addr.city,
        postalCode: addr.postalCode,
        country: addr.country,
        type: addr.type,
      };

      if (addr.name) body.name = addr.name;
      if (addr.surname) body.surname = addr.surname;
      if (addr.email) body.email = addr.email;
      if (addr.phone) body.phone = addr.phone;
      if (addr.deliveryPhone) body.deliveryPhone = addr.deliveryPhone;
      if (addr.deliveryRecipientName) body.deliveryRecipientName = addr.deliveryRecipientName;
      if (addr.deliveryRecipientSurname) body.deliveryRecipientSurname = addr.deliveryRecipientSurname;
      if (typeof addr.isDefault === "boolean") body.isDefault = addr.isDefault;

      return await $fetch<Address>(`${apiUrl}/addresses/${addr.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
        body,
      });
    } catch (err) {
      console.error("Error updating address:", err);
      return null;
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
    updateUserProfile,
    getAddress,
    createAddress,
    updateAddress,
    logout,
  };
}
