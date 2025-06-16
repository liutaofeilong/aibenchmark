<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Send Analysis Report</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Recipient Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Recipient Email
        </label>
        <div class="relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input
            v-model="email"
            type="email"
            required
            class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2 sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter recipient's email"
          >
        </div>
      </div>

      <!-- Subject -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          v-model="subject"
          type="text"
          required
          class="focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter email subject"
        >
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          v-model="message"
          rows="4"
          required
          class="focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter your message"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
          <span v-else>Send Email</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const email = ref('')
const subject = ref('')
const message = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // 这里调用您的邮件发送API
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email.value,
        subject: subject.value,
        text: message.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    alert('Email sent successfully!')
    // 清空表单
    email.value = ''
    subject.value = ''
    message.value = ''
  } catch (error) {
    console.error('Failed to send email:', error)
    alert('Failed to send email. Please try again.')
  } finally {
    loading.value = false
  }
}
</script> 