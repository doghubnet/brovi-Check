"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  // determine auth state on mount
  useEffect(() => {
    async function check() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
        if (!supabaseUrl || !supabaseAnonKey) {
          setHasSession(false);
          return;
        }
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data } = await supabase.auth.getSession();
        setHasSession(!!data.session);
      } catch {
        setHasSession(false);
      }
    }
    check();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase.auth.signOut();
      setHasSession(false);
      // redirect to home
      window.location.href = '/';
    } catch {
      // ignore
    }
  }

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="https://i.imgur.com/Gbomc48.jpeg" alt="Brovi Check" className="h-8 w-8 object-contain" />
              <span className="font-semibold hidden sm:block">Brovi Check</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === href ? 'text-primary' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary'}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasSession ? (
              <button onClick={handleLogout} className="btn-secondary hidden md:inline-flex">Log Out</button>
            ) : (
              <Link href="/login" className="btn-primary hidden md:inline-flex">Sign In</Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === href ? 'text-primary' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary'}`}
              >
                {label}
              </Link>
            ))}
            {hasSession ? (
              <button onClick={handleLogout} className="block btn-secondary w-full text-center">Log Out</button>
            ) : (
              <Link href="/login" className="block btn-primary w-full text-center">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}