<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Formulario dirección (columna izquierda en desktop)-->
      <div class="flex-1">
        <h1 v-if="showTitle" class="text-2xl font-bold mb-6">{{ $t("checkout.shippingTitle") }}</h1>
        <!-- ¡Un único UForm para TODO! -->
        <UForm
          :schema="addressSchema"
          :state="form"
          @submit="submit"
          class="space-y-4 max-w-xl"
          :validate-on="[]"
        >
      <section class="space-y-4 rounded-lg border border-neutral-200 bg-white/90 p-4 sm:p-6 shadow-sm">
        <div class="space-y-1">
          <h2 class="text-lg font-semibold text-primary-900">{{ $t('checkout.contactSectionTitle') }}</h2>
          <p class="text-sm text-neutral-600">
            {{ $t('checkout.contactSectionDescription') }}
          </p>
          <p
            v-if="isAuthenticated && accountEmail"
            class="text-xs text-neutral-500"
          >
            {{ $t('checkout.contactSectionAccountEmail', { email: accountEmail }) }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField
            name="name"
            :label="$t('checkout.name')"
            class="md:col-span-1"
            :class="{ 'text-red-500': errors.name }"
          >
            <UInput
              v-model="form.name"
              class="w-full"
              @input="clearError('name')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.name ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="surname"
            :label="$t('checkout.surname')"
            class="md:col-span-1"
            :class="{ 'text-red-500': errors.surname }"
          >
            <UInput
              v-model="form.surname"
              class="w-full"
              @input="clearError('surname')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.surname ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.surname" class="text-xs text-red-500 mt-1">{{ errors.surname }}</div>
            <template #error></template>
          </UFormField>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField
            v-if="!isAuthenticated"
            name="email"
            :label="$t('checkout.email')"
            class="md:col-span-1"
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
            <div v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="phone"
            :label="$t('checkout.phone')"
            :class="[
              'md:col-span-1',
              { 'md:col-span-2': isAuthenticated, 'text-red-500': errors.phone }
            ]"
          >
            <UInput
              v-model="form.phone"
              type="tel"
              class="w-full"
              @input="clearError('phone')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.phone ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</div>
            <template #error></template>
          </UFormField>
        </div>
      </section>

      <!-- Delivery section -->
      <section class="space-y-4 rounded-lg border border-neutral-200 bg-white/90 p-4 sm:p-6 shadow-sm">
        <div class="space-y-1">
          <h2 class="text-lg font-semibold text-primary-900">{{ $t('checkout.deliverySectionTitle') }}</h2>
          <p class="text-sm text-neutral-600">
            {{ $t('checkout.deliverySectionDescription') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField
            name="deliveryRecipientName"
            :label="$t('checkout.deliveryRecipientName')"
            :class="{ 'text-red-500': errors.deliveryRecipientName }"
          >
            <UInput
              v-model="form.deliveryRecipientName"
              class="w-full"
              @input="clearError('deliveryRecipientName')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryRecipientName ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.deliveryRecipientName" class="text-xs text-red-500 mt-1">{{ errors.deliveryRecipientName }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="deliveryRecipientSurname"
            :label="$t('checkout.deliveryRecipientSurname')"
            :class="{ 'text-red-500': errors.deliveryRecipientSurname }"
          >
            <UInput
              v-model="form.deliveryRecipientSurname"
              class="w-full"
              @input="clearError('deliveryRecipientSurname')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryRecipientSurname ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.deliveryRecipientSurname" class="text-xs text-red-500 mt-1">{{ errors.deliveryRecipientSurname }}</div>
            <template #error></template>
          </UFormField>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField
            name="address"
            :label="$t('checkout.street')"
            class="md:col-span-2"
            :class="{ 'text-red-500': errors.address }"
          >
            <UInput
              v-model="form.address"
              class="w-full"
              @input="clearError('address')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.address ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.address" class="text-xs text-red-500 mt-1">{{ errors.address }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="city"
            :label="$t('checkout.city')"
            class="md:col-span-1"
            :class="{ 'text-red-500': errors.city }"
          >
            <UInput
              v-model="form.city"
              class="w-full"
              @input="clearError('city')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.city ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.city" class="text-xs text-red-500 mt-1">{{ errors.city }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="zip"
            :label="$t('checkout.zip')"
            class="md:col-span-1"
            :class="{ 'text-red-500': errors.zip || zipCodeError }"
          >
            <UInput 
              v-model="form.zip" 
              class="w-full" 
              @input="handleZipCodeChange"
              @blur="validateZipCode" 
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + ((errors.zip || zipCodeError) ? 'ring-red-500' : 'ring-gray-300') }" 
            />
            <div v-if="errors.zip" class="text-xs text-red-500 mt-1">{{ errors.zip }}</div>
            <div v-else-if="zipCodeMessage" :class="[zipCodeMessageType === 'error' ? 'text-red-500' : 'text-green-600', 'text-xs mt-1']">
              {{ zipCodeMessage }}
            </div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="country"
            :label="$t('checkout.country')"
            class="md:col-span-1"
            :class="{ 'text-red-500': errors.country }"
          >
            <UInput
              v-model="form.country"
              class="w-full"
              @input="clearError('country')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.country ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.country" class="text-xs text-red-500 mt-1">{{ errors.country }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="deliveryPhone"
            :label="$t('checkout.deliveryPhoneLabel')"
            class="md:col-span-1"
            :class="{ 'text-red-500': errors.deliveryPhone }"
          >
            <UInput
              v-model="form.deliveryPhone"
              type="tel"
              class="w-full"
              @input="clearError('deliveryPhone')"
              :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryPhone ? 'ring-red-500' : 'ring-gray-300') }"
            />
            <div v-if="errors.deliveryPhone" class="text-xs text-red-500 mt-1">{{ errors.deliveryPhone }}</div>
            <template #error></template>
          </UFormField>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div class="mt-2 text-xs text-amber-600 font-medium text-center bg-amber-50 p-2 rounded">
                    {{ $t('checkout.vacationNote') }}
                  </div>
                </div>
              </template>
            </UPopover>
            <div v-if="errors.deliveryDate" class="text-xs text-red-500 mt-1">{{ errors.deliveryDate }}</div>
            <template #error></template>
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
            <div v-if="errors.deliveryTime" class="text-xs text-red-500 mt-1">{{ errors.deliveryTime }}</div>
            <template #error></template>
          </UFormField>
        </div>
        <p class="text-xs text-neutral-600">
          {{ $t('checkout.deliveryInfoImportant') }}
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
          <div v-if="errors.cardNote" class="text-xs text-red-500 mt-1">{{ errors.cardNote }}</div>
          <template #error></template>
        </UFormField>
      </section>

      <!-- BILLING checkbox y campos -->
      <UFormField>
        <div class="flex items-center gap-2 text-sm text-primary-900">
          <div class="custom-checkbox-wrapper">
            <input 
              id="billingSameAsShipping" 
              v-model="isBillingSameAsShipping" 
              type="checkbox" 
              class="custom-checkbox" 
            />
            <label for="billingSameAsShipping" class="custom-checkbox-label">
              <span class="custom-checkbox-box">
                <svg class="custom-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </span>
            </label>
          </div>
          <label for="billingSameAsShipping" class="cursor-pointer" v-html="$t('checkout.billingCheckbox')" />
        </div>
      </UFormField>
      <div v-if="!isBillingSameAsShipping" class="pl-4 border-l">
        <UFormField
          name="billingAddress"
          :label="$t('checkout.street')"
          :class="{ 'text-red-500': errors.billingAddress }"
        >
          <UInput v-model="billing.address" class="w-full" @input="clearError('billingAddress')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.billingAddress ? 'ring-red-500' : 'ring-gray-300') }" />
          <div v-if="errors.billingAddress" class="text-xs text-red-500 mt-1">{{ errors.billingAddress }}</div>
          <template #error></template>
        </UFormField>
        <div class="flex gap-4">
          <UFormField
            name="billingCity"
            :label="$t('checkout.city')"
            :class="{ 'text-red-500': errors.billingCity }"
          >
            <UInput v-model="billing.city" class="w-full" @input="clearError('billingCity')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.billingCity ? 'ring-red-500' : 'ring-gray-300') }" />
            <div v-if="errors.billingCity" class="text-xs text-red-500 mt-1">{{ errors.billingCity }}</div>
            <template #error></template>
          </UFormField>
          <UFormField
            name="billingZip"
            :label="$t('checkout.zip')"
            :class="{ 'text-red-500': errors.billingZip }"
          >
            <UInput v-model="billing.zip" class="w-full" @input="clearError('billingZip')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.billingZip ? 'ring-red-500' : 'ring-gray-300') }" />
            <div v-if="errors.billingZip" class="text-xs text-red-500 mt-1">{{ errors.billingZip }}</div>
            <template #error></template>
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
import type {
  Address,
  BillingAddress,
  CheckoutDraft,
  CheckoutOrderPayload,
  CustomerContact,
  DeliveryAddress,
  DeliveryContact
} from "~/types/types";

const { t, locale } = useI18n()
const router = useRouter();

const orderStore = useOrderStore();
const cartStore = useCartStore();
const { getAddress, createAddress, updateAddress, userInfo, fetchUserInfo } = useAuth();

const accountEmail = computed(() => userInfo?.value?.email ?? "");

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
  deliveryPhone: "",
  deliveryRecipientName: "",
  deliveryRecipientSurname: "",
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

function formatDateToYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatCalendarDateToYMD(date: CalendarDate) {
  const year = date.year;
  const month = String(date.month).padStart(2, '0');
  const day = String(date.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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
      zipCodeMessage.value = '';
      zipCodeMessageType.value = 'success';
    } else {
      // Código postal no disponible para envío
      currentShippingCost.value = 0;
      isShippingAvailable.value = false;
      const unavailableMsg = t('checkout.shippingUnavailableError') || 'No realizamos entregas a este código postal';
      errors['shipping'] = unavailableMsg;
      errors['zip'] = unavailableMsg;
      zipCodeError.value = true;
      zipCodeMessage.value = unavailableMsg;
      zipCodeMessageType.value = 'error';
    }
  } else if (zipCode && zipCode.length > 0) {
    // Código postal inválido (no tiene 5 dígitos)
    currentShippingCost.value = 0;
    isShippingAvailable.value = false;
    zipCodeError.value = true;
    const invalidMsg = t('validation.postalCode') || 'Introduce un código postal válido';
    errors['zip'] = invalidMsg;
    zipCodeMessage.value = invalidMsg;
    zipCodeMessageType.value = 'error';
  } else {
    // No hay código postal
    isShippingAvailable.value = false;
    const requiredMsg = t('validation.required') || 'El código postal es obligatorio';
    errors['shipping'] = requiredMsg;
    errors['zip'] = requiredMsg;
    zipCodeError.value = true;
    zipCodeMessage.value = requiredMsg;
    zipCodeMessageType.value = 'error';
  }
}

// Variable reactiva para controlar la visibilidad del título
const showTitle = ref(true);

// Calcular la fecha mínima de entrega (03/02/2026 por vacaciones, o un día después si es posterior)
const minDeliveryDate = computed(() => {
  const vacationEndDate = new Date('2026-02-03T00:00:00');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Usar la fecha más tardía entre mañana y el fin de vacaciones
  const minDate = tomorrow > vacationEndDate ? tomorrow : vacationEndDate;
  return formatDateToYMD(minDate); // Formato YYYY-MM-DD
});

// Fecha mínima para el calendario (03/02/2026 por vacaciones, o un día después si es posterior)
const minCalendarDate = computed(() => {
  const vacationEndDate = new Date('2026-02-03T00:00:00');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Usar la fecha más tardía entre mañana y el fin de vacaciones
  const minDate = tomorrow > vacationEndDate ? tomorrow : vacationEndDate;
  return new CalendarDate(minDate.getFullYear(), minDate.getMonth() + 1, minDate.getDate());
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
  // Convertir el objeto CalendarDate a string en formato YYYY-MM-DD sin afectar por zonas horarias
  form.deliveryDate = formatCalendarDateToYMD(date);
  // Limpiar error si existe
  clearError('deliveryDate');
};

// Función para verificar si todos los campos obligatorios están completos
function checkAllFieldsCompleted() {
  const requiredFields = ['name', 'surname', 'phone', 'address', 'city', 'zip', 'country', 'deliveryDate', 'deliveryTime', 'deliveryPhone', 'deliveryRecipientName', 'deliveryRecipientSurname'];
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
  deliveryPhone: z.string().min(1, t("validation.required")),
  deliveryRecipientName: z.string().min(1, t("validation.required")),
  deliveryRecipientSurname: z.string().min(1, t("validation.required")),
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
    if (!form.deliveryPhone && userInfo.value.phone) {
      form.deliveryPhone = userInfo.value.phone;
    }
  }
  
  // Establecer la fecha mínima como valor por defecto si no hay fecha establecida
  if (!form.deliveryDate) {
    // Obtener la fecha mínima considerando vacaciones
    const vacationEndDate = new Date('2026-02-03T00:00:00');
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Usar la fecha más tardía entre mañana y el fin de vacaciones
    let defaultDate = tomorrow > vacationEndDate ? tomorrow : vacationEndDate;
    
    // Si la fecha por defecto es domingo, avanzar al lunes
    if (defaultDate.getDay() === 0) {
      defaultDate.setDate(defaultDate.getDate() + 1);
    }
    
    // Formatear la fecha y asignarla al formulario
    form.deliveryDate = formatDateToYMD(defaultDate);
    deliveryDateObject.value = new CalendarDate(
      defaultDate.getFullYear(), 
      defaultDate.getMonth() + 1, 
      defaultDate.getDate()
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
    form.deliveryPhone = ship.deliveryPhone || ship.phone || form.deliveryPhone || '';
    
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

  // Normalizar valores críticos antes de validar
  form.phone = form.phone.trim();
  form.deliveryPhone = form.deliveryPhone.trim();

  // Email validation for guest checkout
  if (!isAuthenticated.value) {
    if (!form.email) {
      errors.email = t('validation.required') || 'El email es obligatorio';
    } else if (!isValidEmail(form.email)) {
      errors.email = t('validation.email') || 'Introduce un email válido';
    }
  }

  if (!form.phone) {
    errors.phone = t('validation.required') || 'El teléfono es obligatorio';
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
    const shippingAddressPayload: Address = {
      id: shippingId || "",
      type: "shipping" as const,
      isDefault: saveAsDefault.value,
      street: form.address,
      city: form.city,
      postalCode: form.zip,
      country: form.country || "ES",
      name: form.name,
      surname: form.surname,
      email: form.email,
      phone: form.phone,
      deliveryPhone: form.deliveryPhone,
      deliveryRecipientName: form.deliveryRecipientName,
      deliveryRecipientSurname: form.deliveryRecipientSurname
    };
    
    console.log('Dirección de envío con información del usuario:', shippingAddressPayload);
    
    const billingAddressPayload: Address | null = isBillingSameAsShipping.value
      ? null
      : {
          id: billingId || "",
          type: "billing" as const,
          isDefault: saveAsDefault.value,
          street: billing.address,
          city: billing.city,
          postalCode: billing.zip,
          country: billing.country || "ES",
          ...(!isAuthenticated ? {
            name: form.name,
            surname: form.surname,
            email: form.email,
            phone: form.phone
          } : {}),
        };

    const customerPayload: CustomerContact = {
      name: form.name,
      surname: form.surname,
      email: form.email,
      phone: form.phone
    };

    const deliveryContact: DeliveryContact = {
      recipientName: form.deliveryRecipientName,
      recipientSurname: form.deliveryRecipientSurname,
      phone: form.deliveryPhone
    };

    const deliveryPayload: DeliveryAddress = {
      id: shippingId || undefined,
      isDefault: saveAsDefault.value || undefined,
      street: form.address,
      city: form.city,
      postalCode: form.zip,
      country: form.country || "ES",
      contact: deliveryContact
    };

    const billingPayloadForOrder: BillingAddress | null = isBillingSameAsShipping.value
      ? null
      : {
          id: billingId || undefined,
          isDefault: saveAsDefault.value || undefined,
          street: billing.address,
          city: billing.city,
          postalCode: billing.zip,
          country: billing.country || "ES"
        };

    const checkoutMeta = {
      deliveryDate: form.deliveryDate,
      deliveryTime: form.deliveryTime,
      cardNote: form.cardNote,
      shippingCost: currentShippingCost.value,
      language: locale.value
    };

    const orderDraft: CheckoutDraft = {
      customer: customerPayload,
      delivery: deliveryPayload,
      billing: billingPayloadForOrder,
      meta: checkoutMeta,
      items: cartStore.items,
      userType: isAuthenticated ? 'registered' : 'guest',
      total: cartStore.totalPrice + currentShippingCost.value
    };

    const orderPayload: CheckoutOrderPayload = {
      customer: customerPayload,
      delivery: deliveryPayload,
      billing: billingPayloadForOrder,
      meta: checkoutMeta,
      items: cartStore.items
    };
        
    console.log('Costo de envío actual:', currentShippingCost.value);

    // persist default addresses if requested
    // Usamos el shippingPayload original (sin shippingCost) para guardar la dirección
    if (saveAsDefault.value) {
      shippingExists.value
        ? await updateAddress(shippingAddressPayload)
        : await createAddress(shippingAddressPayload);
      if (billingAddressPayload) {
        billingExists.value
          ? await updateAddress(billingAddressPayload)
          : await createAddress(billingAddressPayload);
      }
    }

    console.log('Antes de crear la orden');
    // create order in store (this will call your /api/orders)
    try {
      // Guardar los datos de la orden en localStorage para que estén disponibles en la página de pago
      const orderData = orderDraft;
      
      // Guardar en localStorage
      localStorage.setItem('lastOrderData', JSON.stringify(orderData));
      console.log('Datos de la orden guardados en localStorage:', orderData);
      
      // Crear la orden en el backend con el idioma actual
      await orderStore.createOrder(orderPayload);
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
