<template>
    <div class="relative max-w-5xl mx-auto h-[400px] overflow-hidden rounded-lg shadow-lg">
        <transition-group name="fade" tag="div" class="h-full">
            <div v-for="(image, index) in images" :key="image.id" v-show="currentIndex === index"
                class="absolute inset-0">
                <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" />
            </div>
        </transition-group>
        <button @click="prevSlide"
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none">
            &#8592;
        </button>
        <button @click="nextSlide"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none">
            &#8594;
        </button>
    </div>
</template>

<script>
export default {
    name: 'ImageCarousel',
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length
        },
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>