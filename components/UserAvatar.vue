<template>
  <div class="relative" ref="avatarRef">
    <!-- Avatar Button -->
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center space-x-3 focus:outline-none"
    >
      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          v-if="auth.userProfile?.avatar_url" 
          :src="auth.userProfile.avatar_url" 
          :alt="auth.userProfile?.full_name || 'User avatar'"
          class="w-full h-full object-cover"
        >
        <span v-else class="text-gray-600 text-sm font-medium">
          {{ userInitials }}
        </span>
      </div>
      <span class="text-gray-700 font-medium">{{ auth.userProfile?.full_name || 'User' }}</span>
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <NuxtLink
        to="/profile"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        @click="isOpen = false"
      >
        Profile Settings
      </NuxtLink>
      <button
        @click="handleSignOut"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const auth = useAuthStore()
const isOpen = ref(false)

const userInitials = computed(() => {
  if (!auth.userProfile?.full_name) return '?'
  return auth.userProfile.full_name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const handleSignOut = async () => {
  try {
    await auth.logout()
    router.push('/auth/login')
  } catch (error) {
    console.error('Sign out failed:', error)
  }
  isOpen.value = false
}

// Close dropdown when clicking outside
const avatarRef = ref(null)
onClickOutside(avatarRef, () => {
  isOpen.value = false
})
</script> 