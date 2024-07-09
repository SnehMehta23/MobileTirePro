<script setup lang="ts">
import vehicleTypeSquare from "~/components/vehicleTypeSquare.vue"

const colorMode = useColorMode()

</script>

<template>
    <section
        class="flex justify-center gap-20 mt-8 text-center max-w-7xl mx-auto text-dark-charcoal px-4 sm:px-6 lg:px-8">
        <div class="space-y-2 items-center flex flex-col p-4 sm:p-8">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-lato dark:text-white">Tire Service at Your Doorstep</h1>
            <p class="text-xl sm:text-2xl font-kumbh text-vivid-red">Skip the tire shop hassle. We bring expert tire
                installation
                right to you!
            </p>
            <p
                class="text-base sm:text-lg lg:text-xl font-kumbh text-slate-600 dark:text-slate-400 max-w-full sm:max-w-[750px]">
                Save time and stress with our
                mobile tire service.
                Whether
                you're at home or
                work we
                don't
                compromise on quality of service. Book your appointment with ease! Start by choosing your vehicle type
            </p>
            <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4">
                <vehicleTypeSquare vehicleType="Sedan"
                    :imageUrl="colorMode.value === 'light' ? '/images/icons/sedan.webp' : '/images/icons/sedanwhite.webp'" />
                <vehicleTypeSquare vehicleType="SUV"
                    :imageUrl="colorMode.value === 'light' ? '/images/icons/SUV.webp' : '/images/icons/SUVwhite.webp'" />
                <vehicleTypeSquare vehicleType="Truck"
                    :imageUrl="colorMode.value === 'light' ? '/images/icons/pickuptruck.webp' : '/images/icons/pickuptruckwhite.webp'" />
                <vehicleTypeSquare vehicleType="EV"
                    :imageUrl="colorMode.value === 'light' ? '/images/icons/electriccar.webp' : '/images/icons/electriccarwhite.webp'" />
            </div>
        </div>
    </section>
</template>

<style scoped>
h1 {
    font-family: 'Lato', sans-serif;
}

p {
    font-family: 'Kumbh Sans', sans-serif
}
</style>