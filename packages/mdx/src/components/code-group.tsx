'use client'

import * as React from 'react'
import { cn } from '@explainer/ui'

interface CodeGroupProps {
  titles: string[]
  children: React.ReactNode
  className?: string
}

export function CodeGroup({ titles, children, className }: CodeGroupProps) {
  const [active, setActive] = React.useState(0)
  const childArray = React.Children.toArray(children)

  return (
    <div className={cn('my-4 overflow-hidden rounded-lg border', className)}>
      <div className="flex bg-muted/50 border-b">
        {titles.map((title, index) => (
          <button
            key={title}
            className={cn(
              'px-4 py-2 text-xs font-medium font-mono transition-colors',
              active === index
                ? 'bg-background text-foreground border-b-2 border-primary -mb-px'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setActive(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="[&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0">
        {childArray.map((child, index) => (
          <div key={titles[index]} hidden={active !== index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
