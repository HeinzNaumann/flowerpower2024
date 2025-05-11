<template>
  <UCalendar
    v-bind="$attrs"
    :locale="calendarLocale"
    :weekday-names="weekdayNames"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// Configurar el locale del calendario basado en el idioma actual
const calendarLocale = computed(() => locale.value === 'en' ? 'en-GB' : 'es-ES');

// Definir los nombres de los días de la semana comenzando por lunes
const weekdayNames = computed(() => {
  if (locale.value === 'en') {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  } else {
    return ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  }
});
</script>
