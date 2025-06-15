# AI Company Analysis Platform

## Overview
This is an AI company analysis platform based on Nuxt.js and Deepseek API. Users can input a company name to get detailed analysis reports.

## Latest Updates

### 2024-03-21 Search Function Optimization
1. New Features:
   - Created `SearchBar` component for company name search
   - Integrated Deepseek API for company analysis
   - Optimized homepage layout and user interface

2. Component Updates:
   - `SearchBar.vue`: New search box component with Enter key trigger
   - `index.vue`: Updated homepage layout with navigation and company list
   - `useDeepseek.ts`: Encapsulated Deepseek API call logic

3. UI Improvements:
   - Added loading state display
   - Enhanced error message presentation
   - Improved analysis result display

## Tech Stack
- Nuxt.js
- Vue 3
- TypeScript
- Tailwind CSS
- Deepseek API

## Development Guide
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Notes
1. Ensure Deepseek API key is configured
2. Handle CORS issues in local development
3. Recommended Node.js version 16+
