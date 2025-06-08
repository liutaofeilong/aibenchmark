<template>
  <div class="analysis-section">
    <h2 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h2>
    <p class="text-gray-600">{{ content }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.analysis-section {
  padding: 1rem 0;
}
</style> 