
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase keys are missing! Check your .env file.');
}

// Log for debugging (don't log the full key in production usually, but helpful here)
console.log('Supabase Config:', {
    url: supabaseUrl,
    keyExists: !!supabaseAnonKey
});

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
)
