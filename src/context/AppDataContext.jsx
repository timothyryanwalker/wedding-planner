/**
 * AppDataContext — fetches and manages goals and tasks from Supabase.
 * Wrap the app in <AppDataProvider> and access data via the useAppData() hook.
 * All mutations update Supabase first, then sync local state on success.
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const AppDataContext = createContext(null)

/* Map a raw Supabase goals row to camelCase for the frontend */
function toGoal(row) {
  return {
    id:        row.id,
    userId:    row.user_id,
    title:     row.title,
    notes:     row.notes,
    createdAt: row.created_at,
  }
}

/* Map a raw Supabase tasks row to camelCase for the frontend */
function toTask(row) {
  return {
    id:        row.id,
    userId:    row.user_id,
    title:     row.title,
    completed: row.completed,
    dueDate:   row.due_date,
    owner:     row.owner,
    category:  row.category,
    priority:  row.priority,
    goalId:    row.goal_id,
    createdAt: row.created_at,
  }
}

export function AppDataProvider({ children }) {
  const { session } = useAuth()
  const user = session?.user ?? null

  const [goals,   setGoals]   = useState([])
  const [tasks,   setTasks]   = useState([])
  const [loading, setLoading] = useState(true)

  /* Fetch goals and tasks whenever the logged-in user changes */
  useEffect(() => {
    if (!user) {
      setGoals([])
      setTasks([])
      setLoading(false)
      return
    }

    async function fetchData() {
      setLoading(true)

      const [{ data: goalsData }, { data: tasksData }] = await Promise.all([
        supabase
          .from('goals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true }),
        supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true }),
      ])

      setGoals((goalsData ?? []).map(toGoal))
      setTasks((tasksData ?? []).map(toTask))
      setLoading(false)
    }

    fetchData()
  }, [user])

  /* ── Goal handlers ──────────────────────────────────────────── */

  async function addGoal({ title, notes }) {
    const { data, error } = await supabase
      .from('goals')
      .insert({ user_id: user.id, title, notes })
      .select()
      .single()
    if (error) throw error
    setGoals(prev => [...prev, toGoal(data)])
  }

  async function updateGoal({ id, title, notes }) {
    const { data, error } = await supabase
      .from('goals')
      .update({ title, notes })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setGoals(prev => prev.map(g => g.id === id ? toGoal(data) : g))
  }

  async function deleteGoal(id) {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
    if (error) throw error
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  /* ── Task handlers ──────────────────────────────────────────── */

  async function addTask({ title, completed, dueDate, owner, category, priority, goalId }) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id:   user.id,
        title,
        completed: completed ?? false,
        due_date:  dueDate   ?? null,
        owner,
        category,
        priority,
        goal_id:   goalId    ?? null,
      })
      .select()
      .single()
    if (error) throw error
    setTasks(prev => [...prev, toTask(data)])
  }

  async function updateTask(task) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title:     task.title,
        completed: task.completed,
        due_date:  task.dueDate  ?? null,
        owner:     task.owner,
        category:  task.category,
        priority:  task.priority,
        goal_id:   task.goalId   ?? null,
      })
      .eq('id', task.id)
      .select()
      .single()
    if (error) throw error
    setTasks(prev => prev.map(t => t.id === task.id ? toTask(data) : t))
  }

  async function deleteTask(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    if (error) throw error
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const value = {
    goals, tasks, loading,
    addGoal, updateGoal, deleteGoal,
    addTask, updateTask, deleteTask,
  }

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  )
}

/* Convenience hook — throws if used outside <AppDataProvider> */
export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}

export default AppDataProvider
