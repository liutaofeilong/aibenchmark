<template>
  <div class="max-w-4xl mx-auto">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter company name for analysis..."
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
      <div v-if="debugInfo" class="mt-2 text-sm border-t border-red-200 pt-2">
        <div class="font-semibold">Debug Information:</div>
        <pre class="mt-1 overflow-auto">{{ debugInfo }}</pre>
      </div>
    </div>

    <!-- Analysis Result -->
    <div v-if="result" class="mt-6">
      <AnalysisCard
        :company="searchQuery"
        :analysis="result.analysis"
        :scores="result.scores"
        :model="result.model"
        :timestamp="result.timestamp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCompanyAnalysis } from '~/composables/useCompanyAnalysis'
import AnalysisCard from './AnalysisCard.vue'

const searchQuery = ref('')
const result = ref<any>(null)
const debugInfo = ref<string>('')
const { analyzeCompany, isAnalyzing: loading, error } = useCompanyAnalysis()

const handleSearch = async () => {
  if (!searchQuery.value.trim() || loading.value) return
  
  debugInfo.value = ''
  try {
    result.value = await analyzeCompany(searchQuery.value)
    if (!result.value) {
      debugInfo.value = 'Analysis returned null result'
    } else if (!result.value.analysis) {
      debugInfo.value = 'Analysis response missing content'
    }
  } catch (e) {
    console.error('Error in search:', e)
    debugInfo.value = e instanceof Error ? e.stack : String(e)
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