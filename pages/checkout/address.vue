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

      <UButton
        type="submit"
        color="primary"
        variant="solid"
        :disabled="isSubmitting"
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";

const router = useRouter();
const isSubmitting = ref(false);

const addressSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  surname: z.string().min(1, "Apellidos requeridos"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .min(1, "Teléfono requerido")
    .regex(/^[+\d][\d\s-]{6,14}\d$/, "Teléfono inválido"),
  address: z.string().min(1, "Dirección requerida"),
  city: z.string().min(1, "Ciudad requerida"),
  zip: z.string().min(1, "Código postal requerido"),
});

const form = reactive({
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
});

function submit() {
  isSubmitting.value = true;
  setTimeout(() => {
    console.log("Datos enviados:", form);
    router.push("/checkout/payment");
  }, 500);
}
</script>
