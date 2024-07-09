<script setup lang="ts">
import CarSelectorForm from './carSelectorForm.vue'
import ServiceCard from './servicesCard.vue'

const services = [
  {
    title: 'Professional Tire Installation',
    description: 'Backed by 8 years of industry experience and training, we offer a professional tire installation & balancing service to ensure safety and quality.',
    icon: '/images/icons/tireIcon.svg'
  },
  {
    title: 'TPMS Sensor Installation and Recalibration',
    description: 'We offer new TPMS sensors (if needed or requested) for every vehicle. TPMS should always be in working order to alert drivers when tire pressures have dropped below manufacture specifications.',
    icon: '/images/icons/sensorIcon.svg'
  },
  {
    title: 'Seasonal Changeover',
    description: `Whether it's separate tire & wheel assemblies or just tires, we can change them over for you so your vehicle is prepared for the weather ahead.Temperature controlled Storage for your separate tires is included with this service.`,
    icon: '/images/icons/seasonIcon.svg'
  }
]
</script>

<template>
  <div class="relative dark:bg-[#1e1f26] overflow-hidden bg-gray-100 min-h-[70vh] lg:min-h-0 hero-bg">
    <div class="absolute inset-0 bg-black opacity-50 lg:hidden"></div>
    <div class="container mx-auto px-4 py-8 h-full relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full">
        <div class="hidden lg:block lg:w-7/12">
          <img
            src="/images/isometric-car-repair-horizontal-banner-with-serviceman-making-tire-service-vector-illustration.webp"
            alt="Tire Service Technician Illustration" class="w-full h-auto">
        </div>
        <div
          class="w-full lg:w-7/12 text-center lg:text-left lg:pl-8 p-6 lg:p-0 bg-black bg-opacity-30 lg:bg-transparent rounded-lg lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2">
          <h1
            class="text-3xl dark:text-white lg:text-5xl font-bold text-white mb-4 text-shadow lg:text-gray-800 lg:text-shadow-none">
            Expert Tire Care, Wherever You Are
          </h1>
          <p
            class="text-lg dark:text-white lg:text-xl text-gray-100 lg:text-gray-600 mb-6 text-shadow lg:text-shadow-none">
            Professional tire services delivered to your driveway, garage, or public parking lot
          </p>
          <CarSelectorForm />
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-12">
    <div
      class="bg-gradient-to-r from-pale-red to-vivid-red dark:from-gray-900 dark:to-vivid-red rounded-lg shadow-lg p-8 mb-12">
      <div class="flex flex-col lg:flex-row justify-between items-center">
        <div class="lg:w-2/3 mb-6 lg:mb-0">
          <h2 class="text-3xl font-bold text-dark-charcoal dark:text-white mb-2">Comprehensive Tire Solutions for Every
            Vehicle</h2>
          <p class="text-xl text-dark-charcoal dark:text-white">From installation to seasonal changes, we've got you
            covered</p>
        </div>
        <div class="lg:w-1/3 text-right">
          <p class="text-white text-lg">
            <span class="text-4xl font-bold block mb-1">8 years</span>
            of industry experience and training
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ServiceCard v-for="service in services" :key="service.title" :service="service" />
    </div>
  </div>
</template>


<style scoped>
h1,
h2,
h3 {
  font-family: 'Lato', sans-serif;
}

h4,
h5,
h6,
p {
  font-family: 'Kumbh Sans', sans-serif;
}

@media (max-width: 1023px) {
  .hero-bg {
    background-image: url('/images/undraw_automobile_repair_ywci.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.lg\:text-shadow-none {
  text-shadow: none;
}
</style>