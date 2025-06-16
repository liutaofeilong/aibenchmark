import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from 'nuxt/app'

const config = useRuntimeConfig()
const supabaseUrl = config.public.supabaseUrl as string
const supabaseAnonKey = config.public.supabaseKey as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const useSupabase = () => {
  const callEdgeFunction = async (functionName: string, payload: any) => {
    try {
      console.log('📤 Calling Edge Function:', functionName)
      console.log('Request payload:', payload)

      const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      console.log('📥 Response status:', response.status)
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Edge function error:', errorText)
        throw new Error(`Edge function error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Edge function response:', data)
      return data
    } catch (error) {
      console.error('❌ Edge function call failed:', error)
      throw error
    }
  }

  return {
    supabase,
    callEdgeFunction
  }
} 