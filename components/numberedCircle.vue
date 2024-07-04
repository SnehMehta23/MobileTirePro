<template>
    <div class="w-8 h-8 rounded-full border border-vivid-red bg-red-300 flex items-center justify-center">
        <span class="text-pale-gray font-bold text-lg">{{ number }}</span>
    </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: true
        }
    }
}
</script>