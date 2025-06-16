<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">AI Company Analysis Platform</h1>
    <div class="max-w-2xl mx-auto">
      <p class="text-lg text-gray-700 mb-6">
        Analyze AI companies and products with our comprehensive framework. Get insights on business models, target users, and growth strategies.
      </p>
      <div class="grid gap-6">
        <div v-for="company in companies" :key="company.id" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-2">{{ company.name }}</h2>
          <div class="text-sm text-gray-500 mb-4">{{ company.category }}</div>
          <p class="text-gray-700 mb-4">{{ company.problem }}</p>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <div class="text-sm font-medium text-gray-500">Innovation</div>
              <div class="text-lg font-bold">{{ company.scores.innovation }}/10</div>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500">Growth</div>
              <div class="text-lg font-bold">{{ company.scores.growth }}/10</div>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500">Business</div>
              <div class="text-lg font-bold">{{ company.scores.business }}/10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'amp'
})

const companies = [
  {
    id: 1,
    name: 'Microsoft',
    category: 'Tech',
    problem: 'Complex digital transformation needs for businesses and individuals',
    scores: {
      innovation: 9,
      growth: 9,
      business: 10
    }
  },
  {
    id: 2,
    name: 'Apple',
    category: 'Tech',
    problem: 'Complex technology needs to be made simple and elegant for consumers',
    scores: {
      innovation: 9,
      growth: 8,
      business: 10
    }
  }
]
</script> 