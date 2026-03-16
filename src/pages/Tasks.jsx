/**
 * Tasks — full task management page.
 * Manages task toggle state and filter state.
 * Passes filtered/sorted tasks to TaskCard and filter state to TaskFilter.
 */
import { useState } from 'react'
import TaskCard   from '../components/TaskCard'
import TaskFilter from '../components/TaskFilter'

const SAMPLE_TASKS = [
  { id:  1, title: 'Book the venue',                  completed: true,  dueDate: '2026-03-01', owner: 'Both',    category: 'Venue'        },
  { id:  2, title: 'Schedule venue walkthrough',      completed: false, dueDate: '2026-03-20', owner: 'Both',    category: 'Venue'        },
  { id:  3, title: 'Finalise catering menu',          completed: false, dueDate: '2026-04-15', owner: 'Taylor',  category: 'Catering'     },
  { id:  4, title: 'Confirm guest dietary needs',     completed: false, dueDate: '2026-03-10', owner: 'Taylor',  category: 'Catering'     },
  { id:  5, title: 'Book photographer',               completed: true,  dueDate: '2026-02-01', owner: 'Both',    category: 'Photography'  },
  { id:  6, title: 'Schedule engagement shoot',       completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Photography'  },
  { id:  7, title: 'Choose florist',                  completed: true,  dueDate: '2026-02-15', owner: 'Taylor',  category: 'Flowers'      },
  { id:  8, title: 'Finalise floral arrangements',    completed: false, dueDate: '2026-05-01', owner: 'Taylor',  category: 'Flowers'      },
  { id:  9, title: 'Order wedding dress',             completed: false, dueDate: '2026-03-01', owner: 'Taylor',  category: 'Attire'       },
  { id: 10, title: 'Book suit fitting',               completed: false, dueDate: '2026-03-15', owner: 'Timothy', category: 'Attire'       },
  { id: 11, title: 'Book DJ / band',                  completed: false, dueDate: '2026-04-30', owner: 'Timothy', category: 'Music'        },
  { id: 12, title: 'Build ceremony playlist',         completed: false, dueDate: '2026-06-01', owner: 'Both',    category: 'Music'        },
  { id: 13, title: 'Design and order invitations',    completed: false, dueDate: '2026-03-01', owner: 'Taylor',  category: 'Stationery'   },
  { id: 14, title: 'Send save-the-dates',             completed: true,  dueDate: '2026-02-01', owner: 'Both',    category: 'Stationery'   },
  { id: 15, title: 'Research honeymoon destinations', completed: true,  dueDate: '2026-02-28', owner: 'Both',    category: 'Honeymoon'    },
  { id: 16, title: 'Book honeymoon flights',          completed: false, dueDate: '2026-05-15', owner: 'Timothy', category: 'Honeymoon'    },
  { id: 17, title: 'Apply for marriage licence',      completed: false, dueDate: '2026-03-01', owner: 'Both',    category: 'Admin'        },
  { id: 18, title: 'Arrange wedding insurance',       completed: false, dueDate: '2026-03-10', owner: 'Timothy', category: 'Admin'        },
]

const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)

function isOverdue(task) {
  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)
  return !task.completed && due < TODAY
}

function Tasks() {
  const [tasks,   setTasks]   = useState(SAMPLE_TASKS)
  const [filters, setFilters] = useState({ status: 'all', owner: 'all' })

  function handleToggle(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function handleFilterChange(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const completed = tasks.filter(t => t.completed).length
  const total     = tasks.length

  const filtered = tasks
    .filter(task => {
      if (filters.status === 'todo')     return !task.completed && !isOverdue(task)
      if (filters.status === 'complete') return task.completed
      if (filters.status === 'overdue')  return isOverdue(task)
      return true
    })
    .filter(task => {
      if (filters.owner !== 'all') return task.owner === filters.owner
      return true
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

  return (
    <>
      <style>{`
        .tasks-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        .tasks-page__header {
          margin-bottom: 1.5rem;
        }

        .tasks-page__title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 500;
          color: var(--text-heading);
          margin-bottom: 0.25rem;
        }

        .tasks-page__summary {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--text-muted);
        }

        .tasks-page__list {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .tasks-page__empty {
          padding: 3rem 1rem;
          text-align: center;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-muted);
          background: var(--ivory);
        }
      `}</style>

      <div className="tasks-page">
        <header className="tasks-page__header">
          <h1 className="tasks-page__title">Tasks</h1>
          <p className="tasks-page__summary">{completed} of {total} complete</p>
        </header>

        <div className="tasks-page__list">
          <TaskFilter filters={filters} onChange={handleFilterChange} />
          {filtered.length > 0
            ? filtered.map(task => (
                <TaskCard key={task.id} task={task} onToggle={handleToggle} />
              ))
            : <p className="tasks-page__empty">No tasks match the current filters.</p>
          }
        </div>
      </div>
    </>
  )
}

export default Tasks
