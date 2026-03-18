/**
 * TaskCard — a single task row in the Tasks list.
 * Shows checkbox, title, category, owner badge, and due date.
 * Clicking the row calls onEdit(task) to open the drawer.
 * task shape: { id, title, completed, dueDate, owner, category, priority }
 */

const OWNER_STYLES = {
  Taylor:  { background: 'var(--rose)', color: 'var(--ivory)' },
  Timothy: { background: 'var(--sage)', color: 'var(--ivory)' },
  Both:    { background: 'var(--gold)', color: 'var(--ivory)' },
}

const PRIORITY_BORDER = {
  High:   '#d94f35',
  Medium: 'var(--gold)',
  Low:    'var(--sage)',
}

function TaskCard({ task, onToggle, onEdit }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)
  const isOverdue = !task.completed && task.dueDate && due < today

  const formattedDate = task.dueDate
    ? due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—'

  const ownerStyle = OWNER_STYLES[task.owner] ?? OWNER_STYLES.Both

  return (
    <>
      <style>{`
        .task-card {
          border-bottom: 1px solid var(--border);
        }

        .task-card__row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .task-card__row:hover {
          background: var(--ivory-dark);
        }

        .task-card__checkbox {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          accent-color: var(--sage);
          cursor: pointer;
        }

        .task-card__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }

        .task-card__title {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .task-card__title--done {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .task-card__category {
          font-family: var(--font-body);
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .task-card__meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .task-card__owner {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .task-card__date {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-muted);
          white-space: nowrap;
          min-width: 4rem;
          text-align: right;
        }

        .task-card__date--overdue {
          color: #d94f35;
          font-weight: 500;
        }

        .task-card--done .task-card__body,
        .task-card--done .task-card__meta {
          opacity: 0.5;
        }
      `}</style>

      <div
        className={`task-card${task.completed ? ' task-card--done' : ''}`}
        style={{ borderLeft: `4px solid ${PRIORITY_BORDER[task.priority] ?? 'var(--border)'}` }}
      >
        <div className="task-card__row" onClick={() => onEdit(task)}>
          <input
            type="checkbox"
            className="task-card__checkbox"
            checked={task.completed}
            onChange={e => { e.stopPropagation(); onToggle(task.id) }}
            onClick={e => e.stopPropagation()}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div className="task-card__body">
            <span className={`task-card__title${task.completed ? ' task-card__title--done' : ''}`}>
              {task.title || <em style={{ color: 'var(--text-muted)' }}>New task</em>}
            </span>
            <span className="task-card__category">{task.category}</span>
          </div>
          <div className="task-card__meta">
            <span className="task-card__owner" style={{ background: ownerStyle.background, color: ownerStyle.color }}>
              {task.owner}
            </span>
            <span className={`task-card__date${isOverdue ? ' task-card__date--overdue' : ''}`}>
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskCard
