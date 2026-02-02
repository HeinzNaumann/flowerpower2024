<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <CartDrawer v-model:open="showCartDrawer" />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import CartDrawer from '~/components/CartDrawer.vue';
import { useCartDrawer } from '~/composables/useCartDrawer';

const { showCartDrawer } = useCartDrawer();
import { watch } from 'vue';
// watch(showCartDrawer, (val) => {
  // Removed console.log
// });
</script>
