import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: {
      id: '11353713047'
    },
    appName: 'AI Company Analysis Platform',
    pageTrackerScreenviewEnabled: true,
    enabled: process.env.NODE_ENV === 'production'
  })
}) 