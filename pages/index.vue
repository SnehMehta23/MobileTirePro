<script setup lang="ts">

</script>

<script>
export default {
  data() {
    return {
      carImages: [
        {
          id: 1,
          src: '/images/jeep.webp',
          alt: 'Jeep'
        },
        {
          id: 2,
          src: '/images/tesla.webp',
          alt: 'Tesla'
        },
        {
          id: 3,
          src: '/images/classicCar.webp',
          alt: 'Classic Car'
        },
        {
          id: 4,
          src: '/images/hyundai.webp',
          alt: 'Hyundai'
        },
      ]
    }
  }
}
</script>

<template>
  <!-- <HeroSection /> -->
  <HeroSection />
  <div class="flex flex-col items-center justify-center mb-4 2xl:mb-6 text-dark-charcoal">
    <p class="text-3xl 2xl:text-5xl dark:text-white">How It <span class="text-vivid-red">Works</span></p>
    <h4 class="text-xl 2xl:text-3xl m-2 2xl:m-3 dark:text-white">Driving Excellence: Our Tire Service Process</h4>
  </div>
  <BentoGrid />
  <div class="flex flex-col items-center justify-center mb-2 text-dark-charcoal">
    <p class="text-3xl dark:text-white">How It <span class="text-vivid-red">Looks</span></p>
    <h4 class="text-xl m-2 dark:text-white">Customer Testimonials & Car Showcase</h4>
  </div>
  <div class="p-4">
    <ImageCarousel :images="carImages" />
  </div>

  <LeafletComponent />
</template>

<style>
body {
  background-color: #FAFAFA;
  font-family: 'Lato', sans-serif;
}

.dark body {
  background-color: #1e1f26;
}
</style>