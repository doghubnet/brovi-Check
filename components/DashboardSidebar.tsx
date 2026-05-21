"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/document-scan', label: 'Document Scan' },
  { href: '/program-match-scan', label: 'Program Match' },
  { href: '/bank-statement-scan', label: 'Bank Statement' },
  { href: '/interview-practice', label: 'Interview Practice' },
  { href: '/readiness-report', label: 'Readiness Report' },
  { href: '/applications', label: 'Applications' },
  { href: '/document-vault', label: 'Document Vault' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/consultant-review', label: 'Consultant Review' },
  { href: '/admin', label: 'Admin' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <div className="h-full border-r border-neutral-200 dark:border-neutral-700 p-4 w-56 hidden lg:block">
      <h2 className="section-title text-lg">Dashboard</h2>
      <ul className="space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                pathname === href
                  ? 'bg-primary text-white'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}