"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<'signin' | 'signup' | 'magic'>('signin');
  // sign in state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  // sign up state
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: '',
    accepted: false,
  });
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // magic link state
  const [magicEmail, setMagicEmail] = useState('');
  // feedback message and loading
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: signInEmail.trim(), password: signInPassword });
      if (error || !data.session) {
        setMessage(error?.message || 'Unable to sign in');
      } else {
        // redirect to next param or dashboard
        const next = params.get('next') ?? '/dashboard';
        router.replace(next);
      }
    } catch (err) {
      setMessage('Sign in failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { firstName, lastName, email, confirmEmail, password, confirmPassword, preferredLanguage, accepted } = signUpData;
    if (!email || !password) {
      setMessage('Please enter email and password');
      setLoading(false);
      return;
    }
    if (email !== confirmEmail) {
      setMessage('Emails do not match');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }
    if (!accepted) {
      setMessage('You must accept the privacy policy');
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            preferred_language: preferredLanguage,
          },
        },
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Account created. Please check your email for confirmation.');
        setTab('signin');
      }
    } catch (err) {
      setMessage('Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const redirectTo = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        : `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email: magicEmail.trim(),
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Magic link sent! Check your email.');
      }
    } catch {
      setMessage('Unable to send link');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      const redirectTo = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        : `${window.location.origin}/auth/callback`;
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
    } catch {
      // ignore
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="card">
        <div className="flex justify-center mb-4">
          <img src="https://i.imgur.com/DJS3c73.jpeg" alt="Brovi logo" className="h-16 w-16 object-contain" />
        </div>
        <div className="flex justify-around mb-6">
          <button onClick={() => setTab('signin')} className={`py-2 px-4 border-b-2 ${tab === 'signin' ? 'border-primary text-primary' : 'border-transparent text-neutral-500'}`}>Sign In</button>
          <button onClick={() => setTab('signup')} className={`py-2 px-4 border-b-2 ${tab === 'signup' ? 'border-primary text-primary' : 'border-transparent text-neutral-500'}`}>Create Account</button>
          <button onClick={() => setTab('magic')} className={`py-2 px-4 border-b-2 ${tab === 'magic' ? 'border-primary text-primary' : 'border-transparent text-neutral-500'}`}>Email Link</button>
        </div>
        {message && <div className="mb-4 text-center text-sm text-red-600">{message}</div>}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="signInEmail" className="block text-sm font-medium">Email</label>
              <input id="signInEmail" type="email" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" placeholder="you@example.com" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="signInPassword" className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input id="signInPassword" type={showSignInPassword ? 'text' : 'password'} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 pr-10 bg-white dark:bg-neutral-800" placeholder="••••••••" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowSignInPassword(!showSignInPassword)} className="absolute inset-y-0 right-0 px-3 text-neutral-500 dark:text-neutral-400" aria-label="Toggle password">
                  {showSignInPassword ? '👁️‍🗨️' : '👁'}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
          </form>
        )}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
                <input id="firstName" type="text" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={signUpData.firstName} onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
                <input id="lastName" type="text" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={signUpData.lastName} onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })} required />
              </div>
            </div>
            <div>
              <label htmlFor="signUpEmail" className="block text-sm font-medium">Email</label>
              <input id="signUpEmail" type="email" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="confirmEmail" className="block text-sm font-medium">Confirm email</label>
              <input id="confirmEmail" type="email" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={signUpData.confirmEmail} onChange={(e) => setSignUpData({ ...signUpData, confirmEmail: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="signUpPassword" className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input id="signUpPassword" type={showSignUpPassword ? 'text' : 'password'} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 pr-10 bg-white dark:bg-neutral-800" value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} required />
                <button type="button" onClick={() => setShowSignUpPassword(!showSignUpPassword)} className="absolute inset-y-0 right-0 px-3 text-neutral-500 dark:text-neutral-400" aria-label="Toggle password">
                  {showSignUpPassword ? '👁️‍🗨️' : '👁'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm password</label>
              <div className="relative">
                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 pr-10 bg-white dark:bg-neutral-800" value={signUpData.confirmPassword} onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 text-neutral-500 dark:text-neutral-400" aria-label="Toggle password">
                  {showConfirmPassword ? '👁️‍🗨️' : '👁'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="preferredLanguage" className="block text-sm font-medium">Preferred language</label>
              <select id="preferredLanguage" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={signUpData.preferredLanguage} onChange={(e) => setSignUpData({ ...signUpData, preferredLanguage: e.target.value })} required>
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Amharic">Amharic</option>
              </select>
            </div>
            <div className="flex items-center">
              <input id="privacy" type="checkbox" className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700" checked={signUpData.accepted} onChange={(e) => setSignUpData({ ...signUpData, accepted: e.target.checked })} />
              <label htmlFor="privacy" className="ml-2 text-sm">I agree to the privacy policy</label>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Creating account…' : 'Create Account'}</button>
          </form>
        )}
        {tab === 'magic' && (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <p className="muted-text">Enter your email address and we’ll send you a secure sign‑in link. Use the six‑digit code if your email contains a code.</p>
            <div>
              <label htmlFor="magicEmail" className="block text-sm font-medium">Email</label>
              <input id="magicEmail" type="email" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={magicEmail} onChange={(e) => setMagicEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Sending…' : 'Send Link'}</button>
          </form>
        )}
        <hr className="my-6" />
        <div className="text-center">
          <p className="muted-text mb-2">Or continue with</p>
          <button type="button" onClick={handleGoogle} className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800">
            <img src="https://thumbs.dreamstime.com/b/google-logo-vector-format-white-background-illustration-407571048.jpg" alt="Google" className="h-5 w-5" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}