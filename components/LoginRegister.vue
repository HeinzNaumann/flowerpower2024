<template>
  <!-- UModal con diseño Nike -->
  <UModal
    :title="
      isLogin
        ? 'Introduce tu dirección de correo electrónico para unirte o iniciar sesión.'
        : 'Vamos a hacerte Flower Power Member'
    "
    description=""
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
            <UInput v-model="loginForm.email" />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput v-model="loginForm.password" type="password" />
          </UFormField>

          <!-- Botón principal dentro del formulario de login -->
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
            <template v-else> Continuar </template>
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
          <div class="flex space-x-2">
            <UFormField
              name="firstName"
              label="Nombre"
              class="mb-3 text-primary-900"
              required
            >
              <UInput
                v-model="registerForm.firstName"
                placeholder="Tu nombre"
              />
            </UFormField>

            <UFormField
              name="lastName"
              label="Apellidos"
              class="mb-3 text-primary-900"
              required
            >
              <UInput
                v-model="registerForm.lastName"
                placeholder="Tus apellidos"
                class="input-nike"
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
              />
            </UFormField>

            <UFormField
              name="phone"
              label="Teléfono (opcional)"
              class="mb-3 text-primary-900"
            >
              <UInput
                v-model="registerForm.phone"
                type="tel"
                placeholder="+34..."
                class="input-nike"
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

          <!-- Botón principal dentro del formulario de registro -->
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
            <template v-else> Registrarme </template>
          </UButton>
        </UForm>
      </template>
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

<style scoped></style>

<script setup lang="ts">
import { ref, defineEmits, reactive, computed } from "vue";
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const isLogin = ref(true);
const isSubmitting = ref(false);
const apiError = ref<string | null>(null);
const apiSuccess = ref<string | null>(null);

const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

const schemaLogin = v.object({
  email: v.pipe(
    v.string(),
    v.email("The email is badly formatted."),
    v.nonEmpty("Email is required")
  ),
  password: v.pipe(v.string(), v.nonEmpty("Password is required")),
});

const emit = defineEmits(["close"]);

// Formularios diferenciados
const loginForm = reactive({
  email: "",
  password: "",
});

const schemaRegister = v.object({
  firstName: v.pipe(v.string(), v.nonEmpty("Name is required")),
  lastName: v.pipe(v.string(), v.nonEmpty("Last name is required")),
  email: v.pipe(
    v.string(),
    v.email("The email is badly formatted."),
    v.nonEmpty("Email is required")
  ),
  phone: v.optional(v.string()),
  password: v.pipe(v.string(), v.nonEmpty("Password is required")),
  acceptTOS: v.literal(true, "You must accept the terms of service."),
  subscribeNewsletter: v.optional(v.boolean()),
});

const registerForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  acceptTOS: false,
  subscribeNewsletter: false,
});

function toggleMode() {
  isLogin.value = !isLogin.value;
  //reset messages
  apiError.value = null;
  apiSuccess.value = "";
}

async function handleLogin() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  const result = v.safeParse(schemaLogin, loginForm);
  if (!result.success) {
    console.log("❌ Login datos inválidos:", result.issues);
    isSubmitting.value = false;
    return;
  }

  try {
    const response: { token: string } = await $fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: loginForm,
    });

    const token = response.token;

    if (token) {
      localStorage.setItem("token", token);

      console.log("✅ Iniciando sesión con", loginForm.email);
      apiSuccess.value = "Login success";
    } else {
      apiError.value = "Token no t received on login";
    }

    setTimeout(() => {
      emit("close");
    }, 2000);
  } catch (error: any) {
    console.error("❌ Error en el Login:", error);
    if (error.data.message) {
      apiError.value = error.data.message;
    } else {
      apiError.value = "An error occurred during the login.";
    }
  } finally {
    isSubmitting.value = false;
  }
}

async function handleRegister() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  const result = v.safeParse(schemaRegister, registerForm);
  if (!result.success) {
    console.log("❌ Registro inválido:", result.issues);
    isSubmitting.value = false;
    return;
  }

  try {
    const response = await $fetch(`${apiUrl}/api/register`, {
      method: "POST",
      body: registerForm,
    });
    console.log("✅ Registrando usuario con", registerForm.email);

    apiSuccess.value = "Register success";
    setTimeout(() => {
      emit("close");
    }, 2000);
  } catch (error: any) {
    console.error("❌ Error en el Registro:", error);
    if (error.data.message) {
      apiError.value = error.data.message;
    } else {
      apiError.value = "An error occurred during the register.";
    }
  } finally {
    isSubmitting.value = false;
  }
}

const show = ref(false);
function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /\d/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
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
  if (score.value === 0) return "Enter a password";
  if (score.value <= 2) return "Weak password";
  if (score.value === 3) return "Medium password";
  return "Strong password";
});
</script>
