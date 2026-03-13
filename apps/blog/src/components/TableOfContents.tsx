import * as React from 'react'
import { cn } from '@explainer/ui'

export interface TocHeading {
  depth: number
  slug: string
  text: string
}

interface TableOfContentsProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3)
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
    const elements = filtered.map((h) => document.getElementById(h.slug)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -75% 0px' },
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [filtered.map((h) => h.slug).join(',')])

  if (filtered.length === 0) return null

  return (
    <nav className="sticky top-24 h-fit">
      <p className="text-sm font-medium mb-3">On this page</p>
      <ul className="border-l border-border space-y-0.5">
        {filtered.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                'block -ml-px border-l-2 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:text-foreground',
                heading.depth === 3 ? 'pl-6' : 'pl-3',
                activeId === heading.slug
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
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
