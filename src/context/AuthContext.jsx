/**
 * AuthContext — provides session state and auth methods to the entire app.
 * Wrap the app in <AuthProvider> and access auth via the useAuth() hook.
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /* Check for an existing session on mount (e.g. after a page refresh) */
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    /* Keep session in sync when OAuth redirects back or session expires */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  function signOut() {
    supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

/* Convenience hook — use this instead of useContext(AuthContext) directly */
export function useAuth() {
  return useContext(AuthContext)
}
