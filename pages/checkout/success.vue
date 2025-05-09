<script setup lang="ts">
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";

const order = useOrderStore();
const cart = useCartStore();

order.markPaid();
cart.clearCart();
</script>
