<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Cabecera de la página -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ $t('checkout.paymentTitle') || 'Finalizar compra' }}</h1>
        <p class="text-neutral-600">{{ $t('checkout.paymentSubtitle') || 'Completa tu pedido de forma segura' }}</p>
      </div>

      <!-- Espacio adicional para mejor separación -->
      <div class="mb-8"></div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Columna izquierda: Resumen del pedido -->
        <div class="md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-4">{{ $t('checkout.orderSummary') || 'Resumen del pedido' }}</h2>
          
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
              <p>{{ shippingAddress.address }}</p>
              <p>{{ shippingAddress.zip }}, {{ shippingAddress.city }}</p>
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
            <div class="flex items-center gap-3 p-3 border rounded-md mb-3 cursor-pointer bg-neutral-50">
              <div class="w-6 h-6 rounded-full border-2 border-primary-500 flex items-center justify-center">
                <div class="w-3 h-3 rounded-full bg-primary-500"></div>
              </div>
              <div class="flex-1">
                <div class="font-medium">{{ $t('checkout.creditCard') || 'Tarjeta de crédito' }}</div>
                <div class="text-sm text-neutral-500">Visa, Mastercard, American Express</div>
              </div>
              <div class="flex gap-2">
                <img src="/images/visa.svg" alt="Visa" class="h-6" />
                <img src="/images/mastercard.svg" alt="Mastercard" class="h-6" />
                <img src="/images/amex.svg" alt="American Express" class="h-6" />
              </div>
            </div>
          </div>

          <!-- Formulario de tarjeta (simulado) -->
          <div class="mb-6">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">{{ $t('checkout.cardNumber') || 'Número de tarjeta' }}</label>
              <input 
                type="text" 
                class="w-full p-2 border rounded-md" 
                placeholder="1234 5678 9012 3456"
                v-model="cardNumber"
                maxlength="19"
                @input="formatCardNumber"
              />
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium mb-1">{{ $t('checkout.expiryDate') || 'Fecha de caducidad' }}</label>
                <input 
                  type="text" 
                  class="w-full p-2 border rounded-md" 
                  placeholder="MM/YY"
                  v-model="expiryDate"
                  maxlength="5"
                  @input="formatExpiryDate"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">{{ $t('checkout.cvv') || 'CVV' }}</label>
                <input 
                  type="text" 
                  class="w-full p-2 border rounded-md" 
                  placeholder="123"
                  v-model="cvv"
                  maxlength="4"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">{{ $t('checkout.cardholderName') || 'Titular de la tarjeta' }}</label>
              <input 
                type="text" 
                class="w-full p-2 border rounded-md" 
                placeholder="Nombre completo"
                v-model="cardholderName"
              />
            </div>
          </div>

          <!-- Mensaje de seguridad -->
          <div class="flex items-center gap-2 text-sm text-neutral-600 mb-6">
            <UIcon name="i-heroicons-lock-closed" class="text-primary-500" />
            <span>{{ $t('checkout.securePayment') || 'Pago 100% seguro. Tus datos están protegidos.' }}</span>
          </div>

          <!-- Botón de pago -->
          <UButton
            type="button"
            color="primary"
            class="w-full py-3"
            :loading="loading"
            @click="processPayment"
          >
            {{ $t('checkout.payNow') || 'Pagar ahora' }} - €{{ totalPrice.toFixed(2) }}
          </UButton>

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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
// Comentamos la importación de Stripe para evitar errores
// import { loadStripe } from "@stripe/stripe-js";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import { useI18n } from "vue-i18n";

// Interfaz extendida para incluir complements
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images?: string[];
  isComplement?: boolean;
  complements?: any[]; // Añadimos esta propiedad
}

const { t } = useI18n();
const order = useOrderStore();
const cart = useCartStore();
const router = useRouter();

// Estado del formulario de pago
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const cardholderName = ref('');
const loading = ref(false);
const error = ref('');

// Datos de la orden
const orderItems = ref<CartItem[]>([]);
const orderTotal = ref(0);

// Datos computados
const cartItems = computed(() => {
  return orderItems.value;
});

const totalPrice = computed(() => {
  return orderTotal.value;
});

// Obtener los datos reales de la orden
const shippingAddress = ref({
  name: '',
  surname: '',
  address: '',
  city: '',
  zip: '',
  country: '',
  deliveryDate: '',
  deliveryTime: '',
});

// Cargar los datos reales de la orden cuando se monta el componente
onMounted(async () => {
  // Protegerse si alguien entra directo
  if (!order.id || !order.clientSecret) {
    router.push("/checkout/checkout");
    return;
  }
  
  try {
    // Obtener los datos del carrito para el resumen
    // Los datos de envío deberían venir del backend, pero como no tenemos esa funcionalidad,
    // usaremos los datos que se guardaron en localStorage
    const savedOrderData = localStorage.getItem('lastOrderData');
    if (savedOrderData) {
      const orderData = JSON.parse(savedOrderData);
      console.log('Datos de la orden cargados:', orderData);
      
      // Actualizar la dirección de envío
      if (orderData.shipping) {
        shippingAddress.value = {
          name: orderData.shipping.name || '',
          surname: orderData.shipping.surname || '',
          address: orderData.shipping.street || '',
          city: orderData.shipping.city || '',
          zip: orderData.shipping.postalCode || '',
          country: orderData.shipping.country || '',
          deliveryDate: orderData.deliveryDate || '',
          deliveryTime: orderData.deliveryTime || '',
        };
      }
      
      // Actualizar los items del carrito
      if (orderData.items && Array.isArray(orderData.items)) {
        // Adaptamos los items para incluir complements si no existen
        orderItems.value = orderData.items.map(item => {
          // Creamos una versión extendida del item con la propiedad complements si no existe
          const extendedItem: CartItem = {
            ...item,
            complements: (item as any).complements || []
          };
          return extendedItem;
        });
      }
      
      // Actualizar el precio total
      if (typeof orderData.total === 'number') {
        orderTotal.value = orderData.total;
      } else {
        // Calcular el total manualmente si no está disponible
        orderTotal.value = orderItems.value.reduce((sum, item) => {
          return sum + (item.price * item.quantity);
        }, 0);
      }
    } else {
      console.warn('No se encontraron datos de la última orden');
    }
  } catch (error) {
    console.error('Error al cargar los datos de la orden:', error);
  }
});

// Formatear número de tarjeta con espacios cada 4 dígitos
function formatCardNumber() {
  let value = cardNumber.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = value.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  if (parts.length) {
    cardNumber.value = parts.join(' ');
  } else {
    cardNumber.value = value;
  }
}

// Formatear fecha de caducidad (MM/YY)
function formatExpiryDate() {
  let value = expiryDate.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  
  if (value.length > 2) {
    expiryDate.value = value.substring(0, 2) + '/' + value.substring(2, 4);
  } else {
    expiryDate.value = value;
  }
}

// Formatear fecha para mostrar
function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Formatear hora para mostrar
function formatTime(timeString: string) {
  if (!timeString) return '';
  return timeString;
}

// Construye la url de la imagen
const config = useRuntimeConfig?.() || {};
function getImgUrl(img: string | string[]) {
  if (!img) return "";
  const imgStr = Array.isArray(img) ? img[0] : img;
  
  // Si la URL ya es absoluta (comienza con http), devolverla tal cual
  if (imgStr.startsWith("http")) return imgStr;
  
  // Si la ruta ya comienza con 'images/', eliminar el prefijo para evitar duplicación
  if (imgStr.startsWith("images/")) {
    return `/${imgStr}`;
  }
  
  // Para otras rutas, añadir el prefijo /images/
  return `/images/${imgStr}`;
}

// Procesar el pago
async function processPayment() {
  if (!validateForm()) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    // En un entorno real, aquí se enviaría la información a Stripe
    // Para esta demo, simularemos un proceso exitoso después de un breve retraso
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular redirección a Stripe Checkout
    if (!order.clientSecret) {
      throw new Error('No se ha encontrado una orden válida');
    }
    
    // Comentamos la carga de Stripe para evitar errores
    // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    
    // En un entorno real, esto redireccionaría a Stripe
    // Para la demo, simularemos un pago exitoso
    // const { error } = await stripe!.redirectToCheckout({
    //   sessionId: order.clientSecret!,
    // });
    
    // if (error) throw new Error(error.message);
    
    // Simular pago exitoso
    order.markPaid();
    cart.clearCart();
    
    // Redirigir a la página de éxito
    router.push('/checkout/success');
  } catch (err: any) {
    error.value = err.message || 'Ha ocurrido un error al procesar el pago';
    loading.value = false;
  }
}

// Validar formulario antes de enviar
function validateForm() {
  if (!cardNumber.value.trim() || cardNumber.value.replace(/\s/g, '').length < 16) {
    error.value = t('checkout.invalidCardNumber') || 'Introduce un número de tarjeta válido';
    return false;
  }
  
  if (!expiryDate.value.trim() || !expiryDate.value.includes('/')) {
    error.value = t('checkout.invalidExpiryDate') || 'Introduce una fecha de caducidad válida';
    return false;
  }
  
  if (!cvv.value.trim() || cvv.value.length < 3) {
    error.value = t('checkout.invalidCvv') || 'Introduce un código de seguridad válido';
    return false;
  }
  
  if (!cardholderName.value.trim()) {
    error.value = t('checkout.invalidCardholderName') || 'Introduce el nombre del titular de la tarjeta';
    return false;
  }
  
  return true;
}

onMounted(() => {
  // Protégete si alguien entra directo
  if (!order.clientSecret) {
    router.push("/checkout/checkout");
    return;
  }
  
  // En un entorno real, aquí se cargaría la información del pedido desde el servidor
  // Para esta demo, usaremos datos simulados
});
</script>
