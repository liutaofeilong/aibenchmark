<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Profile Header -->
    <div class="max-w-4xl mx-auto px-4 mb-8">
      <div class="bg-blue-600 rounded-lg p-6 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="relative z-10">
          <h1 class="text-2xl font-bold mb-2">{{ auth.userProfile?.full_name || 'Your Profile' }}</h1>
          <p class="text-blue-100">Member since {{ formatDate(auth.userProfile?.created_at) }}</p>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Left Column - Profile Information -->
        <div class="md:col-span-2 space-y-6">
          <!-- Profile Form -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-6">Profile Information</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Avatar Upload -->
              <div class="flex items-center space-x-6">
                <div class="relative">
                  <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                      v-if="auth.userProfile?.avatar_url" 
                      :src="auth.userProfile.avatar_url" 
                      :alt="auth.userProfile?.full_name || 'User avatar'"
                      class="w-full h-full object-cover"
                    >
                    <span v-else class="text-gray-600 text-xl font-medium">
                      {{ userInitials }}
                    </span>
                  </div>
                  <div 
                    v-if="isUploading"
                    class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                  >
                    <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleAvatarChange"
                  >
                  <button
                    type="button"
                    @click="fileInput?.click()"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :disabled="isUploading"
                  >
                    Change Picture
                  </button>
                  <p class="mt-2 text-sm text-gray-500">
                    JPG, PNG or GIF (max. 5MB)
                  </p>
                </div>
              </div>

              <!-- Full Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  v-model="form.fullName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  disabled
                >
              </div>

              <!-- Bio -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  v-model="form.bio"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <!-- Save Button -->
              <div class="pt-4">
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                  :disabled="isSaving"
                >
                  <svg v-if="isSaving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Right Column - Account Activity -->
        <div class="space-y-6">
          <!-- Account Status -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Account Status</h2>
            <div class="flex items-center space-x-3 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">Active</span>
            </div>
          </div>

          <!-- Activity Stats -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Activity</h2>
            <div class="space-y-4">
              <!-- Analyses -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium">Analyses</div>
                    <div class="text-sm text-gray-500">Total analyses performed</div>
                  </div>
                </div>
                <div class="text-2xl font-bold">{{ stats.analyses || 0 }}</div>
              </div>

              <!-- Reports -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium">Reports</div>
                    <div class="text-sm text-gray-500">Reports generated</div>
                  </div>
                </div>
                <div class="text-2xl font-bold">{{ stats.reports || 0 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const isSaving = ref(false)

const form = ref({
  fullName: auth.userProfile?.full_name || '',
  email: auth.userProfile?.email || '',
  bio: auth.userProfile?.bio || ''
})

const stats = ref({
  analyses: 12,
  reports: 8
})

const userInitials = computed(() => {
  if (!form.value.fullName) return '?'
  return form.value.fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const formatDate = (date: string | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleAvatarChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  isUploading.value = true
  try {
    await auth.uploadAvatar(file)
  } catch (error) {
    console.error('Failed to upload avatar:', error)
    alert('Failed to upload avatar. Please try again.')
  } finally {
    isUploading.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleSubmit = async () => {
  isSaving.value = true
  try {
    await auth.updateProfile({
      full_name: form.value.fullName,
      bio: form.value.bio
    })
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Failed to update profile:', error)
    alert('Failed to update profile. Please try again.')
  } finally {
    isSaving.value = false
  }
}

// Redirect if not authenticated
onMounted(async () => {
  await auth.checkSession()
  if (!auth.isAuthenticated) {
    router.push('/auth/login')
  }
})
</script> 