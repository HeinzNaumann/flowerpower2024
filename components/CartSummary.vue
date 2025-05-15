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
            v-for="sub in items.filter((sub: any) => sub.isComplement && sub.parentProductId === item.id)"
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
      <div class="space-y-2 border-t pt-4 mt-4">
        <!-- Subtotal (productos sin envío) -->
        <div class="flex justify-between items-center">
          <span class="font-medium">{{ $t('checkout.subtotalPrice') || 'Subtotal' }}:</span>
          <span class="font-medium">€ {{ totalPrice.toFixed(2) }}</span>
        </div>
        
        <!-- Gastos de envío -->
        <div class="flex justify-between items-center">
          <span class="font-medium">{{ $t('checkout.shippingPrice') || 'Gastos de envío' }}:</span>
          <span v-if="shippingCost !== null" class="font-medium">€ {{ shippingCost.toFixed(2) }}</span>
          <span v-else-if="postalCode" class="text-sm text-amber-600">{{ $t('checkout.shippingUnavailable') || 'No disponible en tu zona' }}</span>
          <span v-else class="text-sm text-neutral-500">{{ $t('checkout.enterPostalCode') || 'Introduce CP' }}</span>
        </div>
        
        <!-- Total final (con envío) -->
        <div class="flex justify-between items-center pt-2 border-t border-dashed">
          <span class="font-semibold">{{ $t('checkout.total') || 'Total' }}:</span>
          <span class="text-lg font-bold">€ {{ finalTotal.toFixed(2) }}</span>
        </div>
      </div>
      
      <!-- Mensaje de error de validación -->
      <div v-if="validationError && Object.keys(formErrors).length > 0" class="bg-red-50 border border-red-200 text-red-700 p-3 rounded mt-4 mb-2 text-sm">
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
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { UButton } from '#components';
import { getShippingByPostal } from '~/utils/mallorcaShippingRates';
const cartStore = useCartStore();
const items = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

// Datos para el cálculo de envío
const postalCode = ref('');
const shippingCost = ref<number | null>(null);

// Calcular el total final (productos + envío si está disponible)
const finalTotal = computed(() => {
  return shippingCost.value !== null ? totalPrice.value + shippingCost.value : totalPrice.value;
});

// Esta función será llamada desde checkout.vue cuando cambie el código postal
defineExpose({
  updateShipping: (zipCode: string) => {
    postalCode.value = zipCode;
    if (zipCode && zipCode.length === 5) {
      shippingCost.value = getShippingByPostal(zipCode);
    } else {
      shippingCost.value = null;
    }
  }
});

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
      } else {
        // Si no hay errores, ocultar el mensaje
        formErrors.value = {};
        validationError.value = false;
      }
      loading.value = false;
    },
    onSuccess: () => {
      // Limpiar errores en caso de éxito
      formErrors.value = {};
      validationError.value = false;
      loading.value = false;
    },
    // Función para limpiar un error específico cuando el usuario corrige un campo
    clearFieldError: (field: string) => {
      if (formErrors.value[field]) {
        delete formErrors.value[field];
        // Si no quedan errores, ocultar el mensaje completamente
        if (Object.keys(formErrors.value).length === 0) {
          validationError.value = false;
        }
      }
    }
  });
  
  // Timeout de seguridad por si el padre no responde
  setTimeout(() => {
    loading.value = false;
  }, 5000);
}

// Inicializar i18n
const { t } = useI18n();

// Función para obtener la etiqueta del campo para mostrar en los errores
function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    name: t('checkout.name') || 'Nombre',
    surname: t('checkout.surname') || 'Apellidos',
    phone: t('checkout.phone') || 'Teléfono',
    address: t('checkout.street') || 'Dirección',
    city: t('checkout.city') || 'Ciudad',
    zip: t('checkout.zip') || 'Código postal',
    country: t('checkout.country') || 'País',
    deliveryDate: t('checkout.deliveryDate') || 'Fecha de entrega',
    deliveryTime: t('checkout.deliveryTime') || 'Hora de entrega',
    cardNote: t('checkout.cardNote') || 'Nota para tarjeta',
    // Campos de facturación
    billingAddress: t('checkout.billingAddress') || 'Dirección de facturación',
    billingCity: t('checkout.billingCity') || 'Ciudad de facturación',
    billingZip: t('checkout.billingZip') || 'Código postal de facturación',
  };
  
  return labels[field] || field;
}

// Observador para limpiar el mensaje de error cuando no hay errores
watch(() => Object.keys(formErrors.value).length, (count) => {
  if (count === 0) {
    validationError.value = false;
  }
});

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
