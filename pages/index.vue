<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">AI Company Analysis Platform</h1>
        <p class="text-xl text-gray-600">Enter a company name to get detailed analysis report</p>
      </div>

      <!-- Search Bar -->
      <SearchBar class="mb-12" />

      <!-- Company List -->
      <div v-if="companies.length > 0">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Popular Company Analysis</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CompanyCard
            v-for="company in companies"
            :key="company.id"
            :company="company"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCompanies } from '~/composables/useCompanies'
import SearchBar from '~/components/SearchBar.vue'
import CompanyCard from '~/components/CompanyCard.vue'

const { companies } = useCompanies()
</script> 