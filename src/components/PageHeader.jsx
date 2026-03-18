/**
 * PageHeader — shared page header used across Tasks, Vendors, and Budget.
 * Renders an italic serif h1 title, an optional muted summary line,
 * and a DiamondDivider below.
 * Props: title (string), summary (string, optional)
 */
import DiamondDivider from './DiamondDivider'

function PageHeader({ title, summary }) {
  return (
    <>
      <style>{`
        .page-header {
          margin-bottom: 0.75rem;
        }

        .page-header__title {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--text-heading);
          margin-bottom: 0.25rem;
        }

        .page-header__summary {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--text-muted);
        }
      `}</style>

      <header className="page-header">
        <h1 className="page-header__title">{title}</h1>
        {summary && <p className="page-header__summary">{summary}</p>}
      </header>

      <DiamondDivider />
    </>
  )
}

export default PageHeader
