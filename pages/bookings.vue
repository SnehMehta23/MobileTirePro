<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const date = ref('');
const available = ref('')
const selectedDate = ref('')
const selectedService = ref('')
const selectedCar = ref('')
const isCheckout = ref(false)
const isLoading = ref(false)
const price = ref('')
const showConfirmation = ref(false)

const address = reactive({
  street: '',
  city: '',
  zipcode: '',
  State: 'IL'
})

const services = [{ name: '2 Tire installation (Large SUV/Truck/EV)', price: '95.00' },
{ name: '2 Tire installation (Sedan/Coupe/Small SUV)', price: '80.00' },
{ name: '4 Tire installation (Large SUV/Truck/EV)', price: '175.00' },
{ name: "4 Tire installation (Sedan/Coupe/Small SUV)", price: '150.00' },
{ name: "Seasonal Changeover (Tires Only)", price: '$200.00', descriptor: 'Storage included for both' },
{ name: "Seasonal Changeover (Tire & Wheel Assemblies)", price: '$100.00', descriptor: 'Storage included for both' }]


watch(date, async (newDate, oldDate) => {
  if (newDate) {
    selectedDate.value = ''
    selectedCar.value = ''
    selectedService.value = ''
    await check();
    console.log(available.value)
  }

})

const { data: carData, refresh } = await useFetch('/api/car/list', {
  method: 'GET'
})

if (carData) {

}


async function check() {
  const data: any = await $fetch('/api/apts/check', {
    method: 'POST',
    body: {
      day: date.value
    }
  })
  available.value = data
}

async function submitAppointment() {
  try {
    const data = $fetch('/api/apts/create', {
      method: 'POST',
      body: {
        appointmentDate: setTimeOnDate(date.value, selectedDate.value),
        carId: selectedCar.value,
        service: selectedService.value,
        address: `${address.street} ${address.city} ${address.State} ${address.zipcode}`
      }
    })
    if (await data == "OK") {
      showConfirmation.value = true
    }
  } catch (e: any) {
    console.error(e.message)
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

  // Return the new date object in ISO format
  return newDate.toISOString();
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


</script>

<template>
  <div class="h-full w-full flex justify-center items-center mt-20">
    <div class="border-vivid-red border rounded w-1/3 px-4 py-4">
      <div v-if="!showConfirmation" class=" flex justify-center items-center flex-col gap-3">
        <div v-if="!selectedDate">
          <div class="dark:text-white text-center mb-2">Choose a date</div>
          <VueDatePicker v-model="date" />
          <div v-if="available" class="dark:text-white">Available times
          </div>
          <div class="grid grid-cols-4 gap-2" v-if="available">
            <template v-for="([key, value], index) in Object.entries(available.data)" :key="index">
              <div @click="selectedDate = key" v-if="value"
                :class="['bg-vivid-red px-3 py-2 text-white rounded cursor-pointer hover:bg-red-700', { ['bg-red-700']: selectedDate == key }]">
                {{ key }}
              </div>
            </template>
          </div>
        </div>
        <div v-if="!selectedService && selectedDate" class="flex flex-col justify-center items-center w-full gap-3">
          <div class="dark:text-white">Services</div>
          <div @click="() => {
            selectedService = service.name
            price = service.price
          }" class="bg-vivid-red hover:bg-red-900 px-4 py-2 rounded w-2/3 dark:text-white text-center"
            v-for="service in services">{{ service.name }} {{ service.price }} {{ service.descriptor }}
          </div>
        </div>
        <div class="w-full flex flex-col justify-center items-center" v-if="selectedService && !isCheckout">
          <div>
            <select class="px-3 py-2 rounded w-[15rem]" v-if="carData" v-model="selectedCar">
              <option value="" disabled selected>Select a Vehicle</option>
              <option v-for="cars in carData" :value="cars">{{ cars.year }} {{ cars.make }} {{
                cars.model
                }}
              </option>
            </select>
          </div>
          <div class="flex flex-col justify-start items-start w-full dark:text-white gap-2">
            <div class="flex-col flex gap-1 w-full">
              <label for="">Street Address:</label>
              <input v-model="address.street" class="px-2 py-1 rounded text-black" type="text">
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">City:</label>
              <input v-model="address.city" class="px-2 py-1 rounded text-black" type="text">
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">State:</label>
              <select class="px-2 py-1 rounded text-black">
                <option selected disabled>Illinois</option>
              </select>
            </div>
            <div class="flex-col flex gap-1 w-full">
              <label for="">Zip code: </label>
              <input v-model="address.zipcode" class="px-2 py-1 rounded text-black" type="text">
            </div>
            <div class="w-full flex gap-5 ">
              <button>Return</button>
              <button v-if="address.zipcode && address.city && address.street && address.zipcode && selectedCar"
                @click="isCheckout = true">Proceed to checkout
              </button>
            </div>
          </div>
        </div>
        <div v-if="isCheckout" class="dark:text-white flex justify-start items-middle flex-col text-xl w-full">
          <div>
            Date: {{ date }}{{ selectedDate }}
          </div>
          <div>
            Selected Service: {{ selectedService }}
          </div>
          <div>
            Car: {{ selectedCar.year }} {{ selectedCar.make }} {{ selectedCar.model }}
          </div>
          <div>
            Service Address: {{ address.street }} {{ address.city }} {{ address.State }} {{ address.zipcode }}
          </div>
          <SquarePayment :price="price" @payment="submitAppointment" />
        </div>
      </div>
      <div v-if="showConfirmation" class="flex flex-col justify-center items-center gap-4">
        <div class="dark:text-white text-2xl">
          Appointment booked!
        </div>
        <NuxtLink to="/profile">
          <div class="cursor-pointer">
            <div class="bg-vivid-red px-3 py-3 rounded text-white hover:bg-red-700"> Return to your profile</div>
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
  <!--  <section class="w-full h-full flex justify-center items-center">-->
  <!--    <div class="w-1/4 flex justify-center items-center border-vivid-red border rounded px-5 py-5">-->
  <!--      <div class="flex w-3/4 flex-col justify-center items-center gap-3">-->
  <!--        <VueDatePicker v-model="date"/>-->


  <!--        <div class="dark:text-white">-->
  <!--          {{date}}-->
  <!--          <div v-if="available" class="dark:text-white">Available times</div>-->
  <!--          <div class="grid grid-cols-4 gap-2" v-if="available">-->
  <!--            <template v-for="([key, value], index) in Object.entries(available.data)" :key="index">-->
  <!--              <div @click="selectedDate = key" v-if="value"-->
  <!--                   :class="['bg-vivid-red px-3 py-2 text-white rounded cursor-pointer hover:bg-red-700', {['bg-red-700'] : selectedDate == key}]">-->
  <!--                {{ key }}-->
  <!--              </div>-->
  <!--            </template>-->
  <!--          </div>-->
  <!--        </div>-->

  <!--        <div v-if="selectedDate" class="flex flex-col gap-3 justify-center items-center">-->
  <!--          <div class="dark:text-white">{{date}} {{selectedDate}}</div>-->
  <!--          <div class="dark:text-white">Services</div>-->
  <!--          <div @click="selectedService = service"-->
  <!--               :class="['bg-vivid-red px-3 py-1 text-white rounded cursor-pointer hover:bg-red-700', {['bg-red-700'] : selectedService == service}]"-->
  <!--               v-for="service in services">{{ service }}-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div v-if="selectedService">-->
  <!--          <select class="px-3 py-2 rounded w-[15rem]" v-if="carData" v-model="selectedCar">-->
  <!--            <option value="" disabled selected>Select a Vehicle</option>-->
  <!--            <option v-for="cars in carData" :value="cars._id">{{ cars.year }} {{ cars.make }} {{ cars.model }}</option>-->
  <!--          </select>-->
  <!--        </div>-->
  <!--        <div v-if="selectedService" class="flex flex-col justify-start items-start w-full dark:text-white gap-2">-->
  <!--          <div class="flex-col flex gap-1 w-full">-->
  <!--            <label for="">Street Address:</label>-->
  <!--            <input v-model="address.street" class="px-2 py-1 rounded text-black" type="text">-->
  <!--          </div>-->
  <!--          <div class="flex-col flex gap-1 w-full">-->
  <!--            <label for="">City:</label>-->
  <!--            <input v-model="address.city" class="px-2 py-1 rounded text-black" type="text">-->
  <!--          </div>-->
  <!--          <div class="flex-col flex gap-1 w-full">-->
  <!--            <label for="">State:</label>-->
  <!--            <select class="px-2 py-1 rounded text-black">-->
  <!--              <option selected disabled>Illinois</option>-->
  <!--            </select>-->
  <!--          </div>-->
  <!--          <div class="flex-col flex gap-1 w-full">-->
  <!--            <label for="">Zipcode</label>-->
  <!--            <input v-model="address.zipcode" class="px-2 py-1 rounded text-black" type="text">-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <button v-if="selectedDate && selectedService && selectedCar !== '' && address.zipcode"-->
  <!--                class="flex justify-center items-center bg-vivid-red text-white px-4 py-2 rounded hover:bg-red-600"-->
  <!--                @click="submitAppointment">-->
  <!--          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"-->
  <!--               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">-->
  <!--            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
  <!--            <path class="opacity-75" fill="currentColor"-->
  <!--                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">-->
  <!--            </path>-->
  <!--          </svg>-->
  <!--          <span>{{ isLoading ? "Please wait" : "Proceed" }}</span>-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </section>-->

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