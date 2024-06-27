<script setup>
let townList = [
    "Algonquin",
    "Barrington",
    "Carpentersville",
    "Crystal Lake",
    "Huntley",
    "Island Lake",
    "Johnsburg",
    "Lake in the Hills",
    "Lake Villa",
    "Lakemoor",
    "McHenry",
    "Richmond",
    "Ringwood",
    "Round Lake",
    "Spring Grove",
    "Volo",
    "Wonder Lake",
    "Woodstock"
]

var towns = [
    [42.3334, -88.2668], // McHenry
    [42.3925, -88.3654], // Wonder Lake
    [42.1917, -88.3239], // Lake in the Hills
    [42.1681, -88.4281], // Huntley
    [42.1656, -88.2945], // Algonquin
    [42.3166, -88.1568], // Volo
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
];

// Calculate the center point of the coverage area
var latSum = 0;
var lngSum = 0;
for (var i = 0; i < towns.length; i++) {
    latSum += towns[i][0];
    lngSum += towns[i][1];
}
var centralPoint = [latSum / towns.length, lngSum / towns.length];

// Calculate an appropriate radius to cover all the towns (approx 25 km radius)
var coverageRadius = 25000; // in meters

</script>

<template>
    <div class="max-w-6xl mx-auto p-4">
        <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-2/3">
                <LMap style="height: 400px" :zoom="10" :center="centralPoint" :use-global-leaflet="false">
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
                        layer-type="base" name="OpenStreetMap" />
                    <LCircle :lat-lng="centralPoint" :radius="coverageRadius" :color="'red'" />
                </LMap>
            </div>
            <div class="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg flex flex-col" style="height: 400px;">
                <h2 class="text-lg font-semibold mb-2">Cities We Service</h2>
                <div class="flex-grow overflow-auto">
                    <ul class="columns-2 gap-x-4 list-disc pl-5">
                        <li class="text-lg mb-1 break-inside-avoid" v-for="town in townList" :key="town">{{ town }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
Last edited just now