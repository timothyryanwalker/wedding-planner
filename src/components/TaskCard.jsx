/**
 * TaskCard — a single task row in the Tasks list.
 * Collapsed: shows checkbox, title, owner badge, and due date.
 * Expanded: shows an inline edit form with save, cancel, and delete.
 * task shape: { id, title, completed, dueDate, owner, category, priority }
 */
import { useState, useEffect } from 'react'

const OWNER_OPTIONS    = ['Taylor', 'Timothy', 'Both']
const CATEGORY_OPTIONS = ['Admin', 'Attire', 'Flowers', 'Honeymoon', 'Music', 'Photography', 'Stationery', 'Venue', 'Other']
const PRIORITY_OPTIONS = ['High', 'Medium', 'Low']

const OWNER_STYLES = {
  Taylor:  { background: 'var(--rose)', color: 'var(--ivory)' },
  Timothy: { background: 'var(--sage)', color: 'var(--ivory)' },
  Both:    { background: 'var(--gold)', color: 'var(--ivory)' },
}

const PRIORITY_BORDER = {
  High:   '#d94f35',
  Medium: 'var(--gold)',
  Low:    'var(--sage)',
}

function TaskCard({ task, onToggle, isExpanded, onExpand, onSave, onDelete, onCancel }) {
  const [title,    setTitle]    = useState('')
  const [owner,    setOwner]    = useState('Both')
  const [category, setCategory] = useState('Admin')
  const [priority, setPriority] = useState('Medium')
  const [dueDate,  setDueDate]  = useState('')

  /* Reset form fields to current task values whenever the row is opened */
  useEffect(() => {
    if (isExpanded) {
      setTitle(task.title    ?? '')
      setOwner(task.owner    ?? 'Both')
      setCategory(task.category ?? 'Admin')
      setPriority(task.priority ?? 'Medium')
      setDueDate(task.dueDate  ?? '')
    }
  }, [isExpanded])

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)
  const isOverdue = !task.completed && task.dueDate && due < today

  const formattedDate = task.dueDate
    ? due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—'

  const ownerStyle = OWNER_STYLES[task.owner] ?? OWNER_STYLES.Both
  const isNew      = task.id < 0

  function handleSave() {
    if (!title.trim()) return
    onSave({ ...task, title: title.trim(), owner, category, priority, dueDate })
  }

  return (
    <>
      <style>{`
        .task-card {
          background: var(--ivory);
          border-bottom: 1px solid var(--border);
        }

        .task-card__row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .task-card__row:hover {
          background: var(--ivory-dark);
        }

        .task-card__checkbox {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          accent-color: var(--sage);
          cursor: pointer;
        }

        .task-card__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }

        .task-card__title {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .task-card__title--done {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .task-card__category {
          font-family: var(--font-body);
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .task-card__meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .task-card__owner {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .task-card__date {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-muted);
          white-space: nowrap;
          min-width: 4rem;
          text-align: right;
        }

        .task-card__date--overdue {
          color: #d94f35;
          font-weight: 500;
        }

        .task-card--done .task-card__body,
        .task-card--done .task-card__meta {
          opacity: 0.5;
        }

        /* ── Expanded edit form ── */

        .task-card__form {
          padding: 0.75rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          background: var(--ivory-dark);
          border-top: 1px solid var(--border);
        }

        .task-card__form-row {
          display: flex;
          gap: 0.6rem;
        }

        .task-card__input,
        .task-card__select {
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

        .task-card__input:focus,
        .task-card__select:focus {
          border-color: var(--rose);
        }

        .task-card__form-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .task-card__btn {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .task-card__btn--save {
          background: var(--sage);
          color: var(--ivory);
          border-color: var(--sage);
        }

        .task-card__btn--save:hover {
          background: var(--sage-dark);
          border-color: var(--sage-dark);
        }

        .task-card__btn--cancel {
          background: transparent;
          color: var(--text-muted);
        }

        .task-card__btn--cancel:hover {
          background: var(--border);
        }

        .task-card__btn--delete {
          margin-left: auto;
          background: transparent;
          color: var(--rose);
          border-color: var(--rose);
        }

        .task-card__btn--delete:hover {
          background: var(--rose);
          color: var(--ivory);
        }
      `}</style>

      <div
        className={`task-card${task.completed && !isExpanded ? ' task-card--done' : ''}`}
        style={{ borderLeft: `4px solid ${PRIORITY_BORDER[task.priority] ?? 'var(--border)'}` }}
      >
        {/* Collapsed row — always visible */}
        <div className="task-card__row" onClick={() => onExpand(task.id)}>
          <input
            type="checkbox"
            className="task-card__checkbox"
            checked={task.completed}
            onChange={e => { e.stopPropagation(); onToggle(task.id) }}
            onClick={e => e.stopPropagation()}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div className="task-card__body">
            <span className={`task-card__title${task.completed ? ' task-card__title--done' : ''}`}>
              {task.title || <em style={{ color: 'var(--text-muted)' }}>New task</em>}
            </span>
            <span className="task-card__category">{task.category}</span>
          </div>
          <div className="task-card__meta">
            <span className="task-card__owner" style={{ background: ownerStyle.background, color: ownerStyle.color }}>
              {task.owner}
            </span>
            <span className={`task-card__date${isOverdue ? ' task-card__date--overdue' : ''}`}>
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Expanded edit form */}
        {isExpanded && (
          <div className="task-card__form">
            <input
              className="task-card__input"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
            <div className="task-card__form-row">
              <select className="task-card__select" value={owner} onChange={e => setOwner(e.target.value)}>
                {OWNER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <select className="task-card__select" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="task-card__form-row">
              <select className="task-card__select" value={priority} onChange={e => setPriority(e.target.value)}>
                {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input
                className="task-card__input"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </div>
            <div className="task-card__form-footer">
              <button className="task-card__btn task-card__btn--save" onClick={handleSave}>Save</button>
              <button className="task-card__btn task-card__btn--cancel" onClick={onCancel}>Cancel</button>
              {!isNew && (
                <button className="task-card__btn task-card__btn--delete" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TaskCard
