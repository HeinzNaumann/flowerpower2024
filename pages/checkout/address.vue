<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Dirección de envío</h1>

    <UForm
      :schema="addressSchema"
      :state="form"
      @submit="submit"
      class="space-y-4 max-w-xl"
    >
      <div class="flex gap-4">
        <UFormField name="name" label="Nombre">
          <UInput
            v-model="form.name"
            autocomplete="given-name"
            placeholder="Nombre completo"
          />
        </UFormField>

        <UFormField name="surname" label="Apellidos">
          <UInput
            v-model="form.surname"
            autocomplete="family-name"
            placeholder="Apellidos"
          />
        </UFormField>
      </div>

      <UFormField name="email" label="Email">
        <UInput
          v-model="form.email"
          type="email"
          autocomplete="email"
          placeholder="tucorreo@mail.com"
        />
      </UFormField>

      <UFormField name="phone" label="Teléfono">
        <UInput
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          placeholder="Ej. +34 600 123 456"
        />
      </UFormField>

      <UFormField name="address" label="Dirección">
        <UInput
          v-model="form.address"
          autocomplete="street-address"
          placeholder="Calle y número"
        />
      </UFormField>

      <div class="flex gap-4">
        <UFormField name="city" label="Ciudad">
          <UInput
            v-model="form.city"
            autocomplete="address-level2"
            placeholder="Ciudad"
          />
        </UFormField>

        <UFormField name="zip" label="Código postal">
          <UInput
            v-model="form.zip"
            autocomplete="postal-code"
            placeholder="00000"
          />
        </UFormField>
      </div>
    </UForm>

    <UForm
      :schema="addressSchema"
      :state="form"
      @submit="submit"
      class="space-y-4 max-w-xl mt-4 mb-4"
    >
      <!-- Campos de envío -->
      <!-- ... (nombre, apellidos, email, teléfono, dirección, ciudad, zip como ya tenías) -->

      <!-- Checkbox -->
      <UFormGroup class="pt-2">
        <label class="flex items-start gap-2 text-sm text-neutral-700">
          <UCheckbox v-model="isBillingSameAsShipping" />
          <span>
            Esta dirección también será usada como <strong>facturación</strong>.
            Puedes introducir otra si lo necesitas.
          </span>
        </label>
      </UFormGroup>

      <!-- Segundo formulario (condicional) -->
      <div
        v-if="!isBillingSameAsShipping"
        class="pt-6 border-t border-neutral-200"
      >
        <h2 class="text-xl font-semibold mt-4 mb-2">
          Dirección de facturación
        </h2>

        <UFormGroup label="Dirección">
          <UInput v-model="billing.address" placeholder="Calle y número" />
        </UFormGroup>

        <div class="flex gap-4">
          <UFormGroup label="Ciudad">
            <UInput v-model="billing.city" />
          </UFormGroup>
          <UFormGroup label="Código postal">
            <UInput v-model="billing.zip" />
          </UFormGroup>
        </div>

        <UFormGroup label="País">
          <UInput v-model="billing.country" placeholder="ES" />
        </UFormGroup>
      </div>

      <!-- Botón de envío -->
      <UButton
        type="submit"
        color="primary"
        variant="solid"
        :disabled="isSubmitting"
        class="mt-4"
      >
        <template v-if="isSubmitting">
          <span class="loading loading-spinner loading-xs"></span>
        </template>
        <template v-else>Confirmar dirección</template>
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useAuth } from "~/composables/useAuth";
import type { Address } from "~/types/types";

const router = useRouter();
const isSubmitting = ref(false);
const addressExists = ref(false);
const isBillingSameAsShipping = ref(true);

const { getAddress, createAddress, updateAddress, userInfo, fetchUserInfo } =
  useAuth();

const form = reactive({
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
});

const billing = reactive({
  address: "",
  city: "",
  zip: "",
  country: "ES",
});

const addressSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  surname: z.string().min(1, "Apellidos requeridos"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Teléfono requerido"),
  address: z.string().min(1, "Dirección requerida"),
  city: z.string().min(1, "Ciudad requerida"),
  zip: z.string().min(1, "Código postal requerido"),
});

onMounted(async () => {
  await fetchUserInfo();
  if (userInfo.value) {
    form.name = userInfo.value.name;
    form.surname = userInfo.value.surname;
    form.email = userInfo.value.email;
    form.phone = userInfo.value.phone;
  }

  const addressList = await getAddress("shipping");
  const addressData = Array.isArray(addressList) ? addressList[0] : addressList;

  console.log("Dirección de envío:", addressData);

  if (addressData) {
    addressExists.value = true;
    form.address = addressData.street || "";
    form.city = addressData.city || "";
    form.zip = addressData.postalCode || "";
  }
});

async function submit() {
  isSubmitting.value = true;
  try {
    const shippingPayload: Address = {
      street: form.address,
      city: form.city,
      postalCode: form.zip,
      country: "ES",
      type: "shipping",
    };

    const billingPayload: Address = isBillingSameAsShipping.value
      ? { ...shippingPayload, type: "billing" }
      : {
          street: billing.address,
          city: billing.city,
          postalCode: billing.zip,
          country: billing.country,
          type: "billing",
        };

    // Guardar dirección de envío
    const shippingResult = addressExists.value
      ? await updateAddress(shippingPayload)
      : await createAddress(shippingPayload);

    if (!shippingResult) throw new Error("Error al guardar dirección de envío");

    // Guardar dirección de facturación
    const billingResult = await createAddress(billingPayload); // puedes ajustar a update si ya existe

    if (!billingResult)
      throw new Error("Error al guardar dirección de facturación");

    router.push("/checkout/payment");
  } catch (error) {
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>
