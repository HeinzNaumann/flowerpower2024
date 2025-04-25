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
        <!-- Perfil -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.profile") }}
          </h2>
          <form @submit.prevent="updateProfile" class="space-y-4">
            <UFormField :label="$t('userPanel.name')" :error="formErrors.name">
              <UInput v-model="user.name" />
            </UFormField>
            <UFormField
              :label="$t('userPanel.surname')"
              :error="formErrors.surname"
            >
              <UInput v-model="user.surname" />
            </UFormField>
            <UFormField
              :label="$t('userPanel.email')"
              :error="formErrors.email"
            >
              <UInput v-model="user.email" type="email" />
            </UFormField>
            <UFormField
              :label="$t('userPanel.phone')"
              :error="formErrors.phone"
            >
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
                <UInput v-model="user.phone" placeholder="612345678" />
              </div>
            </UFormField>
            <UButton type="submit" color="primary">
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

        <!-- Direcciones -->
        <div v-if="activeTab === 'addresses'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.addresses") }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="address in addresses"
              :key="address.id"
              class="border rounded-lg p-4"
            >
              <div class="flex justify-between">
                <h3 class="font-medium">{{ address.name }}</h3>
                <div class="space-x-2">
                  <UButton
                    size="sm"
                    variant="ghost"
                    @click="editAddress(address)"
                  >
                    {{ $t("common.edit") }}
                  </UButton>
                  <UButton
                    size="sm"
                    color="warning"
                    variant="ghost"
                    @click="deleteAddress(address.id)"
                  >
                    {{ $t("common.delete") }}
                  </UButton>
                </div>
              </div>
              <p class="text-sm text-neutral-600 mt-2">
                {{ formatAddress(address) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { z } from "zod";
const { isValidPhone } = usePhoneNumberValidation();

const localePath = useLocalePath();

definePageMeta({ layout: "default", middleware: ["auth"] });

const { t } = useI18n();
const activeTab = ref("profile");

const tabs = [
  { id: "profile", label: "userPanel.profile" },
  { id: "orders", label: "userPanel.orders" },
  { id: "addresses", label: "userPanel.addresses" },
];

const phonePrefixes = [
  { value: "+34", label: "+34 (ES)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+33", label: "+33 (FR)" },
];

const user = ref({
  name: "",
  surname: "",
  email: "",
  phonePrefix: "+34",
  phone: "",
});

const orders = ref([]);
const addresses = ref([]);

const { logout, userInfo, fetchUserInfo, updateUserProfile } = useAuth();

const showLogoutModal = ref(false);

const confirmLogout = async () => {
  showLogoutModal.value = false;
  await logoutAndRedirect();
};

const logoutAndRedirect = async () => {
  logout();
  await nextTick();
  await navigateTo(localePath({ path: "/" }), { replace: true });
};

const validationSchema = z.object({
  name: z.string().min(1, t("validation.required")),
  surname: z.string().min(1, t("validation.required")),
  email: z.string().email(t("validation.invalidEmail")),
  phone: z
    .string()
    .refine((val) => isValidPhone(user.value.phonePrefix + val, "ES"), {
      message: t("validation.invalidPhone"),
    }),
});

const formErrors = ref<Record<string, string>>({});

const updateProfile = async () => {
  formErrors.value = {};
  const result = validationSchema.safeParse({
    ...user.value,
    phone: user.value.phone,
  });

  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path[0]) formErrors.value[err.path[0]] = err.message;
    });
    return;
  }

  await updateUserProfile({
    name: user.value.name,
    surname: user.value.surname,
    email: user.value.email,
    phone: user.value.phonePrefix + user.value.phone,
  });
};

const getOrderStatusColor = (status: string) => {
  const colors = {
    pending: "yellow",
    processing: "blue",
    shipped: "green",
    delivered: "green",
    cancelled: "red",
  };
  return colors[status] || "neutral";
};

const editAddress = (address: any) => {};
const deleteAddress = async (id: string) => {};
const formatAddress = (address: any) => {
  return `${address.street}, ${address.city}, ${address.postalCode}`;
};

onMounted(async () => {
  await fetchUserInfo();
  if (userInfo.value) {
    user.value = { ...userInfo.value, phonePrefix: "+34" };
  }
});
</script>
