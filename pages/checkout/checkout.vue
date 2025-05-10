<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-6">Checkout</h1>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      El carrito está vacío.
    </div>

    <div v-else>
      <div class="grid gap-6">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex justify-between items-center border-b pb-3 gap-3"
        >
          <img
            v-if="item.images && item.images.length > 0"
            :src="getImgUrl(item.images[0])"
            :alt="item.title"
            class="w-14 h-14 object-cover rounded border"
          />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-lg truncate">{{ item.title }}</p>
            <p class="text-sm text-gray-500">Cantidad: {{ item.quantity }}</p>
          </div>
          <div class="text-right">
            <p class="text-md">
              € {{ (item.price * item.quantity).toFixed(2) }}
            </p>
            <button
              class="text-sm text-red-500 hover:underline mt-1"
              @click="cart.removeItem(item.id)"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-8 border-t pt-4">
        <div class="text-lg font-semibold">
          Total: € {{ cart.totalPrice.toFixed(2) }}
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          @click="goToAddress"
        >
          Proceder al pago
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { useLocalePath } from "#i18n";

const cart = useCartStore();
const { isAuthenticated } = useAuth();
const router = useRouter();
const localePath = useLocalePath();

function goToAddress() {
  if (!isAuthenticated()) {
    router.push(localePath("/checkout/guest-or-login"));
  } else {
    router.push(localePath("/checkout/address"));
  }
}
// Helper para la url de la imagen (igual que en CartSummary)
const config = useRuntimeConfig?.() || {};
function getImgUrl(img) {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  if (config.public && config.public.apiBaseUrl) {
    return `${config.public.apiBaseUrl}/files/product/${img}`;
  }
  return `/images/${img}`;
}
</script>
