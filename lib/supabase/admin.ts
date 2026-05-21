import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

export const supabaseAdmin = createClient(
  env.public.supabaseUrl,
  env.server.serviceRoleKey
);