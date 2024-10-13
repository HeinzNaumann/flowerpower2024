<template>
  <div class="relative flex flex-col md:flex-row">
    <!-- Text Section for larger screens -->
    <div
      class="hidden md:grid bg-[#3F2D50] w-1/3 content-center justify-items-start justify-center gap-2 text-white pl-8 xl:pl-0"
    >
      <h1 class="text-3xl md:text-4xl font-bold text-left uppercase">
        Alegra y <br />Enriquece el Alma
      </h1>
      <p class="text-lg text-left">Colección de invierno</p>
      <a
        href="#"
        class="inline-block bg-white text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-red-400 hover:text-white transition duration-200"
        >Comprar</a
      >
    </div>
    <!-- Image Section -->
    <div class="w-full md:w-1/2 lg:w-2/3 relative">
      <!-- Añadido "relative" aquí -->
      <img
        src="/images/floristeriaFlowerPower-Hero.webp"
        alt="Flores coloridas"
        class="h-[800px] object-cover w-full"
      />

      <!-- Text Section for mobile -->
      <div
        class="absolute bottom-0 left-0 p-4 w-full text-white space-y-3 md:hidden pl-8"
      >
        <h1 class="text-3xl font-bold text-left uppercase">
          Alegra y <br />Enriquece el Alma
        </h1>
        <p class="text-lg text-left">Colección de invierno</p>
        <a
          href="#"
          class="inline-block bg-white text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-red-400 hover:text-white transition duration-200"
          >Comprar</a
        >
      </div>
    </div>
  </div>
</template>
