<template>
    <div id="history-section" class="rounded-lg relative overflow-hidden md:mt-12 md:mx-32 md:mb-12 min-h-[600px]">
        <div class="flex flex-col md:flex-row">
            <div
                class="md:w-7/12 relative z-10 bg-[#f5f5f5] border border-gray-50 shadow-2xl rounded-lg drop-shadow-md bg-opacity-90 p-8 md:pr-16 md:-mr-24">
                <h2 class="text-2xl text-darkGreen-700 font-bold font-ubuntu mb-4">Our History</h2>
                <hr class="w-24 h-1 bg-red-500 border-0 rounded mt-2" />
                <p class="text-lg font-manrope mb-8 mt-2">
                    Mobile Tire Pro's journey and ambitions began when an experienced technician with over 15 years at a
                    renowned tire shop, recognized the need for a more customer-friendly approach to tire service. Our
                    goal is
                    to provide a seamless, high-quality tire service that puts customers first. By combining technical
                    expertise with a genuine commitment to customer satisfaction, we built a service that prioritizes
                    both your
                    time and your vehicle's needs. When you choose us, you're not just getting tire service – you're
                    benefiting
                    from years of industry insight and a dedication to your complete satisfaction.
                </p>
                <h2 class="text-2xl text-darkGreen-700 font-bold font-ubuntu mb-4">Quality Commitment</h2>
                <hr class="w-24 h-1 bg-red-500 border-0 rounded mt-2" />
                <p class="text-lg font-manrope mt-2">
                    At Mobile Tire Pro, we are dedicated to providing a seamless and stress-free tire installation
                    service by
                    bringing our expertise and equipment directly to our customers. By eliminating the need for
                    time-consuming
                    trips to the tire store, we aim to save our customers valuable time and hassle, ensuring their
                    vehicles are
                    always in top condition with minimal disruption to their daily lives.
                </p>
            </div>
            <div class="md:w-7/12 relative overflow-hidden">
                <div class="absolute inset-0 opacity-50">
                    <img class="w-full h-full object-cover transform translate-y-8"
                        src="/public/images/vecteezy_mobile-tire-service-abstract-concept-vector-illustration_35795024.eps.webp"
                        alt="Mobile Tire Service Illustration">
                </div>
            </div>
        </div>
    </div>


</template>
<style>
@media (min-width: 768px) {
  #history-section::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 58.33%;
    /* 7/12 of the container width */
    background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
    z-index: 5;
    pointer-events: none;
  }
}
</style>
<script setup lang="ts">
</script>