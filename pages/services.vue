<template>
    <PromoBanner />
    <div class="dark:bg-deep-charcoal">
        <HeroSectionWithImageLeft />
        <div class="max-w-7xl mx-auto dark:bg-gray-900">
            <FaqAccordion :faqItems="faqItems" />
        </div>
    </div>
</template>

<script setup>
const faqItems = [
    {
        question: "Do I have to pay online?",
        answer: "Payment taken online (preferred) or in person. Cash, venmo, and card payments are also accepted."
    },
    {
        question: "How long will my service take?",
        answer: " Depending on the vehicle, installation of 4 tires is typically 1 ½ - 2 ½ hours. Please note that due to our scheduling, we may arrive up to 30 minutes before or after your scheduled appointment time. We appreciate your flexibility as this helps us serve all our customers efficiently."
    },
    {
        question: "Do I need to stay on site while my vehicle is being worked on?",
        answer: "This is preferred but not required. All that we ask is that there is a secure spot to return keys and that you have your phone handy in case an issue comes up."
    },
    {
        question: "Where can you work on my car?",
        answer: "We will work on your car in your driveway, in your garage, or in a safe, public parking lot. Please ensure 3 feet of space on each side of the vehicle."
    }
]
</script>