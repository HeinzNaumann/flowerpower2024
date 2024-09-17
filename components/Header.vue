<template>
  <header>
    <div class="absolute top-4 left-4 flex justify-between w-full">
      <a href="/">
        <img
          src="/logo-floristeria-flowerpower.png"
          :alt="$t('header.alt.logo')"
          class="w-auto h-[70px] md:h-[120px]"
        />
      </a>
      <!-- Hamburger Button for Mobile View -->
      <div class="lg:hidden p-2 mr-4 flex gap-2 relative items-center">
        <!-- Added 'relative' -->
        <!-- Transition wrapper with 'expand' -->
        <transition name="expand">
          <form
            v-if="isOpenMagnifier"
            class="items-center relative right-0 top-0 z-30 bl overflow-hidden p-1 rounded"
            ref="formRef"
          >
            <input
              type="text"
              :placeholder="$t('header.input.placeholder')"
              class="w-full border p-1 focus:outline-none focus:shadow-lg transition-all duration-300 ease-in-out delay-150"
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
        <button>
          <img
            src="/assets/icons/cart.svg"
            :alt="$t('header.alt.cart')"
            class="size-6 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
        <button class="" @click="toggleMenu" aria-label="Toggle menu">
          <!-- Hamburger Icon -->
          <img
            src="/assets/icons/hamburger-menu.svg"
            :alt="$t('header.alt.cart')"
            class="h-6 w-6 text-gray-80 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
      </div>
      <!-- Desktop Navigation Links -->
      <div class="hidden mr-8 flex-row gap-3 items-baseline lg:flex">
        <a class="hover:text-gray-600" href="/">
          {{ $t("header.register") }}
        </a>
        <button>
          <img
            src="/assets/icons/cart.svg"
            :alt="$t('header.alt.cart')"
            class="size-6 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
        <div class="relative inline-block text-left">
          <button
            @click="toggleDropdown"
            class="inline-flex justify-center w-full bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:opacity-70 transition-opacity duration-200"
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
            <a
              href="#"
              @click.prevent="changeLanguage('es')"
              class="flex items-center p-2 hover:bg-gray-100"
            >
              <img
                src="/images/flags/es.png"
                :alt="$t('header.alt.flag_es')"
                class="w-6 h-4"
              />
            </a>
            <a
              href="#"
              @click.prevent="changeLanguage('en')"
              class="flex items-center p-2 hover:bg-gray-100"
            >
              <img
                src="/images/flags/en.png"
                :alt="$t('header.alt.flag_en')"
                class="w-6 h-4"
              />
            </a>
            <a
              href="#"
              @click.prevent="changeLanguage('de')"
              class="flex items-center p-2 hover:bg-gray-100"
            >
              <img
                src="/images/flags/de.png"
                :alt="$t('header.alt.flag_de')"
                class="w-6 h-4"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Overlay -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-20"
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
          class="self-end p-2"
          @click="toggleMenu"
          aria-label="Close menu"
        >
          <!-- Close Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-800"
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
        <a class="hover:text-gray-600" href="/">
          {{ $t("header.register") }}
        </a>
        <button>
          <img
            src="/assets/icons/cart.svg"
            :alt="$t('header.alt.cart')"
            class="size-6 hover:opacity-70 transition-opacity duration-200"
          />
        </button>
        <!-- Links Section for Tablet/Mobile in Hamburger Menu -->
        <div class="flex flex-col gap-2 mt-4">
          <a href="/flores" class="hover:text-gray-600">{{
            $t("header.links.flores")
          }}</a>
          <a href="/rosas" class="hover:text-gray-600">{{
            $t("header.links.rosas")
          }}</a>
          <a href="/plantas" class="hover:text-gray-600">{{
            $t("header.links.plantas")
          }}</a>
          <a href="/momentos" class="hover:text-gray-600">{{
            $t("header.links.momentos")
          }}</a>
          <a href="/tienda" class="hover:text-gray-600">{{
            $t("header.links.tienda")
          }}</a>
          <a href="/suscripciones" class="hover:text-gray-600">{{
            $t("header.links.suscripciones")
          }}</a>
        </div>
        <!-- Flags Side by Side -->
        <div class="flex gap-2 mt-4">
          <a href="#" @click.prevent="changeLanguage('es')">
            <img
              src="/images/flags/es.png"
              :alt="$t('header.alt.flag_es')"
              class="w-6 h-4"
            />
          </a>
          <a href="#" @click.prevent="changeLanguage('en')">
            <img
              src="/images/flags/en.png"
              :alt="$t('header.alt.flag_en')"
              class="w-6 h-4"
            />
          </a>
          <a href="#" @click.prevent="changeLanguage('de')">
            <img
              src="/images/flags/de.png"
              :alt="$t('header.alt.flag_de')"
              class="w-6 h-4"
            />
          </a>
        </div>
      </div>
    </transition>
    <!-- New Links Section for Desktop View -->
    <nav
      class="hidden lg:flex justify-center mt-4 space-x-6 absolute top-[200px] w-screen uppercase items-center"
    >
      <a href="/flores" class="hover:text-gray-600">{{
        $t("header.links.flores")
      }}</a>
      <a href="/rosas" class="hover:text-gray-600">{{
        $t("header.links.rosas")
      }}</a>
      <a href="/plantas" class="hover:text-gray-600">{{
        $t("header.links.plantas")
      }}</a>
      <a href="/momentos" class="hover:text-gray-600">{{
        $t("header.links.momentos")
      }}</a>
      <a href="/tienda" class="hover:text-gray-600">{{
        $t("header.links.tienda")
      }}</a>
      <a href="/suscripciones" class="hover:text-gray-600">{{
        $t("header.links.suscripciones")
      }}</a>
      <form class="flex items-center">
        <input
          type="text"
          :placeholder="$t('header.input.placeholder')"
          class="border border-gray-300 p-1 focus:border-gray-800 focus:outline-none focus:shadow-lg transition-all duration-300"
        />
      </form>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";

// Import custom breakpoint composable if you have one
// import useCustomBreakpoints from 'path-to-your-composable';

const { locale } = useI18n();

// Replace this with your actual breakpoint logic or import
const isDesktop = ref(false);
const isTablet = ref(false);
const isMobile = ref(true);

// Initialize reactive variables
const isOpen = ref(false);
const isMenuOpen = ref(false); // State for the mobile menu
const isOpenMagnifier = ref(false);
const currentLocale = ref(locale.value);
const currentFlag = ref(`/images/flags/${currentLocale.value}.png`);
const formRef = ref(null);

// Toggle dropdown menu
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Toggle magnifier form
const toggleMagnifier = () => {
  isOpenMagnifier.value = !isOpenMagnifier.value;
};

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Change language
const changeLanguage = async (language) => {
  currentLocale.value = language;
  locale.value = language;
  currentFlag.value = `/images/flags/${language}.png`;
  isOpen.value = false;

  // Navigate to the selected language path
  await navigateTo({ path: `/${language}` });
};

// Handle clicks outside the form to close it
const handleClickOutside = (event) => {
  if (formRef.value && !formRef.value.contains(event.target)) {
    isOpenMagnifier.value = false;
  }
};

// Watch for changes to isOpenMagnifier to add/remove event listeners
watch(isOpenMagnifier, (newVal) => {
  if (newVal) {
    // Add event listener when form is open
    document.addEventListener("click", handleClickOutside);
  } else {
    // Remove event listener when form is closed
    document.removeEventListener("click", handleClickOutside);
  }
});

// Clean up event listeners when component is destroyed
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Expand transition for the magnifier form */
.expand-enter-active,
.expand-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.expand-enter-from {
  transform: scaleX(0);
  opacity: 0;
}

.expand-enter-to {
  transform: scaleX(1);
  opacity: 1;
}

.expand-leave-from {
  transform: scaleX(1);
  opacity: 1;
}

.expand-leave-to {
  transform: scaleX(0);
  opacity: 0;
}

/* Set the transform origin to the right */
.expand-enter-active,
.expand-leave-active,
.expand-enter-from,
.expand-enter-to,
.expand-leave-from,
.expand-leave-to {
  transform-origin: right;
}

/* Fade transition for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
