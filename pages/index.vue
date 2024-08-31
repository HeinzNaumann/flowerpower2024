<template>
  <main class="flex flex-col justify-center items-center h-screen">
    <div
      class="flex min-h-[100dvh] flex-col items-center justify-center bg-background text-foreground"
    >
      <div class="relative flex flex-col items-center">
        <div class="flower w-10 h-10 bg-yellow-400 rounded-full"></div>
        <!-- Rama verde -->
        <div class="branch"></div>
      </div>
      <div class="max-w-2xl text-center mt-16">
        <h1 class="mt-4 text-4xl text-gray-800 sm:text-6xl font-sans">
          <span>{{ $t("underConstruction.heading") }}</span>
        </h1>
        <p class="mt-4 text-lg sm:text-xl text-muted-foreground text-gray-800">
          {{ $t("underConstruction.message") }}
        </p>
        <a
          href="tel:+34636995130"
          class="inline-flex items-center justify-center bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-700 mt-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2 h-5 w-5"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            ></path>
          </svg>
          {{ $t("underConstruction.contact") }}
        </a>
      </div>
    </div>
  </main>
</template>

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