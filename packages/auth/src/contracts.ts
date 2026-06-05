export type RoleMatch = 'any' | 'all'

export interface OidcConfig {
  issuer: string
  clientId: string
  /** Absolute URL or path (resolved against window.location.origin at runtime). */
  redirectUri: string
  postLogoutRedirectUri: string
  silentRedirectUri?: string
  scope: string
  /** Dot-path into token claims where roles live (e.g. "realm_access.roles"). */
  rolesClaim: string
  audience?: string
}

export interface AuthConfig {
  enabled: boolean
  oidc?: OidcConfig
}

export interface AuthUser {
  sub: string
  name?: string
  email?: string
  roles: string[]
  accessToken: string
  expiresAt?: number
}

export type AuthStatus = 'disabled' | 'loading' | 'unauthenticated' | 'authenticated'

export interface AuthState {
  status: AuthStatus
  user: AuthUser | null
  error?: string
}

export interface PageAccess {
  /** Required roles; empty => public. */
  roles: string[]
  match: RoleMatch
}
