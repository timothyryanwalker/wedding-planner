/**
 * Login — full-page login screen.
 * Shows a "Sign in with Google" button using Supabase OAuth.
 * Redirects to the dashboard if a session already exists.
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
          background: var(--ivory);
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          background: var(--ivory-dark);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow);
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }

        .login-card__wordmark {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 600;
          color: var(--text-heading);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .login-card__subtitle {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 300;
          color: var(--text);
        }

        .login-card__date {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 300;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
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
          <button className="login-card__btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
