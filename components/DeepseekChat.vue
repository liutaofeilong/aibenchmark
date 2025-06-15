<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="mb-4">
      <input
        v-model="companyName"
        type="text"
        class="w-full p-2 border rounded-lg"
        placeholder="输入公司名称，按回车键分析..."
        :disabled="loading"
        @keydown.enter="handleSubmit"
      />
    </div>
    
    <div class="flex justify-between items-center mb-4">
      <button
        @click="handleSubmit"
        :disabled="loading || !companyName.trim()"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          分析中...
        </span>
        <span v-else>开始分析</span>
      </button>
      <button
        v-if="response || error"
        @click="clearAll"
        class="text-gray-500 hover:text-gray-700"
      >
        清除
      </button>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
      <div class="font-bold mb-2">错误信息：</div>
      <div class="whitespace-pre-wrap">{{ error }}</div>
    </div>

    <div v-if="response" class="mt-4">
      <div class="bg-gray-100 rounded-lg p-4">
        <div class="font-bold mb-2">分析结果：</div>
        <div class="whitespace-pre-wrap">{{ response }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDeepseek } from '~/composables/useDeepseek'

const companyName = ref('')
const { callDeepseek, loading, error, response } = useDeepseek()

const handleSubmit = async () => {
  if (!companyName.value.trim() || loading.value) return
  
  try {
    await callDeepseek(companyName.value)
  } catch (e) {
    console.error('Error in component:', e)
  }
}

const clearAll = () => {
  companyName.value = ''
  response.value = null
  error.value = null
}
</script> 