/**
 * AppDataContext — fetches and manages goals, tasks, and vendors from Supabase.
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

/* Map a raw Supabase vendor_payments row to camelCase for the frontend */
function toPayment(row) {
  return {
    id:        row.id,
    vendorId:  row.vendor_id,
    label:     row.label,
    amount:    row.amount,
    dueDate:   row.due_date,
    paid:      row.paid,
    createdAt: row.created_at,
  }
}

/* Map a raw Supabase vendors row to camelCase, attaching pre-grouped payments */
function toVendor(row, payments = []) {
  return {
    id:             row.id,
    userId:         row.user_id,
    name:           row.name,
    category:       row.category,
    status:         row.status,
    contactName:    row.contact_name,
    contactEmail:   row.contact_email,
    contactPhone:   row.contact_phone,
    instagram:      row.instagram,
    website:        row.website,
    notes:          row.notes,
    packages:       row.packages,
    pricing:        row.pricing,
    source:         row.source,
    gmailThreadId:  row.gmail_thread_id,
    createdAt:      row.created_at,
    payments,
  }
}

export function AppDataProvider({ children }) {
  const { session } = useAuth()
  const user = session?.user ?? null

  const [goals,   setGoals]   = useState([])
  const [tasks,   setTasks]   = useState([])
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)

  /* Fetch goals and tasks whenever the logged-in user changes */
  useEffect(() => {
    if (!user) {
      setGoals([])
      setTasks([])
      setVendors([])
      setLoading(false)
      return
    }

    async function fetchData() {
      setLoading(true)

      const [
        { data: goalsData },
        { data: tasksData },
        { data: vendorsData },
        { data: paymentsData },
      ] = await Promise.all([
        supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
        supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
        supabase.from('vendors').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
        supabase.from('vendor_payments').select('*').order('created_at', { ascending: true }),
      ])

      /* Group payments by vendor_id for O(1) lookup when attaching to vendors */
      const paymentsByVendor = (paymentsData ?? []).reduce((map, row) => {
        if (!map[row.vendor_id]) map[row.vendor_id] = []
        map[row.vendor_id].push(toPayment(row))
        return map
      }, {})

      setGoals((goalsData ?? []).map(toGoal))
      setTasks((tasksData ?? []).map(toTask))
      setVendors((vendorsData ?? []).map(row => toVendor(row, paymentsByVendor[row.id] ?? [])))
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

  /* ── Vendor handlers ────────────────────────────────────────── */

  async function addVendor({ name, category, status, contactName, contactEmail, contactPhone, instagram, website, notes, packages, pricing, source, gmailThreadId }) {
    const { data, error } = await supabase
      .from('vendors')
      .insert({
        user_id:       user.id,
        name,
        category,
        status,
        contact_name:  contactName  ?? null,
        contact_email: contactEmail ?? null,
        contact_phone: contactPhone ?? null,
        instagram:     instagram    ?? null,
        website:       website      ?? null,
        notes:         notes        ?? null,
        packages:      packages     ?? null,
        pricing:       pricing      ?? null,
        source:        source       ?? null,
        gmail_thread_id: gmailThreadId ?? null,
      })
      .select()
      .single()
    if (error) throw error
    setVendors(prev => [...prev, toVendor(data, [])])
  }

  async function updateVendor(vendor) {
    const { data, error } = await supabase
      .from('vendors')
      .update({
        name:          vendor.name,
        category:      vendor.category,
        status:        vendor.status,
        contact_name:  vendor.contactName  ?? null,
        contact_email: vendor.contactEmail ?? null,
        contact_phone: vendor.contactPhone ?? null,
        instagram:     vendor.instagram    ?? null,
        website:       vendor.website      ?? null,
        notes:         vendor.notes        ?? null,
        packages:      vendor.packages     ?? null,
        pricing:       vendor.pricing      ?? null,
        source:        vendor.source       ?? null,
        gmail_thread_id: vendor.gmailThreadId ?? null,
      })
      .eq('id', vendor.id)
      .select()
      .single()
    if (error) throw error
    /* Preserve existing payments in local state — payments are managed separately */
    setVendors(prev => prev.map(v => v.id === vendor.id ? toVendor(data, v.payments) : v))
  }

  async function deleteVendor(id) {
    const { error } = await supabase
      .from('vendors')
      .delete()
      .eq('id', id)
    if (error) throw error
    setVendors(prev => prev.filter(v => v.id !== id))
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
    goals, tasks, vendors, loading,
    addGoal, updateGoal, deleteGoal,
    addTask, updateTask, deleteTask,
    addVendor, updateVendor, deleteVendor,
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
