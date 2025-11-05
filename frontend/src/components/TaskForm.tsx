import { useState } from 'react';
import type { Task } from '../services/task.service';

export default function TaskForm({
  initial,
  onCreate,
  onUpdate,
  onCancel,
}: {
  initial?: Task;
  onCreate?: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void | Promise<void>;
  onUpdate?: (id: number, updates: Partial<Task>) => void | Promise<void>;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [priority, setPriority] = useState<Task['priority']>(initial?.priority ?? 'medium');

  const handleCreate = onCreate ?? (() => {});
  const handleUpdate = onUpdate ?? (() => {});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    if (initial) {
      await handleUpdate(initial.id, { title: trimmedTitle, description, priority });
    } else {
      await handleCreate({ title: trimmedTitle, description, priority });
      //reset only in create mode
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }

  const isEditing = Boolean(initial);
  const canSubmit = title.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What needs to be done?"
          rows={3}
        />
      </div>

      <div className="field">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <div className="actions">
        <button type="submit" disabled={!canSubmit}>
          {isEditing ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}