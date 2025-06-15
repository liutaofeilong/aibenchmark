import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqyqluzrukwoaeciupka.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXFsdXpydWt3b2FlY2l1cGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODQ0NzQsImV4cCI6MjA2NTA2MDQ3NH0.XQ_Qdl059OzKIeRGCseq0IzFEPhzufqhVur3jhhwFfo'

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