import * as React from 'react'
import { useAuth } from './use-auth'
import { login, logout } from '../store'

export function AuthButton() {
  const { status, user } = useAuth()

  if (status === 'disabled') return null

  if (status !== 'authenticated') {
    return (
      <button
        onClick={() => void login()}
        disabled={status === 'loading'}
        className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        Se connecter
      </button>
    )
  }

  const label = user?.name ?? user?.email ?? 'Compte'
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline" title={user?.email}>
        {label}
      </span>
      <button
        onClick={() => void logout()}
        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
      >
        Se déconnecter
      </button>
    </div>
  )
}
