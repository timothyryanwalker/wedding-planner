/**
 * Tasks — full task management page.
 * Manages task toggle state and filter state.
 * Passes filtered/sorted tasks to TaskCard and filter state to TaskFilter.
 */
import { useState } from 'react'
import TaskCard   from '../components/TaskCard'
import TaskFilter from '../components/TaskFilter'

const SAMPLE_TASKS = [
  { id:  1, title: 'Ask Matt to be Best Man',                       completed: false, dueDate: '2026-03-20', owner: 'Timothy', category: 'Admin',       priority: 'High'   },
  { id:  2, title: 'Sign photobooth contract + send first payment', completed: false, dueDate: '2026-03-20', owner: 'Both',    category: 'Admin',       priority: 'High'   },
  { id:  3, title: 'Book engagement photoshoot',                    completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Photography', priority: 'High'   },
  { id:  4, title: 'Source photographer',                           completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Photography', priority: 'High'   },
  { id:  5, title: 'Source videographer',                           completed: false, dueDate: '2026-05-01', owner: 'Both',    category: 'Photography', priority: 'Medium' },
  { id:  6, title: 'Figure out who is marrying us',                 completed: false, dueDate: '2026-04-15', owner: 'Both',    category: 'Admin',       priority: 'High'   },
  { id:  7, title: 'Book remaining NYC dress appointments',         completed: false, dueDate: '2026-04-01', owner: 'Taylor',  category: 'Attire',      priority: 'High'   },
  { id:  8, title: 'Ceremony dress fitting/tailoring',              completed: false, dueDate: '2027-01-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id:  9, title: 'Reception dress fitting/tailoring',             completed: false, dueDate: '2027-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 10, title: 'Hair/makeup trial',                             completed: false, dueDate: '2027-03-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 11, title: 'Spray tan',                                     completed: false, dueDate: '2027-05-25', owner: 'Taylor',  category: 'Attire',      priority: 'Low'    },
  { id: 12, title: 'Manicure/pedicure',                             completed: false, dueDate: '2027-05-28', owner: 'Taylor',  category: 'Attire',      priority: 'Low'    },
  { id: 13, title: 'Tuxedo fitting/tailoring',                      completed: false, dueDate: '2027-01-01', owner: 'Timothy', category: 'Attire',      priority: 'Medium' },
  { id: 14, title: 'Haircut',                                       completed: false, dueDate: '2027-05-28', owner: 'Timothy', category: 'Attire',      priority: 'Low'    },
  { id: 15, title: 'Design website',                                completed: false, dueDate: '2026-06-01', owner: 'Both',    category: 'Stationery',  priority: 'Medium' },
  { id: 16, title: 'Design invitations',                            completed: false, dueDate: '2026-07-01', owner: 'Taylor',  category: 'Stationery',  priority: 'Medium' },
  { id: 17, title: 'Design programmes',                             completed: false, dueDate: '2027-02-01', owner: 'Taylor',  category: 'Stationery',  priority: 'Low'    },
  { id: 18, title: 'Build registry',                                completed: false, dueDate: '2026-05-01', owner: 'Both',    category: 'Admin',       priority: 'Medium' },
  { id: 19, title: 'Purchase website domain',                       completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Stationery',  priority: 'Medium' },
  { id: 20, title: 'Schedule photographer Zoom call',               completed: false, dueDate: '2026-03-25', owner: 'Both',    category: 'Photography', priority: 'High'   },
  { id: 21, title: 'Work on family shot lists',                     completed: false, dueDate: '2027-03-01', owner: 'Both',    category: 'Photography', priority: 'Low'    },
  { id: 22, title: 'Schedule venue tasting',                        completed: false, dueDate: '2026-06-01', owner: 'Both',    category: 'Venue',       priority: 'High'   },
  { id: 23, title: 'Determine officiant',                           completed: false, dueDate: '2026-05-01', owner: 'Both',    category: 'Admin',       priority: 'High'   },
  { id: 24, title: 'Write vows',                                    completed: false, dueDate: '2027-04-01', owner: 'Both',    category: 'Admin',       priority: 'Medium' },
  { id: 25, title: 'Select ceremony readings',                      completed: false, dueDate: '2027-03-01', owner: 'Both',    category: 'Admin',       priority: 'Low'    },
  { id: 26, title: 'Select walk in/out music',                      completed: false, dueDate: '2027-03-01', owner: 'Both',    category: 'Music',       priority: 'Low'    },
  { id: 27, title: 'Book DJ',                                       completed: false, dueDate: '2026-06-01', owner: 'Timothy', category: 'Music',       priority: 'High'   },
  { id: 28, title: 'Finalize florals vendor',                       completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Flowers',     priority: 'High'   },
  { id: 29, title: 'Design menus',                                  completed: false, dueDate: '2027-03-01', owner: 'Taylor',  category: 'Stationery',  priority: 'Low'    },
  { id: 30, title: 'Print menus',                                   completed: false, dueDate: '2027-04-15', owner: 'Taylor',  category: 'Stationery',  priority: 'Low'    },
  { id: 31, title: 'Select first dance song',                       completed: false, dueDate: '2026-08-01', owner: 'Both',    category: 'Music',       priority: 'Medium' },
  { id: 32, title: 'Book honeymoon flights',                        completed: false, dueDate: '2026-06-01', owner: 'Timothy', category: 'Honeymoon',   priority: 'High'   },
  { id: 33, title: 'Book honeymoon hotels/AirBnBs',                 completed: false, dueDate: '2026-06-01', owner: 'Both',    category: 'Honeymoon',   priority: 'High'   },
  { id: 34, title: 'Book honeymoon transportation',                 completed: false, dueDate: '2026-08-01', owner: 'Both',    category: 'Honeymoon',   priority: 'Medium' },
  { id: 35, title: 'Sort phone plan for honeymoon',                 completed: false, dueDate: '2027-04-01', owner: 'Both',    category: 'Honeymoon',   priority: 'Low'    },
  { id: 36, title: 'First dance lessons',                           completed: false, dueDate: '2026-09-01', owner: 'Both',    category: 'Admin',       priority: 'Medium' },
  { id: 37, title: 'Research rehearsal dinner venues',              completed: false, dueDate: '2026-07-01', owner: 'Both',    category: 'Venue',       priority: 'Medium' },
  { id: 38, title: 'Ask Karleigh to be MOH',                        completed: true,  dueDate: '2026-01-01', owner: 'Taylor',  category: 'Admin',       priority: 'High'   },
  { id: 39, title: 'Call hotels for wedding blocks',                completed: true,  dueDate: '2026-01-01', owner: 'Both',    category: 'Admin',       priority: 'High'   },
  { id: 40, title: 'Source HMU artist',                             completed: true,  dueDate: '2026-01-01', owner: 'Taylor',  category: 'Attire',      priority: 'High'   },
  { id: 41, title: 'Lovely Bride appointment (Philly)',             completed: true,  dueDate: '2026-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 42, title: 'Kinfolk appointment (Philly)',                  completed: true,  dueDate: '2026-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 43, title: 'Anthropologie appointment (Philly)',            completed: true,  dueDate: '2026-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 44, title: 'Lovely Bride appointment (NYC)',                completed: true,  dueDate: '2026-02-15', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 45, title: 'Sarah Seven appointment (NYC)',                 completed: true,  dueDate: '2026-02-15', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 46, title: 'Pay Salt Florist deposit',                      completed: true,  dueDate: '2026-01-29', owner: 'Both',    category: 'Flowers',     priority: 'High'   },
  { id: 47, title: 'Pay Air Hair & Makeup deposit',                 completed: true,  dueDate: '2026-01-29', owner: 'Taylor',  category: 'Attire',      priority: 'High'   },
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
