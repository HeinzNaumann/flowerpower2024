<template>
  <UModal
    :title="
      isLogin
        ? 'Introduce tu dirección de correo electrónico para unirte o iniciar sesión.'
        : 'Vamos a hacerte Flower Power Member'
    "
    :description="
      isLogin
        ? 'Accede a tu cuenta o únete a nosotros'
        : 'Completa el formulario para crear tu cuenta'
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
  countryCode: "ES", // Añadido código de país por defecto
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

  // Validar teléfono antes de enviar (solo si se ha ingresado uno)
  if (registerForm.phone) {
    const phoneValid = isValidPhone(registerForm.phone, (registerForm.countryCode || 'ES') as CountryCode);
    if (!phoneValid) {
      apiError.value = "El número de teléfono no es válido";
      isSubmitting.value = false;
      return;
    }
    // Log del teléfono para depuración
    console.log('Teléfono a enviar:', registerForm.phone);
  }

  // Establecer código de país si no existe
  if (!registerForm.countryCode) {
    registerForm.countryCode = "ES"; // Código para España por defecto
  }

  // Log para depuración
  console.log('Intentando registrar usuario con datos:', {
    ...registerForm,
    password: '********' // No mostrar contraseña en logs
  });

  try {
    // Eliminar campos que no se envían al API
    const { confirmEmail, acceptTOS, ...body } = registerForm;
    
    // IMPORTANTE: Preservar el teléfono con su formato internacional
    // El componente PhoneField ya nos da el formato correcto con prefijo internacional
    // NO eliminar caracteres no numéricos que pueden incluir '+' del prefijo internacional
    
    console.log(`Enviando solicitud de registro a ${apiUrl}/auth/register`);
    
    const response = await $fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      body,
      // Aumentar timeout para evitar problemas de red
      options: {
        timeout: 10000
      }
    });

    console.log('Respuesta del servidor de registro:', response);

    apiSuccess.value = `Registro exitoso ✨. Hemos enviado un email de confirmación a ${registerForm.email}. Por favor revisa tu bandeja de entrada 📩.`;

    // De momento no hacemos auto-login para evitar problemas con verificación de email
    // El usuario debe iniciar sesión manualmente después de verificar su email

    setTimeout(() => {
      internalOpen.value = false;
    }, 3000); // Reducido a 3 segundos para mejor experiencia
  } catch (error: any) {
    console.error('Error durante el registro:', error);
    // Mostrar mensaje de error más específico si está disponible
    apiError.value = error?.data?.message || 
                     error?.message || 
                     "Ha ocurrido un error durante el registro. Por favor, intenta nuevamente.";
  } finally {
    isSubmitting.value = false;
  }
}

function toggleMode() {
  isLogin.value = !isLogin.value;
  apiError.value = null;
  apiSuccess.value = null;
  // Resetear formularios al cambiar de modo
  if (isLogin.value) {
    Object.assign(loginForm, {
      email: "",
      password: ""
    });
  } else {
    Object.assign(registerForm, {
      name: "",
      surname: "",
      email: "",
      confirmEmail: "",
      phone: "",
      countryCode: "ES",
      password: "",
      acceptTOS: false,
      subscribeNewsletter: false
    });
  }
}
</script>
