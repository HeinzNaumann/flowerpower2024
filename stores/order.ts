// stores/order.ts
import { defineStore } from "pinia";
import type { Address } from "~/types/types";
import { useCartStore } from "~/stores/cart";
import { useAuth } from "~/composables/useAuth";
import { useRuntimeConfig } from "#app";

interface CreateOrderMeta {
  deliveryDate: string;
  deliveryTime: string;
  cardNote?: string;
}

interface OrderState {
  id: string | null;
  clientSecret: string | null;
  status: "draft" | "pending" | "paid" | "failed";
  userId: string | null;
  userType: "registered" | "guest";
  userEmail: string | null;
}

export const useOrderStore = defineStore("order", {
  state: (): OrderState => ({
    id: null,
    clientSecret: null,
    status: "draft",
    userId: null,
    userType: "guest",
    userEmail: null,
  }),

  actions: {
    /**
     * Crea la orden + PaymentIntent y guarda el clientSecret
     * @param shipping Dirección de envío
     * @param billing Dirección de facturación (o null)
     * @param meta  Datos adicionales de entrega
     */
    async createOrder(
      shipping: Address,
      billing: Address | null,
      meta: CreateOrderMeta
    ) {
      console.log('Datos recibidos en createOrder:');
      console.log('Dirección de envío:', shipping);
      console.log('Dirección de facturación:', billing);
      console.log('Meta:', meta);
      
      const cart = useCartStore();
      const auth = useAuth();
      const { token, userInfo } = auth;
      
      // Determinar si el usuario está registrado o es invitado
      const isRegistered = auth.isAuthenticated();
      const userType = isRegistered ? "registered" : "guest";
      console.log('Usuario registrado:', isRegistered);
      console.log('Datos del usuario registrado:', userInfo.value);
      
      // Verificar si la dirección de envío contiene información del usuario
      console.log('Información del usuario en la dirección de envío:');
      console.log('shipping.name:', shipping.name);
      console.log('shipping.surname:', shipping.surname);
      console.log('shipping.email:', shipping.email);
      console.log('shipping.phone:', shipping.phone);
      
      // Obtener información del usuario, ya sea del usuario registrado o de la dirección de envío
      let userName = null;
      let userSurname = null;
      let userEmail = null;
      let userPhone = null;
      
      if (isRegistered && userInfo.value) {
        // Usuario registrado - obtener datos del perfil
        userName = userInfo.value.name;
        userSurname = userInfo.value.surname;
        userEmail = userInfo.value.email;
        userPhone = userInfo.value.phone;
        console.log('Usando información del usuario registrado');
      } else {
        // Usuario invitado - obtener datos de la dirección de envío
        userName = shipping.name || null;
        userSurname = shipping.surname || null;
        userEmail = shipping.email || null;
        userPhone = shipping.phone || null;
        console.log('Usando información del usuario de la dirección de envío');
      }
      
      console.log('Información del usuario final:');
      console.log('userName:', userName);
      console.log('userSurname:', userSurname);
      console.log('userEmail:', userEmail);
      console.log('userPhone:', userPhone);
      
      // El backend debe proporcionar un ID de usuario en la respuesta de perfil
      // Si no existe, usamos null para usuarios invitados
      const userId = isRegistered && userInfo.value ? (userInfo.value as any).id || null : null;
      
      // Actualizar el estado del store con la información del usuario
      this.userType = userType;
      this.userEmail = userEmail;
      this.userId = userId;

      // Preparar el payload según el formato que espera el backend
      const payload = {
        items: cart.items, // tu lista de productos
        shipping, // dirección de envío
        billing, // facturación (o null)
        deliveryDate: meta.deliveryDate,
        deliveryTime: meta.deliveryTime,
        cardNote: meta.cardNote || "",
        // Información del usuario para el backend según el UserInfoDto
        userInfo: {
          name: userName,
          surname: userSurname,
          email: userEmail,
          phone: userPhone
        }
      };
      
      console.log('Payload de la orden:', payload);

      // Obtener la configuración de runtime de Nuxt
      const config = useRuntimeConfig();
      
      // Definir la interfaz para la respuesta del servidor
      interface OrderResponse {
        id: string;
        status: string;
        total: number;
        [key: string]: any; // Para otros campos que pueda tener la respuesta
      }
      
      // Realizar la petición al servidor
      const response = await $fetch<OrderResponse>(`${config.public.apiBaseUrl}/orders`, {
        method: "POST",
        headers: isRegistered ? { Authorization: `Bearer ${token.value}` } : {},
        body: payload,
      });
      
      console.log('Respuesta del servidor:', response);
      
      // Extraer el ID de la respuesta
      const id = response.id;
      
      // Generar un clientSecret simulado para desarrollo
      // En producción, esto debería venir del backend
      const clientSecret = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
      
      this.id = id;
      this.clientSecret = clientSecret;
      this.status = "pending";
      
      console.log('Orden creada con ID:', id, 'y clientSecret:', clientSecret);
    },

    /** Marcar la orden como pagada */
    markPaid() {
      this.status = "paid";
    },
  },

  persist: true,
});
