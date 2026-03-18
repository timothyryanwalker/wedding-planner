/**
 * Vendors — vendor management page.
 * Displays vendor cards in a responsive grid with category/status filters.
 * Add Vendor button and card clicks open VendorModal for add/edit/delete.
 */
import { useState, useRef, useEffect } from 'react'
import VendorCard  from '../components/VendorCard'
import VendorModal from '../components/VendorModal'
import PageHeader  from '../components/PageHeader'

const CATEGORY_OPTIONS = [
  'Florist', 'Hair & Makeup', 'Photography', 'Videography',
  'DJ', 'Cake', 'Transportation', 'Venue', 'Photobooth', 'Officiant', 'Other',
]

const STATUS_OPTIONS = ['Researching', 'Contacted', 'Booked', 'Paid in Full']

const SAMPLE_VENDORS = [
  {
    id: 1, name: 'Salt Florist', category: 'Florist', status: 'Booked',
    contactName: 'Megan Kyle', contactEmail: 'meg.saltfloral@gmail.com',
    contactPhone: '(215) 490-2276', instagram: '@saltfloral', website: '', notes: '',
    payments: [
      { id: 101, label: 'Deposit', amount: 2391.34, dueDate: '2026-01-29', paid: true  },
      { id: 102, label: 'Final',   amount: 7174,    dueDate: '2027-04-30', paid: false },
    ],
  },
  {
    id: 2, name: 'Air Hair & Makeup', category: 'Hair & Makeup', status: 'Booked',
    contactName: 'Sofiia Kozhushko', contactEmail: 'airhairandmakeup@gmail.com',
    contactPhone: '', instagram: '@airhairandmakeup', website: '', notes: '',
    payments: [
      { id: 201, label: 'Deposit',        amount: 350,  dueDate: '2026-01-29', paid: true  },
      { id: 202, label: 'Trial',          amount: 400,  dueDate: '',           paid: false },
      { id: 203, label: 'Bridal HMU',     amount: 700,  dueDate: '2027-05-20', paid: false },
      { id: 204, label: 'Bridesmaid HMU', amount: 1050, dueDate: '2027-05-20', paid: false },
    ],
  },
  {
    id: 3, name: 'Classic Photobooth', category: 'Photobooth', status: 'Contacted',
    contactName: 'Max', contactEmail: '', contactPhone: '',
    instagram: '', website: 'classicphotobooth.net', notes: '',
    payments: [],
  },
  {
    id: 4, name: 'Parque at Ridley Creek', category: 'Venue', status: 'Booked',
    contactName: '', contactEmail: '', contactPhone: '',
    instagram: '', website: '', notes: '1023 Sycamore Mills Rd, Media PA 19073',
    payments: [],
  },
  {
    id: 5, name: 'TBD Photographer', category: 'Photography', status: 'Researching',
    contactName: '', contactEmail: '', contactPhone: '',
    instagram: '', website: '', notes: '', payments: [],
  },
  {
    id: 6, name: 'TBD Videographer', category: 'Videography', status: 'Researching',
    contactName: '', contactEmail: '', contactPhone: '',
    instagram: '', website: '', notes: '', payments: [],
  },
  {
    id: 7, name: 'TBD DJ', category: 'DJ', status: 'Researching',
    contactName: '', contactEmail: '', contactPhone: '',
    instagram: '', website: '', notes: '', payments: [],
  },
  {
    id: 8, name: 'TBD Cake', category: 'Cake', status: 'Researching',
    contactName: '', contactEmail: '', contactPhone: '',
    instagram: '', website: '', notes: '', payments: [],
  },
]

const fmtCurrency = amount =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

function Vendors() {
  const [vendors,       setVendors]       = useState(SAMPLE_VENDORS)
  const [filters,       setFilters]       = useState({ category: [], status: [] })
  const [modalVendor,   setModalVendor]   = useState(null)
  const [openDropdown,  setOpenDropdown]  = useState(null) // 'category' | 'status' | null
  const filtersRef = useRef(null)

  useEffect(() => {
    function handleOutsideClick(e) {
      if (filtersRef.current && !filtersRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  function handleFilterToggle(key, value) {
    setFilters(prev => {
      const arr = prev[key]
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      }
    })
    // keep dropdown open so user can pick multiple
  }

  function handleFilterClear(key) {
    setFilters(prev => ({ ...prev, [key]: [] }))
  }

  function handleAddVendor() {
    setModalVendor({
      id: -Date.now(), name: '', category: 'Other', status: 'Researching',
      contactName: '', contactEmail: '', contactPhone: '',
      instagram: '', website: '', notes: '', payments: [],
    })
  }

  function handleEditVendor(vendor) {
    setModalVendor(vendor)
  }

  function handleSave(updatedVendor) {
    if (updatedVendor.id < 0) {
      setVendors(prev => [...prev, { ...updatedVendor, id: Date.now() }])
    } else {
      setVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v))
    }
    setModalVendor(null)
  }

  function handleDelete(id) {
    setVendors(prev => prev.filter(v => v.id !== id))
    setModalVendor(null)
  }

  function handleCloseModal() {
    setModalVendor(null)
  }

  const totalBudget = vendors.reduce((sum, v) =>
    sum + v.payments.reduce((s, p) => s + (p.amount ?? 0), 0), 0)

  const filtered = vendors
    .filter(v => filters.category.length === 0 || filters.category.includes(v.category))
    .filter(v => filters.status.length   === 0 || filters.status.includes(v.status))

  return (
    <>
      <style>{`
        .vendors-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }


        .vendors-page__toolbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .vf-wrap {
          display: flex;
          gap: 0.5rem;
        }

        .vf-dropdown {
          position: relative;
        }

        .vf-dropdown__btn {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 400;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--ivory);
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .vf-dropdown__btn:hover {
          border-color: var(--text-muted);
        }

        .vf-dropdown__btn--active {
          background: transparent;
          color: var(--rose);
          border-color: var(--rose);
        }

        .vf-dropdown__btn--active:hover {
          background: var(--ivory-dark);
          color: var(--rose-dark);
          border-color: var(--rose-dark);
        }

        .vf-dropdown__chevron {
          font-size: 0.65rem;
          opacity: 0.7;
        }

        .vf-dropdown__panel {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          z-index: 50;
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(48, 14, 15, 0.12);
          min-width: 160px;
          overflow: hidden;
        }

        .vf-dropdown__option {
          display: block;
          width: 100%;
          text-align: left;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 400;
          padding: 0.45rem 0.9rem;
          border: none;
          background: none;
          color: var(--text);
          cursor: pointer;
          transition: background 0.1s ease;
        }

        .vf-dropdown__option:hover {
          background: var(--ivory-dark);
        }

        .vf-dropdown__option--active {
          color: var(--rose);
          font-weight: 500;
        }

        .vf-dropdown__option--clear {
          color: var(--text-muted);
          font-size: 0.76rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
          margin-bottom: 0.1rem;
        }

        .vendors-page__add-btn {
          flex-shrink: 0;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: var(--rose);
          color: var(--ivory);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .vendors-page__add-btn:hover {
          background: var(--rose-dark);
        }

        .vendors-page__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.1rem;
        }

        .vendors-page__empty {
          grid-column: 1 / -1;
          padding: 3rem 1rem;
          text-align: center;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-muted);
        }
      `}</style>

      <div className="vendors-page">
        <PageHeader
          title="Vendors"
          summary={`${vendors.length} vendor${vendors.length !== 1 ? 's' : ''} · ${fmtCurrency(totalBudget)} total`}
        />

        <div className="vendors-page__toolbar">
          <div className="vf-wrap" ref={filtersRef}>

            {/* Category dropdown */}
            <div className="vf-dropdown">
              <button
                className={`vf-dropdown__btn${filters.category.length > 0 ? ' vf-dropdown__btn--active' : ''}`}
                onClick={() => setOpenDropdown(prev => prev === 'category' ? null : 'category')}
              >
                {filters.category.length === 0
                  ? 'All Categories'
                  : filters.category.length === 1
                    ? `${filters.category[0]} · ${filtered.length}`
                    : `${filters.category.length} Categories · ${filtered.length}`
                }
                <span className="vf-dropdown__chevron">▼</span>
              </button>
              {openDropdown === 'category' && (
                <div className="vf-dropdown__panel">
                  <button
                    className="vf-dropdown__option vf-dropdown__option--clear"
                    onClick={() => handleFilterClear('category')}
                  >Clear</button>
                  {CATEGORY_OPTIONS.map(c => (
                    <button
                      key={c}
                      className={`vf-dropdown__option${filters.category.includes(c) ? ' vf-dropdown__option--active' : ''}`}
                      onClick={() => handleFilterToggle('category', c)}
                    >
                      {filters.category.includes(c) ? '✓ ' : ''}{c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status dropdown */}
            <div className="vf-dropdown">
              <button
                className={`vf-dropdown__btn${filters.status.length > 0 ? ' vf-dropdown__btn--active' : ''}`}
                onClick={() => setOpenDropdown(prev => prev === 'status' ? null : 'status')}
              >
                {filters.status.length === 0
                  ? 'All Statuses'
                  : filters.status.length === 1
                    ? `${filters.status[0]} · ${filtered.length}`
                    : `${filters.status.length} Statuses · ${filtered.length}`
                }
                <span className="vf-dropdown__chevron">▼</span>
              </button>
              {openDropdown === 'status' && (
                <div className="vf-dropdown__panel">
                  <button
                    className="vf-dropdown__option vf-dropdown__option--clear"
                    onClick={() => handleFilterClear('status')}
                  >Clear</button>
                  {STATUS_OPTIONS.map(s => (
                    <button
                      key={s}
                      className={`vf-dropdown__option${filters.status.includes(s) ? ' vf-dropdown__option--active' : ''}`}
                      onClick={() => handleFilterToggle('status', s)}
                    >
                      {filters.status.includes(s) ? '✓ ' : ''}{s}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          <button className="vendors-page__add-btn" onClick={handleAddVendor}>+ Add Vendor</button>
        </div>

        <div className="vendors-page__grid">
          {filtered.length > 0
            ? filtered.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} onEdit={handleEditVendor} />
              ))
            : <p className="vendors-page__empty">No vendors match the current filters.</p>
          }
        </div>
      </div>

      <VendorModal
        vendor={modalVendor}
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Vendors
