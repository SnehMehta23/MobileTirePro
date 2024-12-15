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
      'data-key': 'jwx4Ux/8zI8uMeuakw68/Q',
      defer: true
    }
  ]
})
</script>