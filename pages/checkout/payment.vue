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
                  <p>{{ shippingAddress.name }} {{ shippingAddress.surname }}</p>
                  <p>{{ shippingAddress.address || shippingAddress.street }}</p>
                  <p>{{ shippingAddress.zip || shippingAddress.postalCode }}, {{ shippingAddress.city }}</p>
                  <p>{{ shippingAddress.country }}</p>
                  <p class="mt-2">{{ $t('checkout.delivery') || 'Entrega' }}: {{ formatDate(shippingAddress.deliveryDate) }} - {{ formatTime(shippingAddress.deliveryTime) }}</p>
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
                    <UIcon name="i-heroicons-credit-card" class="text-emerald-600" />
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

              <!-- Detalles de la tarjeta -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-1">{{ $t('checkout.paymentCard') || 'Detalles de la tarjeta' }}</label>
                <div v-if="loadingStripe" class="flex justify-center items-center h-24">
                  <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl text-emerald-600" />
                </div>
                <div v-show="!loadingStripe">
                  <div id="card-number-element" class="py-4 px-3 mb-4 min-h-[54px] bg-emerald-50 border border-emerald-100 rounded-lg transition-shadow"></div>
                  <div class="flex gap-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1">{{ $t('checkout.cardExpiry') || 'Caducidad' }}</label>
                      <div id="card-expiry-element" class="py-4 px-3 mb-4 min-h-[54px] bg-emerald-50 border border-emerald-100 rounded-lg transition-shadow"></div>
                    </div>
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1">CVC</label>
                      <div id="card-cvc-element" class="py-4 px-3 mb-4 min-h-[54px] bg-emerald-50 border border-emerald-100 rounded-lg transition-shadow"></div>
                    </div>
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
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import { useI18n } from "vue-i18n";

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
const router = useRouter();

const loading = ref(false);
const paymentLoading = ref(false);
const loadingStripe = ref(true);
const error = ref("");
const stripe = ref<any>(null);
const elements = ref<any>(null);
const cardNumber = ref<any>(null);
const cardExpiry = ref<any>(null);
const cardCvc = ref<any>(null);
const cardholder = ref("");

// Computeds carrito y envío
const cartItems = computed(() => order.items?.length ? order.items : (cart.items || []));
const shippingCost = computed(() => {
  if (order.shippingCost !== undefined) return order.shippingCost;
  try {
    const data = localStorage.getItem("lastOrderData");
    if (data) {
      const d = JSON.parse(data);
      if (d.shippingCost !== undefined) return d.shippingCost;
    }
  } catch {}
  return 0;
});
const subtotalPrice = computed(() => cartItems.value.reduce((s, i) => s + i.price * (i.quantity||1), 0));
const totalPrice = computed(() => order.total > 0 ? Number(order.total) : subtotalPrice.value + shippingCost.value);

interface ShippingAddress {
  name: string; surname: string; address?: string; street?: string;
  city: string; zip?: string; postalCode?: string; country: string;
  deliveryDate: string; deliveryTime: string;
}
const shippingAddress = computed<ShippingAddress>(() => {
  if (order.shipping) {
    const o = order as any;
    return {
      name: order.shipping.name||"", surname: order.shipping.surname||"",
      address: order.shipping.street||"", street: order.shipping.street||"",
      city: order.shipping.city||"", zip: order.shipping.postalCode||"",
      postalCode: order.shipping.postalCode||"", country: order.shipping.country||"",
      deliveryDate: o.shipping?.deliveryDate||"", deliveryTime: o.shipping?.deliveryTime||""
    };
  }
  return { name:"",surname:"",address:"",street:"",city:"",zip:"",postalCode:"",country:"",deliveryDate:"",deliveryTime:"" };
});

// Validación orden
const isValidOrder = computed(() => order.clientSecret ? true : (totalPrice.value > 0 && cartItems.value.length > 0));

function updateDebugLogs() {
  console.log("[DEBUG] Orden:", {
    totalPrice: totalPrice.value, items: cartItems.value.length, secret: !!order.clientSecret
  });
}
onMounted(updateDebugLogs);

// Stripe Split Fields
async function initializeStripe() {
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
  loading.value = true;
  try {
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
      },
      rules: {
        ".Input": {
          border: "none",
          borderBottom: "2px solid #d1fae5",
          backgroundColor: "transparent",
          padding: "14px 0 10px 0",
          fontWeight: "600",
          color: "#1a202c"
        },
        ".Input:focus": { borderBottomColor: "#10b981" },
        ".Label": { fontWeight: "700", fontSize: "16px" },
        ".Error": { color: "#e11d48", fontWeight: "600", fontSize: "14px" }
      }
    };
    elements.value = stripe.value.elements({ clientSecret: order.clientSecret, appearance });
    cardNumber.value = elements.value.create("cardNumber");
    cardExpiry.value = elements.value.create("cardExpiry");
    cardCvc.value = elements.value.create("cardCvc");
    await nextTick();
    cardNumber.value.mount("#card-number-element");
    cardExpiry.value.mount("#card-expiry-element");
    cardCvc.value.mount("#card-cvc-element");
    [cardNumber, cardExpiry, cardCvc].forEach(el => {
      el.value.on("change", (e:any) => { error.value = e.error?.message||""; });
    });
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
  paymentLoading.value = true; error.value = "";
  try {
    const result = await stripe.value.confirmCardPayment(order.clientSecret, {
      payment_method: {
        card: cardNumber.value,
        billing_details: {
          name: cardholder.value||`${order.shipping?.name||""} ${order.shipping?.surname||""}`.trim(),
          email: order.shipping?.email||""
        }
      },
      return_url: `${window.location.origin}/checkout/success`
    });
    if (result.error) {
      error.value = result.error.message||t("checkout.paymentFailed")||"Pago fallido";
    } else if (result.paymentIntent?.status==="succeeded") {
      await order.markPaid(result.paymentIntent.id);
      await cart.clearCart();
      router.push("/checkout/success");
    } else if (result.paymentIntent?.status==="requires_action") {
      // 3DS handling by Stripe
    } else {
      error.value = `Estado intermedio: ${result.paymentIntent?.status||"?"}`;
    }
  } catch (e) {
    error.value = t("checkout.processError")||"Error inesperado";
  } finally {
    paymentLoading.value = false;
  }
}

onMounted(() => {
  setTimeout(() => initializeStripe(), 500);
});
</script>
