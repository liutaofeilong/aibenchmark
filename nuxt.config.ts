// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'AIBenchmark - AI Company Analysis Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Analyze AI companies and products with our comprehensive framework. Get insights on business models, target users, and growth strategies.'
        },
        {
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
        },
        // Google AdSense configuration
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6719911469496948',
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  supabase: {
    url: 'https://uqyqluzrukwoaeciupka.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXFsdXpydWt3b2FlY2l1cGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODQ0NzQsImV4cCI6MjA2NTA2MDQ3NH0.XQ_Qdl059OzKIeRGCseq0IzFEPhzufqhVur3jhhwFfo',
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      exclude: ['/'],
      cookieRedirect: false,
      defaultProvider: 'google'
    },
    cookieOptions: {
      name: 'sb',
      lifetime: 60 * 60 * 8,
      domain: '',
      path: '/',
      sameSite: 'lax'
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.bmodai.shop',
      googleClientId: '296869433229-9ldjodp1n77m5r1ohbjqhl0icc41k87g.apps.googleusercontent.com',
      supabaseUrl: 'https://uqyqluzrukwoaeciupka.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeXFsdXpydWt3b2FlY2l1cGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODQ0NzQsImV4cCI6MjA2NTA2MDQ3NH0.XQ_Qdl059OzKIeRGCseq0IzFEPhzufqhVur3jhhwFfo'
    }
  },
  nitro: {
    preset: 'vercel',
  },
  typescript: {
    typeCheck: false
  }
}) 