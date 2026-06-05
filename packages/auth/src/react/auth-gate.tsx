import * as React from 'react'
import { useAuth } from './use-auth'
import { login, logout } from '../store'
import { hasRequiredRole } from '../roles'
import type { RoleMatch } from '../contracts'

interface AuthGateProps {
  requiredRoles: string[]
  match?: RoleMatch
  /** id of the sibling element holding the protected content (hidden by default). */
  contentId?: string
}

export function AuthGate({ requiredRoles, match = 'any', contentId = 'protected-doc' }: AuthGateProps) {
  const { status, user } = useAuth()
  const authorized =
    status === 'authenticated' && hasRequiredRole(user?.roles ?? [], requiredRoles, match)

  React.useEffect(() => {
    const el = document.getElementById(contentId)
    if (el) el.hidden = !(status === 'disabled' || authorized)
  }, [status, authorized, contentId])

  React.useEffect(() => {
    if (status === 'unauthenticated') void login()
  }, [status])

  if (status === 'disabled' || authorized) return null

  if (status === 'loading') {
    return <GateMessage>Vérification de l'accès…</GateMessage>
  }
  if (status === 'unauthenticated') {
    return <GateMessage>Redirection vers l'authentification…</GateMessage>
  }
  return <Forbidden requiredRoles={requiredRoles} userRoles={user?.roles ?? []} />
}

function GateMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground" role="status">
      {children}
    </div>
  )
}

function Forbidden({ requiredRoles, userRoles }: { requiredRoles: string[]; userRoles: string[] }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-2xl font-semibold">Accès refusé</h1>
      <p className="text-muted-foreground">
        Cette page requiert {requiredRoles.length > 1 ? 'les rôles' : 'le rôle'}{' '}
        <strong>{requiredRoles.join(', ')}</strong>.
      </p>
      <p className="text-sm text-muted-foreground">
        Vos rôles : {userRoles.length ? userRoles.join(', ') : 'aucun'}.
      </p>
      <button
        onClick={() => void logout()}
        className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
      >
        Changer de compte
      </button>
    </div>
  )
}
