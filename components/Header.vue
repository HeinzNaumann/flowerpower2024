<template>
  <header>
  <CartDrawer v-model:open="showCartDrawer.value" />
    <div class="top-4 left-4 flex justify-between w-full pt-4">
      <NuxtLink :to="localePath({ path: '/' })">
        <img
          src="/logo-floristeria-flowerpower.png"
          :alt="$t('header.alt.logo')"
          class="w-auto h-[60px] md:h-[90px]"
        />
      </NuxtLink>
      <!-- Hamburger Button for Mobile View -->
      <div class="lg:hidden p-2 mr-4 flex gap-2 relative items-center">
        <transition name="expand">
          <form
            v-if="isOpenMagnifier"
            class="items-center relative right-0 top-0 z-30 bl overflow-hidden p-1 rounded-sm"
            ref="formRef"
          >
            <input
              type="text"
              :placeholder="$t('header.input.placeholder')"
              class="w-full border p-1 focus:outline-hidden focus:shadow-lg transition-all duration-300 ease-in-out delay-150"
            />
          </form>
        </transition>
        <button @click.stop="toggleMagnifier" class="relative z-10">
          <img
            v-if="!isOpenMagnifier"
            src="/assets/icons/magnifier.svg"
            :alt="$t('header.alt.cart')"
            class="size-6 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
        <ClientOnly>
          <button
            v-if="isMounted"
            @click="openCartDrawer"
            class="relative focus:outline-none"
          >
            <img
              src="/assets/icons/cart.svg"
              :alt="$t('header.alt.cart')"
              class="size-6 hover:opacity-70 transition-opacity duration-200 top-1 relative"
            />
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {{ cart.totalItems }}
            </span>
          </button>
        </ClientOnly>
        <button class="" @click="toggleMenu" aria-label="Toggle menu">
          <!-- Hamburger Icon -->
          <img
            src="/assets/icons/hamburger-menu.svg"
            :alt="$t('header.alt.cart')"
            class="h-6 w-6 text-neutral-80 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
      </div>
      <!-- Desktop Navigation Links -->
      <div class="hidden mr-8 flex-row gap-3 items-baseline lg:flex">
        <ClientOnly>
          <Avatar v-if="isAuthenticated() && isReady" />

          <button
            v-if="!isAuthenticated()"
            class="hover:text-neutral-600 cursor-pointer"
            @click="openModal"
          >
            {{ $t("header.register") }}
          </button>
        </ClientOnly>

        <ClientOnly>
          <button
            v-if="isMounted"
            @click="openCartDrawer"
            class="relative focus:outline-none"
          >
            <img
              src="/assets/icons/cart.svg"
              :alt="$t('header.alt.cart')"
              class="size-6 hover:opacity-70 transition-opacity duration-200 top-1 relative"
            />
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {{ cart.totalItems }}
            </span>
          </button>
        </ClientOnly>
        <div class="relative inline-block text-left" ref="dropdownRef">
          <button
            @click="toggleDropdown"
            class="inline-flex justify-center w-full bg-white border border-neutral-300 rounded-md shadow-xs hover:bg-neutral-50 hover:opacity-70 transition-opacity duration-200"
          >
            <img
              :src="currentFlag"
              :alt="$t(`header.alt.flag_${currentLocale}`)"
              class="w-6 h-4"
            />
          </button>
          <div
            v-if="isOpen"
            class="absolute left-[-7px] z-10 w-10 mt-2 mr-4 bg-white border rounded-md shadow-lg"
          >
            <NuxtLink
              :to="getLocalePathWithQuery('es')"
              class="flex items-center p-2 hover:bg-neutral-100"
            >
              <img
                src="/images/flags/es.png"
                :alt="$t('header.alt.flag_es')"
                class="w-6 h-4"
              />
            </NuxtLink>
            <NuxtLink
              :to="getLocalePathWithQuery('en')"
              class="flex items-center p-2 hover:bg-neutral-100"
            >
              <img
                src="/images/flags/en.png"
                :alt="$t('header.alt.flag_en')"
                class="w-6 h-4"
              />
            </NuxtLink>
            <NuxtLink
              :to="getLocalePathWithQuery('de')"
              class="flex items-center p-2 hover:bg-neutral-100"
            >
              <img
                src="/images/flags/de.png"
                :alt="$t('header.alt.flag_de')"
                class="w-6 h-4"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Overlay -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/50 z-20"
        @click="toggleMenu"
      ></div>
    </transition>

    <!-- Sliding Menu from the Right -->
    <transition name="slide">
      <div
        v-if="isMenuOpen"
        class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20 p-4 flex flex-col gap-4"
      >
        <button
          class="self-end p-2 cursor-pointer"
          @click="toggleMenu"
          aria-label="Close menu"
        >
          <!-- Close Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-neutral-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ClientOnly>
          <button
            v-if="!isAuthenticated() && isReady"
            class="w-full text-left p-2 hover:bg-neutral-100"
          >
            {{ $t("header.register") }}
          </button>
          <Avatar v-if="isAuthenticated() && isReady" class="mb-4" />
        </ClientOnly>
        <button
          @click="handleCartDrawerFromMenu"
          class="relative focus:outline-none"
        >
          <img
            src="/assets/icons/cart.svg"
            :alt="$t('header.alt.cart')"
            class="size-6 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
        <!-- Links Section for Tablet/Mobile in Hamburger Menu -->
        <div class="flex flex-col gap-2 mt-4">
          <NuxtLink
            :to="localePath({ name: 'shop', query: { tags: $t('header.links.flores') } })"
            class="hover:text-neutral-600"
            @click="handleMenuLinkClick"
          >
            {{ $t("header.links.flores") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ name: 'shop', query: { tags: $t('header.links.rosas') } })"
            class="hover:text-neutral-600"
            @click="handleMenuLinkClick"
          >
            {{ $t("header.links.rosas") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ name: 'shop', query: { tags: $t('header.links.plantas') } })"
            class="hover:text-neutral-600"
            @click="handleMenuLinkClick"
          >
            {{ $t("header.links.plantas") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ name: 'shop', query: { tags: $t('header.links.momentos') } })"
            class="hover:text-neutral-600"
            @click="handleMenuLinkClick"
          >
            {{ $t("header.links.momentos") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/shop' })"
            class="hover:text-neutral-600"
            @click="handleMenuLinkClick"
          >
            {{ $t("header.links.tienda") }}
          </NuxtLink>
        </div>

        <!-- Flags Side by Side -->
        <div class="flex gap-2 mt-4">
          <NuxtLink :to="getLocalePathWithQuery('es')" @click="handleMenuLinkClick">
            <img
              src="/images/flags/es.png"
              :alt="$t('header.alt.flag_es')"
              class="w-6 h-4"
            />
          </NuxtLink>
          <NuxtLink :to="getLocalePathWithQuery('en')" @click="handleMenuLinkClick">
            <img
              src="/images/flags/en.png"
              :alt="$t('header.alt.flag_en')"
              class="w-6 h-4"
            />
          </NuxtLink>
          <NuxtLink :to="getLocalePathWithQuery('de')" @click="handleMenuLinkClick">
            <img
              src="/images/flags/de.png"
              :alt="$t('header.alt.flag_de')"
              class="w-6 h-4"
            />
          </NuxtLink>
        </div>
      </div>
    </transition>
    <!-- New Links Section for Desktop View -->
    <nav class="hidden lg:flex items-center mt-4 relative uppercase w-full">
      <!-- Navigation Links Container -->
      <div class="flex justify-center gap-8 w-full font-medium">
        <NuxtLink
          :to="
            localePath({
              name: 'shop',
              query: { tags: $t('header.links.flores') },
            })
          "
          class="hover:text-neutral-600"
        >
          {{ $t("header.links.flores") }}
        </NuxtLink>
        <NuxtLink
          :to="
            localePath({
              name: 'shop',
              query: { tags: $t('header.links.rosas') },
            })
          "
          class="hover:text-neutral-600"
        >
          {{ $t("header.links.rosas") }}
        </NuxtLink>
        <NuxtLink
          :to="
            localePath({
              name: 'shop',
              query: { tags: $t('header.links.plantas') },
            })
          "
          class="hover:text-neutral-600"
        >
          {{ $t("header.links.plantas") }}
        </NuxtLink>
        <NuxtLink
          :to="
            localePath({
              name: 'shop',
              query: { tags: $t('header.links.momentos') },
            })
          "
          class="hover:text-neutral-600"
        >
          {{ $t("header.links.momentos") }}
        </NuxtLink>
        <NuxtLink
          :to="localePath({ path: '/shop' })"
          class="hover:text-neutral-600"
        >
          {{ $t("header.links.tienda") }}
        </NuxtLink>

      </div>

      <!-- Search Form Positioned Absolutely to the Right -->
      <form
        ref="formRef"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center lg:w-40 xl:w-64"
        @submit.prevent="handleSearch"
      >
        <div class="relative w-full">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('header.input.placeholder')"
            class="border border-neutral-600 p-1 pl-10 focus:border-neutral-800 focus:outline-hidden focus:shadow-lg transition-all duration-300 w-full"
          />
          <button 
            type="submit"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <img
              src="/assets/icons/magnifier.svg"
              :alt="$t('header.alt.magnifier')"
              class="w-5 h-5 text-neutral-400"
            />
          </button>
        </div>
      </form>
    </nav>
    <HeaderSlider />
  </header>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import CartDrawer from '~/components/CartDrawer.vue';
import { useCartDrawer } from '~/composables/useCartDrawer';
const { showCartDrawer } = useCartDrawer();
const isMounted = ref(true);
const searchQuery = ref('');

// Función para manejar la búsqueda
function handleSearch() {
  if (searchQuery.value.trim()) {
    // Redirigir a la página de tienda con el parámetro de búsqueda
    const router = useRouter();
    router.push(localePath({
      name: 'shop',
      query: { search: searchQuery.value.trim() }
    }));
    searchQuery.value = ''; // Limpiar el campo después de la búsqueda
  }
}

function openCartDrawer() {
  showCartDrawer.value = true;
}

import { nextTick } from 'vue';
function handleCartDrawerFromMenu() {
  isMenuOpen.value = false;
  nextTick(() => {
    showCartDrawer.value = true;
  });
}



import LoginRegister from "~/components/LoginRegister.vue";
const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();

const overlay = useOverlay();

const isOpen = ref(false);
const isMenuOpen = ref(false);
const isOpenMagnifier = ref(false);
const currentLocale = ref(locale.value);
const currentFlag = ref(`/images/flags/${currentLocale.value}.png`);
const formRef = ref(null);
const dropdownRef = ref(null);

import { useCartStore } from "~/stores/cart";
const cart = useCartStore();

const tagTranslations = {
  es: {
    flores: "flores",
    rosas: "rosas",
    plantas: "plantas",
    momentos: "momentos",
  },
  en: {
    flores: "flowers",
    rosas: "roses",
    plantas: "plants",
    momentos: "moments",
  },
  de: {
    flores: "blumen",
    rosas: "rosen",
    plantas: "pflanzen",
    momentos: "momente",
  },
};

const filterTranslations = {
  // Ocasiones/Occasions
  es: {
    cumpleaños: "cumpleaños",
    bodas: "bodas",
    nacimiento: "nacimiento",
    felicitaciones: "felicitaciones",
    // Momentos/Moments
    romantico: "romantico",
    gracias: "gracias",
    buenosdias: "buenosdias",
    buenasnoches: "buenasnoches",
    // Colores/Colors
    rojo: "rojo",
    rosa: "rosa",
    blanco: "blanco",
    amarillo: "amarillo",
    naranja: "naranja",
    azul: "azul",
    negro: "negro",
    violeta: "violeta",
    verde: "verde",
    gris: "gris",
  },
  en: {
    cumpleaños: "birthday",
    bodas: "wedding",
    nacimiento: "birth",
    felicitaciones: "congratulations",
    // Momentos/Moments
    romantico: "romantic",
    gracias: "thankyou",
    buenosdias: "goodmorning",
    buenasnoches: "goodnight",
    // Colores/Colors
    rojo: "red",
    rosa: "pink",
    blanco: "white",
    amarillo: "yellow",
    naranja: "orange",
    azul: "blue",
    negro: "black",
    violeta: "purple",
    verde: "green",
    gris: "neutral",
  },
  de: {
    cumpleaños: "geburtstag",
    bodas: "hochzeit",
    nacimiento: "geburt",
    felicitaciones: "glückwünsche",
    // Momentos/Moments
    romantico: "romantisch",
    gracias: "danke",
    buenosdias: "gutenmorgen",
    buenasnoches: "gutenacht",
    // Colores/Colors
    rojo: "rot",
    rosa: "rosa",
    blanco: "weiß",
    amarillo: "gelb",
    naranja: "orange",
    azul: "blau",
    negro: "schwarz",
    violeta: "violett",
    verde: "grün",
    gris: "grau",
  },
};

const translateTag = (tag, fromLang, toLang) => {
  const fromTags = tagTranslations[fromLang];
  const toTags = tagTranslations[toLang];

  const entry = Object.entries(fromTags).find(([key, value]) => value === tag);
  return entry ? toTags[entry[0]] : tag;
};

const translateFilter = (value, fromLang, toLang) => {
  if (!value) return value;
  
  // Buscar traducción directa
  if (filterTranslations[fromLang] && filterTranslations[toLang]) {
    // Buscar el valor en el idioma de origen
    for (const [key, val] of Object.entries(filterTranslations[fromLang])) {
      if (val === value) {
        // Devolver el valor correspondiente en el idioma de destino
        return filterTranslations[toLang][key];
      }
    }
  }
  
  // Si no se encuentra traducción, devolver el valor original
  return value;
};

const getLocalePathWithQuery = (lang) => {
  const newQuery = { ...route.query };

  if (newQuery.tags) {
    newQuery.tags = translateTag(newQuery.tags, currentLocale.value, lang);
  }
  
  // Traducir los parámetros de filtrado
  const filterParams = ['occasions', 'moments', 'flowers', 'colors'];
  
  filterParams.forEach(param => {
    if (newQuery[param]) {
      newQuery[param] = translateFilter(newQuery[param], currentLocale.value, lang);
    }
  });

  return {
    path: switchLocalePath(lang),
    query: newQuery,
  };
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleMagnifier = () => {
  isOpenMagnifier.value = !isOpenMagnifier.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

function handleMenuLinkClick() {
  isMenuOpen.value = false;
}


const handleClickOutside = (event) => {
  if (
    isOpenMagnifier.value &&
    formRef.value &&
    !formRef.value.contains(event.target)
  ) {
    isOpenMagnifier.value = false;
  }

  if (
    isOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

const { isAuthenticated, userName } = useAuth();

const modal = overlay.create(LoginRegister);

const openModal = () => {
  modal.open(LoginRegister, {});
};
// Inicializar como true para evitar parpadeos en la UI
const isReady = ref(true);

onMounted(() => {
  watchEffect((onCleanup) => {
    currentLocale.value = locale.value;
    currentFlag.value = `/images/flags/${currentLocale.value}.png`;
    if (isOpenMagnifier.value || isOpen.value) {
      document.addEventListener("click", handleClickOutside);
      onCleanup(() => {
        document.removeEventListener("click", handleClickOutside);
      });
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  });
});
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform-origin: right;
}

.expand-enter-from,
.expand-leave-to {
  transform: scaleX(0);
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  transform: scaleX(1);
  opacity: 1;
}
</style>
