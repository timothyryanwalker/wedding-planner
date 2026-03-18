/**
 * Dashboard — main overview page.
 * Romantic Editorial hero with couple name, date, diamond divider, and days countdown.
 * Assembles widgets: TaskSummary, BudgetSnapshot, GoalProgress in a 2-column grid below.
 */
import TaskSummary      from '../components/TaskSummary'
import BudgetSnapshot   from '../components/BudgetSnapshot'
import GoalProgress     from '../components/GoalProgress'
import DiamondDivider   from '../components/DiamondDivider'

function Dashboard() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date('2027-05-30')
  target.setHours(0, 0, 0, 0)
  const daysLeft = Math.round((target - today) / (1000 * 60 * 60 * 24))

  return (
    <>
      <style>{`
        .dashboard {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        /* Hero */
        .dashboard__hero {
          text-align: center;
          padding: 2rem 0 2.5rem;
        }

        .dashboard__names {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 3rem;
          font-weight: 400;
          color: var(--text-heading);
          line-height: 1.15;
          margin-bottom: 0.6rem;
        }

        .dashboard__date {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }

        .dashboard__countdown {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 4rem;
          font-weight: 300;
          color: var(--rose-dark);
          line-height: 1.1;
          margin-bottom: 0.4rem;
        }

        .dashboard__until {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }


        /* Grid */
        .dashboard__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .dashboard__full {
          grid-column: 1 / -1;
        }

        @media (max-width: 600px) {
          .dashboard__names {
            font-size: 2.2rem;
          }

          .dashboard__countdown {
            font-size: 3rem;
          }

          .dashboard__grid {
            grid-template-columns: 1fr;
          }

          .dashboard__full {
            grid-column: unset;
          }
        }
      `}</style>

      <div className="dashboard">

        <div className="dashboard__hero">
          <p className="dashboard__names">Taylor &amp; Timothy</p>
          <p className="dashboard__date">May 30, 2027</p>

          <DiamondDivider centered />

          <p className="dashboard__countdown">{daysLeft} days</p>
          <p className="dashboard__until">until your wedding</p>
        </div>

        <DiamondDivider centered />

        <div className="dashboard__grid">
          <TaskSummary />
          <BudgetSnapshot />
          <div className="dashboard__full"><GoalProgress /></div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
