<template>
  <div class="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-3xl font-bold text-center mb-2">Reset Password</h2>
    <p class="text-gray-600 text-center mb-8">Enter your email address and we'll send you a link to reset your password</p>

    <form @submit.prevent="handleResetPassword" class="space-y-6">
      <div>
        <label class="block text-gray-700 mb-2">Email Address</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <input 
            v-model="email" 
            type="email" 
            placeholder="Enter your email"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
        </div>
      </div>

      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending reset link...
        </span>
        <span v-else>Send Reset Link</span>
      </button>
    </form>

    <p class="mt-8 text-center text-sm text-gray-600">
      Remember your password?
      <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
        Back to Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const loading = ref(false)

const handleResetPassword = async () => {
  loading.value = true
  try {
    await auth.resetPassword(email.value)
    alert('Password reset link has been sent to your email.')
    router.push('/auth/login')
  } catch (error) {
    console.error('Password reset failed:', error)
    alert('Failed to send reset link. Please try again.')
  } finally {
    loading.value = false
  }
}
</script> 