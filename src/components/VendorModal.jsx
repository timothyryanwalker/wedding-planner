/**
 * VendorModal — add/edit modal for a single vendor.
 * Renders a full-screen overlay with a scrollable form card.
 * Clicking the backdrop closes the modal.
 * Handles all vendor fields and a dynamic payments list.
 * Props: vendor (object|null), onSave, onDelete, onClose
 */
import { useState, useEffect } from 'react'

const CATEGORY_OPTIONS = [
  'Florist', 'Hair & Makeup', 'Photography', 'Videography',
  'DJ', 'Cake', 'Transportation', 'Venue', 'Photobooth', 'Officiant', 'Other',
]

const STATUS_OPTIONS = ['Researching', 'Contacted', 'Booked', 'Paid in Full']

function VendorModal({ vendor, onSave, onDelete, onClose }) {
  const [name,         setName]         = useState('')
  const [category,     setCategory]     = useState('Other')
  const [status,       setStatus]       = useState('Researching')
  const [contactName,  setContactName]  = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [instagram,    setInstagram]    = useState('')
  const [website,      setWebsite]      = useState('')
  const [notes,        setNotes]        = useState('')
  const [packages,     setPackages]     = useState('')
  const [pricing,      setPricing]      = useState('')
  const [payments,     setPayments]     = useState([])

  /* Reset all fields when a new vendor is opened */
  useEffect(() => {
    if (vendor) {
      setName(vendor.name          ?? '')
      setCategory(vendor.category  ?? 'Other')
      setStatus(vendor.status      ?? 'Researching')
      setContactName(vendor.contactName   ?? '')
      setContactEmail(vendor.contactEmail ?? '')
      setContactPhone(vendor.contactPhone ?? '')
      setInstagram(vendor.instagram ?? '')
      setWebsite(vendor.website     ?? '')
      setNotes(vendor.notes         ?? '')
      setPackages(vendor.packages   ?? '')
      setPricing(vendor.pricing     ?? '')
      setPayments(vendor.payments   ?? [])
    }
  }, [vendor])

  if (!vendor) return null

  const isNew = typeof vendor.id === 'string' ? vendor.id.startsWith('-') : vendor.id < 0

  function handleSave() {
    if (!name.trim()) return
    onSave({
      ...vendor,
      name: name.trim(),
      category, status,
      contactName, contactEmail, contactPhone,
      instagram, website, notes, packages, pricing,
      payments: payments.map(p => ({ ...p, amount: parseFloat(p.amount) || 0 })),
    })
  }

  function handleAddPayment() {
    setPayments(prev => [...prev, { id: -Date.now(), label: '', amount: '', dueDate: '', paid: false }])
  }

  function handlePaymentChange(id, field, value) {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  function handleRemovePayment(id) {
    setPayments(prev => prev.filter(p => p.id !== id))
  }

  return (
    <>
      <style>{`
        .vendor-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(48, 14, 15, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .vendor-modal {
          background: var(--ivory-dark);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: rgba(48, 14, 15, 0.2) 0 12px 40px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .vendor-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem 0;
        }

        .vendor-modal__title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--text-heading);
        }

        .vendor-modal__close {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
        }

        .vendor-modal__close:hover {
          color: var(--text);
        }

        .vendor-modal__body {
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .vendor-modal__section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .vendor-modal__section-label {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: var(--text-muted);
        }

        .vendor-modal__row {
          display: flex;
          gap: 0.6rem;
        }

        .vendor-modal__input,
        .vendor-modal__select,
        .vendor-modal__textarea {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--text);
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.4rem 0.6rem;
          width: 100%;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .vendor-modal__input:focus,
        .vendor-modal__select:focus,
        .vendor-modal__textarea:focus {
          border-color: var(--rose);
        }

        .vendor-modal__textarea {
          resize: vertical;
          min-height: 72px;
        }

        /* Payment rows */
        .vendor-modal__payment-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .vendor-modal__payment-label  { flex: 2; }
        .vendor-modal__payment-amount { flex: 1; }
        .vendor-modal__payment-date   { flex: 1; }

        .vendor-modal__payment-paid {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          accent-color: var(--sage);
          cursor: pointer;
        }

        .vendor-modal__payment-remove {
          flex-shrink: 0;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1rem;
          cursor: pointer;
          padding: 0 0.25rem;
          line-height: 1;
        }

        .vendor-modal__payment-remove:hover {
          color: var(--rose);
        }

        .vendor-modal__add-payment {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--rose);
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .vendor-modal__add-payment:hover {
          text-decoration: underline;
        }

        /* Footer */
        .vendor-modal__footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem 1.25rem;
          border-top: 1px solid var(--border);
        }

        .vendor-modal__btn {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .vendor-modal__btn--save {
          background: var(--sage);
          color: var(--ivory);
          border-color: var(--sage);
        }

        .vendor-modal__btn--save:hover {
          background: var(--sage-dark);
          border-color: var(--sage-dark);
        }

        .vendor-modal__btn--cancel {
          background: transparent;
          color: var(--text-muted);
        }

        .vendor-modal__btn--cancel:hover {
          background: var(--border);
        }

        .vendor-modal__btn--delete {
          margin-left: auto;
          background: transparent;
          color: var(--rose);
          border-color: var(--rose);
        }

        .vendor-modal__btn--delete:hover {
          background: var(--rose);
          color: var(--ivory);
        }
      `}</style>

      <div className="vendor-modal-overlay" onClick={onClose}>
        <div className="vendor-modal" onClick={e => e.stopPropagation()}>

          <div className="vendor-modal__header">
            <span className="vendor-modal__title">{isNew ? 'New Vendor' : name || 'Edit Vendor'}</span>
            <button className="vendor-modal__close" onClick={onClose} aria-label="Close">×</button>
          </div>

          <div className="vendor-modal__body">

            {/* Basics */}
            <div className="vendor-modal__section">
              <span className="vendor-modal__section-label">Basics</span>
              <input
                className="vendor-modal__input"
                type="text"
                placeholder="Vendor name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
              <div className="vendor-modal__row">
                <select className="vendor-modal__select" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="vendor-modal__select" value={status} onChange={e => setStatus(e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Contact */}
            <div className="vendor-modal__section">
              <span className="vendor-modal__section-label">Contact</span>
              <div className="vendor-modal__row">
                <input className="vendor-modal__input" type="text"  placeholder="Name"  value={contactName}  onChange={e => setContactName(e.target.value)}  />
                <input className="vendor-modal__input" type="email" placeholder="Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
              </div>
              <input className="vendor-modal__input" type="tel" placeholder="Phone" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
            </div>

            {/* Online */}
            <div className="vendor-modal__section">
              <span className="vendor-modal__section-label">Online</span>
              <div className="vendor-modal__row">
                <input className="vendor-modal__input" type="text" placeholder="Instagram (e.g. @handle)" value={instagram} onChange={e => setInstagram(e.target.value)} />
                <input className="vendor-modal__input" type="text" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
              </div>
            </div>

            {/* Notes */}
            <div className="vendor-modal__section">
              <span className="vendor-modal__section-label">Notes</span>
              <textarea
                className="vendor-modal__textarea"
                placeholder="Any notes about this vendor..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Packages & Pricing */}
            <div className="vendor-modal__section">
              <span className="vendor-modal__section-label">Packages &amp; Pricing</span>
              <textarea
                className="vendor-modal__textarea"
                placeholder="Packages offered..."
                value={packages}
                onChange={e => setPackages(e.target.value)}
                rows={3}
              />
              <textarea
                className="vendor-modal__textarea"
                placeholder="Pricing details..."
                value={pricing}
                onChange={e => setPricing(e.target.value)}
                rows={3}
              />
            </div>

            {/* Payments */}
            <div className="vendor-modal__section">
              <span className="vendor-modal__section-label">Payments</span>
              {payments.map(p => (
                <div key={p.id} className="vendor-modal__payment-row">
                  <input
                    className="vendor-modal__input vendor-modal__payment-label"
                    type="text"
                    placeholder="Label"
                    value={p.label}
                    onChange={e => handlePaymentChange(p.id, 'label', e.target.value)}
                  />
                  <input
                    className="vendor-modal__input vendor-modal__payment-amount"
                    type="number"
                    placeholder="Amount"
                    value={p.amount}
                    onChange={e => handlePaymentChange(p.id, 'amount', e.target.value)}
                  />
                  <input
                    className="vendor-modal__input vendor-modal__payment-date"
                    type="date"
                    value={p.dueDate}
                    onChange={e => handlePaymentChange(p.id, 'dueDate', e.target.value)}
                  />
                  <input
                    type="checkbox"
                    className="vendor-modal__payment-paid"
                    checked={p.paid}
                    onChange={e => handlePaymentChange(p.id, 'paid', e.target.checked)}
                    aria-label="Mark as paid"
                  />
                  <button
                    className="vendor-modal__payment-remove"
                    onClick={() => handleRemovePayment(p.id)}
                    aria-label="Remove payment"
                  >×</button>
                </div>
              ))}
              <button className="vendor-modal__add-payment" onClick={handleAddPayment}>
                + Add payment
              </button>
            </div>

          </div>

          <div className="vendor-modal__footer">
            <button className="vendor-modal__btn vendor-modal__btn--save" onClick={handleSave}>Save</button>
            <button className="vendor-modal__btn vendor-modal__btn--cancel" onClick={onClose}>Cancel</button>
            {!isNew && (
              <button className="vendor-modal__btn vendor-modal__btn--delete" onClick={() => onDelete(vendor.id)}>
                Delete
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default VendorModal
