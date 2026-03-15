import { Navbar, MobileMenu, MobileNavLinks, LocaleSwitcher, getAppLinks } from '@explainer/ui'
import type { NavbarLink } from '@explainer/ui'

interface BlogNavbarProps {
  activePath: string
  appUrlOverrides?: Partial<Record<string, string>>
  locale: string
  locales: string[]
  localeSwitchUrls: Record<string, string>
}

export function BlogNavbar({ activePath, appUrlOverrides, locale, locales, localeSwitchUrls }: BlogNavbarProps) {
  const appLinks = getAppLinks('blog', appUrlOverrides)

  const blogLinks: NavbarLink[] = [
    { label: 'Tous les articles', href: `/${locale}`, icon: 'lucide:newspaper' },
    { label: 'Catégories', href: '/tags', icon: 'lucide:folder' },
    { label: 'RSS', href: `/${locale}/rss.xml`, icon: 'lucide:rss' },
  ]

  return (
    <Navbar
      currentApp="blog"
      appUrlOverrides={appUrlOverrides}
      brandHref={appUrlOverrides?.website ?? '/'}
      links={blogLinks}
      activePath={activePath}
      leftSlot={
        <MobileMenu>
          <MobileNavLinks
            links={blogLinks}
            appLinks={appLinks}
            activePath={activePath}
          />
        </MobileMenu>
      }
      rightSlot={
        <LocaleSwitcher locales={locales} currentLocale={locale} switchUrls={localeSwitchUrls} />
      }
    />
  )
}
