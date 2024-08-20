<script setup>
import TestimonialCard from '~/components/testimonialCard.vue';

// Function to shuffle the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Define the reviews array in the script setup
const reviews = [
  {
    rating: "5",
    review: "No need to wait at a store or drop your car off, they come to your house!!! What a great experience! Brenden was an excellent communicator from start to finish. He worked with us to select the tires we needed for our vehicle. Mobile Tire Pro showed right up to our house, on time, we’re quiet, clean and efficient. The tires are high quality, affordable and the service was awesome! Would highly recommend this company",
    name: "Jonathan",
    link: "https://g.co/kgs/PFva4sx", // Optional if you want to link something
  },
  {
    rating: "5",
    review: "Fast, reliable and mobile tire service. Call Brenden to get your new tires without any hassle installed right in your driveway or garage",
    name: "Andy",
    link: "https://g.co/kgs/2qbvzHz",
  },
  {
    rating: "5",
    review: "This was an excellent service - first time trying something like this and it was a breeze! Would highly recommend this for anyone who doesn’t have the time to go to a mechanic shop or tire shop - he’s very efficient and even gave my tires a nice shine before leaving.",
    name: "Sneh",
    link: "https://g.co/kgs/Yn4Fp76",
  },
];

// Shuffle the reviews array and select a subset to display
const shuffledReviews = shuffleArray([...reviews]).slice(0, 3); // Change '3' to the number of reviews you want to display
</script>

<script>
// Keep your existing data function for the car images
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
  <div class="p-4 xl:mb-8 mb-4">
    <ImageCarousel :images="carImages" />
  </div>

  <div class="xl:px-0 px-4 mb-8">
    <!-- Testimonials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-vivid-red rounded-lg p-4 max-w-7xl mx-auto">
      <a v-for="review in shuffledReviews" :key="review.name" :href="review.link" class="block">
        <TestimonialCard :reviews="review" />
      </a>
    </div>
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
