// stores/order.ts
import { defineStore } from "pinia";
import type {
  CheckoutOrderPayload,
  DeliveryAddress,
  DeliveryContact,
  BillingAddress,
  CustomerContact
} from "~/types/types";
import { useCartStore } from "~/stores/cart";
import { useAuth } from "~/composables/useAuth";
import { useRuntimeConfig } from "#app";

function normalizeDeliveryAddress(
  serverDelivery: Partial<DeliveryAddress> | (Record<string, any> & { contact?: Partial<DeliveryContact> }) | null | undefined,
  fallback: DeliveryAddress
): DeliveryAddress {
  const fallbackContact: DeliveryContact = fallback.contact || {
    recipientName: "",
    recipientSurname: "",
    phone: ""
  };

  if (!serverDelivery) {
    return {
      street: fallback.street,
      city: fallback.city,
      postalCode: fallback.postalCode,
      country: fallback.country,
      id: fallback.id,
      isDefault: fallback.isDefault,
      contact: fallbackContact
    };
  }

  const legacyContact = {
    recipientName:
      (serverDelivery as any)?.deliveryRecipientName ??
      (serverDelivery as any)?.recipientName ??
      (serverDelivery as any)?.name ??
      fallbackContact.recipientName,
    recipientSurname:
      (serverDelivery as any)?.deliveryRecipientSurname ??
      (serverDelivery as any)?.recipientSurname ??
      (serverDelivery as any)?.surname ??
      fallbackContact.recipientSurname,
    phone:
      (serverDelivery as any)?.deliveryPhone ??
      (serverDelivery as any)?.contactPhone ??
      (serverDelivery as any)?.phone ??
      fallbackContact.phone
  };

  const normalizedContact: DeliveryContact = {
    recipientName: serverDelivery.contact?.recipientName ?? legacyContact.recipientName ?? "",
    recipientSurname: serverDelivery.contact?.recipientSurname ?? legacyContact.recipientSurname ?? "",
    phone: serverDelivery.contact?.phone ?? legacyContact.phone ?? ""
  };

  return {
    street: serverDelivery.street ?? (serverDelivery as any)?.address ?? fallback.street,
    city: serverDelivery.city ?? fallback.city,
    postalCode:
      serverDelivery.postalCode ??
      (serverDelivery as any)?.zip ??
      (serverDelivery as any)?.postal_code ??
      fallback.postalCode,
    country: serverDelivery.country ?? fallback.country,
    id: serverDelivery.id ?? fallback.id,
    isDefault: serverDelivery.isDefault ?? fallback.isDefault,
    contact: normalizedContact
  };
}

interface OrderState {
  id: string | null;
  clientSecret: string | null;
  paymentIntentId: string | null;
  status: "draft" | "pending" | "processing" | "paid" | "failed"; // Uso local para feedback de UI (la autoridad real es el backend)
  userId: string | null;
  userType: "registered" | "guest";
  userEmail: string | null;
  customer: CustomerContact | null;
  items: any[]; // Productos en la orden
  shipping: DeliveryAddress | null; // Dirección de envío
  billing: BillingAddress | null; // Dirección de facturación
  total: number; // Total de la orden
  shippingCost: number; // Costo de envío
  deliveryDate: string | null;
  deliveryTime: string | null;
  cardNote: string;
}

export const useOrderStore = defineStore("order", {
  state: (): OrderState => ({
    id: null,
    clientSecret: null,
    paymentIntentId: null,
    status: "draft",
    userId: null,
    userType: "guest",
    userEmail: null,
    customer: null,
    items: [],
    shipping: null,
    billing: null,
    total: 0,
    shippingCost: 0,
    deliveryDate: null,
    deliveryTime: null,
    cardNote: ""
  }),

  actions: {
    /**
     * Crea la orden + PaymentIntent y guarda el clientSecret
     */
    async createOrder(orderPayload: CheckoutOrderPayload) {
      console.log('Datos recibidos en createOrder:');
      console.log('Payload de la orden:', orderPayload);
      const cart = useCartStore();
      const auth = useAuth();
      const { token, userInfo } = auth;
      const isRegistered = auth.isAuthenticated();
      const userType = isRegistered ? "registered" : "guest";
      console.log('Usuario registrado:', isRegistered);
      console.log('Datos del usuario registrado:', userInfo.value);
      
      // Verificar si la dirección de envío contiene información del usuario
      console.log('Información del destinatario de entrega:', orderPayload.delivery.contact);
      
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
        const { customer } = orderPayload;
        userName = customer?.name || null;
        userSurname = customer?.surname || null;
        userEmail = customer?.email || null;
        userPhone = customer?.phone || null;
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
      this.customer = orderPayload.customer;

      // Actualizar el costo de envío si se proporciona
      if (orderPayload.meta.shippingCost !== undefined) {
        this.shippingCost = orderPayload.meta.shippingCost;
      }

      this.deliveryDate = orderPayload.meta.deliveryDate;
      this.deliveryTime = orderPayload.meta.deliveryTime;
      this.cardNote = orderPayload.meta.cardNote || "";

      // Obtener el idioma actual
      const currentLocale = useNuxtApp().$i18n?.locale?.value || 'es';
      
      // Preparar el payload según el formato que espera el backend
      const requestPayload = {
        items: orderPayload.items,
        customer: orderPayload.customer,
        delivery: orderPayload.delivery,
        billing: orderPayload.billing ?? null,
        meta: {
          ...orderPayload.meta,
          shippingCost: typeof orderPayload.meta.shippingCost === 'number' ? orderPayload.meta.shippingCost : 0,
          language: orderPayload.meta.language || currentLocale
        },
        userInfo: {
          name: userName,
          surname: userSurname,
          email: userEmail,
          phone: userPhone
        }
      };

      // Obtener la configuración de runtime de Nuxt
      const config = useRuntimeConfig();
      
      // Definir la interfaz para la respuesta del servidor
      interface OrderResponse {
        id: string;
        status: string;
        total: number;
        clientSecret?: string; // Puede venir directamente en la respuesta
        items?: any[];
        shipping?: DeliveryAddress;
        billing?: BillingAddress | null;
        [key: string]: any; // Para otros campos que pueda tener la respuesta
      }
      
      try {
        // Realizar la petición al servidor
        const response = await $fetch<OrderResponse>(`${config.public.apiBaseUrl}/orders`, {
          method: "POST",
          headers: isRegistered ? { Authorization: `Bearer ${token.value}` } : {},
          body: requestPayload,
        });
        
        console.log('Respuesta del servidor:', response);
        
        // Guardar la respuesta en el estado
        this.id = response.id;
        this.status = (response.status || "pending") as "draft" | "pending" | "paid" | "failed";
        this.total = response.total || cart.totalPrice;
        
        // Obtener el shippingCost de la respuesta del servidor o del meta
        // Asegurarse de que shippingCost sea un número
        const serverShippingCost = response.shippingCost !== undefined ? 
          (typeof response.shippingCost === 'string' ? 
           parseFloat(response.shippingCost) : 
           Number(response.shippingCost)) : 0;
           
        const finalShippingCost = !isNaN(serverShippingCost) ? 
          serverShippingCost : 
          (typeof orderPayload.meta.shippingCost === 'number' ? orderPayload.meta.shippingCost : 0);
        
        console.log('Costo de envío - Respuesta del servidor:', response.shippingCost, '(tipo:', typeof response.shippingCost, ')');
        console.log('Costo de envío - Meta:', orderPayload.meta.shippingCost, '(tipo:', typeof orderPayload.meta.shippingCost, ')');
        console.log('Costo de envío final:', finalShippingCost, '(tipo:', typeof finalShippingCost, ')');
        
        // Guardar los items y direcciones
        this.items = orderPayload.items;
        this.shipping = normalizeDeliveryAddress(response.shipping, orderPayload.delivery);
        this.billing = response.billing || (orderPayload.billing as any) || null;
        
        // Guardar el shippingCost en el estado de la orden como número
        (this as any).shippingCost = Number(finalShippingCost) || 0;
        
        // Si la respuesta ya incluye un clientSecret, guardarlo
        if (response.clientSecret) {
          this.clientSecret = response.clientSecret;
          // Si llega también el paymentIntentId, guardarlo
          if ((response as any).paymentIntentId) {
            this.paymentIntentId = (response as any).paymentIntentId as string;
          }
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
     * Obtiene o reutiliza un PaymentIntent para la orden actual
     * Patrón: un PI por orderId, actualizable
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
        console.log('Solicitando/reutilizando PaymentIntent para orden:', this.id);
        
        interface PaymentResponse {
          clientSecret: string;
          paymentIntentId: string;
          [key: string]: any;
        }
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        
        if (isRegistered && token.value) {
          headers['Authorization'] = `Bearer ${token.value}`;
        }
        
        // Endpoint que busca PI existente o crea uno nuevo
        const response = await $fetch<PaymentResponse>(`${config.public.apiBaseUrl}/orders/${this.id}/payment-intent`, {
          method: "POST",
          headers,
          body: { 
            orderId: this.id,
            amount: Math.round((this.total + this.shippingCost) * 100), // En centavos
            currency: 'eur'
          }
        });
        
        console.log('PaymentIntent response:', response);
        
        if (response.clientSecret) {
          this.clientSecret = response.clientSecret;
          this.paymentIntentId = response.paymentIntentId;
          console.log('ClientSecret obtenido/reutilizado:', this.clientSecret.substring(0, 20) + '...');
        } else {
          throw new Error('No se recibió un clientSecret válido del servidor');
        }
        
        return this.clientSecret;
        
      } catch (error) {
        console.error('Error al obtener PaymentIntent:', error);
        throw error;
      }
    },
    
    /**
     * Actualiza el estado local únicamente para feedback visual.
     * El backend sigue siendo la fuente de verdad (webhooks/refetch).
     */
    setStatusForUi(status: OrderState["status"]) {
      console.log(`[Order] Estado local para UI: ${this.status} -> ${status}`);
      this.status = status;
    },

    /** 
     * Guardar metadatos del pago tras confirmación en cliente.
     * El backend actualizará el estado real mediante webhook.
     */
    async markPaid(paymentIntent?: string | { id?: string | null }) {
      if (!this.id) {
        console.error('[Order] No se puede marcar como pagada una orden sin ID');
        throw new Error('No hay una orden activa para marcar como pagada');
      }
      const paymentIntentId = typeof paymentIntent === 'string' ? paymentIntent : paymentIntent?.id ?? null;

      if (paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
      }

      this.setStatusForUi("paid");
      console.log('[Order] Estado local "paid" es optimista: el backend confirmará o corregirá vía webhook.');
      console.log(`[Order] markPaid ya no realiza actualizaciones manuales. El backend actualizará la orden ${this.id} vía webhook.`);
      console.log('[Order] Estado local actual:', {
        status: this.status,
        paymentIntentId: this.paymentIntentId
      });

      return {
        id: this.id,
        status: this.status,
        paymentIntentId: this.paymentIntentId
      };
    },
  },

  persist: true,
});
