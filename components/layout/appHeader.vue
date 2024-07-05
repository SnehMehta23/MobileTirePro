<template>
  <nav class="bg-pale-gray shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img src="/public/images/logo_img2.png" alt="Mobile Tire Pro" class="h-36 w-auto min-w-[48px] mr-2">
        </div>
        <div class="hidden lg:flex items-center space-x-4">
          <a v-for="link in links" :key="link.to" :href="link.to" 
             class="text-charcoal-gray hover:text-dark-charcoal">
            {{ link.label }}
          </a>
          <button class="bg-vivid-red text-pale-gray px-4 py-2 rounded-full hover:bg-crimson-red transition duration-300">
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
        <div class="lg:hidden flex items-center">
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
                  class="text-slate-gray hover:text-charcoal-gray focus:outline-none">
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
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a v-for="link in links" :key="link.to" :href="link.to"
           class="block px-3 py-2 text-charcoal-gray hover:text-dark-charcoal">{{ link.label }}</a>
        <button
            class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300">
          Book Now
        </button>
        <div class="px-3 py-2">
          <Icon
            :name="iconName"
            @click="toggleTheme"
            :id="iconName"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const mobileMenuOpen = ref(false);
const colorMode = useColorMode();
const links = [
  {to: '/', label: 'Home'},
  {to: '/about', label: 'About'},
  {to: '/services', label: 'Services'},
  {to: '#', label: 'Log In'}
];

const iconName = computed(() =>
    colorMode.preference === 'light' ? 'iconamoon:mode-dark-bold' : 'iconamoon:mode-light'
);

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};
</script>