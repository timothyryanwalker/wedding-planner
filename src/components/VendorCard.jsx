/**
 * VendorCard — summary card for a single vendor.
 * Displays name, category, status badge, total cost, and next payment due.
 * Clicking the card opens the vendor in edit mode via onEdit(vendor).
 * vendor shape: { id, name, category, status, contactName, contactEmail,
 *   contactPhone, instagram, website, notes,
 *   payments: [{ id, label, amount, dueDate, paid }] }
 * Cards use uniform border, lifted shadow, and 16px radius.
 */

const STATUS_STYLES = {
  'Researching':   { background: 'var(--gold)',      color: 'var(--ivory)' },
  'Contacted':     { background: 'var(--sage)',      color: 'var(--ivory)' },
  'Booked':        { background: 'var(--rose)',      color: 'var(--ivory)' },
  'Paid in Full':  { background: 'var(--sage-dark)', color: 'var(--ivory)' },
}

const fmt = amount =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)

function VendorCard({ vendor, onEdit }) {
  const payments = vendor.payments ?? []

  const totalCost = payments.length > 0
    ? fmt(payments.reduce((sum, p) => sum + (p.amount ?? 0), 0))
    : '—'

  const unpaid = payments
    .filter(p => !p.paid)
    .sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

  const next = unpaid[0] ?? null
  const nextDue = next?.dueDate ? new Date(next.dueDate) : null
  if (nextDue) nextDue.setHours(0, 0, 0, 0)
  const nextIsOverdue = nextDue && nextDue < TODAY

  const nextLabel = next
    ? next.dueDate
      ? `${next.label} · ${nextDue.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      : `${next.label} · TBD`
    : '—'

  const statusStyle = STATUS_STYLES[vendor.status] ?? STATUS_STYLES['Researching']

  return (
    <>
      <style>{`
        .vendor-card {
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-lifted);
          padding: 1.1rem 1.2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .vendor-card:hover {
          transform: translateY(-2px);
          box-shadow: rgba(90, 60, 40, 0.13) 0 6px 20px, rgba(90, 60, 40, 0.06) 0 2px 6px;
        }

        .vendor-card__status {
          align-self: flex-start;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.18rem 0.6rem;
          border-radius: 999px;
        }

        .vendor-card__name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-heading);
          margin-top: 0.1rem;
        }

        .vendor-card__category {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .vendor-card__divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0.35rem 0;
        }

        .vendor-card__meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .vendor-card__meta-row {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
        }

        .vendor-card__meta-label {
          color: var(--text-muted);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .vendor-card__meta-value {
          color: var(--text);
        }

        .vendor-card__meta-value--overdue {
          color: #d94f35;
          font-weight: 500;
        }
      `}</style>

      <div className="vendor-card" onClick={() => onEdit(vendor)}>
        <span
          className="vendor-card__status"
          style={{ background: statusStyle.background, color: statusStyle.color }}
        >
          {vendor.status}
        </span>

        <div className="vendor-card__name">{vendor.name}</div>
        <div className="vendor-card__category">{vendor.category}</div>

        <hr className="vendor-card__divider" />

        <div className="vendor-card__meta">
          <div className="vendor-card__meta-row">
            <span className="vendor-card__meta-label">Total</span>
            <span className="vendor-card__meta-value">{totalCost}</span>
          </div>
          <div className="vendor-card__meta-row">
            <span className="vendor-card__meta-label">Next</span>
            <span className={`vendor-card__meta-value${nextIsOverdue ? ' vendor-card__meta-value--overdue' : ''}`}>
              {nextLabel}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorCard
