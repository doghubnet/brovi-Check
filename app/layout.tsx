import './globals.css';
import type { Metadata } from 'next';
import Nav from '../components/Nav';
import ChatWidget from '../components/ChatWidget';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Brovi Check',
  description: 'AI-assisted visa readiness and study abroad preparation platform.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 mx-auto w-full max-w-7xl p-4">
            {children}
          </main>
        </div>
        {/* Floating chat widget available on all pages */}
        <ChatWidget />
      </body>
    </html>
  );
}