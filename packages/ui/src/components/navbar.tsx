'use client'

import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '../lib/utils'
import { ThemeToggle } from './theme-toggle'

export interface NavbarLink {
  label: string
  href: string
  external?: boolean
}

export interface NavbarProps {
  brand?: string
  brandHref?: string
  links?: NavbarLink[]
  activePath?: string
  maxWidth?: string
  /** Extra controls rendered to the left of the brand (e.g. mobile menu) */
  leftSlot?: React.ReactNode
  /** Extra controls rendered between the nav and the theme toggle */
  rightSlot?: React.ReactNode
  sticky?: boolean
  className?: string
}

export function Navbar({
  brand = 'Explainer',
  brandHref = '/',
  links = [],
  activePath,
  maxWidth = 'max-w-6xl',
  leftSlot,
  rightSlot,
  sticky = true,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        sticky && 'sticky top-0',
        className,
      )}
    >
      <div className={cn('mx-auto flex h-14 items-center justify-between px-4 sm:px-6', maxWidth)}>
        {/* Left: mobile menu slot + brand */}
        <div className="flex items-center gap-3">
          {leftSlot}
          <a href={brandHref} className="font-semibold text-lg">
            {brand}
          </a>
        </div>

        {/* Center: desktop nav links */}
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = activePath === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                  )}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        )}

        {/* Right: extra controls + theme toggle + mobile menu button */}
        <div className="flex items-center gap-2">
          {rightSlot}
          <ThemeToggle />
          {links.length > 0 && (
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <Icon icon={mobileOpen ? 'lucide:x' : 'lucide:menu'} className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && links.length > 0 && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((link) => {
              const isActive = activePath === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                  )}
                  onClick={() => setMobileOpen(false)}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
