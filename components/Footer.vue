<template>
  <footer class="bg-[#382C3E] text-white">
    <div class="container mx-auto px-6 py-8">
      <!-- Mobile/Tablet Accordion -->
      <div class="lg:hidden space-y-4">
        <div class="border-b border-neutral-700">
          <button
            @click="toggleSection('help')"
            class="w-full py-4 flex justify-between items-center"
          >
            <h3 class="font-bold text-xl">
              {{ $t("footer.sections.getHelp") }}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 transition-transform duration-200"
              :class="{ 'rotate-45': openSection === 'help' }"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-y-95 opacity-0"
            enter-to-class="transform scale-y-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-y-100 opacity-100"
            leave-to-class="transform scale-y-95 opacity-0"
          >
            <ul v-if="openSection === 'help'" class="py-4 space-y-4">
              <li>
                <NuxtLink :to="localePath('/faq')" class="block hover:text-neutral-300">{{
                  $t("footer.links.faq")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/shipping-delivery')" class="block hover:text-neutral-300">{{
                  $t("footer.links.shippingAndDelivery")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/privacy-policy')" class="block hover:text-neutral-300">{{
                  $t("footer.links.privacyPolicy")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/bouquet-care')" class="block hover:text-neutral-300">{{
                  $t("footer.links.bouquetCare")
                }}</NuxtLink>
              </li>
            </ul>
          </transition>
        </div>

        <div class="border-b border-neutral-700">
          <button
            @click="toggleSection('about')"
            class="w-full py-4 flex justify-between items-center"
          >
            <h3 class="font-bold text-xl">
              {{ $t("footer.sections.aboutFlowerPower") }}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 transition-transform duration-200"
              :class="{ 'rotate-45': openSection === 'about' }"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-y-95 opacity-0"
            enter-to-class="transform scale-y-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-y-100 opacity-100"
            leave-to-class="transform scale-y-95 opacity-0"
          >
            <ul v-if="openSection === 'about'" class="py-4 space-y-4">
              <li>
                <NuxtLink :to="localePath('/our-history')" class="block hover:text-neutral-300">{{
                  $t("footer.links.ourHistory")
                }}</NuxtLink>
              </li>

              <li>
                <NuxtLink :to="localePath('/physical-store')" class="block hover:text-neutral-300">{{
                  $t("footer.links.physicalStore")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/contact')" class="block hover:text-neutral-300">{{
                  $t("footer.links.contact")
                }}</NuxtLink>
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden lg:grid lg:grid-cols-3 gap-8">
        <div>
          <h3 class="font-bold text-lg mb-4">
            {{ $t("footer.sections.getHelp") }}
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="localePath('/faq')" class="hover:text-neutral-300">{{
                $t("footer.links.faq")
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/shipping-delivery')" class="hover:text-neutral-300">{{
                $t("footer.links.shippingAndDelivery")
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/privacy-policy')" class="hover:text-neutral-300">{{
                $t("footer.links.privacyPolicy")
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/bouquet-care')" class="hover:text-neutral-300">{{
                $t("footer.links.bouquetCare")
              }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4">
            {{ $t("footer.sections.aboutFlowerPower") }}
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="localePath('/our-history')" class="hover:text-neutral-300">{{
                $t("footer.links.ourHistory")
              }}</NuxtLink>
            </li>

            <li>
              <NuxtLink :to="localePath('/physical-store')" class="hover:text-neutral-300">{{
                $t("footer.links.physicalStore")
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/contact')" class="hover:text-neutral-300">{{
                $t("footer.links.contact")
              }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex justify-end space-x-4">
          <a href="https://www.facebook.com/FlowerPower.es" target="_blank" rel="noopener noreferrer" class="hover:opacity-75">
            <img
              src="/assets/icons/facebook.svg"
              :alt="$t('footer.socialMedia.facebook')"
              class="w-6 h-6 text-white"
            />
          </a>
          <a href="https://www.youtube.com/@flowerpower4999" target="_blank" rel="noopener noreferrer" class="hover:opacity-75">
            <img
              src="/assets/icons/youtube.svg"
              :alt="$t('footer.socialMedia.youtube')"
              class="w-6 h-6"
            />
          </a>
          <a href="https://www.instagram.com/floristeriaflowerpower" target="_blank" rel="noopener noreferrer" class="hover:opacity-75">
            <img
              src="/assets/icons/instagram.svg"
              :alt="$t('footer.socialMedia.instagram')"
              class="w-6 h-6"
            />
          </a>
        </div>
      </div>

      <!-- Social Media Icons (Mobile/Tablet) -->
      <div class="mt-8 flex justify-center space-x-6 lg:hidden">
        <a href="https://www.facebook.com/FlowerPower.es" target="_blank" rel="noopener noreferrer" class="hover:opacity-75">
          <img
            src="/assets/icons/facebook.svg"
            :alt="$t('footer.socialMedia.facebook')"
            class="w-8 h-8"
          />
        </a>
        <a href="https://www.youtube.com/@flowerpower4999" target="_blank" rel="noopener noreferrer" class="hover:opacity-75">
          <img
            src="/assets/icons/youtube.svg"
            :alt="$t('footer.socialMedia.youtube')"
            class="w-8 h-8"
          />
        </a>
        <a href="https://www.instagram.com/floristeriaflowerpower" target="_blank" rel="noopener noreferrer" class="hover:opacity-75">
          <img
            src="/assets/icons/instagram.svg"
            :alt="$t('footer.socialMedia.instagram')"
            class="w-8 h-8"
          />
        </a>
      </div>
    </div>

    <!-- Bottom Footer -->

    <div
      class="container mx-auto px-4 flex flex-col xl:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 pt-10 pb-5"
    >
      <div
        class="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 lg:pb-0 pb-10"
      >
        <div class="flex items-center space-x-2 text-sm">
          <img
            src="/assets/icons/map-pin.svg"
            :alt="$t('footer.alt.mapPin')"
            class="w-6 h-6 transition-transform duration-200"
          />

          <span>{{ $t("footer.location") }}</span>
        </div>
        <div class="text-sm text-center lg:text-left">
          {{ $t("footer.copyright") }}
        </div>
      </div>

      <div
        class="flex flex-col lg:flex-row justify-start lg:justify-end text-sm space-y-2 lg:space-y-0 lg:space-x-4"
      >
        <NuxtLink :to="localePath('/terms-of-use')" class="hover:text-neutral-300">{{
          $t("footer.links.termsOfUse")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/privacy-policy')" class="hover:text-neutral-300">{{
          $t("footer.links.privacyPolicy")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/terms-of-sale')" class="hover:text-neutral-300">{{
          $t("footer.links.termsOfSale")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/legal-notice')" class="hover:text-neutral-300">{{
          $t("footer.links.legalNotice")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/cookie-settings')" class="hover:text-neutral-300">{{
          $t("footer.links.cookieSettings")
        }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLocalePath } from '#imports';

const localePath = useLocalePath();
const openSection = ref(null);

const toggleSection = (section) => {
  openSection.value = openSection.value === section ? null : section;
};
</script>
