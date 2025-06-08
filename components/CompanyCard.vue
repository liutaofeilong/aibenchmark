<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <!-- Card Header -->
    <div class="p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 flex-shrink-0">
            <img :src="company.logo" :alt="company.name + ' logo'" class="w-full h-full object-contain" loading="lazy" />
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ company.name }}</h3>
            <span class="inline-block px-2 py-1 text-sm rounded-full" 
                  :class="getCategoryClass(company.category)">
              {{ company.category }}
            </span>
          </div>
        </div>
        <button @click.stop="shareViaEmail" 
                class="text-gray-400 hover:text-blue-500 transition-colors duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Card Content -->
    <div class="px-6 pb-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <h4 class="font-medium text-gray-700">Problem</h4>
          <p class="text-gray-600">{{ company.problem }}</p>
        </div>
        
        <div class="space-y-2">
          <h4 class="font-medium text-gray-700">Target Users</h4>
          <p class="text-gray-600">{{ company.targetUser }}</p>
        </div>

        <div class="space-y-2">
          <h4 class="font-medium text-gray-700">Unique Value</h4>
          <p class="text-gray-600">{{ company.uniqueValue }}</p>
        </div>

        <!-- Scores -->
        <div class="pt-4 border-t">
          <div class="flex justify-between text-sm">
            <div class="text-center">
              <div class="font-medium text-gray-900">Innovation</div>
              <div class="mt-1 text-blue-600">{{ company.scores.innovation }}/10</div>
            </div>
            <div class="text-center">
              <div class="font-medium text-gray-900">Growth</div>
              <div class="mt-1 text-green-600">{{ company.scores.growth }}/10</div>
            </div>
            <div class="text-center">
              <div class="font-medium text-gray-900">Business</div>
              <div class="mt-1 text-purple-600">{{ company.scores.business }}/10</div>
            </div>
          </div>
        </div>
      </div>

      <!-- View Details Button -->
      <NuxtLink :to="'/company/' + company.id" 
              class="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                     transition-colors duration-200 flex items-center justify-center">
        <span>View Details</span>
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  company: {
    type: Object,
    required: true
  }
})

const router = useRouter()

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

const shareViaEmail = () => {
  const subject = `${props.company.name} Analysis - AIBenchmark`
  const body = `
Company: ${props.company.name}
Category: ${props.company.category}

Problem: ${props.company.problem}
Target Users: ${props.company.targetUser}
Unique Value: ${props.company.uniqueValue}

Scores:
Innovation: ${props.company.scores.innovation}/10
Growth: ${props.company.scores.growth}/10
Business: ${props.company.scores.business}/10

View more at: https://aibenchmark.it.com/company/${props.company.id}
  `.trim()

  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
</script> 