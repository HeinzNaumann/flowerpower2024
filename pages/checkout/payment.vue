<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Cabecera de la página -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ $t('checkout.paymentTitle') || 'Finalizar compra' }}</h1>
        <p class="text-neutral-600">{{ $t('checkout.paymentSubtitle') || 'Completa tu pedido de forma segura' }}</p>
      </div>

      <div class="mb-8"></div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Columna izquierda: Resumen del pedido -->
        <div class="md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-4">{{ $t('checkout.orderSummary') || 'Resumen del pedido' }}</h2>
          
          <!-- Mostrar error si no hay items -->
          <div v-if="cartItems.length === 0" class="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-md">
            {{ $t('checkout.noItemsError') || 'No hay productos en tu carrito' }}
          </div>
          
          <!-- Productos en el carrito -->
          <div class="mb-6">
            <ul class="divide-y divide-neutral-200">
              <li v-for="item in cartItems" :key="item.id" class="py-3 flex items-start gap-3">
                <img 
                  v-if="item.images && item.images.length > 0" 
                  :src="getImgUrl(item.images[0])" 
                  :alt="item.title" 
                  class="w-16 h-16 object-cover rounded"
                />
                <div class="flex-1">
                  <div class="font-medium">{{ item.title }}</div>
                  <div class="text-sm text-neutral-500">x{{ item.quantity }}</div>
                  <!-- Acceso seguro a los complementos -->
                  <div v-if="(item as any).complements && (item as any).complements.length > 0" class="mt-1">
                    <div v-for="complement in (item as any).complements" :key="complement.id" class="text-xs text-neutral-500 flex items-center gap-2 mt-2">
                      <!-- Imagen del complemento -->
                      <img 
                        v-if="complement.images && complement.images.length > 0" 
                        :src="getImgUrl(complement.images[0])" 
                        :alt="complement.title" 
                        class="w-8 h-8 object-cover rounded"
                      />
                      <span>+ {{ complement.title }} (€{{ complement.price.toFixed(2) }})</span>
                    </div>
                  </div>
                </div>
                <div class="font-medium">€{{ (item.price * item.quantity).toFixed(2) }}</div>
              </li>
            </ul>
          </div>

          <!-- Información de envío -->
          <div class="border-t pt-4 mb-4">
            <h3 class="font-medium mb-2">{{ $t('checkout.shippingInfo') || 'Información de envío' }}</h3>
            <div class="text-sm text-neutral-600">
              <p>{{ shippingAddress.name }} {{ shippingAddress.surname }}</p>
              <p>{{ shippingAddress.address || shippingAddress.street }}</p>
              <p>{{ shippingAddress.zip || shippingAddress.postalCode }}, {{ shippingAddress.city }}</p>
              <p>{{ shippingAddress.country }}</p>
              <p class="mt-2">{{ $t('checkout.delivery') || 'Entrega' }}: {{ formatDate(shippingAddress.deliveryDate) }} - {{ formatTime(shippingAddress.deliveryTime) }}</p>
            </div>
          </div>

          <!-- Totales -->
          <div class="border-t pt-4">
            <div class="flex justify-between mb-1">
              <span>{{ $t('checkout.subtotal') || 'Subtotal' }}:</span>
              <span>€{{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span>{{ $t('checkout.shipping') || 'Envío' }}:</span>
              <span>€0.00</span>
            </div>
            <div class="flex justify-between font-bold text-lg mt-2">
              <span>{{ $t('checkout.total') || 'Total' }}:</span>
              <span>€{{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Columna derecha: Opciones de pago -->
        <div class="md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-4">{{ $t('checkout.paymentMethod') || 'Método de pago' }}</h2>
          
          <!-- Opciones de pago -->
          <div class="mb-6">
            <div class="flex items-center justify-between border p-4 rounded-md bg-emerald-50 border-emerald-200">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-credit-card" class="text-emerald-600" />
                <span class="font-medium">{{ $t('checkout.creditCard') || 'Tarjeta de crédito/débito' }}</span>
              </div>
              <div class="flex gap-2">
                <img src="/images/visa.svg" alt="Visa" class="h-6" />
                <img src="/images/mastercard.svg" alt="Mastercard" class="h-6" />
                <img src="/images/amex.svg" alt="American Express" class="h-6" />
              </div>
            </div>
          </div>

          <!-- Elemento Stripe para la tarjeta -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">{{ $t('checkout.paymentCard') || 'Detalles de la tarjeta' }}</label>
            <!-- Loader fuera del div de Stripe -->
            <div v-if="loadingStripe" class="flex justify-center items-center h-24">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl text-emerald-600" />
            </div>
            <!-- Stripe Card Element (si no está cargando) -->
            <div v-show="!loadingStripe" id="card-element" class="py-4 mb-3 min-h-[120px] bg-white"></div>
            <div class="text-xs text-neutral-500 mb-4">
              {{ $t('checkout.cardInfo') || 'Introduce los datos de tu tarjeta para completar el pago.' }}
            </div>
            
            <!-- Información del titular (opcional si Stripe no lo incluye) -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">{{ $t('checkout.cardholderName') || 'Titular de la tarjeta' }}</label>
              <input 
                type="text" 
                class="w-full p-2 border rounded-md" 
                placeholder="Nombre completo"
              />
            </div>
          </div>

          <!-- Botón de pago -->
          <UButton
            block
            color="primary"
            size="lg"
            class="font-semibold"
            :loading="paymentLoading"
            :disabled="loadingStripe || paymentLoading || !!error || !isValidOrder" 
            @click="processPayment"
          >
            {{ $t('checkout.payNow') || 'Pagar ahora' }}
          </UButton>
          
          <!-- Mensaje cuando no hay productos o total válido -->
          <div v-if="!isValidOrder && !error" class="mt-4 p-3 bg-amber-50 text-amber-700 rounded-md text-sm">
            {{ $t('checkout.invalidOrderMessage') || 'No hay productos válidos para realizar el pago' }}
          </div>

          <!-- Mensaje de error -->
          <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import { useI18n } from 'vue-i18n';

// Helpers globales usados en el template
function getImgUrl(img: string | string[]): string {
  if (!img) return "";
  const imgStr = Array.isArray(img) ? img[0] : img;
  if (imgStr.startsWith("http")) return imgStr;
  if (imgStr.startsWith("images/")) {
    return `/${imgStr}`;
  }
  return `/images/${imgStr}`;
}
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function formatTime(timeString: string): string {
  if (!timeString) return '';
  return timeString;
}

// Proceso de pago
async function processPayment() {
  // Verificar si la orden es válida
  if (!isValidOrder.value) {
    error.value = t('checkout.invalidOrder') || 'No hay productos válidos para realizar el pago';
    return;
  }
  
  if (!stripe.value || !elements.value) {
    error.value = t('checkout.stripeNotReady') || 'El sistema de pago no está listo';
    return;
  }
  
  paymentLoading.value = true;
  error.value = '';
  
  try {
    console.log('[Payment] Iniciando proceso de pago...');
    // Usamos confirmCardPayment en lugar de confirmPayment porque estamos usando un Card Element
    const result = await stripe.value.confirmCardPayment(order.clientSecret, {
      payment_method: {
        card: card.value,
        billing_details: {
          name: order.shipping?.name + ' ' + order.shipping?.surname || '',
          email: order.shipping?.email || '',
        },
      },
      return_url: `${window.location.origin}/checkout/success`,
    });
    
    if (result.error) {
      // Mostrar error al usuario
      error.value = result.error.message || t('checkout.paymentFailed') || 'Pago fallido';
      console.error('[Payment] Error en el pago:', result.error);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      // Pago exitoso
      console.log('[Payment] Pago exitoso con ID:', result.paymentIntent.id);
      console.log('[Payment] Detalles completos:', JSON.stringify(result.paymentIntent, null, 2));
      
      try {
        // Comunicar con el backend para actualizar el estado del pedido
        console.log('[Payment] Marcando orden como pagada en el backend...');
        await order.markPaid(result.paymentIntent.id);
        console.log('[Payment] Orden actualizada correctamente en el backend');
        
        // Limpiar el carrito y redirigir
        await cart.clearCart();
        router.push('/checkout/success');
      } catch (updateError) {
        console.error('[Payment] Error al actualizar la orden en el backend:', updateError);
        error.value = 'El pago se realizó correctamente, pero hubo un problema al actualizar el pedido. Por favor, contacta con soporte.';
      }
    } else {
      // El pago requiere acción adicional o está en otro estado
      console.log('[Payment] Estado del PaymentIntent:', result.paymentIntent?.status);
      console.log('[Payment] Detalles completos:', result);
      
      if (result.paymentIntent?.status === 'requires_action') {
        console.log('[Payment] Se requiere autenticación adicional, redirigiendo...');
        // Stripe manejará la redirección para autenticación 3DS
      } else {
        error.value = `El pago está en un estado intermedio: ${result.paymentIntent?.status || 'desconocido'}`;
      }
    }
  } catch (err) {
    console.error('[Payment] Error al procesar el pago:', err);
    error.value = t('checkout.processError') || 'Ha ocurrido un error al procesar el pago';
  } finally {
    paymentLoading.value = false;
  }
}

const { t } = useI18n();

// Stripe configuration
const config = useRuntimeConfig();
const stripePublicKey = config.public.stripePublicKey;

// Validación y log para depuración
if (!stripePublicKey) {
  console.error('Error: STRIPE_PUBLIC_KEY no está definida en el .env');
}
console.log('Stripe Public Key:', stripePublicKey ? 'Configurada correctamente' : 'No configurada');

// Inicializar Stripe solo si tenemos clave pública
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey as string) : null;

// Stores
const order = useOrderStore();
const cart = useCartStore();
const router = useRouter();

// Estado para controlar carga y errores
const loading = ref(false);
const paymentLoading = ref(false); // Estado específico para el botón de pago
const loadingStripe = ref(true); // Loader para Stripe
const error = ref('');
const stripe = ref<any>(null);
const elements = ref<any>(null);
const card = ref<any>(null);

// Interface para la dirección de envío
interface ShippingAddress {
  name: string;
  surname: string;
  address?: string;
  street?: string;
  city: string;
  zip?: string;
  postalCode?: string;
  country: string;
  deliveryDate: string;
  deliveryTime: string;
}

// Datos del carrito
const cartItems = computed(() => {
  // Primero intentar obtener los items de la orden
  if (order.items && order.items.length > 0) {
    return order.items;
  }
  // Si no hay items en la orden, usar los del carrito
  return cart.items || [];
});

// Dirección de envío
const shippingAddress = computed<ShippingAddress>(() => {
  if (order.shipping) {
    // Obtener fecha y hora de entrega del pedido
    const orderData = order as any;
    const deliveryDate = orderData.shipping?.deliveryDate || '';
    const deliveryTime = orderData.shipping?.deliveryTime || '';

    // Adaptar la estructura de la dirección a lo que espera el componente
    return {
      name: order.shipping.name || '',
      surname: order.shipping.surname || '',
      address: order.shipping.street || '',
      street: order.shipping.street || '',
      city: order.shipping.city || '',
      zip: order.shipping.postalCode || '',
      postalCode: order.shipping.postalCode || '',
      country: order.shipping.country || '',
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime
    };
  }
  return {
    name: '',
    surname: '',
    address: '',
    street: '',
    city: '',
    zip: '',
    postalCode: '',
    country: '',
    deliveryDate: '',
    deliveryTime: ''
  };
});

// Precio total
const totalPrice = computed(() => {
  let total = 0;
  
  // Primero intentar usar el total de la orden
  if (typeof order.total === 'number') {
    total = order.total;
    console.log('[Checkout] Usando total de orden:', total);
  }
  // Si no hay total en orden o es 0, intentar usar el del carrito
  else if (cart.items && cart.items.length > 0) {
    total = cart.totalPrice || 0;
    console.log('[Checkout] Usando total de carrito:', total);
  }
  
  // Asegurarse de que nunca sea negativo
  return Math.max(0, total);
});

// Verificar si el total es válido
const isValidOrder = computed(() => {
  // Log para depuración
  console.log('[Checkout] Verificando orden:', {
    totalPrice: totalPrice.value,
    cartItemsLength: cartItems.value?.length || 0,
    hasClientSecret: !!order.clientSecret
  });
  
  // Permitir el pago si hay un clientSecret (ya validado por el servidor)
  if (order.clientSecret) {
    return true;
  }
  
  // Si no hay clientSecret, verificar si hay items y un total > 0
  return totalPrice.value > 0 && cartItems.value.length > 0;
});

// Inicializar Stripe
import { nextTick } from 'vue';

console.log('[DEBUG] Archivo payment.vue cargado'); // Para verificar que el script se ejecuta

// Función para inicializar Stripe correctamente
async function initializeStripe() {
  console.log('[DEBUG] Función initializeStripe ejecutándose');
  // Log detallado para depuración
  console.log('[Stripe] Estado de la orden:', {
    id: order.id,
    status: order.status,
    hasClientSecret: !!order.clientSecret,
    clientSecret: order.clientSecret ? 'existe' : 'ausente',
    items: order.items?.length || 0,
    total: order.total
  });

  // Verificar si tenemos un clientSecret válido
  if (!order.clientSecret) {
    error.value = t('checkout.invalidOrderMessage') || 'No se pudo obtener el clientSecret de Stripe.';
    console.error('[Stripe] No hay clientSecret, abortando.');
    loadingStripe.value = false;
    // Si no hay clientSecret, intentar redirigir al checkout
    setTimeout(() => {
      if (confirm('No se detectó una orden válida. ¿Deseas volver al resumen de compra?')) {
        router.push('/checkout/checkout');
      }
    }, 1500);
    return;
  }

  // Verificar si tenemos una instancia válida de stripePromise
  if (!stripePromise) {
    error.value = 'Error de configuración de Stripe. Por favor, contacta con soporte.';
    console.error('[Stripe] No se pudo inicializar Stripe. Verifica la clave pública en .env');
    loadingStripe.value = false;
    return;
  }

  loading.value = true;
  
  try {
    // Inicializar Stripe con la clave pública
    stripe.value = await stripePromise;
    if (!stripe.value) throw new Error('No se pudo cargar Stripe');
    console.log('[Stripe] Stripe.js cargado');
    const options = {
      clientSecret: order.clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#10b981',
          colorText: '#333333',
          colorDanger: '#ff5252',
          fontFamily: 'system-ui, sans-serif',
          fontSizeBase: '16px',
          borderRadius: '0px',
          spacingUnit: '2px',
        },
        rules: {
          '.Input': {
            border: 'none',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: 'none',
            borderRadius: '0',
            padding: '10px 0',
            backgroundColor: 'transparent'
          },
          '.Input:focus': {
            borderBottomColor: '#10b981',
            boxShadow: 'none'
          },
          '.Label': {
            fontWeight: '400',
            color: '#666666',
            fontSize: '14px',
            letterSpacing: '0.5px'
          },
          '.Error': {
            color: '#ff5252',
            fontWeight: '400',
            fontSize: '13px'
          }
        }
      },
    };
    elements.value = stripe.value.elements(options);
    if (!elements.value) throw new Error('No se pudieron crear los elementos de Stripe');
    console.log('[Stripe] Stripe Elements creado');
    // Esperar a que el DOM esté listo
    await nextTick();
    const cardElement = document.getElementById('card-element');
    if (!cardElement) {
      error.value = 'No se pudo encontrar el contenedor de Stripe';
      console.error('[Stripe] No se encontró el div #card-element');
      loadingStripe.value = false;
      return;
    }
    // Limpia el div antes de montar Stripe
    cardElement.innerHTML = '';
    card.value = elements.value.create('card');
    if (!card.value) {
      error.value = 'No se pudo crear el elemento de tarjeta de Stripe';
      console.error('[Stripe] No se pudo crear el elemento de tarjeta');
      loadingStripe.value = false;
      return;
    }
    card.value.mount('#card-element');
    console.log('[Stripe] Elemento de tarjeta montado correctamente');
    card.value.on('change', (event: any) => {
      if (event.error) error.value = event.error.message;
      else error.value = '';
    });
  } catch (err) {
    error.value = 'Error al inicializar Stripe: ' + (err instanceof Error ? err.message : String(err));
    console.error('[Stripe] Error:', err);
  } finally {
    loadingStripe.value = false;
    console.log('[Stripe] loadingStripe.value =', loadingStripe.value);
  }
}

// Asegurarse que initializeStripe se ejecuta cuando el componente está montado
onMounted(() => {
  console.log('[DEBUG] onMounted ejecutándose');
  console.log('[DEBUG] Estado inicial del carrito y orden:', {
    cartItems: cart.items?.length || 0,
    cartTotal: cart.totalPrice || 0,
    orderItems: order.items?.length || 0,
    orderTotal: order.total || 0,
    orderClientSecret: order.clientSecret ? 'existe' : 'no existe'
  });
  
  setTimeout(() => {
    console.log('[DEBUG] Ejecutando initializeStripe después de timeout');
    initializeStripe();
  }, 500); // Pequeño retraso para asegurar que el DOM está completamente cargado
});
</script>
