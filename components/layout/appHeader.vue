<template>
  <nav class="bg-pale-gray dark:bg-[#1e1f26] shadow-md relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/logos/logo_img2.webp" alt="Mobile Tire Pro Logo"
            class="h-[5rem] md:h-[7rem] lg:h-36 w-auto min-w-[48px] mr-2">
        </NuxtLink>
        <div class="hidden lg:flex items-center space-x-4">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-charcoal-gray font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4
            py-2 dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/login" v-if="!isLogged" class="text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4">Log in
          </NuxtLink>
          <NuxtLink v-if="isLogged"
            class="text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white" to="/profile">
            Profile</NuxtLink>
          <span @click="handleLogout" v-if="isLogged" class="cursor-pointer text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4">Log
            out</span>
          <NuxtLink @click="closeMobileMenu" to="/tires" class="mr-2">
            <button
              class="w-full text-left bg-crimson-red text-pale-gray px-3 py-2 rounded-md hover:bg-vivid-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
              Order Tires
            </button>
          </NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/bookings">
            <button
              class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
              Schedule
            </button>
          </NuxtLink>
          <LightDarkToggle />
        </div>
        <div class="lg:hidden flex items-center space-x-3">
          <!-- Mobile menu button -->
          <LightDarkToggle />
          <button @click="toggleMobileMenu" aria-label="Menu Button"
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

    <transition name="fade">
      <div v-if="mobileMenuOpen" class="lg:hidden mobile-menu-overlay">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink @click="closeMobileMenu" v-for="link in links" :key="link.to" :to="link.to"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/login" v-if="!isLogged" @click="closeMobileMenu"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            Log in
          </NuxtLink>
          <NuxtLink v-if="isLogged" to="/profile" @click="closeMobileMenu"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            Profile
          </NuxtLink>
          <a v-if="isLogged" @click="handleLogoutAndClose"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white cursor-pointer">
            Log out
          </a>
          <div class="space-y-2">
            <NuxtLink @click="closeMobileMenu" to="/tires" class="block mb-2">
              <button
                class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
                Order Tires
              </button>
            </NuxtLink>
            <NuxtLink @click="closeMobileMenu" to="/bookings">
              <button
                class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
                Schedule
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useFetch } from '#app';

const mobileMenuOpen = ref(false);
const isLogged = ref(false);

onBeforeMount(async () => {
  const { data } = await useFetch('/api/auth/test', {
    onResponse({ response }) {
      isLogged.value = !!response._data.token;
    }
  });
});

const handleLogout = async () => {
  await $fetch('/api/auth/logout', {
    method: "DELETE",
  });
  isLogged.value = false;
  navigateTo('/');
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const handleLogoutAndClose = async () => {
  await handleLogout();
  closeMobileMenu();
};

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
];

watch(mobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.mobile-menu-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.99);
  z-index: 40;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .mobile-menu-overlay {
  background-color: rgba(30, 31, 38, 0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>