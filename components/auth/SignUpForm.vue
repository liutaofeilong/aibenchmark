<template>
  <div class="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-3xl font-bold text-center mb-2">Create Account</h2>
    <p class="text-gray-600 text-center mb-8">Sign up to get started</p>

    <form @submit.prevent="handleSignUp" class="space-y-6">
      <div>
        <label class="block text-gray-700 mb-2">Full Name</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <input 
            v-model="fullName" 
            type="text" 
            placeholder="Enter your full name"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
        </div>
      </div>

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

      <div>
        <label class="block text-gray-700 mb-2">Password</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <input 
            v-model="password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Create a password"
            class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
          <button 
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            <svg v-if="showPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 3L21 21M10.584 10.587C10.2087 10.962 10 11.462 10 12C10 13.105 10.895 14 12 14C12.538 14 13.038 13.791 13.413 13.416M9.363 5.365C10.2204 5.12348 11.1082 4.99924 12 5C16.971 5 21 12 21 12C20.5 12.5 19.361 14.062 17.815 15.407M14.121 6.879C15.293 7.774 16.237 8.87 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
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
          Creating account...
        </span>
        <span v-else>Create Account</span>
      </button>
    </form>

    <div class="mt-8">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-4">
        <button 
          @click="handleGoogleSignUp"
          class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="currentColor"/>
          </svg>
          Google
        </button>
        <button 
          @click="handleGithubSignUp"
          class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
          </svg>
          GitHub
        </button>
      </div>
    </div>

    <p class="mt-8 text-center text-sm text-gray-600">
      Already have an account?
      <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
        Sign in instead
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

const fullName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const handleSignUp = async () => {
  loading.value = true
  try {
    await auth.signUp(email.value, password.value, fullName.value)
    router.push('/')
  } catch (error) {
    console.error('Sign up failed:', error)
    alert('Sign up failed. Please try again.')
  } finally {
    loading.value = false
  }
}

const handleGoogleSignUp = async () => {
  try {
    await auth.signInWithGoogle()
    router.push('/')
  } catch (error) {
    console.error('Google sign up failed:', error)
    alert('Google sign up failed. Please try again.')
  }
}

const handleGithubSignUp = async () => {
  try {
    await auth.signInWithGithub()
    router.push('/')
  } catch (error) {
    console.error('GitHub sign up failed:', error)
    alert('GitHub sign up failed. Please try again.')
  }
}
</script> 