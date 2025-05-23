<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:items-start md:gap-8">
      <!-- Formulario dirección (columna izquierda en desktop)-->
      <div class="flex-1">
        <h1 v-if="showTitle" class="text-2xl font-bold mb-6">{{ $t("checkout.shippingTitle") }}</h1>
        <!-- ¡Un único UForm para TODO! -->
        <UForm
          :schema="addressSchema"
          :state="form"
          @submit="submit"
          class="space-y-4 max-w-xl"
        >
      <!-- SHIPPING campos… -->
      <div class="grid grid-cols-2 gap-4">
        <UFormField
          name="name"
          :label="$t('checkout.name')"
          :class="{ 'text-red-500': errors.name }"
        >
          <UInput v-model="form.name" class="w-full" @input="clearError('name')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.name ? 'ring-red-500' : 'ring-gray-300') }" />
        </UFormField>
        <UFormField
          name="surname"
          :label="$t('checkout.surname')"
          :class="{ 'text-red-500': errors.surname }"
        >
          <UInput v-model="form.surname" class="w-full" @input="clearError('surname')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.surname ? 'ring-red-500' : 'ring-gray-300') }" />
        </UFormField>
      </div>

      <!-- EMAIL for guest checkout -->
      <div v-if="!isAuthenticated" class="mb-2">
        <UFormField
          name="email"
          :label="$t('checkout.email')"
          :class="{ 'text-red-500': errors.email }"
        >
          <UInput
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="w-full"
            @input="clearError('email')"
            :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.email ? 'ring-red-500' : 'ring-gray-300') }"
          />
          <template #help v-if="errors.email">
            <span class="text-xs text-red-500">{{ errors.email }}</span>
          </template>
        </UFormField>
      </div>

      <UFormField
        name="phone"
        :label="$t('checkout.phone')"
        :class="{ 'text-red-500': errors.phone }"
      >
        <UInput v-model="form.phone" type="tel" class="w-full" @input="clearError('phone')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.phone ? 'ring-red-500' : 'ring-gray-300') }" />
      </UFormField>
      <UFormField name="zip" :label="$t('checkout.zip')" :class="{ 'text-red-500': errors.zip || !isShippingAvailable }">
        <UInput 
          v-model="form.zip" 
          class="w-full" 
          @input="handleZipCodeChange"
          @blur="validateZipCode" 
          :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + ((errors.zip || !isShippingAvailable) ? 'ring-red-500' : 'ring-gray-300') }" 
        />
        <div v-if="zipCodeMessage" :class="[zipCodeMessageType === 'error' ? 'text-red-500' : 'text-green-600', 'text-xs mt-1']">{{ zipCodeMessage }}</div>
      </UFormField>
      <UFormField
        name="country"
        :label="$t('checkout.country')"
        :class="{ 'text-red-500': errors.country }"
      >
        <UInput v-model="form.country" class="w-full" @input="clearError('country')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.country ? 'ring-red-500' : 'ring-gray-300') }" />
      </UFormField>
      <UFormField name="city" :label="$t('checkout.city')" :class="{ 'text-red-500': errors.city }">
        <UInput v-model="form.city" class="w-full" @input="clearError('city')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.city ? 'ring-red-500' : 'ring-gray-300') }" />
      </UFormField>
      <UFormField
        name="address"
        :label="$t('checkout.street')"
        :class="{ 'text-red-500': errors.address }"
      >
        <UInput v-model="form.address" class="w-full" @input="clearError('address')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.address ? 'ring-red-500' : 'ring-gray-300') }" />
      </UFormField>
      <!-- NUEVOS campos -->
      <div class="grid grid-cols-2 gap-4">
        <UFormField
          name="deliveryDate"
          :label="$t('checkout.deliveryDate')"
          :class="{ 'text-red-500': errors.deliveryDate }"
        >
          <UPopover>
            <UInput
              v-model="formattedDeliveryDate"
              readonly
              class="w-full cursor-pointer"
              :class="{ 'ring-red-500': errors.deliveryDate }"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryDate ? 'ring-red-500' : 'ring-gray-300') }"
              icon="i-lucide-calendar"
            />
            <template #content>
              <div class="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                <MondayFirstCalendar
                  v-model="deliveryDateObject"
                  :min-value="minCalendarDate"
                  :is-date-disabled="isDateDisabled"
                  @update:model-value="handleDateChange"
                  class="bg-white text-gray-900 font-medium"
                />
                <div class="mt-2 text-xs text-gray-500 text-center">
                  {{ $t('checkout.selectDeliveryDate') }}
                </div>
                <div class="mt-1 text-xs text-red-500 text-center">
                  {{ $t('checkout.noSundayDelivery') }}
                </div>
              </div>
            </template>
          </UPopover>
        </UFormField>
        <UFormField
          name="deliveryTime"
          :label="$t('checkout.deliveryTime')"
          :class="{ 'text-red-500': errors.deliveryTime }"
        >
          <UInput 
            v-model="form.deliveryTime" 
            type="time" 
            min="09:00" 
            max="19:00" 
            class="w-full" 
            @input="handleTimeChange" 
            :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryTime ? 'ring-red-500' : 'ring-gray-300') }" 
          />
          <div class="text-xs text-gray-500 mt-1">
            {{ $t('checkout.deliveryTimeRange') }}
          </div>
        </UFormField>
      </div>
      <p class="text-xs text-neutral-600">
        {{ $t("checkout.deliveryInfoImportant") }}
      </p>
      <UFormField
        name="cardNote"
        :label="$t('checkout.cardNoteLabel')"
        :class="{ 'text-red-500': errors.cardNote }"
      >
        <textarea
          v-model="form.cardNote"
          class="w-full rounded p-2 shadow-sm ring-1 ring-inset"
          :class="errors.cardNote ? 'ring-red-500' : 'ring-gray-300'"
          @input="clearError('cardNote')"
          rows="4"
        />
      </UFormField>

      <!-- BILLING checkbox y campos -->
      <UFormField>
        <label class="flex items-center gap-2">
          <UCheckbox v-model="isBillingSameAsShipping" />
          <span v-html="$t('checkout.billingCheckbox')" />
        </label>
      </UFormField>
      <div v-if="!isBillingSameAsShipping" class="pl-4 border-l">
        <UFormField
          name="billingAddress"
          :label="$t('checkout.street')"
          :class="{ 'text-red-500': errors.billingAddress }"
        >
          <UInput v-model="billing.address" class="w-full" @input="clearError('billingAddress')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.billingAddress ? 'ring-red-500' : 'ring-gray-300') }" />
        </UFormField>
        <div class="flex gap-4">
          <UFormField
            name="billingCity"
            :label="$t('checkout.city')"
            :class="{ 'text-red-500': errors.billingCity }"
          >
            <UInput v-model="billing.city" class="w-full" @input="clearError('billingCity')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.billingCity ? 'ring-red-500' : 'ring-gray-300') }" />
          </UFormField>
          <UFormField
            name="billingZip"
            :label="$t('checkout.zip')"
            :class="{ 'text-red-500': errors.billingZip }"
          >
            <UInput v-model="billing.zip" class="w-full" @input="clearError('billingZip')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.billingZip ? 'ring-red-500' : 'ring-gray-300') }" />
          </UFormField>
        </div>
      </div>

      <!-- Quitamos el botón de aquí y lo pondremos en el CartSummary -->
      </UForm>
      <!-- Carrito en mobile -->
      <div class="block md:hidden mt-8">
        <CartSummary ref="mobileCartSummary" @submit="submit" />
      </div>
    </div>
    <!-- Carrito en desktop -->
    <div class="hidden md:block w-full max-w-md">
      <CartSummary ref="desktopCartSummary" @submit="submit" />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartSummary from '~/components/CartSummary.vue';
import { getShippingByPostal } from '~/utils/mallorcaShippingRates';

import { computed, reactive, ref, onMounted } from 'vue';
import { CalendarDate, DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
import { useRouter } from "vue-router";
import { z } from "zod";
import { useI18n } from "vue-i18n";
import { useAuth } from "~/composables/useAuth";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import type { Address } from "~/types/types";

const { t, locale } = useI18n()
const router = useRouter();

const orderStore = useOrderStore();
const cartStore = useCartStore();
const { getAddress, createAddress, updateAddress, userInfo, fetchUserInfo } = useAuth();

// Authentication state
const isAuthenticated = computed(() => {
  // useAuth composable provides isAuthenticated()
  const auth = useAuth();
  return auth && typeof auth.isAuthenticated === 'function' ? auth.isAuthenticated() : false;
});

// UI state
const isSubmitting = ref(false);
const shippingExists = ref(false);
const billingExists = ref(false);
const isBillingSameAsShipping = ref(true);
const saveAsDefault = ref(false);

// Reactive form data
const form = reactive({
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  country: "ES",
  deliveryDate: "",
  deliveryTime: "12:00",
  cardNote: "",
});
const billing = reactive({ address: "", city: "", zip: "", country: "ES" });

// Propiedad reactiva para el objeto CalendarDate del calendario
const deliveryDateObject = ref<CalendarDate>();

// Email validation helper
function isValidEmail(email: string): boolean {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Formateador de fecha para mostrar en el input
const dateFormatter = new DateFormatter(locale.value || 'es-ES', {
  dateStyle: 'medium'
});

// Fecha formateada para mostrar en el input
const formattedDeliveryDate = computed(() => {
  if (!deliveryDateObject.value) return '';
  return dateFormatter.format(deliveryDateObject.value.toDate(getLocalTimeZone()));
});

// Reactive errors object
const errors = reactive<Record<string, string>>({});

// Referencias a los componentes CartSummary
const mobileCartSummary = ref<InstanceType<typeof CartSummary> | null>(null);
const desktopCartSummary = ref<InstanceType<typeof CartSummary> | null>(null);

// Estado para mensajes del código postal
const zipCodeMessage = ref('');
const zipCodeMessageType = ref<'success' | 'error'>('success');
const isShippingAvailable = ref(false); // Controla si el envío está disponible para el código postal

// Funciones para limpiar errores al escribir
function clearError(field: string) {
  if (errors[field]) {
    delete errors[field];
  }
}

// Función para manejar el cambio en el código postal y actualizar los gastos de envío
function handleZipCodeChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const zipCode = input.value;
  
  // Limpiar errores existentes
  clearError('zip');
  clearError('shipping');
  
  // Actualizar los componentes CartSummary con el nuevo código postal
  if (mobileCartSummary.value) {
    mobileCartSummary.value.updateShipping(zipCode);
  }
  if (desktopCartSummary.value) {
    desktopCartSummary.value.updateShipping(zipCode);
  }
  
  // Si el código postal está completo (5 dígitos), validarlo inmediatamente
  if (zipCode && zipCode.length === 5) {
    validateZipCode();
  } else {
    // Si no está completo, limpiar los mensajes
    zipCodeMessage.value = '';
  }
}

// Obtener t desde useI18n para usarlo en las funciones
// Estado para controlar la validez de los costes de envío
const isShippingCostValid = ref(false);
const currentShippingCost = ref(0);
const zipCodeError = ref(false);
const localePath = useLocalePath();

// Validar el código postal cuando el usuario sale del campo
function validateZipCode() {
  const zipCode = form.zip;
  clearError('zip');
  clearError('shipping');
  isShippingCostValid.value = false;
  
  if (zipCode && zipCode.length === 5) {
    const shipping = getShippingByPostal(zipCode);
    if (shipping !== null) {
      // Código postal válido, actualizar el coste de envío
      currentShippingCost.value = shipping;
      isShippingAvailable.value = true;
      isShippingCostValid.value = true;
      zipCodeError.value = false;
      // Limpiar el borde rojo si existía
      const zipInput = document.getElementById('zip-input');
      if (zipInput) {
        zipInput.style.borderColor = '';
      }
    } else {
      // Código postal no disponible para envío
      currentShippingCost.value = 0;
      isShippingAvailable.value = false;
      errors['shipping'] = t('checkout.shippingUnavailableError') || 'No realizamos entregas a este código postal';
      zipCodeError.value = true;
      
      // Añadir borde rojo al input
      const zipInput = document.getElementById('zip-input');
      if (zipInput) {
        zipInput.style.borderColor = 'red';
      }
    }
  } else if (zipCode && zipCode.length > 0) {
    // Código postal inválido (no tiene 5 dígitos)
    currentShippingCost.value = 0;
    isShippingAvailable.value = false;
    zipCodeError.value = true;
    
    // Añadir borde rojo al input
    const zipInput = document.getElementById('zip-input');
    if (zipInput) {
      zipInput.style.borderColor = 'red';
    }
  } else {
    // No hay código postal
    isShippingAvailable.value = false;
    errors['shipping'] = t('validation.required') || 'El código postal es obligatorio';
  }
}

// Variable reactiva para controlar la visibilidad del título
const showTitle = ref(true);

// Calcular la fecha mínima de entrega (un día después del actual)
const minDeliveryDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0]; // Formato YYYY-MM-DD
});

// Fecha mínima para el calendario (un día después del actual)
const minCalendarDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new CalendarDate(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate());
});

// Función para verificar si una fecha debe estar deshabilitada (domingos)
const isDateDisabled = (date: DateValue) => {
  // Convertir a Date de JavaScript para verificar el día de la semana
  const jsDate = date.toDate(getLocalTimeZone());
  // 0 = domingo en JavaScript
  return jsDate.getDay() === 0;
};

// Función para validar la hora de entrega (entre 9:00 y 19:00)
function handleTimeChange(event: Event) {
  const timeInput = event.target as HTMLInputElement;
  const selectedTime = timeInput.value;
  
  // Limpiar el error si existe
  clearError('deliveryTime');
  
  // Validar que la hora esté dentro del rango permitido
  if (selectedTime) {
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    // Convertir 9:00 y 19:00 a minutos para comparar
    const minTimeInMinutes = 9 * 60; // 9:00
    const maxTimeInMinutes = 19 * 60; // 19:00
    
    if (timeInMinutes < minTimeInMinutes || timeInMinutes > maxTimeInMinutes) {
      // Si está fuera del rango, establecer el valor más cercano dentro del rango
      if (timeInMinutes < minTimeInMinutes) {
        form.deliveryTime = '09:00';
      } else {
        form.deliveryTime = '19:00';
      }
    }
  }
};

// Función para manejar el cambio de fecha en el calendario
function handleDateChange(date: CalendarDate) {
  // Convertir el objeto CalendarDate a string en formato YYYY-MM-DD
  const jsDate = date.toDate(getLocalTimeZone());
  form.deliveryDate = jsDate.toISOString().split('T')[0];
  // Limpiar error si existe
  clearError('deliveryDate');
};

// Función para verificar si todos los campos obligatorios están completos
function checkAllFieldsCompleted() {
  const requiredFields = ['name', 'surname', 'phone', 'address', 'city', 'zip', 'country', 'deliveryDate', 'deliveryTime'];
  const allCompleted = requiredFields.every(field => {
    // Usar acceso tipado para evitar errores de TypeScript
    return form[field as keyof typeof form] && (form[field as keyof typeof form] as string).trim() !== '';
  });
  
  // Si todos los campos están completos, ocultar el título
  showTitle.value = !allCompleted;
}

// Verificar el estado inicial de los campos cuando se monta el componente
onMounted(() => {
  checkAllFieldsCompleted();
});

// Zod schemas
const addressSchema = z.object({
  name: z.string().min(1, t("validation.required")),
  surname: z.string().min(1, t("validation.required")),
  phone: z.string().min(1, t("validation.required")),
  address: z.string().min(1, t("validation.required")),
  city: z.string().min(1, t("validation.required")),
  zip: z.string().min(1, t("validation.required")),
  country: z.string().min(1, t("validation.required")),
  deliveryDate: z.string().min(1, t("validation.required")),
  deliveryTime: z.string().min(1, t("validation.required")),
  cardNote: z.string().optional(),
});
const billingSchema = z.object({
  address: z.string().min(1, t("validation.required")),
  city: z.string().min(1, t("validation.required")),
  zip: z.string().min(1, t("validation.required")),
  country: z.string().min(1, t("validation.required")),
});

// IDs for update vs create
let shippingId: string | null = null;
let billingId: string | null = null;

// Load user & addresses
onMounted(async () => {
  await fetchUserInfo();
  if (userInfo.value) {
    Object.assign(form, {
      name: userInfo.value.name,
      surname: userInfo.value.surname,
      email: userInfo.value.email,
      phone: userInfo.value.phone,
    });
  }
  
  // Establecer la fecha mínima como valor por defecto si no hay fecha establecida
  if (!form.deliveryDate) {
    // Obtener la fecha de mañana
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Si mañana es domingo, avanzar al lunes
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    
    // Formatear la fecha y asignarla al formulario
    form.deliveryDate = tomorrow.toISOString().split('T')[0];
    deliveryDateObject.value = new CalendarDate(
      tomorrow.getFullYear(), 
      tomorrow.getMonth() + 1, 
      tomorrow.getDate()
    );
  } else {
    // Si ya hay una fecha, convertirla a objeto CalendarDate para el calendario
    const parts = form.deliveryDate.split('-');
    deliveryDateObject.value = new CalendarDate(
      parseInt(parts[0]), 
      parseInt(parts[1]), 
      parseInt(parts[2])
    );
  }
  
  // Asegurarse de que la hora predefinida sea 12:00 si no hay una hora establecida
  if (!form.deliveryTime) {
    form.deliveryTime = "12:00";
  }
  const ship = await getAddress("shipping");
  if (ship) {
    shippingExists.value = true;
    shippingId = ship.id;
    Object.assign(form, {
      address: ship.street,
      city: ship.city,
      zip: ship.postalCode,
      country: ship.country || 'ES', // Añadimos el país y usamos 'ES' como valor por defecto
    });
    
    // Actualizar los gastos de envío con el código postal cargado
    if (ship.postalCode) {
      // Esperar brevemente para asegurar que los refs de CartSummary estén disponibles
      setTimeout(() => {
        handleZipCodeChange({ target: { value: ship.postalCode } } as any);
        validateZipCode(); // Validar y mostrar el mensaje correspondiente
      }, 100);
    }
  }
  const bill = await getAddress("billing");
  if (bill) {
    billingExists.value = true;
    billingId = bill.id;
    isBillingSameAsShipping.value = false;
    Object.assign(billing, {
      address: bill.street,
      city: bill.city,
      zip: bill.postalCode,
      country: bill.country,
    });
  }
});

async function submit(callbacks?: { onError?: (errors: Record<string, string>) => void, onSuccess?: () => void }) {
  // clear previous errors
  Object.keys(errors).forEach((k) => delete errors[k]);

  // Email validation for guest checkout
  if (!isAuthenticated.value) {
    if (!form.email) {
      errors.email = t('validation.required') || 'El email es obligatorio';
    } else if (!isValidEmail(form.email)) {
      errors.email = t('validation.email') || 'Introduce un email válido';
    }
  }

  // Verificar la disponibilidad de envío antes de continuar
  validateZipCode();
  
  // Si el código postal no está disponible para envío, detener el proceso
  if (!isShippingAvailable.value) {
    errors['shipping'] = t('checkout.shippingUnavailableError') || 'No realizamos entregas a este código postal';
    if (callbacks?.onError) {
      callbacks.onError(errors);
    }
    return;
  }

  // If there are errors, stop submission
  if (Object.keys(errors).length > 0) {
    if (callbacks?.onError) {
      callbacks.onError(errors);
    }
    return;
  }

  // validate shipping form
  const s = addressSchema.safeParse(form);
  if (!s.success) {
    for (const issue of s.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    
    // Si hay errores y se proporcionó un callback de error, llámalo con los errores
    if (callbacks?.onError) {
      callbacks.onError(errors);
    }
    return;
  }
  // validate billing if shown
  if (!isBillingSameAsShipping.value) {
    const b = billingSchema.safeParse(billing);
    if (!b.success) {
      for (const issue of b.error.issues) {
        const key = `billing${issue.path[0].toString().charAt(0).toUpperCase() + issue.path[0].toString().slice(1)}` as string;
        errors[key] = issue.message;
      }
      
      // Si hay errores y se proporcionó un callback de error, llámalo con los errores
      if (callbacks?.onError) {
        callbacks.onError(errors);
      }
      return;
    }
  }

  isSubmitting.value = true;
  try {
    // Verificar si el usuario está autenticado
    const isAuthenticated = userInfo.value !== null;
    
    // build payloads
    console.log('Información del formulario:', form);
    console.log('Usuario autenticado:', isAuthenticated);
    
    // Siempre incluir la información del usuario en el payload, independientemente de si está autenticado o no
    const shippingPayload: Address = {
      id: shippingId || "",
      type: "shipping" as const,
      isDefault: saveAsDefault.value,
      street: form.address,
      city: form.city,
      postalCode: form.zip,
      country: form.country || "ES",
      // Incluir información del usuario siempre
      name: form.name,
      surname: form.surname,
      email: form.email,
      phone: form.phone
    };
    
    // Usar el shippingPayload sin modificar (el shippingCost va en el nivel superior)
    console.log('Dirección de envío con información del usuario:', shippingPayload);
    
    const billingPayload = isBillingSameAsShipping.value
      ? null
      : {
          id: billingId || "",
          type: "billing" as const,
          isDefault: saveAsDefault.value,
          street: billing.address,
          city: billing.city,
          postalCode: billing.zip,
          country: billing.country || "ES",
          // Incluir información del usuario solo para usuarios invitados
          ...(!isAuthenticated ? {
            name: form.name,
            surname: form.surname,
            email: form.email,
            phone: form.phone
          } : {}),
        };
        
    console.log('Costo de envío actual:', currentShippingCost.value);

    // persist default addresses if requested
    // Usamos el shippingPayload original (sin shippingCost) para guardar la dirección
    if (saveAsDefault.value) {
      shippingExists.value
        ? await updateAddress(shippingPayload)
        : await createAddress(shippingPayload);
      if (billingPayload) {
        billingExists.value
          ? await updateAddress(billingPayload)
          : await createAddress(billingPayload);
      }
    }

    console.log('Antes de crear la orden');
    // create order in store (this will call your /api/orders)
    try {
      // Guardar los datos de la orden en localStorage para que estén disponibles en la página de pago
      const orderData = {
        shipping: shippingPayload, // Usar el payload original (sin shippingCost)
        billing: billingPayload,
        deliveryDate: form.deliveryDate,
        deliveryTime: form.deliveryTime,
        cardNote: form.cardNote,
        items: cartStore.items,
        shippingCost: currentShippingCost.value, // shippingCost en el nivel superior
        total: cartStore.totalPrice + currentShippingCost.value
      };
      
      // Guardar en localStorage
      localStorage.setItem('lastOrderData', JSON.stringify(orderData));
      console.log('Datos de la orden guardados en localStorage:', orderData);
      
      // Crear la orden en el backend con el idioma actual
      await orderStore.createOrder(shippingPayload, billingPayload, {
        deliveryDate: form.deliveryDate,
        deliveryTime: form.deliveryTime,
        cardNote: form.cardNote,
        shippingCost: currentShippingCost.value,
        language: locale.value // Usar el locale obtenido en el setup
      });
      console.log('Orden creada correctamente');
      console.log('ClientSecret:', orderStore.clientSecret);
      
      // Verificar que tenemos un clientSecret válido
      if (!orderStore.clientSecret) {
        throw new Error('No se ha generado un clientSecret válido');
      }
      
      // clear cart
      cartStore.clearCart();
      console.log('Carrito limpiado');
      
      // Llamar al callback de éxito si se proporcionó
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
        console.log('Callback de éxito ejecutado');
      }
      
      // Esperar un momento para asegurar que el estado se ha actualizado
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // go to payment
      console.log('Intentando redirigir a /checkout/payment');
      await router.push(localePath('/checkout/payment'));
      console.log('Redirección exitosa');
    } catch (error) {
      console.error('Error al crear la orden o redirigir:', error);
      // Mostrar un mensaje de error al usuario
      errors['submit'] = 'Ha ocurrido un error al procesar tu orden. Por favor, inténtalo de nuevo.';
    }
  } finally {
    isSubmitting.value = false;
  }
}

</script>
