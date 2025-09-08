<template>
  <div class="max-w-lg mx-auto py-12 px-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('forgotPassword.title') }}</h1>
    <UForm :state="{ email }" @submit="submitEmail">
      <UFormField name="email" :label="$t('forgotPassword.emailLabel')">
        <UInput
          v-model="email"
          type="email"
          required
          autocomplete="email"
          :placeholder="$t('forgotPassword.emailPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="loading"
        class="mt-6 inline-block px-6 py-2 bg-white text-neutral-900 rounded-full border border-neutral-300 hover:bg-neutral-200 text-sm md:text-lg disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#3F2D50]/40"
      >
        {{ $t('forgotPassword.button') }}
      </UButton>
    </UForm>

    <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from '#imports'
const { t } = useI18n()
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
    message.value = res.message || t('forgotPassword.success');
  } catch (err: any) {
    error.value = err?.data?.message || t('forgotPassword.error');
  } finally {
    loading.value = false;
  }
}
</script>
