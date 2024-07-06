<template>
    <div
        class="text-dark-charcoal cursor-pointer w-28 h-28 rounded-lg my-4 border border-vivid-red overflow-hidden transition-colors duration-300 ease-in-out hover:bg-soft-red">
        <div class="w-full h-full flex flex-col items-center justify-center p-2">
            <img :src="imageUrl" :alt="vehicleType" class="mb-1 max-w-full max-h-1/2 object-contain">
            <span class="text-center text-xs leading-tight">{{ vehicleType }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        vehicleType: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: "https://placeholder.com/48x48"
        }
    }
}
</script>

<style scoped>
span {
    font-family: 'Kumbh Sans', sans-serif
}
</style>