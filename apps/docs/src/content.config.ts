import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const docs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    permalink: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    roles: z.array(z.string()).optional(),
    roleMatch: z.enum(['any', 'all']).optional(),
  }),
})

export const collections = { docs }
