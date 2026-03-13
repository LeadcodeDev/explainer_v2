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
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
})
