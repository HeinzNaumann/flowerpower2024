<!-- UserAccount.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- encabezado -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">{{ $t("userPanel.myAccount") }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- sidebar -->
      <aside class="md:col-span-1">
        <hr />
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'w-full text-left px-4 py-2 rounded-lg cursor-pointer',
            activeTab === tab.id
              ? 'bg-primary-500 text-white'
              : 'hover:bg-neutral-100',
          ]"
        >
          {{ $t(tab.label) }}
        </button>

        <hr class="mt-10" />

        <button
          class="w-full text-left px-4 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer mt-2"
          @click.prevent="showLogoutModal = true"
        >
          {{ $t("userPanel.logout") }}
        </button>
      </aside>

      <!-- main panel -->
      <section class="md:col-span-3 bg-white p-6 rounded-lg shadow">
        <!-- PROFILE FORM ---------------------------------------------------- -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.profile") }}
          </h2>

          <form
            class="space-y-4 grid grid-cols-2 gap-6"
            @submit.prevent="handleSave"
          >
            <!-- datos personales -->
            <UFormField :error="errors.name">
              <UInput
                v-model="form.name"
                :placeholder="$t('userPanel.namePlaceholder')"
                class="w-full"
              />
            </UFormField>
            <UFormField :error="errors.surname">
              <UInput
                v-model="form.surname"
                :placeholder="$t('userPanel.surnamePlaceholder')"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('userPanel.email')" :error="errors.email">
              <UInput
                v-model="form.email"
                type="email"
                :placeholder="$t('userPanel.emailPlaceholder')"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('userPanel.phone')" :error="errors.phone">
              <div class="flex gap-2 w-full">
                <select
                  v-model="form.phonePrefix"
                  class="w-full px-2 py-1 bg-neutral-100 rounded"
                >
                  <option
                    v-for="p in phonePrefixes"
                    :key="p.value"
                    :value="p.value"
                  >
                    {{ p.label }}
                  </option>
                </select>
                <UInput
                  v-model="form.phone"
                  :placeholder="$t('userPanel.phonePlaceholder')"
                  class="w-full"
                />
              </div>
            </UFormField>

            <!-- shipping -->
            <UFormField :label="$t('userPanel.street')" :error="errors.street">
              <UInput
                v-model="form.street"
                :placeholder="$t('userPanel.streetPlaceholder')"
                class="w-full"
              />
            </UFormField>
            <UFormField :label="$t('userPanel.city')" :error="errors.city">
              <UInput
                v-model="form.city"
                :placeholder="$t('userPanel.cityPlaceholder')"
                class="w-full"
              />
            </UFormField>
            <UFormField
              :label="$t('userPanel.postalCode')"
              :error="errors.postalCode"
            >
              <UInput
                v-model="form.postalCode"
                :placeholder="$t('userPanel.postalCodePlaceholder')"
                class="w-full"
              />
            </UFormField>
            <UFormField
              :label="$t('userPanel.country')"
              :error="errors.country"
            >
              <UInput
                v-model="form.country"
                :placeholder="$t('userPanel.countryPlaceholder')"
                class="w-full"
              />
            </UFormField>

            <!-- toggle billing -->
            <UFormField class="col-span-2">
              <label class="inline-flex items-center">
                <input
                  v-model="showBilling"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-primary-500"
                />
                <span class="ml-2">{{
                  $t("userPanel.showBillingAddress")
                }}</span>
              </label>
            </UFormField>

            <!-- billing -->
            <transition name="fade">
              <div
                v-if="showBilling"
                class="col-span-2 grid grid-cols-2 gap-6 bg-neutral-50 p-4 rounded"
              >
                <h3 class="text-lg font-medium col-span-2">
                  {{ $t("userPanel.billingAddress") }}
                </h3>

                <UFormField
                  :label="$t('userPanel.street')"
                  :error="errors.billingStreet"
                >
                  <UInput
                    v-model="form.billingStreet"
                    :placeholder="$t('userPanel.streetPlaceholder')"
                    class="w-full"
                  />
                </UFormField>
                <UFormField
                  :label="$t('userPanel.city')"
                  :error="errors.billingCity"
                >
                  <UInput
                    v-model="form.billingCity"
                    :placeholder="$t('userPanel.cityPlaceholder')"
                    class="w-full"
                  />
                </UFormField>
                <UFormField
                  :label="$t('userPanel.postalCode')"
                  :error="errors.billingPostalCode"
                >
                  <UInput
                    v-model="form.billingPostalCode"
                    :placeholder="$t('userPanel.postalCodePlaceholder')"
                    class="w-full"
                  />
                </UFormField>
                <UFormField
                  :label="$t('userPanel.country')"
                  :error="errors.billingCountry"
                >
                  <UInput
                    v-model="form.billingCountry"
                    :placeholder="$t('userPanel.countryPlaceholder')"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </transition>

            <!-- save button -->
            <div class="col-span-2">
              <UButton
                type="submit"
                color="primary"
                class="w-full"
                :loading="saving"
              >
                {{ $t("userPanel.saveChanges") }}
              </UButton>
              <p v-if="serverError" class="mt-2 text-sm text-red-600">
                {{ serverError }}
              </p>
            </div>
          </form>
        </div>

        <!-- ORDERS LIST ---------------------------------------------------- -->
        <div v-if="activeTab === 'orders'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.orders") }}
          </h2>

          <div v-if="orders.length" class="space-y-6">
            <div v-for="o in orders" :key="o.id" class="border rounded-lg overflow-hidden">
              <!-- Encabezado del pedido -->
              <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <h3 class="font-semibold">Pedido #{{ formatOrderNumber(o.id) }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ formatDateTime(o.createdAt || o.date, true) }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <UBadge :color="orderColor(o.status)" size="lg" variant="subtle">
                    {{ $t(`orderStatus.${o.status}`) }}
                  </UBadge>
                  <span class="text-lg font-semibold">{{ formatPrice(o.total) }}</span>
                </div>
              </div>

              <!-- Botón para expandir/colapsar detalles -->
              <div 
                class="flex items-center justify-between px-4 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100"
                @click="toggleOrderDetails(o.id)"
              >
                <span class="text-sm font-medium text-gray-700">
                  {{ expandedOrderId === o.id ? 'Ocultar detalles' : 'Ver detalles' }}
                </span>
                <UIcon 
                  :name="expandedOrderId === o.id ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                  class="w-5 h-5 text-gray-500"
                />
              </div>

              <!-- Detalles del pedido (con transición) -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[2000px]"
                leave-from-class="opacity-100 max-h-[2000px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="expandedOrderId === o.id" class="overflow-hidden">
                  <div class="p-4">
                    <!-- Información de entrega -->
                    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 class="font-medium text-gray-700 mb-3">Información de entrega</h4>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p class="text-sm text-gray-500">Fecha de entrega</p>
                          <p class="font-medium">
                            {{ o.deliveryDate ? formatDateTime(o.deliveryDate) : 'No especificada' }}
                          </p>
                        </div>
                        <div>
                          <p class="text-sm text-gray-500">Hora de entrega</p>
                          <p class="font-medium">
                            {{ o.deliveryTime || 'No especificada' }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Direcciones -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 class="font-medium text-gray-700 mb-2">Dirección de envío</h4>
                        <div v-if="o.shipping" class="text-sm text-gray-600 space-y-1">
                          <p>{{ o.shipping.name }} {{ o.shipping.surname }}</p>
                          <p>{{ o.shipping.street }}</p>
                          <p>{{ o.shipping.postalCode }} {{ o.shipping.city }}</p>
                          <p>{{ o.shipping.country }}</p>
                          <p v-if="o.shipping.phone" class="mt-2">
                            <UIcon name="i-heroicons-phone" class="mr-1" />
                            {{ o.shipping.phone }}
                          </p>
                        </div>
                        <p v-else class="text-sm text-gray-500">No especificada</p>
                      </div>
                      <div v-if="o.billing">
                        <h4 class="font-medium text-gray-700 mb-2">Dirección de facturación</h4>
                        <div class="text-sm text-gray-600 space-y-1">
                          <p>{{ o.billing.name }} {{ o.billing.surname || '' }}</p>
                          <p>{{ o.billing.street }}</p>
                          <p>{{ o.billing.postalCode }} {{ o.billing.city }}</p>
                          <p>{{ o.billing.country }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Artículos del pedido -->
                    <div class="mb-6">
                      <h4 class="font-medium text-gray-700 text-lg mb-3">Artículos del pedido</h4>
                      <div v-if="o.items && o.items.length" class="space-y-4">
                        <div v-for="(item, index) in o.items" :key="index" class="bg-white rounded-lg p-4 border border-gray-100">
                          <div class="grid grid-cols-12 gap-4">
                            <!-- Imagen del producto si está disponible -->
                            <div v-if="item.images && item.images.length" class="col-span-2">
                              <img :src="getImgUrl(item.images[0])" :alt="item.title || 'Producto'" class="w-full h-24 object-contain rounded-md" />
                            </div>
                            
                            <!-- Detalles del producto -->
                            <div :class="['flex flex-col', item.image ? 'col-span-10' : 'col-span-12']">
                              <!-- Nombre y precio total -->
                              <div class="flex justify-between items-start">
                                <h5 class="font-semibold text-gray-900 text-base">
                                  {{ item.title || 'Producto sin nombre' }}
                                </h5>
                                <span class="font-medium text-gray-900 whitespace-nowrap ml-4">
                                  {{ formatPrice((item.price || 0) * (item.quantity || 1)) }}
                                </span>
                              </div>
                              
                              <!-- Variantes y opciones -->
                              <div v-if="item.variant || item.color || item.size" class="mt-1 text-sm text-gray-600 space-y-1">
                                <!-- Mostrar detalles adicionales del producto si están disponibles -->
                                <p v-if="item.productDetails?.variant" class="capitalize">{{ item.productDetails.variant }}</p>
                                <div v-if="item.color || item.size" class="flex items-center space-x-4 mt-1">
                                  <span v-if="item.productDetails?.color" class="inline-flex items-center">
                                    <span class="w-3 h-3 rounded-full mr-1 border border-gray-300" :style="{ backgroundColor: item.productDetails.color }"></span>
                                    {{ item.productDetails.color }}
                                  </span>
                                  <span v-if="item.productDetails?.size">Talla: {{ item.productDetails.size }}</span>
                                </div>
                              </div>
                              
                              <!-- Cantidad y precio unitario -->
                              <div class="mt-2 flex items-center justify-between text-sm text-gray-600">
                                <div class="flex items-center space-x-2">
                                  <span>Cantidad: {{ item.quantity || 1 }}</span>
                                  <span class="text-gray-400">•</span>
                                  <span>{{ formatPrice(item.price || 0) }} c/u</span>
                                </div>
                              </div>
                              
                              <!-- Notas del producto -->
                              <div v-if="item.notes" class="mt-3 pt-3 border-t border-gray-100">
                                <p class="text-sm font-medium text-gray-700 mb-1">Notas:</p>
                                <p class="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-2 rounded">
                                  {{ item.notes }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p v-else class="text-sm text-gray-500 italic py-3">No hay artículos en este pedido</p>
                    </div>

                    <!-- Resumen del pedido -->
                    <div class="mt-6 pt-4 border-t border-gray-200">
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span class="text-gray-600">Subtotal:</span>
                          <span>{{ formatPrice(o.subtotal || 0) }}</span>
                        </div>
                        <div v-if="o.shippingCost" class="flex justify-between">
                          <span class="text-gray-600">Gastos de envío:</span>
                          <span>{{ formatPrice(o.shippingCost) }}</span>
                        </div>
                        <div v-if="o.discount && o.discount > 0" class="flex justify-between">
                          <span class="text-gray-600">Descuento:</span>
                          <span class="text-green-600">-{{ formatPrice(o.discount) }}</span>
                        </div>
                        <div class="flex justify-between items-center text-lg font-semibold pt-2 mt-2 border-t border-gray-200">
                          <span>Total del pedido:</span>
                          <span>{{ formatPrice(o.total) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <p v-else class="text-neutral-500">
            {{ $t("userPanel.noOrders") }}
          </p>
        </div>
      </section>
    </div>

    <!-- LOGOUT MODAL ------------------------------------------------------- -->
    <UModal v-model:open="showLogoutModal">
      <template #content>
        <div class="bg-white p-6 rounded-lg text-center">
          <h3 class="text-lg font-semibold mb-4">
            {{ $t("userPanel.logoutConfirmTitle") }}
          </h3>
          <p class="mb-6">{{ $t("userPanel.logoutConfirmText") }}</p>

          <div class="flex justify-center gap-4">
            <UButton color="primary" @click="confirmLogout">
              {{ $t("common.yes") }}
            </UButton>
            <UButton variant="soft" @click="showLogoutModal = false">
              {{ $t("common.cancel") }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
/* ---------------------------------------------------------------------- */
/* imports ---------------------------------------------------------------- */
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { z } from "zod";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import { useAuth } from "~/composables/useAuth";
import type { Address } from "~/types/types";

// Función para formatear fechas con hora
const formatDateTime = (dateString: string, includeTime = false) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('es-ES', options);
};

/* ---------------------------------------------------------------------- */
/* data ---------------------------------------------------------------- */
const auth = useAuth();
const expandedOrderId = ref<string | null>(null);

// Alternar la visibilidad de los detalles del pedido
const toggleOrderDetails = (orderId: string) => {
  expandedOrderId.value = expandedOrderId.value === orderId ? null : orderId;
};

/* ---------------------------------------------------------------------- */
/* i18n ------------------------------------------------------------------ */
const { t, d } = useI18n();

/* ---------------------------------------------------------------------- */
/* tabs ------------------------------------------------------------------ */
const activeTab = ref<"profile" | "orders">("profile");
const tabs = [
  { id: "profile", label: "userPanel.profile" },
  { id: "orders", label: "userPanel.orders" },
] as const;

/* ---------------------------------------------------------------------- */
/* phone prefixes -------------------------------------------------------- */
const phonePrefixes = [
  { value: "+34", label: "+34 (ES)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+33", label: "+33 (FR)" },
];

/* ---------------------------------------------------------------------- */
/* form model ------------------------------------------------------------ */
interface Form {
  name: string;
  surname: string;
  email: string;
  phonePrefix: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
}
const form = ref<Form>({
  name: "",
  surname: "",
  email: "",
  phonePrefix: "+34",
  phone: "",
  street: "",
  city: "",
  postalCode: "",
  country: "",
  billingStreet: "",
  billingCity: "",
  billingPostalCode: "",
  billingCountry: "",
});

/* ---------------------------------------------------------------------- */
/* reactive state -------------------------------------------------------- */
const showBilling = ref(false);
const errors = ref<Record<string, string>>({});
const serverError = ref("");
const saving = ref(false);
const orders = ref<any[]>([]);

/* IDs restituídos por la API para decidir entre create y update */
const shippingId = ref<string | null>(null);
const billingId = ref<string | null>(null);

/* ---------------------------------------------------------------------- */
/* auth composable ------------------------------------------------------- */
const {
  fetchUserInfo,
  userInfo,
  updateUserProfile,
  getAddress,
  createAddress,
  updateAddress,
  logout,
} = useAuth();

/* ---------------------------------------------------------------------- */
/* validation schema ----------------------------------------------------- */
const schema = z
  .object({
    name: z.string().min(1, t("validation.required")),
    surname: z.string().min(1, t("validation.required")),
    email: z.string().email(t("validation.invalidEmail")),
    phonePrefix: z.string(),
    phone: z.string().min(1, t("validation.required")),
    street: z.string().min(1, t("validation.required")),
    city: z.string().min(1, t("validation.required")),
    postalCode: z.string().min(1, t("validation.required")),
    country: z.string().min(1, t("validation.required")),
    billingStreet: z.string().optional(),
    billingCity: z.string().optional(),
    billingPostalCode: z.string().optional(),
    billingCountry: z.string().optional(),
  })
  .superRefine((obj, ctx) => {
    /* phone validation */
    try {
      const num = parsePhoneNumberWithError(obj.phonePrefix + obj.phone);
      if (!num.isValid()) throw new Error();
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: t("validation.invalidPhone"),
      });
    }
    /* billing required only when checkbox ON */
    if (showBilling.value) {
      const requiredBilling = [
        { key: "billingStreet", label: t("validation.required") },
        { key: "billingCity", label: t("validation.required") },
        { key: "billingPostalCode", label: t("validation.required") },
        { key: "billingCountry", label: t("validation.required") },
      ] as const;
      requiredBilling.forEach((f) => {
        if (!(obj as any)[f.key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [f.key],
            message: f.label,
          });
        }
      });
    }
  });

/* ---------------------------------------------------------------------- */
/* initial load ---------------------------------------------------------- */
onMounted(async () => {
  await fetchUserInfo();
  if (!userInfo.value) return;

  Object.assign(form.value, {
    name: userInfo.value.name,
    surname: userInfo.value.surname,
    email: userInfo.value.email,
    phone: (userInfo.value.phone ?? "").replace(form.value.phonePrefix, ""),
  });
  orders.value = userInfo.value.orders ?? [];

  /* shipping */
  const ship = await getAddress("shipping");
  if (ship) {
    shippingId.value = ship.id;
    Object.assign(form.value, {
      street: ship.street,
      city: ship.city,
      postalCode: ship.postalCode,
      country: ship.country,
    });
  }

  /* billing */
  const bill = await getAddress("billing");
  if (bill) {
    billingId.value = bill.id;
    showBilling.value = true;
    Object.assign(form.value, {
      billingStreet: bill.street,
      billingCity: bill.city,
      billingPostalCode: bill.postalCode,
      billingCountry: bill.country,
    });
  }
});

/* ---------------------------------------------------------------------- */
/* save handler ---------------------------------------------------------- */
async function handleSave() {
  errors.value = {};
  serverError.value = "";

  const parsed = schema.safeParse({ ...form.value });
  if (!parsed.success) {
    parsed.error.errors.forEach((err) => {
      if (err.path.length) {
        errors.value[err.path[0] as string] = err.message;
      }
    });
    return;
  }

  saving.value = true;
  try {
    /* update profile ---------------------------------------- */
    await updateUserProfile({
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phone: form.value.phonePrefix + form.value.phone,
    });

    /* shipping ---------------------------------------------- */
    const shippingData: Address = {
      id: shippingId.value ?? "",
      street: form.value.street,
      city: form.value.city,
      postalCode: form.value.postalCode,
      country: form.value.country,
      isDefault: true,
      type: "shipping",
    };
    if (shippingId.value) {
      await updateAddress(shippingData);
    } else {
      const created = await createAddress(shippingData);
      /* refrescamos el id real si el backend lo devuelve */
      shippingId.value = created?.id ?? shippingId.value;
    }

    /* billing (optional) ------------------------------------ */
    if (showBilling.value) {
      const billingData: Address = {
        id: billingId.value ?? "",
        street: form.value.billingStreet,
        city: form.value.billingCity,
        postalCode: form.value.billingPostalCode,
        country: form.value.billingCountry,
        isDefault: false,
        type: "billing",
      };
      if (billingId.value) {
        await updateAddress(billingData);
      } else {
        const created = await createAddress(billingData);
        billingId.value = created?.id ?? billingId.value;
      }
    }
  } catch {
    serverError.value = t("validation.unknownError");
  } finally {
    saving.value = false;
  }
}
function getImgUrl(img: string | string[]): string {
  if (!img) return "";
  const imgStr = Array.isArray(img) ? img[0] : img;
  if (imgStr.startsWith("http")) return imgStr;
  if (imgStr.startsWith("images/")) {
    return `/${imgStr}`;
  }
  return `/images/${imgStr}`;
}


/* ---------------------------------------------------------------------- */
/* helpers --------------------------------------------------------------- */
function orderColor(status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  const map: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    pending: "warning",
    processing: "info",
    shipped: "success",
    delivered: "success",
    cancelled: "error",
  };
  return map[status] || "neutral";
}

/* ---------------------------------------------------------------------- */
/* helpers -------------------------------------------------------------- */
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

/* ---------------------------------------------------------------------- */
/* helpers -------------------------------------------------------------- */
const formatOrderNumber = (orderId: string) => {
  // Tomar solo los últimos 6 caracteres del ID para hacerlo más corto
  return orderId ? orderId.slice(-6).toUpperCase() : '';
};

/* ---------------------------------------------------------------------- */
/* logout ---------------------------------------------------------------- */
const showLogoutModal = ref(false);
function confirmLogout() {
  logout();
  location.replace("/");
}
</script>
