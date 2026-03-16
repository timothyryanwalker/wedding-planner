/**
 * TaskFilter — pure presentational filter bar for the Tasks page.
 * Renders three groups of pill toggles: Status, Owner, and Sort.
 * Receives `filters` (current values) and `onChange(key, value)` as props.
 * No internal state — all filter logic lives in Tasks.jsx.
 */

const STATUS_OPTIONS = [
  { value: 'all',      label: 'All'      },
  { value: 'todo',     label: 'To Do'    },
  { value: 'complete', label: 'Complete' },
  { value: 'overdue',  label: 'Overdue'  },
]

const OWNER_OPTIONS = [
  { value: 'all',     label: 'All'     },
  { value: 'Taylor',  label: 'Taylor'  },
  { value: 'Timothy', label: 'Timothy' },
  { value: 'Both',    label: 'Both'    },
]

const SORT_OPTIONS = [
  { value: 'dueDate',  label: 'Due Date'  },
  { value: 'priority', label: 'Priority'  },
  { value: 'owner',    label: 'Owner'     },
  { value: 'category', label: 'Category'  },
]

const OWNER_ACTIVE_STYLES = {
  all:     { background: 'var(--text-heading)', color: 'var(--ivory)' },
  Taylor:  { background: 'var(--rose)',         color: 'var(--ivory)' },
  Timothy: { background: 'var(--sage)',         color: 'var(--ivory)' },
  Both:    { background: 'var(--gold)',         color: 'var(--ivory)' },
}

function TaskFilter({ filters, onChange }) {
  return (
    <>
      <style>{`
        .task-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1rem;
          background: var(--ivory-dark);
          border-bottom: 1px solid var(--border);
        }

        .task-filter__group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .task-filter__label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-right: 0.25rem;
        }

        .task-filter__pill {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--ivory);
          color: var(--text);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .task-filter__pill:hover {
          border-color: var(--text-muted);
        }

        .task-filter__pill--active-status {
          background: var(--rose);
          color: var(--ivory);
          border-color: var(--rose);
        }
      `}</style>

      <div className="task-filter">
        <div className="task-filter__group">
          <span className="task-filter__label">Status</span>
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`task-filter__pill${filters.status === opt.value ? ' task-filter__pill--active-status' : ''}`}
              onClick={() => onChange('status', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="task-filter__group">
          <span className="task-filter__label">Owner</span>
          {OWNER_OPTIONS.map(opt => {
            const isActive = filters.owner === opt.value
            const activeStyle = isActive ? OWNER_ACTIVE_STYLES[opt.value] : {}
            return (
              <button
                key={opt.value}
                className="task-filter__pill"
                style={isActive
                  ? { ...activeStyle, borderColor: activeStyle.background }
                  : {}
                }
                onClick={() => onChange('owner', opt.value)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        <div className="task-filter__group">
          <span className="task-filter__label">Sort</span>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`task-filter__pill${filters.sort === opt.value ? ' task-filter__pill--active-status' : ''}`}
              onClick={() => onChange('sort', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default TaskFilter
