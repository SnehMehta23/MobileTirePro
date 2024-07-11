<script setup lang="ts">
import {format} from "date-fns";

const {data} = useAsyncData('apts', () => $fetch('/api/apts/userapt'))

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
  <div class="flex flex-col gap-10" v-if="data">
    <div class="text-2xl">
      Appointment History
    </div>
    <div class=" rounded shadow-md px-4 py-2 bg-red-50" v-for="apt in data.data">
      <div class="text-xl">
        {{ apt.service }} - {{ apt.carId?.year }} {{ apt.carId?.make }} {{ apt.carId?.model }}
      </div>
      <div class="text-lg text-gray-600 italic flex flex-col gap-0.5">
        <div>{{ formatISODate(apt.appointmentDate) }}</div>
        <div> {{ apt.address }}</div>
      </div>
      <div class="font-semibold">
        Status: {{ apt.status }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>