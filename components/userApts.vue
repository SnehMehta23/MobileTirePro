<script setup lang="ts">
import {format} from "date-fns";

const {data} = useAsyncData('apts', () => $fetch('/api/apts/userapt'))

const {car} = defineProps(['car'])


function formatISODate(isoString) {
  const date = new Date(isoString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

//@ts-ignore


</script>

<template>
  <div class="w-full max-w-3xl mx-auto" v-if="data">
    <h2 class=" text-center md:text-2xl font-bold mt-4 md:mt-0 mb-4">Appointment History</h2>
    <div class="space-y-3">
      <div v-for="apt in data.data">
        <div v-show="car == apt.carId?._id"
             class="bg-white dark:bg-gray-900 rounded-md shadow-sm overflow-hidden border border-gray-200 dark:border-none">
          <div class="bg-vivid-red dark:bg-red-800 text-white p-3">
            <h3 class="md:text-xl  font-semibold">
              {{ apt.service }} - {{ apt.carId?.year }} {{ apt.carId?.make }} {{ apt.carId?.model }}
            </h3>
          </div>
          <div class="text-sm md:text-lg p-3 space-y-2">
            <div class="text-gray-700 dark:text-white">
              <span class="font-medium">Date:</span> {{ formatISODate(apt.appointmentDate) }}
            </div>
            <div class="text-gray-700 dark:text-white">
              <span class="font-medium">Location:</span> {{ apt.address }}
            </div>
            <div>
            <span class="px-2 py-1 rounded-full text-sm font-medium" :class="{
              'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100': apt.status === 'Pending',
              'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100': apt.status === 'Completed',
              'bg-gray-100 text-gray-800': apt.status !== 'Pending' && apt.status !== 'Completed'
            }">
              Status: {{ apt.status }}
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>