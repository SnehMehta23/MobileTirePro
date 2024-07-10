<template>
    <div class="container mx-auto px-4 max-w-4xl my-6 text-dark-charcoal 2xl:px-8 2xl:max-w-6xl 2xl:my-10">
        <div class="grid grid-cols-3 gap-4 2xl:gap-6">
            <div
                class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 col-span-2 border border-vivid-red 2xl:p-8">
                <div class="space-y-2 2xl:space-y-4">
                    <NumberedCircle :number="1" />
                    <h6 class="font-bold text-lg 2xl:text-xl">Book Your Appointment</h6>
                    <span class="2xl:text-lg">Schedule a date for us to come out to you! After scheduling an appointment
                        make sure to
                        confirm the time!</span>
                </div>
            </div>

            <div class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8">
                <div class="space-y-2 2xl:space-y-4">
                    <NumberedCircle :number="2" />
                    <h6 class="font-bold text-lg 2xl:text-xl">Profile Checkup</h6>
                    <span class="2xl:text-lg">Check out your vehicle profile!</span>
                </div>
            </div>

            <div class="col-span-3 grid grid-cols-2 gap-4 2xl:gap-6">
                <div class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8">
                    <div class="space-y-2 2xl:space-y-4">
                        <NumberedCircle :number="3" />
                        <h6 class="font-bold text-lg 2xl:text-xl">Prepare For Visit</h6>
                        <span class="2xl:text-lg">Make sure there is enough room around your vehicle for us to operate.
                            Become familiar with your profile page
                        </span>
                    </div>
                </div>

                <div
                    class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8 border border-vivid-red">
                    <div class="space-y-2 2xl:space-y-4">
                        <NumberedCircle :number="4" />
                        <h6 class="font-bold text-lg 2xl:text-xl">Go do something else!</h6>
                        <span class="2xl:text-lg">Kick back, relax and have peace of mind knowing that MTP will take
                            care of the
                            rest!</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>