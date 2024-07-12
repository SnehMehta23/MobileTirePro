<script setup lang="ts">
import { format } from "date-fns";

const { data } = useAsyncData('apts', () => $fetch('/api/apts/userapt'))

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
  <div class="max-w-2xl mx-auto p-4" v-if="data">
    <h2 class="text-3xl font-bold mb-6">Appointment History</h2>
    <div class="space-y-4">
      <div v-for="apt in data.data" class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div class="bg-blue-600 text-white p-4">
          <h3 class="text-xl font-semibold">
            {{ apt.service }} - {{ apt.carId?.year }} {{ apt.carId?.make }} {{ apt.carId?.model }}
          </h3>
        </div>
        <div class="p-4 space-y-3">
          <div class="text-gray-600">
            <span class="font-medium">Date:</span> {{ formatISODate(apt.appointmentDate) }}
          </div>
          <div class="text-gray-600">
            <span class="font-medium">Location:</span> {{ apt.address }}
          </div>
          <div class="mt-2">
            <span class="px-2 py-1 rounded-full text-sm font-medium" :class="{
              'bg-yellow-100 text-yellow-800': apt.status === 'Pending',
              'bg-green-100 text-green-800': apt.status === 'Completed',
              'bg-gray-100 text-gray-800': apt.status !== 'Pending' && apt.status !== 'Completed'
            }">
              Status: {{ apt.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>