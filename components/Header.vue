<template>
  <header>
    <div class="absolute top-4 left-4 flex justify-between w-full">
      <NuxtLink :to="localePath({ path: '/' })">
        <img
          src="/logo-floristeria-flowerpower.png"
          :alt="$t('header.alt.logo')"
          class="w-auto h-[70px] md:h-[120px]"
        />
      </NuxtLink>
      <!-- Hamburger Button for Mobile View -->
      <div class="lg:hidden p-2 mr-4 flex gap-2 relative items-center">
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
        <NuxtLink class="hover:text-gray-600" to="login-register">
          {{ $t("header.register") }}
        </NuxtLink>
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
          <NuxtLink
            :to="localePath({ path: '/flowers' })"
            class="hover:text-gray-600"
          >
            {{ $t("header.links.flores") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/roses' })"
            class="hover:text-gray-600"
          >
            {{ $t("header.links.rosas") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/plants' })"
            class="hover:text-gray-600"
          >
            {{ $t("header.links.plantas") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/moments' })"
            class="hover:text-gray-600"
          >
            {{ $t("header.links.momentos") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/shop' })"
            class="hover:text-gray-600"
          >
            {{ $t("header.links.tienda") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/subscriptions' })"
            class="hover:text-gray-600"
          >
            {{ $t("header.links.suscripciones") }}
          </NuxtLink>
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
      <NuxtLink
        :to="localePath({ path: '/flowers' })"
        class="hover:text-gray-600"
      >
        {{ $t("header.links.flores") }}
      </NuxtLink>
      <NuxtLink
        :to="localePath({ path: '/roses' })"
        class="hover:text-gray-600"
      >
        {{ $t("header.links.rosas") }}
      </NuxtLink>
      <NuxtLink
        :to="localePath({ path: '/plants' })"
        class="hover:text-gray-600"
      >
        {{ $t("header.links.plantas") }}
      </NuxtLink>
      <NuxtLink
        :to="localePath({ path: '/moments' })"
        class="hover:text-gray-600"
      >
        {{ $t("header.links.momentos") }}
      </NuxtLink>
      <NuxtLink :to="localePath({ path: '/shop' })" class="hover:text-gray-600">
        {{ $t("header.links.tienda") }}
      </NuxtLink>
      <NuxtLink
        :to="localePath({ path: '/subscriptions' })"
        class="hover:text-gray-600"
      >
        {{ $t("header.links.suscripciones") }}
      </NuxtLink>
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
const { locale } = useI18n();
const localePath = useLocalePath();

const isOpen = ref(false);
const isMenuOpen = ref(false);
const isOpenMagnifier = ref(false);
const currentLocale = ref(locale.value);
const currentFlag = ref(`/images/flags/${currentLocale.value}.png`);
const formRef = ref(null);

const route = useRoute();
const router = useRouter();

const changeLanguage = async (language) => {
  currentLocale.value = language;
  locale.value = language;
  currentFlag.value = `/images/flags/${language}.png`;
  isOpen.value = false;

  const newPath = localePath({
    name: route.name.replace(/___\w+$/, ""),
    params: { ...route.params, locale: language },
  });

  await navigateTo(newPath);
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

const handleClickOutside = (event) => {
  if (formRef.value && !formRef.value.contains(event.target)) {
    isOpenMagnifier.value = false;
  }
};

watch(isOpenMagnifier, (newVal) => {
  if (newVal) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
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
