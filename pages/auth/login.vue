<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-center text-3xl font-extrabold text-gray-900">
        AI Company Analysis
      </h1>
    </div>

    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import LoginForm from '~/components/auth/LoginForm.vue'

// Redirect to home if already logged in
const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  await auth.checkSession()
  if (auth.isAuthenticated) {
    router.push('/')
  }
})
</script> 