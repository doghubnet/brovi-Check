"use client";

import { createBrowserClient } from '@supabase/supabase-js';
import { env } from '../env';

export const supabase = createBrowserClient(
  env.public.supabaseUrl,
  env.public.supabaseAnonKey
);