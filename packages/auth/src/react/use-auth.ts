import { useSyncExternalStore } from 'react'
import { getAuthState, subscribeAuth } from '../store'
import type { AuthState } from '../contracts'

export function useAuth(): AuthState {
  return useSyncExternalStore(subscribeAuth, getAuthState, getAuthState)
}
