import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminPage() {
  // In Round 1 we don't implement real role checks. Display placeholder metrics.
  const metrics = [
    { name: 'Registered users', value: 0 },
    { name: 'Document scans', value: 0 },
    { name: 'Program matches', value: 0 },
    { name: 'Finance scans', value: 0 },
  ];
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="muted-text mb-6">Administrative metrics overview.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="card text-center">
              <p className="font-medium mb-1">{metric.name}</p>
              <p className="text-3xl font-bold text-primary">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}