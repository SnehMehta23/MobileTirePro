<!-- AdBannerRandom.vue -->
<template>
    <div v-if="selectedBanner" class="ad-banner-container">
        <iframe :src="iframeSrc" :width="selectedBanner.width" :height="selectedBanner.height" frameborder="0"
            scrolling="no" :title="selectedBanner.altText"></iframe>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Banner {
    adLink: string;
    imageSource: string;
    width: number;
    height: number;
    altText: string;
    scriptSource: string;
}

const props = defineProps<{
    banners: Banner[];
}>();

const selectedBanner = ref<Banner | null>(null);
const iframeSrc = ref('');

const selectRandomBanner = () => {
    const randomIndex = Math.floor(Math.random() * props.banners.length);
    return props.banners[randomIndex];
};

onMounted(() => {
    selectedBanner.value = selectRandomBanner();

    if (selectedBanner.value) {
        const iframeContent = `
        <html>
          <head>
            <script type="text/javascript" src="${selectedBanner.value.scriptSource}"><\/script>
          </head>
          <body style="margin:0; padding:0;">
            <a href="${selectedBanner.value.adLink}" target="_top">
              <img src="${selectedBanner.value.imageSource}" width="${selectedBanner.value.width}" height="${selectedBanner.value.height}" alt="${selectedBanner.value.altText}" border="0" />
            </a>
          </body>
        </html>
      `;

        const blob = new Blob([iframeContent], { type: 'text/html' });
        iframeSrc.value = URL.createObjectURL(blob);
    }
});

onUnmounted(() => {
    if (iframeSrc.value) {
        URL.revokeObjectURL(iframeSrc.value);
    }
});
</script>

<style scoped>
.ad-banner-container {
    margin: 1rem auto;
    border: 1px solid #e2e8f0;
}
</style>