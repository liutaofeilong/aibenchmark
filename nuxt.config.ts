// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['@/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'AIBenchmark - AI Company Analysis Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Analyze AI companies and products with our comprehensive framework. Get insights on business models, target users, and growth strategies.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'AI companies, competitive analysis, business intelligence, startup analysis, tech companies, AI benchmark, product analysis, business model analysis'
        },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph
        { property: 'og:title', content: 'AIBenchmark - AI Company Analysis Platform' },
        { property: 'og:description', content: 'Comprehensive AI company analysis platform' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'AIBenchmark' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AIBenchmark - AI Company Analysis Platform' },
        { name: 'twitter:description', content: 'Comprehensive AI company analysis platform' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://aibenchmark.it.com' }
      ],
      script: [
        // Google Analytics configuration
        {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=11353713047`,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '11353713047');
          `
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      googleAnalyticsId: '11353713047',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
    }
  },
  nitro: {
    preset: 'vercel',
  },
  typescript: {
    typeCheck: false
  }
}) 