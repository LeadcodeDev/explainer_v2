import { Navbar, MobileMenu, MobileNavLinks, LocaleSwitcher, getAppLinks } from '@explainer/ui'
import type { NavbarLink } from '@explainer/ui'

const websiteLinks: NavbarLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Get Started', href: '#get-started' },
]

interface WebsiteNavbarProps {
  appUrlOverrides?: Partial<Record<string, string>>
}

export function WebsiteNavbar({ appUrlOverrides }: WebsiteNavbarProps) {
  const appLinks = getAppLinks('website', appUrlOverrides)

  return (
    <Navbar
      currentApp="website"
      appUrlOverrides={appUrlOverrides}
      links={websiteLinks}
      leftSlot={
        <MobileMenu>
          <MobileNavLinks
            links={websiteLinks}
            appLinks={appLinks}
          />
        </MobileMenu>
      }
      rightSlot={
        <LocaleSwitcher locales={['en']} currentLocale="en" switchUrls={{}} />
      }
    />
  )
}
