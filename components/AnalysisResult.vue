<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Company Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 flex-shrink-0">
            <img :src="company.logo || '/default-company.png'" :alt="company.name + ' logo'" class="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ company.name }}</h2>
            <span class="inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full" 
                  :class="getCategoryClass(company.category)">
              {{ company.category }}
            </span>
          </div>
        </div>
        <div class="flex space-x-6">
          <div class="text-center">
            <div class="text-blue-600 font-medium">Innovation</div>
            <div class="text-2xl font-bold mt-1">{{ company.scores.innovation }}/10</div>
          </div>
          <div class="text-center">
            <div class="text-green-600 font-medium">Growth</div>
            <div class="text-2xl font-bold mt-1">{{ company.scores.growth }}/10</div>
          </div>
          <div class="text-center">
            <div class="text-purple-600 font-medium">Business</div>
            <div class="text-2xl font-bold mt-1">{{ company.scores.business }}/10</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Steps -->
    <div class="p-6">
      <div class="space-y-8">
        <!-- Step 1: Problem & Solution -->
        <div class="analysis-step">
          <div class="step-header">
            <div class="step-number">1</div>
            <h3 class="step-title">Problem & Solution</h3>
          </div>
          <div class="step-content">
            <p class="text-gray-700">{{ company.problem }}</p>
          </div>
        </div>

        <!-- Step 2: Target Users -->
        <div class="analysis-step">
          <div class="step-header">
            <div class="step-number">2</div>
            <h3 class="step-title">Target Users</h3>
          </div>
          <div class="step-content">
            <p class="text-gray-700">{{ company.targetUsers }}</p>
          </div>
        </div>

        <!-- Step 3: Unique Value -->
        <div class="analysis-step">
          <div class="step-header">
            <div class="step-number">3</div>
            <h3 class="step-title">Unique Value</h3>
          </div>
          <div class="step-content">
            <p class="text-gray-700">{{ company.uniqueValue }}</p>
          </div>
        </div>

        <!-- Step 4: Key Learnings -->
        <div class="analysis-step">
          <div class="step-header">
            <div class="step-number">4</div>
            <h3 class="step-title">Key Learnings</h3>
          </div>
          <div class="step-content">
            <p class="text-gray-700">{{ company.keyLearnings }}</p>
          </div>
        </div>

        <!-- Step 5: Challenges -->
        <div class="analysis-step">
          <div class="step-header">
            <div class="step-number">5</div>
            <h3 class="step-title">Challenges</h3>
          </div>
          <div class="step-content">
            <p class="text-gray-700">{{ company.challenges }}</p>
          </div>
        </div>

        <!-- Step 6: Growth Strategy -->
        <div class="analysis-step">
          <div class="step-header">
            <div class="step-number">6</div>
            <h3 class="step-title">Growth Strategy</h3>
          </div>
          <div class="step-content">
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-gray-900">Monetization</h4>
                <p class="text-gray-700">{{ company.monetization }}</p>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Growth Engine</h4>
                <p class="text-gray-700">{{ company.growthEngine }}</p>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Optimization Direction</h4>
                <p class="text-gray-700">{{ company.optimization }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  company: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      category: '',
      logo: '',
      scores: {
        innovation: 0,
        growth: 0,
        business: 0
      },
      problem: '',
      targetUsers: '',
      uniqueValue: '',
      keyLearnings: '',
      challenges: '',
      monetization: '',
      growthEngine: '',
      optimization: ''
    })
  }
})

const getCategoryClass = (category) => {
  const classes = {
    'Tech': 'bg-blue-100 text-blue-800',
    'AI': 'bg-purple-100 text-purple-800',
    'Finance': 'bg-green-100 text-green-800',
    'Healthcare': 'bg-red-100 text-red-800',
    'Consumer': 'bg-yellow-100 text-yellow-800',
    'Commerce': 'bg-indigo-100 text-indigo-800',
    'Energy': 'bg-orange-100 text-orange-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.analysis-step {
  @apply relative pl-12;
}

.step-header {
  @apply flex items-center mb-4;
}

.step-number {
  @apply absolute left-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 
         flex items-center justify-center font-bold text-lg;
}

.step-title {
  @apply text-xl font-semibold text-gray-900;
}

.step-content {
  @apply bg-gray-50 rounded-lg p-4;
}
</style> 