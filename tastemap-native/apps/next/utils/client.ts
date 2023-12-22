import { createClient, SupabaseClient } from '@supabase/supabase-js'
import env from '../env'

const createSupabaseClientSingleton = () => {
  let client: SupabaseClient
  const getSharedSupabaseClient = () => {
    if (!client) {
      client = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    }
    return client
  }
  return getSharedSupabaseClient
}

export const getSharedSupabaseClient = createSupabaseClientSingleton()
