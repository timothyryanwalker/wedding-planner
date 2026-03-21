/**
 * Tasks — full task management page.
 * Manages task state and filter state.
 * Clicking a row or "+ Add Task" opens a Drawer with TaskForm for CRUD.
 */
import { useState } from 'react'
import TaskCard    from '../components/TaskCard'
import TaskFilter  from '../components/TaskFilter'
import Drawer      from '../components/Drawer'
import TaskForm    from '../components/TaskForm'
import PageHeader  from '../components/PageHeader'
import { useAppData } from '../context/AppDataContext'

const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)

function isOverdue(task) {
  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)
  return !task.completed && due < TODAY
}

function Tasks() {
  const { tasks, goals, loading, addTask, updateTask, deleteTask } = useAppData()
  const [filters,    setFilters]    = useState({ status: 'all', owner: 'all', sort: 'dueDate' })
  const [drawerTask, setDrawerTask] = useState(null)

  async function handleToggle(id) {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    try { await updateTask({ ...task, completed: !task.completed }) } catch (e) { console.error(e) }
  }

  function handleFilterChange(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function handleRowClick(task) {
    setDrawerTask(task)
  }

  function handleCloseDrawer() {
    setDrawerTask(null)
  }

  async function handleSave(formData) {
    try {
      if (drawerTask?.id < 0) {
        await addTask(formData)
      } else {
        await updateTask({ ...drawerTask, ...formData })
      }
      setDrawerTask(null)
    } catch (e) { console.error(e) }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id)
      setDrawerTask(null)
    } catch (e) { console.error(e) }
  }

  function handleAddTask() {
    const newTask = {
      id: -Date.now(), title: '', completed: false,
      dueDate: '', owner: 'Both', category: 'Admin', priority: 'Medium',
    }
    setDrawerTask(newTask)
  }

  if (loading) return <div className="tasks-loading">Loading...</div>

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
      if (filters.sort === 'owner') {
        const order = { Taylor: 0, Timothy: 1, Both: 2 }
        return (order[a.owner] ?? 3) - (order[b.owner] ?? 3)
      }
      if (filters.sort === 'category') {
        return a.category.localeCompare(b.category)
      }
      if (filters.sort === 'priority') {
        const order = { High: 0, Medium: 1, Low: 2 }
        return (order[a.priority] ?? 3) - (order[b.priority] ?? 3)
      }
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

  return (
    <>
      <style>{`
        .tasks-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }


        .tasks-page__list {
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-lifted);
          background: var(--ivory);
        }

        .tasks-page__empty {
          padding: 3rem 1rem;
          text-align: center;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-muted);
          background: var(--ivory);
        }

        .tasks-page__toolbar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
        }

        .tasks-page__add-btn {
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

        .tasks-page__add-btn:hover {
          background: var(--rose-dark);
        }
      `}</style>

      <div className="tasks-page">
        <PageHeader title="Tasks" summary={`${completed} of ${total} complete`} />

        <div className="tasks-page__toolbar">
          <button className="tasks-page__add-btn" onClick={handleAddTask}>+ Add Task</button>
        </div>

        <div className="tasks-page__list">
          <TaskFilter filters={filters} onChange={handleFilterChange} />
          {filtered.length > 0
            ? filtered.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={handleRowClick}
                />
              ))
            : <p className="tasks-page__empty">No tasks match the current filters.</p>
          }
        </div>
      </div>

      <Drawer
        isOpen={drawerTask !== null}
        onClose={handleCloseDrawer}
        title={drawerTask?.id < 0 ? 'Add Task' : 'Edit Task'}
      >
        <TaskForm
          task={drawerTask}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={handleCloseDrawer}
          goals={goals}
        />
      </Drawer>
    </>
  )
}

export default Tasks
