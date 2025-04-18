<template>
  <!-- 1️⃣ UFormField con el mismo name que en tu Zod-schema -->
  <UFormField
    name="tlf"
    label="Teléfono"
    description="Solo se utilizará para la entrega"
  >
    <div
      class="flex items-stretch border border-neutral-300 rounded-lg overflow-hidden"
    >
      <!-- 2️⃣ Selector de país -->
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
        <!-- trigger: solo bandera + prefijo -->
        <template #leading="{ modelValue }">
          <div class="flex items-center justify-center gap-1 px-2">
            <span class="text-lg">{{ modelValue?.flag }}</span>
            <span class="font-medium text-gray-700">{{
              modelValue?.prefix
            }}</span>
          </div>
        </template>

        <!-- cada opción: solo flag + prefix -->
        <template #item-label="{ item }">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ item.flag }}</span>
            <span class="font-medium">{{ item.prefix }}</span>
          </div>
        </template>
      </USelectMenu>

      <!-- 3️⃣ Input teléfono y v-model hacia el padre -->
      <UInput
        v-model="localValue"
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
import { ref, watch } from "vue";

interface Country {
  label: string;
  value: string;
  flag: string;
  prefix: string;
}

const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: "",
});
const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();

const localValue = ref(props.modelValue);
watch(localValue, (v) => emit("update:modelValue", v));
watch(
  () => props.modelValue,
  (v) => {
    localValue.value = v;
  }
);

// País seleccionado (no va al parent, sólo visual)
const countryOptions = ref<Country[]>([
  { label: "España", value: "es", flag: "🇪🇸", prefix: "+34" },
  { label: "Francia", value: "fr", flag: "🇫🇷", prefix: "+33" },
  { label: "Alemania", value: "de", flag: "🇩🇪", prefix: "+49" },
  /* …otros si quieres… */
  { label: "Estados Unidos", value: "us", flag: "🇺🇸", prefix: "+1" },
]);
const country = ref(countryOptions.value[0]);
</script>
