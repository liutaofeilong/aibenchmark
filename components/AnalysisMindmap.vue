<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Company Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 flex-shrink-0">
            <img :src="company.logo || '/default-company.png'" :alt="company.name + ' logo'" class="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ company.name }}</h2>
            <div class="flex space-x-4 mt-2">
              <div class="text-center">
                <div class="text-sm font-medium text-gray-500">Innovation</div>
                <div class="text-lg font-semibold text-blue-600">{{ company.scores.innovation }}/10</div>
              </div>
              <div class="text-center">
                <div class="text-sm font-medium text-gray-500">Growth</div>
                <div class="text-lg font-semibold text-green-600">{{ company.scores.growth }}/10</div>
              </div>
              <div class="text-center">
                <div class="text-sm font-medium text-gray-500">Business</div>
                <div class="text-lg font-semibold text-purple-600">{{ company.scores.business }}/10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mindmap -->
    <div class="p-6">
      <div class="mindmap-container" ref="mindmapContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  company: {
    type: Object,
    required: true
  }
})

const mindmapContainer = ref(null)

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  mindmap: {
    padding: 16,
    useMaxWidth: true
  }
})

// Convert analysis content to mindmap format
const generateMindmap = (analysis) => {
  const lines = analysis.split('\n')
  let mindmapContent = 'mindmap\n'
  mindmapContent += `  root((${props.company.name}))\n`

  let currentSection = ''
  let indentLevel = 0

  for (const line of lines) {
    if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') ||
        line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.')) {
      // Main section
      currentSection = line.split('.')[1].split('&')[0].trim()
      mindmapContent += `    ${currentSection}\n`
      indentLevel = 1
    } else if (line.startsWith('-')) {
      // Subsection
      const content = line.substring(1).split(':')[0].trim()
      if (content && content !== 'Innovation Score' && content !== 'Growth Potential' && content !== 'Business Model') {
        const indent = '    '.repeat(indentLevel + 1)
        mindmapContent += `${indent}${content}\n`
      }
    } else if (line.includes(':') && !line.includes('Central Topic:')) {
      // Detail point
      const [key, value] = line.split(':').map(s => s.trim())
      if (value && !key.includes('Score')) {
        const indent = '    '.repeat(indentLevel + 2)
        mindmapContent += `${indent}${value}\n`
      }
    }
  }

  return mindmapContent
}

// Render mindmap
const renderMindmap = async () => {
  if (!mindmapContainer.value || !props.company.analysis) return

  try {
    const mindmapContent = generateMindmap(props.company.analysis)
    mindmapContainer.value.innerHTML = `<pre class="mermaid">${mindmapContent}</pre>`
    await mermaid.run()
  } catch (error) {
    console.error('Error rendering mindmap:', error)
  }
}

// Watch for changes in company data
watch(() => props.company, () => {
  renderMindmap()
}, { deep: true })

// Initial render
onMounted(() => {
  renderMindmap()
})
</script>

<style scoped>
.mindmap-container {
  width: 100%;
  overflow-x: auto;
  min-height: 600px;
}

.mindmap-container :deep(svg) {
  width: 100%;
  height: auto;
}
</style> 