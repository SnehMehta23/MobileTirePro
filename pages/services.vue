<template>
    <div>
        <HeroSectionWithImageLeft />
        <div class="max-w-7xl mx-auto">
            <FaqAccordion :faqItems="faqItems" />
        </div>
    </div>
</template>

<script setup>
const faqItems = [
    {
        question: "Do you do single tire rotations?",
        answer: "No single tire installations! Customers need to call if they need only 3 tires installed. No tire repairs or rotations offered."
    },
    {
        question: "Do I have to pay online?",
        answer: "Payment taken online (preferred) or in person. Cash, venmo, and card payments are also accepted."
    },
    {
        question: "Do you replace TPMS Sensors?",
        answer: "Any replacement of TPMS sensors needs to be known before we show up for appointment to make sure we arrive with the correct supplies for the job."
    },
    {
        question: "How long does a typical service take?",
        answer: "Customers should expect roughly 1 hour to complete the work when we get there. To account for delays from jobs earlier in the day and traveling from job to job, we will ask for your vehicle for a 2 hour time window to be safe."
    },
    {
        question: "Can I go run to the store or do something else while you are working on my car?",
        answer: "We would prefer the customer be on sight while vehicle is being worked on, that way we can get and give back keys (if customer is not there we need to be able to get the keys and return them in a secure location.) We also need to be able to speak with customer in case a problem arrises, Jobs need to be able to be done as efficiently as possible."
    },
    {
        question: "If you are coming to me, where will you work on my car?",
        answer: "Vehicles can be worked on in your garage, driveway, or public parking lot (a 3- 4 feet of free space on each side of the vehicle) - but a majority of the work will be taken care in our truck."
    }
]
</script>