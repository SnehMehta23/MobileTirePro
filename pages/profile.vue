<template>
  <div v-if="status === 'pending'">
    Loading...
  </div>
  <div v-else>
    <div class="flex justify-center gap-20 mt-8 dark:text-white text-dark-charcoal">
      <!-- Main Profile Widget -->
      <section class="p-4 w-5/6  md:w-2/3">
        <div class="p-4 dark:bg-[#1e1f26] bg-pale-gray rounded-lg shadow-md">

          <!-- Profile Picture and Vehicle Tags -->
          <div class="flex justify-start items-center mb-4 w-full">
            <div class="hidden md:flex relative rounded-full overflow-hidden w-12 h-12 border-2 border-vivid-red mr-4">
              <img class="absolute inset-0 w-full h-full object-cover"
                   :src="user.picture ? user.picture : 'https://placeholder.com/64x64'" alt="Profile Picture">
            </div>
            <div class="space-x-2 flex flex-col md:flex-row justify-center items-center gap-2 w-full">
              <select
                  class="text-center dark:bg-gray-900 dark:border dark:border-gray-950 text-black dark:text-white px-2 py-1 rounded-md bg-gray-00 hover:bg-red-100"
                  v-model="selectedCar"
                  name="cars">
                <option class="" :value="carData[index]" v-for="(data, index) in carData">{{ data?.model }} {{
                    data?.year
                  }}
                </option>
              </select>
              <div class="w-full md:flex md:space-x-2 flex-col md:flex-row">
                <span class="hidden md:flex bg-pale-red dark:bg-red-800 px-2 py-1 rounded">{{
                    selectedCar?.year
                  }}</span>
                <span class="hidden md:flex bg-pale-red dark:bg-red-800 px-2 py-1 rounded">{{
                    selectedCar?.make
                  }}</span>
                <span class="hidden md:flex bg-pale-red dark:bg-red-800 px-2 py-1 rounded">{{
                    selectedCar?.model
                  }}</span>
                <button @click="isOpen = true"
                        class="px-1 py-1 bg-vivid-red dark:bg-gray-900 dark:border dark:border-gray-950 rounded-md text-white hover:bg-red-400 md:w-auto w-full">
                  +
                  Add
                  New Car
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-start items-center space-x-3.5">
            <h3 class="text-xl font-semibold mb-4">{{ user.name }}</h3>
            <div class="text-md text-slate-500 font-light italic font-semibold dark:text-gray-300 mb-4">
              {{ "(" + user.email + ")" }}
            </div>
          </div>

          <!-- History of Service -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-2">Vehicle Service History</h3>
            <div
                class="hidden md:flex space-x-4 mb-4 p-2 bg-light-gray dark:bg-gray-900/80 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md border border-cool-gray-light dark:border-gray-950">
            <span v-for="content in tabNavContent" :key="content" @click="activeTab = content"
                  class="cursor-pointer transition duration-300"
                  :class="{ 'text-vivid-red font-semibold': activeTab === content, 'hover:text-crimson-red': activeTab !== content }">
              {{ content }}
            </span>
            </div>
            <select
                class="md:hidden w-full text-center py-2 rounded bg-red-200 dark:bg-gray-900 dark:border dark:border-vivid-red"
                v-model="activeTab">
              <option :value="content" v-for="content in tabNavContent">{{ content }}</option>
            </select>
            <div>
              <UserApts v-if="activeTab == 'Appointments'" :car="selectedCar._id"/>
              <!-- Placeholder for tab content -->
              <!--            <p>{{ activeTab }}</p>-->
            </div>
          </div>

          <!-- Tire Info Section -->
          <div v-if="carStatus === 'pending'">Loading</div>
          <section v-else>
            <h3 class="text-lg font-semibold mb-4">Tire Information</h3>
            <div v-if="selectedCar" class="grid grid-cols-2 gap-4">
              <div class="border p-2 flex flex-col rounded shadow-sm dark:bg-gray-900 dark:border-gray-950">
                <h6 class="font-semibold">Front Left</h6>
                <span>{{ selectedCar?.tires[0].pressure }} PSI</span>
                <span>{{ selectedCar?.tires[0].type }}</span>
                <span>{{ selectedCar?.tires[0].size }}</span>
              </div>
              <div class="border p-2 flex flex-col rounded shadow-sm dark:bg-gray-900 dark:border-gray-950">
                <h6 class="font-semibold">Front Right</h6>
                <span>{{ selectedCar?.tires[2].pressure }} PSI</span>
                <span>{{ selectedCar?.tires[2].type }}</span>
                <span>{{ selectedCar?.tires[2].size }}</span>
              </div>
              <div class="border p-2 flex flex-col rounded shadow-sm dark:bg-gray-900 dark:border-gray-950">
                <h6 class="font-semibold">Back Left</h6>
                <span>{{ selectedCar?.tires[2].pressure }} PSI</span>
                <span>{{ selectedCar?.tires[2].type }}</span>
                <span>{{ selectedCar?.tires[2].size }}</span>
              </div>
              <div class="border p-2 flex flex-col rounded shadow-sm dark:bg-gray-900 dark:border-gray-950">
                <h6 class="font-semibold">Back Right</h6>
                <span>{{ selectedCar?.tires[3].pressure }} PSI</span>
                <span>{{ selectedCar?.tires[3].type }}</span>
                <span>{{ selectedCar?.tires[3].size }}</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
  <CarModal v-if="isOpen" @close="isOpen = false" @refresh="refreshAll"/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import UserApts from "~/components/userApts.vue";


definePageMeta({
  middleware: 'auth'
})


const tabNavContent = ["All", "Maintenance", "Upgrades", "Repairs", "Appointments"]
const activeTab = ref('All')
const isOpen = ref(false)
const user = ref('')
const cars = ref('')
const selectedCar = ref('')

const {data, status} = await useLazyFetch('/api/user/profile', {server: false})

const {status: carStatus, data: carData, refresh} = await useLazyFetch('/api/car/list', {
  server: false
})

const refreshAll = async () => {
  try {
    isOpen.value = false
    await refresh();
    await refreshNuxtData();
  } catch (e) {
    console.log(e)
  }
}

if (cars.value) {
  selectedCar.value = cars.value[0]
}

watch(carData, async (newCars, oldCars) => {
  if (newCars) {
    selectedCar.value = newCars[newCars.length - 1]
  }
})

watch(data, async (newData, oldData) => {
  if (newData) {
    user.value = newData
  }
})

</script>
