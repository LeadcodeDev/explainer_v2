'use client'

import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '../lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const stored = localStorage.getItem('theme')
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = (stored as 'light' | 'dark') ?? preferred
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
        className,
      )}
      aria-label="Toggle theme"
    >
      <Icon
        icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'}
        className="size-5"
      />
    </button>
  )
}
