import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import remarkDirective from 'remark-directive'
import { shikiConfig } from '@explainer/mdx/shiki'
import { remarkAutoImport } from '@explainer/mdx/remark-auto-import'
import { remarkDirectiveHandler } from '@explainer/mdx/remark-directive-handler'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'

export default defineConfig({
  site: 'https://blog.example.com',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkAutoImport, remarkDirective, remarkDirectiveHandler],
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
