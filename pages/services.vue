<template>
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
        question: "Do you offer single or 3 tire installations",
        answer: "At this time we do not offer single tire installations, please call, text, or email if you need 3 tires installed. "
    },
    {
        question: "Do I have to pay online?",
        answer: "Payment taken online (preferred) or in person. Cash, venmo, and card payments are also accepted."
    },
    {
        question: "How long will my service take?",
        answer: "We ask for 2 ½ hours total time. 1 hour time window for us to arrive, and then 1 ½ hours to complete the work. Any vehicle with oversized or ultra high performance tires we ask for 3 hours. Please be understanding that delays happen, we understand the importance of your time."
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