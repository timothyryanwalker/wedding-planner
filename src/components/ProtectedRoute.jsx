/**
 * ProtectedRoute — layout route that guards all authenticated pages.
 * Renders nothing while the initial session check is in flight (prevents flash).
 * Redirects to /login if no session exists.
 * Renders child routes via <Outlet /> when authenticated.
 */
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading)  return null
  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute
