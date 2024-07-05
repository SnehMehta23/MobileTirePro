<template>
    <div class="container mx-auto px-4 max-w-4xl my-6 text-dark-charcoal">
        <div class="grid grid-cols-3 gap-4">
            <div class="bg-pale-pink rounded-lg p-6 col-span-2 border border-vivid-red">
                <div>
                    <NumberedCircle :number="1" />
                    <h6 class="font-bold">Book Your Appointment</h6>
                    <span>Schedule a date for us to come out to you!</span>
                </div>
                <div>
                    <!-- todo add image -->
                    <img src="" alt="">
                </div>
            </div>

            <div class="bg-pale-pink rounded-lg p-6">
                <div>
                    <NumberedCircle :number="2" />
                    <h6 class="font-bold">Profile & Email Confirmation</h6>
                    <span>After scheduling an appointment make sure to confirm the time!</span>
                </div>
            </div>

            <div class="col-span-3 grid grid-cols-2 gap-4">
                <div class="bg-pale-pink rounded-lg p-6">
                    <div>
                        <NumberedCircle :number="3" />
                        <h6 class="font-bold">Prepare For Visit</h6>
                        <span>Make sure there is enough room around your vehicle for us to operate.
                            Become familiar with your profile page
                        </span>
                    </div>
                </div>

                <div class="bg-pale-pink rounded-lg p-6 border border-vivid-red">
                    <div>
                        <NumberedCircle :number="4" />
                        <h6 class="font-bold">Go do something else!</h6>
                        <span>Kick back, relax and have peace of mind knowing that MTP will take care of the rest!</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NumberedCircle from '~/components/numberedCircle.vue'
</script>

<style scoped>
h6 {
    font-family: 'Lato', sans-serif;
}
span {
    font-family: 'Kumbh Sans', sans-serif;
}
</style>