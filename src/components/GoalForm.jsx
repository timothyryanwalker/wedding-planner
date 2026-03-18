/**
 * GoalForm — add/edit form for a single goal.
 * Rendered inside Drawer. Resets fields when initialData changes.
 * Props: initialData (goal object | null), onSave({ title, notes })
 */
import { useState, useEffect } from 'react'

function GoalForm({ initialData, onSave }) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setTitle(initialData?.title ?? '')
    setNotes(initialData?.notes ?? '')
  }, [initialData])

  function handleSave() {
    if (!title.trim()) return
    onSave({ title: title.trim(), notes })
  }

  return (
    <div className="goal-form">
      <p className="goal-form__section">Goal</p>

      <div className="goal-form__field">
        <label className="goal-form__label">Title</label>
        <input
          className="goal-form__input"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Book all vendors"
          autoFocus
        />
      </div>

      <div className="goal-form__field">
        <label className="goal-form__label">Notes</label>
        <textarea
          className="goal-form__textarea"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Any additional context…"
        />
      </div>

      <div className="goal-form__footer">
        <button className="goal-form__btn goal-form__btn--save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default GoalForm
