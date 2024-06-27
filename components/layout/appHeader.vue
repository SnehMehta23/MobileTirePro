<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img src="/public/images/logo_img2.png" alt="Mobile Tire Pro" class="h-36 w-auto min-w-[48px] mr-2">
        </div>
        <div class="hidden sm:flex items-center space-x-4">
          <a v-for="link in links" :href="link.to" class="text-gray-700 hover:text-gray-900">{{ link.label }}</a>
          <button class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">
            Book Now
          </button>
          <div class="cursor-pointer">
            <Icon
                :name="iconName"
                @click="toggleTheme"
                :id="iconName"
            />

          </div>
        </div>
        <div class="sm:hidden flex items-center">
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
                  class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a v-for="link in links" :href="link.to"
           class="block px-3 py-2 text-gray-700 hover:text-gray-900">{{ link.label }}</a>
        <button
            class="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300">
          Book Now
        </button>
      </div>
    </div>
  </nav>
</template>

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      mobileMenuOpen: false-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<script setup>

const mobileMenuOpen = ref(false);
const colorMode = useColorMode();
const links = [
  {to: '#', label: 'Home'},
  {to: '#', label: 'About'},
  {to: '#', label: 'Our Services'},
  {to: '#', label: 'Log In'}]

const iconName = computed(() =>
    colorMode.preference === 'light' ? 'iconamoon:mode-dark-bold' : 'iconamoon:mode-light'
);

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};

</script>