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
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXFsdXpydWt3b2FlY2l1cGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODQ0NzQsImV4cCI6MjA2NTA2MDQ3NH0.XQ_Qdl059OzKIeRGCseq0IzFEPhzufqhVur3jhhwFfo'
      
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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
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
        scores: data.scores,
        timestamp: data.timestamp,
        model: data.model,
        usage: data.usage
      }
    } catch (e) {
      console.error('Analysis error:', e)
      error.value = e instanceof Error ? e.message : 'Error occurred during analysis'
      return null
    } finally {
      isAnalyzing.value = false
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