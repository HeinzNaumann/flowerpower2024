<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { z } from "zod";
import { useOverlay } from "#imports";
import LoginRegister from "~/components/LoginRegister.vue";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "La contraseña debe contener una letra mayúscula, una minúscula y un número"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

const form = ref<PasswordForm>({
  password: "",
  confirmPassword: "",
});

const message = ref("");
const error = ref("");
const loading = ref(false);

const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

const route = useRoute();
const token = ref("");

const overlay = useOverlay();
const loginModal = overlay.create(LoginRegister);
const { isAuthenticated } = useAuth();
const router = useRouter();

onMounted(() => {
  token.value = (route.query.token as string) || "";
  if (!token.value) {
    error.value = "Token inválido";
    setTimeout(() => {
      loginModal.open(LoginRegister);
    }, 2000);
  }
  if (isAuthenticated()) {
    router.push("/");
  }
});

onUpdated(() => {
  if (isAuthenticated()) {
    router.push("/");
  }
});
async function submitPassword() {
  loading.value = true;
  message.value = "";
  error.value = "";
  try {
    const res = await $fetch<{ message: string }>(
      `${apiUrl}/auth/reset-password`,
      {
        method: "POST",
        body: {
          token: token.value,
          password: form.value.password,
        },
      }
    );

    message.value = res.message;
    setTimeout(() => {
      loginModal.open(LoginRegister);
    }, 2000);
  } catch (err: any) {
    error.value = err?.data?.message || "Error al actualizar la contraseña";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-12 px-4 text-center">
    <h1 class="text-2xl font-bold mb-4">Crea una nueva contraseña</h1>

    <UForm :schema="passwordSchema" :state="form" @submit="submitPassword">
      <UFormField name="password" label="Nueva contraseña">
        <UInput
          v-model="form.password"
          type="password"
          autocomplete="new-password"
        />
      </UFormField>

      <UFormField name="confirmPassword" label="Repite la contraseña">
        <UInput
          v-model="form.confirmPassword"
          type="password"
          autocomplete="new-password"
        />
      </UFormField>

      <UButton type="submit" color="primary" class="mt-4" :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        <span v-else>Restablecer</span>
      </UButton>
    </UForm>

    <p v-if="message" class="text-green-600 mt-4 font-medium">
      {{ message }}
    </p>
    <p v-if="error" class="text-red-600 mt-4 font-medium">
      {{ error }}
    </p>
  </div>
</template>
