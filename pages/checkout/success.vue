<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <!-- Cabecera con animación de éxito -->
      <div class="text-center mb-8">
        <div class="success-checkmark mb-8 h-[105px]">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-primary-700 mb-3">
          {{ $t('checkout.orderSuccess') || '¡Pedido realizado con éxito!' }}
        </h1>
        <p class="text-lg text-neutral-600">
          {{ $t('checkout.orderSuccessMessage') || 'Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.' }}
        </p>
        <div class="mt-4 text-neutral-500">
          <p>{{ $t('checkout.orderNumber') || 'Número de pedido' }}: <span class="font-medium">{{ orderId }}</span></p>
        </div>
      </div>

      <!-- Resumen del pedido -->
      <div class="border-t border-b py-6 my-6">
        <h2 class="text-xl font-semibold mb-4">{{ $t('checkout.orderSummary') || 'Resumen del pedido' }}</h2>
        
        <div class="space-y-4">
          <!-- Detalles de envío -->
          <div class="flex flex-col md:flex-row md:gap-8">
            <div class="md:w-1/2 mb-4 md:mb-0">
              <h3 class="font-medium text-primary-700 mb-2">{{ $t('checkout.shippingDetails') || 'Detalles de envío' }}</h3>
              <div class="text-sm text-neutral-600">
                <p>{{ shippingAddress.recipientName }} {{ shippingAddress.recipientSurname }}</p>
                <p>{{ shippingAddress.street }}</p>
                <p>{{ shippingAddress.postalCode }}, {{ shippingAddress.city }}</p>
                <p>{{ shippingAddress.country }}</p>
                <p v-if="shippingAddress.phone" class="mt-2 flex items-center gap-2">
                  <UIcon name="i-heroicons-phone" class="w-4 h-4" />
                  <span>{{ shippingAddress.phone }}</span>
                </p>
              </div>
            </div>
            <div class="md:w-1/2">
              <h3 class="font-medium text-primary-700 mb-2">{{ $t('checkout.deliveryInfoTitle') || 'Información de entrega' }}</h3>
              <div class="text-sm text-neutral-600">
                <p>{{ $t('checkout.deliveryDate') || 'Fecha de entrega' }}: {{ formatDate(shippingAddress.deliveryDate || getTomorrow()) }}</p>
                <p>{{ $t('checkout.deliveryTime') || 'Hora de entrega' }}: {{ formatTime(shippingAddress.deliveryTime || '12:00') }}</p>
                <p class="mt-2">
                  <span class="font-medium">{{ $t('checkout.cardNote') || 'Nota para tarjeta' }}:</span> {{ cardNote || $t('checkout.noCardNote') || 'Sin nota especial' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Productos comprados -->
          <div class="mt-6">
            <h3 class="font-medium text-primary-700 mb-3">{{ $t('checkout.purchasedItems') || 'Productos comprados' }}</h3>
            <ul class="divide-y divide-neutral-200">
              <li v-for="(item, index) in orderItems" :key="index" class="py-3 flex items-start gap-3">
                <img 
                  v-if="item.image" 
                  :src="getImgUrl(item.image)" 
                  :alt="item.title" 
                  class="w-16 h-16 object-cover rounded"
                />
                <div class="flex-1">
                  <div class="font-medium">{{ item.title }}</div>
                  <div class="text-sm text-neutral-500">x{{ item.quantity }}</div>
                  <div v-if="item.complements && item.complements.length > 0" class="mt-1">
                    <div v-for="(complement, i) in item.complements" :key="i" class="text-xs text-neutral-500 flex items-center gap-2 mt-1">
                      <img 
                        v-if="complement.image" 
                        :src="getImgUrl(complement.image)" 
                        :alt="complement.name" 
                        class="w-4 h-4 object-cover rounded-full"
                      />
                      <span>+ {{ complement.name || complement }}</span>
                    </div>
                  </div>
                </div>
                <div class="font-medium">€{{ item.price.toFixed(2) }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Totales y métodos de pago -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span>{{ $t('checkout.subtotal') || 'Subtotal' }}:</span>
          <span class="font-medium">€{{ (Number(subtotalPrice) || 0).toFixed(2) }}</span>
        </div>
        <!-- Gastos de envío -->
        <div class="flex justify-between items-center mb-2">
          <span>{{ $t('checkout.shipping') || 'Envío' }}:</span>
          <span class="font-medium">€{{ (Number(shippingCost) || 0).toFixed(2) }}</span>
        </div>
        <!-- Línea divisoria -->
        <div class="border-t border-dashed border-gray-300 my-3"></div>
        <!-- Total -->
        <div class="flex justify-between items-center font-bold text-lg">
          <span>{{ $t('checkout.total') || 'Total' }}:</span>
          <span class="text-primary-600">€{{ (Number(subtotalPrice) + Number(shippingCost) || 0).toFixed(2) }}</span>
        </div>

        <div class="mt-6 p-4 bg-neutral-50 rounded">
          <h3 class="font-medium mb-2">{{ $t('checkout.paymentMethod') || 'Método de pago' }}</h3>
          <div class="flex items-center gap-2">
            <div class="h-8 w-12 bg-neutral-200 rounded flex items-center justify-center">
              <img src="/images/visa.svg" alt="Visa" class="h-4" />
            </div>
            <p class="text-sm text-neutral-600">{{ t('checkout.cardEnding') || 'Tarjeta terminada en' }} **** 4242</p>
          </div>
        </div>
      </div>

      <!-- Información de seguimiento -->
      <div class="bg-neutral-50 p-4 rounded-md mb-8">
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-information-circle" class="text-primary-500 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-medium mb-1">{{ $t('checkout.trackingInfo') || 'Seguimiento del pedido' }}</h3>
            <p class="text-sm text-neutral-600">
              {{ $t('checkout.trackingMessage') || 'Recibirás un correo electrónico con la información de seguimiento una vez que tu pedido haya sido enviado.' }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          to="/"
          color="neutral"
          variant="outline"
          class="sm:w-auto"
        >
          {{ $t('checkout.continueShopping') || 'Continuar comprando' }}
        </UButton>
        <UButton
          v-if="!isGuestOrder"
          to="/account/orders"
          color="primary"
          class="sm:w-auto"
        >
          {{ $t('checkout.viewOrders') || 'Ver mis pedidos' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import { useI18n } from "vue-i18n";
import type {
  CheckoutDraft,
  DeliveryAddress,
  DeliveryContact
} from "~/types/types";

const { t, locale } = useI18n();
const config = useRuntimeConfig?.() || {};

// Función para construir la URL de la imagen
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

// Stores para acceder a los datos del pedido
const order = useOrderStore();
const cart = useCartStore();

// ID del pedido (generado aleatoriamente o recuperado del pedido)
const orderId = ref('');

// Información del pedido
const orderData = ref<CheckoutDraft | null>(null);
const shippingCost = ref(0);
const orderItems = ref<any[]>([]);
const cardNote = ref('');
const isGuestOrder = ref(true);

// Subtotal (sin envío)
const subtotalPrice = computed(() => {
  let total = 0;
  orderItems.value.forEach(item => {
    total += Number(item.price) * Number(item.quantity || 1);
  });
  return total;
});

// Total del pedido (subtotal + envío)
const totalPrice = computed(() => {
  return Number(subtotalPrice.value) + Number(shippingCost.value);
});

// Datos de envío
const shippingAddress = ref({
  recipientName: '',
  recipientSurname: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
  phone: '',
  deliveryDate: '',
  deliveryTime: '',
});

// Formatear fecha para mostrar
function formatDate(dateString: string) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return '';
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(locale.value || 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Formatear hora para mostrar
function formatTime(timeString: string) {
  if (!timeString) return '';
  return timeString;
}

// Generar un ID de pedido aleatorio
function generateOrderId() {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `FP-${timestamp}-${random}`;
}

// Función para obtener la fecha de mañana como string en formato YYYY-MM-DD
function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Cargar los datos del pedido
async function loadOrderData() {
  try {
    // Primero intentar obtener los datos del store de la orden
    if (order.shipping && order.items && order.items.length > 0) {
      console.log('Cargando datos del pedido desde el store de orden');

      isGuestOrder.value = order.userType === 'guest';
      
      // Datos de envío
      shippingAddress.value = {
        recipientName: order.shipping.contact?.recipientName || '',
        recipientSurname: order.shipping.contact?.recipientSurname || '',
        street: order.shipping.street || '',
        city: order.shipping.city || '',
        postalCode: order.shipping.postalCode || '',
        country: order.shipping.country || '',
        phone: order.shipping.contact?.phone || '',
        deliveryDate: order.deliveryDate || getTomorrow(),
        deliveryTime: order.deliveryTime || '12:00'
      };
      
      // Productos
      orderItems.value = order.items.map(item => ({
        title: item.title,
        quantity: item.quantity || 1,
        price: item.price,
        image: item.images && item.images.length > 0 ? item.images[0] : '',
        complements: (item as any).complements || []
      }));
      
      // Nota de la tarjeta y costo de envío
      cardNote.value = order.cardNote || '';
      
      // Obtener el costo de envío desde el store de la orden o del pedido
      const orderData = (order as any).orderData || {};
      shippingCost.value = typeof order.shippingCost === 'number' ? Number(order.shippingCost) : 0;
      
      console.log('Costo de envío cargado desde el store:', shippingCost.value);
      orderId.value = (order as any).id || generateOrderId();
      
      return;
    }
      // Si no hay datos en el store, intentar cargar desde localStorage
    console.log('Intentando cargar datos del pedido desde localStorage');
    const storedOrderData = localStorage.getItem('lastOrderData');
    
    if (storedOrderData) {
      try {
        const data = JSON.parse(storedOrderData) as CheckoutDraft;
        orderData.value = data;
        console.log('Datos del pedido cargados desde localStorage:', data);

        if (typeof data.userType === 'string') {
          isGuestOrder.value = data.userType === 'guest';
        }

        const delivery: DeliveryAddress | undefined = data.delivery;
        const contact: DeliveryContact | undefined = delivery?.contact;

        // Datos de envío (estructura CheckoutDraft)
        if (delivery) {
          shippingAddress.value = {
            recipientName: contact?.recipientName || '',
            recipientSurname: contact?.recipientSurname || '',
            street: delivery.street || '',
            city: delivery.city || '',
            postalCode: delivery.postalCode || '',
            country: delivery.country || '',
            phone: contact?.phone || '',
            deliveryDate: data.meta?.deliveryDate || getTomorrow(),
            deliveryTime: data.meta?.deliveryTime || '12:00'
          };
          console.log('Fecha y hora de entrega:', data.meta?.deliveryDate, data.meta?.deliveryTime);
        }
        
        // Productos
        if (data.items && data.items.length > 0) {
          orderItems.value = data.items.map((item: any) => ({
            title: item.title,
            quantity: item.quantity || 1,
            price: item.price,
            image: item.images && item.images.length > 0 ? item.images[0] : '',
            complements: item.complements || []
          }));
        }
        
        // Nota de la tarjeta y costo de envío (desde el objeto raíz)
        cardNote.value = data.meta?.cardNote || '';
        console.log('Nota de la tarjeta:', data.meta?.cardNote);

        // Obtener el costo de envío del objeto data
        shippingCost.value = data.meta?.shippingCost ?? (order as any).shippingCost ?? 0;

        console.log('Costo de envío cargado desde localStorage:', shippingCost.value);
        orderId.value = data.meta?.orderId || (order as any).id || generateOrderId();
      } catch (error) {
        console.error('Error al parsear los datos del pedido:', error);
      }
      
      return;
    }
    // Si no hay datos disponibles, generar datos por defecto
    console.log('No se encontraron datos del pedido, usando valores por defecto');
    orderId.value = generateOrderId();
  } catch (error) {
    console.error('Error al cargar los datos del pedido:', error);
    // Usar valores por defecto en caso de error
    orderId.value = generateOrderId();
  }
}

onMounted(async () => {
  // Intentar cargar los datos del pedido
  await loadOrderData();
  
  // Marcar el pedido como pagado y limpiar el carrito
  // Esto asegura que no se pueda volver a pagar el mismo pedido
  order.markPaid();
  cart.clearCart();
});
</script>

<style scoped>
/* Animación del check de éxito */
.success-checkmark {
  width: 80px;
  margin: 0 auto;
}

.success-checkmark .check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4CAF50;
}

.success-checkmark .check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

.success-checkmark .check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

.success-checkmark .check-icon::before, .success-checkmark .check-icon::after {
  content: '';
  height: 100px;
  position: absolute;
  background: #FFFFFF;
  transform: rotate(-45deg);
}

.success-checkmark .check-icon .icon-line {
  height: 5px;
  background-color: #4CAF50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

.success-checkmark .check-icon .icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}

.success-checkmark .check-icon .icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}

.success-checkmark .check-icon .icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, .5);
}

.success-checkmark .check-icon .icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #FFFFFF;
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>
