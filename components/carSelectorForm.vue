<template>
  <div
    class="max-w-3xl p-6 bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md dark:border-none border border-gray-200">
    <h3 class="text-xl font-semibold dark:text-white text-dark-charcoal mb-4">Select your vehicle</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div>
          <label class="block text-left text-sm font-medium text-dark-charcoal dark:text-white mb-1 capitalize">Year
          </label>
          <select v-model="selectedYear"
            class="w-full p-2 text-sm border border-gray-300 rounded-md text-dark-charcoal dark:text-dark-charcoal focus:ring-vivid-red focus:border-vivid-red">
            <option v-for="year in years" :value="year"> {{ year }}</option>
            <!-- Add options dynamically -->
          </select>
        </div>

        <div>
          <label
            class="block text-left text-sm font-medium text-dark-charcoal dark:text-white mb-1 capitalize">Make</label>
          <select v-model="selectedMake"
            class="w-full p-2 text-sm border border-gray-300 rounded-md text-dark-charcoal dark:text-dark-charcoal focus:ring-vivid-red focus:border-vivid-red">
            <option v-for="make in uniqueMakes" :value="make">{{ make }}</option>
            <!-- Add options dynamically -->
          </select>
        </div>

        <div>
          <label
            class="block text-left text-sm font-medium text-dark-charcoal dark:text-white mb-1 capitalize">Model</label>
          <select v-model="selectedModel"
            class="w-full p-2 text-sm border border-gray-300 rounded-md text-dark-charcoal dark:text-dark-charcoal focus:ring-vivid-red focus:border-vivid-red">
            <option v-for="model in filteredModels" :value="model">{{ model }}</option>
            <!-- Add options dynamically -->
          </select>
        </div>
      </div>
      <div class="flex justify-start">
        <NuxtLink :to="canSubmit ? '/bookings' : '#'"
          :class="['px-6 py-2 text-sm rounded-md transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2', canSubmit ? 'bg-vivid-red text-white hover:bg-crimson-red' : 'bg-gray-300 text-gray-500 cursor-not-allowed']">
          Check Quote
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
const formData = {
  year: '',
  make: '',
  model: ''
}

const startYear = 1992
const endYear = 2026
const years = Array.from({ length: endYear - startYear + 1 }, (v, i) => startYear + i)

const selectedYear = ref('')
const carData = ref('')
const selectedMake = ref('')
const selectedModel = ref('')
const isLoading = ref(false)
const emit = defineEmits(['refresh'])

watch(selectedYear, async (newYear, oldYear) => {
  if (newYear) {
    const data = await $fetch(`/cars/${newYear}.json`)
    carData.value = data;
  }
})

const uniqueMakes = computed(() => {
  if (!carData.value) return []
  const makes = carData.value.map(car => car.make)
  return [...new Set(makes)]
})

const filteredModels = computed(() => {
  if (!selectedMake.value) return []
  return carData.value
    .filter(car => car.make === selectedMake.value)
    .map(car => car.model)
})

const canSubmit = computed(() => {
  return selectedYear.value && selectedMake.value && selectedModel.value
})

const handleSubmit = () => {
  console.log('Selected:', formData)
}
</script>
