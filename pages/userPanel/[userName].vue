<!-- UserAccount.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Encabezado -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">{{ $t("userPanel.myAccount") }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Barra lateral -->
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

      <!-- Panel principal -->
      <section class="md:col-span-3 bg-white p-6 rounded-lg shadow">
        <!-- Formulario de perfil -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.profile") }}
          </h2>

          <form
            @submit.prevent="handleSave"
            class="space-y-4 grid grid-cols-2 gap-6"
          >
            <!-- Datos personales -->
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
              <div class="flex gap-2">
                <select
                  v-model="form.phonePrefix"
                  class="px-2 py-1 bg-neutral-100 rounded"
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

            <!-- Dirección de envío -->
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
              class="w-full"
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

            <!-- Mostrar / ocultar facturación -->
            <UFormField class="col-span-2">
              <label class="inline-flex items-center">
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

            <!-- Dirección de facturación -->
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
                  class="w-full"
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

            <!-- Botón Guardar -->
            <div class="col-span-2">
              <UButton
                :loading="saving"
                type="submit"
                color="primary"
                class="w-full"
              >
                {{ $t("userPanel.saveChanges") }}
              </UButton>
              <p v-if="serverError" class="mt-2 text-sm text-red-600">
                {{ serverError }}
              </p>
            </div>
          </form>
        </div>

        <!-- Pedidos -->
        <div v-if="activeTab === 'orders'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.orders") }}
          </h2>
          <div v-if="orders.length" class="space-y-4">
            <div v-for="o in orders" :key="o.id" class="border rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">#{{ o.id }}</p>
                  <p class="text-sm text-neutral-600">
                    {{ d(new Date(o.date), "short") }}
                  </p>
                </div>
                <UBadge :color="orderColor(o.status)">{{
                  $t(`orderStatus.${o.status}`)
                }}</UBadge>
              </div>
            </div>
          </div>
          <p v-else class="text-neutral-500">{{ $t("userPanel.noOrders") }}</p>
        </div>
      </section>
    </div>

    <!-- Modal Logout -->
    <UModal v-model:open="showLogoutModal">
      <template #content>
        <div class="bg-white p-6 rounded-lg text-center">
          <h3 class="text-lg font-semibold mb-4">
            {{ $t("userPanel.logoutConfirmTitle") }}
          </h3>
          <p class="mb-6">{{ $t("userPanel.logoutConfirmText") }}</p>
          <div class="flex justify-center gap-4">
            <UButton color="primary" @click="confirmLogout">{{
              $t("common.yes")
            }}</UButton>
            <UButton variant="soft" @click="showLogoutModal = false">{{
              $t("common.cancel")
            }}</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { z } from "zod";
import { useAuth } from "~/composables/useAuth";
import type { Address } from "~/types/types";

// i18n
const { t, d } = useI18n();

// Tabs
const activeTab = ref<"profile" | "orders">("profile");
const tabs = [
  { id: "profile", label: "userPanel.profile" },
  { id: "orders", label: "userPanel.orders" },
];

// Phone prefixes
const phonePrefixes = [
  { value: "+34", label: "+34 (ES)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+33", label: "+33 (FR)" },
];

// Form model
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

// State
const showBilling = ref(false);
const errors = ref<Record<string, string>>({});
const serverError = ref("");
const saving = ref(false);
const orders = ref<any[]>([]);

// API composable
const {
  fetchUserInfo,
  userInfo,
  updateUserProfile,
  getAddress,
  createAddress,
  updateAddress,
  logout,
} = useAuth();

// Validation schema
const schema = z.object({
  name: z.string().min(1, t("validation.required")),
  surname: z.string().min(1, t("validation.required")),
  email: z.string().email(t("validation.invalidEmail")),
  phone: z.string().min(1, t("validation.required")),
  street: z.string().min(1, t("validation.required")),
  city: z.string().min(1, t("validation.required")),
  postalCode: z.string().min(1, t("validation.required")),
  country: z.string().min(1, t("validation.required")),
});

// IDs recuperados del backend para update vs create
const shippingId = ref<string | null>(null);
const billingId = ref<string | null>(null);

// Carga inicial
onMounted(async () => {
  await fetchUserInfo();
  if (!userInfo.value) return;

  // Perfil
  Object.assign(form.value, {
    name: userInfo.value.name,
    surname: userInfo.value.surname,
    email: userInfo.value.email,
    phone: (userInfo.value.phone ?? "").replace(form.value.phonePrefix, ""),
  });
  orders.value = userInfo.value.orders ?? [];

  // Shipping
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

  // Billing
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

// Guardar
async function handleSave() {
  errors.value = {};
  serverError.value = "";

  // Validación
  const parsed = schema.safeParse({
    ...form.value,
    phone: form.value.phone, // incluir phone para Zod
  });

  if (!parsed.success) {
    parsed.error.errors.forEach((err) => {
      errors.value[err.path[0]] = err.message;
    });
    return;
  }

  saving.value = true;
  try {
    // Perfil
    await updateUserProfile({
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phone: form.value.phonePrefix + form.value.phone,
    });

    // Shipping (siempre obligatorio)
    const shippingData: Omit<Address, "type"> & { type: "shipping" } = {
      id: shippingId.value ?? "",
      street: form.value.street,
      city: form.value.city,
      postalCode: form.value.postalCode,
      country: form.value.country,
      isDefault: true,
      type: "shipping",
    };
    if (shippingId.value) await updateAddress(shippingData);
    else {
      const created = await createAddress(shippingData);
      shippingId.value = created?.id ?? null;
    }

    // Billing (opcional)
    if (showBilling.value) {
      const billingData: Omit<Address, "type"> & { type: "billing" } = {
        id: billingId.value ?? "",
        street: form.value.billingStreet,
        city: form.value.billingCity,
        postalCode: form.value.billingPostalCode,
        country: form.value.billingCountry,
        isDefault: false,
        type: "billing",
      };
      if (billingId.value) await updateAddress(billingData);
      else {
        const created = await createAddress(billingData);
        billingId.value = created?.id ?? null;
      }
    }
  } catch (e) {
    serverError.value = t("validation.unknownError");
  } finally {
    saving.value = false;
  }
}

// Colores de pedidos
function orderColor(s: string) {
  const map: Record<string, string> = {
    pending: "yellow",
    processing: "blue",
    shipped: "green",
    delivered: "green",
    cancelled: "red",
  };
  return map[s] || "neutral";
}

// Logout
const showLogoutModal = ref(false);
function confirmLogout() {
  logout();
  location.replace("/");
}
</script>
