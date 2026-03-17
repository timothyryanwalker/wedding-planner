/**
 * Budget — budget tracking page.
 * Shows 4 summary cards, a progress bar, and a full sorted payment list.
 * Display-only for Phase 1 — CRUD to be added after layout approval.
 */

const TOTAL_BUDGET = 40000

const SAMPLE_BUDGET_ITEMS = [
  { id: 1,  item: 'Venue Payment 1',               cost: 5000,    status: 'Paid',   who: 'Timothy', how: 'Check',       dueDate: '2025-11-10', datePaid: '2025-11-10', category: 'Venue',         notes: '' },
  { id: 2,  item: 'Venue Security Deposit',         cost: 1000,    status: 'Paid',   who: 'Timothy', how: 'Check',       dueDate: '2025-11-10', datePaid: '2025-11-10', category: 'Venue',         notes: 'To be returned after wedding' },
  { id: 3,  item: 'Photo Booth Payment 1',          cost: 1865.07, status: 'Unpaid', who: 'Timothy', how: 'Check',       dueDate: '2025-12-16', datePaid: '',           category: 'Entertainment', notes: '' },
  { id: 4,  item: 'Photo Booth Payment 2',          cost: 1865.07, status: 'Unpaid', who: 'Timothy', how: 'Check',       dueDate: '2027-05-23', datePaid: '',           category: 'Entertainment', notes: '' },
  { id: 5,  item: 'Salt Florist Payment 1',         cost: 2391.34, status: 'Paid',   who: 'Timothy', how: 'Check',       dueDate: '2026-01-16', datePaid: '2026-01-29', category: 'Florals',       notes: '$277.95 to be deducted at finalization' },
  { id: 6,  item: 'Salt Florist Payment 2',         cost: 7174,    status: 'Unpaid', who: 'Timothy', how: 'Check',       dueDate: '2027-04-30', datePaid: '',           category: 'Florals',       notes: '' },
  { id: 7,  item: 'Air Hair & Makeup Deposit',      cost: 350,     status: 'Paid',   who: 'Taylor',  how: 'Zelle',       dueDate: '2026-01-29', datePaid: '2026-01-29', category: 'Hair & Makeup', notes: '' },
  { id: 8,  item: 'Air Hair & Makeup Trial',        cost: 400,     status: 'Unpaid', who: 'Taylor',  how: '',            dueDate: '',           datePaid: '',           category: 'Hair & Makeup', notes: '' },
  { id: 9,  item: 'Air Hair & Makeup Final',        cost: 1400,    status: 'Unpaid', who: 'Taylor',  how: '',            dueDate: '2027-05-20', datePaid: '',           category: 'Hair & Makeup', notes: 'Not including tips' },
  { id: 10, item: 'Wedding Dress Appointment Fees', cost: 67.80,   status: 'Paid',   who: 'Taylor',  how: 'Credit Card', dueDate: '',           datePaid: '2026-01-15', category: 'Attire',        notes: '' },
  { id: 11, item: 'Stamps (100)',                   cost: 129.75,  status: 'Paid',   who: 'Taylor',  how: 'Credit Card', dueDate: '',           datePaid: '2026-03-11', category: 'Stationery',    notes: '' },
  { id: 12, item: 'Save the Dates (Vistaprint)',    cost: 48.36,   status: 'Paid',   who: 'Taylor',  how: 'Credit Card', dueDate: '',           datePaid: '2026-03-11', category: 'Stationery',    notes: '' },
  { id: 13, item: 'Font Purchase',                  cost: 150,     status: 'Paid',   who: 'Taylor',  how: 'Credit Card', dueDate: '',           datePaid: '',           category: 'Stationery',    notes: '' },
]

const CATEGORY_STYLES = {
  'Venue':          { background: 'var(--rose)',        color: 'var(--ivory)'    },
  'Florals':        { background: 'var(--sage)',        color: 'var(--ivory)'    },
  'Hair & Makeup':  { background: 'var(--ivory-dark)',  color: 'var(--rose-dark)'},
  'Attire':         { background: 'var(--gold)',        color: 'var(--ivory)'    },
  'Stationery':     { background: 'var(--sage-light)',  color: 'var(--sage-dark)'},
  'Photography':    { background: 'var(--gold-light)',  color: 'var(--ivory)'    },
  'Entertainment':  { background: 'var(--sage-dark)',   color: 'var(--ivory)'    },
  'Transportation': { background: 'var(--border)',      color: 'var(--text-muted)'},
  'Misc':           { background: 'var(--border)',      color: 'var(--text-muted)'},
}

const WHO_STYLES = {
  'Taylor':  { background: 'var(--rose)', color: 'var(--ivory)' },
  'Timothy': { background: 'var(--sage)', color: 'var(--ivory)' },
  'Both':    { background: 'var(--gold)', color: 'var(--ivory)' },
}

const STATUS_STYLES = {
  'Paid':   { background: 'var(--sage-dark)', color: 'var(--ivory)' },
  'Unpaid': { background: 'var(--gold)',      color: 'var(--ivory)' },
}

const fmtUSD = (amount, decimals = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: decimals }).format(amount)

const fmtDate = iso => {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Budget() {
  const items = SAMPLE_BUDGET_ITEMS

  const totalSpent  = items.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.cost, 0)
  const totalUnpaid = items.filter(i => i.status === 'Unpaid').reduce((sum, i) => sum + i.cost, 0)
  const remaining   = TOTAL_BUDGET - totalSpent
  const progressPct = Math.min((totalSpent / TOTAL_BUDGET) * 100, 100)

  const sorted = [...items].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'Paid' ? 1 : -1
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  return (
    <>
      <style>{`
        .budget-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        .budget-page__header {
          margin-bottom: 1.75rem;
        }

        .budget-page__title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 500;
          color: var(--text-heading);
          margin-bottom: 0.25rem;
        }

        .budget-page__summary {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--text-muted);
        }

        .budget-page__cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .budget-card {
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.1rem 1.25rem;
          box-shadow: var(--shadow);
        }

        .budget-card__label {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }

        .budget-card__value {
          font-family: var(--font-heading);
          font-size: 1.55rem;
          font-weight: 500;
          color: var(--text-heading);
        }

        .budget-card__value--alert {
          color: var(--rose);
        }

        .budget-progress {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .budget-progress__track {
          flex: 1;
          height: 8px;
          background: var(--ivory-dark);
          border-radius: 999px;
          overflow: hidden;
        }

        .budget-progress__fill {
          height: 100%;
          background: var(--rose);
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .budget-progress__label {
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .budget-list {
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .budget-row {
          display: grid;
          grid-template-columns: 1fr auto auto 6rem 8.5rem 6.5rem auto;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1rem;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-body);
        }

        .budget-row:last-child {
          border-bottom: none;
        }

        .budget-row--header {
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          background: var(--ivory-dark);
          padding: 0.55rem 1rem;
        }

        .budget-row--paid {
          opacity: 0.55;
        }

        .budget-row__name {
          font-size: 0.875rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .budget-row__note-dot {
          font-size: 0.9rem;
          color: var(--text-muted);
          flex-shrink: 0;
          cursor: default;
        }

        .budget-row__muted {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .budget-row__amount {
          font-size: 0.875rem;
          color: var(--text);
          font-weight: 500;
          justify-self: end;
          text-align: right;
        }

        .budget-badge {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.18rem 0.55rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .budget-badge--empty {
          background: none;
          color: var(--text-muted);
          padding: 0;
          letter-spacing: 0;
        }

        @media (max-width: 768px) {
          .budget-page__cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="budget-page">
        <header className="budget-page__header">
          <h1 className="budget-page__title">Budget</h1>
          <p className="budget-page__summary">
            {fmtUSD(totalSpent, 0)} of {fmtUSD(TOTAL_BUDGET, 0)} spent
          </p>
        </header>

        <div className="budget-page__cards">
          <div className="budget-card">
            <div className="budget-card__label">Total Budget</div>
            <div className="budget-card__value">{fmtUSD(TOTAL_BUDGET, 0)}</div>
          </div>
          <div className="budget-card">
            <div className="budget-card__label">Total Spent</div>
            <div className="budget-card__value">{fmtUSD(totalSpent, 0)}</div>
          </div>
          <div className="budget-card">
            <div className="budget-card__label">Remaining</div>
            <div className={`budget-card__value${remaining < 0 ? ' budget-card__value--alert' : ''}`}>
              {fmtUSD(remaining, 0)}
            </div>
          </div>
          <div className="budget-card">
            <div className="budget-card__label">Total Unpaid</div>
            <div className="budget-card__value">{fmtUSD(totalUnpaid, 0)}</div>
          </div>
        </div>

        <div className="budget-progress">
          <div className="budget-progress__track">
            <div className="budget-progress__fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="budget-progress__label">{progressPct.toFixed(1)}% spent</span>
        </div>

        <div className="budget-list">
          <div className="budget-row budget-row--header">
            <span>Item</span>
            <span>Category</span>
            <span>Who</span>
            <span>How</span>
            <span>Due</span>
            <span className="budget-row__amount">Amount</span>
            <span>Status</span>
          </div>

          {sorted.map(item => (
            <div
              key={item.id}
              className={`budget-row${item.status === 'Paid' ? ' budget-row--paid' : ''}`}
            >
              <span className="budget-row__name">
                {item.item}
                {item.notes && (
                  <span className="budget-row__note-dot" title={item.notes}>·</span>
                )}
              </span>

              <span
                className="budget-badge"
                style={CATEGORY_STYLES[item.category] ?? CATEGORY_STYLES['Misc']}
              >
                {item.category}
              </span>

              {item.who
                ? <span className="budget-badge" style={WHO_STYLES[item.who]}>{item.who}</span>
                : <span className="budget-badge budget-badge--empty">—</span>
              }

              <span className="budget-row__muted">{item.how || '—'}</span>
              <span className="budget-row__muted">{fmtDate(item.dueDate)}</span>
              <span className="budget-row__amount">{fmtUSD(item.cost)}</span>

              <span className="budget-badge" style={STATUS_STYLES[item.status]}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Budget
