import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'

export default defineConfig({
  integrations: [
    react(),
    thumbnailIntegration({
      appName: 'Explainer',
      content: {
        type: 'static',
        pages: [
          {
            path: '/',
            title: 'Explainer v2',
            description: 'Documentation boilerplate for developers.',
          },
          {
            path: '/thumbnails/fr',
            title: 'Explainer v2',
            description: 'Boilerplate de documentation pour les développeurs.',
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
})
