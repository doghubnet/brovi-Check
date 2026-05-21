"use client";

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

type LoginTab = 'signin' | 'signup' | 'magic';

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<LoginTab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error || !data.session) {
      setMessage(error?.message || 'Unable to sign in');
      return;
    }
    router.replace(params.get('next') ?? '/dashboard');
  }

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    setLoading(false);
    setMessage(error ? error.message : 'Account created. Please check your email.');
  }

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    setLoading(false);
    setMessage(error ? error.message : 'Magic link sent. Check your email.');
  }

  async function handleGoogle() {
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
  }

  const submitHandler = tab === 'signin' ? handleSignIn : tab === 'signup' ? handleSignUp : handleMagicLink;

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="card">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white font-bold">B</div>
          <h1 className="text-2xl font-bold">Brovi Check</h1>
          <p className="muted-text">Sign in to continue</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <button type="button" onClick={() => setTab('signin')} className={`rounded-lg px-3 py-2 text-sm ${tab === 'signin' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}>Sign in</button>
          <button type="button" onClick={() => setTab('signup')} className={`rounded-lg px-3 py-2 text-sm ${tab === 'signup' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}>Create</button>
          <button type="button" onClick={() => setTab('magic')} className={`rounded-lg px-3 py-2 text-sm ${tab === 'magic' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}>Link</button>
        </div>

        {message ? <div className="mb-4 rounded-lg bg-neutral-100 p-3 text-sm dark:bg-neutral-800">{message}</div> : null}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input id="email" type="email" className="mt-1 w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {tab !== 'magic' ? (
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} className="mt-1 w-full rounded-md border border-neutral-300 bg-white p-2 pr-10 dark:border-neutral-700 dark:bg-neutral-800" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 px-3 text-neutral-500" aria-label="Toggle password visibility">👁</button>
              </div>
            </div>
          ) : null}

          <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Please wait…' : tab === 'signin' ? 'Sign in' : tab === 'signup' ? 'Create account' : 'Send magic link'}</button>
        </form>

        <button type="button" onClick={handleGoogle} className="mt-4 w-full rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">Continue with Google</button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center">Loading sign in…</div>}>
      <LoginContent />
    </Suspense>
  );
}
