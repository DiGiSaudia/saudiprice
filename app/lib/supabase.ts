import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// اگر لنکس غائب ہوں تو یہ ایرر نہیں دے گا بلکہ خاموش رہے گا
export const supabase = createClient(supabaseUrl, supabaseAnonKey)