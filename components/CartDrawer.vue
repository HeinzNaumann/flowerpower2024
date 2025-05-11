<template>
  <div>
    <transition name="fade-cart">
      <div v-if="open" class="fixed inset-0 z-40 transition-opacity duration-300" style="background-color: rgba(0, 0, 0, 0.35);" @click="$emit('update:open', false)"></div>
    </transition>
    <transition name="slide-cart">
      <aside v-if="open" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col" @click.stop>
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-semibold">{{ $t('cart.title') || 'Tu carrito' }}</h2>
          <button @click="$emit('update:open', false)" class="text-2xl hover:text-red-500 cursor-pointer transition-colors duration-200">&times;</button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-if="cart.items.length === 0" class="text-center text-gray-400 py-16">
          <span>{{ $t('cart.empty') || 'El carrito está vacío.' }}</span>
        </div>
        <div v-else>
          <div v-for="item in cart.items.filter(i => !i.isComplement)" :key="item.id" class="mb-6 border-b pb-4">
            <div class="flex gap-3 items-center">
              <img v-if="item.images" :src="getImgUrl(item.images)" :alt="item.title" class="w-16 h-16 object-cover rounded border" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-lg truncate">{{ item.title }}</span>
                  <span v-if="item.quantity > 1" class="ml-2 text-xs bg-gray-200 rounded px-2">x{{ item.quantity }}</span>
                </div>
                <div class="flex flex-wrap gap-1 mt-1">
                  <template v-for="sub in cart.items.filter(sub => sub.isComplement && sub.parentProductId === item.id)" :key="sub.id">
                    <span class="flex items-center gap-1 bg-[#ffeecb] border border-[#db9526] text-[#a67c1a] text-xs rounded px-2 py-1">
                      <img v-if="sub.images && sub.images.length" :src="getImgUrl(sub.images[0])" :alt="sub.title" class="w-5 h-5 object-cover rounded-full border bg-white" />
                      <span class="truncate">{{ sub.title }} ({{ sub.quantity }})</span>
                      <button @click="cart.removeItem(sub.id)" class="ml-1 text-[#a67c1a] hover:text-red-500 transition-colors duration-200 cursor-pointer">
                        <span class="text-xs">&times;</span>
                      </button>
                    </span>
                  </template>
                </div>
              </div>
              <button @click="cart.removeItem(item.id)" class="text-red-500 hover:underline text-sm ml-2 cursor-pointer transition-colors duration-200">{{ $t('cart.remove') || 'Eliminar' }}</button>
            </div>
            <div class="flex justify-between mt-2">
              <span class="font-semibold">€ {{ (item.price * item.quantity + cart.items.filter(sub => sub.isComplement && sub.parentProductId === item.id).reduce((sum, sub) => sum + sub.price * sub.quantity, 0)).toFixed(2) }}</span>
            </div>
          </div>
        </div>
        </div>
        <div class="border-t p-4">
          <div class="flex justify-between items-center mb-4">
            <span class="font-semibold">{{ $t('cart.total') || 'Total:' }}</span>
            <span class="text-xl font-bold">€ {{ groupedTotal.toFixed(2) }}</span>
          </div>
          <UButton color="primary" block @click="goToAddress" class="cursor-pointer transition-all duration-200 hover:opacity-90">
            {{ $t('cart.checkout') || 'Finalizar compra' }}
          </UButton>

        </div>
      </aside>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { computed, watch, onMounted, onUnmounted, watchEffect } from 'vue';
import { UButton } from '#components';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import { useLocalePath } from '#i18n';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(['update:open']);

const { isAuthenticated } = useAuth();
const router = useRouter();
const localePath = useLocalePath();

function goToAddress() {
  if (!isAuthenticated()) {
    router.push(localePath('/checkout/guest-or-login'));
  } else {
    router.push(localePath('/checkout/address'));
  }
}


// Debug: Mostrar formato de imágenes
onMounted(() => {
  console.log('Items en el carrito (detallado):', cart.items);
  
  // Inspeccionar cada item para ver su estructura exacta
  cart.items.forEach((item, index) => {
    console.log(`Item ${index}: ${item.title}`);
    console.log('- ID:', item.id);
    console.log('- Es complemento:', item.isComplement);
    console.log('- Imágenes:', item.images);
    console.log('- Tipo de imágenes:', typeof item.images);
    if (item.images) {
      if (Array.isArray(item.images)) {
        console.log('- Primera imagen del array:', item.images[0]);
      } else {
        console.log('- Imagen (string):', item.images);
      }
    }
    console.log('---');
  });
});
const cart = useCartStore();

// Obtén el config fuera de la función
const config = useRuntimeConfig();

function getImgUrl(img: string | string[]) {
  if (!img) return '';
  
  // Si es un array, toma el primer elemento
  if (Array.isArray(img)) {
    if (img.length === 0) return '';
    img = img[0];
  }
  
  // Si ya es una URL completa (http o https), úsala directamente
  if (img.startsWith('http')) return img;
  
  // Si contiene 'files/product' pero no tiene la URL completa, añádela
  if (img.includes('files/product') && !img.includes(config.public.apiBaseUrl)) {
    return `${config.public.apiBaseUrl}${img.startsWith('/') ? img : '/' + img}`;
  }
  
  // Para rutas relativas, añade '/' al principio si no lo tiene
  return img.startsWith('/') ? img : '/' + img;
}

const groupedTotal = computed(() => {
  return cart.items
    .filter(item => !item.isComplement)
    .reduce((sum, item) => {
      const subTotal = cart.items
        .filter(sub => sub.isComplement && sub.parentProductId === item.id)
        .reduce((subSum, sub) => subSum + sub.price * sub.quantity, 0);
      return sum + item.price * item.quantity + subTotal;
    }, 0);
});

function handleKeydown(e: KeyboardEvent) {
  if (props.open && (e.key === 'Escape' || e.key === 'Esc')) {
    emit('update:open', false);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
// Cerrar el drawer automáticamente cuando el carrito esté vacío
watchEffect(() => {
  if (props.open && cart.items.length === 0) {
    emit('update:open', false);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.slide-cart-enter-active,
.slide-cart-leave-active {
  transition: transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s;
}
.slide-cart-enter-from,
.slide-cart-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-cart-enter-to,
.slide-cart-leave-from {
  transform: translateX(0);
opacity: 0.5;
}
.fade-cart-enter-active, .fade-cart-leave-active {
  transition: opacity 0.3s;
}
.fade-cart-enter-from, .fade-cart-leave-to {
  opacity: 0;
}
.fade-cart-enter-to, .fade-cart-leave-from {
  opacity: 1;
}
</style>
