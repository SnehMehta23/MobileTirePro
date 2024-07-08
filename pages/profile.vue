<template>
  <div class="flex justify-center gap-20 mt-8 text-dark-charcoal">
    <!-- Main Profile Widget -->
    <section class="p-4 w-2/3">
      <div class="p-4 bg-pale-gray rounded-lg shadow-md">

        <!-- Profile Picture and Vehicle Tags -->
        <div class="flex items-center mb-4">
          <div class="relative rounded-full overflow-hidden w-12 h-12 border-2 border-vivid-red mr-4">
            <img class="absolute inset-0 w-full h-full object-cover"
                 :src="user.picture?user.picture:'https://placeholder.com/64x64'"
                 alt="">
          </div>
          <div class="space-x-2">
            <select name="cars">
              <option value="">
                Tesla
              </option>
              <option value="">
                F150
              </option>
            </select>
            <span class="bg-pale-red px-2 py-1 rounded">Year</span>
            <span class="bg-pale-red px-2 py-1 rounded">Make</span>
            <span class="bg-pale-red px-2 py-1 rounded">Model</span>
          </div>
        </div>

        <div class="flex justify-start items-center space-x-3.5">
          <h3 class="text-xl font-semibold mb-4">{{ user.name }}</h3>
          <div class="text-md text-slate-500 font-light italic font-semibold mb-4">{{ "(" + user.email + ")" }}</div>
        </div>

        <!-- History of Service -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-2">[Vehicle Service History]</h3>
          <div
              class="flex space-x-4 mb-4 p-2 bg-light-gray bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md border border-cool-gray-light">
                        <span v-for="content in tabNavContent" :key="content" @click="activeTab = content"
                              class="cursor-pointer transition duration-300"
                              :class="{ 'text-vivid-red font-semibold': activeTab === content, 'hover:text-crimson-red': activeTab !== content }">
                            {{ content }}
                        </span>
          </div>
          <div>
            <!-- Placeholder for tab content -->
            <p>{{ activeTab }}</p>
          </div>
        </div>

        <!-- Tire Info Section -->
        <section>
          <h3 class="text-lg font-semibold mb-4">Tire Information</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="border p-2 flex flex-col rounded shadow-sm">
              <h6 class="font-semibold">Front Left</h6>
              <span>[tire pressure]</span>
              <span>[tire type]</span>
              <span>[tire size]</span>
            </div>
            <div class="border p-2 flex flex-col rounded shadow-sm">
              <h6 class="font-semibold">Front Right</h6>
              <span>[tire pressure]</span>
              <span>[tire type]</span>
              <span>[tire size]</span>
            </div>
            <div class="border p-2 flex flex-col rounded shadow-sm">
              <h6 class="font-semibold">Back Left</h6>
              <span>[tire pressure]</span>
              <span>[tire type]</span>
              <span>[tire size]</span>
            </div>
            <div class="border p-2 flex flex-col rounded shadow-sm">
              <h6 class="font-semibold">Back Right</h6>
              <span>[tire pressure]</span>
              <span>[tire type]</span>
              <span>[tire size]</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const tabNavContent = ["All", "Maintenance", "Upgrades", "Repairs"]
const activeTab = ref('All')

definePageMeta({
  middleware: 'auth'
})

const user = ref('')

const {data} = await useFetch('/api/user/profile', {
  method: 'GET',
  onResponse({request, response}) {
    user.value = response._data
  }
})

console.log(data)


</script>