<template>
  <!-- Modal con tu diseño -->
  <UModal
    :title="
      isLogin
        ? 'Introduce tu dirección de correo electrónico para unirte o iniciar sesión.'
        : 'Vamos a hacerte Flower Power Member'
    "
    v-model:open="modalOpen"
    id="loginRegisterModal"
    overlay
  >
    <template #body>
      <!-- Formulario de login -->
      <template v-if="isLogin">
        <UForm
          :schema="v.safeParser(schemaLogin)"
          :state="loginForm"
          class="space-y-4"
          @submit="handleLogin"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="loginForm.email"
              autocomplete="email"
              type="email"
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
        </UForm>
      </template>

      <!-- Formulario de registro -->
      <template v-else>
        <UForm
          :schema="v.safeParser(schemaRegister)"
          :state="registerForm"
          @submit="handleRegister"
          class="space-y-6"
        >
          <!-- Ejemplo de campos -->
          <div class="flex space-x-2">
            <UFormField
              name="name"
              label="Nombre"
              class="mb-3 text-primary-900"
              required
            >
              <UInput
                v-model="registerForm.name"
                placeholder="Tu nombre"
                autocomplete="given-name"
              />
            </UFormField>
            <UFormField
              name="surname"
              label="Apellidos"
              class="mb-3 text-primary-900"
              required
            >
              <UInput
                v-model="registerForm.surname"
                placeholder="Tus apellidos"
                autocomplete="family-name"
              />
            </UFormField>
          </div>

          <div class="flex space-x-2">
            <UFormField
              name="email"
              label="Email"
              class="mb-3 text-primary-900"
              required
            >
              <UInput
                v-model="registerForm.email"
                type="email"
                placeholder="tucorreo@mail.com"
                class="input-nike"
                autocomplete="email"
              />
            </UFormField>

            <UFormField
              name="tlf"
              label="Teléfono (opcional)"
              class="mb-3 text-primary-900"
            >
              <UInput
                v-model="registerForm.tlf"
                type="tel"
                placeholder="+34..."
                class="input-nike"
                autocomplete="tel"
              />
            </UFormField>
          </div>

          <UFormField name="password" label="Password">
            <UInput
              v-model="registerForm.password"
              placeholder="Password"
              :color="color"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              :aria-invalid="score < 4"
              aria-describedby="password-strength"
              class="w-full"
              autocomplete="new-password"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>

          <UProgress
            :color="color"
            :indicator="text"
            :model-value="score"
            :max="4"
            size="sm"
          />

          <p id="password-strength" class="text-sm font-medium">
            {{ text }}. Must contain:
          </p>

          <ul class="space-y-1" aria-label="Password requirements">
            <li
              v-for="(req, index) in strength"
              :key="index"
              class="flex items-center gap-0.5"
              :class="
                req.met ? 'text-(--ui-success)' : 'text-(--ui-text-muted)'
              "
            >
              <UIcon
                :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
                class="size-4 shrink-0"
              />
              <span class="text-xs font-light">
                {{ req.text }}
                <span class="sr-only">
                  {{
                    req.met ? " - Requirement met" : " - Requirement not met"
                  }}
                </span>
              </span>
            </li>
          </ul>

          <UFormField
            name="acceptTOS"
            as="div"
            v-slot="{ error }"
            :error="false"
          >
            <div class="flex items-center gap-2 text-sm text-primary-900">
              <UCheckbox
                v-model="registerForm.acceptTOS"
                :ui="{
                  base: error ? 'border-red-500 ring-1 ring-red-500' : '',
                }"
              />
              <label>
                Acepto la
                <a href="/terminos" class="text-brand1 hover:underline">
                  Política de privacidad
                </a>
                y los Términos de uso.
              </label>
            </div>
            <span v-if="error" class="text-xs text-red-500 mt-1">{{ "" }}</span>
          </UFormField>

          <div class="flex items-center gap-2 text-sm text-primary-900">
            <UCheckbox v-model="registerForm.subscribeNewsletter" />
            <label
              >Regístrate para recibir correos electrónicos y no perderte las
              actualizaciones de productos, ofertas y ventajas para
              Members.</label
            >
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

      <!-- Mensajes de error y éxito -->
      <div
        v-if="apiError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ apiError }}</span>
      </div>
      <div
        v-if="apiSuccess"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">{{ apiSuccess }}</span>
      </div>
    </template>

    <template #footer>
      <!-- Alternar entre login y registro -->
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
import { ref, defineEmits, reactive, computed } from "vue";
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

// Composable de autenticación (asegúrate de crearlo en ~/composables/useAuth.ts, por ejemplo)
import { useAuth } from "~/composables/useAuth";

const isLogin = ref(true); // ¿Estamos en modo Login o Registro?
const isSubmitting = ref(false); // Para mostrar el spinner en los botones
const apiError = ref<string | null>(null);
const apiSuccess = ref<string | null>(null);

const modalOpen = ref(true); // controla la apertura/cierre del modal

// Config y base URL
const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

/**
 * Schemas de validación con valibot
 */
const schemaLogin = v.object({
  email: v.pipe(
    v.string(),
    v.email("El email es inválido."),
    v.nonEmpty("El email es requerido.")
  ),
  password: v.pipe(v.string(), v.nonEmpty("La contraseña es requerida.")),
});

const schemaRegister = v.object({
  name: v.pipe(v.string(), v.nonEmpty("El nombre es requerido.")),
  surname: v.pipe(v.string(), v.nonEmpty("Los apellidos son requeridos.")),
  email: v.pipe(
    v.string(),
    v.email("El email es inválido."),
    v.nonEmpty("El email es requerido.")
  ),
  tlf: v.optional(v.string()),
  password: v.pipe(v.string(), v.nonEmpty("La contraseña es requerida.")),
  acceptTOS: v.literal(true, "Debes aceptar los términos y condiciones."),
  subscribeNewsletter: v.optional(v.boolean()),
});

interface RegisterForm {
  name: string;
  surname: string;
  email: string;
  tlf?: string;
  password: string;
  acceptTOS: boolean;
  subscribeNewsletter?: boolean;
}

// Estados para formularios
const loginForm = reactive({ email: "", password: "" });
const registerForm = reactive<RegisterForm>({
  name: "",
  surname: "",
  email: "",
  tlf: "",
  password: "",
  acceptTOS: false,
  subscribeNewsletter: false,
});

// ---------- LÓGICA DE LOGIN ----------
async function handleLogin() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  // Validamos con Valibot
  const result = v.safeParse(schemaLogin, loginForm);

  function closeModal() {
    modalOpen.value = false;
    console.log("🚪 Cerrando modal...", modalOpen.value);
  }
  if (!result.success) {
    console.warn("❌ Datos inválidos al hacer login:", result.issues);
    isSubmitting.value = false;
    return;
  }

  // Obtenemos funciones del composable
  const { setAuth } = useAuth();

  try {
    // Llamada a la API de login
    const response = await $fetch<{ token: string; email: string }>(
      `${apiUrl}/auth/login`,
      {
        method: "POST",
        body: loginForm,
      }
    );

    // Validamos la respuesta
    if (!response?.token) {
      apiError.value = "No se ha recibido un token al hacer login.";
      return;
    }

    // Guardamos token y email con setAuth
    setAuth(response.token, response.email);

    // Mostramos éxito
    apiSuccess.value = "Login exitoso!";

    closeModal();
  } catch (error: any) {
    console.error("❌ Error en el Login:", error);
    if (error?.data?.message) {
      apiError.value = error.data.message;
    } else {
      apiError.value = "Ha ocurrido un error durante el login.";
    }
  } finally {
    isSubmitting.value = false;
  }
}

// ---------- LÓGICA DE REGISTRO ----------
async function handleRegister() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  const result = v.safeParse(schemaRegister, registerForm);
  if (!result.success) {
    console.warn("❌ Registro inválido:", result.issues);
    isSubmitting.value = false;
    return;
  }

  try {
    // Eliminar tlf si está vacío
    if (!registerForm.tlf) {
      delete registerForm.tlf;
    }

    // Llamada a la API de registro
    await $fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      body: registerForm,
    });

    console.log("✅ Usuario registrado:", registerForm.email);
    apiSuccess.value = "Registro exitoso!";

    // (Opcional) Autologin si el backend devuelve el token tras registro:
    // const response = await $fetch<{ token: string; email: string }>(...)
    // setAuth(response.token, response.email)

    // Cerramos el modal tras un breve retardo
    setTimeout(() => {
      emit("close");
    }, 1500);
  } catch (error: any) {
    console.error("❌ Error en el Registro:", error);
    if (error?.data?.message) {
      apiError.value = error.data.message;
    } else {
      apiError.value = "Ha ocurrido un error durante el registro.";
    }
  } finally {
    isSubmitting.value = false;
  }
}

// ---------- CAMBIAR MODO ENTRE LOGIN / REGISTRO ----------
function toggleMode() {
  isLogin.value = !isLogin.value;
  apiError.value = null;
  apiSuccess.value = null;
}

// ---------- EJEMPLO DE FORTALEZA DE CONTRASEÑA (registro) ----------
const show = ref(false);
function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: "Al menos 8 caracteres" },
    { regex: /\d/, text: "Al menos 1 número" },
    { regex: /[a-z]/, text: "Al menos 1 letra minúscula" },
    { regex: /[A-Z]/, text: "Al menos 1 letra mayúscula" },
  ];
  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

const strength = computed(() => checkStrength(registerForm.password));
const score = computed(() => strength.value.filter((req) => req.met).length);
const color = computed(() => {
  if (score.value === 0) return "neutral";
  if (score.value <= 1) return "error";
  if (score.value <= 2) return "warning";
  if (score.value === 3) return "warning";
  return "success";
});
const text = computed(() => {
  if (score.value === 0) return "Introduce una contraseña";
  if (score.value <= 2) return "Contraseña débil";
  if (score.value === 3) return "Contraseña media";
  return "Contraseña fuerte";
});
</script>

<style scoped>
/* Estilos específicos de tu modal o campos, opcional */
</style>
