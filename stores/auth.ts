import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#app'

declare global {
  const useSupabaseClient: () => SupabaseClient
}

export interface User {
  id: string
  email: string
  role?: string
  email_confirmed_at?: string
  phone?: string
  confirmed_at?: string
  last_sign_in_at?: string
  avatar_url?: string
  full_name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const user = ref<User | null>(null)
  const userProfile = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  async function login(email: string, password: string) {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Invalid email or password. Please check your credentials and try again.')
      }
      throw error
    }

    user.value = data.user as User
    await fetchUserProfile()
  }

  async function signInWithGoogle() {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${config.public.siteUrl}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'email profile'
      }
    })

    if (error) throw error
    return data
  }

  async function logout() {
    const supabase = useSupabaseClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
    userProfile.value = null
  }

  async function checkSession() {
    const supabase = useSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user as User || null
    if (user.value) {
      await fetchUserProfile()
    }
  }

  async function fetchUserProfile() {
    if (!user.value) return

    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return
    }

    userProfile.value = {
      ...user.value,
      ...data
    }
  }

  async function updateProfile(profile: Partial<User>) {
    if (!user.value) throw new Error('Not authenticated')

    const supabase = useSupabaseClient()
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.value.id,
        updated_at: new Date().toISOString(),
        ...profile
      })

    if (error) throw error
    await fetchUserProfile()
  }

  async function uploadAvatar(file: File) {
    if (!user.value) throw new Error('Not authenticated')

    const supabase = useSupabaseClient()
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.value.id}/avatar.${fileExt}`

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    // Update the profile with the new avatar URL
    await updateProfile({ avatar_url: publicUrl })
  }

  return {
    user,
    userProfile,
    isAuthenticated,
    login,
    signInWithGoogle,
    logout,
    checkSession,
    updateProfile,
    uploadAvatar
  }
}) 