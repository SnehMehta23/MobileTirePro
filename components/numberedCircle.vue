<template>
    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50">
        <span class="text-red-600 dark:text-red-200 font-semibold">{{ number }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    number: number
}>();
</script>