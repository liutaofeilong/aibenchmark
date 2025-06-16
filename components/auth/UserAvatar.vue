<template>
  <div class="relative group">
    <div 
      class="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer"
      @click="openFileInput"
    >
      <img 
        v-if="user?.avatar_url" 
        :src="user.avatar_url" 
        :alt="user?.full_name || 'User avatar'"
        class="w-full h-full object-cover"
      >
      <span v-else class="text-gray-500 text-xl">
        {{ userInitials }}
      </span>
      
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      >
    </div>

    <!-- Hover overlay -->
    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
      <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Loading overlay -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>

  <!-- Dropdown menu -->
  <div 
    v-if="showDropdown"
    class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
  >
    <div class="py-1">
      <button
        @click="openFileInput"
        class="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 24 24" fill="none">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Change Photo
      </button>
      <button
        @click="handleSignOut"
        class="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 24 24" fill="none">
          <path d="M17 16L21 12M21 12L17 8M21 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const auth = useAuthStore()
const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const showDropdown = ref(false)

const user = computed(() => auth.userProfile)

const userInitials = computed(() => {
  if (!user.value?.full_name) return '?'
  return user.value.full_name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const openFileInput = () => {
  fileInput.value?.click()
  showDropdown.value = false
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  loading.value = true
  try {
    await auth.uploadAvatar(file)
  } catch (error) {
    console.error('Failed to upload avatar:', error)
    alert('Failed to upload avatar. Please try again.')
  } finally {
    loading.value = false
    target.value = '' // Reset file input
  }
}

const handleSignOut = async () => {
  try {
    await auth.logout()
    router.push('/auth/login')
  } catch (error) {
    console.error('Sign out failed:', error)
    alert('Failed to sign out. Please try again.')
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
const dropdownRef = ref(null)
onClickOutside(dropdownRef, () => {
  showDropdown.value = false
})
</script> 