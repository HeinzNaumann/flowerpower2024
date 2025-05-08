<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Encabezado con navegación -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">{{ $t("userPanel.myAccount") }}</h1>
    </div>

    <!-- Panel principal -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Menú lateral -->
      <div class="md:col-span-1">
        <hr class="space-y-2" />
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
          variant="soft"
          @click.prevent="showLogoutModal = true"
          class="w-full text-left px-4 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer mt-2"
        >
          {{ $t("userPanel.logout") }}
        </button>
      </div>

      <!-- Contenido principal -->
      <div class="md:col-span-3 bg-white p-6 rounded-lg shadow">
        <!-- Perfil + Dirección unificada con opción de billing -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.profile") }}
          </h2>
          <form
            @submit.prevent="updateProfile"
            class="space-y-4 grid grid-cols-2 gap-6"
          >
            <!-- Datos de usuario -->
            <UFormField :error="errors.name">
              <UInput
                v-model="user.name"
                size="xl"
                class="w-full"
                :placeholder="$t('userPanel.name')"
              />
            </UFormField>
            <UFormField :error="errors.surname">
              <UInput
                v-model="user.surname"
                class="w-full"
                :placeholder="$t('userPanel.surname')"
              />
            </UFormField>

            <UFormField :label="$t('userPanel.email')" :error="errors.email">
              <UInput v-model="user.email" type="email" class="w-full" />
            </UFormField>
            <UFormField :label="$t('userPanel.phone')" :error="errors.phone">
              <div class="flex items-center space-x-2">
                <select
                  v-model="user.phonePrefix"
                  class="px-2 py-1 bg-neutral-100 rounded text-neutral-700"
                >
                  <option
                    v-for="prefix in phonePrefixes"
                    :key="prefix.value"
                    :value="prefix.value"
                  >
                    {{ prefix.label }}
                  </option>
                </select>
                <UInput
                  v-model="user.phone"
                  placeholder="612345678"
                  class="w-full"
                />
              </div>
            </UFormField>

            <!-- Shipping Address -->
            <UFormField :label="$t('userPanel.street')" :error="errors.street">
              <UInput
                v-model="user.street"
                autocomplete="street-address"
                placeholder="Calle y número"
                class="w-full"
              />
            </UFormField>
            <UFormField :label="$t('userPanel.city')" :error="errors.city">
              <UInput
                v-model="user.city"
                autocomplete="address-level2"
                placeholder="Ciudad"
                class="w-full"
              />
            </UFormField>
            <UFormField
              :label="$t('userPanel.postalCode')"
              :error="errors.postalCode"
            >
              <UInput
                v-model="user.postalCode"
                autocomplete="postal-code"
                placeholder="00000"
                class="w-full"
              />
            </UFormField>
            <UFormField
              :label="$t('userPanel.country')"
              :error="errors.country"
            >
              <UInput
                v-model="user.country"
                autocomplete="country"
                placeholder="País"
                class="w-full"
              />
            </UFormField>

            <!-- Checkbox para Billing Address -->
            <UFormField>
              <label class="inline-flex items-center col-span-2">
                <input
                  type="checkbox"
                  v-model="showBilling"
                  class="form-checkbox h-5 w-5 text-primary-500"
                />
                <span class="ml-2">{{
                  $t("userPanel.showBillingAddress")
                }}</span>
              </label>
            </UFormField>

            <!-- Billing Address se muestra si showBilling es true -->
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
                    v-model="user.billingStreet"
                    placeholder="Calle y número"
                  />
                </UFormField>
                <UFormField
                  :label="$t('userPanel.city')"
                  :error="errors.billingCity"
                >
                  <UInput v-model="user.billingCity" placeholder="Ciudad" />
                </UFormField>
                <UFormField
                  :label="$t('userPanel.postalCode')"
                  :error="errors.billingPostalCode"
                >
                  <UInput
                    v-model="user.billingPostalCode"
                    placeholder="00000"
                  />
                </UFormField>
                <UFormField
                  :label="$t('userPanel.country')"
                  :error="errors.billingCountry"
                >
                  <UInput v-model="user.billingCountry" placeholder="País" />
                </UFormField>
              </div>
            </transition>

            <UButton type="submit" color="primary" class="col-span-2">
              {{ $t("userPanel.saveChanges") }}
            </UButton>
          </form>
        </div>

        <!-- Pedidos -->
        <div v-if="activeTab === 'orders'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.orders") }}
          </h2>
          <div v-if="orders.length" class="space-y-4">
            <div
              v-for="order in orders"
              :key="order.id"
              class="border rounded-lg p-4"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">#{{ order.id }}</p>
                  <p class="text-sm text-neutral-600">
                    {{ new Date(order.date).toLocaleDateString() }}
                  </p>
                </div>
                <UBadge :color="getOrderStatusColor(order.status)">
                  {{ $t(`orderStatus.${order.status}`) }}
                </UBadge>
              </div>
            </div>
          </div>
          <p v-else class="text-neutral-500">
            {{ $t("userPanel.noOrders") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Logout Modal -->
    <UModal v-model:open="showLogoutModal">
      <template #content>
        <div
          class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center"
        >
          <h3 class="text-lg font-semibold mb-4">
            {{ $t("userPanel.logoutConfirmTitle") }}
          </h3>
          <p class="mb-6">
            {{ $t("userPanel.logoutConfirmText") }}
          </p>
          <div class="flex justify-center gap-4">
            <UButton color="primary" @click="confirmLogout">
              {{ $t("common.yes") }}
            </UButton>
            <UButton
              color="primary"
              variant="soft"
              @click="showLogoutModal = false"
            >
              {{ $t("common.cancel") }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { z } from "zod";
import type { Address } from "~/types/types";
import { useAuth } from "~/composables/useAuth";

definePageMeta({ layout: "default", middleware: ["auth"] });
const { t } = useI18n();
const activeTab = ref("profile");

const tabs = [
  { id: "profile", label: "userPanel.profile" },
  { id: "orders", label: "userPanel.orders" },
];

const phonePrefixes = [
  { value: "+34", label: "+34 (ES)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+33", label: "+33 (FR)" },
];

interface UserForm {
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

const user = ref<UserForm>({
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
const orders = ref<any[]>([]);
const errors = ref<Record<string, string>>({});
const showBilling = ref(false);

const validationSchema = z.object({
  name: z.string().min(1, t("validation.required")),
  surname: z.string().min(1, t("validation.required")),
  email: z.string().email(t("validation.invalidEmail")),
  phone: z
    .string()
    .refine((val) => true, { message: t("validation.invalidPhone") }),
  street: z.string().min(1, t("validation.required")),
  city: z.string().min(1, t("validation.required")),
  postalCode: z.string().min(1, t("validation.required")),
  country: z.string().min(1, t("validation.required")),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostalCode: z.string().optional(),
  billingCountry: z.string().optional(),
});

const {
  logout,
  userInfo,
  fetchUserInfo,
  updateUserProfile,
  getAddress,
  updateAddress,
} = useAuth();
const showLogoutModal = ref(false);

const confirmLogout = async () => {
  showLogoutModal.value = false;
  await logoutAndRedirect();
};
const logoutAndRedirect = async () => {
  logout();
  await nextTick();
  await navigateTo("/", { replace: true });
};

const updateProfile = async () => {
  errors.value = {};
  const result = validationSchema.safeParse({
    ...user.value,
    phone: user.value.phone,
  });
  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path[0]) errors.value[err.path[0]] = err.message;
    });
    return;
  }

  await updateUserProfile({
    name: user.value.name,
    surname: user.value.surname,
    email: user.value.email,
    phone: user.value.phonePrefix + user.value.phone,
  });

  const ship: Address = {
    id: "shipping",
    isDefault: true,
    street: user.value.street,
    city: user.value.city,
    postalCode: user.value.postalCode,
    country: user.value.country,
    type: "shipping",
  };
  await updateAddress(ship);

  // Billing address opcional
  if (showBilling) {
    const bill: Address = {
      id: "billing",
      isDefault: false,
      street: user.value.billingStreet,
      city: user.value.billingCity,
      postalCode: user.value.billingPostalCode,
      country: user.value.billingCountry,
      type: "billing",
    };
    await updateAddress(bill);
  }
};

const getOrderStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: "yellow",
    processing: "blue",
    shipped: "green",
    delivered: "green",
    cancelled: "red",
  };
  return colors[status] || "neutral";
};

onMounted(async () => {
  await fetchUserInfo();
  if (userInfo.value) {
    // Perfil
    user.value.name = userInfo.value.name;
    user.value.surname = userInfo.value.surname;
    user.value.email = userInfo.value.email;
    const rawPhone = userInfo.value.phone || "";
    user.value.phone = rawPhone.replace(user.value.phonePrefix, "");
    orders.value = userInfo.value.orders || [];

    // Shipping
    const shipping = await getAddress("shipping");
    if (shipping) {
      user.value.street = shipping.street;
      user.value.city = shipping.city;
      user.value.postalCode = shipping.postalCode;
      user.value.country = shipping.country;
    }
    // Billing
    const billing = await getAddress("billing");
    if (billing) {
      showBilling.value = true;
      user.value.billingStreet = billing.street;
      user.value.billingCity = billing.city;
      user.value.billingPostalCode = billing.postalCode;
      user.value.billingCountry = billing.country;
    }
  }
});
</script>
