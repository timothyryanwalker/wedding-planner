/**
 * NavBar — fixed top navigation bar, present on every page.
 * Uses NavLink from react-router-dom to highlight the active route.
 * Background: --ivory with subtle border. Active link: --rose underline.
 */
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LINKS = [
  { to: '/',        label: 'Dashboard' },
  { to: '/tasks',   label: 'Tasks'     },
  { to: '/vendors', label: 'Vendors'   },
  { to: '/budget',  label: 'Budget'    },
  { to: '/goals',   label: 'Goals'     },
  { to: '/guests',  label: 'Guests'    },
]

function NavBar() {
  const { signOut } = useAuth()

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 1.5rem;
          height: 56px;
          background: var(--ivory);
          box-shadow: 0 1px 0 var(--border), 0 2px 12px rgba(90, 60, 40, 0.06);
        }

        .navbar__wordmark {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--rose-dark);
          letter-spacing: 0.01em;
          user-select: none;
        }

        .navbar__links {
          grid-column: 2;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.15s ease;
        }

        .nav-link:hover {
          color: var(--text-heading);
          text-decoration: none;
        }

        .nav-link--active {
          color: var(--rose);
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1.5px;
          text-decoration-color: var(--rose);
        }

        .nav-link--active:hover {
          color: var(--rose);
        }

        .navbar__signout {
          justify-self: end;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .navbar__signout:hover {
          border-color: var(--text-muted);
          color: var(--text);
        }

        @media (max-width: 600px) {
          .navbar__wordmark {
            font-size: 1.1rem;
          }

          .nav-link {
            font-size: 0.75rem;
            padding: 0.3rem 0.5rem;
          }
        }
      `}</style>

      <nav className="navbar" aria-label="Main navigation">
        <span className="navbar__wordmark">Lapel</span>
        <ul className="navbar__links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button className="navbar__signout" onClick={signOut}>Sign out</button>
      </nav>
    </>
  )
}

export default NavBar
