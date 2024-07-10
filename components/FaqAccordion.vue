<template>
    <div class="faq-accordion">
        <div v-for="(item, index) in faqItems" :key="index" class="faq-item dark:text-white">
            <button @click="toggleItem(index)" class="faq-question" :aria-expanded="openItems[index]"
                :aria-controls="'faq-answer-' + index">
                {{ item.question }}
                <span class="icon">{{ openItems[index] ? '−' : '+' }}</span>
            </button>
            <div v-show="openItems[index]" :id="'faq-answer-' + index"
                class="faq-answer bg-dark-charcoal text-white dark:bg-white dark:text-dark-charcoal">
                {{ item.answer }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    faqItems: {
        type: Array,
        required: true,
        default: () => []
    }
})

const openItems = ref(props.faqItems.map(() => false))

const toggleItem = (index) => {
    openItems.value[index] = !openItems.value[index]
}
</script>

<style scoped>
.faq-item {
    border-bottom: 1px solid #e0e0e0;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-weight: bold;
}

.faq-question:hover {
    background-color: #f0f0f0;
}

.dark .faq-question:hover {
    background-color: crimson;
}

.icon {
    font-size: 1.5rem;
}

.faq-answer {
    padding: 1rem;

}
</style>