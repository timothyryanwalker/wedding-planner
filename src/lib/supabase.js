/**
 * supabase.js — initializes and exports the Supabase client.
 * Import this file wherever Supabase access is needed.
 * Credentials are read from Vite environment variables (.env).
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
