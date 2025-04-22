<template>
  <LoginRegister v-if="mounted" :open="modalOpen" @update:open="handleClose" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const modalOpen = ref(false);
const mounted = ref(false); // <- evitar render hasta tener ruta lista

// Espera a que esté montado (necesario para que UModal reaccione bien)
onMounted(() => {
  modalOpen.value = route.query.modal === "login";
  mounted.value = true;
});

// También reacciona si cambian los query params
watch(
  () => route.query.modal,
  (val) => {
    modalOpen.value = val === "login";
  }
);

function handleClose() {
  modalOpen.value = false;
  router.push("/checkout/checkout");
}
</script>
