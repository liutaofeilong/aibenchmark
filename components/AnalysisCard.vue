<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- Analysis Header -->
    <div class="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">{{ company }} Analysis</h2>
      
      <!-- Scores Grid -->
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-white rounded-xl p-6 shadow-md transition-all hover:shadow-lg">
          <div class="text-lg font-semibold text-blue-600 mb-2">Innovation</div>
          <div class="flex items-baseline">
            <span class="text-4xl font-bold text-blue-600">{{ scores?.innovation || 0 }}</span>
            <span class="text-xl text-gray-400 ml-1">/10</span>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md transition-all hover:shadow-lg">
          <div class="text-lg font-semibold text-green-600 mb-2">Growth</div>
          <div class="flex items-baseline">
            <span class="text-4xl font-bold text-green-600">{{ scores?.growth || 0 }}</span>
            <span class="text-xl text-gray-400 ml-1">/10</span>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md transition-all hover:shadow-lg">
          <div class="text-lg font-semibold text-purple-600 mb-2">Business</div>
          <div class="flex items-baseline">
            <span class="text-4xl font-bold text-purple-600">{{ scores?.business || 0 }}</span>
            <span class="text-xl text-gray-400 ml-1">/10</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Content -->
    <div class="p-8">
      <div v-if="!analysis" class="text-gray-500 text-center py-8">
        No analysis content available
      </div>
      <div v-else class="space-y-8">
        <div v-for="(section, index) in parsedAnalysis" :key="index" 
             class="analysis-section bg-white rounded-lg p-6 border border-gray-100 hover:border-gray-200 transition-all">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold mr-4 shadow-md">
              {{ index + 1 }}
            </div>
            <h3 class="text-2xl font-bold text-gray-800">{{ section.title }}</h3>
          </div>
          <div class="pl-14">
            <div class="space-y-4">
              <div v-for="(item, idx) in section.items" :key="idx" 
                   class="flex items-start group">
                <div class="w-2 h-2 mt-2.5 rounded-full bg-blue-500 mr-3 group-hover:bg-blue-600 transition-colors"></div>
                <div class="flex-1">
                  <span class="font-semibold text-gray-900">{{ item.label }}</span>
                  <span class="mx-2 text-gray-400">•</span>
                  <span class="text-gray-600">{{ item.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-8 py-4 bg-gray-50 border-t border-gray-100">
      <div class="flex justify-between items-center text-sm text-gray-500">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16.5V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8.5V6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 14.5C13.1046 14.5 14 13.6046 14 12.5C14 11.3954 13.1046 10.5 12 10.5C10.8954 10.5 10 11.3954 10 12.5C10 13.6046 10.8954 14.5 12 14.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Model: {{ model || 'Unknown' }}</span>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ timestamp ? new Date(timestamp).toLocaleString() : 'No timestamp' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  company: string
  analysis: string
  scores: {
    innovation: number
    growth: number
    business: number
  }
  model: string
  timestamp: string
}>()

// Parse analysis content into structured sections
const parsedAnalysis = computed(() => {
  if (!props.analysis) return [];

  // Extract scores from the content
  const scoreMatches = props.analysis.match(/\*\*(Innovation|Growth|Business).+?(\d+)\/10/g);
  if (scoreMatches) {
    const scores = {
      innovation: 0,
      growth: 0,
      business: 0
    };
    scoreMatches.forEach(match => {
      const numberMatch = match.match(/(\d+)\/10/);
      if (!numberMatch) return;
      
      const score = parseInt(numberMatch[1]);
      if (match.includes('Innovation')) {
        scores.innovation = score;
      } else if (match.includes('Growth')) {
        scores.growth = score;
      } else if (match.includes('Business')) {
        scores.business = score;
      }
    });
    // Update the parent scores object
    Object.assign(props.scores, scores);
  }

  const sections: {
    title: string;
    items: { label: string; content: string }[];
  }[] = [];

  // Split content into sections
  const sectionMatches = props.analysis.split(/####\s+\*\*/).filter(Boolean);
  
  sectionMatches.forEach(section => {
    const lines = section
      .replace(/###\s*\*\*|\*\*/g, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.includes('Score:'));

    if (lines.length > 0) {
      const titleMatch = lines[0].match(/(\d+\.\s*)?(.+)/);
      const title = titleMatch ? titleMatch[2] : lines[0];
      
      const items = lines.slice(1)
        .filter(line => line.startsWith('-'))
        .map(line => {
          const [label, ...contentParts] = line.substring(2).split(':');
          return {
            label: label.replace(/\*\*/g, '').trim(),
            content: contentParts.join(':').replace(/\*\*/g, '').trim()
          };
        })
        .filter(item => item.label && item.content); // Only include items with both label and content

      if (items.length > 0) {
        sections.push({
          title,
          items
        });
      }
    }
  });

  return sections;
});
</script>

<style scoped>
.analysis-section:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
}
</style> 