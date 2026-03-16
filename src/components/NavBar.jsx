/**
 * NavBar — fixed top navigation bar, present on every page.
 * Uses NavLink from react-router-dom to highlight the active route.
 * Background: --rose (burgundy). Active link pill: --ivory-dark.
 */
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/',        label: 'Dashboard' },
  { to: '/tasks',   label: 'Tasks'     },
  { to: '/vendors', label: 'Vendors'   },
  { to: '/budget',  label: 'Budget'    },
  { to: '/goals',   label: 'Goals'     },
  { to: '/guests',  label: 'Guests'    },
]

function NavBar() {
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
          background: var(--rose);
          box-shadow: 0 2px 8px rgba(48, 14, 15, 0.25);
        }

        .navbar__wordmark {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--ivory);
          letter-spacing: 0.08em;
          text-transform: uppercase;
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
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--ivory);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .nav-link:hover {
          background: rgba(253, 249, 240, 0.15);
          text-decoration: none;
        }

        .nav-link--active {
          background: var(--ivory-dark);
          color: var(--rose-dark);
          font-weight: 500;
        }

        .nav-link--active:hover {
          background: var(--ivory-dark);
        }

        @media (max-width: 600px) {
          .navbar__wordmark {
            font-size: 1rem;
          }

          .nav-link {
            font-size: 0.75rem;
            padding: 0.3rem 0.5rem;
          }
        }
      `}</style>

      <nav className="navbar" aria-label="Main navigation">
        <span className="navbar__wordmark">Vows</span>
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
      </nav>
    </>
  )
}

export default NavBar
