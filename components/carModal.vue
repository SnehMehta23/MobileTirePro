<script setup lang="js">
const startYear = 1992
const endYear = 2026
const years = Array.from({length: endYear - startYear + 1}, (v, i) => startYear + i)

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
  const makes = carData.value.map(car => car.make)
  return [...new Set(makes)]
})

const filteredModels = computed(() => {
  if (!selectedMake.value) return []
  return carData.value
      .filter(car => car.make === selectedMake.value)
      .map(car => car.model)
})

async function addCar() {
  try {
    isLoading.value = true
    const car = await $fetch('/api/car/add', {
      method: 'POST',
      body:
          {
            make: selectedMake.value,
            model: selectedModel.value,
            year: selectedYear.value,
            tires: [{name: 'FL', pressure: 0, size: 'N/A', type: 'Normal'},
              {name: 'FR', pressure: 0, size: 'N/A', type: 'Normal'},
              {name: 'BL', pressure: 0, size: 'N/A', type: 'Normal'}, {
                name: 'BR',
                pressure: 0,
                size: 'N/A',
                type: 'Normal'
              },]
          }
    })
    emit('refresh')

  } catch (e) {
    console.error(e.message)
  }
}


</script>

<template>
  <div

      class="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
      @click.self="close"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full border-red-600">
      <div class="p-4 border-b">
        <h3 class="text-lg font-semibold">Add Car</h3>
      </div>
      <div class="p-4 flex flex-col w-2/4 space-y-2.5">
        <div class="w-full flex justify-start items-start gap-1">
          <span>Year: </span>
          <select class="px-2 w-full py-1 rounded-md bg-gray-100 hover:bg-red-100" v-model="selectedYear">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
        </div>
        <div v-if="carData" class="w-full flex justify-start items-start gap-1">
          <span>Make: </span>
          <select class="w-full px-2 py-1 rounded-md bg-gray-100 hover:bg-red-100" v-model="selectedMake"
                  name="" id="">
            <option v-for="make in uniqueMakes" :value="make">{{ make }}</option>
          </select>
        </div>
        <div v-if="selectedMake" class="w-full flex justify-start items-start gap-1">
          <span>Model: </span>
          <select class="w-full px-2 py-1 rounded-md bg-gray-100 hover:bg-red-100" v-model="selectedModel"
                  name="" id="">
            <option v-for="model in filteredModels" :value="model">{{ model }}</option>
          </select>
        </div>
      </div>
      <div class="p-4 border-t space-x-3.5 flex">
        <button @click="$emit('close')" class="bg-vivid-red text-white px-4 py-2 rounded hover:bg-red-600">Close
        </button>
        <button class="flex justify-center items-center bg-vivid-red text-white px-4 py-2 rounded hover:bg-red-600"
                @click="addCar">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span>{{ isLoading ? "Please wait" : "Add Car" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>