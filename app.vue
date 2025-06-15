<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAnalytics } from '~/composables/useAnalytics'
import { useRoute } from 'vue-router'

const route = useRoute()
const { trackPageView } = useAnalytics()

// 监听路由变化
watch(() => route.path, (path) => {
  trackPageView(path)
})

// 初始页面加载时跟踪
onMounted(() => {
  trackPageView(route.path)
})
</script> 