<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Brand -->
          <NuxtLink to="/" class="flex items-center">
            <div class="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
              <span class="text-white font-bold text-xl">AI</span>
            </div>
            <div class="flex items-center ml-2">
              <span class="text-xl font-semibold text-gray-900">AIBenchmark</span>
              <span class="ml-2 text-gray-500">Competitive Analysis</span>
            </div>
          </NuxtLink>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <template v-if="!auth.isAuthenticated">
              <NuxtLink 
                to="/auth/login"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </NuxtLink>
              <NuxtLink 
                to="/auth/signup"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                Sign up
              </NuxtLink>
            </template>
            <UserAvatar v-else />
          </div>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <slot />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

onMounted(async () => {
  await auth.checkSession()
})

const handleSendEmail = () => {
  // Add email handling logic here
  console.log('Send email clicked')
}
</script> 