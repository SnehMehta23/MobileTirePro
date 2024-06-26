<template>
    <div class="flex justify-center gap-20 mt-8 ">
        <!-- Menu Section Sidebar -->
        <section class="border border-red-500">
            <div>Vehicle Info</div>
            <div>Billing Info</div>
        </section>

        <!-- Main Profile Widget -->
        <section class="border border-blue-500">
            <div class="border border-green-500">
                <!-- Profile Picture? Let's just do a simple OG twitter egg like profile pic for now -->
                <div class="border border-orange-500">
                    <div class="flex">
                        <div class="relative rounded-full overflow-hidden w-12 h-12 border-2 border-red-500">
                            <img class="absolute inset-0 w-full h-full object-cover" src="https://placeholder.com/64x64"
                                alt="">
                        </div>
                        <!-- Vehicle Tags -->
                        <div class="space-x-2">
                            <span class="bg-red-100">Tesla</span>
                            <span class="bg-red-100">Model 3</span>
                        </div>
                    </div>

                    <h3>Customer Name</h3>
                    <!-- History of Service -->
                    <div>
                        <div>
                            <h3>Vehicle Service History</h3>
                            <div class="flex">
                                <!-- category of services -->
                                <span>All</span>
                                <span>Maintenance</span>
                                <span>Upgrades</span>
                                <span>Repairs</span>
                            </div>
                        </div>

                        <!-- list container of services done -->
                        <div class="">
                            <!-- unordered bullet point list of services done -->
                            <ul class="">
                                <!-- service entries -->
                                <li></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Tire Info Section -->
                    <section>
                        <div>
                            <div>
                                <h6></h6>
                                <!-- Front Left Tire -->
                                <span></span>
                            </div>
                            <div>
                                <h6></h6>
                                <!-- Front Right Tire -->
                                <span></span>
                            </div>
                            <div>
                                <h6></h6>
                                <!-- Back Left Tire -->
                                <span></span>
                            </div>
                            <div>
                                <h6></h6>
                                <!-- Back Right Tire -->
                                <span></span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>