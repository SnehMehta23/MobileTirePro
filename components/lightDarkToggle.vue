<!-- LightDarkToggle.vue -->
<template>
    <div class="flex items-center">
        <button @click="toggleColorMode" class="w-14 h-7 flex items-center rounded-full p-1 cursor-pointer relative"
            :class="colorMode.value === 'dark' ? 'bg-dark-charcoal' : 'bg-soft-red'">
            <div class="bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out absolute"
                :class="colorMode.value === 'dark' ? 'translate-x-7' : 'translate-x-0'"></div>
            <svg v-if="useEmojis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-4 h-4 text-yellow-500 absolute left-1.5">
                <text x="12" y="18" text-anchor="middle" font-size="20">☀️</text>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-4 h-4 text-vivid-red absolute left-1.5">
                <path
                    d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
            <svg v-if="useEmojis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-4 h-4 text-gray-900 absolute right-1.5">
                <text x="12" y="18" text-anchor="middle" font-size="20">🌙</text>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-4 h-4 text-gray-900 absolute right-1.5">
                <path fill-rule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</template>

<script setup>
const colorMode = useColorMode()
const useEmojis = ref(false) // Set to true if you want to use emojis instead of SVGs

const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>