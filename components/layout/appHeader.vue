<template>
  <nav class="bg-pale-gray dark:bg-[#1e1f26] shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img src="/public/images/logos/logo_img2.webp" alt="Mobile Tire Pro" class="h-36 w-auto min-w-[48px] mr-2">
        </div>
        <div class="hidden lg:flex items-center space-x-4">
          <a v-for="link in links" :key="link.to" :href="link.to"
            class="text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ link.label }}
          </a>
          <a v-if="isLogged === false"
            class="text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white"
            href="/login">Log
            in</a>
          <span @click="handleLogout" v-if="isLogged === true"
            class="cursor-pointer text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">Log
            out</span>
          <button
            class="bg-vivid-red text-pale-gray px-4 py-2 rounded-full hover:bg-crimson-red transition duration-300">
            Book Now
          </button>
          <LightDarkToggle />
        </div>
        <div class="lg:hidden flex items-center">
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-slate-gray dark:text-gray-400 hover:text-charcoal-gray dark:hover:text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a v-for="link in links" :key="link.to" :href="link.to"
          class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">{{
            link.label
          }}</a>
        <button
          class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300">
          Book Now
        </button>
        <LightDarkToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
const mobileMenuOpen = ref(false);
const isLogged = ref(false)

onBeforeMount(async () => {
  const { data } = await useFetch('/api/auth/test', {
    onResponse({ response }) {
      isLogged.value = !!response._data.token;
    }
  })
})

const handleLogout = async () => {
  const user = await $fetch('/api/auth/logout', {
    method: "DELETE",
  })
  isLogged.value = false
  navigateTo('/')

}


const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
];

</script>