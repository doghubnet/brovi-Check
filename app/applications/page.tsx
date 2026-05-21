import ProtectedRoute from '../../components/ProtectedRoute';

const columns = [
  { title: 'Interested', items: [] as string[] },
  { title: 'Applied', items: [] as string[] },
  { title: 'Waiting', items: [] as string[] },
  { title: 'Accepted', items: [] as string[] },
  { title: 'Rejected', items: [] as string[] },
];

export default function ApplicationsPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Applications</h1>
        <p className="muted-text mb-6">Track your applications across different statuses.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((col) => (
            <div key={col.title} className="card flex flex-col">
              <h3 className="font-medium mb-2">{col.title}</h3>
              {col.items.length === 0 ? (
                <p className="muted-text text-sm">No applications yet</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {col.items.map((item, idx) => (
                    <li key={idx} className="bg-neutral-100 dark:bg-neutral-700 rounded-md px-2 py-1">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}