<!-- pages/booking.vue -->
<script setup>
import { ref, computed } from 'vue'  // Add ref here
import { useQuoteStore } from '~/stores/store'
import moment from 'moment-timezone'

// State
const selectedService = ref(null)
const serviceDetails = ref(null)
const showContactForm = ref(false)
const showConfirmation = ref(false)

// Store and Route
const store = useQuoteStore()
const route = useRoute()
const $gtm = useGTM()

// Form State
const selectedCar = ref('')
const address = ref({
  street: '',
  city: '',
  zipcode: '',
  State: 'IL'
})
const phone = ref('')

const isLoggedIn = ref(false)

// First check auth status
const { data: authData } = await useLazyFetch('/api/auth/test', {
  server: false,
  onResponse({ response }) {
    isLoggedIn.value = response._data.token ? true : false
  }
})

// Then fetch cars only if logged in
const { data: carData } = await useLazyFetch('/api/car/list', {
  server: false,
  enabled: isLoggedIn.value, // Only fetch if logged in
  onResponse({ response }) {
    console.log('Car data response:', response._data)
    selectedCar.value = response._data[0]
  }
})

// Form Validation
const isFormValid = computed(() => {
  return selectedCar.value &&
    address.value.street &&
    address.value.city &&
    address.value.zipcode &&
    phone.value
})

// Handlers
const handleServiceSelection = (service) => {
  selectedService.value = service
  serviceDetails.value = null

  $gtm.trackEvent({
    event: 'serviceSelection',
    servicesLink: service
  })
}

const handleServiceDetails = (details) => {
  serviceDetails.value = details
}

const handleBookingProceed = (bookingDetails) => {
  serviceDetails.value = bookingDetails
  showContactForm.value = true
}

const handleBack = () => {
  selectedService.value = null
  serviceDetails.value = null
}

const handleSubmitBooking = async () => {
  try {
    const response = await $fetch('/api/apts/create', {
      method: 'POST',
      body: {
        appointmentDate: serviceDetails.value.appointmentDate,
        carId: selectedCar.value,
        service: serviceDetails.value.service,
        address: `${address.value.street} ${address.value.city} ${address.value.State} ${address.value.zipcode}`,
        phone: phone.value
      }
    })

    if (response === "OK") {
      showContactForm.value = false
      showConfirmation.value = true

      store.saveQuote(
        address.value,
        serviceDetails.value.service,
        serviceDetails.value.tpmCount || 0,
        phone.value,
        serviceDetails.value.appointmentDate,
        serviceDetails.value.price
      )
    }
  } catch (error) {
    console.error('Error creating appointment:', error)
  }
}

// Handle direct service selection from URL
onMounted(() => {
  const { service } = route.query
  if (service) {
    selectedService.value = service
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8 ml-8">
      <h1 class="text-2xl font-bold dark:text-white">Schedule Your Service</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Select a service to get started</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Column - Dynamic Content -->
      <div class="lg:w-1/2 relative">
        <!-- Back button when showing details -->
        <button v-if="selectedService" @click="handleBack"
          class="mb-4 text-vivid-red hover:text-red-700 flex items-center gap-2">
          ← Back to services
        </button>

        <!-- Wrap components in a div inside Transition -->
        <Transition name="fade" mode="out-in">
          <div>
            <BookingServiceGrid v-if="!selectedService" :selected-service="selectedService"
              @service-selected="handleServiceSelection" />
            <BookingServiceDetail v-else :selected-service="selectedService"
              @ready-for-scheduling="handleServiceDetails" />
          </div>
        </Transition>
      </div>

      <!-- Right Column - Calendar -->
      <div class="lg:w-1/2">
        <BookingCalendar v-if="serviceDetails" :selected-service="serviceDetails"
          @proceed-to-booking="handleBookingProceed" />
      </div>
    </div>

    <!-- Contact/Location Form -->
    <div v-if="showContactForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
        <h2 class="text-xl font-bold mb-6 dark:text-white">Complete Your Booking</h2>

        <!-- Vehicle Selection -->
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Select Vehicle
          </label>
          <div v-if="!isLoggedIn" class="text-gray-600">
            Please <NuxtLink to="/login" class="text-vivid-red hover:underline">login</NuxtLink> to select your vehicle
          </div>
          <select v-else v-model="selectedCar"
            class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select a Vehicle</option>
            <option v-for="car in carData" :key="car._id" :value="car">
              {{ car.year }} {{ car.make }} {{ car.model }}
            </option>
          </select>
        </div>

        <!-- Address Form -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Street Address
            </label>
            <input v-model="address.street" type="text"
              class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              City
            </label>
            <input v-model="address.city" type="text"
              class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              State
            </label>
            <select v-model="address.State"
              class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>IL</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Zip Code
            </label>
            <input v-model="address.zipcode" type="text"
              class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
        </div>

        <!-- Phone -->
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Contact Phone
          </label>
          <input v-model="phone" type="tel"
            class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4">
          <button @click="showContactForm = false" class="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button @click="handleSubmitBooking" :disabled="!isFormValid"
            class="px-4 py-2 bg-vivid-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 text-center">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Appointment Booked!</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Your appointment has been successfully scheduled.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Please be advised that our service is weather based. We cannot work in
          heavy rain, heavy snow fall, or in temperatures under 20 degrees.
        </p>
        <NuxtLink to="/">
          <button class="bg-vivid-red text-white px-6 py-3 rounded hover:bg-red-700">
            Return Home
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>