/**
 * GoalProgress — Dashboard widget listing wedding goals with completion indicators.
 * Each goal shows a circular indicator (filled when complete) and a title.
 * Accepts a `goals` prop (array of { title: string, completed: boolean }).
 * Defaults to hardcoded sample data until Supabase is wired up.
 */
import DashboardCard from './DashboardCard'

const SAMPLE_GOALS = [
  { id: 1, title: 'Lock in the venue',              completed: true  },
  { id: 2, title: 'Set a final guest count',         completed: true  },
  { id: 3, title: 'Choose wedding party',            completed: true  },
  { id: 4, title: 'Book all key vendors',            completed: false },
  { id: 5, title: 'Finalise ceremony details',       completed: false },
  { id: 6, title: 'Plan the honeymoon',              completed: false },
]

function GoalProgress({ goals = SAMPLE_GOALS }) {
  const completed = goals.filter(g => g.completed).length
  const total     = goals.length

  return (
    <>
      <style>{`
        .goal-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .goal-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .goal-item__indicator {
          flex-shrink: 0;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid var(--border);
          background: transparent;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .goal-item__indicator--complete {
          background: var(--sage);
          border-color: var(--sage);
        }

        .goal-item__title {
          font-size: 0.9rem;
          color: var(--text);
          line-height: 1.4;
        }

        .goal-item__title--complete {
          color: var(--text-muted);
          text-decoration: line-through;
          text-decoration-color: var(--sage);
        }

        .goal-progress__summary {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: right;
          padding-top: 0.25rem;
          border-top: 1px solid var(--border);
        }
      `}</style>

      <DashboardCard title="Goals">
        <ul className="goal-list" role="list">
          {goals.map(goal => (
            <li key={goal.id} className="goal-item">
              <span
                className={`goal-item__indicator${goal.completed ? ' goal-item__indicator--complete' : ''}`}
                aria-hidden="true"
              />
              <span className={`goal-item__title${goal.completed ? ' goal-item__title--complete' : ''}`}>
                {goal.title}
              </span>
            </li>
          ))}
        </ul>
        <p className="goal-progress__summary">{completed} of {total} goals complete</p>
      </DashboardCard>
    </>
  )
}

export default GoalProgress
