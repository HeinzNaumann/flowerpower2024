<template>
  <div class="max-w-md mx-auto py-12 px-4">
    <h1 class="text-2xl font-bold mb-4">¿Olvidaste tu contraseña?</h1>
    <UForm :state="{ email }" @submit="submitEmail">
      <UFormField name="email" label="Tu email">
        <UInput v-model="email" type="email" required autocomplete="email" />
      </UFormField>

      <UButton type="submit" color="primary" class="mt-4" :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        <span v-else>Enviar instrucciones</span>
      </UButton>
    </UForm>

    <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const message = ref("");
const error = ref("");
const loading = ref(false);
const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

async function submitEmail() {
  loading.value = true;
  message.value = "";
  error.value = "";
  try {
    const res = await $fetch<{ message: string }>(
      `${apiUrl}/auth/forgot-password`,
      {
        method: "POST",
        body: { email: email.value },
      }
    );
    message.value = res.message;
  } catch (err: any) {
    error.value = err.data?.message || "Error al enviar el correo";
  } finally {
    loading.value = false;
  }
}
</script>
