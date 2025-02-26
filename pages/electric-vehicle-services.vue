<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-[350px] bg-gray-900">
            <img src="../public/images/electricVehicle.jpg" alt="EV Tire Services"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/60"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Specialized EV Tire Services
                </h1>
                <p class="text-xl text-white max-w-3xl mx-auto mb-8">
                    Mobile tire installation and seasonal changeovers optimized for electric vehicles
                </p>
                <NuxtLink to="/bookings"
                    class="bg-vivid-red hover:bg-vivid-red/90 text-white text-lg font-medium rounded-lg transition-all transform hover:scale-105 block w-[220px] py-4 !important">
                    <span class="inline-block px-6">Book Service &#8594;</span>
                </NuxtLink>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 py-16 my-4">
            <!-- Service Description -->
            <div class="bg-white rounded-xl shadow-xl p-8 md:p-12 mb-16">
                <div class="flex flex-col md:flex-row gap-10 items-center">
                    <div class="md:w-1/2">
                        <div class="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">Experienced EV Service</div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Tire Services Tailored for Electric Vehicles</h2>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            Electric vehicles have unique tire requirements due to their instant torque, heavier weight, and the importance of maximizing range. Have peace of mind knowing that our technician is experienced with EVs.
                        </p>
                        <div class="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-800 font-medium">Low rolling resistance tire options</span>
                        </div>
                        <div class="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-800 font-medium">EV-specific load ratings & specifications</span>
                        </div>
                        <div class="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-800 font-medium">Noise reduction technology for quieter rides</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-800 font-medium">Mobile service that preserves your battery charge</span>
                        </div>
                    </div>
                    <div class="md:w-1/2">
                        <img src="/images/tire-installation-service.jpg" alt="EV Tire Services"
                            class="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-10">Our EV Tire Services</h2>
                
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <!-- Tab Navigation -->
                    <div class="flex border-b">
                        <button @click="activeTab = 'installation'" 
                                :class="[
                                    'flex-1 py-4 px-6 text-center font-medium transition-colors',
                                    activeTab === 'installation' ? 'text-vivid-red border-b-2 border-vivid-red' : 'text-gray-500 hover:text-gray-700'
                                ]">
                            Installation
                        </button>
                        <button @click="activeTab = 'changeover'" 
                                :class="[
                                    'flex-1 py-4 px-6 text-center font-medium transition-colors',
                                    activeTab === 'changeover' ? 'text-vivid-red border-b-2 border-vivid-red' : 'text-gray-500 hover:text-gray-700'
                                ]">
                            Seasonal Changeover
                        </button>
                        <button @click="activeTab = 'maintenance'" 
                                :class="[
                                    'flex-1 py-4 px-6 text-center font-medium transition-colors',
                                    activeTab === 'maintenance' ? 'text-vivid-red border-b-2 border-vivid-red' : 'text-gray-500 hover:text-gray-700'
                                ]">
                            Maintenance
                        </button>
                    </div>
                    
                    <!-- Tab Content - Installation -->
                    <div v-if="activeTab === 'installation'" class="p-6 md:p-8">
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="md:w-1/2">
                                <h3 class="text-2xl font-bold mb-4">EV Tire Installation</h3>
                                <p class="text-gray-700 mb-6">
                                    Our EV tire installation service brings expert experience to your location, equipped with specialized tools and knowledge for electric vehicles. We understand the unique requirements of EVs and select tires that maximize both performance and range.
                                </p>
                                
                                <div class="mb-6">
                                    <h4 class="font-bold text-lg mb-3">What's Included:</h4>
                                    <ul class="space-y-3">
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Precise torque specifications for EVs</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strocke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">EV-specific wheel balancing techniques</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Advanced TPMS programming & calibration</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Range optimization consultation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="md:w-1/2">
                                <img src="/images/electricVehicle.jpg" alt="EV Tire Installation" class="rounded-lg w-full h-auto" />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Content - Seasonal Changeover -->
                    <div v-if="activeTab === 'changeover'" class="p-6 md:p-8">
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="md:w-1/2">
                                <h3 class="text-2xl font-bold mb-4">Seasonal Tire Changeover for EVs</h3>
                                <p class="text-gray-700 mb-6">
                                    Switch between summer and winter tires with our specialized EV changeover service. We ensure your electric vehicle has the right tires for the season, optimizing both safety and efficiency while preserving your vehicle's range.
                                </p>
                                
                                <div class="mb-6">
                                    <h4 class="font-bold text-lg mb-3">What's Included:</h4>
                                    <ul class="space-y-3">
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Complete tire swap with proper torque specs</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Computerized balancing for optimal efficiency</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Condition inspection of both tire sets</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Optional off-season tire storage</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="md:w-1/2">
                                <img src="/images/winter-tires.jpg" alt="EV Seasonal Tire Changeover" class="rounded-lg w-full h-auto" />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Content - Maintenance -->
                    <div v-if="activeTab === 'maintenance'" class="p-6 md:p-8">
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="md:w-1/2">
                                <h3 class="text-2xl font-bold mb-4">EV Tire Maintenance</h3>
                                <p class="text-gray-700 mb-6">
                                    Regular tire maintenance is crucial for maximizing your EV's range and performance. Our mobile service makes it easy to keep your tires in optimal condition with regular pressure checks, rotations, and inspections.
                                </p>
                                
                                <div class="mb-6">
                                    <h4 class="font-bold text-lg mb-3">What's Included:</h4>
                                    <ul class="space-y-3">
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Precision tire rotation for even wear</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Optimal pressure adjustment for efficiency</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Tread depth and wear pattern analysis</span>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span class="text-gray-700">Range efficiency report and recommendations</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="md:w-1/2">
                                <img src="/images/electricVehicle.jpg" alt="EV Tire Maintenance" class="rounded-lg w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- EV Tire Brands -->
            <div class="mb-16 bg-white rounded-xl shadow-xl p-8 md:p-12">
                <h2 class="text-3xl font-bold text-center mb-10">Top EV-Optimized Tire Brands</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="flex flex-col items-center">
                        <img src="../public/images/Michelin_Corporate_Logo___color.jpg" alt="Michelin" class="h-16 object-contain mx-auto mb-4" />
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="../public/images/goodyear-logo-yellow.png" alt="Goodyear" class="h-12 object-contain mx-auto mb-4" />
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="../public/images/BridgestoneMark-Black.png" alt="Bridgestone" class="h-12 object-contain mx-auto mb-4" />
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="../public/images/logo-pirelli2x.jpg" alt="Pirelli" class="h-12 object-contain mx-auto mb-4" />
                    </div>
                </div>
                <div class="text-center mt-8">
                    <p class="text-gray-600 max-w-3xl mx-auto">
                        We stock and install specialized EV tires designed to minimize rolling resistance, handle higher torque, support additional weight, and reduce road noise - all while maximizing your vehicle's range.
                    </p>
                </div>
            </div>

            <!-- Why Choose Us for EV Tires -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">Why Choose Our EV Tire Services</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg shadow-md p-8">
                        <div class="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-4">EV Specialists</h3>
                        <p class="text-gray-600">Our technician is experienced and trained on EV tire requirements, with knowledge of models like Tesla, Rivian, and all major EV manufacturers.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-8">
                        <div class="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-4">Range Preservation</h3>
                        <p class="text-gray-600">We come to you, eliminating the need to drive to a service center and preserving your valuable battery charge for what matters.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-8">
                        <div class="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-4">Efficiency Focus</h3>
                        <p class="text-gray-600">We help select and maintain tires that maximize efficiency, potentially improving range by 5-10% compared to non-optimized options.</p>
                    </div>
                </div>
            </div>

            <!-- EV FAQs -->
            <div class="mb-16 bg-white rounded-xl shadow-xl p-8 md:p-12">
                <h2 class="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                
                <div class="space-y-6 max-w-4xl mx-auto">
                    <div class="border-b pb-4">
                        <h3 class="text-lg font-semibold mb-2">Why do EVs need special tires?</h3>
                        <p class="text-gray-600">
                            Electric vehicles have unique requirements including supporting heavier vehicle weight, handling instant torque, reducing rolling resistance for better range, and minimizing road noise due to the quiet EV powertrain. Special EV tires are designed to address these specific needs.
                        </p>
                    </div>
                    
                    <div class="border-b pb-4">
                        <h3 class="text-lg font-semibold mb-2">How much can the right tires improve my EV's range?</h3>
                        <p class="text-gray-600">
                            The right EV-optimized tires can improve range by 5-10% compared to standard tires. This is achieved through advanced compounds and tread designs that minimize rolling resistance while maintaining grip and safety.
                        </p>
                    </div>
                    
                    <div class="border-b pb-4">
                        <h3 class="text-lg font-semibold mb-2">Do you service all EV models?</h3>
                        <p class="text-gray-600">
                            Yes, our technician is trained to work with all EV models including Tesla, Rivian, Lucid, Ford Mustang Mach-E, Chevrolet Bolt, Nissan Leaf, Hyundai Ioniq, Kia EV6, and all other electric vehicles on the market.
                        </p>
                    </div>
                    
                    <div class="border-b pb-4">
                        <h3 class="text-lg font-semibold mb-2">Is tire rotation more important for EVs?</h3>
                        <p class="text-gray-600">
                            Yes, EVs often experience accelerated tire wear, especially on the drive wheels, due to the instant torque delivery. Regular rotation is crucial to ensure even wear, maximize tire life, and maintain consistent range performance.
                        </p>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Do you offer sustainable or eco-friendly tire options?</h3>
                        <p class="text-gray-600">
                            We offer several eco-friendly tire options that use sustainable materials and manufacturing processes, complementing the environmental benefits of driving an electric vehicle. Ask our team about the latest green tire technologies.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section with EV Focus -->
        <div class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-6">Maximize Your EV's Performance & Range</h2>
                <p class="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                    The right tires make all the difference for your electric vehicle. Let our mobile experts bring EV-optimized tire service directly to your location.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <NuxtLink to="/bookings"
                        class="inline-block bg-vivid-red hover:bg-vivid-red/90 text-white text-lg font-medium px-8 py-4 rounded-lg transition-all transform hover:scale-105">
                        Schedule Service
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// State for the active tab
const activeTab = ref('installation')

useHead({
  title: 'Electric Vehicle Tire Services | Specialized EV Mobile Tire Installation',
  meta: [
    { 
      name: 'description', 
      content: 'Specialized mobile tire services for electric vehicles. EV-optimized installation, seasonal changeovers, and maintenance that maximize range and performance with low rolling resistance options.'
    },
    // Additional meta tags
    { name: 'keywords', content: 'EV tire services, electric vehicle tires, Tesla tire installation, EV range optimization, low rolling resistance tires' },
    { property: 'og:title', content: 'Specialized EV Tire Services | Mobile Installation & Changeovers' },
    { property: 'og:description', content: 'Mobile tire installation and seasonal changeovers optimized for electric vehicles. Expert service that comes to you and preserves your battery charge.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
