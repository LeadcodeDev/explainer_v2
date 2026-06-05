import type { PageAccess, RoleMatch } from './contracts'

export interface MetaLike {
  roles?: string[]
  roleMatch?: RoleMatch
}

/**
 * Resolve the roles required to view a page.
 * Precedence: page frontmatter roles > nearest ancestor folder _meta roles > public.
 */
export function resolvePageAccess(
  entryId: string,
  frontmatterRoles: string[] | undefined,
  frontmatterMatch: RoleMatch | undefined,
  metaByPath: Record<string, MetaLike>,
): PageAccess {
  if (frontmatterRoles && frontmatterRoles.length > 0) {
    return { roles: frontmatterRoles, match: frontmatterMatch ?? 'any' }
  }

  const parts = entryId.replace(/\.mdx$/, '').split('/')
  for (let i = parts.length - 1; i >= 1; i--) {
    const folderPath = parts.slice(0, i).join('/')
    const meta = metaByPath[folderPath]
    if (meta?.roles && meta.roles.length > 0) {
      return { roles: meta.roles, match: meta.roleMatch ?? 'any' }
    }
  }

  return { roles: [], match: 'any' }
}
