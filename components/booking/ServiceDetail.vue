<template>
    <div v-if="props.selectedService" class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all">

        <!-- Installation, Repair, or Single-Tire Services -->
        <div v-if="needsRimSelection" class="space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold dark:text-white">
                    {{ serviceTitle }}
                </h3>
                <div class="text-vivid-red font-bold">
                    {{ calculatePrice }}
                </div>
            </div>

            <!-- Rim Size Selection -->
            <div class="space-y-2">
                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
                    Rim Size
                    <button @mouseenter="showRimTip = true" @mouseleave="showRimTip = false"
                        class="ml-2 text-blue-500 hover:text-blue-600 text-sm">
                        (?)
                    </button>
                </label>
                <div v-if="showRimTip"
                    class="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-2">
                    Find your tire size on the driver's door placard or tire sidewall (e.g., 205/55/R16)
                </div>
                <select v-model="rimSize"
                    class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="" disabled>Select rim size</option>
                    <option v-for="size in rimSizes" :key="size" :value="size">
                        {{ size }} inches
                    </option>
                </select>
            </div>

            <!-- Tire Count Selection (for Installation) -->
            <div v-if="props.selectedService === 'installation'" class="space-y-2">
                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
                    Number of Tires
                </label>
                <select v-model="tireCount"
                    class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="" disabled>Select number of tires</option>
                    <option v-for="count in [1, 2, 3, 4]" :key="count" :value="count">
                        {{ count }} {{ count === 1 ? 'Tire' : 'Tires' }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Seasonal Changeover Options -->
        <div v-if="props.selectedService === 'changeover'" class="space-y-6">
            <h3 class="text-xl font-semibold dark:text-white">Select Changeover Type</h3>

            <div class="space-y-4">
                <div @click="selectChangeoverType('assembly')"
                    class="border p-4 rounded-lg cursor-pointer transition-all"
                    :class="changeoverType === 'assembly' ? 'border-vivid-red' : 'border-gray-200'">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold dark:text-white">Wheels/Tire Assemblies</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Complete wheel and tire sets</p>
                        </div>
                        <span class="text-vivid-red font-bold">$125</span>
                    </div>
                    <div class="mt-2 text-sm text-gray-500">
                        • Includes seasonal storage
                        • Complete assembly swap
                    </div>
                </div>

                <div @click="selectChangeoverType('tires')" class="border p-4 rounded-lg cursor-pointer transition-all"
                    :class="changeoverType === 'tires' ? 'border-vivid-red' : 'border-gray-200'">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold dark:text-white">Tires Only</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Tire swap on existing wheels</p>
                        </div>
                        <span class="text-vivid-red font-bold">From $150</span>
                    </div>
                    <div class="mt-2 text-sm text-gray-500">
                        • $25-30 per tire
                        • Includes storage
                        • Plus mobile service charge
                    </div>
                </div>
            </div>

            <div v-if="changeoverType === 'tires'" class="mt-4">
                <div class="rim-size-selection">
                    <!-- Reuse rim size selection component -->
                </div>
            </div>
        </div>

        <!-- Direct to Schedule (Rotation & Balance) -->
        <div v-if="props.selectedService === 'rotation'" class="space-y-4">
            <div class="flex justify-between items-center">
                <h3 class="text-xl font-semibold dark:text-white">Rotation & Balance Service</h3>
                <span class="text-vivid-red font-bold">$75</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
                Includes complete rotation and balancing service with mobile fee
            </p>
            <button @click="proceedToScheduling"
                class="w-full bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                Continue to Scheduling
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue' // Added watch import

const props = defineProps({
    selectedService: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['ready-for-scheduling'])

// State
const rimSize = ref('')
const tireCount = ref('')
const showRimTip = ref(false)
const changeoverType = ref('')

// Constants
const rimSizes = Array.from({ length: 11 }, (_, i) => i + 12) // 12 to 22 inches

// Computed
const needsRimSelection = computed(() => {
    return ['installation', 'repair'].includes(props.selectedService) ||
        (props.selectedService === 'changeover' && changeoverType.value === 'tires')
})

const serviceTitle = computed(() => {
    switch (props.selectedService) {
        case 'installation': return 'Tire Installation'
        case 'repair': return 'Tire Repair'
        case 'rotation': return 'Rotation & Balance'
        case 'changeover': return 'Seasonal Changeover'
        default: return ''
    }
})

const calculatePrice = computed(() => {
    if (props.selectedService === 'repair') return '$80'
    if (props.selectedService === 'rotation') return '$75'
    if (props.selectedService === 'changeover') {
        return changeoverType.value === 'assembly' ? '$125' : 'From $150'
    }
    // Installation price calculation would go here
    return 'Starting at $150'
})

// Methods
const selectChangeoverType = (type) => {
    changeoverType.value = type
}

const proceedToScheduling = () => {
    const serviceDetails = {
        service: props.selectedService,
        rimSize: rimSize.value,
        tireCount: tireCount.value,
        changeoverType: changeoverType.value
    }
    emit('ready-for-scheduling', serviceDetails)
}

// Watchers for validation and auto-proceed
watch([rimSize, tireCount, changeoverType], () => {
    if (props.selectedService === 'rotation') {
        proceedToScheduling()
    } else if (
        (needsRimSelection.value && rimSize.value &&
            (props.selectedService !== 'installation' || tireCount.value)) ||
        (props.selectedService === 'changeover' && changeoverType.value === 'assembly')
    ) {
        proceedToScheduling()
    }
})
</script>