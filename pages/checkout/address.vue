<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:items-start md:gap-8">
      <!-- Formulario dirección (columna izquierda en desktop)-->
      <div class="flex-1">
        <h1 class="text-2xl font-bold mb-6">{{ $t("checkout.shippingTitle") }}</h1>
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

      <UFormField
        name="phone"
        :label="$t('checkout.phone')"
        :class="{ 'text-red-500': errors.phone }"
      >
        <UInput v-model="form.phone" type="tel" class="w-full" @input="clearError('phone')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.phone ? 'ring-red-500' : 'ring-gray-300') }" />
      </UFormField>
      <UFormField name="zip" :label="$t('checkout.zip')" :class="{ 'text-red-500': errors.zip }">
        <UInput v-model="form.zip" class="w-full" @input="clearError('zip')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.zip ? 'ring-red-500' : 'ring-gray-300') }" />
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
          <UInput v-model="form.deliveryDate" type="date" class="w-full" @input="clearError('deliveryDate')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryDate ? 'ring-red-500' : 'ring-gray-300') }" />
        </UFormField>
        <UFormField
          name="deliveryTime"
          :label="$t('checkout.deliveryTime')"
          :class="{ 'text-red-500': errors.deliveryTime }"
        >
          <UInput v-model="form.deliveryTime" type="time" class="w-full" @input="clearError('deliveryTime')" :ui="{ base: 'relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ' + (errors.deliveryTime ? 'ring-red-500' : 'ring-gray-300') }" />
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
        <CartSummary @submit="submit" />
      </div>
    </div>
    <!-- Carrito en desktop -->
    <div class="hidden md:block w-full max-w-md">
      <CartSummary @submit="submit" />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartSummary from '~/components/CartSummary.vue';

import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useI18n } from "vue-i18n";
import { useAuth } from "~/composables/useAuth";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
import type { Address } from "~/types/types";

const { t } = useI18n();
const router = useRouter();

const orderStore = useOrderStore();
const cartStore = useCartStore();
const { getAddress, createAddress, updateAddress, userInfo, fetchUserInfo } =
  useAuth();

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
  country: "", // Added country property
  deliveryDate: "",
  deliveryTime: "",
  cardNote: "",
});
const billing = reactive({ address: "", city: "", zip: "", country: "ES" });

// Reactive errors object
const errors = reactive<Record<string, string>>({});

// Funciones para limpiar errores al escribir
function clearError(field: string) {
  if (errors[field]) {
    delete errors[field];
  }
}

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
  const ship = await getAddress("shipping");
  if (ship) {
    shippingExists.value = true;
    shippingId = ship.id;
    Object.assign(form, {
      address: ship.street,
      city: ship.city,
      zip: ship.postalCode,
    });
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
    // build payloads
    const shippingPayload: Address = {
      id: shippingId || "",
      type: "shipping" as const,
      isDefault: saveAsDefault.value,
      street: form.address,
      city: form.city,
      postalCode: form.zip,
      country: "ES",
    };
    const billingPayload = isBillingSameAsShipping.value
      ? null
      : {
          id: billingId || "",
          type: "billing" as const,
          isDefault: saveAsDefault.value,
          street: billing.address,
          city: billing.city,
          postalCode: billing.zip,
          country: billing.country,
        };

    // persist default addresses if requested
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

    // create order in store (this will call your /api/orders)
    await orderStore.createOrder(shippingPayload, billingPayload, {
      deliveryDate: form.deliveryDate,
      deliveryTime: form.deliveryTime,
      cardNote: form.cardNote,
    });
    // clear cart
    cartStore.clearCart();
    
    // Llamar al callback de éxito si se proporcionó
    if (callbacks?.onSuccess) {
      callbacks.onSuccess();
    }
    
    // go to payment
    router.push("/checkout/payment");
  } finally {
    isSubmitting.value = false;
  }
}

</script>
