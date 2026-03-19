import type { SiteConfig } from './contracts'

export const defaultConfig: SiteConfig = {
  name: 'Explainer',
  titleTemplate: '%s — Explainer',
  favicon: '/favicon.svg',
  logo: '/logo.svg',
  thumbnail: '/thumbnail.png',
  twitterCard: 'summary_large_image',
  ogType: 'website',
  github: 'https://github.com/LeadcodeDev/explainer_v2',
  sponsors: [
    {
      id: 'cloudiam',
      name: 'Cloud IAM',
      href: 'https://www.cloud-iam.com/',
      logoUrl: 'https://cdn.brandfetch.io/idEKeGBP2Y/w/300/h/300/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1769852965392',
      tier: 'gold',
    },
    {
      id: 'mineral',
      name: 'Mineral',
      href: 'https://mineral-dart.dev/',
      logoUrl: 'https://mineral-dart.dev/logo.svg',
      tier: 'silver',
    },
  ],
  defaultLocale: 'en',
  i18n: {
    en: {
      description: 'Documentation boilerplate for developers.',
      footer: {
        description: 'A modern documentation framework built with Astro. Create beautiful, fast, and accessible docs with ease.',
        columns: {
          documentation: 'Documentation',
          resources: 'Resources',
          community: 'Community',
        },
        copyright: '© {year} Explainer. All rights reserved.',
        builtWith: 'Built with {icon} using Astro',
        links: {
          documentation: [
            { label: 'Getting Started', href: '/en/explainer/getting-started' },
            { label: 'MDX Components', href: '/en/explainer/mdx-components/callout' },
            { label: 'Customization', href: '/en/explainer/features/theme-customization' },
            { label: 'Deployment', href: '/en/explainer/deployment/docker' },
          ],
          resources: [
            { label: 'GitHub', href: 'https://github.com/LeadcodeDev/explainer_v2', external: true },
            { label: 'Blog', href: '', appId: 'blog' },
            { label: 'Changelog', href: 'https://github.com/LeadcodeDev/explainer_v2/releases', external: true },
          ],
          community: [
            { label: 'Issues', href: 'https://github.com/LeadcodeDev/explainer_v2/issues', external: true },
            { label: 'Discussions', href: 'https://github.com/LeadcodeDev/explainer_v2/discussions', external: true },
            { label: 'Contributing', href: 'https://github.com/LeadcodeDev/explainer_v2/blob/main/CONTRIBUTING.md', external: true },
          ],
        },
      },
    },
    fr: {
      description: 'Boilerplate de documentation pour les développeurs.',
      footer: {
        description: 'Un framework de documentation moderne construit avec Astro. Créez des docs belles, rapides et accessibles facilement.',
        columns: {
          documentation: 'Documentation',
          resources: 'Ressources',
          community: 'Communauté',
        },
        copyright: '© {year} Explainer. Tous droits réservés.',
        builtWith: 'Construit avec {icon} grâce à Astro',
        links: {
          documentation: [
            { label: 'Premiers pas', href: '/fr/explainer/getting-started' },
            { label: 'Composants MDX', href: '/fr/explainer/mdx-components/callout' },
            { label: 'Personnalisation', href: '/fr/explainer/features/theme-customization' },
            { label: 'Déploiement', href: '/fr/explainer/deployment/docker' },
          ],
          resources: [
            { label: 'GitHub', href: 'https://github.com/LeadcodeDev/explainer_v2', external: true },
            { label: 'Blog', href: '', appId: 'blog' },
            { label: 'Changelog', href: 'https://github.com/LeadcodeDev/explainer_v2/releases', external: true },
          ],
          community: [
            { label: 'Issues', href: 'https://github.com/LeadcodeDev/explainer_v2/issues', external: true },
            { label: 'Discussions', href: 'https://github.com/LeadcodeDev/explainer_v2/discussions', external: true },
            { label: 'Contribuer', href: 'https://github.com/LeadcodeDev/explainer_v2/blob/main/CONTRIBUTING.md', external: true },
          ],
        },
      },
    },
  },
}
