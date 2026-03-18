/**
 * BudgetItemForm — form for adding and editing a single budget item.
 * Rendered inside Drawer. Resets all fields when the `item` prop changes.
 * Props: item (object|null), onSave(updatedItem), onDelete(id), onClose
 */
import { useState, useEffect } from 'react'

const STATUS_OPTIONS   = ['Unpaid', 'Paid']
const WHO_OPTIONS      = ['Taylor', 'Timothy', 'Both']
const HOW_OPTIONS      = ['Check', 'Zelle', 'Credit Card', 'Bank Transfer', 'Cash', 'Other']
const CATEGORY_OPTIONS = [
  'Attire', 'Entertainment', 'Florals', 'Hair & Makeup',
  'Misc', 'Photography', 'Stationery', 'Transportation', 'Venue',
]

function BudgetItemForm({ item, onSave, onDelete, onClose }) {
  const [itemName, setItemName] = useState('')
  const [cost,     setCost]     = useState('')
  const [status,   setStatus]   = useState('Unpaid')
  const [who,      setWho]      = useState('')
  const [how,      setHow]      = useState('')
  const [dueDate,  setDueDate]  = useState('')
  const [datePaid, setDatePaid] = useState('')
  const [category, setCategory] = useState('Misc')
  const [notes,    setNotes]    = useState('')

  useEffect(() => {
    if (!item) return
    setItemName(item.item     ?? '')
    setCost(    item.cost     != null ? String(item.cost) : '')
    setStatus(  item.status   ?? 'Unpaid')
    setWho(     item.who      ?? '')
    setHow(     item.how      ?? '')
    setDueDate( item.dueDate  ?? '')
    setDatePaid(item.datePaid ?? '')
    setCategory(item.category ?? 'Misc')
    setNotes(   item.notes    ?? '')
  }, [item])

  const isNew = item?.id < 0

  function handleSave() {
    if (!itemName.trim()) return
    onSave({
      ...item,
      item:     itemName.trim(),
      cost:     parseFloat(cost) || 0,
      status,
      who,
      how,
      dueDate,
      datePaid,
      category,
      notes,
    })
  }

  return (
    <>
      <style>{`
        .bif__section {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .bif__section:first-child {
          margin-top: 0;
        }

        .bif__field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-bottom: 0.75rem;
        }

        .bif__label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        .bif__input,
        .bif__select,
        .bif__textarea {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--text);
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.45rem 0.65rem;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
          outline: none;
        }

        .bif__input:focus,
        .bif__select:focus,
        .bif__textarea:focus {
          border-color: var(--rose);
        }

        .bif__textarea {
          resize: vertical;
          min-height: 72px;
        }

        .bif__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .bif__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .bif__footer-left {
          display: flex;
          gap: 0.5rem;
        }

        .bif__btn {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .bif__btn--save {
          background: var(--sage-dark);
          color: var(--ivory);
          border: none;
        }

        .bif__btn--save:hover {
          background: var(--sage);
        }

        .bif__btn--cancel {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .bif__btn--cancel:hover {
          border-color: var(--text-muted);
          color: var(--text);
        }

        .bif__btn--delete {
          background: transparent;
          color: var(--rose);
          border: 1px solid var(--rose);
        }

        .bif__btn--delete:hover {
          background: var(--rose);
          color: var(--ivory);
        }
      `}</style>

      <p className="bif__section">Basics</p>

      <div className="bif__field">
        <label className="bif__label">Item name</label>
        <input
          className="bif__input"
          type="text"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
          placeholder="e.g. Venue deposit"
        />
      </div>

      <div className="bif__row">
        <div className="bif__field">
          <label className="bif__label">Cost ($)</label>
          <input
            className="bif__input"
            type="number"
            min="0"
            step="0.01"
            value={cost}
            onChange={e => setCost(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="bif__field">
          <label className="bif__label">Status</label>
          <select className="bif__select" value={status} onChange={e => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <p className="bif__section">Details</p>

      <div className="bif__field">
        <label className="bif__label">Category</label>
        <select className="bif__select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bif__field">
        <label className="bif__label">Who pays</label>
        <select className="bif__select" value={who} onChange={e => setWho(e.target.value)}>
          <option value="">—</option>
          {WHO_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>

      <div className="bif__field">
        <label className="bif__label">How</label>
        <select className="bif__select" value={how} onChange={e => setHow(e.target.value)}>
          <option value="">—</option>
          {HOW_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>

      <div className="bif__row">
        <div className="bif__field">
          <label className="bif__label">Due date</label>
          <input
            className="bif__input"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="bif__field">
          <label className="bif__label">Date paid</label>
          <input
            className="bif__input"
            type="date"
            value={datePaid}
            onChange={e => setDatePaid(e.target.value)}
          />
        </div>
      </div>

      <p className="bif__section">Notes</p>

      <div className="bif__field">
        <textarea
          className="bif__textarea"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Any additional notes…"
        />
      </div>

      <div className="bif__footer">
        <div className="bif__footer-left">
          <button className="bif__btn bif__btn--save" onClick={handleSave}>Save</button>
          <button className="bif__btn bif__btn--cancel" onClick={onClose}>Cancel</button>
        </div>
        {!isNew && (
          <button className="bif__btn bif__btn--delete" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        )}
      </div>
    </>
  )
}

export default BudgetItemForm
