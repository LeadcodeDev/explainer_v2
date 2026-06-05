import { UserManager, type User } from 'oidc-client-ts'
import type { AuthConfig, AuthState, AuthUser } from './contracts'
import { getUserRoles } from './roles'

let manager: UserManager | null = null
let rolesClaim = 'realm_access.roles'
let state: AuthState = { status: 'loading', user: null }
const listeners = new Set<() => void>()

function emit(): void {
  for (const l of listeners) l()
}

function setState(next: AuthState): void {
  state = next
  emit()
}

function toAbsolute(uri: string): string {
  if (/^https?:\/\//.test(uri)) return uri
  if (typeof window === 'undefined') return uri
  return `${window.location.origin}${uri.startsWith('/') ? '' : '/'}${uri}`
}

function toAuthUser(user: User): AuthUser {
  const profile = user.profile as Record<string, unknown>
  return {
    sub: user.profile.sub,
    name: user.profile.name,
    email: user.profile.email,
    roles: getUserRoles(profile, user.access_token, rolesClaim),
    accessToken: user.access_token,
    expiresAt: user.expires_at,
  }
}

/** Idempotent. Call once per page from the React entry. */
export function initAuth(cfg: AuthConfig): void {
  if (!cfg.enabled || !cfg.oidc) {
    setState({ status: 'disabled', user: null })
    return
  }
  if (manager) return

  const o = cfg.oidc
  rolesClaim = o.rolesClaim
  manager = new UserManager({
    authority: o.issuer,
    client_id: o.clientId,
    redirect_uri: toAbsolute(o.redirectUri),
    post_logout_redirect_uri: toAbsolute(o.postLogoutRedirectUri),
    silent_redirect_uri: o.silentRedirectUri ? toAbsolute(o.silentRedirectUri) : undefined,
    response_type: 'code',
    scope: o.scope,
    automaticSilentRenew: Boolean(o.silentRedirectUri),
    ...(o.audience ? { extraQueryParams: { audience: o.audience } } : {}),
  })

  manager.events.addUserLoaded((u) => setState({ status: 'authenticated', user: toAuthUser(u) }))
  manager.events.addUserUnloaded(() => setState({ status: 'unauthenticated', user: null }))
  manager.events.addAccessTokenExpired(() => {
    void manager?.signinSilent().catch(() => setState({ status: 'unauthenticated', user: null }))
  })

  void manager
    .getUser()
    .then((u) => {
      if (u && !u.expired) setState({ status: 'authenticated', user: toAuthUser(u) })
      else setState({ status: 'unauthenticated', user: null })
    })
    .catch(() => setState({ status: 'unauthenticated', user: null }))
}

export function getAuthState(): AuthState {
  return state
}

export function subscribeAuth(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export async function login(returnTo?: string): Promise<void> {
  if (!manager) return
  const target = returnTo ?? (typeof window !== 'undefined' ? window.location.href : '/')
  await manager.signinRedirect({ state: { returnTo: target } })
}

export async function logout(): Promise<void> {
  if (!manager) return
  await manager.signoutRedirect()
}

/** Completes the OIDC redirect; resolves to the URL to return the user to. */
export async function handleCallback(): Promise<string> {
  if (!manager) return '/'
  const user = await manager.signinCallback()
  const returnTo = (user?.state as { returnTo?: string } | undefined)?.returnTo
  return returnTo ?? '/'
}

export async function handleSilentCallback(): Promise<void> {
  if (!manager) return
  await manager.signinSilentCallback()
}
