import * as React from 'react'
import { cn } from '@explainer/ui'

export interface TocHeading {
  depth: number
  slug: string
  text: string
}

interface TocProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TocProps) {
  const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3)

  if (filtered.length === 0) return null

  return (
    <nav className="w-56 shrink-0 hidden xl:block h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 py-6 pl-4">
      <p className="text-sm font-medium mb-3">On this page</p>
      <ul className="space-y-2">
        {filtered.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                'block text-sm text-muted-foreground hover:text-foreground transition-colors',
                heading.depth === 3 && 'pl-4',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
