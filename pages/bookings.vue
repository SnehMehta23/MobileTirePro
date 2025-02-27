<!-- pages/booking.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'  // Add ref here
import { useQuoteStore } from '~/stores/store'
import moment from 'moment-timezone'


const ZIP_CODES = [
  {
    "name": "Algonquin",
    "price": 50,
    "zip": ["60013", "60102", "60118", "60142", "60156"]
  },
  {
    "name": "Antioch",
    "price": 75,
    "zip": ["60002"]
  },
  {
    "name": "Barrington",
    "price": 75,
    "zip": ["60010", "60011"]
  },
  {
    "name": "Carpentersville",
    "price": 75,
    "zip": ["60102", "60110", "60118"]
  },
  {
    "name": "Cary",
    "price": 50,
    "zip": ["60013"]
  },
  {
    "name": "Crystal Lake",
    "price": 50,
    "zip": ["60012", "60014", "60039"]
  },
  {
    "name": "Grayslake",
    "price": 50,
    "zip": ["60030"]
  },
  {
    "name": "Gurnee",
    "price": 75,
    "zip": ["60031"]
  },
  {
    "name": "Huntley",
    "price": 50,
    "zip": ["60142"]
  },
  {
    "name": "Hawthorne Woods",
    "price": 75,
    "zip": ["60047", "60060"]
  },
  {
    "name": "Island Lake",
    "price": 50,
    "zip": ["60042", "60051", "60084"]
  },
  {
    "name": "Johnsburg",
    "price": 50,
    "zip": ["60050", "60051"]
  },
  {
    "name": "Lake in the Hills",
    "price": 50,
    "zip": ["60102", "60156"]
  },
  {
    "name": "Lake Villa",
    "price": 75,
    "zip": ["60046"]
  },
  {
    "name": "Lake Zurich",
    "price": 75,
    "zip": ["60047", "60049"]
  },
  {
    "name": "Lakemoor",
    "price": 50,
    "zip": ["60041", "60050", "60051", "60073"]
  },
  {
    "name": "McHenry",
    "price": 50,
    "zip": ["60050", "60051"]
  },
  {
    "name": "Richmond",
    "price": 50,
    "zip": ["60071"]
  },
  {
    "name": "Ringwood",
    "price": 50,
    "zip": ["60072"]
  },
  {
    "name": "Round Lake",
    "price": 50,
    "zip": ["60073"]
  },
  {
    "name": "Spring grove",
    "price": 50,
    "zip": ["60081"]
  },
  {
    "name": "Volo",
    "price": 50,
    "zip": ["60020", "60041", "60051", "60073"]
  },
  {
    "name": "Wauconda",
    "price": 50,
    "zip": ["60084"]
  },
  {
    "name": "Wonder Lake",
    "price": 50,
    "zip": ["60097"]
  },
  {
    "name": "Woodstock",
    "price": 50,
    "zip": ["60098"]
  }
]

// State
const selectedService = ref(null<Service>)
const serviceDetails = ref(null)
const showContactForm = ref(false)
const showConfirmation = ref(false)
const showSquareModal = ref(false);
const SELECTED_ZIP_CODE = ref<string | null>(null);
const SHOW_ZIP_CODE_SELECTION = ref<boolean>(false);
const ZIP_CODE_SELECTION_ERROR = ref<boolean>(false);
const IS_ZIP_CODE_VALID = ref<boolean>(false);
const SERVICE_FEE = ref<number | null>(null);
const DATE = ref<string | null>(null);

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
  DATE.value = bookingDetails.appointmentDate
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
        appointmentDate: DATE.value,
        carId: selectedCar.value,
        service: serviceDetails.value.service.name,
        address: `${address.value.street} ${address.value.city} ${address.value.State} ${address.value.zipcode}`,
        phone: phone.value,
        rimSize: serviceDetails.value.rimSize,
        tireCount: serviceDetails.value.tireCount,

      }
    })

    if (response === "OK") {
      showContactForm.value = false
      showConfirmation.value = true

      //   store.saveQuote(
      //       address.value,
      //       serviceDetails.value.service,
      //       serviceDetails.value.tpmCount || 0,
      //       phone.value,
      //       serviceDetails.value.appointmentDate,
      //       serviceDetails.value.price
      //   )
    }
  } catch (error) {
    console.error('Error creating appointment:', error)
  }
}


// Watcher for changes in the selected zip code
watch(SELECTED_ZIP_CODE, (newValue) => {
  // Reset the error flag on each new input
  ZIP_CODE_SELECTION_ERROR.value = false;

  // Only validate when we have a full 5-digit zip code
  if (newValue.length === 5) {
    // Check if any city in ZIP_CODES has this zip in its array
    const zipExists = ZIP_CODES.some(city => city.zip.includes(newValue));
    if (zipExists) {
      IS_ZIP_CODE_VALID.value = true;
    } else {
      ZIP_CODE_SELECTION_ERROR.value = true;
    }
  }
});

// Function to handle setting the service fee based on the selected zip code
const HANDLE_SERVICE_FEE = () => {
  if (!IS_ZIP_CODE_VALID.value) return;  // Do nothing if zip code is not valid

  // Find the city object whose zip array contains the selected zip code
  const city = ZIP_CODES.find(city => city.zip.includes(SELECTED_ZIP_CODE.value));
  if (city) {
    // Set service fee to the city's price and update the address zipcode
    SERVICE_FEE.value = city.price;
    address.value.zipcode = SELECTED_ZIP_CODE.value;
  } else {
    // Fallback (no city found for this zip)
    SERVICE_FEE.value = 0;
  }
  console.log(SERVICE_FEE.value);
};

const showCalendar = ref<boolean>(false);

const handleNextStep = () => {
  showCalendar.value = true;
}

const saveBookingState = () => {
  const bookingState = {
    selectedService: selectedService.value,
    serviceDetails: serviceDetails.value,
    showContactForm: showContactForm.value,
    selectedCar: selectedCar.value,
    address: address.value,
    phone: phone.value,
    date: DATE.value,
    selectedZipCode: SELECTED_ZIP_CODE.value,
    serviceFee: SERVICE_FEE.value
  };

  localStorage.setItem('bookingState', JSON.stringify(bookingState));
};

// Restore booking state after login redirect
const restoreBookingState = () => {
  const savedState = localStorage.getItem('bookingState');

  if (savedState) {
    try {
      const bookingState = JSON.parse(savedState);

      // Restore state values
      selectedService.value = bookingState.selectedService;
      serviceDetails.value = bookingState.serviceDetails;
      showContactForm.value = bookingState.showContactForm;
      selectedCar.value = bookingState.selectedCar;
      address.value = bookingState.address;
      phone.value = bookingState.phone;
      DATE.value = bookingState.date;
      SELECTED_ZIP_CODE.value = bookingState.selectedZipCode;
      SERVICE_FEE.value = bookingState.serviceFee;

      // Clear stored state after restoration
      localStorage.removeItem('bookingState');
    } catch (error) {
      console.error('Error restoring booking state:', error);
    }
  }
};

// Call this in onMounted hook
onMounted(() => {
  restoreBookingState();
});



</script>

<template>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8 ml-0 md:ml-8">
      <h1 class="text-2xl font-bold dark:text-white">Schedule Your Service</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Select a service to get started</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <div v-if="!SERVICE_FEE"
        class="rounded-lg border w-full md:w-2/3 lg:w-1/3 p-4 flex flex-col space-y-3 ml-0 md:ml-8">
        <div class="text-xl font-bold dark:text-white">
          Please select the Zip Code where you would like to be serviced.
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-sm text-gray-600 dark:text-gray-300">Zip code:</label>
          <input class="px-3 py-2 bg-transparent border rounded-lg dark:text-white focus:outline-none" :class="[
            ZIP_CODE_SELECTION_ERROR ? 'border-vivid-red' : 'border-gray-300'
          ]" v-model="SELECTED_ZIP_CODE" type="text" placeholder="e.g 60102">
        </div>
        <div class="min-h-6">
          <span v-if="ZIP_CODE_SELECTION_ERROR" class="text-vivid-red text-sm italic">
            Sorry, we don't provide services in your area.
          </span>
        </div>
        <div class="text-right mt-2">
          <button @click="HANDLE_SERVICE_FEE" class="bg-vivid-red px-4 py-2 rounded-lg font-medium" :class="[
            ZIP_CODE_SELECTION_ERROR
              ? 'cursor-not-allowed opacity-50 text-white/80'
              : 'text-white hover:bg-vivid-red/90 transition-colors'
          ]" :disabled="ZIP_CODE_SELECTION_ERROR">
            Continue
          </button>
        </div>
      </div>
      <!-- Left Column - Dynamic Content -->
      <div v-if="SERVICE_FEE && !showContactForm" class="lg:w-1/2 relative">
        <!-- Back button when showing details -->
        <button v-if="selectedService" @click="handleBack"
          class="mb-4 text-vivid-red hover:text-red-700 flex items-center gap-2">
          ← Start over
        </button>

        <!-- Wrap components in a div inside Transition -->
        <Transition name="fade" mode="out-in">
          <div :class="[serviceDetails ? 'hidden lg:flex' : 'flex']">
            <BookingServiceGrid v-if="!selectedService" :selected-service="selectedService"
              :query="$route.query.service" @service-selected="(n) => selectedService = n" />
            <BookingServiceDetail v-else :selected-service="selectedService" :service-fee="SERVICE_FEE"
              @ready-for-scheduling="handleServiceDetails" @next="handleNextStep" />
          </div>
        </Transition>
      </div>

      <!-- Right Column - Calendar -->
      <div v-if="!showContactForm" class="lg:w-1/2">
        <BookingCalendar v-if="serviceDetails" :selected-service="serviceDetails"
          @proceed-to-booking="(n) => handleBookingProceed(n)" />
      </div>
    </div>
    <button v-if="showSquareModal && !showConfirmation"
      @click="() => { showSquareModal = false; showContactForm = true }"
      class="mb-4 text-vivid-red hover:text-red-700 flex items-start justify-start text-left gap-2">
      ← Start over
    </button>
    <div v-if="showSquareModal && !showConfirmation" class="flex flex-col items-center justify-center z-50">

      <SquarePayment :price="serviceDetails.price" @payment="handleSubmitBooking" />
    </div>

    <!-- Contact/Location Form -->
    <div v-if="showContactForm && !showSquareModal" class="flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
        <h2 class="text-xl font-bold mb-6 dark:text-white">Complete Your Booking</h2>

        <!-- Vehicle Selection -->
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Select Vehicle
          </label>
          <div v-if="!isLoggedIn" class="text-gray-600">
            Please
            <NuxtLink @click="saveBookingState" :to="{ path: '/login', query: { redirect: $route.fullPath } }"
              class="text-vivid-red hover:underline">login</NuxtLink>
            to select your vehicle
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
          <button @click="showSquareModal = true" :disabled="!isFormValid"
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
