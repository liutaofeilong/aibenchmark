import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  
  // Skip middleware if going to auth pages or home page
  if (to.path.startsWith('/auth/') || to.path === '/') {
    return
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    '/send-email',  // 发送邮件的路由
    '/profile',     // 个人资料页面
  ]

  // Check if current route needs authentication
  if (protectedRoutes.some(route => to.path.startsWith(route))) {
    // Check session on first load
    await auth.checkSession()

    // Redirect to login if not authenticated
    if (!auth.isAuthenticated) {
      return navigateTo('/auth/login')
    }
  }
}) 