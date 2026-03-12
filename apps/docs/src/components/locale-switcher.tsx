import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '@explainer/ui'

interface LocaleSwitcherProps {
  locales: string[]
  currentLocale: string
  switchUrls: Record<string, string>
}

const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Francais',
  de: 'Deutsch',
  es: 'Espanol',
  pt: 'Portugues',
  ja: 'Japanese',
  zh: 'Chinese',
  ko: 'Korean',
  ru: 'Russian',
  it: 'Italiano',
}

export function LocaleSwitcher({ locales, currentLocale, switchUrls }: LocaleSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  if (locales.length <= 1) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        <Icon icon="lucide:globe" className="size-4" />
        {currentLocale.toUpperCase()}
        <Icon icon="lucide:chevrons-up-down" className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-md border bg-popover p-1 shadow-md">
            {locales.map((locale) => (
              <a
                key={locale}
                href={switchUrls[locale] ?? '#'}
                className={cn(
                  'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                  locale === currentLocale
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
                onClick={() => setOpen(false)}
              >
                {locale === currentLocale && (
                  <Icon icon="lucide:check" className="size-3" />
                )}
                {localeNames[locale] ?? locale.toUpperCase()}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
