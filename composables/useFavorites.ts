import { ref } from 'vue'

interface Analysis {
  company: string
  analysis: string
  scores: {
    innovation: number
    growth: number
    business: number
  }
  model: string
  timestamp: string
}

const favorites = ref<Analysis[]>([])

export const useFavorites = () => {
  const loadFavorites = () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  }

  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const addFavorite = (analysis: Analysis) => {
    const exists = favorites.value.some(f => f.company === analysis.company)
    if (!exists) {
      favorites.value.push(analysis)
      saveFavorites()
    }
  }

  const removeFavorite = (company: string) => {
    favorites.value = favorites.value.filter(f => f.company !== company)
    saveFavorites()
  }

  const isFavorite = (company: string) => {
    return favorites.value.some(f => f.company === company)
  }

  // Load favorites on initialization
  if (typeof window !== 'undefined') {
    loadFavorites()
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }
} 