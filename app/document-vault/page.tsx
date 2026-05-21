import ProtectedRoute from '../../components/ProtectedRoute';

const categories = [
  { title: 'Identity', items: [] as string[] },
  { title: 'Academic', items: [] as string[] },
  { title: 'Admission', items: [] as string[] },
  { title: 'Financial', items: [] as string[] },
  { title: 'Other', items: [] as string[] },
];

export default function DocumentVaultPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Document Vault</h1>
        <p className="muted-text mb-2">Store your documents safely. Do not upload sensitive information like passwords or card numbers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.title} className="card flex flex-col">
              <h3 className="font-medium mb-2">{cat.title}</h3>
              {cat.items.length === 0 ? (
                <p className="muted-text text-sm">No documents</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {cat.items.map((doc, idx) => (
                    <li key={idx} className="bg-neutral-100 dark:bg-neutral-700 rounded-md px-2 py-1">{doc}</li>
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