"use client";

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '../env';

export const supabase: SupabaseClient | null = env.flags.hasSupabaseClient
  ? createClient(env.public.supabaseUrl, env.public.supabaseAnonKey)
  : null;
