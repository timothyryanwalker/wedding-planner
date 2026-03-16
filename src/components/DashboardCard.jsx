/**
 * DashboardCard — reusable card shell for Dashboard widgets.
 * Accepts a `title` (string) and `children` (widget content).
 * Renders a warm ivory card with a rose top accent line, border, and shadow.
 */
function DashboardCard({ title, children }) {
  return (
    <>
      <style>{`
        .dashboard-card {
          background: var(--ivory-dark);
          border: 1px solid var(--border);
          border-top: 3px solid var(--rose);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dashboard-card__title {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0;
        }
      `}</style>

      <div className="dashboard-card">
        {title && <p className="dashboard-card__title">{title}</p>}
        {children}
      </div>
    </>
  )
}

export default DashboardCard
