import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId);
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
interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}
