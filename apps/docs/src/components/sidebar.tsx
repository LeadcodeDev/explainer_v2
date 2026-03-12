import * as React from 'react'
import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'
import type { NavItem } from '../lib/docs'

interface SidebarProps {
  items: NavItem[]
  currentPath: string
}

export function Sidebar({ items, currentPath }: SidebarProps) {
  return (
    <nav className="w-64 shrink-0 border-r h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 py-6 pr-4">
      <ul className="space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.slug} item={item} currentPath={currentPath} />
        ))}
      </ul>
    </nav>
  )
}

function SidebarItem({ item, currentPath, depth = 0 }: { item: NavItem; currentPath: string; depth?: number }) {
  const [open, setOpen] = React.useState(() => {
    if (item.type === 'category') {
      return isActiveCategory(item, currentPath)
    }
    return false
  })

  if (item.type === 'page') {
    const isActive = currentPath === item.href
    return (
      <li>
        <a
          href={item.href}
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
            isActive
              ? 'bg-accent text-accent-foreground font-medium'
              : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
          )}
          style={{ paddingLeft: `${0.75 + depth * 0.75}rem` }}
        >
          {item.icon && <Icon icon={`lucide:${item.icon}`} className="size-4 shrink-0" />}
          {item.title}
        </a>
      </li>
    )
  }

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          'text-foreground hover:bg-accent/50',
        )}
        style={{ paddingLeft: `${0.75 + depth * 0.75}rem` }}
      >
        <Icon
          icon="lucide:chevron-right"
          className={cn('size-4 shrink-0 transition-transform', open && 'rotate-90')}
        />
        {item.icon && <Icon icon={`lucide:${item.icon}`} className="size-4 shrink-0" />}
        {item.title}
      </button>
      {open && item.children && (
        <ul className="space-y-1">
          {item.children.map((child) => (
            <SidebarItem key={child.slug} item={child} currentPath={currentPath} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

function isActiveCategory(item: NavItem, currentPath: string): boolean {
  if (item.type === 'page') return currentPath === item.href
  return item.children?.some((child) => isActiveCategory(child, currentPath)) ?? false
}
