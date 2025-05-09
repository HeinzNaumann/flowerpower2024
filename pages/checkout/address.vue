<template>
  <div class="container mx-auto px-4 py-8">
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
          :error="errors.name"
        >
          <UInput v-model="form.name" class="w-full" />
        </UFormField>
        <UFormField
          name="surname"
          :label="$t('checkout.surname')"
          :error="errors.surname"
        >
          <UInput v-model="form.surname" class="w-full" />
        </UFormField>
      </div>

      <UFormField
        name="phone"
        :label="$t('checkout.phone')"
        :error="errors.phone"
      >
        <UInput v-model="form.phone" type="tel" class="w-full" />
      </UFormField>
      <UFormField name="zip" :label="$t('checkout.zip')" :error="errors.zip">
        <UInput v-model="form.zip" class="w-full" />
      </UFormField>
      <UFormField
        name="country"
        :label="$t('checkout.country')"
        :error="errors.country"
      >
        <UInput v-model="form.country" class="w-full" />
      </UFormField>
      <UFormField name="city" :label="$t('checkout.city')" :error="errors.city">
        <UInput v-model="form.city" class="w-full" />
      </UFormField>
      <UFormField
        name="address"
        :label="$t('checkout.street')"
        :error="errors.address"
      >
        <UInput v-model="form.address" class="w-full" />
      </UFormField>

      <!-- NUEVOS campos -->
      <div class="grid grid-cols-2 gap-4">
        <UFormField
          name="deliveryDate"
          :label="$t('checkout.deliveryDate')"
          :error="errors.deliveryDate"
        >
          <UInput v-model="form.deliveryDate" type="date" class="w-full" />
        </UFormField>
        <UFormField
          name="deliveryTime"
          :label="$t('checkout.deliveryTime')"
          :error="errors.deliveryTime"
        >
          <UInput v-model="form.deliveryTime" type="time" class="w-full" />
        </UFormField>
      </div>
      <p class="text-xs text-neutral-600">
        {{ $t("checkout.deliveryInfoImportant") }}
      </p>
      <UFormField
        name="cardNote"
        :label="$t('checkout.cardNoteLabel')"
        :error="errors.cardNote"
      >
        <textarea
          v-model="form.cardNote"
          class="w-full rounded border p-2"
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
          :error="errors.billingAddress"
        >
          <UInput v-model="billing.address" class="w-full" />
        </UFormField>
        <div class="flex gap-4">
          <UFormField
            name="billingCity"
            :label="$t('checkout.city')"
            :error="errors.billingCity"
          >
            <UInput v-model="billing.city" class="w-full" />
          </UFormField>
          <UFormField
            name="billingZip"
            :label="$t('checkout.zip')"
            :error="errors.billingZip"
          >
            <UInput v-model="billing.zip" class="w-full" />
          </UFormField>
        </div>
      </div>

      <!-- botón único de submit -->
      <UButton
        type="submit"
        color="primary"
        class="w-full"
        :loading="isSubmitting"
      >
        {{ $t("checkout.confirm") }}
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
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
  deliveryDate: "",
  deliveryTime: "",
  cardNote: "",
});
const billing = reactive({ address: "", city: "", zip: "", country: "ES" });

// Reactive errors object
const errors = reactive<Record<string, string>>({});

// Zod schemas
const addressSchema = z.object({
  name: z.string().min(1, t("validation.required")),
  surname: z.string().min(1, t("validation.required")),
  phone: z.string().min(1, t("validation.required")),
  address: z.string().min(1, t("validation.required")),
  city: z.string().min(1, t("validation.required")),
  zip: z.string().min(1, t("validation.required")),
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

async function submit() {
  // clear previous errors
  Object.keys(errors).forEach((k) => delete errors[k]);

  // validate shipping form
  const s = addressSchema.safeParse(form);
  if (!s.success) {
    for (const issue of s.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    return;
  }
  // validate billing if shown
  if (!isBillingSameAsShipping.value) {
    const b = billingSchema.safeParse(billing);
    if (!b.success) {
      for (const issue of b.error.issues) {
        const key = issue.path[0] as string;
        errors[key] = issue.message;
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
    // go to payment
    router.push("/checkout/payment");
  } finally {
    isSubmitting.value = false;
  }
}
</script>
