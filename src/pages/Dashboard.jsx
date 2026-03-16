/**
 * Dashboard — main overview page.
 * Assembles all four widgets: WeddingCountdown, TaskSummary, BudgetSnapshot, GoalProgress.
 * Uses a 2-column CSS grid; countdown and goals span full width, tasks and budget sit side-by-side.
 */
import WeddingCountdown from '../components/WeddingCountdown'
import TaskSummary      from '../components/TaskSummary'
import BudgetSnapshot   from '../components/BudgetSnapshot'
import GoalProgress     from '../components/GoalProgress'

function Dashboard() {
  return (
    <>
      <style>{`
        .dashboard {
          max-width: 900px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        .dashboard__header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .dashboard__title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 500;
          color: var(--text-heading);
          margin-bottom: 0.35rem;
        }

        .dashboard__subtitle {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .dashboard__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .dashboard__grid > *:first-child,
        .dashboard__grid > *:last-child {
          grid-column: 1 / -1;
        }

        @media (max-width: 600px) {
          .dashboard__grid {
            grid-template-columns: 1fr;
          }

          .dashboard__grid > *:first-child,
          .dashboard__grid > *:last-child {
            grid-column: unset;
          }
        }
      `}</style>

      <div className="dashboard">
        <header className="dashboard__header">
          <h1 className="dashboard__title">Your Wedding</h1>
          <p className="dashboard__subtitle">Taylor &amp; Timothy &nbsp;·&nbsp; May 30, 2027</p>
        </header>

        <div className="dashboard__grid">
          <WeddingCountdown />
          <TaskSummary />
          <BudgetSnapshot />
          <GoalProgress />
        </div>
      </div>
    </>
  )
}

export default Dashboard
