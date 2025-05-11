import { ref } from 'vue';

// CartDrawer global state composable
const showCartDrawer = ref(false);

export function useCartDrawer() {
  return {
    showCartDrawer,
  };
}
