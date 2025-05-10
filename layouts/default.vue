<template>
  <div class="flex flex-col min-h-screen">
    <Header>
      <div class="absolute top-4 left-4">
        <img
          src="/logo-floristeria-flowerpower.png"
          alt="Logo Flower Power"
          class="w-auto h-[70px] md:h-[120px]"
        />
      </div>
    </Header>
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>
