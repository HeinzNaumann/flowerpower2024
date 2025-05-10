<template>
  <div class="bg-neutral-50 rounded-lg shadow p-4">
    <h2 class="text-lg font-semibold mb-4">{{ $t('checkout.cartTitle') || 'Tus productos' }}</h2>
    <div v-if="items.length === 0" class="text-neutral-400">{{ $t('checkout.cartEmpty') || 'El carrito está vacío.' }}</div>
    <div v-else>
      <ul class="divide-y divide-neutral-200 mb-4">
        <template v-for="item in items">
          <li
            v-if="!item.isComplement"
            :key="item.id"
            class="py-2 flex items-center gap-3 justify-between bg-white"
          >
            <img
              v-if="item.images && item.images.length > 0"
              :src="getImgUrl(item.images[0])"
              :alt="item.title"
              class="w-16 h-16 object-cover rounded"
            />
            <div class="flex-1">
              <div class="font-semibold">{{ item.title }}</div>
              <div class="text-xs text-neutral-400">x{{ item.quantity }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm">€ {{ (item.price * item.quantity).toFixed(2) }}</div>
              <div class="text-xs text-neutral-400">€ {{ item.price.toFixed(2) }} c/u</div>
            </div>
          </li>
          <li
            v-for="sub in items.filter(sub => sub.isComplement && sub.parentProductId === item.id)"
            :key="sub.id"
            class="py-1 flex items-center gap-3 justify-between bg-neutral-50 pl-10 border-l-4 border-[#db9526]"
          >
            <img
              v-if="sub.images && sub.images.length > 0"
              :src="getImgUrl(sub.images[0])"
              :alt="sub.title"
              class="w-10 h-10 object-cover rounded"
            />
            <div class="flex-1">
              <div class="font-normal">
                <span>{{ sub.title }}</span>
              </div>
              <div class="text-xs text-neutral-400">x{{ sub.quantity }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm">€ {{ (sub.price * sub.quantity).toFixed(2) }}</div>
              <div class="text-xs text-neutral-400">€ {{ sub.price.toFixed(2) }} c/u</div>
            </div>
          </li>
        </template>
      </ul>
      <div class="flex justify-between items-center border-t pt-4 mt-4">
        <span class="font-semibold">{{ $t('checkout.total') || 'Total' }}:</span>
        <span class="text-lg font-bold">€ {{ totalPrice.toFixed(2) }}</span>
      </div>
      
      <!-- Mensaje de error de validación -->
      <div v-if="validationError" class="bg-red-50 border border-red-200 text-red-700 p-3 rounded mt-4 mb-2 text-sm">
        <div class="font-semibold mb-1">{{ $t('checkout.formError') || 'Por favor, completa todos los campos requeridos:' }}</div>
        <ul class="list-disc pl-5">
          <li v-for="(error, field) in formErrors" :key="field">{{ getFieldLabel(field) }}: {{ error }}</li>
        </ul>
      </div>
      
      <!-- Botón de compra -->
      <UButton
        type="button"
        color="primary"
        class="w-full mt-4"
        :loading="loading"
        @click="submitForm"
      >
        {{ $t("checkout.confirm") || 'Confirmar compra' }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { computed, ref } from 'vue';
import { UButton } from '#components';
const cartStore = useCartStore();
const items = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

// Para el botón de compra y validación
const loading = ref(false);
const validationError = ref(false);
const formErrors = ref<Record<string, string>>({});
const emit = defineEmits(['submit']);

// Función para enviar el formulario desde el componente padre
function submitForm() {
  // Resetear errores previos
  validationError.value = false;
  formErrors.value = {};
  
  loading.value = true;
  emit('submit', {
    onError: (errors: Record<string, string>) => {
      // Mostrar errores de validación
      if (Object.keys(errors).length > 0) {
        formErrors.value = errors;
        validationError.value = true;
      }
      loading.value = false;
    },
    onSuccess: () => {
      loading.value = false;
    }
  });
  
  // Timeout de seguridad por si el padre no responde
  setTimeout(() => {
    loading.value = false;
  }, 5000);
}

// Función para obtener etiquetas legibles de los campos
function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    name: 'Nombre',
    surname: 'Apellidos',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    zip: 'Código postal',
    country: 'País',
    deliveryDate: 'Fecha de entrega',
    deliveryTime: 'Hora de entrega',
    cardNote: 'Nota para tarjeta',
    billingAddress: 'Dirección de facturación',
    billingCity: 'Ciudad de facturación',
    billingZip: 'Código postal de facturación',
    billingCountry: 'País de facturación'
  };
  
  return labels[field] || field;
}

// Construye la url de la imagen
const config = useRuntimeConfig?.() || {};
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
  if (img.includes('files/product') && config.public?.apiBaseUrl) {
    return `${config.public.apiBaseUrl}${img.startsWith('/') ? img : '/' + img}`;
  }
  
  // Si es una ruta de complemento (empezando con 'images/complements')
  if (img.includes('complements')) {
    return img.startsWith('/') ? img : '/' + img;
  }
  
  // Para productos regulares, usa la API
  if (config.public?.apiBaseUrl) {
    return `${config.public.apiBaseUrl}/files/product/${img}`;
  }
  
  // Fallback: para rutas relativas, añade '/' al principio si no lo tiene
  return img.startsWith('/') ? img : '/' + img;
}
</script>
