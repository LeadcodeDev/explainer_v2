import type { SiteConfig, SiteConfigTranslations } from './contracts'
import { defaultConfig } from './config'

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

function deepMerge(base: Record<string, any>, overrides: Record<string, any>): Record<string, any> {
  const result = { ...base }
  for (const key of Object.keys(overrides)) {
    const val = overrides[key]
    if (val !== undefined && typeof val === 'object' && !Array.isArray(val) && val !== null) {
      result[key] = deepMerge(base[key] ?? {}, val)
    } else if (val !== undefined) {
      result[key] = val
    }
  }
  return result
}

export function defineConfig(overrides: DeepPartial<SiteConfig> = {}): SiteConfig {
  return deepMerge(defaultConfig, overrides) as SiteConfig
}

export function formatTitle(config: SiteConfig, pageTitle: string): string {
  return config.titleTemplate.replace('%s', pageTitle)
}

export function getTranslations(config: SiteConfig, locale?: string): SiteConfigTranslations {
  const lang = locale ?? config.defaultLocale
  return config.i18n[lang] ?? config.i18n[config.defaultLocale]
}
