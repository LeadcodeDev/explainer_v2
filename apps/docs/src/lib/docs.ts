import type { CollectionEntry } from 'astro:content'

export interface MetaFile {
  title?: string
  icon?: string
  order?: number
}

export interface NavItem {
  type: 'page' | 'category'
  title: string
  slug: string
  href: string
  icon?: string
  order: number
  children?: NavItem[]
}

interface ParsedPath {
  project: string
  version: string
  locale: string
  segments: string[]
}

export function parsePath(id: string): ParsedPath {
  const parts = id.replace(/\.mdx$/, '').split('/')
  return {
    project: parts[0],
    version: parts[1],
    locale: parts[2],
    segments: parts.slice(3),
  }
}

export function buildHref(entry: CollectionEntry<'docs'>): string {
  if (entry.data.permalink) {
    return entry.data.permalink
  }

  const { project, version, locale, segments } = parsePath(entry.id)
  const versionSegment = version === 'default' ? '' : `/${version}`
  return `/${locale}/${project}${versionSegment}/${segments.join('/')}`
}

export function buildNavTree(
  entries: CollectionEntry<'docs'>[],
  metaFiles: Record<string, MetaFile>,
  project: string,
  version: string,
  locale: string,
): NavItem[] {
  const filtered = entries.filter((entry) => {
    const parsed = parsePath(entry.id)
    return parsed.project === project && parsed.version === version && parsed.locale === locale
  })

  const root: NavItem[] = []
  const categoryMap = new Map<string, NavItem>()

  for (const entry of filtered) {
    const { segments } = parsePath(entry.id)
    let currentLevel = root
    let currentPath = `${project}/${version}/${locale}`

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const isLast = i === segments.length - 1

      if (isLast) {
        currentLevel.push({
          type: 'page',
          title: entry.data.title,
          slug: entry.id,
          href: buildHref(entry),
          icon: entry.data.icon,
          order: entry.data.order ?? Infinity,
        })
      } else {
        currentPath += `/${segment}`

        if (!categoryMap.has(currentPath)) {
          const meta = metaFiles[currentPath]
          const category: NavItem = {
            type: 'category',
            title: meta?.title ?? formatTitle(segment),
            slug: currentPath,
            href: '',
            icon: meta?.icon,
            order: meta?.order ?? Infinity,
            children: [],
          }
          categoryMap.set(currentPath, category)
          currentLevel.push(category)
        }

        currentLevel = categoryMap.get(currentPath)!.children!
      }
    }
  }

  sortNavItems(root)
  return root
}

function sortNavItems(items: NavItem[]) {
  items.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.title.localeCompare(b.title)
  })
  for (const item of items) {
    if (item.children) {
      sortNavItems(item.children)
    }
  }
}

function formatTitle(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getFlatEntries(
  entries: CollectionEntry<'docs'>[],
  project: string,
  version: string,
  locale: string,
): CollectionEntry<'docs'>[] {
  return entries
    .filter((entry) => {
      const parsed = parsePath(entry.id)
      return parsed.project === project && parsed.version === version && parsed.locale === locale
    })
    .sort((a, b) => {
      const orderA = a.data.order ?? Infinity
      const orderB = b.data.order ?? Infinity
      if (orderA !== orderB) return orderA - orderB
      return a.data.title.localeCompare(b.data.title)
    })
}

export function getPagination(
  currentHref: string,
  flatEntries: CollectionEntry<'docs'>[],
): { prev: { title: string; href: string } | null; next: { title: string; href: string } | null } {
  const hrefs = flatEntries.map((e) => buildHref(e))
  const index = hrefs.indexOf(currentHref)

  return {
    prev: index > 0 ? { title: flatEntries[index - 1].data.title, href: hrefs[index - 1] } : null,
    next:
      index < flatEntries.length - 1
        ? { title: flatEntries[index + 1].data.title, href: hrefs[index + 1] }
        : null,
  }
}

export function loadMetaFiles(
  globs: Record<string, unknown>,
): Record<string, MetaFile> {
  const result: Record<string, MetaFile> = {}

  for (const [path, mod] of Object.entries(globs)) {
    const meta = (mod as { default?: MetaFile }).default ?? (mod as MetaFile)
    // path like ../content/docs/my-lib/default/en/guides/_meta.yaml
    // extract: my-lib/default/en/guides
    const match = path.match(/content\/docs\/(.+)\/_meta\.json$/)
    if (match) {
      result[match[1]] = meta
    }
  }

  return result
}
