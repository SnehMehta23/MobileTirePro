<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from "moment-timezone";
import {format, parse, parseISO} from "date-fns";

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


const route = useRoute();

const address = reactive({
  street: '',
  city: '',
  zipcode: '',
  State: 'IL'
})
const phone = ref('')

const services = [{ name: '2 Tire installation (Large SUV/Truck/EV)', price: '95.00' },
{ name: '2 Tire installation (Sedan/Coupe/Small SUV)', price: '80.00' },
{ name: '4 Tire installation (Large SUV/Truck/EV)', price: '175.00' },
{ name: "4 Tire installation (Sedan/Coupe/Small SUV)", price: '150.00' },
{ name: "Seasonal Changeover (Tires Only)", price: '200.00', descriptor: 'Storage included' },
{ name: "Seasonal Changeover (Tire & Wheel Assemblies)", price: '100.00', descriptor: 'Storage included' }]


watch(date, async (newDate, oldDate) => {
  if (newDate) {
    selectedDate.value = ''
    selectedCar.value = ''
    selectedService.value = ''
    await check();
    console.log(available.value)
  }

})

const { data: carData } = await useLazyFetch('/api/car/list', {
  method: 'GET'
})

if (carData) {

}

const { data: datesData, status: datesStatus } = await useLazyFetch('/api/apts/check', { ssr: false })
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

function setTimeOnDate(date: Date, timeString: string) {
  // Create a new Date object based on the original date to avoid mutating it
  let newDate = new Date(date);

  // Extract hour and meridian (AM/PM) from the time string
  let timeParts = timeString.match(/(\d+)(AM|PM)/i);
  if (!timeParts) {
    throw new Error("Invalid time string format");
  }

  let hour = parseInt(timeParts[1]);
  let meridian = timeParts[2].toUpperCase();

  // Adjust the hour based on AM/PM
  if (meridian === "PM" && hour < 12) {
    hour += 12;
  }
  if (meridian === "AM" && hour === 12) {
    hour = 0;
  }

  // Set hours, minutes, seconds, and milliseconds to the new Date object
  newDate.setHours(hour, 0, 0, 0);

  // Convert the new date to CST and return the ISO string
  const cstDate = moment.tz(newDate, 'America/Chicago');
  return cstDate.toISOString();
}

// async function callValidateAddress() {
//   // Construct request
//   const request = {
//     address: {
//       regionCode: 'US',
//       addressLines: [`${address.street}`, `${address.city} ${address.State} ${address.zipcode}`],
//     },
//   };
//
//   // Run request
//   const response = await addressValidationClient.validateAddress(request);
//   console.log(response);
// }

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
  if (TPMAmount.value) {
    return price.value = (parseInt(price.value) + (TPMAmount.value * 45)).toString();
  } else {
    return price.value
  }
})


</script>

<template>
    <div class="h-fit md:h-full w-full flex justify-center items-center md:mt-20">
      <div class="border-vivid-red bg-gray-900/10 md:border-2 rounded md:w-2/3 lg:w-1/3 px-4 py-4">
        <div class="flex justify-center items-center flex-col gap-3 w-full">
          <div v-if="datesStatus === 'pending'"> Loading...</div>
          <div class="w-full p-2" v-else-if="datesStatus === 'success' && !selectedDate">
            <div class="dark:text-white text-center mb-2">Choose a date</div>
            <div class="flex flex-col justify-center items-center gap-4">
              <template v-for="([key, value], index) in Object.entries(datesData)">
                <div v-if="datesData[key].length !== 0" class="text-vivid-red text-xl">
                  {{ moment(key).format('dddd, MMMM Do YYYY') }}
                  <hr />
                  <div class="grid grid-cols-3 mt-4 gap-2">
                    <div @click="selectedDate = x"
                         class="text-sm bg-vivid-red/80 font-light text-white rounded-md text-center px-2 py-4 hover:bg-red-900 cursor-pointer"
                         v-for="x in datesData[key]">
                      {{ moment(x).format('h:mm A') }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div v-if="!selectedService && selectedDate" class="flex flex-col justify-center items-center w-full gap-3">
            <div class="dark:text-white text-xl">Services</div>
            <template v-for="service in filteredServices">
              <div @click="() => {
              selectedService = service.name
              price = service.price
            }" class="bg-vivid-red hover:bg-red-900 px-4 py-2 rounded w-3/4 md:w-2/3 text-white text-center"> {{
                  service.name }}
                {{ service.price }} {{ service.descriptor }}
              </div>
            </template>

          </div>
          <div class="w-full flex flex-col justify-center items-center" v-if="selectedService && !isCheckout">
            <div>
              <select class="px-3 py-2 rounded md:w-[15rem]" v-if="carData" v-model="selectedCar">
                <option value="" disabled selected>Select a Vehicle</option>
                <option v-for="cars in carData" :value="cars">{{ cars.year }} {{ cars.make }} {{
                    cars.model
                  }}
                </option>
              </select>
            </div>
            <div class="my-3 dark:text-white">
              <div class="dark:text-white px-4">
                Do you need a TPM sensor installation? We recommend changing all of them at once.
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
          <div v-if="isCheckout" class="dark:text-white flex justify-start items-middle flex-col text-xl w-full gap-2">
            <div>
              <span class="font-bold">Date:</span> {{ moment(selectedDate).format('dddd, MMMM Do YYYY, h:mm A') }}
            </div>
            <div>
              <span class="font-bold">Selected Service:</span> {{ selectedService }}
            </div>
            <div>
              <span class="font-bold">TPM installation:</span> {{ TPMAmount }}
            </div>
            <div>
              <span class="font-bold">Car:</span> {{ selectedCar.year }} {{ selectedCar.make }} {{ selectedCar.model }}
            </div>
            <div>
              <span class="font-bold">Service Address:</span> {{ address.street }} {{ address.city }} {{ address.State }}
              {{ address.zipcode }}
            </div>
            <SquarePayment :price="computedPrice" @payment="submitAppointment" />
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
            heavy rain,
            heavy
            snow
            fall, or in
            temperatures under 20 degrees.</p>
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