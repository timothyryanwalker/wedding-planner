/**
 * Login — full-page login screen.
 * Shows a "Sign in with Google" button using Supabase OAuth.
 * Redirects to the dashboard if a session already exists.
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DiamondDivider from '../components/DiamondDivider'

function Login() {
  const { session, signInWithGoogle } = useAuth()

  if (session) return <Navigate to="/" replace />

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          background: var(--ivory-dark);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-lifted);
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }

        .login-card__wordmark {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 2.25rem;
          font-weight: 500;
          color: var(--rose-dark);
          letter-spacing: 0.01em;
          margin-bottom: 0.5rem;
        }

        .login-card__subtitle {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--text-heading);
        }

        .login-card__date {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }


        .login-card__btn {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.65rem 2rem;
          border-radius: 999px;
          border: none;
          background: var(--rose);
          color: var(--ivory);
          cursor: pointer;
          width: 100%;
          transition: background 0.15s ease;
        }

        .login-card__btn:hover {
          background: var(--rose-dark);
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <div className="login-card__wordmark">Lapel</div>
          <p className="login-card__subtitle">Taylor &amp; Timothy</p>
          <p className="login-card__date">May 30, 2027</p>
          <DiamondDivider />
          <button className="login-card__btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
