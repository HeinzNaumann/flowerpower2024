<template>
  <div class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-2xl font-bold mb-6">{{$t('checkout.guestOrLogin.title')}}</h1>

    <div class="flex flex-col items-center gap-4">
      <button
        class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors w-full max-w-xs"
        @click="goToLogin"
      >
        {{$t('checkout.guestOrLogin.login')}}
      </button>

      <button
        class="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-6 rounded-md transition-colors w-full max-w-xs"
        @click="checkoutAsGuest"
      >
        {{$t('checkout.guestOrLogin.guest') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goToLogin() {
  router.push({ path: "/login-register", query: { modal: "login" } });
}

function checkoutAsGuest() {
  router.push({ path: "/checkout/checkout", query: { guest: "1" } });
}
</script>
