<template>
  <UModal
    :title="modalTitle"
    :description="modalDescription"
    v-model:open="internalOpen"
    id="loginRegisterModal"
    overlay
  >
    <template #body>
      <!-- INITIAL OPTIONS -->
      <div v-if="currentView === 'initial'" class="space-y-4">
        <UButton
          :label="t('loginRegister.buttonLogin')"
          icon="i-lucide-log-in"
          color="primary"
          variant="solid"
          class="w-full btn-nike"
          @click="switchToLogin"
        />
        <UButton
          :label="t('loginRegister.buttonRegister')"
          icon="i-lucide-user-plus"
          color="primary"
          variant="outline"
          class="w-full btn-nike"
          @click="switchToRegister"
        />
        <USeparator :label="t('loginRegister.separatorOr')" />
        <UButton
          :label="t('loginRegister.buttonGuest')"
          icon="i-lucide-user-check"
          color="neutral"
          variant="ghost"
          class="w-full btn-nike"
          @click="handleContinueAsGuest"
        />
      </div>

      <!-- LOGIN FORM -->
      <template v-if="currentView === 'login'">
        <UForm
          :schema="loginSchema"
          :state="loginForm"
          class="space-y-4"
          @submit="handleLogin"
        >
          <UFormField :label="t('loginRegister.labelEmail')" name="email" class="w-full">
            <UInput
              v-model="loginForm.email"
              type="email"
              autocomplete="email"
              class="w-full"
              :placeholder="t('loginRegister.placeholderEmail')"
            />
          </UFormField>

          <UFormField :label="t('loginRegister.labelPassword')" name="password" class="w-full">
            <UInput
              v-model="loginForm.password"
              type="password"
              autocomplete="current-password"
              class="w-full"
              :placeholder="t('loginRegister.placeholderPassword')"
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
            <template v-else>{{ t('loginRegister.buttonSubmitLogin') }}</template>
          </UButton>
          <div class="text-sm text-right mt-2">
            <NuxtLink
              to="/forgot-password"
              class="text-primary-600 hover:underline"
              @click.prevent="internalOpen = false"
            >
              {{ t('loginRegister.linkForgotPassword') }}
            </NuxtLink>
          </div>
        </UForm>
      </template>

      <!-- REGISTRO FORM -->
      <template v-if="currentView === 'register'">
        <UForm
          :schema="registerSchema"
          :state="registerForm"
          @submit="handleRegister"
          class="space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField name="name" :label="t('loginRegister.labelName')" class="w-full">
              <UInput
                v-model="registerForm.name"
                :placeholder="t('loginRegister.placeholderName')"
                autocomplete="given-name"
                class="w-full"
              />
            </UFormField>
            <UFormField name="surname" :label="t('loginRegister.labelSurname')" class="w-full">
              <UInput
                v-model="registerForm.surname"
                :placeholder="t('loginRegister.placeholderSurname')"
                autocomplete="family-name"
                class="w-full"
              />
            </UFormField>
          </div>

          <!-- EMAIL Y CONFIRMACIÓN -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField name="email" :label="t('loginRegister.labelEmail')" class="w-full">
              <UInput
                v-model="registerForm.email"
                type="email"
                :placeholder="t('loginRegister.placeholderEmail')"
                autocomplete="email"
                class="w-full"
              />
            </UFormField>

            <UFormField name="confirmEmail" :label="t('loginRegister.labelConfirmEmail')" class="w-full">
              <UInput
                v-model="registerForm.confirmEmail"
                type="email"
                :placeholder="t('loginRegister.placeholderConfirmEmail')"
                autocomplete="email"
                class="w-full"
              />
            </UFormField>
          </div>

          <PhoneField v-model="registerForm.phone" />

          <UFormField name="password" :label="t('loginRegister.labelPassword')" class="w-full">
            <UInput
              v-model="registerForm.password"
              :placeholder="t('loginRegister.placeholderPassword')"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="xs"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  @click="show = !show"
                  aria-label="Toggle password visibility"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField name="acceptTOS">
            <div class="flex items-center gap-2 text-sm text-primary-900">
              <div class="custom-checkbox-wrapper">
                <input 
                  id="acceptTOS" 
                  v-model="registerForm.acceptTOS" 
                  type="checkbox" 
                  class="custom-checkbox" 
                />
                <label for="acceptTOS" class="custom-checkbox-label">
                  <span class="custom-checkbox-box">
                    <svg class="custom-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </span>
                </label>
              </div>
              <label for="acceptTOS" class="cursor-pointer">
                {{ t('loginRegister.acceptPrefix') }}
                <NuxtLink to="/privacy-policy" class="text-brand1 hover:underline">
                  {{ t('footer.links.privacyPolicy') }}
                </NuxtLink>
                {{ ' ' + t('loginRegister.acceptAnd') + ' ' }}
                <NuxtLink to="/terms-of-use" class="text-brand1 hover:underline">
                  {{ t('footer.links.termsOfUse') }}
                </NuxtLink>
                {{ t('loginRegister.acceptSuffix') }}
              </label>
            </div>
          </UFormField>

          <div class="flex items-center gap-2 text-sm text-primary-900">
            <div class="custom-checkbox-wrapper">
              <input 
                id="subscribeNewsletter" 
                v-model="registerForm.subscribeNewsletter" 
                type="checkbox" 
                class="custom-checkbox" 
              />
              <label for="subscribeNewsletter" class="custom-checkbox-label">
                <span class="custom-checkbox-box">
                  <svg class="custom-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </span>
              </label>
            </div>
            <label for="subscribeNewsletter" class="cursor-pointer">
              {{ t('loginRegister.checkboxSubscribeNewsletter') }}
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
            <template v-else>{{ t('loginRegister.buttonSubmitRegister') }}</template>
          </UButton>
        </UForm>
      </template>

      <!-- MENSAJES DE API -->
      <div
        v-if="apiError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
        role="alert"
      >
        <strong class="font-bold">{{ t('loginRegister.apiErrorTitle') }}</strong>
        <span class="block sm:inline">{{ apiError }}</span>
      </div>

      <div
        v-if="apiSuccess"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
        role="alert"
      >
        <strong class="font-bold">{{ t('loginRegister.apiSuccessTitle') }}</strong>
        <span class="block sm:inline">{{ apiSuccess }}</span>
      </div>
    </template>

    <template #footer v-if="currentView !== 'initial'">
      <UButton
        v-if="currentView === 'login'"
        variant="link"
        color="primary"
        class="mt-2 block text-sm text-primary-900 hover:text-primary-700 w-full text-center"
        @click="switchToRegister"
      >
        <small>{{ t('loginRegister.footerLinkRegister') }}</small>
      </UButton>
      <UButton
        v-if="currentView === 'register'"
        variant="link"
        color="primary"
        class="mt-2 block text-sm text-primary-900 hover:text-primary-700 w-full text-center"
        @click="switchToLogin"
      >
        <small>{{ t('loginRegister.footerLinkLogin') }}</small>
      </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { z } from "zod";
import { usePhoneNumberValidation } from "~/composables/usePhoneNumberValidation";
import { useI18n } from "vue-i18n";
import type { RegisterForm } from "~/types/types";
import type { CountryCode } from "libphonenumber-js";
import { USeparator } from "#components";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:open",
  "loggedIn",
  "registered",
  "continuedAsGuest",
]);

const internalOpen = ref(props.open);
watch(
  () => props.open,
  (newVal) => {
    internalOpen.value = newVal;
    if (newVal) {
      currentView.value = "initial";
      apiError.value = null;
      apiSuccess.value = null;
    }
  }
);
watch(internalOpen, (newVal) => {
  if (!newVal) {
    emit("update:open", false);
  }
});

const currentView = ref<"initial" | "login" | "register">("initial");

const isSubmitting = ref(false);
const apiError = ref<string | null>(null);
const apiSuccess = ref<string | null>(null);
const show = ref(false);

const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;
const { t } = useI18n();

const modalTitle = computed(() => {
  switch (currentView.value) {
    case "login":
      return t('loginRegister.modalTitleLogin');
    case "register":
      return t('loginRegister.modalTitleRegister');
    default:
      return t('loginRegister.modalTitleInitial');
  }
});

const modalDescription = computed(() => {
  switch (currentView.value) {
    case "login":
      return t('loginRegister.modalDescriptionLogin');
    case "register":
      return t('loginRegister.modalDescriptionRegister');
    default:
      return t('loginRegister.modalDescriptionInitial');
  }
});

const { isValidPhone } = usePhoneNumberValidation();

const loginSchema = z.object({
  email: z.string().email(t('loginRegister.validation.invalidEmail')),
  password: z.string().min(1, t('loginRegister.validation.required')),
});

const registerSchema = z
  .object({
    name: z.string().min(1, t('loginRegister.validation.required')),
    surname: z.string().min(1, t('loginRegister.validation.required')),
    email: z.string().email(t('loginRegister.validation.invalidEmail')),
    confirmEmail: z.string().email(t('loginRegister.validation.invalidEmail')),
    countryCode: z.string().min(2).max(2),
    phone: z.string(),
    password: z
      .string()
      .min(8, t('loginRegister.validation.passwordMin'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        t('loginRegister.validation.passwordPattern')
      ),
    acceptTOS: z
      .boolean()
      .refine((v) => v === true, {
        message: t('loginRegister.validation.acceptTOS'),
      }),
    subscribeNewsletter: z.boolean().optional(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: t('loginRegister.validation.emailMismatch'),
    path: ["confirmEmail"],
  });

const registerForm: RegisterForm = reactive({
  name: "",
  surname: "",
  email: "",
  confirmEmail: "",
  phone: "",
  countryCode: "ES",
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
      apiError.value = t('loginRegister.apiErrorLoginToken');
      return;
    }

    const getUsernameFromEmail = (email: string): string => email.split("@")[0];
    setAuth(response.token, getUsernameFromEmail(response.email));
    apiSuccess.value = t('loginRegister.apiSuccessLogin', { username: getUsernameFromEmail(response.email) });

    emit("loggedIn");

    setTimeout(() => {
      internalOpen.value = false;
    }, 1500);
  } catch (error: any) {
    apiError.value = error?.data?.message || t('loginRegister.apiErrorLoginGeneral');
  } finally {
    isSubmitting.value = false;
  }
}

async function handleRegister() {
  isSubmitting.value = true;
  apiError.value = null;
  apiSuccess.value = null;

  if (registerForm.phone) {
    const phoneValid = isValidPhone(
      registerForm.phone,
      (registerForm.countryCode || "ES") as CountryCode
    );
    if (!phoneValid) {
      apiError.value = t('loginRegister.apiErrorRegisterPhone');
      isSubmitting.value = false;
      return;
    }
    console.log("Teléfono a enviar:", registerForm.phone);
  }

  if (!registerForm.countryCode) {
    registerForm.countryCode = "ES";
  }

  console.log("Intentando registrar usuario con datos:", {
    ...registerForm,
    password: "********",
  });

  try {
    const { countryCode, confirmEmail, ...body } = registerForm;

    console.log(`Enviando solicitud de registro a ${apiUrl}/auth/register`);

    const response = await $fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      body,
      timeout: 10000,
    });

    console.log("Respuesta del servidor de registro:", response);

    apiSuccess.value = t('loginRegister.apiSuccessRegister', { email: registerForm.email });

    emit("registered");

    setTimeout(() => {
      internalOpen.value = false;
    }, 3000);
  } catch (error: any) {
    console.error("Error durante el registro:", error);
    
    // Detectar si el error es de usuario ya registrado
    const errorMessage = error?.data?.message || error?.message;
    const errorStatus = error?.status || error?.data?.status;
    
    if (errorStatus === 409 || 
        errorStatus === 400 && errorMessage?.toLowerCase()?.includes("already exists") ||
        errorMessage?.toLowerCase()?.includes("already registered") ||
        errorMessage?.toLowerCase()?.includes("usuario ya registrado") ||
        errorMessage?.toLowerCase()?.includes("email already exists")) {
      apiError.value = t('auth.errors.userAlreadyRegistered');
    } else {
      apiError.value = errorMessage || t('loginRegister.apiErrorRegisterGeneral');
    }
  } finally {
    isSubmitting.value = false;
  }
}

function switchToLogin() {
  currentView.value = "login";
  resetFormsAndMessages();
}

function switchToRegister() {
  currentView.value = "register";
  resetFormsAndMessages();
}

function handleContinueAsGuest() {
  emit("continuedAsGuest");
  internalOpen.value = false;
}

function resetFormsAndMessages() {
  apiError.value = null;
  apiSuccess.value = null;
  Object.assign(loginForm, {
    email: "",
    password: "",
  });
  Object.assign(registerForm, {
    name: "",
    surname: "",
    email: "",
    confirmEmail: "", // Solo para validación local, no se envía
    phone: "",
    password: "",
    acceptTOS: false,
    subscribeNewsletter: false,
  });
}
</script>
