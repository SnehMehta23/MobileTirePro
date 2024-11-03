<template>
  <!-- Promotional Banner -->
  <div v-if="data" class="w-full bg-vivid-red text-white text-center py-2 font-bold">
    {{ data.text }}
  </div>
</template>

<script setup>
const {data} = useLazyFetch('/api/settings/list', {server: false})
</script>