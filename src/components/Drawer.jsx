/**
 * Drawer — reusable slide-in drawer shell.
 * Slides in from the right. Driven entirely by isOpen/onClose props.
 * Renders a backdrop overlay and a panel with a header + scrollable body.
 * Props: isOpen (bool), onClose (fn), title (string), children
 */

function Drawer({ isOpen, onClose, title, children }) {
  return (
    <>
      <style>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          z-index: 149;
          background: rgba(48, 14, 15, 0.3);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }

        .drawer-backdrop--open {
          opacity: 1;
          pointer-events: auto;
        }

        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 360px;
          z-index: 150;
          background: var(--ivory-dark);
          border-left: 1px solid var(--border);
          box-shadow: -4px 0 24px rgba(48, 14, 15, 0.12);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.25s ease;
        }

        .drawer--open {
          transform: translateX(0);
        }

        .drawer__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .drawer__title {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-heading);
        }

        .drawer__close {
          font-family: var(--font-body);
          font-size: 1.2rem;
          font-weight: 300;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0.4rem;
          line-height: 1;
          transition: color 0.15s ease;
        }

        .drawer__close:hover {
          color: var(--text);
        }

        .drawer__body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        @media (max-width: 600px) {
          .drawer {
            width: 100vw;
          }
        }
      `}</style>

      <div
        className={`drawer-backdrop${isOpen ? ' drawer-backdrop--open' : ''}`}
        onClick={onClose}
      />

      <div className={`drawer${isOpen ? ' drawer--open' : ''}`}>
        <div className="drawer__header">
          <span className="drawer__title">{title}</span>
          <button className="drawer__close" onClick={onClose}>×</button>
        </div>
        <div className="drawer__body">
          {children}
        </div>
      </div>
    </>
  )
}

export default Drawer
