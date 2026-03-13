import { Navbar, MobileMenu, MobileNavLinks, LocaleSwitcher, getAppLinks } from '@explainer/ui'
import type { NavbarLink } from '@explainer/ui'

const blogLinks: NavbarLink[] = [
  { label: 'Tous les articles', href: '/', icon: 'lucide:newspaper' },
  { label: 'Catégories', href: '/tags', icon: 'lucide:folder' },
  { label: 'RSS', href: '/rss.xml', icon: 'lucide:rss' },
]

interface BlogNavbarProps {
  activePath: string
  appUrlOverrides?: Partial<Record<string, string>>
}

export function BlogNavbar({ activePath, appUrlOverrides }: BlogNavbarProps) {
  const appLinks = getAppLinks('blog', appUrlOverrides)

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
        <LocaleSwitcher locales={['en']} currentLocale="en" switchUrls={{}} />
      }
    />
  )
}
