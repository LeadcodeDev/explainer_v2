export interface Sponsor {
  id: string
  name: string
  href: string
  logoUrl: string
  tier: 'gold' | 'silver' | 'bronze'
}

export interface SiteConfigTranslations {
  /** Default page description for meta tags */
  description: string
  /** Footer section */
  footer: {
    description: string
    columns: {
      documentation: string
      resources: string
      community: string
    }
    copyright: string
    builtWith: string
    links: {
      documentation: { label: string; href: string }[]
      resources: { label: string; href: string; external?: boolean; appId?: string }[]
      community: { label: string; href: string; external?: boolean }[]
    }
  }
}

export interface SiteConfig {
  /** Project name displayed in navbar, footer, etc. */
  name: string
  /** Title template — use %s as placeholder for the page title */
  titleTemplate: string
  /** Path to the favicon */
  favicon: string
  /** Path to the logo (used in navbar) */
  logo: string
  /** Default OG image / thumbnail path */
  thumbnail: string
  /** Twitter card type */
  twitterCard: 'summary' | 'summary_large_image'
  /** OG type */
  ogType: string
  /** GitHub repository URL */
  github: string
  /** Sponsors list */
  sponsors: Sponsor[]
  /** Default locale */
  defaultLocale: string
  /** Translations keyed by locale */
  i18n: Record<string, SiteConfigTranslations>
}
