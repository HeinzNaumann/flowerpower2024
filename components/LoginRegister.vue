<template>
  <UModal
    :title="
      isLogin
        ? 'Introduce tu dirección de correo electrónico para unirte o iniciar sesión.'
        : 'Vamos a hacerte Flower Power Member'
    "
    v-model:open="internalOpen"
    id="loginRegisterModal"
    overlay
  >
    <template #body>
      <!-- LOGIN FORM -->
      <template v-if="isLogin">
        <UForm
          :schema="loginSchema"
          :state="loginForm"
          class="space-y-4"
          @submit="handleLogin"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="loginForm.email"
              type="email"
              autocomplete="email"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="loginForm.password"
              type="password"
              autocomplete="current-password"
            />
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            variant="solid"
            class="btn-nike"
            :disabled="isSubmitting"
          >
            <template v-if="isSubmitting">
              <span class="loading loading-spinner loading-xs"></span>
            </template>
            <template v-else>Continuar</template>
          </UButton>
          <div class="text-sm text-right mt-2">
            <NuxtLink
              to="/forgot-password"
              class="text-primary-600 hover:underline"
              @click.prevent="internalOpen = false"
            >
              ¿Has olvidado tu contraseña?
            </NuxtLink>
          </div>
        </UForm>
      </template>

      <!-- REGISTRO FORM -->
      <template v-else>
        <UForm
          :schema="registerSchema"
          :state="registerForm"
          @submit="handleRegister"
          class="space-y-6"
        >
          <div class="flex space-x-2">
            <UFormField name="name" label="Nombre">
              <UInput
                v-model="registerForm.name"
                placeholder="Tu nombre"
                autocomplete="given-name"
              />
            </UFormField>
            <UFormField name="surname" label="Apellidos">
              <UInput
                v-model="registerForm.surname"
                placeholder="Tus apellidos"
                autocomplete="family-name"
              />
            </UFormField>
          </div>

          <!-- EMAIL Y CONFIRMACIÓN -->
          <div class="flex space-x-2">
            <UFormField name="email" label="Email">
              <UInput
                v-model="registerForm.email"
                type="email"
                placeholder="tucorreo@mail.com"
                autocomplete="email"
                class="input-nike"
              />
            </UFormField>

            <UFormField name="confirmEmail" label="Confirma Email">
              <UInput
                v-model="registerForm.confirmEmail"
                type="email"
                placeholder="Repite tu correo"
                autocomplete="email"
                class="input-nike"
              />
            </UFormField>
          </div>

          <PhoneField v-model="registerForm.phone" />

          <UFormField name="password" label="Password">
            <UInput
              v-model="registerForm.password"
              placeholder="Password"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
              autocomplete="new-password"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Ocultar' : 'Mostrar'"
                  :aria-pressed="show"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField name="acceptTOS">
            <div class="flex items-center gap-2 text-sm text-primary-900">
              <UCheckbox v-model="registerForm.acceptTOS" />
              <label>
                Acepto la
                <a href="/terminos" class="text-brand1 hover:underline">
                  Política de privacidad
                </a>
                y los Términos de uso.
              </label>
            </div>
          </UFormField>

          <div class="flex items-center gap-2 text-sm text-primary-900">
            <UCheckbox v-model="registerForm.subscribeNewsletter" />
            <label>
              Regístrate para recibir actualizaciones, ofertas y ventajas para
              Members.
            </label>
          </div>

          <UButton
            type="submit"
            color="primary"
            variant="solid"
            class="btn-nike"
            :disabled="isSubmitting"
          >
            <template v-if="isSubmitting">
              <span class="loading loading-spinner loading-xs"></span>
            </template>
            <template v-else>Registrarme</template>
          </UButton>
        </UForm>
      </template>

      <!-- MENSAJES DE API -->
      <div
        v-if="apiError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
        role="alert"
      >
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{{ apiError }}</span>
      </div>

      <div
        v-if="apiSuccess"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
        role="alert"
      >
        <strong class="font-bold">Éxito:</strong>
        <span class="block sm:inline">{{ apiSuccess }}</span>
      </div>
    </template>

    <template #footer>
      <UButton
        variant="link"
        color="primary"
        class="mt-2 block text-sm text-primary-900 hover:text-primary-700 btn-nike full-size"
        @click="toggleMode"
      >
        <small>
          {{
            isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"
          }}
        </small>
      </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { z } from "zod";
import { usePhoneNumberValidation } from "~/composables/usePhoneNumberValidation";
import type { RegisterForm } from "~/types/types";
import type { CountryCode } from "libphonenumber-js";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["update:open"]);
const { isValidPhone } = usePhoneNumberValidation();
const internalOpen = ref(props.open);
watch(
  () => props.open,
  (newVal) => {
    internalOpen.value = newVal;
  }
);
watch(internalOpen, (val) => {
  emit("update:open", val);
});

const isLogin = ref(true);
const isSubmitting = ref(false);
const apiError = ref<string | null>(null);
const apiSuccess = ref<string | null>(null);
const show = ref(false);

const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Nombre requerido"),
    surname: z.string().min(1, "Apellidos requeridos"),
    email: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Email inválido"),
    countryCode: z.string().min(2).max(2), // ej: "ES"
    phone: z.string(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "La contraseña debe contener una letra mayúscula, una minúscula y un número"
      ),
    acceptTOS: z.literal(true, {
      errorMap: () => ({
        message: "Debes aceptar los términos y condiciones.",
      }),
    }),
    subscribeNewsletter: z.boolean().optional(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Los correos electrónicos no coinciden",
    path: ["confirmEmail"],
  });

const registerForm: RegisterForm = reactive({
  name: "",
  surname: "",
  email: "",
  confirmEmail: "",
  phone: "",
  password: "",
  acceptTOS: false,
  subscribeNewsletter: false,
});

const loginForm = reactive({
  email: "",
  password: "",
});

async function handleLogin() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  const { setAuth } = useAuth();

  try {
    const response = await $fetch<{ token: string; email: string }>(
      `${apiUrl}/auth/login`,
      { method: "POST", body: loginForm }
    );

    if (!response?.token) {
      apiError.value = "No se ha recibido un token al hacer login.";
      return;
    }

    const getUsernameFromEmail = (email: string): string => email.split("@")[0];
    setAuth(response.token, getUsernameFromEmail(response.email));
    apiSuccess.value = `Login exitoso. Bienvenido de nuevo ${getUsernameFromEmail(
      response.email
    )} 👋`;

    setTimeout(() => {
      internalOpen.value = false;
    }, 1500);
  } catch (error: any) {
    apiError.value =
      error?.data?.message || "Ha ocurrido un error durante el login.";
  } finally {
    isSubmitting.value = false;
  }
}

async function handleRegister() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  try {
    const { confirmEmail, ...body } = registerForm;

    await $fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      body,
    });

    apiSuccess.value = `Registro exitoso ✨. Hemos enviado un email de confirmación a ${registerForm.email}. Por favor revisa tu bandeja de entrada 📩.`;

    setTimeout(() => {
      internalOpen.value = false;
    }, 10000);
  } catch (error: any) {
    apiError.value =
      error?.data?.message || "Ha ocurrido un error durante el registro.";
  } finally {
    isSubmitting.value = false;
  }
}

function toggleMode() {
  isLogin.value = !isLogin.value;
  apiError.value = null;
  apiSuccess.value = null;
}
</script>
