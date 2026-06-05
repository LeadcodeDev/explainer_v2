import { describe, it, expect } from 'vitest'
import { resolvePageAccess } from './access'

const meta = {
  'explainer/default/en/deployment': { roles: ['devops'] },
  'explainer/default/en/deployment/secret': { roles: ['devops', 'admin'], roleMatch: 'all' as const },
}

describe('resolvePageAccess', () => {
  it('is public when neither frontmatter nor ancestors declare roles', () => {
    expect(resolvePageAccess('explainer/default/en/getting-started.mdx', undefined, undefined, meta)).toEqual({
      roles: [],
      match: 'any',
    })
  })

  it('inherits roles from the nearest ancestor folder', () => {
    expect(resolvePageAccess('explainer/default/en/deployment/vercel.mdx', undefined, undefined, meta)).toEqual({
      roles: ['devops'],
      match: 'any',
    })
  })

  it('nearest ancestor wins over a shallower one', () => {
    expect(
      resolvePageAccess('explainer/default/en/deployment/secret/keys.mdx', undefined, undefined, meta),
    ).toEqual({ roles: ['devops', 'admin'], match: 'all' })
  })

  it('page frontmatter overrides inheritance', () => {
    expect(
      resolvePageAccess('explainer/default/en/deployment/vercel.mdx', ['admin'], 'all', meta),
    ).toEqual({ roles: ['admin'], match: 'all' })
  })
})
