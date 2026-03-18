/**
 * TaskForm — form for adding and editing a single task.
 * Rendered inside Drawer. Resets all fields when the `task` prop changes.
 * Props: task (object|null), onSave(updatedTask), onDelete(id), onClose
 */
import { useState, useEffect } from 'react'

const OWNER_OPTIONS    = ['Taylor', 'Timothy', 'Both']
const CATEGORY_OPTIONS = ['Admin', 'Attire', 'Flowers', 'Honeymoon', 'Music', 'Photography', 'Stationery', 'Venue', 'Other']
const PRIORITY_OPTIONS = ['High', 'Medium', 'Low']

function TaskForm({ task, onSave, onDelete, onClose, goals = [] }) {
  const [title,    setTitle]    = useState('')
  const [owner,    setOwner]    = useState('Both')
  const [category, setCategory] = useState('Admin')
  const [priority, setPriority] = useState('Medium')
  const [dueDate,  setDueDate]  = useState('')
  const [goalId,   setGoalId]   = useState(null)

  useEffect(() => {
    if (!task) return
    setTitle(   task.title    ?? '')
    setOwner(   task.owner    ?? 'Both')
    setCategory(task.category ?? 'Admin')
    setPriority(task.priority ?? 'Medium')
    setDueDate( task.dueDate  ?? '')
    setGoalId(  task.goalId   ?? null)
  }, [task])

  const isNew = task?.id < 0

  function handleSave() {
    if (!title.trim()) return
    onSave({ ...task, title: title.trim(), owner, category, priority, dueDate, goalId })
  }

  return (
    <>
      <style>{`
        .tf__section {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .tf__section:first-child {
          margin-top: 0;
        }

        .tf__field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-bottom: 0.75rem;
        }

        .tf__label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        .tf__input,
        .tf__select {
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

        .tf__input:focus,
        .tf__select:focus {
          border-color: var(--rose);
        }

        .tf__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .tf__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .tf__footer-left {
          display: flex;
          gap: 0.5rem;
        }

        .tf__btn {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .tf__btn--save {
          background: var(--sage-dark);
          color: var(--ivory);
          border: none;
        }

        .tf__btn--save:hover {
          background: var(--sage);
        }

        .tf__btn--cancel {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .tf__btn--cancel:hover {
          border-color: var(--text-muted);
          color: var(--text);
        }

        .tf__btn--delete {
          background: transparent;
          color: var(--rose);
          border: 1px solid var(--rose);
        }

        .tf__btn--delete:hover {
          background: var(--rose);
          color: var(--ivory);
        }
      `}</style>

      <p className="tf__section">Task</p>

      <div className="tf__field">
        <label className="tf__label">Title</label>
        <input
          className="tf__input"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Book florist"
          autoFocus
        />
      </div>

      <div className="tf__row">
        <div className="tf__field">
          <label className="tf__label">Owner</label>
          <select className="tf__select" value={owner} onChange={e => setOwner(e.target.value)}>
            {OWNER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="tf__field">
          <label className="tf__label">Priority</label>
          <select className="tf__select" value={priority} onChange={e => setPriority(e.target.value)}>
            {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="tf__field">
        <label className="tf__label">Category</label>
        <select className="tf__select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="tf__field">
        <label className="tf__label">Due date</label>
        <input
          className="tf__input"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>

      <div className="tf__field">
        <label className="tf__label">Link to goal</label>
        <select className="tf__select" value={goalId ?? ''} onChange={e => setGoalId(e.target.value || null)}>
          <option value="">No goal</option>
          {goals.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </div>

      <div className="tf__footer">
        <div className="tf__footer-left">
          <button className="tf__btn tf__btn--save" onClick={handleSave}>Save</button>
          <button className="tf__btn tf__btn--cancel" onClick={onClose}>Cancel</button>
        </div>
        {!isNew && (
          <button className="tf__btn tf__btn--delete" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        )}
      </div>
    </>
  )
}

export default TaskForm
