<script setup lang="ts">
import vehicleTypeSquare from "~/components/vehicleTypeSquare.vue"
</script>

<template>
    <section class="darkMode flex justify-center gap-20 mt-8 text-center max-w-7xl mx-auto text-dark-charcoal">
        <div class="space-y-2 items-center flex flex-col p-8">
            <h1 class="text-5xl font-lato">Tire Service at Your Doorstep</h1>
            <p class="text-2xl font-kumbh text-vivid-red">Skip the tire shop hassle. We bring expert tire installation
                right to you!
            </p>
            <p class="text-xl w-[750px] font-kumbh text-slate-600">Save time and stress with our mobile tire service.
                Whether
                you're at home or
                work we
                don't
                compromise on quality of service. Book your appointment with ease! Start by choosing your vehicle type
            </p>
            <div class="flex gap-2">
                <vehicleTypeSquare vehicleType="Sedan" imageUrl="/images/sedan.png" />
                <vehicleTypeSquare vehicleType="SUV" imageUrl="/images/SUV.png" />
                <vehicleTypeSquare vehicleType="Truck" imageUrl="/images/pickuptruck.png" />
                <vehicleTypeSquare vehicleType="EV" imageUrl="/images/electriccar.png" />
            </div>
            <!-- <p class="text-md font-medium text-orange-600 text-center mt-2 underline cursor-pointer text-nowrap">
                Curious about your tires? Contact us for a no-cost assessment!
            </p> -->
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