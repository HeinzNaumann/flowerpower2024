<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";

const order = useOrderStore();
const cart = useCartStore();
const router = useRouter();

onMounted(async () => {
  // Protégete si alguien entra directo
  if (!order.clientSecret) return router.push("/checkout/address");

  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

  // Payment Element / Checkout Session
  const { error } = await stripe!.redirectToCheckout({
    sessionId: order.clientSecret!,
  });

  if (error) console.error(error.message);
});
</script>
