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
          
          <!-- Cart items list with client-only to prevent hydration issues -->
          <ClientOnly>
            <template #default>
              <div v-if="cartItems.length === 0" class="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-md">
                {{ $t('checkout.noItemsError') }}
              </div>
              
              <!-- Productos en el carrito -->
              <div v-else class="mb-6">
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
            </template>
          </ClientOnly>

          <!-- Información de envío -->
          <ClientOnly>
            <template #default>
              <div class="border-t pt-4 mb-4">
                <h3 class="font-medium mb-2">{{ $t('checkout.shippingInfo') || 'Información de envío' }}</h3>
                <div class="text-sm text-neutral-600">
                  <p>{{ shippingAddress.recipientName }} {{ shippingAddress.recipientSurname }}</p>
                  <p>{{ shippingAddress.street }}</p>
                  <p>{{ shippingAddress.postalCode }}, {{ shippingAddress.city }}</p>
                  <p>{{ shippingAddress.country }}</p>
                  <p v-if="shippingAddress.phone" class="mt-1">
                    {{ $t('checkout.deliveryPhoneSummary') || 'Teléfono' }}: {{ shippingAddress.phone }}
                  </p>
                  <p class="mt-2">
                    {{ $t('checkout.delivery') || 'Entrega' }}: {{ formatDate(shippingAddress.deliveryDate) }} - {{ formatTime(shippingAddress.deliveryTime) }}
                  </p>
                </div>
              </div>
            </template>
          </ClientOnly>

          <!-- Totales -->
          <ClientOnly>
            <template #default>
              <div class="border-t pt-4">
                <div class="flex justify-between mb-1">
                  <span>{{ $t('checkout.subtotal') || 'Subtotal' }}:</span>
                  <span>€{{ (Number(subtotalPrice) || 0).toFixed(2) }}</span>
                </div>
                <div class="flex justify-between mb-1">
                  <span>{{ $t('checkout.shipping') || 'Envío' }}:</span>
                  <span>€{{ (Number(shippingCost) || 0).toFixed(2) }}</span>
                </div>
                <div class="flex justify-between font-bold text-lg mt-2">
                  <span>{{ $t('checkout.total') || 'Total' }}:</span>
                  <span>€{{ (Number(subtotalPrice) + Number(shippingCost) || 0).toFixed(2) }}</span>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>

        <!-- Columna derecha: Opciones de pago -->
        <div class="md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
          <ClientOnly>
            <template #default>
              <h2 class="text-xl font-semibold mb-4">{{ $t('checkout.paymentMethod') || 'Método de pago' }}</h2>
              
              <!-- Opciones de pago -->
              <div class="mb-6">
                <div class="flex items-center justify-between border p-4 rounded-md bg-emerald-50 border-emerald-200">
                  <div class="flex items-center gap-2">
                    <!-- Inline credit-card icon to avoid runtime fetches -->
                    <svg class="text-emerald-600 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                      <line x1="6" y1="15" x2="10" y2="15"></line>
                    </svg>
                    <span class="font-medium">{{ $t('checkout.creditCard') || 'Tarjeta de crédito/débito' }}</span>
                  </div>
                  <div class="flex gap-2">
                    <img :src="visaLogo" alt="Visa" class="h-6" />
                    <img :src="mastercardLogo" alt="Mastercard" class="h-6" />
                    <img :src="amexLogo" alt="American Express" class="h-6" />
                  </div>
                </div>
              </div>

              <!-- Titular de la tarjeta -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-1">{{ $t('checkout.cardholderName') || 'Titular de la tarjeta' }}</label>
                <div class="relative">
                  <input 
                    v-model="cardholder"
                    type="text" 
                    class="w-full py-4 px-3 min-h-[54px] bg-emerald-50 border border-emerald-100 rounded-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300" 
                    :placeholder="$t('checkout.cardholderNamePlaceholder') || 'Nombre completo'"
                  />
                </div>
              </div>

              <!-- Payment Element unificado -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-1">{{ $t('checkout.paymentCard') || 'Detalles de la tarjeta' }}</label>
                <div v-if="loadingStripe" class="flex justify-center items-center h-24">
                  <!-- Inline spinner icon -->
                  <svg class="animate-spin h-7 w-7 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
                <div v-show="!loadingStripe">
                  <!-- Payment Element contendrá todos los campos de pago -->
                  <div :key="order.paymentIntentId || order.clientSecret || 'no-secret'">
                    <div id="payment-element" class="py-4 px-3 mb-4 min-h-[200px] bg-emerald-50 border border-emerald-100 rounded-lg transition-shadow"></div>
                  </div>
                </div>
                <div class="text-xs text-neutral-500 mb-4">
                  {{ $t('checkout.cardInfo') || 'Introduce los datos de tu tarjeta para completar el pago.' }}
                </div>
              </div>
            </template>
          </ClientOnly>
          
          <!-- Botón de pago -->
          <ClientOnly>
            <template #default>
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
              
              <!-- Mensajes -->
              <div v-if="!isValidOrder && !error" class="mt-4 p-3 bg-amber-50 text-amber-700 rounded-md text-sm">
                {{ $t('checkout.invalidOrderMessage') || 'No hay productos válidos para realizar el pago' }}
              </div>
              <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {{ error }}
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import { useI18n } from "vue-i18n";
import type {
  CheckoutDraft,
  CustomerContact,
  DeliveryAddress,
  DeliveryContact
} from "~/types/types";

// Import credit card logos
import visaLogo from '~/assets/images/visa.svg';
import mastercardLogo from '~/assets/images/mastercard.svg';
import amexLogo from '~/assets/images/amex.svg';

// Helpers globales
function getImgUrl(img: string | string[]): string {
  if (!img) return "";
  const str = Array.isArray(img) ? img[0] : img;
  if (str.startsWith("http")) return str;
  if (str.startsWith("images/")) return `/${str}`;
  return `/images/${str}`;
}
function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString)
    .toLocaleDateString(locale.value, { day: "2-digit", month: "2-digit", year: "numeric" });
}
function formatTime(timeString: string): string {
  return timeString || "";
}

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const stripePublicKey = config.public.stripePublicKey;
if (!stripePublicKey) console.error("STRIPE_PUBLIC_KEY no definida.");
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const order = useOrderStore();
const cart = useCartStore();
const orderDraft = ref<CheckoutDraft | null>(null);

function loadStoredDraft() {
  if (!process.client) return;
  try {
    const raw = localStorage.getItem("lastOrderData");
    if (!raw) {
      orderDraft.value = null;
      return;
    }
    const parsed = JSON.parse(raw) as CheckoutDraft;
    orderDraft.value = parsed;
  } catch (error) {
    console.error("Error parsing checkout draft:", error);
    orderDraft.value = null;
  }
}
const router = useRouter();

const loading = ref(false);
const paymentLoading = ref(false);
const loadingStripe = ref(true);
const error = ref("");
const stripe = shallowRef<any>(null);
const elements = shallowRef<any>(null);
const paymentElement = shallowRef<any>(null);
const lastClientSecret = ref<string | null>(null);
const cardNumber = ref<any>(null); // kept for backward compatibility where used below
const cardExpiry = ref<any>(null);
const cardCvc = ref<any>(null);
const cardholder = ref("");

// Computeds carrito y envío
const cartItems = computed(() => {
  if (order.items?.length) return order.items;
  if (orderDraft.value?.items?.length) return orderDraft.value.items;
  return cart.items || [];
});

const shippingCost = computed(() => {
  if (typeof order.shippingCost === "number" && order.shippingCost >= 0) {
    return order.shippingCost;
  }
  const draftCost = orderDraft.value?.meta?.shippingCost;
  return typeof draftCost === "number" ? draftCost : 0;
});

const subtotalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0)
);

const totalPrice = computed(() =>
  order.total > 0 ? Number(order.total) : subtotalPrice.value + shippingCost.value
);

interface ShippingSummary {
  recipientName: string;
  recipientSurname: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  deliveryDate: string;
  deliveryTime: string;
}

const shippingAddress = computed<ShippingSummary>(() => {
  const delivery: DeliveryAddress | undefined = order.shipping || orderDraft.value?.delivery || undefined;
  const contact: DeliveryContact | undefined = delivery?.contact || orderDraft.value?.delivery?.contact;
  const deliveryDate = order.deliveryDate || orderDraft.value?.meta?.deliveryDate || "";
  const deliveryTime = order.deliveryTime || orderDraft.value?.meta?.deliveryTime || "";

  return {
    recipientName: contact?.recipientName || "",
    recipientSurname: contact?.recipientSurname || "",
    street: delivery?.street || "",
    city: delivery?.city || "",
    postalCode: delivery?.postalCode || "",
    country: delivery?.country || "",
    phone: contact?.phone || "",
    deliveryDate,
    deliveryTime
  };
});

const customerContact = computed<CustomerContact | null>(() => {
  if (order.customer) return order.customer;
  return orderDraft.value?.customer ?? null;
});

// Validación orden
const isValidOrder = computed(() => order.clientSecret ? true : (totalPrice.value > 0 && cartItems.value.length > 0));

function updateDebugLogs() {
  console.log("[DEBUG] Orden:", {
    totalPrice: totalPrice.value,
    items: cartItems.value.length,
    secret: !!order.clientSecret
  });
}
onMounted(updateDebugLogs);

// Limpieza segura del Payment Element
function unmountStripe() {
  try {
    paymentElement.value?.unmount?.();
  } catch {}
  paymentElement.value = null;
  elements.value = null;
}

// Payment Element (moderna)
async function initializeStripe() {
  if (!process.client) return;
  if (!order.clientSecret) {
    error.value = t("checkout.invalidOrderMessage")||"Falta clientSecret";
    loadingStripe.value = false;
    setTimeout(() => router.push("/checkout/checkout"), 1500);
    return;
  }
  if (!stripePromise) {
    error.value = "Error configuración Stripe";
    loadingStripe.value = false;
    return;
  }
  // Evitar re-inicializar si ya está montado con el mismo clientSecret
  if (elements.value && lastClientSecret.value === order.clientSecret) {
    loadingStripe.value = false;
    return;
  }
  // Si existe pero con otro secret, desmontar primero
  if (elements.value && lastClientSecret.value !== order.clientSecret) {
    unmountStripe();
  }
  loading.value = true;
  try {
    // Estado optimista: estamos montando el Payment Element, aseguramos feedback en UI
    order.setStatusForUi("pending");
    stripe.value = await stripePromise;
    const appearance = {
      theme: "flat",
      variables: {
        colorPrimary: "#10b981",
        colorText: "#1a202c",
        colorBackground: "#f9fafb",
        colorDanger: "#e11d48",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        borderRadius: "14px",
        spacingUnit: "6px"
      }
    };
    elements.value = stripe.value.elements({ 
      clientSecret: order.clientSecret, 
      appearance,
      locale: locale.value === 'es' ? 'es' : 'en',
      loader: 'auto'
    });
    paymentElement.value = elements.value.create('payment', { 
      layout: 'tabs',
      wallets: {
        applePay: 'auto',
        googlePay: 'auto'
      },
      fields: {
        billingDetails: {
          email: 'never',
          name: 'auto',
          phone: 'auto',
          address: 'auto'
        }
      }
    });
    await nextTick();
    paymentElement.value.mount('#payment-element');
    paymentElement.value.on('change', (event: any) => {
      if (event.error) error.value = event.error.message; else error.value = '';
    });
    // Guardar referencia legacy
    cardNumber.value = paymentElement.value;
    lastClientSecret.value = order.clientSecret;
  } catch (e) {
    error.value = `Error Stripe: ${e instanceof Error ? e.message : e}`;
  } finally {
    loadingStripe.value = false;
  }
}

async function processPayment() {
  if (!isValidOrder.value) {
    error.value = t("checkout.invalidOrder")||"Orden inválida"; return;
  }
  if (!stripe.value || !elements.value) {
    error.value = t("checkout.stripeNotReady")||"Pago no listo"; return;
  }
  
  // Prevenir doble click
  if (paymentLoading.value) return;
  
  paymentLoading.value = true; 
  error.value = "";
  
  try {
    // Usar confirmPayment con Payment Element (API moderna)
    order.setStatusForUi("processing");
    const fallbackNameParts: string[] = [];
    if (customerContact.value?.name) fallbackNameParts.push(customerContact.value.name);
    if (customerContact.value?.surname) fallbackNameParts.push(customerContact.value.surname);
    if (!fallbackNameParts.length) {
      if (shippingAddress.value.recipientName) fallbackNameParts.push(shippingAddress.value.recipientName);
      if (shippingAddress.value.recipientSurname) fallbackNameParts.push(shippingAddress.value.recipientSurname);
    }
    const mergedName = fallbackNameParts.join(" ").trim();
    const billingName = cardholder.value || mergedName;
    const billingEmail = customerContact.value?.email || "";

    const { error: confirmError, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: billingName,
            email: billingEmail
          }
        }
      },
      redirect: 'if_required' // Solo redirige si es necesario (3DS)
    });
    
    if (confirmError) {
      // Error en el pago
      error.value = confirmError.message || t("checkout.paymentFailed") || "Pago fallido";
      console.error('Error en confirmPayment:', confirmError);
      order.setStatusForUi("failed");
    } else {
      // Pago exitoso (sin redirección)
      console.log('Pago completado exitosamente', paymentIntent?.id ? `PaymentIntent: ${paymentIntent.id}` : '');

      if (paymentIntent?.id) {
        await order.markPaid({ id: paymentIntent.id });
      } else {
        await order.markPaid();
      }
      await cart.clearCart();
      
      // Redirigir a página de éxito
      router.push("/checkout/success");
    }
    
  } catch (e) {
    console.error('Error inesperado en processPayment:', e);
    error.value = t("checkout.processError") || "Error inesperado";
    order.setStatusForUi("failed");
  } finally {
    paymentLoading.value = false;
  }
}

// Inicializar en cliente y re-inicializar solo cuando cambie el clientSecret
onMounted(() => {
  loadStoredDraft();
  initializeStripe();
});

watch(() => order.clientSecret, async (n, o) => {
  if (!process.client) return;
  if (n && n !== o) {
    loadingStripe.value = true;
    await nextTick();
    await initializeStripe();
  }
});

onBeforeUnmount(() => {
  unmountStripe();
});
</script>
