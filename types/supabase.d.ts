import { SupabaseClient } from '@supabase/supabase-js'

declare global {
  const useSupabaseClient: () => SupabaseClient
}

export {} 