<template>
    <div class="w-[468px] h-[60px] items-center mx-auto mt-4">
        <AdBannerRandom :banners="adBanners" />
    </div>

    <section
        class="flex justify-center gap-20 mt-2 text-center mx-auto text-dark-charcoal px-4 sm:px-6 lg:px-8 max-w-5xl 2xl:px-12 2xl:max-w-8xl">
        <div class="space-y-4 items-center flex flex-col p-4 sm:p-8 2xl:p-12">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-lato dark:text-white">Order Your Tires and
                Schedule Installation with Mobile Tire Pro</h1>
            <h2
                class="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-kumbh text-vivid-red bg-pale-red rounded-md p-2">
                Mobile Tire
                Pro is proud
                to
                be an affiliate of Tire Rack!</h2>

            <div class="flex flex-col items-center justify-center mb-4 2xl:mb-6 text-dark-charcoal">
                <p class="text-3xl 2xl:text-5xl dark:text-white">We've teamed up with Tire Rack to offer you an
                    excellent selection of tires at competitive prices. <span class="text-vivid-red">Here's how it
                        works:</span>
                </p>
            </div>
        </div>
    </section>

    <div
        class="flex justify-center gap-20 mt-8 text-center mx-auto text-dark-charcoal px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:px-12 2xl:max-w-8xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard v-for="service in servicesWithCTA" :key="service.title" :service="service"
                :ctaText="service.ctaText" :ctaLink="service.ctaLink" />
            <ServiceCard v-for="serviceWithoutCTA in servicesWithoutCTA" :key="serviceWithoutCTA.title"
                :service="serviceWithoutCTA" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AdBannerRandom from '~/components/adBannerRandom.vue';
import ServiceCard from '~/components/servicesCard.vue'

const servicesWithCTA = [
    {
        title: 'Find Your Tire',
        description: "Click the promotional banner above or the link below to browse Tire Rack's website and find the perfect tires for your vehicle.",
        icon: '/images/icons/tireIcon.svg',
        ctaText: "Click here to visit Tire Rack",
        ctaLink: "https://www.anrdoezrs.net/click-101219214-10377982"
    },
];

const servicesWithoutCTA = [
    {
        title: 'Buy Your Tires',
        description: "Order your chosen tires directly from Tire Rack, where you'll get access to top brands and a wide range of options.",
        icon: '/images/icons/tireIcon.svg'
    },
    {
        title: 'Come Back Here',
        description: `Once you've completed your order, return to our website to schedule a convenient time for our mobile installation service. We'll come to you and install your new tires at your preferred location`,
        icon: '/images/icons/tireIcon.svg'
    }
];

const adBanners = [
    {
        adLink: 'https://www.tkqlhce.com/click-101219214-11912657',
        imageSource: 'https://www.awltovhc.com/image-101219214-11912657',
        width: 468,
        height: 60,
        altText: 'Continental: Get a $110 VISA Prepaid Card',
        scriptSource: 'https://www.kqzyfj.com/placeholder-55178274?target=_top&mouseover=N'
    },
    {
        adLink: 'https://www.kqzyfj.com/click-101219214-11591503',
        imageSource: 'https://www.tqlkg.com/image-101219214-11591503',
        width: 468,
        height: 60,
        altText: 'Save $80 Instantly When You Buy 4 Select Michelin Tires',
        scriptSource: 'https://www.anrdoezrs.net/placeholder-55178277?target=_top&mouseover=N'
    },
    {
        adLink: 'https://www.dpbolvw.net/click-101219214-10877138',
        imageSource: 'https://www.awltovhc.com/image-101219214-10877138',
        width: 468,
        height: 60,
        altText: 'Goodyear: Get Up to $100 Back*',
        scriptSource: 'https://www.anrdoezrs.net/placeholder-55178278?target=_top&mouseover=N'
    },
    {
        adLink: 'https://www.anrdoezrs.net/click-101219214-10377982',
        imageSource: 'https://www.ftjcfx.com/image-101219214-10377982',
        width: 468,
        height: 60,
        altText: 'Tire Rack',
        scriptSource: 'https://www.kqzyfj.com/placeholder-55218810?target=_top&mouseover=N'
    }
];
</script>