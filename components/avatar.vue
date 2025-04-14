<template>
  <NuxtLink
    :to="localePath({ path: '/userPanel/' + userName })"
    class="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
  >
    <div
      class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold uppercase shadow-md overflow-hidden"
    >
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        alt="Avatar"
        class="w-full h-full object-cover"
      />
      <span v-else>{{ initials }}</span>
    </div>

    <span class="text-base font-medium text-neutral-800">
      {{ userName }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const avatarUrl = ""; // o 'https://tu-cdn.com/user-avatars/heinzydj2.jpg'
const { userName } = useAuth();

console.log("userName", userName);

const initials = (userName.value || "").slice(0, 2).toUpperCase();
</script>
