/**
 * TaskSummary — Dashboard widget showing task progress at a glance.
 * Displays total, completed, and overdue task counts plus a progress bar.
 * Accepts a `tasks` prop (array of { completed: bool, dueDate: string }).
 * Defaults to hardcoded sample data until Supabase is wired up.
 */
import DashboardCard from './DashboardCard'

const SAMPLE_TASKS = [
  { id: 1, title: 'Book the venue',          completed: true,  dueDate: '2026-06-01' },
  { id: 2, title: 'Choose florist',           completed: true,  dueDate: '2026-08-01' },
  { id: 3, title: 'Send save-the-dates',      completed: false, dueDate: '2026-04-01' },
  { id: 4, title: 'Schedule cake tasting',    completed: false, dueDate: '2026-05-01' },
  { id: 5, title: 'Finalise guest list',      completed: false, dueDate: '2026-09-01' },
  { id: 6, title: 'Book photographer',        completed: true,  dueDate: '2026-07-01' },
  { id: 7, title: 'Order wedding dress',      completed: false, dueDate: '2026-03-01' },
  { id: 8, title: 'Arrange accommodation',    completed: false, dueDate: '2026-02-01' },
]

function TaskSummary({ tasks = SAMPLE_TASKS }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const total     = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const overdue   = tasks.filter(t => {
    if (t.completed) return false
    const due = new Date(t.dueDate)
    due.setHours(0, 0, 0, 0)
    return due < today
  }).length

  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <>
      <style>{`
        .task-summary__stats {
          display: flex;
          gap: 1rem;
        }

        .task-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.75rem 0.5rem;
          gap: 0.25rem;
        }

        .task-stat__number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 600;
          color: var(--text-heading);
          line-height: 1;
        }

        .task-stat__number--overdue {
          color: var(--rose-dark);
        }

        .task-stat__label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .task-summary__progress-track {
          background: var(--sage-light);
          border-radius: 999px;
          height: 6px;
          overflow: hidden;
        }

        .task-summary__progress-fill {
          height: 100%;
          border-radius: 999px;
          background: var(--sage);
          transition: width 0.4s ease;
        }

        .task-summary__progress-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: right;
        }
      `}</style>

      <DashboardCard title="Tasks">
        <div className="task-summary__stats">
          <div className="task-stat">
            <span className="task-stat__number">{total}</span>
            <span className="task-stat__label">Total</span>
          </div>
          <div className="task-stat">
            <span className="task-stat__number">{completed}</span>
            <span className="task-stat__label">Done</span>
          </div>
          <div className="task-stat">
            <span className={`task-stat__number${overdue > 0 ? ' task-stat__number--overdue' : ''}`}>
              {overdue}
            </span>
            <span className="task-stat__label">Overdue</span>
          </div>
        </div>

        <div className="task-summary__progress-track">
          <div
            className="task-summary__progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="task-summary__progress-label">{progressPct}% complete</p>
      </DashboardCard>
    </>
  )
}

export default TaskSummary
