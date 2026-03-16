/**
 * BudgetSnapshot — Dashboard widget showing budget overview at a glance.
 * Displays total budget, amount spent, and remaining balance with a progress bar.
 * Accepts `totalBudget` (number) and `budgetItems` (array of { amount: number, paid: boolean }).
 * Defaults to hardcoded sample data until Supabase is wired up.
 */
import DashboardCard from './DashboardCard'

const SAMPLE_BUDGET_ITEMS = [
  { id: 1, label: 'Venue',          amount: 8000,  paid: true  },
  { id: 2, label: 'Catering',       amount: 6500,  paid: true  },
  { id: 3, label: 'Photography',    amount: 3200,  paid: false },
  { id: 4, label: 'Florist',        amount: 1800,  paid: false },
  { id: 5, label: 'Wedding dress',  amount: 2400,  paid: true  },
  { id: 6, label: 'Music / DJ',     amount: 1200,  paid: false },
  { id: 7, label: 'Cake',           amount:  600,  paid: false },
  { id: 8, label: 'Invitations',    amount:  300,  paid: true  },
]

const SAMPLE_TOTAL_BUDGET = 30000

const fmt = amount =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

function BudgetSnapshot({ totalBudget = SAMPLE_TOTAL_BUDGET, budgetItems = SAMPLE_BUDGET_ITEMS }) {
  const spent      = budgetItems.reduce((sum, item) => sum + item.amount, 0)
  const remaining  = totalBudget - spent
  const isOverBudget = remaining < 0
  const progressPct  = Math.min(Math.round((spent / totalBudget) * 100), 100)

  return (
    <>
      <style>{`
        .budget-snapshot__stats {
          display: flex;
          gap: 1rem;
        }

        .budget-stat {
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

        .budget-stat__number {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-heading);
          line-height: 1;
        }

        .budget-stat__number--over {
          color: var(--rose-dark);
        }

        .budget-stat__label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .budget-snapshot__progress-track {
          background: var(--gold-light);
          border-radius: 999px;
          height: 6px;
          overflow: hidden;
        }

        .budget-snapshot__progress-fill {
          height: 100%;
          border-radius: 999px;
          background: var(--gold);
          transition: width 0.4s ease;
        }

        .budget-snapshot__progress-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: right;
        }
      `}</style>

      <DashboardCard title="Budget">
        <div className="budget-snapshot__stats">
          <div className="budget-stat">
            <span className="budget-stat__number">{fmt(totalBudget)}</span>
            <span className="budget-stat__label">Total</span>
          </div>
          <div className="budget-stat">
            <span className="budget-stat__number">{fmt(spent)}</span>
            <span className="budget-stat__label">Spent</span>
          </div>
          <div className="budget-stat">
            <span className={`budget-stat__number${isOverBudget ? ' budget-stat__number--over' : ''}`}>
              {isOverBudget ? `-${fmt(Math.abs(remaining))}` : fmt(remaining)}
            </span>
            <span className="budget-stat__label">Remaining</span>
          </div>
        </div>

        <div className="budget-snapshot__progress-track">
          <div
            className="budget-snapshot__progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="budget-snapshot__progress-label">{progressPct}% of budget used</p>
      </DashboardCard>
    </>
  )
}

export default BudgetSnapshot
