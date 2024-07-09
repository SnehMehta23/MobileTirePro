<!-- CarSelectorForm.vue -->
<template>
    <div
        class="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md dark:border-none border border-gray-200">
        <h3 class="text-xl font-semibold dark:text-white text-dark-charcoal mb-4">Select your vehicle</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-3 gap-4">
                <div v-for="(field, index) in ['year', 'make', 'model']" :key="index">
                    <label :for="field"
                        class="block text-sm font-medium text-dark-charcoal dark:text-white mb-1 capitalize">{{ field
                        }}</label>
                    <select :id="field" v-model="formData[field]"
                        class="w-full p-2 text-sm border border-gray-300 rounded-md text-dark-charcoal dark:text-dark-charcoal focus:ring-vivid-red focus:border-vivid-red">
                        <option value="">Select {{ field }}</option>
                        <!-- Add options dynamically -->
                    </select>
                </div>
            </div>
            <div class="flex justify-end">
                <!-- TODO add a event here that when u fill out the car and make you have the bottom extends slightly and shows the potential price -->
                <button type="submit"
                    class="px-6 py-2 text-sm bg-vivid-red text-white rounded-full hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
                    Check Quote
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>

const formData = {
    year: '',
    make: '',
    model: ''
}

const handleSubmit = () => {
    console.log('Selected:', formData)
}
</script>