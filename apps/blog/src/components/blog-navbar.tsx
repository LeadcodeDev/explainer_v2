import type { NavbarLink } from '@explainer/ui'
import { LocaleSwitcher, MobileMenu, MobileNavLinks, Navbar, getAppLinks } from '@explainer/ui'
import { useTranslations } from '../i18n/utils'

interface BlogNavbarProps {
  activePath: string
  appUrlOverrides?: Partial<Record<string, string>>
  locale: string
  locales: string[]
  localeSwitchUrls: Record<string, string>
}

export function BlogNavbar({ activePath, appUrlOverrides, locale, locales, localeSwitchUrls }: BlogNavbarProps) {
  const appLinks = getAppLinks('blog', appUrlOverrides)
  const t = useTranslations(locale)

  const blogLinks: NavbarLink[] = [
    { label: t('nav.allArticles'), href: `/${locale}`, icon: 'lucide:newspaper' },
    { label: t('nav.rss'), href: `/${locale}/rss.xml`, icon: 'lucide:rss' },
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
