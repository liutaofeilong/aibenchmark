<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- Analysis Header -->
    <div class="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="flex justify-between items-start mb-8">
        <h2 class="text-3xl font-bold text-gray-900">{{ company }} Analysis</h2>
        <div class="flex space-x-2">
          <button 
            @click="handleEmail"
            class="inline-flex items-center px-3 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            :disabled="sending"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ sending ? 'Sending...' : 'Email Report' }}
          </button>
          <button 
            @click="toggleFavorite"
            class="inline-flex items-center px-3 py-2 border rounded-lg transition-colors"
            :class="[
              favorited 
                ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-50' 
                : 'border-gray-300 text-gray-500 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                :fill="favorited ? 'currentColor' : 'none'" 
                d="M11.4805 3.49883C11.6332 3.18883 11.8053 2.92081 12.0001 2.70081C12.1949 2.92081 12.367 3.18883 12.5197 3.49883C13.1542 4.77431 13.9715 5.95931 14.9501 7.01883L15.5501 7.67883C16.5286 8.65738 17.6355 9.47493 18.8301 10.1088C19.1873 10.2901 19.5361 10.4887 19.8501 10.7088C19.7749 10.9555 19.6653 11.1873 19.5301 11.3988C18.7501 12.5988 17.5301 13.4288 16.1701 14.0788C15.0189 14.6492 13.9466 15.3742 12.9801 16.2388L12.0001 17.0688L11.0201 16.2388C10.0536 15.3742 8.98129 14.6492 7.83007 14.0788C6.47007 13.4288 5.25007 12.5988 4.47007 11.3988C4.33487 11.1873 4.22525 10.9555 4.15007 10.7088C4.46407 10.4887 4.81287 10.2901 5.17007 10.1088C6.36466 9.47493 7.47161 8.65738 8.45007 7.67883L9.05007 7.01883C10.0286 5.95931 10.8459 4.77431 11.4805 3.49883Z" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      
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
import { computed, ref, onMounted } from 'vue'
import { useFavorites } from '../composables/useFavorites'

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

const sending = ref(false)
const { isFavorite, addFavorite, removeFavorite } = useFavorites()

const favorited = computed(() => isFavorite(props.company))

const handleEmail = async () => {
  sending.value = true
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: `${props.company} Analysis Report`,
        content: `
          <h1>${props.company} Analysis Report</h1>
          <div style="margin: 20px 0;">
            <h2>Scores</h2>
            <div style="display: flex; gap: 20px; margin: 10px 0;">
              <div>
                <div style="color: #3B82F6;">Innovation</div>
                <div style="font-size: 24px; font-weight: bold;">${props.scores.innovation}/10</div>
              </div>
              <div>
                <div style="color: #22C55E;">Growth</div>
                <div style="font-size: 24px; font-weight: bold;">${props.scores.growth}/10</div>
              </div>
              <div>
                <div style="color: #A855F7;">Business</div>
                <div style="font-size: 24px; font-weight: bold;">${props.scores.business}/10</div>
              </div>
            </div>
          </div>
          <div style="margin: 20px 0;">
            <h2>Analysis Details</h2>
            ${props.analysis.replace(/\n/g, '<br>')}
          </div>
          <div style="color: #6B7280; font-size: 14px; margin-top: 20px;">
            Generated by ${props.model} at ${new Date(props.timestamp).toLocaleString()}
          </div>
        `
      })
    })

    const result = await response.json()
    
    if (result.success) {
      if (result.previewUrl) {
        window.open(result.previewUrl, '_blank')
      } else {
        alert('Analysis report has been sent!')
      }
    } else {
      throw new Error(result.error)
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    alert('Failed to send email. Please try again.')
  } finally {
    sending.value = false
  }
}

const toggleFavorite = () => {
  if (favorited.value) {
    removeFavorite(props.company)
  } else {
    addFavorite({
      company: props.company,
      analysis: props.analysis,
      scores: props.scores,
      model: props.model,
      timestamp: props.timestamp
    })
  }
}

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