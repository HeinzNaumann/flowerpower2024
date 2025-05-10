<template>
  <div class="bg-neutral-50 rounded-lg shadow p-4">
    <h2 class="text-lg font-semibold mb-4">{{ $t('checkout.cartTitle') || 'Tus productos' }}</h2>
    <div v-if="items.length === 0" class="text-neutral-400">{{ $t('checkout.cartEmpty') || 'El carrito está vacío.' }}</div>
    <div v-else>
      <ul class="divide-y divide-neutral-200 mb-4">
        <li v-for="item in items" :key="item.id" class="py-2 flex items-center gap-3 justify-between">
          <img
            v-if="item.images && item.images.length > 0"
            :src="getImgUrl(item.images[0])"
            :alt="item.title"
            class="w-14 h-14 object-cover rounded border"
          />
          <div class="flex-1 min-w-0">
            <div class="font-medium truncate">{{ item.title }}</div>
            <div class="text-xs text-neutral-500">x{{ item.quantity }}</div>
          </div>
          <div class="text-right">
            <div class="text-sm">€ {{ (item.price * item.quantity).toFixed(2) }}</div>
            <div class="text-xs text-neutral-400">€ {{ item.price.toFixed(2) }} c/u</div>
          </div>
        </li>
      </ul>
      <div class="flex justify-between items-center border-t pt-4 mt-4">
        <span class="font-semibold">{{ $t('checkout.total') || 'Total' }}:</span>
        <span class="text-lg font-bold">€ {{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { computed } from 'vue';
const cartStore = useCartStore();
const items = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

// Construye la url de la imagen
const config = useRuntimeConfig?.() || {};
function getImgUrl(img: string) {
  if (!img) return '';
  // Si ya es url completa
  if (img.startsWith('http')) return img;
  // Si es solo el nombre/relativo
  if (config.public && config.public.apiBaseUrl) {
    return `${config.public.apiBaseUrl}/files/product/${img}`;
  }
  // Fallback
  return `/images/${img}`;
}
</script>
