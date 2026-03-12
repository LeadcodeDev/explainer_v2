import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPublishedPosts, getPostSlug } from '../lib/posts'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const allPosts = await getCollection('posts')
  const posts = getPublishedPosts(allPosts)

  return rss({
    title: 'Explainer Blog',
    description: 'Latest articles from the Explainer blog',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${getPostSlug(post)}`,
    })),
  })
}
