<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Encabezado con navegación -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">{{ $t("userPanel.myAccount") }}</h1>
      <UButton
        color="warning"
        variant="soft"
        @click.prevent="logoutAndRedirect"
      >
        {{ $t("userPanel.logout") }}
      </UButton>
    </div>

    <!-- Panel principal -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Menú lateral -->
      <div class="md:col-span-1">
        <nav class="space-y-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg',
              activeTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'hover:bg-neutral-100',
            ]"
          >
            {{ $t(tab.label) }}
          </button>
        </nav>
      </div>

      <!-- Contenido principal -->
      <div class="md:col-span-3 bg-white p-6 rounded-lg shadow">
        <!-- Perfil -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("userPanel.profile") + " " + $route.params.userName }}
          </h2>
          <form @submit.prevent="updateProfile" class="space-y-4">
            <UFormField :label="$t('userPanel.name')">
              <UInput v-model="user.name" />
            </UFormField>
            <UFormField :label="$t('userPanel.email')">
              <UInput v-model="user.email" type="email" />
            </UFormField>
            <UFormField :label="$t('userPanel.phone')">
              <UInput v-model="user.phone" />
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const localePath = useLocalePath();

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
const { t } = useI18n();
const activeTab = ref("profile");

// Tabs disponibles
const tabs = [
  { id: "profile", label: "userPanel.profile" },
  { id: "orders", label: "userPanel.orders" },
  { id: "addresses", label: "userPanel.addresses" },
];

// Estado inicial
const user = ref({
  name: "",
  email: "",
  phone: "",
});

const orders = ref([]);
const addresses = ref([]);

const { logout, userName } = useAuth();

const logoutAndRedirect = async () => {
  logout();
  console.log("Logging out...");
  await nextTick();
  console.log("Logout successful");
  await navigateTo(localePath({ path: "/" }), { replace: true });
};

const updateProfile = async () => {
  // Implementar actualización de perfil
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

const editAddress = (address: any) => {
  // Implementar edición de dirección
};

const deleteAddress = async (id: string) => {
  // Implementar borrado de dirección
};

const formatAddress = (address: any) => {
  // Implementar formato de dirección
  return `${address.street}, ${address.city}, ${address.postalCode}`;
};

// Cargar datos iniciales
onMounted(async () => {
  // Implementar carga de datos del usuario
});
</script>
