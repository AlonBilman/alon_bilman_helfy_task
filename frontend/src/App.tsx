import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  type Task,
} from './services/task.service';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);

  //get the backend tasks 
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
    try {
      await createTask(payload);
      await loadTasks();
    } catch (err) {
      console.error('Create failed:', err);
    }
  }

  async function handleToggle(id: number) {
    try {
      await toggleTask(id);
      await loadTasks(); //refresh tasks
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      await loadTasks(); //refresh tasks
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  async function handleUpdate(id: number, updates: Partial<Task>) {
    try {
      await updateTask(id, updates);
      await loadTasks();
      setEditing(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="app-container">
      <header>
        <h1>My Task Manager App - Helfy's Task</h1>
      </header>

      <main>
        {/* Create form */}
        <TaskForm onCreate={handleCreate} />

        {/* Edit form (inline) */}
        {editing && (
          <TaskForm
            initial={editing}
            onUpdate={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}

        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditing}
          />
        )}
      </main>
    </div>
  );
}
