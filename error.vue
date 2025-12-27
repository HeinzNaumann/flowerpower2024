<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="w-full pt-4 px-4">
      <NuxtLink to="/" class="inline-block">
        <img
          src="/logo-floristeria-flowerpower.png"
          alt="Flower Power Logo"
          class="w-auto h-[60px] md:h-[90px]"
        />
      </NuxtLink>
    </header>
    
    <div class="flex-grow flex items-center justify-center px-4">
      <div class="max-w-md w-full text-center">
        <div class="mb-8">
          <h1 class="text-6xl font-bold text-gray-900 mb-4">
            {{ error.statusCode }}
          </h1>
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">
            {{ errorTitle }}
          </h2>
          <p class="text-gray-600 mb-8">
            {{ errorMessage }}
          </p>
        </div>
        
        <div class="space-y-4">
          <NuxtLink
            to="/"
            class="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
          >
            {{ t('error.backHome') }}
          </NuxtLink>
          
          <button
            v-if="error.statusCode !== 404"
            @click="handleError"
            class="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {{ t('error.retry') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const event = useRequestEvent()
if (event) {
  setResponseStatus(event, props.error.statusCode || 500)
}

useHead({
  title: computed(() => `${props.error.statusCode} - ${errorTitle.value}`),
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return t('error.404.title')
    case 500:
      return t('error.500.title')
    default:
      return t('error.default.title')
  }
})

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return t('error.404.message')
    case 500:
      return t('error.500.message')
    default:
      return t('error.default.message')
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>
