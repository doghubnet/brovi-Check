"use client";
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

/**
 * Handles the OAuth callback. After Supabase processes the provider
 * token it will set the session cookie. This page waits for the
 * session and then redirects the user to the `next` parameter or
 * the dashboard.
 */
function AuthCallbackContent() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function finish() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
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
    <Suspense fallback={<p className="py-10 text-center">Signing you in…</p>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
