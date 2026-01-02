<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showBanner" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-bounce-in">
          <button 
            @click="closeBanner" 
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            :aria-label="$t('common.cancel')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <div class="flex flex-col items-center text-center gap-4">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <p class="text-lg font-semibold text-gray-900">{{ $t('vacationBanner.message') }}</p>
            
            <button 
              @click="closeBanner"
              class="mt-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              {{ $t('common.understood') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showBanner = ref(true);
const BANNER_CLOSED_KEY = 'vacationBannerClosed';

onMounted(() => {
  const isClosed = localStorage.getItem(BANNER_CLOSED_KEY);
  if (isClosed === 'true') {
    showBanner.value = false;
    return;
  }
  
  const endDate = new Date('2026-02-02T23:59:59');
  const now = new Date();
  
  if (now > endDate) {
    showBanner.value = false;
  }
});

function closeBanner() {
  showBanner.value = false;
  localStorage.setItem(BANNER_CLOSED_KEY, 'true');
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative {
  transform: scale(0.9);
  opacity: 0;
}

.modal-leave-to .relative {
  transform: scale(0.9);
  opacity: 0;
}
</style>
