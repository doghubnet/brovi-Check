"use client";
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

/**
 * A simple client-side wrapper that ensures a user is authenticated before
 * rendering protected content. When no session is found the user is
 * redirected to the login page with a `next` query parameter pointing
 * back to the current path. This wrapper uses the Supabase client and
 * the browser‑accessible public environment variables to fetch the
 * current session. If Supabase is unavailable or the call fails the
 * component gracefully falls back to prompting the user to sign in.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
        if (!supabaseUrl || !supabaseAnonKey) {
          setHasSession(false);
          setChecked(true);
          return;
        }
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setHasSession(false);
        } else {
          setHasSession(!!data?.session);
        }
      } catch {
        setHasSession(false);
      } finally {
        setChecked(true);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (checked && hasSession === false) {
      // redirect to login preserving the current path
      const next = typeof window !== 'undefined' ? window.location.pathname : '/';
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [checked, hasSession, router]);

  if (!checked) {
    return <div className="py-10 text-center">Loading…</div>;
  }
  if (!hasSession) {
    // While redirecting the wrapper renders nothing
    return null;
  }
  return <>{children}</>;
}