import { ReactNode } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';

/**
 * Layout for dashboard and all nested pages. It wraps content with a
 * sidebar on larger screens while collapsing on smaller devices via
 * the built‑in responsiveness of the sidebar component.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">{/* subtract nav height */}
      <DashboardSidebar />
      <div className="flex-1 p-4 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}