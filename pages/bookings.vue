<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import moment from "moment-timezone";
definePageMeta({
  middleware: 'auth'
})

const date = ref('');
const available = ref('')
const selectedDate = ref('')
const selectedService = ref('')
const selectedCar = ref('')
const isCheckout = ref(false)
const isLoading = ref(false)
const price = ref('')
const showConfirmation = ref(false)
const TPMAmount = ref(0)
const discount = {
  active: true,
  until: '09/01/2024',
  amount: 0.25,
  services: ['2 Tire installation (Large SUV/Truck/EV)', '2 Tire installation (Sedan/Coupe/Small SUV)', '4 Tire installation (Large SUV/Truck/EV)', "4 Tire installation (Sedan/Coupe/Small SUV)"]
};

const route = useRoute();

const address = reactive({
  street: '',
  city: '',
  zipcode: '',
  State: 'IL'
})
const phone = ref('')

const services = [
  {name: '2 Tire installation (Large SUV/Truck/EV)', price: '95.00', time: '60 mins'},
  {name: '2 Tire installation (Sedan/Coupe/Small SUV)', price: '80.00', time: '60 mins'},
  {name: '4 Tire installation (Large SUV/Truck/EV)', price: '175.00', time: '90 mins'},
  {name: "4 Tire installation (Sedan/Coupe/Small SUV)", price: '150.00', time: '90 mins'},
  {name: "Seasonal Changeover Tires Only", price: '200.00', descriptor: 'Storage included', time: '90 mins'},
  {
    name: "Seasonal Changeover Tire & Wheel Assemblies",
    price: '100.00',
    descriptor: 'Storage included',
    time: '90 mins'
  }
]

watch(date, async (newDate, oldDate) => {
  if (newDate) {
    selectedDate.value = ''
    selectedCar.value = ''
    selectedService.value = ''
    await check();
    console.log(available.value)
  }
})

const {data: carData} = await useLazyFetch('/api/car/list', {
  method: 'GET'
})

const {data: datesData, status: datesStatus} = await useLazyFetch('/api/apts/check', {ssr: false})
watch(datesData, (newDates) => {
  console.log(newDates)
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
  if (route.query.car) {
    return services.filter(service =>
        service.name.toLowerCase().includes(route.query.car.toLowerCase())
    );
  } else {
    return services;
  }
})

const computedPrice = computed(() => {
  let totalPrice = parseInt(price.value);

  // If TPMAmount is defined, add the additional cost to the total price
  if (TPMAmount.value) {
    totalPrice += TPMAmount.value * 45;
  }

  // Check if the discount is active and the selected service is eligible
  const today = new Date();
  const discountUntil = new Date(discount.until);

  if (discount.active && today <= discountUntil && discount.services.includes(selectedService.value)) {
    totalPrice *= (1 - discount.amount);  // Apply the discount
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
</script>

<template>
  <div class="h-fit md:h-full w-full flex justify-center items-center md:mt-20">
    <div class="border-blue-500 dark:bg-gray-900/10 bg-gray-400/10 md:border-2 rounded md:w-2/3 lg:w-1/3 px-4 py-4">
      <div class="flex justify-center items-center flex-col gap-3 w-full">
        <div v-if="datesStatus === 'pending'"> Loading...</div>
        <div class="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
             v-if="datesStatus === 'success' && !selectedDate">
          <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Choose a date</h2>
          <div class="space-y-6">
            <template v-for="([key, value], index) in Object.entries(datesData)" :key="key">
              <div v-if="datesData[key].length !== 0"
                   class="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <h3 class="text-lg font-semibold text-vivid-red mb-3">
                  {{ moment(key, 'MM-DD-YYYY').format('dddd, MMMM Do YYYY') }}
                </h3>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button v-for="x in datesData[key]" :key="x" @click="selectedDate = x"
                          class="text-sm text-white rounded-md text-center px-2 py-2 hover:bg-red-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                    {{ moment(x).format('h:mm A') }}
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-if="!selectedService && selectedDate" class="flex flex-col justify-center items-center w-full gap-3">
          <div class="dark:text-white text-xl">Services</div>

          <!-- Section Titles -->
          <template v-for="serviceType in ['Large SUV/Truck/EV', 'Sedan/Coupe/Small SUV','Seasonal Changeover']">
            <div
                :class="['dark:text-white text-lg text-left w-full font-bold', {'mt-4': serviceType !== 'Large SUV / Truck / EV'}]">
              {{ serviceType }}
            </div>

            <!-- Services List -->
            <template v-for="service in filteredServices" :key="service.name">
              <div v-if="service.name.includes(serviceType.split(' ')[0])"
                   @click="() => { selectedService = service.name; price = service.price }"
                   class="border border-blue-500 hover:bg-gray-300 cursor-pointer rounded md:w-2/3 text-white text-center flex w-full justify-between gap-2 items-center hover:shadow-md">
                <div class="px-2 py-3 max-h-full bg-blue-500 ">{{ service.time }}</div>
                <div class="dark:text-white text-black">
                  {{ service.name.replace(`(${serviceType})`, '').replace('Seasonal Changeover ', '') }}
                  <div class="text-sm">{{ service.descriptor }}</div>
                </div>
                <div class="px-2 py-3 dark:text-blue-300/70 text-gray-600 dark:text-sm">${{ service.price }}</div>
              </div>
            </template>
          </template>


        </div>
        <div class="w-full flex flex-col justify-center items-center" v-if="selectedService && !isCheckout">
          <div>
            <select class="px-3 py-2 rounded md:w-[15rem]" v-if="carData" v-model="selectedCar">
              <option value="" disabled selected>Select a Vehicle</option>
              <option v-for="cars in carData" :value="cars">{{ cars.year }} {{ cars.make }} {{ cars.model }}</option>
            </select>
          </div>
          <div class="my-3 dark:text-white">
            <div class="dark:text-white px-4">
              If your vehicle is 7 years or older, it's recommended to replace your TPMS sensors. Would you like to have
              them replaced with your service?
            </div>
            <div class="flex justify-center items-center gap-4">
              <input v-model="TPMAmount" type="range" min="0" max="4">
              <span>Quantity: {{ TPMAmount }}</span>
              <span>${{ TPMAmount * 45 }}.00</span>
            </div>
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
              <button>Return</button>
              <button v-if="address.zipcode && address.city && address.street && address.zipcode && selectedCar"
                      @click="isCheckout = true">Proceed to checkout
              </button>
            </div>
          </div>
        </div>
        <div v-if="isCheckout" class="dark:text-white flex justify-start items-middle flex-col w-full gap-2">
          <h2 class="text-2xl font-bold mb-4 text-center">Order Summary</h2>
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
            <div class="mb-4">
              <span class="font-bold">Car:</span> {{ selectedCar.year }} {{ selectedCar.make }} {{ selectedCar.model }}
            </div>
            <div class="mb-4">
              <span class="font-bold">Service Address:</span> {{ address.street }}, {{ address.city }}, {{
                address.State
              }} {{
                address.zipcode
              }}
            </div>
            <hr class="my-4 border-gray-300 dark:border-gray-600"/>
            <div v-if="discount.active" class="text-xl font-bold flex justify-between items-center">
              <span>Discount applied: {{ discount.amount * 100 }}%</span>
              <span>-${{ (price * discount.amount) }}</span>
            </div>
            <div class="text-xl font-bold flex justify-between items-center">
              <span>Total:</span>
              <span>${{ computedPrice }}</span>
            </div>
          </div>
          <SquarePayment :price="computedPrice" @payment="submitAppointment"/>
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