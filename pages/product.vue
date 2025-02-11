<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Producto / Emilio</h1>

    <div class="flex flex-col md:flex-row justify-around">
      <!-- Product Image -->
      <div class="relative flex items-center justify-center">
        <img
          src="public/images/Ramo_con_flores_variadas.jpg"
          width="500"
          height="500"
          class="w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-cover"
          alt="Flower Power Emilio Bouquet"
        />
        <button class="hidden md:block absolute top-1 right-1 p-2">
          <img
            src="/assets/icons/magnifier.svg"
            :alt="$t('header.alt.cart')"
            class="size-8 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
      </div>

      <!-- Product Details -->
      <div class="flex flex-col justify-between p-6 md:w-1/3">
        <div class="flex md:flex-row flex-col justify-between">
          <h2 class="text-2xl">Flower Power Emilio</h2>
          <div class="text-2xl">€ 26,00</div>
        </div>
        <p class="text-gray-600 mb-6">
          Ramo variado de colores fucsias y blancos
        </p>

        <!-- Add-ons -->
        <div>
          <h3 class="text-lg font-medium">Añade un complemento a tu pedido:</h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="rounded-lg p-4 text-center">
              <img
                src="public/images/complements/bombones.webp"
                alt="complement"
                class="w-full h-32 object-cover mb-2 border p-2"
              />
              <p class="text-xs flex flex-1">1x Caja</p>
              <div class="flex flex-row items-center flex-initial gap-1">
                <p class="text-xs">€</p>
                <p class="text-xs">45.00</p>
              </div>
            </div>
            <div class="rounded-lg p-4 text-center">
              <img
                src="public/images/complements/moet-chandon.webp"
                alt="complement"
                class="w-full h-32 object-cover mb-2 border p-2"
              />
              <p class="text-xs flex flex-1">1x Botella</p>
              <div class="flex flex-row items-center flex-initial gap-1">
                <p class="text-xs">€</p>
                <p class="text-xs">45.00</p>
              </div>
            </div>
            <div class="rounded-lg p-4 text-center">
              <img
                src="public/images/complements/tarjeta-felicitacion.webp"
                alt="complement"
                class="w-full h-32 object-cover mb-2 border p-2"
              />
              <p class="text-xs flex flex-1">1x Tarjeta</p>
              <div class="flex flex-row items-center flex-initial gap-1">
                <p class="text-xs">€</p>
                <p class="text-xs">45.00</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div
          class="flex flex-col border-t border-b w-3/4 self-end text-xs py-2 space-y-1"
        >
          <div class="flex justify-between items-center">
            <span>1x Emilio</span>
            <span>€26,00</span>
          </div>
          <div class="flex justify-between items-center">
            <span>1x Caja de bombones</span>
            <span>€10,00</span>
          </div>
        </div>

        <div
          class="flex gap-2 items-center text-xl font-normal md:w-1/3 self-end mt-2 mb-5"
        >
          <span>Subtotal</span>
          <span>€26,00</span>
        </div>

        <button
          class="w-1/3s flex self-end bg-[#db9526] hover:bg-[#db9526] text-black p-3 rounded-md transition-colors"
        >
          Añadir a la cesta
        </button>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-xl font-semibold mb-4">Colores</h3>
      <div class="flex space-x-3">
        <button class="w-8 h-8 rounded-full bg-fuchsia-500"></button>
        <button
          class="w-8 h-8 rounded-full bg-white border-2 border-gray-300"
        ></button>
        <button class="w-8 h-8 rounded-full bg-purple-800"></button>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-2">Medidas apróximadas</h3>
      <p class="text-gray-600">45 cm x 32 cm x 5cm</p>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-2">Descripción</h3>
      <p class="text-gray-600">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur.
      </p>
    </div>
  </div>
</template>

<script setup>
// const complements = ref([
//   {
//     image: "/placeholder.jpg",
//     quantity: "1 x caja de bombones",
//     price: 10.0,
//   },
//   {
//     image: "/placeholder.jpg",
//     quantity: "1 x caja de bombones",
//     price: 10.0,
//   },
//   {
//     image: "/placeholder.jpg",
//     quantity: "1 x caja de bombones",
//     price: 10.0,
//   },
// ]);
</script>

<style scoped></style>
