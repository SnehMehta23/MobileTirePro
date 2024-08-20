<template>
    <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-none flex flex-col h-full testimonial text-sm">

        <!-- Stars section -->
        <div class="stars text-yellow-500 mb-4">
            <span v-for="star in 5" :key="star">⭐️</span>
        </div>

        <!-- Review text, flex-grow ensures it takes up available space -->
        <p class="text-gray-600 dark:text-white mb-6 flex-grow">
            "{{ reviews.review }}"
        </p>

        <!-- Name and Verified Purchase, aligned to the bottom -->
        <div class="mt-auto">
            <p class="text-gray-600 dark:text-white mb-2">
                <strong>{{ reviews.name }}</strong>
                <span
                    class="text-gray-600 dark:text-gray-400 float-right opacity-50 filter-saturate-0 text-xs uppercase font-bold mt-1">
                    ✅ Verified purchase
                </span>
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
defineProps<{
    reviews: {
        rating: string;
        review: string;
        name: string;
        link?: string;
    };
}>()
</script>