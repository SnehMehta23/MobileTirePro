<!-- ServiceCard.vue -->
<template>
    <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-none flex flex-col h-full"
        :class="{'opacity-70 grayscale': service.comingSoon}">
        <!-- Coming soon badge -->
        <div v-if="service.comingSoon" class="absolute top-4 right-4">
            <span class="bg-gray-500 text-white text-xs font-semibold px-2.5 py-1 rounded">Coming Soon</span>
        </div>
        <div class="flex items-center mb-4 relative">
            <img :src="service.icon" :alt="service.title" class="w-12 h-12 mr-4">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ service.title }}</h3>
        </div>
        <p class="text-gray-600 mb-6 dark:text-white flex-grow">{{ service.description }}</p>
        <NuxtLink 
            v-if="(service.ctaText || ctaText) && !service.comingSoon" 
            @click="handleCtaClick" 
            :to="ctaLink"
            class="bg-vivid-red text-white font-bold py-2 px-6 rounded-md hover:bg-crimson-red self-start mt-auto transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2 inline-block no-underline">
            {{ service.ctaText || ctaText }}
        </NuxtLink>
    </div>
</template>


<script setup lang="ts">
const emit = defineEmits(['cta-click'])

const handleCtaClick = () => {
    emit('cta-click')
}

defineProps<{
    service: {
        title: string;
        description: string;
        icon: string;
        ctaText?: string;
        comingSoon?: boolean;
    };
    ctaText?: string;  // Fallback CTA text
    ctaLink?: string;
}>()
</script>