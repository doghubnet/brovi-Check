import ProtectedRoute from '../../components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Welcome to your dashboard</h1>
        <p className="muted-text">Here you can access your scans, applications and tasks.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/document-scan" className="card hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Document Scan</h3>
            <p className="muted-text text-sm">Assess your document readiness and get recommendations.</p>
          </a>
          <a href="/program-match-scan" className="card hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Program Match</h3>
            <p className="muted-text text-sm">See which study programs best match your profile.</p>
          </a>
          <a href="/bank-statement-scan" className="card hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Financial Readiness</h3>
            <p className="muted-text text-sm">Review your bank statement for visa proof.</p>
          </a>
          <a href="/interview-practice" className="card hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Interview Practice</h3>
            <p className="muted-text text-sm">Practice common interview questions and get feedback.</p>
          </a>
          <a href="/applications" className="card hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Applications</h3>
            <p className="muted-text text-sm">Keep track of your study applications.</p>
          </a>
          <a href="/tasks" className="card hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Tasks</h3>
            <p className="muted-text text-sm">Stay on top of your to‑do list.</p>
          </a>
        </div>
      </div>
    </ProtectedRoute>
  );
}