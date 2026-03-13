import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { shikiConfig } from '@explainer/mdx/shiki'
import { remarkAutoImport } from '@explainer/mdx/remark-auto-import'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'

export default defineConfig({
  site: 'https://blog.example.com',
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkAutoImport],
    }),
    thumbnailIntegration({
      appName: 'Blog',
      content: { type: 'collection', dir: './src/content/posts' },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
  markdown: {
    shikiConfig,
  },
})
