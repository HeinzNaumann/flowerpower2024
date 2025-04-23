<template>
  <div class="max-w-md mx-auto py-12 px-4 text-center">
    <h1 class="text-2xl font-bold mb-4">Verificando tu cuenta...</h1>

    <div v-if="status === 'verifying'" class="text-gray-500">
      <span class="loading loading-spinner loading-md"></span>
      Estamos confirmando tu email. Un momento...
    </div>

    <div v-else-if="status === 'success'" class="text-green-600">
      <h2 class="text-xl font-semibold mb-2">✅ ¡Cuenta verificada!</h2>
      <p class="mb-4">Has sido identificado automáticamente.</p>
      <UButton to="/" color="primary">Ir a la tienda</UButton>
    </div>

    <div v-else class="text-red-600">
      <h2 class="text-xl font-semibold mb-2">❌ Enlace inválido o expirado</h2>
      <p class="mb-4">
        Por favor vuelve a registrarte o solicita un nuevo enlace.
      </p>
      <UButton to="/" color="primary">Ir a inicio</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

const status = ref<"verifying" | "success" | "error">("verifying");
const { setAuth } = useAuth();

onMounted(async () => {
  const token = route.query.token as string;

  if (!token) {
    status.value = "error";
    return;
  }

  try {
    interface VerifyEmailResponse {
      token: string;
      email: string;
    }
    const response = await $fetch<VerifyEmailResponse>(
      `${apiUrl}/auth/verify-email?token=${token}`
    );
    if (response?.token && response?.email) {
      const getUsernameFromEmail = (email: string): string =>
        email.split("@")[0];
      setAuth(response.token, getUsernameFromEmail(response.email));
    }
    status.value = "success";
  } catch (e) {
    status.value = "error";
  }
});
</script>

<style scoped>
.loading-spinner {
  margin-bottom: 1rem;
}
</style>
