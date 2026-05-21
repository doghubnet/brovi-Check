import ProtectedRoute from '../../components/ProtectedRoute';

interface Task {
  title: string;
  due: string;
  status: string;
  priority: string;
}

const tasks: Task[] = [];

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
        <p className="muted-text mb-6">Stay on top of your to‑do list.</p>
        {tasks.length === 0 ? (
          <p className="muted-text">No tasks yet</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <div key={idx} className="card">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <span className="text-xs text-neutral-500">Due: {task.due}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status: {task.status}</span>
                  <span>Priority: {task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}