<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://analytics.ahrefs.com/analytics.js',
      'data-key': 'Erhl4Y2wj+tly5AEGz/AQw',
      defer: true
    }
  ]
})
</script>
