<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold">Test Nuxt UI 3</h2>
    </template>
    <p class="mt-2">Si esto aparece con estilo, ¡ya funciona!</p>

    <UButton
      label="Correo electrónico"
      placeholder="example@mail.com"
      class="mt-2"
    />
    <UButton color="primary" class="mt-4">Probar botón</UButton>
  </UCard>
</template>
<script setup>
// No necesitas importar nada, se auto-importa
</script>
