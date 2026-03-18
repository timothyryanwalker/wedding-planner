/**
 * GoalCard — displays a single goal with derived progress from linked tasks.
 * Linked tasks are any tasks where task.goalId === goal.id.
 * Status is derived automatically from linked task completion.
 * Includes a collapsible task list and Edit / Delete actions.
 * Props: goal, tasks (full array), onEdit(goal), onDelete(id)
 */
import { useState } from 'react'

function GoalCard({ goal, tasks, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const linkedTasks    = tasks.filter(t => t.goalId === goal.id)
  const totalCount     = linkedTasks.length
  const completedCount = linkedTasks.filter(t => t.completed).length
  const progressPct    = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const status =
    totalCount === 0              ? 'No Tasks Yet'  :
    completedCount === totalCount ? 'Accomplished'  :
    completedCount === 0          ? 'Not Started'   :
                                    'In Progress'

  return (
    <div className="goal-card">

      <span className={`goal-status-badge goal-status-badge--${status.toLowerCase().replace(' ', '-')}`}>
        {status}
      </span>

      <div className="goal-card__title">{goal.title}</div>

      {goal.notes && (
        <p className="goal-card__notes">{goal.notes}</p>
      )}

      {totalCount > 0 && (
        <div className="goal-card__progress">
          <div className="goal-progress-bar">
            <div className="goal-progress-bar__fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="goal-card__count">
            {completedCount} of {totalCount} task{totalCount !== 1 ? 's' : ''} complete
          </p>
        </div>
      )}

      <button
        className="goal-card__toggle"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <span
          className="goal-card__chevron"
          style={{ display: 'inline-block', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          ▼
        </span>
        {isExpanded ? 'Hide tasks' : 'Show tasks'}
      </button>

      {isExpanded && (
        <ul className="goal-card__tasks">
          {linkedTasks.length > 0
            ? linkedTasks.map(task => (
                <li key={task.id} className="goal-card__task-item">
                  <span className="goal-card__task-icon">
                    {task.completed ? '◆' : '◇'}
                  </span>
                  <span className={`goal-card__task-title${task.completed ? ' goal-card__task-title--done' : ''}`}>
                    {task.title}
                  </span>
                </li>
              ))
            : <li className="goal-card__task-empty">No tasks linked to this goal yet.</li>
          }
        </ul>
      )}

      <div className="goal-card__footer">
        <button className="goal-card__btn goal-card__btn--edit" onClick={() => onEdit(goal)}>
          Edit
        </button>
        <button className="goal-card__btn goal-card__btn--delete" onClick={() => onDelete(goal.id)}>
          Delete
        </button>
      </div>

    </div>
  )
}

export default GoalCard
