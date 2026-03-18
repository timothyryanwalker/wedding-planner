/**
 * Goals — goal tracking page.
 * Displays goals grouped by status: Accomplished, In Progress, Not Started.
 * Add Goal button and Edit on GoalCard open a Drawer with GoalForm.
 */
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Drawer     from '../components/Drawer'
import GoalCard   from '../components/GoalCard'
import GoalForm   from '../components/GoalForm'

const SAMPLE_GOALS = [
  { id: 1, title: 'Book all vendors',          notes: 'Photography, DJ, cake still outstanding' },
  { id: 2, title: 'Complete attire shopping',  notes: '' },
  { id: 3, title: 'Wrap up early admin',       notes: 'Hotels, MOH, HMU all sorted' },
  { id: 4, title: 'Plan the honeymoon',        notes: '' },
]

const SAMPLE_TASKS = [
  { id:  1, title: 'Ask Matt to be Best Man',                       completed: false, dueDate: '2026-03-20', owner: 'Timothy', category: 'Admin',       priority: 'High'   },
  { id:  2, title: 'Sign photobooth contract + send first payment', completed: false, dueDate: '2026-03-20', owner: 'Both',    category: 'Admin',       priority: 'High'   },
  { id:  3, title: 'Book engagement photoshoot',                    completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Photography', priority: 'High'   },
  { id:  4, title: 'Source photographer',                           completed: false, dueDate: '2026-04-01', owner: 'Both',    category: 'Photography', priority: 'High'   },
  { id:  5, title: 'Source videographer',                           completed: false, dueDate: '2026-05-01', owner: 'Both',    category: 'Photography', priority: 'Medium' },
  { id:  6, title: 'Figure out who is marrying us',                 completed: false, dueDate: '2026-04-15', owner: 'Both',    category: 'Admin',       priority: 'High'   },
  { id:  7, title: 'Book remaining NYC dress appointments',         completed: false, dueDate: '2026-04-01', owner: 'Taylor',  category: 'Attire',      priority: 'High',   goalId: 2 },
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
  { id: 27, title: 'Book DJ',                                       completed: false, dueDate: '2026-06-01', owner: 'Timothy', category: 'Music',       priority: 'High',   goalId: 1 },
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
  { id: 38, title: 'Ask Karleigh to be MOH',                        completed: true,  dueDate: '2026-01-01', owner: 'Taylor',  category: 'Admin',       priority: 'High',   goalId: 3 },
  { id: 39, title: 'Call hotels for wedding blocks',                completed: true,  dueDate: '2026-01-01', owner: 'Both',    category: 'Admin',       priority: 'High',   goalId: 3 },
  { id: 40, title: 'Source HMU artist',                             completed: true,  dueDate: '2026-01-01', owner: 'Taylor',  category: 'Attire',      priority: 'High',   goalId: 2 },
  { id: 41, title: 'Lovely Bride appointment (Philly)',             completed: true,  dueDate: '2026-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 42, title: 'Kinfolk appointment (Philly)',                  completed: true,  dueDate: '2026-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 43, title: 'Anthropologie appointment (Philly)',            completed: true,  dueDate: '2026-02-01', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 44, title: 'Lovely Bride appointment (NYC)',                completed: true,  dueDate: '2026-02-15', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 45, title: 'Sarah Seven appointment (NYC)',                 completed: true,  dueDate: '2026-02-15', owner: 'Taylor',  category: 'Attire',      priority: 'Medium' },
  { id: 46, title: 'Pay Salt Florist deposit',                      completed: true,  dueDate: '2026-01-29', owner: 'Both',    category: 'Flowers',     priority: 'High'   },
  { id: 47, title: 'Pay Air Hair & Makeup deposit',                 completed: true,  dueDate: '2026-01-29', owner: 'Taylor',  category: 'Attire',      priority: 'High'   },
]

function getGoalStatus(goal, tasks) {
  const linked    = tasks.filter(t => t.goalId === goal.id)
  const total     = linked.length
  const completed = linked.filter(t => t.completed).length
  if (total === 0)         return 'no-tasks-yet'
  if (completed === total) return 'accomplished'
  if (completed === 0)     return 'not-started'
  return 'in-progress'
}

function Goals() {
  const [goals,       setGoals]       = useState(SAMPLE_GOALS)
  const [tasks]                       = useState(SAMPLE_TASKS)
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)

  function handleAddGoal() {
    setEditingGoal(null)
    setDrawerOpen(true)
  }

  function handleEditGoal(goal) {
    setEditingGoal(goal)
    setDrawerOpen(true)
  }

  function handleDeleteGoal(id) {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  function handleSaveGoal(formData) {
    if (editingGoal) {
      setGoals(prev => prev.map(g => g.id === editingGoal.id ? { ...editingGoal, ...formData } : g))
    } else {
      setGoals(prev => [...prev, { id: Date.now(), ...formData }])
    }
    setDrawerOpen(false)
    setEditingGoal(null)
  }

  function handleCloseDrawer() {
    setDrawerOpen(false)
    setEditingGoal(null)
  }

  const accomplished = goals.filter(g => getGoalStatus(g, tasks) === 'accomplished')
  const inProgress   = goals.filter(g => getGoalStatus(g, tasks) === 'in-progress')
  const notStarted   = goals.filter(g => ['not-started', 'no-tasks-yet'].includes(getGoalStatus(g, tasks)))

  return (
    <>
      <style>{`
        /* ── Page layout ── */

        .goals-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        .goals-page__toolbar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.5rem;
        }

        .goals-page__add-btn {
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

        .goals-page__add-btn:hover {
          background: var(--rose-dark);
        }

        .goals-page__section {
          margin-bottom: 2rem;
        }

        .goals-page__section-label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .goals-page__section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .goals-page__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.1rem;
        }

        /* ── GoalCard ── */

        .goal-card {
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-lifted);
          padding: 1.1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .goal-status-badge {
          align-self: flex-start;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.18rem 0.6rem;
          border-radius: 999px;
        }

        .goal-status-badge--accomplished {
          background: var(--sage-dark);
          color: var(--ivory);
        }

        .goal-status-badge--in-progress {
          background: var(--gold);
          color: var(--ivory);
        }

        .goal-status-badge--not-started {
          background: var(--border);
          color: var(--text-muted);
        }

        .goal-status-badge--no-tasks-yet {
          background: var(--ivory-dark);
          color: var(--text-muted);
        }

        .goal-card__title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-heading);
          line-height: 1.3;
        }

        .goal-card__notes {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .goal-card__progress {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .goal-progress-bar {
          height: 6px;
          background: var(--ivory-dark);
          border-radius: 999px;
          overflow: hidden;
        }

        .goal-progress-bar__fill {
          height: 100%;
          background: var(--sage);
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .goal-card__count {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .goal-card__toggle {
          align-self: flex-start;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: color 0.15s ease;
        }

        .goal-card__toggle:hover {
          color: var(--text);
        }

        .goal-card__tasks {
          list-style: none;
          padding: 0.6rem 0 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          border-top: 1px solid var(--border);
        }

        .goal-card__task-item {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
        }

        .goal-card__task-icon {
          color: var(--decorative-color);
          font-size: 0.6rem;
          flex-shrink: 0;
        }

        .goal-card__task-title {
          color: var(--text);
          line-height: 1.4;
        }

        .goal-card__task-title--done {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .goal-card__task-empty {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
          list-style: none;
        }

        .goal-card__footer {
          display: flex;
          gap: 0.5rem;
          padding-top: 0.6rem;
          border-top: 1px solid var(--border);
        }

        .goal-card__btn {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .goal-card__btn--edit {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .goal-card__btn--edit:hover {
          border-color: var(--text-muted);
          color: var(--text);
        }

        .goal-card__btn--delete {
          background: transparent;
          color: var(--rose);
          border: 1px solid var(--rose);
        }

        .goal-card__btn--delete:hover {
          background: var(--rose);
          color: var(--ivory);
        }

        /* ── GoalForm ── */

        .goal-form__section {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .goal-form__field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-bottom: 0.75rem;
        }

        .goal-form__label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        .goal-form__input,
        .goal-form__textarea {
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

        .goal-form__input:focus,
        .goal-form__textarea:focus {
          border-color: var(--rose);
        }

        .goal-form__textarea {
          resize: vertical;
          min-height: 80px;
        }

        .goal-form__footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .goal-form__btn--save {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: var(--sage-dark);
          color: var(--ivory);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .goal-form__btn--save:hover {
          background: var(--sage);
        }
      `}</style>

      <div className="goals-page">
        <PageHeader
          title="Goals"
          summary={`${accomplished.length} of ${goals.length} goal${goals.length !== 1 ? 's' : ''} accomplished`}
        />

        <div className="goals-page__toolbar">
          <button className="goals-page__add-btn" onClick={handleAddGoal}>+ Add Goal</button>
        </div>

        {accomplished.length > 0 && (
          <div className="goals-page__section">
            <p className="goals-page__section-label">Accomplished</p>
            <div className="goals-page__grid">
              {accomplished.map(goal => (
                <GoalCard key={goal.id} goal={goal} tasks={tasks} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
              ))}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div className="goals-page__section">
            <p className="goals-page__section-label">In Progress</p>
            <div className="goals-page__grid">
              {inProgress.map(goal => (
                <GoalCard key={goal.id} goal={goal} tasks={tasks} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
              ))}
            </div>
          </div>
        )}

        {notStarted.length > 0 && (
          <div className="goals-page__section">
            <p className="goals-page__section-label">Not Started</p>
            <div className="goals-page__grid">
              {notStarted.map(goal => (
                <GoalCard key={goal.id} goal={goal} tasks={tasks} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        title={editingGoal ? 'Edit Goal' : 'Add Goal'}
      >
        <GoalForm
          initialData={editingGoal}
          onSave={handleSaveGoal}
        />
      </Drawer>
    </>
  )
}

export default Goals
