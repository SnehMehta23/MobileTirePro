<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import moment from "moment-timezone";
import { useQuoteStore } from "~/stores/store";


const $gtm = useGTM();

const serviceSelectionTracking = (servicesLink: string) => {
  $gtm.trackEvent({
    event: 'serviceSelection',
    servicesLink: servicesLink
  })
}


const store = useQuoteStore()
console.log(store.service)

onMounted(() => {
  if (store.date) {
    isQuoteSaved.value = true
  }
})

const saveQuote = () => {
  store.saveQuote(address, selectedService.value, TPMAmount.value, phone.value, selectedDate.value, price.value)
  navigateTo('/login')
}

const saveQuoteAndLeave = () => {
  store.saveQuote(address, selectedService.value, TPMAmount.value, phone.value, selectedDate.value, price.value)
  navigateTo('/login')
}

const fillQuote = () => {
  selectedDate.value = store.date
  selectedService.value = store.service
  TPMAmount.value = store.tpm
  phone.value = store.phone
  address.value = store.address
  price.value = store.price
  currentStep.value = 6
}

const isQuoteSaved = ref(false)
const date = ref('');
const selectedDate = ref('')
const selectedService = ref('')

const selectedRimSize = ref('')
const selectedTireCount = ref('')
const isCheckout = ref(false)
const price = ref('')
const showConfirmation = ref(false)
const TPMAmount = ref(0)
const showRimSizeTooltip = ref(false)
const discount = {
  active: false,
  until: '09/01/2024',
  amount: 0.25,
  services: [
    '2 Tire installation (12-18" Rims)',
    '2 Tire installation (19-22" Rims)',
    '4 Tire installation (12-18" Rims)',
    '4 Tire installation (19-22" Rims)'
  ]
};

let hideTooltipTimer = null;
const showTooltip = () => {
  clearTimeout(hideTooltipTimer);
  showRimSizeTooltip.value = true;
};
const startHideTooltip = () => {
  hideTooltipTimer = setTimeout(() => {
    showRimSizeTooltip.value = false;
  }, 300); // 300ms delay before hiding
};
const cancelHideTooltip = () => {
  clearTimeout(hideTooltipTimer);
};
const hideTooltip = () => {
  showRimSizeTooltip.value = false;
};

const isLoggedIn = ref(false)

const { data } = useLazyFetch('/api/auth/test', {
  onResponse({ response }) {
    response._data.token ? isLoggedIn.value = true : isLoggedIn.value = false
  }
})


const address = ref({
  street: '',
  city: '',
  zipcode: '',
  State: 'IL'
})
const phone = ref('')

const services = [
  { name: '1 Tire installation (12-18" Rims)', price: '50.00', time: '30', rimSize: [12, 18], tireCount: '1' },
  { name: '1 Tire installation (19-22" Rims)', price: '50.00', time: '30', rimSize: [19, 22], tireCount: '1' },
  { name: '2 Tire installation (12-18" Rims)', price: '80.00', time: '45-60', rimSize: [12, 18], tireCount: '2' },
  { name: '2 Tire installation (19-22" Rims)', price: '95.00', time: '60-75', rimSize: [19, 22], tireCount: '2' },
  { name: '3 Tire installation (12-18" Rims)', price: '125.00', time: '75-90', rimSize: [12, 18], tireCount: '3' },
  { name: '3 Tire installation (19-22" Rims)', price: '150.00', time: '60-75', rimSize: [19, 22], tireCount: '3' },
  { name: '4 Tire installation (12-18" Rims)', price: '150.00', time: '90-120', rimSize: [12, 18], tireCount: '4' },
  { name: '4 Tire installation (19-22" Rims)', price: '175.00', time: '90-120', rimSize: [19, 22], tireCount: '4' },
  { name: "Seasonal Changeover Tires Only", price: '200.00', descriptor: 'Storage included', time: '75-120' },
  { name: "Seasonal Changeover Tire & Wheel Assemblies", price: '100.00', descriptor: 'Storage included', time: '30-60' }
];

watch(date, async (newDate, oldDate) => {
  if (newDate) {
    selectedDate.value = ''
    selectedCar.value = ''
    selectedService.value = ''
    await check();
    // console.log(available.value)
  }
})

const selectedCar = ref('')
const { data: carData } = await useLazyFetch('/api/car/list', {
  method: 'GET',
  onResponse({ response }) {
    selectedCar.value = response._data[0]
  }
})

const { data: datesData, status: datesStatus } = await useLazyFetch('/api/apts/check', { ssr: false })
watch(datesData, (newDates) => {
  // console.log(newDates)
})

async function submitAppointment() {
  try {
    const data = await $fetch('/api/apts/create', {
      method: 'POST',
      body: {
        appointmentDate: selectedDate.value,
        carId: selectedCar.value,
        service: selectedService.value,
        address: `${address.street} ${address.city} ${address.State} ${address.zipcode}`,
        phone: phone.value
      }
    });
    if (await data == "OK") {
      showConfirmation.value = true;
    }
  } catch (e: any) {
    console.error(e.message);
  }
}

const filteredServices = computed(() => {
  return services.filter(service => {
    if (!service.rimSize) return false; // Skip services without rimSize
    const [minRim, maxRim] = service.rimSize;
    return selectedRimSize.value >= minRim && selectedRimSize.value <= maxRim &&
      service.tireCount === selectedTireCount.value;
  });
});


const computedPrice = computed(() => {
  let totalPrice = parseInt(price.value);

  if (TPMAmount.value) {
    totalPrice += TPMAmount.value * 45;
  }

  const today = new Date();
  const discountUntil = new Date(discount.until);

  if (discount.active && today <= discountUntil && discount.services.includes(selectedService.value)) {
    totalPrice *= (1 - discount.amount);
  }

  return totalPrice.toString();
});

const formatDate = (date: string) => {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm A')
}

const getServicePrice = (serviceName: string) => {
  const service = services.find(s => s.name === serviceName)
  return service ? service.price : '0.00'
}

const currentStep = ref(1)

const nextStep = () => {
  currentStep.value++;
}


</script>

<template>

  <div class="h-fit md:h-full w-full flex justify-center items-center md:mt-20 mb-8">
    <div class="dark:bg-gray-900/10 bg-gray-400/10  rounded md:w-2/3 lg:w-1/3 px-1 py-4">
      <div class="flex justify-center items-center flex-col gap-3 w-full">
        <div @click="fillQuote" v-if="isQuoteSaved"
          class="w-full bg-vivid-red cursor-pointer text-white rounded p-2 text-md flex justify-center items-center mb-2">
          Want to
          use your saved Quote?
        </div>
        <!-- Rim Size and Tire Count Selection -->
        <div v-if="currentStep === 1" class="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Select your rim size and the
            amount of tire you need replaced
          </h2>

          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="rimSize">
              Rim Size
              <span class="ml-2 text-blue-500 cursor-pointer relative inline-block hover:underline"
                @mouseenter="showTooltip" @mouseleave="startHideTooltip">
                Don't know your rim size?
                <div v-if="showRimSizeTooltip" @mouseenter="cancelHideTooltip" @mouseleave="hideTooltip"
                  class="absolute z-10 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-64 text-sm bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                  <div class="relative">
                    <a href="#" class="text-blue-500 hover:underline">Tire size can be found in two places: on the door
                      placard
                      inside the driver's door or directly on the tire (e.g., 205/55/R16).</a>
                    <div
                      class="absolute w-3 h-3 bg-white dark:bg-gray-700 transform rotate-45 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <select v-model="selectedRimSize"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="" disabled selected>Select rim size</option>
              <option value="12">12 inches</option>
              <option value="13">13 inches</option>
              <option value="14">14 inches</option>
              <option value="15">15 inches</option>
              <option value="16">16 inches</option>
              <option value="17">17 inches</option>
              <option value="18">18 inches</option>
              <option value="19">19 inches</option>
              <option value="20">20 inches</option>
              <option value="21">21 inches</option>
              <option value="22">22 inches</option>

            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="tireCount">
              Number of Tires
            </label>
            <select v-model="selectedTireCount"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="" disabled selected>Select number of tires</option>
              <option value="1">1 Tire</option>
              <option value="2">2 Tires</option>
              <option value="3">3 Tires</option>
              <option value="4">4 Tires</option>
            </select>
          </div>
          <!-- Service Selection -->
          <div v-if="selectedTireCount && selectedRimSize"
            class="flex flex-col justify-center items-center w-full gap-3">
            <div class="dark:text-white text-2xl font-bold">Your Service Option</div>
            <div v-for="service in filteredServices" :key="service.name"
              @click="() => { selectedService = service.name; price = service.price; serviceSelectionTracking(service.name); nextStep() }"
              class="border border-blue-500 hover:bg-gray-300 cursor-pointer rounded md:w-3/3 text-white text-center flex w-full justify-between gap-2 items-center hover:shadow-md">
              <div class="px-2 py-3 max-h-full bg-blue-500 ">
                <div>{{ service.time }}</div>
                <div>Mins</div>
              </div>
              <div class="dark:text-white text-black">
                {{ service.name }}
                <div class="text-sm">{{ service.descriptor }}</div>
              </div>
              <div class="px-2 py-3 dark:text-blue-300/70 text-gray-600 dark:text-sm">${{ service.price }}</div>
            </div>
          </div>
        </div>
        <div v-if="datesStatus === 'pending' && currentStep === 2"> Loading...</div>

        <!-- Date Selection -->
        <div class="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          v-if="datesStatus === 'success' && currentStep === 2">

          <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Choose a date</h2>
          <div class="space-y-6">
            <template v-for="([key, value], index) in Object.entries(datesData)" :key="key">
              <div v-if="datesData[key].length !== 0"
                class="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <h3 class="text-lg font-semibold text-vivid-red mb-3">
                  {{ moment(key, 'MM-DD-YYYY').format('dddd, MMMM Do YYYY') }}
                </h3>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button v-for="x in datesData[key]" :key="x" @click="() => { selectedDate = x; nextStep() }"
                    class="text-sm text-white rounded-md text-center px-2 py-2 hover:bg-red-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                    {{ moment(x).format('h:mm A') }}
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>


        <div v-if="currentStep === 3">
          <div class="my-3 p-4 rounded dark:text-white space-y-4 ">
            <div class="dark:text-white px-4 space-y-4 mb-4 ">
              <div>
                If your vehicle is <span class="text-vivid-red">7 years or older</span>, it's recommended to replace
                your TPMS sensors.
              </div>
              <div>
                Would you like to have
                them replaced with your service?
              </div>
            </div>
            <div class="flex justify-center items-center gap-4">
              <input v-model="TPMAmount" type="range" min="0" max="4">
              <span>Quantity: {{ TPMAmount }}</span>
              <span>${{ TPMAmount * 45 }}.00</span>
            </div>
            <button @click.prevent="nextStep" class="bg-vivid-red"> Continue</button>
          </div>
        </div>

        <!-- Car Selection and Additional Info -->
        <div class="w-full flex flex-col justify-center items-center bg-gray-900 p-4 rounded " v-if="currentStep === 4">
          <div>
            <select class="px-3 py-2 rounded md:w-[15rem]" v-if="carData" v-model="selectedCar">
              <option value="" disabled selected>Select a Vehicle</option>
              <option v-for="cars in carData" :value="cars">{{ cars.year }} {{ cars.make }} {{ cars.model }}</option>
            </select>
          </div>
          <div class="flex flex-col justify-start items-start w-full dark:text-white gap-2 px-4">
            <div class="flex-col flex gap-1 w-full">
              <label for="">Street Address:</label>
              <input v-model="address.street"
                class="px-2 py-1 rounded text-black bg-red-50 shadow-sm border border-gray-900" type="text">
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">City:</label>
              <input v-model="address.city"
                class="px-2 py-1 rounded text-black bg-red-50 shadow-sm border border-gray-900" type="text">
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">State:</label>
              <select class="px-2 py-1 rounded text-black">
                <option selected disabled>Illinois</option>
              </select>
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">Zip code: </label>
              <input v-model="address.zipcode"
                class="px-2 py-1 rounded text-black bg-red-50 shadow-sm border border-gray-900" type="text">
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">Contact phone: </label>
              <input v-model="phone" class="px-2 py-1 rounded text-black bg-red-50 shadow-sm border border-gray-900"
                type="text">
            </div>
            <div class="w-full flex gap-5 ">
              <button @click="selectedService = ''; selectedRimSize = ''; selectedTireCount = '';">Return</button>
              <button v-if="address.zipcode && address.city && address.street && address.zipcode"
                @click="nextStep">Proceed to
                checkout
              </button>
            </div>
          </div>
        </div>
        <div v-if="currentStep === 5" class="dark:text-white flex justify-start items-middle flex-col w-full gap-2">
          <h2 class="text-2xl font-bold mb-2 text-center">Order Summary</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="mb-4">
              <span class="font-bold">Date:</span> {{ formatDate(selectedDate) }}
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="font-bold">Selected Service:</span>
              <span>{{ selectedService }} - ${{ getServicePrice(selectedService) }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="font-bold">TPMS sensors:</span>
              <span>{{ TPMAmount }} x $45 = ${{ TPMAmount * 45 }}</span>
            </div>
            <div class="mb-4 flex justify-start items-center gap-4">
              <span class="font-bold">Car:</span>
              <div>
                <select class="bg-vivid-red px-3 py-2 rounded md:w-[15rem] font-bold" v-if="carData"
                  v-model="selectedCar">
                  <option :value="selectedCar">{{ selectedCar.year }} {{ selectedCar.make }} {{ selectedCar.model }}
                  </option>
                  <template v-for="cars in carData">
                    <option v-if="carData[0]._id !== cars._id" :value="cars">{{ cars.year }} {{ cars.make }}
                      {{ cars.model }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <div class="mb-4">
              <span class="font-bold">Service Address:</span> {{ address.street }}, {{ address.city }}, {{
                address.State
              }} {{
                address.zipcode
              }}
            </div>
            <hr class="my-4 border-gray-300 dark:border-gray-600" />
            <div v-if="discount.active" class="text-xl font-bold flex justify-between items-center">
              <span>Discount applied: {{ discount.amount * 100 }}%</span>
              <span>-${{ (price * discount.amount) }}</span>
            </div>
            <div class="text-xl font-bold flex justify-between items-center">
              <span>Total:</span>
              <span>${{ computedPrice }}</span>
            </div>
          </div>
          <div v-if="!isLoggedIn" class="w-full cursor-pointer flex flex-col justify-center items-center gap-2">
            <div class="w-full">
              <button @click="saveQuote">
                Login / Sign Up to continue with this quote
              </button>
            </div>
            <div class="cursor-pointer w-full">
              <button @click="saveQuoteAndLeave">Save Quote</button>
            </div>
          </div>
          <SquarePayment v-if="isLoggedIn" :price="computedPrice" @payment="submitAppointment" />
        </div>
      </div>
      <div v-if="showConfirmation" class="flex flex-col justify-center items-center gap-4">
        <div class="dark:text-white text-2xl">
          Appointment booked!
        </div>
        <NuxtLink to="/">
          <div class="cursor-pointer">
            <div class="bg-vivid-red px-3 py-3 rounded text-white hover:bg-red-700"> Return Home</div>
          </div>
        </NuxtLink>
        <p class="text-gray-400 text-sm">Please be advised that our service is weather based. We cannot work in
          heavy rain, heavy snow fall, or in temperatures under 20 degrees.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  color: #ffffff;
  background-color: #006aff;
  border-radius: 6px;
  cursor: pointer;
  border-style: none;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 16px;
  width: 100%;
}

button:hover {
  background-color: #005fe5;
}

button:active {
  background-color: #0055cc;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}

#payment-status-container {
  width: fit-content;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #1a1a1a;
  display: flex;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 36px;
}
</style>
