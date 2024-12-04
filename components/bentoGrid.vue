<template>
  <div class="container mx-auto px-4 max-w-4xl my-6 text-dark-charcoal 2xl:px-8 2xl:max-w-6xl 2xl:my-10">
    <div class="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 2xl:gap-6">
      <div
          class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 md:col-span-2 border border-vivid-red 2xl:p-8">
        <div class="space-y-2 2xl:space-y-4">
          <NumberedCircle :number="1"/>
          <h6 class="font-bold text-lg 2xl:text-xl">Create Your Account</h6>
          <span class="2xl:text-lg">Creating your account allows you to schedule appointments and see past
                        services.</span>
        </div>
      </div>

      <div class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8 md:col-span-1">
        <div class="space-y-2 2xl:space-y-4">
          <NumberedCircle :number="2"/>
          <h6 class="font-bold text-lg 2xl:text-xl">Order Tires</h6>
          <span class="2xl:text-lg">Contact us to order the tires/wheels you want. Not sure what you need? We’ll be happy to recommend the option that fits your budget and safety standards.</span>
        </div>
      </div>
      <div class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8 md:col-span-3">
        <div class="space-y-2 2xl:space-y-4">
          <NumberedCircle :number="3"/>
          <h6 class="font-bold text-lg 2xl:text-xl">Schedule An Appointment</h6>
          <span class="2xl:text-lg">Schedule a date and time for us to come out to you. Be sure to check your
                        email for an appointment confirmation.</span>
        </div>
      </div>

      <div class="md:col-span-3 flex flex-col md:grid md:grid-cols-2 gap-4 2xl:gap-6">
        <div class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8">
          <div class="space-y-2 2xl:space-y-4">
            <NumberedCircle :number="4"/>
            <h6 class="font-bold text-lg 2xl:text-xl">Prepare For Visit</h6>
            <span class="2xl:text-lg">Please be sure the vehicle is in a safe location with at least 3 feet
                            of room on each side.</span>
          </div>
        </div>

        <div
            class="bg-pale-pink dark:bg-gray-900 dark:text-white rounded-lg p-6 2xl:p-8 border border-vivid-red">
          <div class="space-y-2 2xl:space-y-4">
            <NumberedCircle :number="5"/>
            <h6 class="font-bold text-lg 2xl:text-xl">Kick back and relax!</h6>
            <span class="2xl:text-lg">Mobile Tire Pro will take care of the rest upon arrival.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>