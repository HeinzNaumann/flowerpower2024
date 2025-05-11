<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Encabezado -->
    <div class="text-center mb-16">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ $t('contact.title') }}</h1>
      <p class="max-w-2xl mx-auto text-lg text-gray-600">
        {{ $t('contact.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
      <!-- Información de contacto -->
      <div class="lg:col-span-1 bg-[#F8F5FA] rounded-xl p-8 shadow-sm">
        <h2 class="text-xl font-bold mb-6">{{ $t('contact.info.title') }}</h2>
        
        <!-- Dirección -->
        <div class="flex items-start mb-8">
          <div class="bg-[#382C3E] rounded-full p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">{{ $t('contact.info.address.title') }}</h3>
            <p class="text-gray-600">{{ $t('contact.info.address.line1') }}</p>
            <p class="text-gray-600">{{ $t('contact.info.address.line2') }}</p>
          </div>
        </div>
        
        <!-- Email -->
        <div class="flex items-start mb-8">
          <div class="bg-[#382C3E] rounded-full p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">{{ $t('contact.info.email.title') }}</h3>
            <a href="mailto:info{at}flowerpower.com" class="text-[#382C3E] hover:underline">info{at}flowerpower.com</a>
          </div>
        </div>
        
        <!-- Teléfono -->
        <div class="flex items-start mb-8">
          <div class="bg-[#382C3E] rounded-full p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">{{ $t('contact.info.phone.title') }}</h3>
            <p class="text-gray-600">+34 93 123 45 67</p>
          </div>
        </div>
        
        <!-- Horario -->
        <div class="flex items-start">
          <div class="bg-[#382C3E] rounded-full p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">{{ $t('contact.info.hours.title') }}</h3>
            <p class="text-gray-600">{{ $t('contact.info.hours.weekdays') }}</p>
            <p class="text-gray-600">{{ $t('contact.info.hours.weekends') }}</p>
          </div>
        </div>
        
        <!-- Redes sociales -->
        <div class="mt-10">
          <h3 class="font-semibold mb-4">{{ $t('contact.info.social.title') }}</h3>
          <div class="flex space-x-4">
            <a href="#" class="bg-[#382C3E] hover:bg-[#4A3C50] text-white rounded-full p-3 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" class="bg-[#382C3E] hover:bg-[#4A3C50] text-white rounded-full p-3 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="bg-[#382C3E] hover:bg-[#4A3C50] text-white rounded-full p-3 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Formulario de contacto -->
      <div class="lg:col-span-2 bg-white rounded-xl p-8 shadow-lg">
        <h2 class="text-xl font-bold mb-6">{{ $t('contact.form.title') }}</h2>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Nombre y Apellido -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.form.firstName') }}</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="form.firstName" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#382C3E] focus:border-transparent"
                :placeholder="$t('contact.form.firstNamePlaceholder')"
                required
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.form.lastName') }}</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="form.lastName" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#382C3E] focus:border-transparent"
                :placeholder="$t('contact.form.lastNamePlaceholder')"
                required
              />
            </div>
          </div>
          
          <!-- Email y Teléfono -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.form.email') }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#382C3E] focus:border-transparent"
                :placeholder="$t('contact.form.emailPlaceholder')"
                required
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.form.phone') }}</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#382C3E] focus:border-transparent"
                :placeholder="$t('contact.form.phonePlaceholder')"
              />
            </div>
          </div>
          
          <!-- Asunto -->
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.form.subject') }}</label>
            <select 
              id="subject" 
              v-model="form.subject" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#382C3E] focus:border-transparent"
              required
            >
              <option value="" disabled selected>{{ $t('contact.form.subjectPlaceholder') }}</option>
              <option value="general">{{ $t('contact.form.subjects.general') }}</option>
              <option value="order">{{ $t('contact.form.subjects.order') }}</option>
              <option value="products">{{ $t('contact.form.subjects.products') }}</option>
              <option value="wholesale">{{ $t('contact.form.subjects.wholesale') }}</option>
              <option value="other">{{ $t('contact.form.subjects.other') }}</option>
            </select>
          </div>
          
          <!-- Mensaje -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.form.message') }}</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#382C3E] focus:border-transparent"
              :placeholder="$t('contact.form.messagePlaceholder')"
              required
            ></textarea>
          </div>
          
          <!-- Política de privacidad -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input 
                id="privacy" 
                type="checkbox" 
                v-model="form.privacy" 
                class="h-4 w-4 text-[#382C3E] border-gray-300 rounded focus:ring-[#382C3E]"
                required
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="privacy" class="font-medium text-gray-700">
                {{ $t('contact.form.privacyPolicyText') }} 
                <a :href="localePath('/privacy-policy')" class="text-[#382C3E] hover:underline">{{ $t('contact.form.privacyPolicyLink') }}</a>
              </label>
            </div>
          </div>
          
          <!-- Botón de envío -->
          <div class="flex justify-end">
            <button 
              type="submit" 
              class="px-6 py-3 bg-[#382C3E] text-white font-medium rounded-lg hover:bg-[#4A3C50] transition duration-300 flex items-center"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.send') }}
            </button>
          </div>
        </form>
        
        <!-- Mensaje de éxito -->
        <div v-if="formSubmitted" class="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {{ $t('contact.form.successMessage') }}
        </div>
      </div>
    </div>
    
    <!-- Mapa -->
    <div class="rounded-xl overflow-hidden shadow-lg h-96 mb-16">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.6854665897584!2d2.1518899999999997!3d41.3867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f4142fdb4d%3A0x4c0a0e7d01b6d79f!2sCarrer%20Fetjet%2C%203%2C%2008009%20Barcelona!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses" 
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
    
    <!-- Preguntas frecuentes -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-center mb-10">{{ $t('contact.faq.title') }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(faq, index) in 4" :key="index" class="bg-[#F8F5FA] p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold mb-3">{{ $t(`contact.faq.questions.${index}.question`) }}</h3>
          <p class="text-gray-600">{{ $t(`contact.faq.questions.${index}.answer`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalePath } from '#imports';
import { useHead } from '#imports';

const localePath = useLocalePath();

// SEO
useHead({
  title: 'Contacto | Flower Power',
  meta: [
    {
      name: 'description',
      content: 'Contacta con nosotros para cualquier consulta sobre nuestros productos o servicios. Estamos aquí para ayudarte.'
    }
  ]
});

// Estado del formulario
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

// Método para enviar el formulario
const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log('Formulario enviado:', form.value);
    
    // Simulamos una espera de 1 segundo para mostrar el estado de carga
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Resetear el formulario
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false
    };
    
    // Mostrar mensaje de éxito
    formSubmitted.value = true;
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
