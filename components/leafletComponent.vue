<script setup>
let townList = [
    "Algonquin",
    "Antioch",
    "Barrington",
    "Carpentersville",
    "Cary",
    "Crystal Lake",
    "Grayslake",
    "Gurnee",
    "Huntley",
    "Hawthorne Woods",
    "Island Lake",
    "Johnsburg",
    "Lake in the Hills",
    "Lake Villa",
    "Lake Zurich",
    "Lakemoor",
    "McHenry",
    "Richmond",
    "Ringwood",
    "Round Lake",
    "Spring Grove",
    "Volo",
    "Wauconda",
    "Wonder Lake",
    "Woodstock"
]

var towns = [
    [42.3334, -88.2668], // McHenry
    [42.4845, -88.0964], // Antioch (new)
    [42.3925, -88.3654], // Wonder Lake
    [42.1917, -88.3239], // Lake in the Hills
    [42.1681, -88.4281], // Huntley
    [42.1656, -88.2945], // Algonquin
    [42.3166, -88.1568], // Volo
    [42.3456, -88.0434], // Grayslake (new)
    [42.3703, -87.9019], // Gurnee (new)
    [42.1967, -88.0884], // Lake Zurich
    [42.1921, -88.0711], // Hawthorne Woods (new)
    [42.3536, -88.0934], // Round Lake
    [42.4167, -88.0731], // Lake Villa
    [42.1539, -88.1362], // Barrington
    [42.2411, -88.3162], // Crystal Lake
    [42.3147, -88.4487], // Woodstock
    [42.4794, -88.3076], // Richmond
    [42.3211, -88.2051], // Lakemoor
    [42.1211, -88.2579], // Carpentersville
    [42.2761, -88.2087], // Island Lake
    [42.4022, -88.3162], // Ringwood
    [42.3911, -88.2415], // Johnsburg
    [42.4447, -88.2365], // Spring Grove
    [42.2078, -88.2395], // Cary
    [42.2592, -88.1387]  // Wauconda
];

// Calculate the center point of the coverage area
var latSum = 0;
var lngSum = 0;
for (var i = 0; i < towns.length; i++) {
    latSum += towns[i][0];
    lngSum += towns[i][1];
}
var centralPoint = [latSum / towns.length, lngSum / towns.length];

// Calculate an appropriate radius to cover all the towns (approx 30 km radius)
// Increased from 25km to 30km to account for wider coverage area including Gurnee
var coverageRadius = 30000; // in meters

</script>

<template>
    <div class="max-w-6xl mx-auto p-4 text-dark-charcoal">
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Map Section -->
            <div class="w-full md:w-2/3">
                <LMap style="height: 500px" :zoom="10" :center="centralPoint" :use-global-leaflet="false"
                    class="rounded-xl shadow-lg">
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
                        layer-type="base" name="OpenStreetMap" />
                    <LCircle :lat-lng="centralPoint" :radius="coverageRadius" :color="'red'" />
                </LMap>
            </div>

            <!-- Cities Section -->
            <div class="w-full md:w-1/3">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[500px] flex flex-col">
                    <div class="border-b dark:border-gray-700 pb-4 mb-4">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Cities We Service</h2>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            Serving {{ townList.length }} communities in McHenry County and surrounding areas
                        </p>
                    </div>

                    <div class="flex-grow overflow-y-auto custom-scrollbar">
                        <div class="grid grid-cols-2 gap-x-2 gap-y-1">
                            <div v-for="town in townList" :key="town"
                                class="flex items-center space-x-1 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-red-500 flex-shrink-0"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <span class="text-gray-700 dark:text-gray-300 text-sm truncate">{{ town }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #94A3B8 #F1F5F9;
    overflow-y: scroll !important;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    background-color: #F1F5F9;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #F1F5F9;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #94A3B8;
    border-radius: 4px;
    border: 2px solid #F1F5F9;
}

.dark .custom-scrollbar {
    scrollbar-color: #4B5563 #1F2937;
}

.dark .custom-scrollbar::-webkit-scrollbar {
    background-color: #1F2937;
}

.dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #1F2937;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4B5563;
    border: 2px solid #1F2937;
}
</style>