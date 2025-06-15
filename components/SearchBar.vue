<template>
  <div class="max-w-4xl mx-auto">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter company name and press Enter to analyze..."
        :disabled="loading"
        @keyup.enter="handleSearch"
      />
      <button
        @click="handleSearch"
        :disabled="loading || !searchQuery.trim()"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analyzing...
        </span>
        <span v-else>Analyze</span>
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
      <div class="font-bold mb-2">Error:</div>
      <div class="whitespace-pre-wrap">{{ error }}</div>
    </div>

    <!-- Analysis Result -->
    <div v-if="response" class="mt-4">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="font-bold text-xl mb-4">Analysis Result</div>
        <div class="prose max-w-none">
          <div class="whitespace-pre-wrap">{{ response }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDeepseek } from '~/composables/useDeepseek'

const searchQuery = ref('')
const { callDeepseek, loading, error, response } = useDeepseek()

const handleSearch = async () => {
  if (!searchQuery.value.trim() || loading.value) return
  
  try {
    await callDeepseek(searchQuery.value)
  } catch (e) {
    console.error('Error in search:', e)
  }
}
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style> 