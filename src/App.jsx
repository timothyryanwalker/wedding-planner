/**
 * App — root component.
 * Sets up client-side routing for all pages.
 * Add new routes here as pages are built out.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

/* Placeholder components for future pages */
const Tasks   = () => <p style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>Tasks — coming soon</p>
const Vendors = () => <p style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>Vendors — coming soon</p>
const Budget  = () => <p style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>Budget — coming soon</p>
const Guests  = () => <p style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>Guests — coming soon</p>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Dashboard />} />
        <Route path="/tasks"   element={<Tasks />}     />
        <Route path="/vendors" element={<Vendors />}   />
        <Route path="/budget"  element={<Budget />}    />
        <Route path="/guests"  element={<Guests />}    />
      </Routes>
    </BrowserRouter>
  )
}

export default App
