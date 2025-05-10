import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) =>
      state.items.filter(item => !item.isComplement).reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addItem(product: ProductFull) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem(productId: string) {
      // Find the item to remove
      const removed = this.items.find(item => item.id === productId);
      if (!removed) return;
      if (!removed.isComplement) {
        // Remove the product and all its complements
        this.items = this.items.filter(item => item.id !== productId && item.parentProductId !== productId);
      } else {
        // Remove only the complement
        this.items = this.items.filter(item => item.id !== productId);
      }
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((item) => item.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart() {
      this.items = [];
    },
  },

  persist: true,
});

// Tipos
import type { Product as ProductFull } from '~/types/types';

interface CartItem extends ProductFull {
  quantity: number;
  isComplement?: boolean;
  parentProductId?: string;
} // CartItem now includes images through ProductBase
