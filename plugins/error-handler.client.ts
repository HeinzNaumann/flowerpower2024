export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error('Vue Error:', error, info)
  })

  nuxtApp.hook('app:error', (error) => {
    console.error('App Error:', error)
  })
})
