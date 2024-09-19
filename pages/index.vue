<template>
  <main class="flex flex-col justify-center items-center h-screen mt-16">
    <div
      class="flex min-h-[100dvh] flex-col items-center justify-center bg-background text-foreground"
    ></div>
  </main>
</template>

<script setup lang></script>

<style>
/* Definición de los estilos para el spinner de flor */
@keyframes flower-spin {
  0%,
  100% {
    transform: rotate(0deg);
    box-shadow: 0 0 26px 10px #a4d0e3, -25px -25px 0 8px #a4d0e3,
      25px -25px 0 8px #a4d0e3, 25px 25px 0 8px #a4d0e3,
      -25px 25px 0 8px #a4d0e3;
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 0 0 26px 10px #a4d0e3, 25px 25px 0 5px #a4d0e3,
      -20px 20px 0 8px #a4d0e3, -25px -25px 0 5px #a4d0e3,
      20px -20px 0 8px #a4d0e3;
  }
}

.flower {
  animation: flower-spin 5s infinite ease-in-out;
  z-index: 10;
}

.branch {
  width: 4px;
  height: 80px;
  background-color: #38a169; /* Verde Tailwind (green-600) */
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  z-index: 5;
}
</style>