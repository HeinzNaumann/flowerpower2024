<template>
  <div>
    <transition name="fade-cart">
      <div
        v-if="open"
        class="fixed inset-0 z-40 transition-opacity duration-300"
        style="background-color: rgba(0, 0, 0, 0.35)"
        @click="$emit('update:open', false)"
      ></div>
    </transition>
    <transition name="slide-cart">
      <aside
        v-if="open"
        class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
        @click.stop
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-semibold">
            {{ $t("cart.title") || "Tu carrito" }}
          </h2>
          <button
            @click="$emit('update:open', false)"
            class="text-2xl hover:text-red-500 cursor-pointer transition-colors duration-200"
          >
            &times;
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div
            v-if="cart.items.length === 0"
            class="text-center text-gray-400 py-16"
          >
            <span>{{ $t("cart.empty") || "El carrito está vacío." }}</span>
          </div>
          <div v-else>
            <div
              v-for="item in cart.items.filter((i) => !i.isComplement)"
              :key="item.id"
              class="mb-6 border-b pb-4"
            >
              <div class="flex gap-3 items-center">
                <img
                  v-if="item.images"
                  :src="getImgUrl(item.images)"
                  :alt="item.title"
                  class="w-16 h-16 object-cover rounded border"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-lg truncate">{{
                      item.title
                    }}</span>
                    <span
                      v-if="item.quantity > 1"
                      class="ml-2 text-xs bg-gray-200 rounded px-2"
                      >x{{ item.quantity }}</span
                    >
                  </div>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <template
                      v-for="sub in cart.items.filter(
                        (sub) =>
                          sub.isComplement && sub.parentProductId === item.id
                      )"
                      :key="sub.id"
                    >
                      <span
                        class="flex items-center gap-1 bg-[#ffeecb] border border-[#db9526] text-[#a67c1a] text-xs rounded px-2 py-1"
                      >
                        <img
                          v-if="sub.images && sub.images.length"
                          :src="getImgUrl(sub.images[0])"
                          :alt="sub.title"
                          class="w-5 h-5 object-cover rounded-full border bg-white"
                        />
                        <span class="truncate"
                          >{{ sub.title }} ({{ sub.quantity }})</span
                        >
                        <button
                          @click="cart.removeItem(sub.id)"
                          class="ml-1 text-[#a67c1a] hover:text-red-500 transition-colors duration-200 cursor-pointer"
                        >
                          <span class="text-xs">&times;</span>
                        </button>
                      </span>
                    </template>
                  </div>
                </div>
                <button
                  @click="cart.removeItem(item.id)"
                  class="text-red-500 hover:underline text-sm ml-2 cursor-pointer transition-colors duration-200"
                >
                  {{ $t("cart.remove") || "Eliminar" }}
                </button>
              </div>
              <div class="flex justify-between mt-2">
                <span class="font-semibold"
                  >€
                  {{
                    (
                      item.price * item.quantity +
                      cart.items
                        .filter(
                          (sub) =>
                            sub.isComplement && sub.parentProductId === item.id
                        )
                        .reduce((sum, sub) => sum + sub.price * sub.quantity, 0)
                    ).toFixed(2)
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="border-t p-4">
          <div class="flex justify-between items-center mb-4">
            <span class="font-semibold">{{
              $t("cart.total") || "Total:"
            }}</span>
            <span class="text-xl font-bold"
              >€ {{ groupedTotal.toFixed(2) }}</span
            >
          </div>
          <button
            @click="goToCheckout"
            class="checkout-flowerpower w-full py-3 mt-2 rounded-full text-sm text-white shadow-md transition-all duration-200 bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 hover:from-pink-500 hover:via-yellow-400 hover:to-green-500 hover:scale-105 hover:shadow-lg focus:outline-none font-medium focus:ring-2 focus:ring-pink-300"
          >
            <span class="flex items-center justify-center gap-2 text-sm">
              {{ $t("cart.checkout") || "Finalizar compra" }}
            </span>
          </button>
        </div>
      </aside>
    </transition>

    <!-- Login/Register Modal -->
    <LoginRegister
      v-model:open="showLoginRegisterModal"
      @logged-in="handleModalLoginSuccess"
      @registered="handleModalRegisterSuccess"
      @continued-as-guest="handleModalContinueAsGuest"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { computed, watch, onMounted, onUnmounted, watchEffect, ref } from "vue";

import { UButton } from "#components";
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { useLocalePath } from "#i18n";
import LoginRegister from "~/components/LoginRegister.vue"; // Import the modal component

const props = withDefaults(defineProps<{
  open: boolean;
}>(), {
  open: false
});
const emit = defineEmits(["update:open"]);

const { isAuthenticated } = useAuth();
const router = useRouter();
const localePath = useLocalePath();
const cart = useCartStore();

// State for controlling the LoginRegister modal
const showLoginRegisterModal = ref(false);

function goToCheckout() {
  // Close the cart drawer first in all cases
  emit("update:open", false);

  if (!isAuthenticated()) {
    // If not authenticated, open the LoginRegister modal instead of redirecting
    showLoginRegisterModal.value = true;
  } else {
    // If authenticated, proceed directly to the checkout page
    router.push(localePath("/checkout/checkout")); // Changed from /checkout/checkout for consistency
  }
}

// --- Handlers for LoginRegister Modal Events ---

function handleModalLoginSuccess() {
  // User logged in via modal, proceed to checkout
  console.log("Login successful via modal, navigating to checkout...");
  router.push(localePath("/checkout/checkout"));
  // Modal closes itself via v-model:open
}

function handleModalRegisterSuccess() {
  // User registered via modal.
  // Modal shows success message and closes itself.
  // No immediate navigation needed, user might need to verify email first.
  console.log("Registration successful via modal.");
  // Optionally, you could navigate somewhere or just let the modal close.
}

function handleModalContinueAsGuest() {
  // User chose 'Continue as Guest' via modal, proceed to checkout
  console.log("Continuing as guest via modal, navigating to checkout...");
  // Potentially set a guest flag in your store here if needed
  // e.g., const orderStore = useOrderStore(); orderStore.setIsGuest(true);
  router.push(localePath("/checkout/checkout"));
  // Modal closes itself via v-model:open
}

// Debug: Mostrar formato de imágenes
onMounted(() => {
  // Inspeccionar cada item para ver su estructura exacta
  cart.items.forEach((item, index) => {
    if (item.images) {
      if (Array.isArray(item.images)) {
      } else {
      }
    }
  });
});

// Obtén el config fuera de la función
const config = useRuntimeConfig();

function getImgUrl(img: string | string[]) {
  if (!img) return "";

  // Si es un array, toma el primer elemento
  if (Array.isArray(img)) {
    if (img.length === 0) return "";
    img = img[0];
  }

  // Si ya es una URL completa (http o https), úsala directamente
  if (img.startsWith("http")) return img;

  // Si contiene 'files/product' pero no tiene la URL completa, añádela
  if (
    img.includes("files/product") &&
    !img.includes(config.public.apiBaseUrl)
  ) {
    return `${config.public.apiBaseUrl}${
      img.startsWith("/") ? img : "/" + img
    }`;
  }

  // Para rutas relativas, añade '/' al principio si no lo tiene
  return img.startsWith("/") ? img : "/" + img;
}

const groupedTotal = computed(() => {
  return cart.items
    .filter((item) => !item.isComplement)
    .reduce((sum, item) => {
      const subTotal = cart.items
        .filter((sub) => sub.isComplement && sub.parentProductId === item.id)
        .reduce((subSum, sub) => subSum + sub.price * sub.quantity, 0);
      return sum + item.price * item.quantity + subTotal;
    }, 0);
});

function handleKeydown(e: KeyboardEvent) {
  if (props.open && (e.key === "Escape" || e.key === "Esc")) {
    emit("update:open", false);
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
// Cerrar el drawer automáticamente cuando el carrito esté vacío
watchEffect(() => {
  if (props.open && cart.items.length === 0) {
    emit("update:open", false);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.checkout-flowerpower {
  background: #db9c27;
  border: none;
  color: #111;
  font-family: "Montserrat", "Inter", Arial, sans-serif;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 14px;
  padding: 0.75rem 2.5rem;
  transition: background 0.2s;
  box-shadow: none;
}
.checkout-flowerpower:hover {
  background: #b97d1a;
  color: #111;
}

.slide-cart-enter-active,
.slide-cart-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
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
.fade-cart-enter-active,
.fade-cart-leave-active {
  transition: opacity 0.3s;
}
.fade-cart-enter-from,
.fade-cart-leave-to {
  opacity: 0;
}
.fade-cart-enter-to,
.fade-cart-leave-from {
  opacity: 1;
}
</style>
