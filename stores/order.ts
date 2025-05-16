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
  items: any[]; // Productos en la orden
  shipping: Address | null; // Dirección de envío
  billing: Address | null; // Dirección de facturación
  total: number; // Total de la orden
}

export const useOrderStore = defineStore("order", {
  state: (): OrderState => ({
    id: null,
    clientSecret: null,
    status: "draft",
    userId: null,
    userType: "guest",
    userEmail: null,
    items: [],
    shipping: null,
    billing: null,
    total: 0
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
      meta: CreateOrderMeta & { shippingCost?: number }
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
        shipping: {
          ...shipping,
          // Incluir el costo de envío en la dirección de envío
          shippingCost: meta.shippingCost ?? 0
        },
        billing, // facturación (o null)
        deliveryDate: meta.deliveryDate,
        deliveryTime: meta.deliveryTime,
        cardNote: meta.cardNote || "",
        // Incluir el shippingCost en el nivel superior del payload
        shippingCost: meta.shippingCost ?? 0,
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
        clientSecret?: string; // Puede venir directamente en la respuesta
        items?: any[];
        shipping?: Address;
        billing?: Address | null;
        [key: string]: any; // Para otros campos que pueda tener la respuesta
      }
      
      try {
        // Realizar la petición al servidor
        const response = await $fetch<OrderResponse>(`${config.public.apiBaseUrl}/orders`, {
          method: "POST",
          headers: isRegistered ? { Authorization: `Bearer ${token.value}` } : {},
          body: payload,
        });
        
        console.log('Respuesta del servidor:', response);
        
        // Guardar la respuesta en el estado
        this.id = response.id;
        this.status = (response.status || "pending") as "draft" | "pending" | "paid" | "failed";
        this.total = response.total || cart.totalPrice;
        
        // Obtener el shippingCost de la respuesta del servidor o del meta
        const serverShippingCost = response.shipping?.shippingCost ?? response.shippingCost;
        const finalShippingCost = serverShippingCost !== undefined ? serverShippingCost : (meta.shippingCost ?? 0);
        
        console.log('Costo de envío - Respuesta del servidor:', serverShippingCost);
        console.log('Costo de envío - Meta:', meta.shippingCost);
        console.log('Costo de envío final:', finalShippingCost);
        
        // Guardar los items, direcciones y costo de envío
        this.items = cart.items;
        this.shipping = {
          ...(response.shipping || shipping), // Usar la dirección de envío del servidor si está disponible
          // Asegurarse de que el shippingCost se guarde en el objeto de envío
          shippingCost: finalShippingCost
        };
        this.billing = response.billing || billing;
        
        // Guardar el shippingCost directamente en el estado de la orden
        (this as any).shippingCost = finalShippingCost;
        
        // Si la respuesta ya incluye un clientSecret, guardarlo
        if (response.clientSecret) {
          this.clientSecret = response.clientSecret;
          console.log('ClientSecret recibido directamente en la respuesta de creación de orden');
        } else {
          // Si no, obtener el clientSecret con una llamada separada
          await this.createPaymentIntent();
        }
        
        console.log('Orden creada con ID:', this.id, 'y estado:', this.status);
        
      } catch (error) {
        console.error('Error al crear la orden:', error);
        throw error;
      }
    },

    /**
     * Obtiene un clientSecret de Stripe para procesar el pago
     */
    async createPaymentIntent() {
      if (!this.id) {
        throw new Error('No hay una orden activa para crear un intent de pago');
      }
      
      const config = useRuntimeConfig();
      const auth = useAuth();
      const { token } = auth;
      const isRegistered = auth.isAuthenticated();
      
      try {
        console.log('Solicitando clientSecret para la orden:', this.id);
        
        // Llamar al endpoint de pago con el ID de la orden
        interface PaymentResponse {
          clientSecret: string;
          [key: string]: any;
        }
        
        // Asegurar que el token tiene el formato correcto para la autorización
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        
        // Solo añadir el header de autorización si el usuario está autenticado y el token existe
        if (isRegistered && token.value) {
          headers['Authorization'] = `Bearer ${token.value}`;
          console.log('Enviando token JWT:', `Bearer ${token.value?.substring(0, 15)}...`);
        } else {
          console.log('Usuario no autenticado o token no disponible');
        }
        
        console.log('Headers de la petición:', headers);
        
        const response = await $fetch<PaymentResponse>(`${config.public.apiBaseUrl}/orders/pay`, {
          method: "POST",
          headers,
          body: { orderId: this.id }
        });
        
        console.log('Respuesta del intent de pago:', response);
        
        // Guardar el clientSecret
        if (response.clientSecret) {
          this.clientSecret = response.clientSecret;
          console.log('ClientSecret obtenido:', this.clientSecret);
        } else {
          throw new Error('No se recibió un clientSecret válido del servidor');
        }
        
        return this.clientSecret;
        
      } catch (error) {
        console.error('Error al obtener el intent de pago:', error);
        throw error;
      }
    },
    
    /** 
     * Marcar la orden como pagada y comunicar al backend
     * @param paymentIntentId El ID del PaymentIntent de Stripe (opcional)
     */
    async markPaid(paymentIntentId?: string) {
      if (!this.id) {
        console.error('[Order] No se puede marcar como pagada una orden sin ID');
        throw new Error('No hay una orden activa para marcar como pagada');
      }
      
      this.status = "paid";
      console.log(`[Order] Marcando orden ${this.id} como pagada localmente`);
      
      const config = useRuntimeConfig();
      const auth = useAuth();
      const { token } = auth;
      const isRegistered = auth.isAuthenticated();
      
      try {
        // Preparar los headers
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        
        // Solo añadir el header de autorización si el usuario está autenticado
        if (isRegistered && token.value) {
          headers['Authorization'] = `Bearer ${token.value}`;
        }
        
        // Datos para enviar al backend
        const payload = {
          orderId: this.id,
          status: "paid",
          paymentIntentId // Opcional, útil para verificación en backend
        };
        
        console.log('[Order] Enviando actualización de estado al backend:', payload);
        
        // Enviar actualización al backend
        const response = await $fetch(`${config.public.apiBaseUrl}/orders/status`, {
          method: "POST",
          headers,
          body: payload
        });
        
        console.log('[Order] Respuesta de actualización de estado:', response);
        return response;
        
      } catch (error) {
        console.error('[Order] Error al actualizar el estado de la orden:', error);
        // No lanzamos el error aquí para no interrumpir el flujo del usuario
        // pero lo registramos para debugging
      }
    },
  },

  persist: true,
});
