<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-6">Checkout</h1>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      El carrito está vacío.
    </div>

    <div v-else>
      <div class="grid gap-6">
        <template v-for="item in cart.items">
          <div
            v-if="!item.isComplement"
            :key="item.id"
            class="flex justify-between items-center border-b pb-3 gap-3 bg-white"
          >
            <img
              v-if="item.images && item.images.length > 0"
              :src="getImgUrl(item.images[0])"
              :alt="item.title"
              class="w-14 h-14 object-cover rounded border"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-medium text-lg truncate">{{ item.title }}</p>
                <template v-for="sub in cart.items.filter(sub => sub.isComplement && sub.parentProductId === item.id)" :key="sub.id">
                  <span
                    class="ml-2 px-2 py-1 text-xs rounded bg-[#ffeecb] border border-[#db9526] text-[#a67c1a] flex flex-row items-center gap-1 min-w-0"
                  >
                    <img
                      v-if="sub.images && sub.images.length > 0"
                      :src="sub.images[0]?.startsWith('http') ? sub.images[0] : '/' + sub.images[0]"
                      :alt="sub.title"
                      class="w-7 h-7 object-cover rounded-full border border-[#db9526] bg-white flex-shrink-0"
                      style="min-width: 1.75rem; min-height: 1.75rem;"
                    />
                    <span class="truncate block max-w-[7rem]">{{ sub.title }} ({{ sub.quantity }})</span>
                  </span>
                </template>
              </div>
              <p class="text-sm text-gray-500">Cantidad: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="text-md font-semibold">
                € {{ (
                  item.price * item.quantity +
                  cart.items.filter(sub => sub.isComplement && sub.parentProductId === item.id)
                    .reduce((sum, sub) => sum + sub.price * sub.quantity, 0)
                ).toFixed(2) }}
              </p>
              <button
                class="text-sm text-red-500 hover:underline mt-1"
                @click="cart.removeItem(item.id)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </template>
      </div>

      <div class="flex justify-end mt-8 border-t pt-4">
        <div class="text-lg font-semibold">
          Total: € {{ groupedTotal.toFixed(2) }}
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
import { computed } from "vue";
import { useCartStore } from "~/stores/cart";
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { useLocalePath } from "#i18n";

// Definir metadatos de la página, incluyendo la transición
definePageMeta({
  pageTransition: {
    name: 'slide-up',
    mode: 'out-in'
  }
});

const cart = useCartStore();
const { isAuthenticated } = useAuth();
const router = useRouter();
const localePath = useLocalePath();

// Suma agrupada igual que el visual
const groupedTotal = computed(() => {
  let total = 0;
  cart.items.forEach(item => {
    if (!item.isComplement) {
      // Suma el producto principal y sus complementos
      const subTotal = (item.price * item.quantity) + cart.items.filter(sub => sub.isComplement && sub.parentProductId === item.id).reduce((sum, sub) => sum + sub.price * sub.quantity, 0);
      total += subTotal;
    }
  });
  return total;
});

function goToAddress() {
  if (!isAuthenticated()) {
    router.push(localePath("/checkout/guest-or-login"));
  } else {
    router.push(localePath("/checkout/address"));
  }
}
// Helper para la url de la imagen (igual que en CartSummary)
const config = useRuntimeConfig?.() || {};
function getImgUrl(img: string) {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  if (config.public && config.public.apiBaseUrl) {
    return `${config.public.apiBaseUrl}/files/product/${img}`;
  }
  return `/images/${img}`;
}
</script>
