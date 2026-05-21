"use client";
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { env } from '../../../lib/env';

function AuthCallbackContent() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function finish() {
      if (!env.flags.hasSupabaseClient) {
        router.replace('/login?message=Supabase is not configured');
        return;
      }
      const supabase = createClient(env.public.supabaseUrl, env.public.supabaseAnonKey);
      await supabase.auth.getSession();
      const next = params.get('next') ?? '/dashboard';
      router.replace(next);
    }
    finish();
  }, [router, params]);
  return <p className="py-10 text-center">Signing you in…</p>;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="py-10 text-center">Loading…</p>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
