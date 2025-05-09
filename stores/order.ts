// stores/order.ts
import { defineStore } from "pinia";
import type { Address } from "~/types/types";
import { useCartStore } from "~/stores/cart";
import { useAuth } from "~/composables/useAuth";

interface CreateOrderMeta {
  deliveryDate: string;
  deliveryTime: string;
  cardNote?: string;
}

interface OrderState {
  id: string | null;
  clientSecret: string | null;
  status: "draft" | "pending" | "paid" | "failed";
}

export const useOrderStore = defineStore("order", {
  state: (): OrderState => ({
    id: null,
    clientSecret: null,
    status: "draft",
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
      const cart = useCartStore();
      const { token } = useAuth();

      const payload = {
        items: cart.items, // tu lista de productos
        shipping, // dirección de envío
        billing, // facturación (o null)
        deliveryDate: meta.deliveryDate,
        deliveryTime: meta.deliveryTime,
        cardNote: meta.cardNote || "",
      };

      const { id, clientSecret } = await $fetch<{
        id: string;
        clientSecret: string;
      }>("/api/orders", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
        body: payload,
      });

      this.id = id;
      this.clientSecret = clientSecret;
      this.status = "pending";
    },

    /** Marcar la orden como pagada */
    markPaid() {
      this.status = "paid";
    },
  },

  persist: true,
});
