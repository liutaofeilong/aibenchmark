import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

export const useCompanyAnalysis = () => {
  const isAnalyzing = ref(false)
  const error = ref<string | null>(null)
  const analysis = ref<string | null>(null)
  const scores = ref({
    innovation: 0,
    growth: 0,
    business: 0
  })

  const analyzeCompany = async (companyName: string) => {
    if (!companyName) return null
    
    isAnalyzing.value = true
    error.value = null
    analysis.value = null

    try {
      console.log('Starting analysis for:', companyName)
      
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXFsdXpydWt3b2FlY2l1cGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODQ0NzQsImV4cCI6MjA2NTA2MDQ3NH0.XQ_Qdl059OzKIeRGCseq0IzFEPhzufqhVur3jhhwFfo'
      
      console.log('Sending request to Edge Function...')
      const response = await fetch('https://uqyqluzrukwoaeciupka.supabase.co/functions/v1/smart-handler', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company: companyName
        })
      })

      console.log('Response status:', response.status)
      const responseText = await response.text()
      console.log('Raw response:', responseText)

      if (!response.ok) {
        let errorMessage = 'Failed to analyze company'
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.error || errorData.detail || `HTTP error! status: ${response.status}`
        } catch (parseError) {
          console.error('Error parsing error response:', parseError)
          errorMessage = responseText || `HTTP error! status: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Error parsing success response:', parseError)
        throw new Error('Invalid response format from server')
      }

      console.log('Parsed response data:', data)
      
      if (!data.analysis) {
        console.error('No analysis content in response')
        throw new Error('No analysis content received')
      }

      // Update states
      analysis.value = data.analysis
      scores.value = data.scores || {
        innovation: 0,
        growth: 0,
        business: 0
      }

      // Return result
      return {
        name: companyName,
        analysis: data.analysis,
        scores: data.scores || {
          innovation: 0,
          growth: 0,
          business: 0
        },
        timestamp: data.timestamp || new Date().toISOString(),
        model: data.model || 'deepseek-chat',
        usage: data.usage || {}
      }
    } catch (e) {
      console.error('Analysis error:', e)
      error.value = e instanceof Error ? e.message : 'Error occurred during analysis'
      return null
    } finally {
      isAnalyzing.value = false
      console.log('Analysis completed')
    }
  }

  return {
    analyzeCompany,
    isAnalyzing,
    error,
    analysis,
    scores
  }
} 