<template>
  <header>
    <div class="absolute top-4 left-4 flex justify-between w-full">
      <img
        src="/logo-floristeria-flowerpower.png"
        :alt="$t('header.alt.logo')"
        class="w-auto h-[70px] md:h-[120px]"
      />
      <div class="mr-8 flex flex-row gap-3 items-baseline">
        <a href="/"> {{ $t("header.register") }} </a>
        <button>
          <img
            src="/assets/icons/cart.svg"
            :alt="$t('header.alt.cart')"
            class="size-6"
          />
        </button>
        <div class="relative inline-block text-left">
          <button
            @click="toggleDropdown"
            class="inline-flex justify-center w-full bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
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
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();
const isOpen = ref(false);
const currentLocale = ref(locale.value);
const currentFlag = ref(`/images/flags/${currentLocale.value}.png`);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = async (language) => {
  currentLocale.value = language;
  locale.value = language;
  currentFlag.value = `/images/flags/${language}.png`;
  isOpen.value = false;

  await router.push({ path: `/${language}` });
};
</script>

<style>
/* Puedes añadir estilos adicionales aquí si es necesario */
</style>
