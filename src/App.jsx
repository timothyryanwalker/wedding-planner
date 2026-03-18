/**
 * App — root component.
 * Sets up auth context, client-side routing, and protected routes.
 * Add new routes inside the AppLayout route as pages are built out.
 */
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute  from './components/ProtectedRoute'
import NavBar          from './components/NavBar'
import Dashboard       from './pages/Dashboard'
import Tasks           from './pages/Tasks'
import Vendors         from './pages/Vendors'
import Budget          from './pages/Budget'
import Login           from './pages/Login'
import Goals           from './pages/Goals'
const Guests  = () => <p style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>Guests — coming soon</p>

/* Layout rendered inside protected routes — includes NavBar and main content area */
const AppLayout = () => (
  <>
    <NavBar />
    <main style={{ paddingTop: '56px' }}>
      <Outlet />
    </main>
  </>
)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/"        element={<Dashboard />} />
              <Route path="/tasks"   element={<Tasks />}     />
              <Route path="/vendors" element={<Vendors />}   />
              <Route path="/budget"  element={<Budget />}    />
              <Route path="/goals"   element={<Goals />}     />
              <Route path="/guests"  element={<Guests />}    />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
