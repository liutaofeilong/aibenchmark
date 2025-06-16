<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">Signing you in...</h2>
      <p class="mt-2 text-sm text-gray-500">Please wait while we complete the authentication process.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  try {
    await auth.checkSession()
    router.push('/')
  } catch (error) {
    console.error('Authentication error:', error)
    router.push('/auth/login')
  }
})
</script> 