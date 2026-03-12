import type { CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

export function getPublishedPosts(posts: Post[]): Post[] {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getAllTags(posts: Post[]): { name: string; count: number }[] {
  const tagMap = new Map<string, number>()
  for (const post of posts) {
    if (post.data.draft) continue
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostSlug(post: Post): string {
  return post.id.replace(/\.mdx$/, '')
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const POSTS_PER_PAGE = 10

export function paginatePosts(posts: Post[], page: number): { posts: Post[]; totalPages: number } {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
  }
}
