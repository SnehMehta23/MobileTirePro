<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[300px] bg-gray-900">
            <img src="../public/images/fleet.webp" alt="Fleet Services"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/40"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center -top-5">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">
                    Fleet Tire Services
                </h1>
                <div class="bg-red-100 text-red-600 px-6 py-3 rounded-md max-w-3xl">
                    Keep your business moving with our specialized fleet tire services. Priority scheduling, competitive
                    pricing, and fast turnaround times.
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-12">
            <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
                <div class="mb-10 max-w-3xl mx-auto">
                    <h2 class="text-3xl font-semibold text-center mb-6">Fleet Service Advantages</h2>
                    <p class="text-lg text-gray-700 mb-6">
                        We offer priority service and discounted labor rates for our fleet customers. Our team works
                        diligently to ensure your vehicles are done quickly and safely, minimizing downtime and keeping
                        your business moving forward.
                    </p>
                    <div class="grid md:grid-cols-3 gap-6 mt-8">
                        <div class="bg-gray-50 p-6 rounded-lg text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-vivid-red"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="font-bold text-lg mb-2">Priority Scheduling</h3>
                            <p class="text-gray-600">Fleet customers get prioritized service to minimize downtime</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-vivid-red"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="font-bold text-lg mb-2">Discounted Rates</h3>
                            <p class="text-gray-600">Special pricing structure for businesses with multiple vehicles</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-vivid-red"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 class="font-bold text-lg mb-2">Simplified Billing</h3>
                            <p class="text-gray-600">Consolidated invoicing and detailed reporting</p>
                        </div>
                    </div>
                </div>

                <form name="fleet-services" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"
                    class="max-w-4xl mx-auto">
                    <input type="hidden" name="form-name" value="fleet-services" />

                    <h3 class="text-2xl font-semibold text-center mb-8">Want to learn more? Fill out the form below, and
                        we will reach out to you shortly!</h3>

                    <div class="grid gap-6 md:grid-cols-2">
                        <div>
                            <label for="business_name" class="block mb-2 text-sm font-medium text-gray-900">
                                Business Name
                            </label>
                            <input type="text" id="business_name" name="businessName"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-vivid-red focus:border-vivid-red block w-full p-2.5"
                                required />
                        </div>

                        <div>
                            <label for="associate_name" class="block mb-2 text-sm font-medium text-gray-900">
                                Name of associate filling this out
                            </label>
                            <input type="text" id="associate_name" name="associateName"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>

                        <div>
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-900">
                                Role (Within Company)
                            </label>
                            <input type="text" id="role" name="role"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>

                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">
                                Phone Number
                            </label>
                            <input type="tel" id="phone" name="phoneNumber"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="(123) 456-7890" required />
                        </div>

                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                                Email Address
                            </label>
                            <input type="email" id="email" name="email"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="contact@company.com" required />
                        </div>

                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900">
                                Address
                            </label>
                            <input type="text" id="address" name="address"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>

                        <div>
                            <label for="vehicles" class="block mb-2 text-sm font-medium text-gray-900">
                                How many vehicles
                            </label>
                            <input type="number" id="vehicles" name="vehicleCount" min="1"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>

                        <div>
                            <label for="trailers" class="block mb-2 text-sm font-medium text-gray-900">
                                How many trailers
                            </label>
                            <input type="number" id="trailers" name="trailerCount" min="0"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value="0" />
                        </div>

                        <div>
                            <label for="preferred_time" class="block mb-2 text-sm font-medium text-gray-900">
                                Preferred time for installations
                            </label>
                            <select id="preferred_time" name="preferredTime"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required>
                                <option value="">Select preferred time</option>
                                <option value="morning">Morning (8am - 12pm)</option>
                                <option value="afternoon">Afternoon (12pm - 5pm)</option>
                                <option value="evening">Evening (5pm - 8pm)</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>

                        <div class="md:col-span-2">
                            <label for="notes" class="block mb-2 text-sm font-medium text-gray-900">
                                Additional Information
                            </label>
                            <textarea id="notes" name="notes" rows="4"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Please share any specific requirements, challenges, or questions..."></textarea>
                        </div>

                        <div class="md:col-span-2 mt-6">
                            <button type="submit"
                                class="w-full bg-vivid-red hover:bg-vivid-red/90 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                                Request Fleet Service Information
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="bg-white rounded-lg shadow p-8">
                <h2 class="text-2xl font-semibold text-center mb-8">Why Choose Our Fleet Services</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="flex gap-4">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Mobile Service</h3>
                            <p class="text-gray-600">We come to your location, saving you time and hassle with
                                transportation logistics.</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Volume Discounts</h3>
                            <p class="text-gray-600">The more vehicles in your fleet, the more you save on each service.
                            </p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Dedicated Account Manager</h3>
                            <p class="text-gray-600">A single point of contact for all your fleet service needs.</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Preventative Maintenance</h3>
                            <p class="text-gray-600">Regular inspections and maintenance to prevent costly downtime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>