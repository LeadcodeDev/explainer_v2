'use client'

import * as React from 'react'
import { cn } from '@explainer/ui'

interface TabsProps {
  items: string[]
  children: React.ReactNode
  className?: string
}

interface TabProps {
  label: string
  children: React.ReactNode
}

export function Tabs({ items, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(items[0])

  const childArray = React.Children.toArray(children)

  return (
    <div className={cn('my-4', className)}>
      <div className="flex border-b" role="tablist">
        {items.map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={activeTab === item}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
              activeTab === item
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {childArray.map((child, index) => (
          <div key={items[index]} hidden={activeTab !== items[index]}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Tab({ children }: TabProps) {
  return <>{children}</>
}
