<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="company">
        <!-- Company Header -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
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
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="p-6 space-y-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="space-y-2">
                    <h4 class="font-medium text-gray-700">Problem</h4>
                    <p class="text-gray-600">{{ company.problem }}</p>
                  </div>
                  <button 
                    @click="shareViaEmail"
                    class="text-blue-600 hover:text-blue-700"
                    title="Share via Email"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Target Users</h4>
                  <p class="text-gray-600">{{ company.targetUser }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Unique Value</h4>
                  <p class="text-gray-600">{{ company.uniqueValue }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Key Learnings</h4>
                  <p class="text-gray-600">{{ company.keyLearnings }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="p-6 space-y-6">
                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Challenges</h4>
                  <p class="text-gray-600">{{ company.challenges }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Monetization</h4>
                  <p class="text-gray-600">{{ company.monetization }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Growth Engine</h4>
                  <p class="text-gray-600">{{ company.growthEngine }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Optimization Direction</h4>
                  <p class="text-gray-600">{{ company.optimization }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Scores -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="p-6">
                <div class="grid grid-cols-3 gap-4">
                  <div class="text-center">
                    <div class="text-sm font-medium text-gray-500">Innovation</div>
                    <div class="mt-1 text-2xl font-semibold text-blue-600">{{ company.scores.innovation }}/10</div>
                  </div>
                  <div class="text-center">
                    <div class="text-sm font-medium text-gray-500">Growth</div>
                    <div class="mt-1 text-2xl font-semibold text-green-600">{{ company.scores.growth }}/10</div>
                  </div>
                  <div class="text-center">
                    <div class="text-sm font-medium text-gray-500">Business</div>
                    <div class="mt-1 text-2xl font-semibold text-purple-600">{{ company.scores.business }}/10</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="p-6 space-y-6">
                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Why Needed</h4>
                  <p class="text-gray-600">{{ company.whyNeeded }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Use Case</h4>
                  <p class="text-gray-600">{{ company.useCase }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">User Reviews</h4>
                  <p class="text-gray-600">{{ company.userReviews }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">User Acquisition</h4>
                  <p class="text-gray-600">{{ company.userAcquisition }}</p>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium text-gray-700">Revenue</h4>
                  <p class="text-gray-600">{{ company.revenue }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p class="mt-4 text-gray-600">Loading company analysis...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const company = ref(null)

// Get companies data from the store
const { companies } = useCompanies()

const getCategoryClass = (category) => {
  const classes = {
    'Tech': 'bg-blue-100 text-blue-800',
    'AI': 'bg-purple-100 text-purple-800',
    'Finance': 'bg-green-100 text-green-800',
    'Healthcare': 'bg-red-100 text-red-800',
    'Consumer': 'bg-yellow-100 text-yellow-800',
    'Commerce': 'bg-indigo-100 text-indigo-800',
    'Energy': 'bg-orange-100 text-orange-800',
    'Entertainment': 'bg-pink-100 text-pink-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const shareViaEmail = () => {
  const subject = `${company.value.name} Analysis - AIBenchmark`
  const body = `
Company: ${company.value.name}
Category: ${company.value.category}

Problem: ${company.value.problem}
Target Users: ${company.value.targetUser}
Unique Value: ${company.value.uniqueValue}

Scores:
Innovation: ${company.value.scores.innovation}/10
Growth: ${company.value.scores.growth}/10
Business: ${company.value.scores.business}/10

View more at: https://aibenchmark.it.com/company/${company.value.id}
  `.trim()

  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

onMounted(() => {
  const id = parseInt(route.params.id)
  company.value = companies.value.find(c => c.id === id)
  
  if (!company.value) {
    // Handle company not found
    navigateTo('/')
  }
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 