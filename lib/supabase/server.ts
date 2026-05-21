import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

export function createSupabaseServerClient() {
  return createClient(
    env.public.supabaseUrl,
    env.server.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}