<template>
  <div class="flex justify-center items-center min-h-screen bg-white p-4">
    <div class="flex rounded-2xl overflow-hidden shadow-xl max-w-[800px]">
      <!-- Left side image -->
      <div class="relative w-[350px] hidden md:block">
        <img src="/public/images/signupImage.png" alt="Mechanic" class="object-cover w-full h-full" />
        <div class="absolute inset-0 bg-red-400/40"></div>
      </div>

      <!-- Right side content -->
      <div class="w-full md:w-[400px] p-6 bg-white">
        <!-- Logo and progress indicator -->
        <div class="flex flex-col items-center mb-4">
          <img src="/public/images/icons/racing.webp" alt="Racing logo" class="w-8 h-8 mb-3" />
          <div class="flex gap-2">
            <div class="w-10 h-1 rounded transition-all duration-300"
              :class="[currentStep >= 1 ? 'bg-red-500' : 'bg-gray-200']"></div>
            <div class="w-10 h-1 rounded transition-all duration-300"
              :class="[currentStep >= 2 ? 'bg-red-500' : 'bg-gray-200']"></div>
            <div class="w-10 h-1 rounded transition-all duration-300"
              :class="[currentStep === 3 ? 'bg-red-500' : 'bg-gray-200']"></div>
          </div>
        </div>

        <!-- Steps content -->
        <Transition name="fade" mode="out-in">
          <!-- Step 1: Create Account -->
          <div v-if="currentStep === 1" key="step1" class="space-y-4">
            <div class="text-center">
              <h1 class="text-xl font-semibold">Create an account</h1>
              <p class="text-gray-600 text-sm mt-1">Provide your email and choose a password.</p>
            </div>

            <form class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Name*</label>
                <input v-model="formData.name" type="text" placeholder="Enter your name"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm" />
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Email*</label>
                <input v-model="formData.email" type="email" placeholder="Enter your email"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm" />
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Password*</label>
                <input v-model="formData.password" type="password" placeholder="Choose a password"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm" />
              </div>

              <button @click.prevent="nextStep"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
                Continue
              </button>

              <div class="relative py-2">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                  <span class="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <GoogleSignInButton class="w-full" @success="handleLoginSuccess" />
            </form>
          </div>

          <!-- Step 2: Add Vehicle -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-4">
            <div class="text-center">
              <h1 class="text-xl font-semibold">Add Vehicle</h1>
              <p class="text-gray-600 text-sm mt-1">Enter your vehicle details to get started</p>
            </div>

            <form class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Year*</label>
                <select v-model="formData.vehicleYear"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm">
                  <option value="" disabled selected>Enter the vehicle's manufacturing year</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Make*</label>
                <select v-model="formData.vehicleMake"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm">
                  <option value="" disabled selected>Enter vehicle make</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Model*</label>
                <select v-model="formData.vehicleModel"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm">
                  <option value="" disabled selected>Enter vehicle model</option>
                </select>
              </div>

              <button @click.prevent="nextStep"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
                Add Car
              </button>

              <div class="text-center">
                <a href="#" @click.prevent="skipAddingVehicle" class="text-xs text-red-500 hover:underline">
                  Or skip adding a vehicle for now and return to it later in your profile settings ->
                </a>
              </div>
            </form>
          </div>

          <!-- Step 3: Success -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-4">
            <div class="text-center">
              <h1 class="text-xl font-semibold">Welcome aboard!</h1>
              <p class="text-gray-600 text-sm mt-1">Here's what you've completed:</p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm line-through text-gray-500">Your Details</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm line-through text-gray-500">Enter your vehicle</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span class="text-sm text-gray-500">3</span>
                </div>
                <span class="text-sm text-gray-700">Explore your profile and our services</span>
              </div>
            </div>

            <NuxtLink v-if="currentStep === 3" to="/" class="w-full">
              <div
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm mt-4">
                Continue
              </div>
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentStep = ref(1)
const formData = reactive({
  name: '',
  email: '',
  password: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: ''
})

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

// Method to skip adding vehicle
const skipAddingVehicle = () => {
  currentStep.value = 3; // Directly go to step 3
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>