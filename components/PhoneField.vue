<template>
  <UFormField
    name="phone"
    label="Teléfono"
    description="Solo se utilizará para la entrega"
  >
    <div
      class="flex items-stretch border border-neutral-300 rounded-lg overflow-hidden"
    >
      <!-- Selector de país -->
      <USelectMenu
        v-model="country"
        :items="countryOptions"
        item-value="value"
        :searchable="false"
        size="md"
        variant="outline"
        placeholder=""
        class="w-[5.5rem] border-r border-neutral-300 bg-white"
        :ui="{
          content: 'bg-white shadow-md ring-1 ring-gray-200 rounded-md',
          viewport: 'divide-y divide-gray-100 p-1',
          item: 'flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50',
          itemLabel: 'flex items-center gap-2',
          input: 'border-b border-gray-200 placeholder-gray-400 px-2 py-1',
        }"
        arrow
      >
        <template #leading="{ modelValue }">
          <div class="flex items-center justify-center gap-1 px-2">
            <span class="text-lg">{{ modelValue?.flag }}</span>
            <span class="font-medium text-gray-700">{{
              modelValue?.prefix
            }}</span>
          </div>
        </template>

        <template #item-label="{ item }">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ item.flag }}</span>
            <span class="font-medium">{{ item.prefix }}</span>
          </div>
        </template>
      </USelectMenu>

      <!-- Input teléfono -->
      <UInput
        v-model="localOnly"
        type="tel"
        placeholder="Teléfono*"
        autocomplete="tel"
        class="flex-1 !rounded-none !border-0 px-3"
        size="md"
        variant="outline"
      />
    </div>
  </UFormField>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { getPhoneCountries } from "~/utils/getPhoneCountries";
import type { CountryCode } from "libphonenumber-js";

const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();

const countryOptions = ref(getPhoneCountries());
const country = ref(
  countryOptions.value.find((c) => c.value === "ES") ?? countryOptions.value[0]
);
// Si ya viene con prefijo internacional, extraer la parte local
const hasPrefix = props.modelValue?.startsWith('+');
const localOnly = ref(hasPrefix ? props.modelValue?.replace(/^(\+\d{1,3})/, "") : (props.modelValue || ""));

// Determinar el país desde el prefijo, si existe
if (hasPrefix && props.modelValue) {
  const prefix = props.modelValue.match(/^(\+\d{1,3})/);
  if (prefix && prefix[0]) {
    const found = countryOptions.value.find(c => c.prefix === prefix[0]);
    if (found) {
      country.value = found;
    }
  }
}

// Esta variable nos ayuda a controlar cuando NO debemos actualizar
const isUserTyping = ref(false);

// Cuando cambia el valor externo, actualizar el componente
watch(
  () => props.modelValue,
  (newVal) => {
    // Solo actualizar si no es el resultado de una edición del usuario
    if (!isUserTyping.value) {
      const hasPrefix = newVal?.startsWith('+');
      localOnly.value = hasPrefix ? newVal?.replace(/^(\+\d{1,3})/, "") : (newVal || "");
    }
    isUserTyping.value = false;
  }
);

// Cuando cambia la parte local o el país, emitir el valor completo
watch([localOnly, country], ([local, c]) => {
  isUserTyping.value = true;
  // Solo agregar prefijo si hay un valor local
  const full = local ? `${c.prefix}${local.replace(/^0+/, "")}` : "";
  emit("update:modelValue", full);
}, { flush: 'sync' });
</script>
