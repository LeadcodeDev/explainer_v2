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
  devToolbar: { enabled: false },
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkAutoImport, remarkDirective, remarkDirectiveHandler],
    }),
    thumbnailIntegration({
      appName: 'Docs',
      content: { type: 'collection', dir: './src/content/docs' },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig,
  },
})
