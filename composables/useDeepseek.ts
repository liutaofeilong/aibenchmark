import { ref } from 'vue'
import { useSupabase } from './useSupabase'

export const useDeepseek = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const response = ref<any>(null)
  const { callEdgeFunction } = useSupabase()

  const callDeepseek = async (companyName: string) => {
    console.log('🚀 Starting company analysis for:', companyName)
    console.log('⏳ Setting loading state...')
    loading.value = true
    error.value = null
    response.value = null
    
    try {
      const data = await callEdgeFunction('hyper-action', {
        company: companyName,
      })
      
      response.value = data.choices?.[0]?.message?.content || data.message
      console.log('💾 Updated response state:', response.value)
      
    } catch (e) {
      console.error('❌ Analysis Error:', e)
      console.error('Error details:', {
        name: e instanceof Error ? e.name : 'Unknown',
        message: e instanceof Error ? e.message : 'Failed to analyze company',
        stack: e instanceof Error ? e.stack : undefined
      })
      
      error.value = e instanceof Error ? e.message : 'Failed to analyze company'
      console.log('💾 Updated error state:', error.value)
      throw e
    } finally {
      console.log('⏳ Resetting loading state...')
      loading.value = false
      console.log('✨ Analysis completed')
    }
  }

  return {
    callDeepseek,
    loading,
    error,
    response
  }
} 