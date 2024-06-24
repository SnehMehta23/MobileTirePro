<template>
    <div class="bg-black text-white py-2 px-4 rounded-md mt-2">
        {{ ctaText }}
    </div>
</template>

<script>
export default {
    props: {
        ctaText: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped></style>